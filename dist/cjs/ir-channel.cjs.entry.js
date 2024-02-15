'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const room_service = require('./room.service-4c44d460.js');
const channel_store = require('./channel.store-9a8927a2.js');
const locales_store = require('./locales.store-7a5809fe.js');
const axios = require('./axios-01143d9d.js');

const irChannelCss = ".sc-ir-channel-h{display:block}";

const IrChannel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      const [, , languageTexts] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.getExposedChannels(),
        this.roomService.fetchLanguage(this.language),
      ]);
      console.log(languageTexts);
      if (!locales_store.locales.entries) {
        locales_store.locales.entries = languageTexts.entries;
        locales_store.locales.direction = languageTexts.direction;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  render() {
    var _a;
    return (index.h(index.Host, null, index.h("section", { class: "p-2" }, index.h("div", { class: "d-flex w-100 justify-content-end mb-2" }, index.h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), index.h("div", null, index.h("table", { class: "table" }, index.h("thead", { class: "" }, index.h("tr", null, index.h("th", { scope: "col", class: "text-left" }, "Title"), index.h("th", { scope: "col" }, "Channel"), index.h("th", { scope: "col" }, "Status"), index.h("th", { scope: "col" }, "Actions"))), index.h("tbody", null, (_a = channel_store.channels_data.connected_channels) === null || _a === void 0 ? void 0 : _a.map(channel => (index.h("tr", { key: channel.channel.id }, index.h("th", { scope: "row", class: "text-left" }, channel.title), index.h("th", { scope: "row" }, channel.channel.name), index.h("td", null, index.h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), index.h("th", null, index.h("div", { class: "btn-group" }, index.h("button", { type: "button", class: "btn  dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Actions"), index.h("div", { class: "dropdown-menu dropdown-menu-right" }, index.h("button", { class: "dropdown-item", type: "button" }, "Action"), index.h("button", { class: "dropdown-item", type: "button" }, "Another action"), index.h("button", { class: "dropdown-item", type: "button" }, "Something else here"))))))))))), index.h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, this.channel_status && index.h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrChannel.style = irChannelCss;

exports.ir_channel = IrChannel;

//# sourceMappingURL=ir-channel.cjs.entry.js.map