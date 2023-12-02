import { BookUserParams } from '../../../models/igl-book-property';
export declare class IglBookPropertyService {
  onDataRoomUpdate(event: CustomEvent, selectedUnits: Map<string, Map<string, any>>, isEditBooking: boolean, name: string, pr_id: string, bookingData: any): Map<string, Map<string, any>>;
  private shouldClearData;
  private initializeRoomCategoryIfNeeded;
  private getRoomsListFromCategoryId;
  private setSelectedRoomData;
  private cleanupEmptyData;
  private applyBookingEditToSelectedRoom;
  prepareBookUserServiceParams(context: any, check_in: any): BookUserParams;
  private getBookingPreferenceRoomId;
  private getRoomCategoryByRoomId;
  setEditingRoomInfo(bookingData: any, selectedUnits: any): void;
}