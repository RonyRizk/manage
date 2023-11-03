import { p as promiseResolve, b as bootstrapLazy } from './index-f0d77d3a.js';
export { s as setNonce } from './index-f0d77d3a.js';

/*
 Stencil Client Patch Browser v4.0.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy(JSON.parse("[[\"ir-channel-manager\",[[0,\"ir-channel-manager\",{\"hostRoom\":[16],\"mapReference\":[16],\"allowed_properties\":[16],\"allowed_channels\":[16],\"allowed_MinStayTypes\":[16],\"dropdownData\":[16],\"listData\":[1040],\"loader\":[32],\"mode\":[32],\"activeTab\":[32],\"selectedItem\":[32],\"item\":[32],\"anyChanges\":[32]},[[0,\"connectionOff\",\"connectionOffHandler\"],[0,\"sendToParent\",\"sendToParentHandler\"],[0,\"sendMappingToParent\",\"sendMappingToParentHandler\"],[0,\"createNew\",\"openSidebarHandler\"],[0,\"sendDelete\",\"requestDelete\"],[0,\"changeStatus\",\"changeStatusHandler\"]]]]],[\"ir-booking-details\",[[0,\"ir-booking-details\",{\"bookingDetails\":[1544,\"booking-details\"],\"setupDataCountries\":[16],\"setupDataCountriesCode\":[16],\"languageAbreviation\":[1,\"language-abreviation\"],\"dropdownStatuses\":[1032,\"dropdown-statuses\"],\"paymentDetailsUrl\":[1,\"payment-details-url\"],\"paymentExceptionMessage\":[1,\"payment-exception-message\"],\"statusCodes\":[8,\"status-codes\"],\"hasPrint\":[4,\"has-print\"],\"hasReceipt\":[4,\"has-receipt\"],\"hasDelete\":[4,\"has-delete\"],\"hasMenu\":[4,\"has-menu\"],\"hasRoomEdit\":[4,\"has-room-edit\"],\"hasRoomDelete\":[4,\"has-room-delete\"],\"hasRoomAdd\":[4,\"has-room-add\"],\"hasCheckIn\":[4,\"has-check-in\"],\"hasCheckOut\":[4,\"has-check-out\"],\"statusData\":[32],\"tempStatus\":[32],\"guestData\":[32],\"rerenderFlag\":[32]},[[0,\"iconClickHandler\",\"handleIconClick\"],[0,\"irSidebarToggle\",\"handleSidebarToggle\"],[0,\"editSidebar\",\"handleEditSidebar\"],[0,\"submitForm\",\"handleFormSubmit\"],[0,\"selectChange\",\"handleSelectChange\"],[0,\"clickHanlder\",\"handleClick\"]]]]],[\"ir-checkboxes\",[[0,\"ir-checkboxes\",{\"checkboxes\":[16]},[[0,\"checkboxChange\",\"handleCheckboxChange\"]]]]],[\"ir-span\",[[0,\"ir-span\",{\"text\":[8]}]]],[\"ir-switch\",[[0,\"ir-switch\",{\"value\":[1028],\"labelOn\":[1,\"label-on\"],\"labelOff\":[1,\"label-off\"],\"size\":[1],\"switch_animate\":[4],\"disabled\":[4],\"readonly\":[4],\"indeterminate\":[4],\"inverse\":[4],\"radioAllOff\":[4,\"radio-all-off\"],\"colorOn\":[1,\"color-on\"],\"offColor\":[1,\"off-color\"],\"classOn\":[1,\"class-on\"],\"offClass\":[1,\"off-class\"],\"labelText\":[1,\"label-text\"],\"handleWidth\":[1,\"handle-width\"],\"labelWidth\":[1,\"label-width\"],\"baseClass\":[1,\"base-class\"],\"wrapperClass\":[1,\"wrapper-class\"]}]]],[\"ir-textarea\",[[0,\"ir-textarea\",{\"rows\":[2],\"cols\":[2],\"text\":[1],\"label\":[1],\"placeholder\":[1]}]]],[\"ir-icon\",[[0,\"ir-icon\",{\"icon\":[1]}]]],[\"ir-dropdown\",[[0,\"ir-dropdown\",{\"data\":[16],\"object\":[520],\"show\":[32]}]]],[\"ir-label\",[[0,\"ir-label\",{\"label\":[1],\"value\":[1],\"iconShown\":[4,\"icon-shown\"],\"imageSrc\":[1,\"image-src\"]}]]],[\"ir-sidebar\",[[4,\"ir-sidebar\",{\"name\":[1],\"side\":[1],\"open\":[1540],\"toggleSidebar\":[64]}]]],[\"ir-checkbox\",[[0,\"ir-checkbox\",{\"name\":[1],\"checked\":[1540],\"label\":[1],\"disabled\":[4],\"value\":[1],\"labelPosition\":[1,\"label-position\"]}]]],[\"ir-input-text_2\",[[0,\"ir-input-text\",{\"name\":[1],\"value\":[8],\"label\":[1],\"placeholder\":[1],\"required\":[4],\"LabelAvailable\":[4,\"label-available\"],\"type\":[1],\"submited\":[4],\"inputStyle\":[4,\"input-style\"],\"size\":[1],\"textSize\":[1,\"text-size\"],\"labelPosition\":[1,\"label-position\"],\"labelBackground\":[1,\"label-background\"],\"labelColor\":[1,\"label-color\"],\"labelBorder\":[1,\"label-border\"],\"labelWidth\":[2,\"label-width\"],\"valid\":[32],\"initial\":[32]}],[0,\"ir-select\",{\"name\":[1],\"data\":[16],\"label\":[1],\"selectedValue\":[1544,\"selected-value\"],\"required\":[4],\"LabelAvailable\":[4,\"label-available\"],\"firstOption\":[1,\"first-option\"],\"selectStyle\":[4,\"select-style\"],\"submited\":[4],\"size\":[1],\"textSize\":[1,\"text-size\"],\"labelPosition\":[1,\"label-position\"],\"labelBackground\":[1,\"label-background\"],\"labelColor\":[1,\"label-color\"],\"labelBorder\":[1,\"label-border\"],\"labelWidth\":[2,\"label-width\"],\"initial\":[32],\"valid\":[32]}]]],[\"ir-button_2\",[[0,\"ir-modal\",{\"modalTitle\":[1,\"modal-title\"],\"modalBody\":[1,\"modal-body\"],\"rightBtnActive\":[4,\"right-btn-active\"],\"leftBtnActive\":[4,\"left-btn-active\"],\"rightBtnText\":[1,\"right-btn-text\"],\"leftBtnText\":[1,\"left-btn-text\"],\"rightBtnColor\":[1,\"right-btn-color\"],\"leftBtnColor\":[1,\"left-btn-color\"],\"btnPosition\":[1,\"btn-position\"],\"iconAvailable\":[4,\"icon-available\"],\"icon\":[1],\"item\":[8],\"isOpen\":[32],\"closeModal\":[64],\"openModal\":[64]},[[0,\"clickHanlder\",\"btnClickHandler\"]]],[0,\"ir-button\",{\"name\":[1],\"text\":[8],\"icon\":[1],\"btn_color\":[1],\"size\":[1],\"textSize\":[1,\"text-size\"],\"btn_block\":[4],\"btn_disabled\":[4],\"btn_type\":[1]}]]],[\"ir-guest-info_3\",[[0,\"ir-guest-info\",{\"setupDataCountries\":[1040],\"setupDataCountriesCode\":[1040],\"data\":[1040],\"Model\":[32],\"gotdata\":[32],\"submit\":[32]},[[0,\"textChange\",\"handleInputChange\"],[0,\"checkboxChange\",\"handleInputChange\"],[0,\"selectChange\",\"handleInputChange\"],[0,\"clickHanlder\",\"handleSubmit\"]]],[0,\"ir-payment-details\",{\"item\":[1544],\"paymentDetailsUrl\":[1,\"payment-details-url\"],\"paymentExceptionMessage\":[1,\"payment-exception-message\"],\"newTableRow\":[32],\"collapsedPayment\":[32],\"collapsedGuarantee\":[32],\"flag\":[32],\"confirmModal\":[32],\"toBeDeletedItem\":[32]},[[0,\"confirmModal\",\"handleConfirmModal\"]]],[0,\"ir-room\",{\"item\":[8],\"mealCodeName\":[1,\"meal-code-name\"],\"myRoomTypeFoodCat\":[1,\"my-room-type-food-cat\"],\"currency\":[1],\"hasRoomEdit\":[4,\"has-room-edit\"],\"hasRoomDelete\":[4,\"has-room-delete\"],\"hasRoomAdd\":[4,\"has-room-add\"],\"hasCheckIn\":[4,\"has-check-in\"],\"hasCheckOut\":[4,\"has-check-out\"],\"collapsed\":[32]},[[0,\"clickHanlder\",\"handleClick\"]]]]],[\"ir-general-settings_5\",[[0,\"ir-general-settings\",{\"mode\":[1],\"allowed_channels\":[16],\"allowed_properties\":[16],\"allowed_MinStayTypes\":[16],\"connectionStatus\":[1537,\"connection-status\"],\"data\":[1040],\"testLoader\":[32],\"selectedChannel\":[32],\"connected\":[32]}],[0,\"ir-list-item\",{\"dropdownData\":[16],\"dropdownDataDisable\":[16],\"listData\":[16],\"type\":[32]},[[0,\"confirmModal\",\"doAction\"]]],[0,\"ir-mapping\",{\"mapReference\":[16],\"hostRoom\":[16],\"map\":[16],\"_onSaveMapping\":[64]}],[0,\"ir-topbar\"],[0,\"ir-loader\",{\"size\":[1]}]]],[\"igl-application-info_22\",[[2,\"igloo-calendar\",{\"propertyid\":[2],\"from_date\":[1],\"to_date\":[1],\"language\":[1],\"baseurl\":[1],\"loadingMessage\":[1,\"loading-message\"],\"currencyName\":[1,\"currency-name\"],\"ticket\":[513],\"calendarData\":[32],\"days\":[32],\"scrollViewDragging\":[32],\"bookingItem\":[32],\"showLegend\":[32],\"showToBeAssigned\":[32]},[[0,\"deleteButton\",\"handledeleteEvent\"],[8,\"scrollPageToRoom\",\"scrollPageToRoom\"],[8,\"showBookingPopup\",\"showBookingPopupEventDataHandler\"],[0,\"updateEventData\",\"updateEventDataHandler\"],[0,\"dragOverEventData\",\"dragOverEventDataHandler\"]]],[2,\"igl-book-property\",{\"propertyid\":[2],\"language\":[1],\"countryNodeList\":[8,\"country-node-list\"],\"currency\":[16],\"bookingData\":[1040],\"sourceOption\":[32],\"splitBookingId\":[32],\"renderAgain\":[32],\"message\":[32],\"isLoading\":[32],\"isConvertedBooking\":[32],\"dateRangeData\":[32],\"selectedUnits\":[32]},[[8,\"gotoSplitPageTwoEvent\",\"gotoSplitPageTwo\"]]],[2,\"igl-cal-body\",{\"isScrollViewDragging\":[4,\"is-scroll-view-dragging\"],\"calendarData\":[16],\"today\":[16],\"currency\":[8],\"countryNodeList\":[8,\"country-node-list\"],\"dragOverElement\":[32],\"renderAgain\":[32]},[[8,\"dragOverHighlightElement\",\"dragOverHighlightElementHandler\"],[8,\"gotoRoomEvent\",\"gotoRoom\"],[8,\"addToBeAssignedEvent\",\"addToBeAssignedEvents\"],[8,\"closeBookingWindow\",\"closeWindow\"]]],[2,\"igl-to-be-assigned\",{\"propertyid\":[2],\"from_date\":[1],\"to_date\":[1],\"loadingMessage\":[1,\"loading-message\"],\"calendarData\":[1040],\"showDatesList\":[32],\"renderAgain\":[32],\"orderedDatesList\":[32],\"isLoading\":[32]},[[8,\"gotoToBeAssignedDate\",\"gotoDate\"]]],[2,\"igl-cal-footer\",{\"calendarData\":[16],\"today\":[16]}],[2,\"igl-cal-header\",{\"calendarData\":[16],\"today\":[16],\"renderAgain\":[32]},[[8,\"reduceAvailableUnitEvent\",\"handleReduceAvailableUnitEvent\"]]],[2,\"igl-legends\",{\"legendData\":[16]}],[4,\"ir-common\",{\"extraResources\":[513,\"extra-resources\"],\"resources\":[32]}],[2,\"ir-interceptor\",{\"defaultMessage\":[1040],\"handledEndpoints\":[16],\"isShown\":[32],\"isLoading\":[32],\"isSuccess\":[32]}],[2,\"igl-pagetwo\",{\"isEditOrAddRoomEvent\":[516,\"is-edit-or-add-room-event\"],\"dateRangeData\":[16],\"bookingData\":[16],\"showSplitBookingOption\":[4,\"show-split-booking-option\"],\"language\":[1],\"bookedByInfoData\":[16],\"bedPreferenceType\":[8,\"bed-preference-type\"],\"selectedRooms\":[8,\"selected-rooms\"],\"isLoading\":[513,\"is-loading\"],\"countryNodeList\":[8,\"country-node-list\"],\"guestData\":[32],\"selectedUnits\":[32]}],[2,\"igl-booking-event\",{\"currency\":[8],\"bookingEvent\":[16],\"allBookingEvents\":[16],\"countryNodeList\":[8,\"country-node-list\"],\"renderElement\":[32],\"position\":[32]},[[8,\"click\",\"handleClickOutside\"],[8,\"hideBubbleInfo\",\"hideBubbleInfoPopup\"],[8,\"moveBookingTo\",\"moveBookingToHandler\"]]],[2,\"igl-booking-rooms\",{\"roomTypeData\":[1040],\"defaultData\":[16],\"bookingType\":[1,\"booking-type\"],\"dateDifference\":[514,\"date-difference\"],\"ratePricingMode\":[16],\"currency\":[8],\"selectedRooms\":[32],\"roomsDistributions\":[32]}],[2,\"igl-date-range\",{\"message\":[513],\"defaultData\":[16],\"renderAgain\":[32]}],[2,\"igl-tba-category-view\",{\"calendarData\":[16],\"selectedDate\":[8,\"selected-date\"],\"categoriesData\":[16],\"categoryId\":[8,\"category-id\"],\"eventDatas\":[1032,\"event-datas\"],\"categoryIndex\":[8,\"category-index\"],\"renderAgain\":[32]}],[2,\"igl-application-info\",{\"guestInfo\":[16],\"roomsList\":[1040],\"guestRefKey\":[1,\"guest-ref-key\"],\"bedPreferenceType\":[16],\"selectedUnits\":[16],\"bookingType\":[1,\"booking-type\"],\"index\":[2],\"filterdRoomList\":[32]}],[2,\"igl-booking-event-hover\",{\"bookingEvent\":[1040],\"bubbleInfoTop\":[4,\"bubble-info-top\"],\"currency\":[8],\"countryNodeList\":[16],\"isLoading\":[32]}],[2,\"igl-booking-room-rate-plan\",{\"defaultData\":[16],\"ratePlanData\":[1040],\"totalAvailableRooms\":[2,\"total-available-rooms\"],\"ratePricingMode\":[16],\"currency\":[8],\"dateDifference\":[514,\"date-difference\"],\"bookingType\":[1,\"booking-type\"],\"sourceOption\":[32],\"selectedData\":[32],\"plan\":[32]}],[2,\"igl-property-booked-by\",{\"language\":[1],\"defaultData\":[16],\"countryNodeList\":[16],\"bookedByData\":[32]}],[2,\"igl-tba-booking-view\",{\"calendarData\":[16],\"selectedDate\":[8,\"selected-date\"],\"eventData\":[16],\"categoriesData\":[16],\"categoryId\":[8,\"category-id\"],\"categoryIndex\":[8,\"category-index\"],\"eventIndex\":[8,\"event-index\"],\"renderAgain\":[32],\"selectedRoom\":[32]},[[8,\"highlightToBeAssignedBookingEvent\",\"highlightBookingEvent\"]]],[2,\"ir-date-picker\",{\"fromDate\":[16],\"toDate\":[16],\"opens\":[513],\"autoApply\":[516,\"auto-apply\"],\"firstDay\":[514,\"first-day\"],\"monthNames\":[16],\"daysOfWeek\":[16],\"format\":[513],\"separator\":[513],\"applyLabel\":[513,\"apply-label\"],\"cancelLabel\":[513,\"cancel-label\"],\"fromLabel\":[513,\"from-label\"],\"toLabel\":[513,\"to-label\"],\"customRangeLabel\":[513,\"custom-range-label\"],\"weekLabel\":[513,\"week-label\"],\"maxSpan\":[520,\"max-span\"]}],[2,\"igl-block-dates-view\",{\"defaultData\":[16],\"fromDate\":[1,\"from-date\"],\"toDate\":[1,\"to-date\"],\"entryDate\":[1025,\"entry-date\"],\"entryHour\":[2,\"entry-hour\"],\"entryMinute\":[2,\"entry-minute\"],\"renderAgain\":[32]}],[2,\"ir-tooltip\",{\"message\":[513],\"open\":[32]}]]]]"), options);
});

//# sourceMappingURL=ir-webcmp.js.map