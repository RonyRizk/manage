import { proxyCustomElement, HTMLElement, h, Fragment, Host } from '@stencil/core/internal/client';
import { c as calendar_data } from './calendar-data.js';
import { c as channels_data, b as addMapping, d as setMappedChannel } from './channel.store.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$2 } from './ir-combobox2.js';
import { d as defineCustomElement$1 } from './ir-icon2.js';

class IrMappingService {
  removedMapping(ir_id, isRoomType) {
    let selectedChannels = [...channels_data.mappedChannels];
    if (isRoomType) {
      const toBeRemovedRoomType = calendar_data.roomsInfo.find(room => room.id.toString() === ir_id);
      selectedChannels = selectedChannels.filter(c => toBeRemovedRoomType.rateplans.find(rate_plan => rate_plan.id.toString() === c.ir_id) === undefined);
    }
    channels_data.mappedChannels = selectedChannels.filter(c => c.ir_id !== ir_id);
  }
  checkMappingExists(id, isRoomType, roomTypeId) {
    const mapped_id = channels_data.mappedChannels.find(m => m.channel_id === id);
    if (!mapped_id) {
      if (!isRoomType) {
        const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
        if (!matchingRoomType) {
          return { hide: true, result: undefined, occupancy: undefined };
        }
      }
      return { hide: false, result: undefined, occupancy: undefined };
    }
    if (isRoomType) {
      const room_type = calendar_data.roomsInfo.find(room => room.id.toString() === mapped_id.ir_id);
      return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type };
    }
    if (!roomTypeId) {
      throw new Error('Missing room type id');
    }
    const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    const room_type = calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    if (!room_type) {
      throw new Error('Invalid Room type');
    }
    return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type.rateplans.find(r => r.id.toString() === mapped_id.ir_id) };
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendar_data.roomsInfo.filter(room => channels_data.mappedChannels.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    if (!matchingRoomType) {
      throw new Error('Invalid room type id');
    }
    const selectedRoomType = calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    return selectedRoomType.rateplans
      .filter(rate_plan => channels_data.mappedChannels.find(r => rate_plan.id.toString() === r.ir_id) === undefined)
      .map(rate_plan => ({
      id: rate_plan.id.toString(),
      name: rate_plan.name,
    }));
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box;font-size:14px !important}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}.selected-map.sc-ir-channel-mapping svg.sc-ir-channel-mapping{margin:0 10px !important;flex-wrap:wrap}.selected-map.sc-ir-channel-mapping{flex:1}.selected-map-title.sc-ir-channel-mapping{flex:1}";

const IrChannelMapping = /*@__PURE__*/ proxyCustomElement(class IrChannelMapping extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mappingService = new IrMappingService();
    this.activeMapField = '';
    this.availableRooms = [];
  }
  setActiveField(id, isRoomType, roomTypeId) {
    const availableRooms = this.mappingService.getAppropriateRooms(isRoomType, roomTypeId);
    if (availableRooms) {
      this.availableRooms = availableRooms;
    }
    this.activeMapField = id;
  }
  renderMappingStatus(mappedField, id, isRoomType, roomTypeId) {
    var _a;
    if (mappedField.hide) {
      return h("td", null);
    }
    if (mappedField.result) {
      return (h(Fragment, null, h("td", { class: "px-2 d-sm-none text-blue d-flex align-items-center" }, h("span", { class: "m-0 p-0 d-flex align-items-center selected-map" }, h("span", { class: "selected-map-title" }, mappedField.result.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), mappedField.occupancy), h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => this.mappingService.removedMapping(mappedField.result.id.toString(), isRoomType) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))), h("td", { class: "px-2 d-none text-blue d-sm-flex align-items-center" }, h("span", { class: "m-0 p-0 d-flex align-items-center selected-map" }, mappedField.result.name, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), mappedField.occupancy), h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => this.mappingService.removedMapping(mappedField.result.id.toString(), isRoomType) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))));
    }
    return (h("td", { class: "px-2" }, this.activeMapField === id ? (h("ir-combobox", { autoFocus: true, placeholder: (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_ConnectedChannel, data: this.availableRooms, onComboboxValueChange: e => {
        addMapping(e.detail.data, this.activeMapField, isRoomType);
        this.activeMapField = '';
      } })) : (h("span", { class: "cursor-pointer text-danger", onClick: () => this.setActiveField(id, isRoomType, roomTypeId) }, locales.entries.Lcz_NotMapped))));
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (h(Host, null, h("div", { class: "d-flex w-100 justify-content-end" }, h("button", { onClick: () => {
        setMappedChannel();
      }, class: "btn refresh-btn" }, (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Refresh)), h("table", { class: "m-0 p-0 w-100" }, h("thead", { class: 'py-1' }, h("tr", { class: "py-1" }, h("th", { scope: "col", class: "py-1 pr-3" }, (_b = channels_data.selectedChannel) === null || _b === void 0 ? void 0 : _b.name), h("td", null, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" }))), h("th", { scope: "col", class: "px-2" }, "Igloorooms"))), h("tbody", null, (_e = (_d = (_c = channels_data.selectedChannel) === null || _c === void 0 ? void 0 : _c.property) === null || _d === void 0 ? void 0 : _d.room_types) === null || _e === void 0 ? void 0 : _e.map(room_type => {
      const mappedRoomType = this.mappingService.checkMappingExists(room_type.id, true);
      return (h(Fragment, null, h("tr", { key: room_type.id, class: "mb-1" }, h("td", null, room_type.name), h("td", null, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" }))), this.renderMappingStatus(mappedRoomType, room_type.id, true)), room_type.rate_plans.map(rate_plan => {
        const mappedRatePlan = this.mappingService.checkMappingExists(rate_plan.id, false, room_type.id);
        return (h("tr", { key: rate_plan.id, class: "" }, h("td", { class: "submap-text mb-1" }, rate_plan.name), h("td", null, !mappedRatePlan.hide && (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })))), this.renderMappingStatus(mappedRatePlan, rate_plan.id, false, room_type.id)));
      }), h("tr", null, h("td", { class: "py-1" }), h("td", null), h("td", null))));
    })))));
  }
  static get style() { return irChannelMappingCss; }
}, [2, "ir-channel-mapping", {
    "activeMapField": [32],
    "availableRooms": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-mapping", "ir-combobox", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-mapping":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelMapping);
      }
      break;
    case "ir-combobox":
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

export { IrChannelMapping as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-mapping2.js.map