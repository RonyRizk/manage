import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { a as axios } from './axios.js';
import { B as BookingService } from './booking.service.js';
import { o as getDaysArray, g as getCurrencySymbol, p as convertDatePrice, f as formatDate } from './utils.js';
import { h as hooks } from './moment.js';
import { l as locales } from './locales.store.js';
import { c as calendar_data } from './calendar-data.js';
import { d as defineCustomElement$2 } from './ir-button2.js';
import { d as defineCustomElement$1 } from './ir-icon2.js';
import { v as v4 } from './v4.js';

const irRoomNightsCss = ".sc-ir-room-nights-h{display:block;box-sizing:border-box;margin:0}.close-icon.sc-ir-room-nights{position:absolute;top:18px;right:33px;outline:none}.close.sc-ir-room-nights{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5;padding:0;background-color:transparent;border:0;appearance:none}.card.sc-ir-room-nights{top:0;z-index:1000}.card-title.sc-ir-room-nights{border-bottom:1px solid #e4e5ec;width:100%}.irfontgreen.sc-ir-room-nights{color:#0e930e}.currency.sc-ir-room-nights{display:block;position:absolute;margin:0;padding:0;height:auto;left:10px}.rate-input.sc-ir-room-nights{font-size:14px;line-height:0;padding:0;height:0;border-left:0;border-radius:0.25rem !important}.rate-input-container.sc-ir-room-nights{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;flex:1}.new-currency.sc-ir-room-nights{color:#3b4781;border:1px solid #cacfe7;font-size:0.975rem;height:2rem;background:rgb(255, 255, 255);padding-right:0 !important;border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.input-group-prepend.sc-ir-room-nights span[data-state='focus'].sc-ir-room-nights{border-color:var(--blue)}.input-group-prepend.sc-ir-room-nights span[data-disabled].sc-ir-room-nights{background-color:#eceff1;border-color:rgba(118, 118, 118, 0.3)}.rateInputBorder.sc-ir-room-nights{padding-left:5px !important;padding-right:5px !important;border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}";

