import { e as createStore } from './utils-f926fa09.js';

const initialState = {
  adultChildConstraints: {
    adult_max_nbr: 0,
    child_max_nbr: 0,
    child_max_age: 0,
  },
  allowedBookingSources: [],
  currency: undefined,
  endingDate: 0,
  formattedLegendData: undefined,
  is_vacation_rental: false,
  legendData: [],
  roomsInfo: [],
  startingDate: 0,
  language: '',
  toBeAssignedEvents: [],
  allowed_payment_methods: [],
  pickup_service: undefined,
  max_nights: 0,
};
const { state: calendar_data, onChange: onCalendarDatesChange } = createStore(initialState);

export { calendar_data as c };

//# sourceMappingURL=calendar-data-89cc5afa.js.map