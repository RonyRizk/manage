import{r as t,h as e,H as i,g as s,c as n}from"./p-1da6dd41.js";import{h as a,H as r}from"./p-7547f939.js";import{l}from"./p-cda0b50c.js";import"./p-d0086f2b.js";import"./p-58003fb6.js";const c=".sc-ir-hk-team-h{display:block}th.sc-ir-hk-team,td.sc-ir-hk-team{text-align:left !important;width:fit-content !important}input.sc-ir-hk-team{border:none;margin:0;width:120px}input.sc-ir-hk-team:focus{outline:none}.table-container.sc-ir-hk-team{padding:10px 0;overflow-x:auto;max-width:100%;width:max-content}.table.sc-ir-hk-team,th.sc-ir-hk-team,td.sc-ir-hk-team{border-color:white !important}thead.sc-ir-hk-team{border:0 !important}table.sc-ir-hk-team{border:0 !important}.icons-container.sc-ir-hk-team{display:flex;align-items:center;justify-content:center;gap:4px}.text-center.sc-ir-hk-team{text-align:center !important}.assignments-container.sc-ir-hk-team,.unassigned-container.sc-ir-hk-team{display:flex;align-items:center}.gap-16.sc-ir-hk-team{gap:16px}.unassigned-container.sc-ir-hk-team{gap:4px}.justify-between.sc-ir-hk-team{justify-content:space-between;margin-bottom:10px}.assignments-container.sc-ir-hk-team p.sc-ir-hk-team,h4.sc-ir-hk-team{margin:0}.outline-btn.sc-ir-hk-team{background:white;border:1px solid var(--blue);color:var(--blue);border-radius:5px;font-size:12px;padding:1px 0.25rem !important;margin:0}.outline-btn.sc-ir-hk-team:hover{color:white;background:var(--blue)}@media only screen and (min-width: 900px){td.sc-ir-hk-team{min-width:140px !important;width:max-content !important}}@media only screen and (max-width: 900px){.table-container.sc-ir-hk-team{width:max-content !important}}";var o=undefined&&undefined.__rest||function(t,e){var i={};for(var s in t)if(Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0)i[s]=t[s];if(t!=null&&typeof Object.getOwnPropertySymbols==="function")for(var n=0,s=Object.getOwnPropertySymbols(t);n<s.length;n++){if(e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(t,s[n]))i[s[n]]=t[s[n]]}return i};const u=class{constructor(e){t(this,e);this.currentTrigger=null}renderAssignedUnits(t){if(t.assigned_units.length===0){return e("span",null,"0 -"," ",e("button",{class:"outline-btn",onClick:()=>this.currentTrigger={type:"unassigned_units",user:t}},l.entries.Lcz_Assign))}return e("span",null,t.assigned_units.length," -"," ",e("button",{onClick:()=>this.currentTrigger={type:"unassigned_units",user:t},class:"outline-btn"},l.entries.Lcz_Edit))}renderCurrentTrigger(){var t;switch((t=this.currentTrigger)===null||t===void 0?void 0:t.type){case"unassigned_units":return e("ir-hk-unassigned-units",{slot:"sidebar-body",user:this.currentTrigger.user});case"user":return e("ir-hk-user",{slot:"sidebar-body",user:this.currentTrigger.user,isEdit:this.currentTrigger.isEdit});default:return null}}handleCloseSideBar(t){t.stopImmediatePropagation();t.stopPropagation();this.currentTrigger=null}handleDeletion(t){this.currentTrigger={type:"delete",user:t};this.deletionTimout=setTimeout((()=>{const t=this.el.querySelector("ir-delete-modal");if(!t)return;t.openModal()}),100)}disconnectedCallback(){clearTimeout(this.deletionTimout)}render(){var t;const{assigned:s,total:n,un_assigned:r}=a.hk_criteria.units_assignments;return e(i,{class:"card p-1"},e("section",null,e("ir-title",{label:l.entries.Lcz_HousekeepingTeam,justifyContent:"space-between"},e("div",{slot:"title-body",class:"assignments-container gap-16 m-0"},e("p",{class:"font-weight-bold m-0 p-0"},n," ",l.entries.Lcz_TotalUnits),e("p",{class:"m-0 p-0"},s," ",e("span",null,l.entries.Lcz_Assigned)),r>0&&e("button",{class:"outline-btn",onClick:()=>this.currentTrigger={type:"unassigned_units",user:null}},r," ",l.entries.Lcz_Unassigned))),e("p",{class:"m-0 p-0"},l.entries.Lcz_AsAnOption)),e("section",{class:"table-container"},e("table",{class:"table"},e("thead",null,e("tr",null,e("th",{class:"text-left"},l.entries.Lcz_Name),e("th",null,l.entries.Lcz_Mobile),e("th",null,l.entries.Lcz_Username),e("th",null,l.entries.Lcz_Note),e("th",null,l.entries.Lcz_UnitsAssigned),e("th",{class:"text-center"},e("ir-icon",{title:l.entries.Lcz_CreateHousekeeper,onIconClickHandler:()=>{this.currentTrigger={type:"user",isEdit:false,user:null}}},e("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"17.5",viewBox:"0 0 448 512"},e("path",{fill:"currentColor",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})))))),e("tbody",null,a.hk_criteria.housekeepers.map((t=>e("tr",{key:t.id},e("td",{class:"text-left"},t.name),e("td",null,t.phone_prefix," ",t.mobile),e("td",null,t.username),e("td",null,t.note),e("td",null,this.renderAssignedUnits(t)),e("td",{class:"text-center"},e("div",{class:"icons-container"},e("ir-icon",{title:l.entries.Lcz_EditHousekeeper,onIconClickHandler:()=>{const e=o(t,["assigned_units","is_soft_deleted","is_active"]);this.currentTrigger={type:"user",isEdit:true,user:e}},icon:"ft-save color-ir-light-blue-hover h5 pointer sm-margin-right"},e("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"20",viewBox:"0 0 512 512"},e("path",{fill:"#6b6f82",d:"M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"}))),e("span",null,"  "),e("ir-icon",{title:l.entries.Lcz_DeleteHousekeeper,icon:"ft-trash-2 danger h5 pointer",onIconClickHandler:()=>this.handleDeletion(t)},e("svg",{slot:"icon",fill:"#ff2441",xmlns:"http://www.w3.org/2000/svg",height:"16",width:"14.25",viewBox:"0 0 448 512"},e("path",{d:"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"}))))))))))),e("ir-sidebar",{showCloseButton:false,open:this.currentTrigger!==null&&this.currentTrigger.type!=="delete",onIrSidebarToggle:()=>this.currentTrigger=null,style:{"--sidebar-width":this.currentTrigger?this.currentTrigger.type==="unassigned_units"?"max-content":"40rem":"max-content"}},this.renderCurrentTrigger()),((t=this.currentTrigger)===null||t===void 0?void 0:t.type)==="delete"&&e("ir-delete-modal",{user:this.currentTrigger.user}))}get el(){return s(this)}};u.style=c;const d=".sc-ir-unit-status-h{display:block}.circle.sc-ir-unit-status{display:inline-flex;border-radius:50%}.green.sc-ir-unit-status{background:#57f707}.red.sc-ir-unit-status{background:rgb(199, 139, 36)}.orange.sc-ir-unit-status{background:#ff9149}.table-container.sc-ir-unit-status{width:100%;overflow-x:auto}.black.sc-ir-unit-status{background:#ff4961}table.sc-ir-unit-status{width:max-content}td.sc-ir-unit-status{min-width:140px;text-align:center;height:2rem}.smallcircle.sc-ir-unit-status{height:7px;width:7px}.bigcircle.sc-ir-unit-status{height:7px;width:7px}.status-container.sc-ir-unit-status,.action-container.sc-ir-unit-status{display:flex;align-items:center;gap:8px}.status-container.sc-ir-unit-status p.sc-ir-unit-status{margin:0}";const h=class{constructor(e){t(this,e);this.resetData=n(this,"resetData",7);this.housekeepingService=new r}componentWillLoad(){this.housekeepingService.setToken(a.default_properties.token)}async handleSelectChange(t){try{t.stopPropagation();t.stopImmediatePropagation();const e=t.detail;let i;if(e===""){i={is_active:false,window:-1}}else{i={is_active:true,window:+e}}await this.housekeepingService.setExposedInspectionMode(a.default_properties.property_id,i);this.resetData.emit(null)}catch(t){console.error(t)}}render(){var t;return e(i,{class:"card p-1"},e("ir-title",{label:l.entries.Lcz_RoomOrUnitStatus}),e("div",{class:"table-container"},e("table",null,e("thead",null,e("tr",null,e("th",null,l.entries.Lcz_Status),e("th",{class:"text-center"},l.entries.Lcz_Code),e("th",null,l.entries.Lcz_Action))),e("tbody",null,(t=a.hk_criteria.statuses)===null||t===void 0?void 0:t.map((t=>{var i;return e("tr",{key:t.code},e("td",null,e("div",{class:"status-container"},e("span",{class:`circle ${t.style.shape} ${t.style.color}`}),e("p",null,t.description))),e("td",null,t.code),e("td",null,e("div",{class:"action-container"},e("p",{class:"m-0"},t.action),t.code==="VAC"&&e("div",null,e("ir-select",{selectedValue:t.inspection_mode.is_active?(i=t.inspection_mode)===null||i===void 0?void 0:i.window.toString():"",LabelAvailable:false,firstOption:l.entries.Lcz_No,onSelectChange:this.handleSelectChange.bind(this),data:Array.from(Array(7+1),((t,e)=>e)).map((t=>{const e=t===0?l.entries.Lcz_YesOnTheSameDay:t===1?l.entries.Lcz_DayPrior.replace("%1",t.toString()):l.entries.Lcz_DaysPrior.replace("%1",t.toString());return{text:e,value:t.toString()}}))})))))}))))))}};h.style=d;export{u as ir_hk_team,h as ir_unit_status};
//# sourceMappingURL=p-4dada7db.entry.js.map