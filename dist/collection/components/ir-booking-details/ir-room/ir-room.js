import { h } from "@stencil/core";
import { _formatAmount, _formatDate, _getDay } from "../functions";
export class IrRoom {
  constructor() {
    this.item = undefined;
    this.mealCodeName = undefined;
    this.myRoomTypeFoodCat = undefined;
    this.currency = 'USD';
    this.collapsed = false;
    this.hasRoomEdit = false;
    this.hasRoomDelete = false;
    this.hasRoomAdd = false;
    this.hasCheckIn = false;
    this.hasCheckOut = false;
  }
  handleClick(e) {
    let target = e.target;
    if (target.id == 'checkin') {
      this.pressCheckIn.emit(this.item);
    }
    else if (target.id == 'checkout') {
      this.pressCheckOut.emit(this.item);
    }
  }
  // _getFoodArrangeCat(catCode: string) {
  //   // get the category from the foodArrangeCats array
  //   const cat = this.mealCode.find((cat: any) => cat.CODE_NAME === catCode);
  //   // return the category
  //   return cat.CODE_VALUE_EN;
  // }
  render() {
    return (h("div", { class: "p-1 d-flex" }, h("ir-icon", { id: "drawer-icon", icon: `${this.collapsed ? 'ft-eye-off' : 'ft-eye'} h2 color-ir-dark-blue-hover`, "data-toggle": "collapse", "data-target": `#roomCollapse-${this.item.BSA_ID}`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: () => {
        this.collapsed = !this.collapsed;
      } }), h("div", { class: "w-100" }, h("div", { class: "d-flex justify-content-between" }, h("div", null, h("strong", null, this.item.My_Room_type.My_Room_category.NAME || '', " "), " ", this.myRoomTypeFoodCat, " -", ' ', this.item.My_Room_type.IS_NON_REFUNDABLE ? 'Refundable' : 'Non-refundable', " ", this.item.My_Room_type.My_Room_type_desc[0].CUSTOM_TXT || ''), h("div", null, h("span", { class: "mr-1" }, _formatAmount(this.item.TOTAL_AMOUNT, this.currency)), this.hasRoomEdit && h("ir-icon", { id: `roomEdit-${this.item.BSA_ID}`, icon: "ft-edit color-ir-dark-blue-hover h4 pointer" }), this.hasRoomDelete && h("ir-icon", { id: `roomDelete-${this.item.BSA_ID}`, icon: "ft-trash-2 danger h4 pointer" }))), h("div", null, h("span", { class: "mr-1" }, `${this.item.GUEST_FIRST_NAME || ''} ${this.item.GUEST_LAST_NAME || ''}`), this.item.ADULTS_NBR > 0 && (h("span", null, ' ', this.item.ADULTS_NBR, " ", this.item.ADULTS_NBR > 1 ? 'Adults' : 'Adult')), this.item.CHILD_NBR > 0 && (h("span", null, ' ', this.item.CHILD_NBR, " ", this.item.CHILD_NBR > 1 ? 'Children' : 'Child'))), h("div", { class: "d-flex align-items-center" }, h("span", { class: " mr-1" }, _formatDate(this.item.FROM_DATE), " - ", _formatDate(this.item.TO_DATE)), this.item.UNIT && h("span", { class: "light-blue-bg mr-2 " }, this.item.UNIT), this.hasCheckIn && h("ir-button", { id: "checkin", icon: "", class: "mr-1", btn_color: "info", size: "sm", text: "Check in" }), this.hasCheckOut && h("ir-button", { id: "checkout", icon: "", btn_color: "info", size: "sm", text: "Check out" })), h("div", { class: "collapse", id: `roomCollapse-${this.item.BSA_ID}` }, h("div", { class: "d-flex" }, h("div", { class: " sm-padding-top" }, h("strong", { class: "sm-padding-right" }, "Rate Breakdown:")), h("div", { class: "sm-padding-top w-100 " }, this.item.My_Bsad.length > 0 &&
      this.item.My_Bsad.map(item => (h("div", { class: "fluid-container" }, h("div", { class: "row" }, h("div", { class: "col-xl-2 col-lg-3 col-md-2 col-sm-3 col-7 pr-0" }, _getDay(item.ALLOTMENT_DATE)), ' ', h("div", { class: "col-1 px-0 d-flex justify-content-end" }, _formatAmount(item.TOTAL_AMOUNT, this.currency)))))))), h("div", { innerHTML: this.item.CANCELATION_POLICY_PHRASE || '' }), h("ir-label", { label: "PrePayment:", value: this.item.My_Room_type.My_Translated_Prepayment_Policy || '' }), h("ir-label", { label: "Smoking Preference:", value: this.item.My_Room_type.My_Translated_Cancelation_Policy || '' }), h("ir-label", { label: "Meal Plan:", value: this.mealCodeName }), h("ir-label", { label: "Special rate:", value: "Non-refundable" })))));
  }
  static get is() { return "ir-room"; }
  static get properties() {
    return {
      "item": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "item",
        "reflect": false
      },
      "mealCodeName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "meal-code-name",
        "reflect": false
      },
      "myRoomTypeFoodCat": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "my-room-type-food-cat",
        "reflect": false
      },
      "currency": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "currency",
        "reflect": false,
        "defaultValue": "'USD'"
      },
      "hasRoomEdit": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-room-edit",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomDelete": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-room-delete",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomAdd": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-room-add",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasCheckIn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-check-in",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasCheckOut": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-check-out",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "collapsed": {}
    };
  }
  static get events() {
    return [{
        "method": "pressCheckIn",
        "name": "pressCheckIn",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "pressCheckOut",
        "name": "pressCheckOut",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get listeners() {
    return [{
        "name": "clickHanlder",
        "method": "handleClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-room.js.map
