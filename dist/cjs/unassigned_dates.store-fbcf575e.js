'use strict';

const calendarData = require('./calendar-data-54318796.js');
const utils = require('./utils-34918619.js');
const axios = require('./axios-5ba3068e.js');

class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        calendarData.calendar_data.adultChildConstraints = results.adult_child_constraints;
        calendarData.calendar_data.allowedBookingSources = results.allowed_booking_sources;
        calendarData.calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        calendarData.calendar_data.currency = results.currency;
        calendarData.calendar_data.is_vacation_rental = results.is_vacation_rental;
        calendarData.calendar_data.pickup_service = results.pickup_service;
        calendarData.calendar_data.max_nights = results.max_nights;
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async fetchLanguage(code) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        utils.locales.entries = entries;
        utils.locales.direction = data.My_Result.direction;
        return { entries, direction: data.My_Result.direction };
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  transformArrayToObject(data) {
    let object = {};
    for (const d of data) {
      object[d.code] = d.description;
    }
    return object;
  }
}

const initialState$1 = {
  days: [],
  months: [],
};
const { state: calendar_dates, onChange: onCalendarDatesChange } = utils.createStore(initialState$1);

const initialState = {};
let { state: unassigned_dates } = utils.createStore(initialState);
function addUnassingedDates(data) {
  unassigned_dates = Object.assign(Object.assign({}, unassigned_dates), data);
}
function getUnassignedDates() {
  return unassigned_dates;
}
function removeUnassignedDates(from_date, to_date) {
  const fromTimestamp = convertToDateTimestamp(from_date);
  const toTimestamp = convertToDateTimestamp(to_date);
  Object.keys(unassigned_dates).forEach(key => {
    const keyTimestamp = parseInt(key);
    if (fromTimestamp <= keyTimestamp && keyTimestamp <= toTimestamp) {
      delete unassigned_dates[key];
    }
  });
}
function convertToDateTimestamp(dateStr) {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

exports.RoomService = RoomService;
exports.addUnassingedDates = addUnassingedDates;
exports.calendar_dates = calendar_dates;
exports.getUnassignedDates = getUnassignedDates;
exports.removeUnassignedDates = removeUnassignedDates;

//# sourceMappingURL=unassigned_dates.store-fbcf575e.js.map