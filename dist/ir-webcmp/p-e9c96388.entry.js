import{r as t,c as i,h as e}from"./p-52db726c.js";import{v as s}from"./p-d4c9256e.js";const n=":root{--sidebar-width:40rem}#container{padding:1rem;height:100%}.card{height:100%}#ir-list-item{height:100%}.cardBody{display:flex;justify-content:center;align-items:center;height:100%}.emptyBody{text-align:center}.emptyBody img{height:auto;width:100px;transform:translate(7%, 0);margin:1rem}.loader-position{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.card-head{background:#f8f8f8;padding:0.3rem}.section-title{display:flex;align-items:center;justify-content:space-between;font-weight:bold}.item-info{border-bottom:1px solid #e7e7e7}.item-info .row .col-3:last-child{text-align:end}.list-group{list-style:none;border-bottom:1px solid #e7e7e7}.list-group li{padding:0.5rem;color:#444;transition:all 0.3s ease-out}.list-group li:hover{color:#7c83eb}.list-group li.active{border-bottom:2px solid #7c83eb;color:#7c83eb}.btn-position{position:absolute;bottom:0;left:0;width:100%;padding:0.5rem;background:#f8f8f8;border-top:1px solid #e7e7e7}.test-icon{margin-right:0.2rem !important}.text-dark:hover{color:#444 !important}";const a=class{constructor(e){t(this,e);this.fetchApi=i(this,"fetchApi",7);this.requestApiDelete=i(this,"requestApiDelete",7);this.requestApiDestinationHierarchy=i(this,"requestApiDestinationHierarchy",7);this.tabs=["General Settings","Mapping","Channel Settings"];this.hostRoom=undefined;this.mapReference=undefined;this.allowed_properties=[];this.allowed_channels=[];this.allowed_MinStayTypes=[];this.dropdownData={name:"Action",icon:"",children:[{name:"Edit",icon:"ft-edit"},{name:"Delete",icon:"ft-trash"},{name:"Disable",icon:"ft-alert-triangle"}]};this.listData=null;this.loader=false;this.mode="create";this.activeTab="General Settings";this.selectedItem=null;this.item=null;this.anyChanges=false}connectionOffHandler(){this.item=null}sendToParentHandler(t){this.anyChanges=true;this.item=t.detail}sendMappingToParentHandler(t){const i=t.detail;const e=s();this.anyChanges=true;if(this.mode==="edit"&&this.selectedItem){this.listData=this.listData.map((t=>{if(t.id===this.selectedItem.id){return Object.assign(Object.assign({},this.item),{RoomsMapping:i,status:"Active",id:e})}return t}))}else{if(this.listData===null){this.listData=[Object.assign(Object.assign({},this.item),{RoomsMapping:i,status:"Active",id:e})]}else{this.listData=[...this.listData,Object.assign(Object.assign({},this.item),{RoomsMapping:i,status:"Active",id:e})]}}this.fetchApi.emit(this.listData);this.mode="create";this.activeTab="General Settings";const n=document.querySelector("ir-sidebar");if(n){n.open=!n.open}this._reset()}_reset(){this.item=null;this.mode="create";this.activeTab="General Settings";this.selectedItem=null;this.anyChanges=false}openSidebarHandler(){const t=document.querySelector("ir-sidebar");t.open=!t.open;this.loader=true;this.mode="create";this.activeTab="General Settings";setTimeout((()=>{this.loader=false}),2e3)}requestDelete(t){this.fetchApi.emit(t.detail)}changeStatusHandler(t){this.fetchApi.emit(t.detail)}componentDidLoad(){const t=document.querySelector("ir-topbar");t.addEventListener("openSidebar",(()=>{const t=document.querySelector("ir-sidebar");t.open=!t.open;this.loader=true;this.mode="create";this.activeTab="General Settings";setTimeout((()=>{this.loader=false}),2e3)}));const i=document.querySelector("ir-list-item");i.addEventListener("openSidebar",(t=>{if(t.detail.mode==="edit"){this.mode="edit";this.selectedItem=t.detail.item;const i=document.querySelector("ir-sidebar");i.open=!i.open}}));const e=document.querySelector("ir-modal.exit");e.addEventListener("confirmModal",(()=>{s.open=false;e.closeModal();this._reset()}));const s=document.querySelector("ir-sidebar");s.addEventListener("irSidebarToggle",(t=>{if(t.detail==true&&this.anyChanges){if(this.listData){e.openModal()}}else{s.open=false;this._reset()}}))}goNext(){const t=document.querySelector("ir-mapping");if(this.activeTab=="General Settings"){if(!this.item.title||!this.item.channel||!this.item.property){const t=document.querySelector("ir-modal.alertModal-manager");if(this.mode==="edit"){return}t.openModal()}else{this.requestApiDestinationHierarchy.emit(this.item.property);this.activeTab="Mapping";this.loader=true;setTimeout((()=>{this.loader=false}),2e3)}}else if(this.activeTab=="Mapping"){t._onSaveMapping()}}_onSwitchTab(t){if(this.activeTab=="General Settings"){if(!this.item.title||!this.item.channel||!this.item.property){const t=document.querySelector("ir-modal.alertModal-manager");if(this.mode=="edit"){return}t.openModal()}else{this.activeTab=t;this.loader=true;setTimeout((()=>{this.loader=false}),2e3)}}else if(this.activeTab=="Mapping"){this.activeTab=t;this.loader=true;setTimeout((()=>{this.loader=false}),2e3)}}render(){return[e("div",{id:"container"},e("div",{class:"card"},e("ir-topbar",null),e("ir-list-item",{id:"ir-list-item",listData:this.listData,dropdownData:this.dropdownData}))),e("ir-sidebar",{side:"right",class:""},e("div",{class:"container pt-1"},e("h5",{class:"font-weight-bold"},this.mode==="create"?"Create":"Edit"," Channel")),e("ul",{class:"list-group list-group-horizontal mb-2"},this.tabs.map((t=>e("li",{class:this.activeTab===t?"active":""},e("a",{class:"","data-mdb-ripple-color":"dark",onClick:()=>{this._onSwitchTab(t)}},t))))),this.loader?e("div",{class:"loader-position"},e("ir-loader",null)):e("span",null,this.activeTab=="General Settings"&&e("ir-general-settings",{allowed_channels:this.allowed_channels,allowed_MinStayTypes:this.allowed_MinStayTypes,allowed_properties:this.allowed_properties,data:this.selectedItem,mode:this.mode,class:"mb-3"}),this.activeTab=="Mapping"&&e("ir-mapping",{hostRoom:this.hostRoom,class:"mb-3",mapReference:this.mapReference,map:this.mode==="edit"?this.selectedItem.RoomsMapping:null})),e("div",{class:"btn-position"},e("button",{type:"button",class:"btn btn-primary btn-sm btn-block",onClick:()=>this.goNext()},this.activeTab=="General Settings"?"Next":"Save"))),e("ir-modal",{class:"exit",modalTitle:"Exit without saving?",modalBody:"All unsaved changes will be lost.",iconAvailable:true,icon:"ft-alert-circle warning h1"}),e("ir-modal",{class:"alertModal-manager",modalTitle:"Please fill all the fields!",modalBody:"There are fields that are not filled yet.",icon:"ft-alert-circle warning h1",iconAvailable:true,leftBtnActive:false,btnPosition:"center",rightBtnText:"Close",rightBtnColor:"primary"})]}};a.style=n;export{a as ir_channel_manager};
//# sourceMappingURL=p-e9c96388.entry.js.map