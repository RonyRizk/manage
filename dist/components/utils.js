import { h as hooks } from './moment.js';

function convertDateToCustomFormat(dayWithWeekday, monthWithYear) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const [_, day] = dayWithWeekday.split(' ');
  const [month, year] = monthWithYear.split(' ');
  const monthIndex = months.indexOf(month);
  if (monthIndex !== -1) {
    return `${day}_${monthIndex + 1}_${year}`;
  }
  else {
    throw new Error('Invalid Month');
  }
}
function convertDateToTime(dayWithWeekday, monthWithYear) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const [_, day] = dayWithWeekday.split(' ');
  const [month, year] = monthWithYear.split(' ');
  const monthIndex = months.indexOf(month);
  if (monthIndex !== -1) {
    let date = new Date(`${year}-${monthIndex + 1}-${day}`);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }
  else {
    throw new Error('Invalid Month');
  }
}
function dateDifference(FROM_DATE, TO_DATE) {
  const startDate = new Date(FROM_DATE);
  const endDate = new Date(TO_DATE);
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}
function dateToFormattedString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-based in JS
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function formatLegendColors(legendData) {
  let formattedLegendData = {};
  const statusId = {
    'IN-HOUSE': { id: 1, clsName: 'IN_HOUSE' },
    'CONFIRMED': { id: 2, clsName: 'CONFIRMED' },
    'PENDING-CONFIRMATION': { id: 3, clsName: 'PENDING_CONFIRMATION' },
    'SPLIT-UNIT': { id: 4, clsName: 'SPLIT_UNIT' },
    'CHECKED-IN': { id: 5, clsName: 'CHECKED_IN' },
    'CHECKED-OUT': { id: 5, clsName: 'CHECKED_OUT' },
    'BLOCKED': { id: 6, clsName: 'BLOCKED' },
    'BLOCKED-WITH-DATES': { id: 7, clsName: 'BLOCKED_WITH_DATES' },
    'NOTES': { id: 8, clsName: 'NOTES' },
    'OUTSTANDING-BALANCE': { id: 9, clsName: 'OUTSTANDING_BALANCE' },
  };
  legendData.forEach(legend => {
    formattedLegendData[legend.id] = legend;
    formattedLegendData.statusId = statusId; // NOTE: This will overwrite the 'statusId' property with every iteration.
  });
  return formattedLegendData;
}
function getCurrencySymbol(currencyCode) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(0).replace(/[0-9]/g, '').trim();
}
const findCountry = (id, countries) => countries.find(country => country.id === id);
function getReleaseHoursString(releaseDate) {
  const dt = new Date();
  const releaseAfterHours = releaseDate;
  dt.setHours(dt.getHours() + releaseAfterHours, dt.getMinutes(), 0, 0);
  return {
    BLOCKED_TILL_DATE: dateToFormattedString(dt),
    BLOCKED_TILL_HOUR: dt.getHours().toString(),
    BLOCKED_TILL_MINUTE: dt.getMinutes().toString(),
  };
}
function computeEndDate(startDate, numberOfDays) {
  const dateObj = hooks(startDate, 'D_M_YYYY');
  dateObj.add(numberOfDays, 'days');
  return dateObj.format('YYYY-MM-DD');
}
function convertDMYToISO(date) {
  const dateObj = hooks(date, 'D_M_YYYY');
  return dateObj.format('YYYY-MM-DD');
}
function addTwoMonthToDate(date) {
  return hooks(date).add(2, 'months').format('YYYY-MM-DD');
}
function formatDate(dateString, option = 'DD MMM YYYY') {
  const formattedDate = hooks(dateString, option).format('ddd, DD MMM YYYY');
  return formattedDate;
}
function getNextDay(date) {
  return hooks(date).add(1, 'days').format('YYYY-MM-DD');
}

export { convertDateToTime as a, dateToFormattedString as b, convertDateToCustomFormat as c, dateDifference as d, getReleaseHoursString as e, formatDate as f, getCurrencySymbol as g, findCountry as h, formatLegendColors as i, getNextDay as j, addTwoMonthToDate as k, convertDMYToISO as l, computeEndDate as m };

//# sourceMappingURL=utils.js.map