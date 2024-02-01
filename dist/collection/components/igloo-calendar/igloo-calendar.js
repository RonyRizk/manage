import { Host, h } from "@stencil/core";
import { RoomService } from "../../services/room.service";
import { BookingService } from "../../services/booking.service";
import { addTwoMonthToDate, computeEndDate, convertDMYToISO, dateToFormattedString, formatLegendColors, getNextDay, isBlockUnit } from "../../utils/utils";
import io from "socket.io-client";
import axios from "axios";
import { EventsService } from "../../services/events.service";
import moment from "moment";
import { ToBeAssignedService } from "../../services/toBeAssigned.service";
import { bookingStatus, calculateDaysBetweenDates, transformNewBLockedRooms, transformNewBooking } from "../../utils/booking";
import calendar_dates from "../../../../src/stores/calendar-dates.store";
import locales from "../../../../src/stores/locales.store";
import calendar_data from "../../../../src/stores/calendar-data";
export class IglooCalendar {
  constructor() {
    this.bookingService = new BookingService();
    this.countryNodeList = [];
    this.visibleCalendarCells = { x: [], y: [] };
    this.today = '';
    this.roomService = new RoomService();
    this.eventsService = new EventsService();
    this.toBeAssignedService = new ToBeAssignedService();
    this.reachedEndOfCalendar = false;
    this.scrollViewDragPos = { top: 0, left: 0, x: 0, y: 0 };
    this.onScrollContentMoveHandler = (event) => {
      // How far the mouse has been moved
      const dx = event.clientX - this.scrollViewDragPos.x;
      const dy = event.clientY - this.scrollViewDragPos.y;
      // Scroll the element
      this.scrollContainer.scrollTop = this.scrollViewDragPos.top - dy;
      this.scrollContainer.scrollLeft = this.scrollViewDragPos.left - dx;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        this.scrollViewDragging = true;
      }
    };
    this.onScrollContentMoveEndHandler = () => {
      document.removeEventListener('mousemove', this.onScrollContentMoveHandler);
      document.removeEventListener('mouseup', this.onScrollContentMoveEndHandler);
    };
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.loadingMessage = undefined;
    this.currencyName = undefined;
    this.ticket = '';
    this.calendarData = new Object();
    this.days = new Array();
    this.scrollViewDragging = false;
    this.dialogData = null;
    this.bookingItem = null;
    this.editBookingItem = null;
    this.showLegend = false;
    this.showPaymentDetails = false;
    this.showToBeAssigned = false;
    this.unassignedDates = {};
    this.roomNightsData = null;
    this.renderAgain = false;
    this.showBookProperty = false;
    this.totalAvailabilityQueue = [];
  }
  ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  setUpCalendarData(roomResp, bookingResp) {
    this.calendarData.currency = roomResp['My_Result'].currency;
    this.calendarData.allowedBookingSources = roomResp['My_Result'].allowed_booking_sources;
    this.calendarData.adultChildConstraints = roomResp['My_Result'].adult_child_constraints;
    this.calendarData.legendData = this.getLegendData(roomResp);
    this.calendarData.is_vacation_rental = roomResp['My_Result'].is_vacation_rental;
    this.calendarData.startingDate = new Date(bookingResp.My_Params_Get_Rooming_Data.FROM).getTime();
    this.calendarData.endingDate = new Date(bookingResp.My_Params_Get_Rooming_Data.TO).getTime();
    this.calendarData.formattedLegendData = formatLegendColors(this.calendarData.legendData);
    this.calendarData.bookingEvents = bookingResp.myBookings || [];
    this.calendarData.toBeAssignedEvents = [];
  }
  async initializeApp() {
    try {
      const [_, roomResp, bookingResp, countryNodeList] = await Promise.all([
        this.roomService.fetchLanguage(this.language),
        this.roomService.fetchData(this.propertyid, this.language),
        this.bookingService.getCalendarData(this.propertyid, this.from_date, this.to_date),
        this.bookingService.getCountries(this.language),
      ]);
      calendar_dates.days = bookingResp.days;
      calendar_dates.months = bookingResp.months;
      this.setRoomsData(roomResp);
      this.countryNodeList = countryNodeList;
      this.setUpCalendarData(roomResp, bookingResp);
      let paymentMethods = roomResp['My_Result']['allowed_payment_methods'];
      this.showPaymentDetails = paymentMethods.some(item => item.code === '001' || item.code === '004');
      this.updateBookingEventsDateRange(this.calendarData.bookingEvents);
      this.updateBookingEventsDateRange(this.calendarData.toBeAssignedEvents);
      this.today = this.transformDateForScroll(new Date());
      let startingDay = new Date(this.calendarData.startingDate);
      startingDay.setHours(0, 0, 0, 0);
      this.days = bookingResp.days;
      this.calendarData.days = this.days;
      this.calendarData.monthsInfo = bookingResp.months;
      setTimeout(() => {
        this.scrollToElement(this.today);
      }, 200);
      if (!this.calendarData.is_vacation_rental) {
        const data = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date()), this.to_date);
        this.unassignedDates = { fromDate: this.from_date, toDate: this.to_date, data: Object.assign(Object.assign({}, this.unassignedDates), data) };
        this.calendarData = Object.assign(Object.assign({}, this.calendarData), { unassignedDates: data });
      }
      this.socket = io('https://realtime.igloorooms.com/');
      this.socket.on('MSG', async (msg) => {
        let msgAsObject = JSON.parse(msg);
        if (msgAsObject) {
          const { REASON, KEY, PAYLOAD } = msgAsObject;
          if (KEY.toString() === this.propertyid.toString()) {
            let result;
            if (REASON === 'DELETE_CALENDAR_POOL' || REASON === 'GET_UNASSIGNED_DATES') {
              result = PAYLOAD;
            }
            else {
              result = JSON.parse(PAYLOAD);
            }
            console.log(result, REASON);
            const resasons = ['DORESERVATION', 'BLOCK_EXPOSED_UNIT', 'ASSIGN_EXPOSED_ROOM', 'REALLOCATE_EXPOSED_ROOM_BLOCK'];
            if (resasons.includes(REASON)) {
              let transformedBooking;
              if (REASON === 'BLOCK_EXPOSED_UNIT' || REASON === 'REALLOCATE_EXPOSED_ROOM_BLOCK') {
                transformedBooking = [await transformNewBLockedRooms(result)];
              }
              else {
                transformedBooking = transformNewBooking(result);
              }
              this.AddOrUpdateRoomBookings(transformedBooking, undefined);
            }
            else if (REASON === 'DELETE_CALENDAR_POOL') {
              this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: this.calendarData.bookingEvents.filter(e => e.POOL !== result) });
            }
            else if (REASON === 'GET_UNASSIGNED_DATES') {
              function parseDateRange(str) {
                const result = {};
                const pairs = str.split('|');
                pairs.forEach(pair => {
                  const res = pair.split(':');
                  result[res[0]] = res[1];
                });
                return result;
              }
              const parsedResult = parseDateRange(result);
              if (!this.calendarData.is_vacation_rental &&
                new Date(parsedResult.FROM_DATE).getTime() >= this.calendarData.startingDate &&
                new Date(parsedResult.TO_DATE).getTime() <= this.calendarData.endingDate) {
                const data = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date(parsedResult.FROM_DATE)), dateToFormattedString(new Date(parsedResult.TO_DATE)));
                this.calendarData.unassignedDates = Object.assign(Object.assign({}, this.calendarData.unassignedDates), data);
                this.unassignedDates = {
                  fromDate: dateToFormattedString(new Date(parsedResult.FROM_DATE)),
                  toDate: dateToFormattedString(new Date(parsedResult.TO_DATE)),
                  data,
                };
                if (Object.keys(data).length === 0) {
                  this.reduceAvailableUnitEvent.emit({
                    fromDate: dateToFormattedString(new Date(parsedResult.FROM_DATE)),
                    toDate: dateToFormattedString(new Date(parsedResult.TO_DATE)),
                  });
                }
              }
            }
            else if (REASON === 'UPDATE_CALENDAR_AVAILABILITY') {
              this.totalAvailabilityQueue.push(result);
              if (this.totalAvailabilityQueue.length > 0) {
                clearTimeout(this.availabilityTimeout);
              }
              this.availabilityTimeout = setTimeout(() => {
                this.updateTotalAvailability();
              }, 1000);
              console.log(result);
            }
            else if (REASON === 'CHANGE_IN_DUE_AMOUNT') {
              this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: [
                  ...this.calendarData.bookingEvents.map(event => {
                    if (result.pools.includes(event.ID)) {
                      return Object.assign(Object.assign({}, event), { BALANCE: result.due_amount });
                    }
                    return event;
                  }),
                ] });
            }
            else {
              return;
            }
          }
        }
      });
    }
    catch (error) {
      console.log('Initializing Calendar Error', error);
    }
  }
  updateTotalAvailability() {
    let days = [...calendar_dates.days];
    this.totalAvailabilityQueue.forEach(queue => {
      let selectedDate = new Date(queue.date);
      selectedDate.setMilliseconds(0);
      selectedDate.setSeconds(0);
      selectedDate.setMinutes(0);
      selectedDate.setHours(0);
      //find the selected day
      const index = days.findIndex(day => day.currentDate === selectedDate.getTime());
      if (index > 0) {
        //find room_type_id
        const room_type_index = days[index].rate.findIndex(room => room.id === queue.room_type_id);
        if (room_type_index > 0) {
          days[index].rate[room_type_index].exposed_inventory.rts = queue.availability;
        }
      }
    });
    calendar_dates.days = [...days];
  }
  componentDidLoad() {
    this.scrollToElement(this.today);
  }
  async handleDeleteEvent(ev) {
    try {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      await this.eventsService.deleteEvent(ev.detail);
    }
    catch (error) {
      //toastr.error(error);
    }
  }
  checkBookingAvailability(data) {
    return this.calendarData.bookingEvents.some(booking => booking.ID === data.ID || (booking.FROM_DATE === data.FROM_DATE && booking.TO_DATE === data.TO_DATE && booking.PR_ID === data.PR_ID));
  }
  updateBookingEventsDateRange(eventData) {
    eventData.forEach(bookingEvent => {
      bookingEvent.legendData = this.calendarData.formattedLegendData;
      bookingEvent.defaultDateRange = {};
      bookingEvent.defaultDateRange.fromDate = new Date(bookingEvent.FROM_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.fromDateStr = this.getDateStr(bookingEvent.defaultDateRange.fromDate);
      bookingEvent.defaultDateRange.fromDateTimeStamp = bookingEvent.defaultDateRange.fromDate.getTime();
      bookingEvent.defaultDateRange.toDate = new Date(bookingEvent.TO_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.toDateStr = this.getDateStr(bookingEvent.defaultDateRange.toDate);
      bookingEvent.defaultDateRange.toDateTimeStamp = bookingEvent.defaultDateRange.toDate.getTime();
      bookingEvent.defaultDateRange.dateDifference = bookingEvent.NO_OF_DAYS;
      bookingEvent.roomsInfo = [...this.calendarData.roomsInfo];
      if (!isBlockUnit(bookingEvent.STAY_STATUS_CODE)) {
        const now = moment();
        const toDate = moment(bookingEvent.TO_DATE, 'YYYY-MM-DD');
        const fromDate = moment(bookingEvent.FROM_DATE, 'YYYY-MM-DD');
        if (fromDate.isSame(now, 'day') && now.hour() >= 12) {
          bookingEvent.STATUS = bookingStatus['000'];
        }
        else if (now.isAfter(fromDate, 'day') && now.isBefore(toDate, 'day')) {
          bookingEvent.STATUS = bookingStatus['000'];
        }
        else if (toDate.isSame(now, 'day') && now.hour() < 12) {
          bookingEvent.STATUS = bookingStatus['000'];
        }
        else if ((toDate.isSame(now, 'day') && now.hour() >= 12) || toDate.isBefore(now, 'day')) {
          bookingEvent.STATUS = bookingStatus['003'];
        }
      }
    });
  }
  setRoomsData(roomServiceResp) {
    var _a, _b;
    let roomsData = new Array();
    if ((_b = (_a = roomServiceResp.My_Result) === null || _a === void 0 ? void 0 : _a.roomtypes) === null || _b === void 0 ? void 0 : _b.length) {
      roomsData = roomServiceResp.My_Result.roomtypes;
      roomServiceResp.My_Result.roomtypes.forEach(roomCategory => {
        roomCategory.expanded = true;
      });
    }
    calendar_data.roomsInfo = roomsData;
    this.calendarData.roomsInfo = roomsData;
  }
  getLegendData(aData) {
    return aData['My_Result'].calendar_legends;
  }
  getDateStr(date, locale = 'default') {
    return date.getDate() + ' ' + date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  scrollToElement(goToDate) {
    this.scrollContainer = this.scrollContainer || this.element.querySelector('.calendarScrollContainer');
    const topLeftCell = this.element.querySelector('.topLeftCell');
    const gotoDay = this.element.querySelector('.day-' + goToDate);
    if (gotoDay) {
      this.scrollContainer.scrollTo({ left: 0 });
      const gotoRect = gotoDay.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const topLeftCellRect = topLeftCell.getBoundingClientRect();
      this.scrollContainer.scrollTo({
        left: gotoRect.left - containerRect.left - topLeftCellRect.width - gotoRect.width,
      });
    }
  }
  AddOrUpdateRoomBookings(data, pool) {
    let bookings = [...this.calendarData.bookingEvents];
    data.forEach(d => {
      if (!this.checkBookingAvailability(d)) {
        bookings = bookings.filter(booking => booking.ID !== d.ID);
      }
    });
    this.updateBookingEventsDateRange(data);
    if (pool) {
      bookings = bookings.filter(booking => booking.POOL === pool);
    }
    data.forEach(d => {
      if (!bookings.some(booking => booking.ID === d.ID)) {
        bookings.push(d);
      }
    });
    this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: bookings });
  }
  transformDateForScroll(date) {
    return moment(date).format('D_M_YYYY');
  }
  scrollPageToRoom(event) {
    let targetScrollClass = event.detail.refClass;
    this.scrollContainer = this.scrollContainer || this.element.querySelector('.calendarScrollContainer');
    const topLeftCell = this.element.querySelector('.topLeftCell');
    const gotoRoom = this.element.querySelector('.' + targetScrollClass);
    if (gotoRoom) {
      this.scrollContainer.scrollTo({ top: 0 });
      const gotoRect = gotoRoom.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const topLeftCellRect = topLeftCell.getBoundingClientRect();
      this.scrollContainer.scrollTo({
        top: gotoRect.top - containerRect.top - topLeftCellRect.height - gotoRect.height,
      });
    }
  }
  handleShowDialog(event) {
    this.dialogData = event.detail;
    let modal = this.element.querySelector('ir-modal');
    if (modal) {
      modal.openModal();
    }
  }
  handleShowRoomNightsDialog(event) {
    this.roomNightsData = event.detail;
  }
  handleBookingDatasChange(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    let bookings = [...this.calendarData.bookingEvents];
    bookings = bookings.filter(bookingEvent => bookingEvent.ID !== 'NEW_TEMP_EVENT');
    bookings.push(...event.detail.filter(ev => ev.STATUS === 'PENDING-CONFIRMATION'));
    this.updateBookingEventsDateRange(event.detail);
    this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: bookings });
  }
  shouldRenderCalendarView() {
    // console.log("rendering...")
    return this.calendarData && this.calendarData.days && this.calendarData.days.length;
  }
  onOptionSelect(event) {
    const opt = event.detail;
    const calendarElement = this.element.querySelector('#iglooCalendar');
    switch (opt.key) {
      case 'showAssigned':
        calendarElement.classList.remove('showLegend');
        calendarElement.classList.remove('showToBeAssigned');
        calendarElement.classList.toggle('showToBeAssigned');
        this.showLegend = false;
        this.showToBeAssigned = true;
        break;
      case 'showLegend':
        calendarElement.classList.remove('showToBeAssigned');
        calendarElement.classList.remove('showLegend');
        calendarElement.classList.toggle('showLegend');
        this.showLegend = true;
        this.showToBeAssigned = false;
        break;
      case 'calendar':
        if (opt.data.start !== undefined && opt.data.end !== undefined) {
          this.handleDateSearch(opt.data);
        }
        else {
          let dt = new Date(opt.data);
          this.scrollToElement(dt.getDate() + '_' + (dt.getMonth() + 1) + '_' + dt.getFullYear());
        }
        break;
      case 'search':
        break;
      case 'add':
        //console.log('data:', opt.data);
        if (opt.data.event_type !== 'EDIT_BOOKING') {
          this.bookingItem = opt.data;
        }
        else {
          this.editBookingItem = opt.data;
        }
        break;
      case 'gotoToday':
        this.scrollToElement(this.today);
        break;
      case 'closeSideMenu':
        this.closeSideMenu();
        this.showBookProperty = false;
        break;
    }
  }
  async addDatesToCalendar(fromDate, toDate) {
    const results = await this.bookingService.getCalendarData(this.propertyid, fromDate, toDate);
    const newBookings = results.myBookings || [];
    this.updateBookingEventsDateRange(newBookings);
    if (new Date(fromDate).getTime() < new Date(this.calendarData.startingDate).getTime()) {
      this.calendarData.startingDate = new Date(fromDate).getTime();
      this.days = [...results.days, ...this.days];
      let newMonths = [...results.months];
      if (this.calendarData.monthsInfo[0].monthName === results.months[results.months.length - 1].monthName) {
        this.calendarData.monthsInfo[0].daysCount = this.calendarData.monthsInfo[0].daysCount + results.months[results.months.length - 1].daysCount;
        newMonths.pop();
      }
      let bookings = JSON.parse(JSON.stringify(newBookings));
      bookings = bookings.filter(newBooking => {
        const existingBookingIndex = this.calendarData.bookingEvents.findIndex(event => event.ID === newBooking.ID);
        if (existingBookingIndex !== -1) {
          this.calendarData.bookingEvents[existingBookingIndex].FROM_DATE = newBooking.FROM_DATE;
          this.calendarData.bookingEvents[existingBookingIndex].NO_OF_DAYS = calculateDaysBetweenDates(newBooking.FROM_DATE, this.calendarData.bookingEvents[existingBookingIndex].TO_DATE);
          return false;
        }
        return true;
      });
      calendar_dates.days = this.days;
      this.calendarData = Object.assign(Object.assign({}, this.calendarData), { days: this.days, monthsInfo: [...newMonths, ...this.calendarData.monthsInfo], bookingEvents: [...this.calendarData.bookingEvents, ...bookings] });
    }
    else {
      this.calendarData.endingDate = new Date(toDate).getTime();
      let newMonths = [...results.months];
      this.days = [...this.days, ...results.days];
      if (this.calendarData.monthsInfo[this.calendarData.monthsInfo.length - 1].monthName === results.months[0].monthName) {
        this.calendarData.monthsInfo[this.calendarData.monthsInfo.length - 1].daysCount =
          this.calendarData.monthsInfo[this.calendarData.monthsInfo.length - 1].daysCount + results.months[0].daysCount;
        newMonths.shift();
      }
      let bookings = JSON.parse(JSON.stringify(newBookings));
      bookings = bookings.filter(newBooking => {
        const existingBookingIndex = this.calendarData.bookingEvents.findIndex(event => event.ID === newBooking.ID);
        if (existingBookingIndex !== -1) {
          this.calendarData.bookingEvents[existingBookingIndex].TO_DATE = newBooking.TO_DATE;
          this.calendarData.bookingEvents[existingBookingIndex].NO_OF_DAYS = calculateDaysBetweenDates(this.calendarData.bookingEvents[existingBookingIndex].FROM_DATE, newBooking.TO_DATE);
          return false;
        }
        return true;
      });
      calendar_dates.days = this.days;
      //calendar_dates.months = bookingResp.months;
      this.calendarData = Object.assign(Object.assign({}, this.calendarData), { days: this.days, monthsInfo: [...this.calendarData.monthsInfo, ...newMonths], bookingEvents: [...this.calendarData.bookingEvents, ...newBookings] });
    }
    const data = await this.toBeAssignedService.getUnassignedDates(this.propertyid, fromDate, toDate);
    this.calendarData.unassignedDates = Object.assign(Object.assign({}, this.calendarData.unassignedDates), data);
    this.unassignedDates = {
      fromDate,
      toDate,
      data,
    };
  }
  async handleDateSearch(dates) {
    const startDate = moment(dates.start).toDate();
    const defaultFromDate = moment(this.from_date).toDate();
    const endDate = dates.end.toDate();
    const defaultToDate = this.calendarData.endingDate;
    if (startDate.getTime() < new Date(this.from_date).getTime()) {
      await this.addDatesToCalendar(moment(startDate).add(-1, 'days').format('YYYY-MM-DD'), moment(this.from_date).add(-1, 'days').format('YYYY-MM-DD'));
      this.scrollToElement(this.transformDateForScroll(startDate));
    }
    else if (startDate.getTime() > defaultFromDate.getTime() && startDate.getTime() < defaultToDate && endDate.getTime() < defaultToDate) {
      this.scrollToElement(this.transformDateForScroll(startDate));
    }
    else if (startDate.getTime() > defaultToDate) {
      const nextDay = getNextDay(new Date(this.calendarData.endingDate));
      await this.addDatesToCalendar(nextDay, moment(endDate).add(2, 'months').format('YYYY-MM-DD'));
      this.scrollToElement(this.transformDateForScroll(startDate));
    }
  }
  closeSideMenu() {
    const calendarElement = this.element.querySelector('#iglooCalendar');
    calendarElement.classList.remove('showToBeAssigned');
    calendarElement.classList.remove('showLegend');
    this.showLegend = false;
    this.showToBeAssigned = false;
  }
  dragScrollContent(event) {
    this.scrollViewDragging = false;
    let isPreventPageScroll = event && event.target ? this.hasAncestorWithClass(event.target, 'preventPageScroll') : false;
    if (!isPreventPageScroll) {
      this.scrollViewDragPos = {
        // The current scroll
        left: this.scrollContainer.scrollLeft,
        top: this.scrollContainer.scrollTop,
        // Get the current mouse position
        x: event.clientX,
        y: event.clientY,
      };
      document.addEventListener('mousemove', this.onScrollContentMoveHandler);
      document.addEventListener('mouseup', this.onScrollContentMoveEndHandler);
    }
  }
  calendarScrolling() {
    if (this.scrollContainer) {
      const containerRect = this.scrollContainer.getBoundingClientRect();
      let leftSideMenuSize = 170;
      let maxWidth = containerRect.width - leftSideMenuSize;
      let leftX = containerRect.x + leftSideMenuSize;
      let rightX = containerRect.x + containerRect.width;
      let cells = Array.from(this.element.querySelectorAll('.monthCell'));
      if (cells.length) {
        cells.map(async (monthContainer) => {
          let monthRect = monthContainer.getBoundingClientRect();
          if (cells.indexOf(monthContainer) === cells.length - 1) {
            if (monthRect.x + monthRect.width <= rightX && !this.reachedEndOfCalendar) {
              this.reachedEndOfCalendar = true;
              //await this.addNextTwoMonthsToCalendar();
              const nextTwoMonths = addTwoMonthToDate(new Date(this.calendarData.endingDate));
              const nextDay = getNextDay(new Date(this.calendarData.endingDate));
              await this.addDatesToCalendar(nextDay, nextTwoMonths);
              this.reachedEndOfCalendar = false;
            }
          }
          if (monthRect.x + monthRect.width < leftX) {
            // item end is scrolled outside view, in -x
          }
          else if (monthRect.x > rightX) {
            // item is outside scrollview, in +x
          }
          else {
            let titleElement = monthContainer.querySelector('.monthTitle');
            let marginLeft = 0;
            let monthWidth = monthRect.width;
            if (monthRect.x < leftX) {
              marginLeft = Math.abs(monthRect.x) - leftX;
              marginLeft = monthRect.x < 0 ? Math.abs(monthRect.x) + leftX : Math.abs(marginLeft);
              monthWidth = monthRect.x + monthRect.width > rightX ? maxWidth : monthRect.x + monthRect.width - leftX;
            }
            else {
              monthWidth = maxWidth - monthWidth > monthWidth ? monthWidth : maxWidth - monthRect.x + leftX;
            }
            titleElement.style.marginLeft = marginLeft + 'px';
            titleElement.style.width = monthWidth + 'px';
          }
        });
      }
    }
  }
  hasAncestorWithClass(element, className) {
    let currentElement = element;
    while (currentElement !== null) {
      if (currentElement.matches(`.${className}`)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  showBookingPopupEventDataHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.onOptionSelect(event);
    //console.log("show booking event", event);
  }
  updateEventDataHandler(event) {
    let bookedData = this.calendarData.bookingEvents.find(bookedEvent => bookedEvent.id === event.detail.id);
    if (bookedData && event.detail && event.detail.data) {
      Object.entries(event.detail.data).forEach(([key, value]) => {
        bookedData[key] = value;
      });
    }
  }
  dragOverEventDataHandler(event) {
    if (event.detail.id === 'CALCULATE_DRAG_OVER_BOUNDS') {
      let topLeftCell = document.querySelector('igl-cal-header .topLeftCell');
      let containerDays = document.querySelectorAll('.headersContainer .headerCell');
      let containerRooms = document.querySelectorAll('.bodyContainer .roomRow .roomTitle');
      this.visibleCalendarCells = { x: [], y: [] };
      containerDays.forEach(element => {
        const htmlElement = element;
        this.visibleCalendarCells.x.push({
          left: htmlElement.offsetLeft + topLeftCell.offsetWidth,
          width: htmlElement.offsetWidth,
          id: htmlElement.getAttribute('data-day'),
        });
      });
      containerRooms.forEach(element => {
        const htmlElement = element;
        this.visibleCalendarCells.y.push({
          top: htmlElement.offsetTop,
          height: htmlElement.offsetHeight,
          id: htmlElement.getAttribute('data-room'),
        });
      });
      this.highlightDragOver(true, event.detail.data);
    }
    else if (event.detail.id === 'DRAG_OVER') {
      this.highlightDragOver(true, event.detail.data);
    }
    else if (event.detail.id === 'DRAG_OVER_END') {
      this.highlightDragOver(false, event.detail.data);
    }
    else if (event.detail.id === 'STRETCH_OVER_END') {
      this.highlightDragOver(false, event.detail.data);
    }
  }
  async highlightDragOver(hightLightElement, currentPosition) {
    let xElement, yElement;
    if (currentPosition) {
      xElement = this.visibleCalendarCells.x.find(pos => pos.left < currentPosition.x && currentPosition.x <= pos.left + pos.width);
      yElement = this.visibleCalendarCells.y.find(pos => pos.top < currentPosition.y && currentPosition.y <= pos.top + pos.height);
    }
    // console.log(hightLightElement+":::"+yElement.id+"_"+xElement.id);
    if (hightLightElement && xElement && yElement) {
      this.dragOverHighlightElement.emit({
        dragOverElement: yElement.id + '_' + xElement.id,
      });
    }
    else {
      this.dragOverHighlightElement.emit({ dragOverElement: '' });
    }
    if (!hightLightElement) {
      this.moveBookingTo.emit({
        bookingId: currentPosition.id,
        fromRoomId: currentPosition.fromRoomId,
        toRoomId: (yElement && yElement.id) || 'revert',
        moveToDay: (xElement && xElement.id) || 'revert',
        pool: currentPosition.pool,
        from_date: convertDMYToISO(xElement && xElement.id),
        to_date: computeEndDate(xElement && xElement.id, currentPosition.nbOfDays),
      });
    }
  }
  handleModalConfirm() {
    const { pool, toRoomId, from_date, to_date } = this.dialogData;
    this.eventsService
      .reallocateEvent(pool, toRoomId, from_date, to_date)
      .then(() => {
      this.dialogData = null;
    })
      .catch(() => {
      this.revertBooking.emit(pool);
    });
  }
  handleModalCancel() {
    this.revertBooking.emit(this.dialogData.pool);
    this.dialogData = null;
  }
  handleRoomNightsDialogClose(e) {
    if (e.detail.type === 'cancel') {
      this.revertBooking.emit(this.roomNightsData.pool);
    }
    this.roomNightsData = null;
  }
  handleSideBarToggle(e) {
    if (e.detail) {
      if (this.editBookingItem) {
        this.editBookingItem = null;
      }
      if (this.roomNightsData) {
        this.revertBooking.emit(this.roomNightsData.pool);
        this.roomNightsData = null;
      }
      if (this.dialogData) {
        this.revertBooking.emit(this.dialogData.pool);
        this.dialogData = null;
      }
    }
  }
  handleCloseBookingWindow() {
    this.bookingItem = null;
  }
  render() {
    var _a, _b;
    return (h(Host, null, h("ir-toast", null), h("ir-interceptor", null), h("ir-common", null), h("div", { id: "iglooCalendar", class: "igl-calendar" }, this.shouldRenderCalendarView() ? ([
      this.showToBeAssigned ? (h("igl-to-be-assigned", { unassignedDatesProp: this.unassignedDates, to_date: this.to_date, from_date: this.from_date, propertyid: this.propertyid, class: "tobeAssignedContainer", calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) })) : null,
      this.showLegend ? (h("igl-legends", { class: "legendContainer", legendData: this.calendarData.legendData, onOptionEvent: evt => this.onOptionSelect(evt) })) : null,
      h("div", { class: "calendarScrollContainer", onMouseDown: event => this.dragScrollContent(event), onScroll: () => this.calendarScrolling() }, h("div", { id: "calendarContainer" }, h("igl-cal-header", { unassignedDates: this.unassignedDates, to_date: this.to_date, propertyid: this.propertyid, today: this.today, calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) }), h("igl-cal-body", { language: this.language, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, today: this.today, isScrollViewDragging: this.scrollViewDragging, calendarData: this.calendarData }), h("igl-cal-footer", { today: this.today, calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) }))),
    ]) : (h("ir-loading-screen", { message: "Preparing Calendar Data" }))), this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowedBookingSources, adultChildConstraints: this.calendarData.adultChildConstraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() })), h("ir-sidebar", { onIrSidebarToggle: this.handleSideBarToggle.bind(this), open: this.roomNightsData !== null || (this.editBookingItem && this.editBookingItem.event_type === 'EDIT_BOOKING'), showCloseButton: this.editBookingItem !== null, sidebarStyles: { width: this.editBookingItem ? '80rem' : 'var(--sidebar-width,40rem)', background: this.roomNightsData ? 'white' : '#F2F3F8' } }, this.roomNightsData && (h("ir-room-nights", { pool: this.roomNightsData.pool, onCloseRoomNightsDialog: this.handleRoomNightsDialogClose.bind(this), language: this.language, bookingNumber: this.roomNightsData.bookingNumber, identifier: this.roomNightsData.identifier, toDate: this.roomNightsData.to_date, fromDate: this.roomNightsData.from_date, ticket: this.ticket, propertyId: this.propertyid })), this.editBookingItem && this.editBookingItem.event_type === 'EDIT_BOOKING' && (h("ir-booking-details", { hasPrint: true, hasReceipt: true, propertyid: this.propertyid, hasRoomEdit: true, hasRoomDelete: true, bookingNumber: this.editBookingItem.BOOKING_NUMBER, ticket: this.ticket, baseurl: this.baseurl, language: this.language }))), h("ir-modal", { modalTitle: '', rightBtnActive: this.dialogData ? !this.dialogData.hideConfirmButton : true, leftBtnText: (_a = locales === null || locales === void 0 ? void 0 : locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Cancel, rightBtnText: (_b = locales === null || locales === void 0 ? void 0 : locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Confirm, modalBody: this.dialogData ? this.dialogData.description : '', onConfirmModal: this.handleModalConfirm.bind(this), onCancelModal: this.handleModalCancel.bind(this) })));
  }
  static get is() { return "igloo-calendar"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igloo-calendar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igloo-calendar.css"]
    };
  }
  static get properties() {
    return {
      "propertyid": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "propertyid",
        "reflect": false
      },
      "from_date": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "from_date",
        "reflect": false
      },
      "to_date": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "to_date",
        "reflect": false
      },
      "language": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "language",
        "reflect": false
      },
      "baseurl": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "baseurl",
        "reflect": false
      },
      "loadingMessage": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "loading-message",
        "reflect": false
      },
      "currencyName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "currency-name",
        "reflect": false
      },
      "ticket": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "ticket",
        "reflect": true,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "calendarData": {},
      "days": {},
      "scrollViewDragging": {},
      "dialogData": {},
      "bookingItem": {},
      "editBookingItem": {},
      "showLegend": {},
      "showPaymentDetails": {},
      "showToBeAssigned": {},
      "unassignedDates": {},
      "roomNightsData": {},
      "renderAgain": {},
      "showBookProperty": {},
      "totalAvailabilityQueue": {}
    };
  }
  static get events() {
    return [{
        "method": "dragOverHighlightElement",
        "name": "dragOverHighlightElement",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "moveBookingTo",
        "name": "moveBookingTo",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "calculateUnassignedDates",
        "name": "calculateUnassignedDates",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "reduceAvailableUnitEvent",
        "name": "reduceAvailableUnitEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ fromDate: string; toDate: string }",
          "resolved": "{ fromDate: string; toDate: string; }",
          "references": {}
        }
      }, {
        "method": "revertBooking",
        "name": "revertBooking",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "deleteButton",
        "method": "handleDeleteEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "scrollPageToRoom",
        "method": "scrollPageToRoom",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "showDialog",
        "method": "handleShowDialog",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "showRoomNightsDialog",
        "method": "handleShowRoomNightsDialog",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "addBookingDatasEvent",
        "method": "handleBookingDatasChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "showBookingPopup",
        "method": "showBookingPopupEventDataHandler",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "updateEventData",
        "method": "updateEventDataHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "dragOverEventData",
        "method": "dragOverEventDataHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igloo-calendar.js.map