const IrRoomNights = /*@__PURE__*/ proxyCustomElement(class IrRoomNights extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.closeRoomNightsDialog = createEvent(this, "closeRoomNightsDialog", 7);
    this.bookingService = new BookingService();
    this.bookingNumber = undefined;
    this.baseUrl = undefined;
    this.propertyId = undefined;
    this.language = undefined;
    this.identifier = undefined;
    this.toDate = undefined;
    this.fromDate = undefined;
    this.pool = undefined;
    this.ticket = undefined;
    this.bookingEvent = undefined;
    this.selectedRoom = undefined;
    this.rates = [];
    this.isLoading = false;
    this.initialLoading = false;
    this.inventory = null;
    this.isEndDateBeforeFromDate = false;
    this.defaultTotalNights = 0;
    this.isInputFocused = -1;
  }
  componentWillLoad() {
    this.bookingService.setToken(calendar_data.token);
    if (this.baseUrl) {
      axios.defaults.baseURL = this.baseUrl;
    }
    this.init();
  }
  isButtonDisabled() {
    return this.isLoading || this.rates.some(rate => rate.amount === -1) || this.inventory === 0 || this.inventory === null;
  }
  async init() {
    var _a;
    try {
      this.bookingEvent = await this.bookingService.getExposedBooking(this.bookingNumber, this.language);
      if (this.bookingEvent) {
        const filteredRooms = this.bookingEvent.rooms.filter(room => room.identifier === this.identifier);
        this.selectedRoom = filteredRooms[0];
        const lastDay = (_a = this.selectedRoom) === null || _a === void 0 ? void 0 : _a.days[this.selectedRoom.days.length - 1];
        //let first_rate = this.selectedRoom.days[0].amount;
        if (hooks(this.toDate).add(-1, 'days').isSame(hooks(lastDay.date))) {
          const amount = await this.fetchBookingAvailability(this.fromDate, this.selectedRoom.days[0].date, this.selectedRoom.rateplan.id, this.selectedRoom.rateplan.selected_variation.adult_child_offering);
          const newDatesArr = getDaysArray(this.selectedRoom.days[0].date, this.fromDate);
          this.isEndDateBeforeFromDate = true;
          this.rates = [
            ...newDatesArr.map(day => ({
              amount,
              date: day,
            })),
            ...this.selectedRoom.days,
          ];
        }
        else {
          const amount = await this.fetchBookingAvailability(lastDay.date, hooks(this.toDate, 'YYYY-MM-DD').add(-1, 'days').format('YYYY-MM-DD'), this.selectedRoom.rateplan.id, this.selectedRoom.rateplan.selected_variation.adult_child_offering);
          const newDatesArr = getDaysArray(lastDay.date, this.toDate);
          this.rates = [
            ...this.selectedRoom.days,
            ...newDatesArr.map(day => ({
              amount,
              date: day,
            })),
          ];
        }
        this.defaultTotalNights = this.rates.length - this.selectedRoom.days.length;
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  handleInput(event, index) {
    let inputElement = event.target;
    let inputValue = inputElement.value;
    let days = [...this.rates];
    inputValue = inputValue.replace(/[^0-9.]/g, '');
    if (inputValue === '') {
      days[index].amount = -1;
    }
    else {
      const decimalCheck = inputValue.split('.');
      if (decimalCheck.length > 2) {
        inputValue = inputValue.substring(0, inputValue.length - 1);
        inputElement.value = inputValue;
      }
      else if (decimalCheck.length === 2 && decimalCheck[1].length > 2) {
        inputValue = `${decimalCheck[0]}.${decimalCheck[1].substring(0, 2)}`;
        inputElement.value = inputValue;
      }
      if (!isNaN(Number(inputValue))) {
        days[index].amount = Number(inputValue);
      }
    }
    this.rates = days;
    console.log(this.rates);
  }
  async fetchBookingAvailability(from_date, to_date, rate_plan_id, selected_variation) {
    try {
      this.initialLoading = true;
      const bookingAvailability = await this.bookingService.getBookingAvailability(from_date, to_date, this.propertyId, {
        adult: this.selectedRoom.rateplan.selected_variation.adult_nbr,
        child: this.selectedRoom.rateplan.selected_variation.child_nbr,
      }, this.language, [this.selectedRoom.roomtype.id], this.bookingEvent.currency);
      this.inventory = bookingAvailability.roomtypes[0].inventory;
      const rate_plan_index = bookingAvailability.roomtypes[0].rateplans.find(rate => rate.id === rate_plan_id);
      const { amount } = rate_plan_index.variations.find(variation => variation.adult_child_offering === selected_variation);
      return amount;
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.initialLoading = false;
    }
  }
  renderInputField(index, currency_symbol, day) {
    return (h("fieldset", { class: "col-2 ml-1 position-relative has-icon-left m-0 p-0 rate-input-container" }, h("div", { class: "input-group-prepend bg-white" }, h("span", { "data-disabled": this.inventory === 0 || this.inventory === null, "data-state": this.isInputFocused === index ? 'focus' : '', class: "input-group-text new-currency", id: "basic-addon1" }, currency_symbol)), h("input", { onFocus: () => (this.isInputFocused = index), onBlur: () => (this.isInputFocused = -1), disabled: this.inventory === 0 || this.inventory === null, type: "text", class: "form-control bg-white pl-0 input-sm rate-input py-0 m-0 rateInputBorder", id: v4(), value: day.amount > 0 ? day.amount : '', placeholder: locales.entries.Lcz_Rate || 'Rate', onInput: event => this.handleInput(event, index) })));
  }
  renderReadOnlyField(currency_symbol, day) {
    return h("p", { class: "col-9 ml-1 m-0 p-0" }, `${currency_symbol}${Number(day.amount).toFixed(2)}`);
  }
  renderRateFields(index, currency_symbol, day) {
    if (this.isEndDateBeforeFromDate) {
      if (index < this.defaultTotalNights) {
        return this.renderInputField(index, currency_symbol, day);
      }
      else {
        return this.renderReadOnlyField(currency_symbol, day);
      }
    }
    else {
      return index < this.selectedRoom.days.length ? this.renderReadOnlyField(currency_symbol, day) : this.renderInputField(index, currency_symbol, day);
    }
  }
  renderDates() {
    var _a;
    const currency_symbol = getCurrencySymbol(this.bookingEvent.currency.code);
    return (h("div", { class: 'mt-2 m-0' }, (_a = this.rates) === null || _a === void 0 ? void 0 : _a.map((day, index) => (h("div", { class: 'row m-0 mt-1 align-items-center' }, h("p", { class: 'col-2 m-0 p-0' }, convertDatePrice(day.date)), this.renderRateFields(index, currency_symbol, day))))));
  }
  async handleRoomConfirmation() {
    try {
      this.isLoading = true;
      let oldRooms = [...this.bookingEvent.rooms];
      let selectedRoomIndex = oldRooms.findIndex(room => room.identifier === this.identifier);
      if (selectedRoomIndex === -1) {
        throw new Error('Invalid Pool');
      }
      oldRooms[selectedRoomIndex] = Object.assign(Object.assign({}, oldRooms[selectedRoomIndex]), { days: this.rates, to_date: this.toDate, from_date: this.fromDate });
      const body = {
        assign_units: true,
        check_in: true,
        is_pms: true,
        is_direct: true,
        booking: {
          booking_nbr: this.bookingNumber,
          from_date: this.fromDate,
          to_date: this.toDate,
          remark: this.bookingEvent.remark,
          property: this.bookingEvent.property,
          source: this.bookingEvent.source,
          currency: this.bookingEvent.currency,
          arrival: this.bookingEvent.arrival,
          guest: this.bookingEvent.guest,
          rooms: oldRooms,
        },
      };
      const { data } = await axios.post(`/DoReservation?Ticket=${this.ticket}`, body);
      if (data.ExceptionMsg !== '') {
        throw new Error(data.ExceptionMsg);
      }
      this.closeRoomNightsDialog.emit({ type: 'confirm', pool: this.pool });
    }
    catch (error) {
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    var _a, _b, _c;
    if (!this.bookingEvent) {
      return h("p", null, locales.entries.Lcz_Loading);
    }
    return (h(Host, null, h("div", { class: "card position-sticky mb-0 shadow-none p-0 " }, h("div", { class: "d-flex mt-2 align-items-center justify-content-between " }, h("h3", { class: "card-title text-left pb-1 font-medium-2 px-2" }, locales.entries.Lcz_AddingRoomNightsTo, " ", (_b = (_a = this.selectedRoom) === null || _a === void 0 ? void 0 : _a.roomtype) === null || _b === void 0 ? void 0 :
      _b.name, " ", ((_c = this.selectedRoom) === null || _c === void 0 ? void 0 : _c.unit).name), h("button", { type: "button", class: "close close-icon", onClick: () => this.closeRoomNightsDialog.emit({ type: 'cancel', pool: this.pool }) }, h("ir-icon", { icon: "ft-x", class: 'm-0' })))), h("section", { class: 'text-left px-2' }, h("p", { class: 'font-medium-1' }, `${locales.entries.Lcz_Booking}#`, " ", this.bookingNumber), h("p", { class: 'font-weight-bold font-medium-1' }, `${formatDate(this.fromDate, 'YYYY-MM-DD')} - ${formatDate(this.toDate, 'YYYY-MM-DD')}`), this.initialLoading ? (h("p", { class: 'mt-2 text-secondary' }, locales.entries['Lcz_CheckingRoomAvailability '])) : (h(Fragment, null, h("p", { class: 'font-medium-1 mb-0' }, `${this.selectedRoom.rateplan.name}`, " ", this.selectedRoom.rateplan.is_non_refundable && h("span", { class: 'irfontgreen' }, locales.entries.Lcz_NonRefundable)), (this.inventory === 0 || this.inventory === null) && h("p", { class: "font-medium-1 text danger" }, locales.entries.Lcz_NoAvailabilityForAdditionalNights), this.selectedRoom.rateplan.custom_text && h("p", { class: 'text-secondary mt-0' }, this.selectedRoom.rateplan.custom_text), this.renderDates()))), h("section", { class: 'd-flex align-items-center mt-2 px-2' }, h("ir-button", { btn_color: "secondary", btn_disabled: this.isLoading, text: locales === null || locales === void 0 ? void 0 : locales.entries.Lcz_Cancel, class: "full-width", btn_styles: "justify-content-center", onClickHanlder: () => this.closeRoomNightsDialog.emit({ type: 'cancel', pool: this.pool }) }), this.inventory > 0 && this.inventory !== null && (h("ir-button", { isLoading: this.isLoading, text: locales === null || locales === void 0 ? void 0 : locales.entries.Lcz_Confirm, btn_disabled: this.isButtonDisabled(), class: "ml-1 full-width", btn_styles: "justify-content-center", onClickHanlder: this.handleRoomConfirmation.bind(this) })))));
  }
  static get style() { return irRoomNightsCss; }
}, [2, "ir-room-nights", {
    "bookingNumber": [1, "booking-number"],
    "baseUrl": [1, "base-url"],
    "propertyId": [2, "property-id"],
    "language": [1],
    "identifier": [1],
    "toDate": [1, "to-date"],
    "fromDate": [1, "from-date"],
    "pool": [1],
    "ticket": [1],
    "bookingEvent": [32],
    "selectedRoom": [32],
    "rates": [32],
    "isLoading": [32],
    "initialLoading": [32],
    "inventory": [32],
    "isEndDateBeforeFromDate": [32],
    "defaultTotalNights": [32],
    "isInputFocused": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-room-nights", "ir-button", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-room-nights":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrRoomNights);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrRoomNights as I, defineCustomElement as d };

//# sourceMappingURL=ir-room-nights2.js.map