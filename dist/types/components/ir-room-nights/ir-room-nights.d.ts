import { EventEmitter } from '../../stencil-public-runtime';
import { Booking, Day, Room } from '../../models/booking.dto';
import { IRoomNightsDataEventPayload } from '../../models/property-types';
import { Languages } from "../../components";
export declare class IrRoomNights {
  bookingNumber: string;
  baseUrl: string;
  propertyId: number;
  language: string;
  identifier: string;
  toDate: string;
  fromDate: string;
  pool: string;
  ticket: string;
  bookingEvent: Booking;
  selectedRoom: Room;
  defaultTexts: Languages;
  rates: Day[];
  isLoading: boolean;
  initialLoading: boolean;
  inventory: number | null;
  isEndDateBeforeFromDate: boolean;
  defaultTotalNights: number;
  closeRoomNightsDialog: EventEmitter<IRoomNightsDataEventPayload>;
  private bookingService;
  private unsubscribe;
  componentWillLoad(): void;
  updateStore(): void;
  isButtonDisabled(): boolean;
  init(): Promise<void>;
  disconnectedCallback(): void;
  handleInput(event: InputEvent, index: number): void;
  fetchBookingAvailability(from_date: string, to_date: string): Promise<void>;
  renderInputField(index: number, currency_symbol: string, day: Day): any;
  renderReadOnlyField(currency_symbol: string, day: Day): any;
  renderRateFields(index: number, currency_symbol: string, day: Day): any;
  renderDates(): any;
  handleRoomConfirmation(): Promise<void>;
  render(): any;
}