import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as calendar_data } from './calendar-data.js';
import { d as defineCustomElement$1 } from './ir-combobox2.js';

// import calendar_data from '@/stores/calendar-data';
class IrMappingService {
  checkMappingExists(id, selected_channel) {
    return selected_channel.map.find(m => m.foreign_id === id);
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}";

const IrChannelMapping = /*@__PURE__*/ proxyCustomElement(class IrChannelMapping extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mappingService = new IrMappingService();
    this.selectedChannel = undefined;
    this.activeMapField = '';
  }
  componentWillLoad() {
    this.selectedChannel = calendar_data.channels[0];
  }
  renderMappingStatus(id) {
    const mappedField = this.mappingService.checkMappingExists(id, this.selectedChannel);
    if (mappedField) {
      return h("span", { class: "px-2" }, "exist");
    }
    return (h("span", { class: "px-2" }, this.activeMapField === id ? (h("ir-combobox", null)) : (h("span", { class: "cursor-pointer text-red", onClick: () => (this.activeMapField = id) }, "Not mapped"))));
  }
  render() {
    return (h(Host, null, h("ul", { class: "m-0 p-0" }, h("li", { class: "map-row my-2" }, h("span", { class: "font-weight-bold" }, calendar_data.channels[0].name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), h("span", { class: "font-weight-bold px-2" }, "Channel manager")), this.selectedChannel.property.room_types.map(room_type => (h("li", { key: room_type.id, class: "mb-1" }, h("div", { class: "map-row" }, h("span", null, room_type.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(room_type.id)), h("ul", { class: "m-0 p-0" }, room_type.rate_plans.map(rate_plan => (h("li", { class: "map-row", key: rate_plan.id }, h("span", { class: "submap-text" }, rate_plan.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(rate_plan.id)))))))))));
  }
  static get style() { return irChannelMappingCss; }
}, [2, "ir-channel-mapping", {
    "selectedChannel": [32],
    "activeMapField": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-mapping", "ir-combobox"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-mapping":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelMapping);
      }
      break;
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrChannelMapping as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-mapping2.js.map