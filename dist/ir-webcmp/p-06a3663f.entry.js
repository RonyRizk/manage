import{r as t,h as s,H as i,c as e,g as a}from"./p-05195efb.js";import{c as n}from"./p-511c0fa1.js";import"./p-7cd9c724.js";const o=".sc-ir-channel-general-h{display:block}";const r=class{constructor(s){t(this,s)}render(){return s(i,null,"general")}};r.style=o;const l=".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";const c=class{constructor(s){t(this,s);this.tabChanged=e(this,"tabChanged",7);this.headerTitles=[];this.selectedIndex=0}componentDidLoad(){this.updateActiveIndicator()}disconnectedCallback(){if(this.animationFrameId){cancelAnimationFrame(this.animationFrameId)}}handleTabSelection(t){this.selectedIndex=t;this.updateActiveIndicator();this.tabChanged.emit(this.headerTitles[this.selectedIndex].id)}updateActiveIndicator(){if(this.animationFrameId){cancelAnimationFrame(this.animationFrameId)}requestAnimationFrame((()=>{const t=this.el.querySelector(`li.tab[data-state="selected"]`);if(t){const{left:s,width:i}=t.getBoundingClientRect();const e=this.el.getBoundingClientRect().left;const a=s-e;this.activeIndicator.style.width=`${i}px`;this.activeIndicator.style.transform=`translateX(${a}px)`}}))}render(){return s(i,null,s("ul",null,this.headerTitles.map(((t,i)=>s("li",{class:`tab ${t.disabled?"text-light":""}`,key:t.id,onClick:()=>{if(!t.disabled)this.handleTabSelection(i)},"data-disabled":t.disabled,"data-state":this.selectedIndex===i?"selected":""},t.name)))),s("span",{class:"active-indicator",ref:t=>this.activeIndicator=t}))}get el(){return a(this)}};c.style=l;class h{checkMappingExists(t,s){return s.map.find((s=>s.foreign_id===t))}}const d=".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}";const p=class{constructor(s){t(this,s);this.mappingService=new h;this.selectedChannel=undefined;this.activeMapField=""}componentWillLoad(){this.selectedChannel=n.channels[0]}renderMappingStatus(t){const i=this.mappingService.checkMappingExists(t,this.selectedChannel);if(i){return s("span",{class:"px-2"},"exist")}return s("span",{class:"px-2"},this.activeMapField===t?s("ir-combobox",null):s("span",{class:"cursor-pointer text-red",onClick:()=>this.activeMapField=t},"Not mapped"))}render(){return s(i,null,s("ul",{class:"m-0 p-0"},s("li",{class:"map-row my-2"},s("span",{class:"font-weight-bold"},n.channels[0].name),s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),s("span",{class:"font-weight-bold px-2"},"Channel manager")),this.selectedChannel.property.room_types.map((t=>s("li",{key:t.id,class:"mb-1"},s("div",{class:"map-row"},s("span",null,t.name),s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),this.renderMappingStatus(t.id)),s("ul",{class:"m-0 p-0"},t.rate_plans.map((t=>s("li",{class:"map-row",key:t.id},s("span",{class:"submap-text"},t.name),s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{fill:"currentColor",d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),this.renderMappingStatus(t.id))))))))))}};p.style=d;const u=".sc-ir-combobox-h{display:block;position:relative;padding:0;margin:0}ul.sc-ir-combobox{position:absolute;background:#ffffff;padding:0 0.75rem;margin:0;margin-top:2px;width:100%;max-height:80px;border-radius:0.21rem;border:1px solid #cacfe7}";const m=class{constructor(s){t(this,s);this.comboboxValue=e(this,"comboboxValue",7);this.inputCleared=e(this,"inputCleared",7);this.toast=e(this,"toast",7);this.data=[];this.duration=300;this.selectedIndex=-1;this.isComboBoxVisible=false;this.isLoading=true;this.isItemSelected=undefined;this.inputValue=""}handleKeyDown(t){var s;const i=this.data.length;const e=this.getHeightOfPElement();if(i>0){switch(t.key){case"ArrowUp":t.preventDefault();this.selectedIndex=(this.selectedIndex-1+i)%i;this.adjustScrollPosition(e);break;case"ArrowDown":t.preventDefault();this.selectedIndex=(this.selectedIndex+1)%i;this.adjustScrollPosition(e);break;case"Enter":case" ":case"ArrowRight":t.preventDefault();this.selectItem(this.selectedIndex);break;case"Escape":(s=this.inputRef)===null||s===void 0?void 0:s.blur();this.isComboBoxVisible=false;break}}}getHeightOfPElement(){const t=this.el.querySelector(".combobox");if(t){const s=t.querySelector("p");return s?s.offsetHeight:0}return 0}adjustScrollPosition(t,s=250){const i=this.el.querySelector(".combobox");if(i){const e=2;const a=t+e;const n=a*this.selectedIndex;let o=n-s/2+t/2;o=Math.max(0,Math.min(o,i.scrollHeight-s));i.scrollTo({top:o,behavior:"auto"})}}selectItem(t){if(this.data[t]){this.isItemSelected=true;this.inputValue="";this.resetCombobox()}}debounceFetchData(){clearTimeout(this.debounceTimer);this.debounceTimer=setTimeout((()=>{this.fetchData()}),this.duration)}handleFocus(){this.isComboBoxVisible=true}clearInput(){this.inputValue="";this.resetCombobox();this.inputCleared.emit(null)}resetCombobox(t=true){var s;if(t){(s=this.inputRef)===null||s===void 0?void 0:s.blur()}this.data=[];this.selectedIndex=-1;this.isComboBoxVisible=false}async fetchData(){try{this.isLoading=true}catch(t){console.log("error",t)}finally{this.isLoading=false}}handleInputChange(t){this.inputValue=t.target.value;if(this.inputValue){this.debounceFetchData()}else{clearTimeout(this.debounceTimer);this.resetCombobox(false)}}handleDocumentClick(t){const s=t.target;if(!this.el.contains(s)){this.isComboBoxVisible=false}}handleBlur(){setTimeout((()=>{if(!this.isItemSelected){this.comboboxValue.emit({key:"blur",data:this.inputValue});this.inputValue="";this.resetCombobox()}else{this.isItemSelected=false}}),200)}isDropdownItem(t){return t&&t.closest(".combobox")}disconnectedCallback(){var t,s,i,e;clearTimeout(this.debounceTimer);(t=this.inputRef)===null||t===void 0?void 0:t.removeEventListener("blur",this.handleBlur);(s=this.inputRef)===null||s===void 0?void 0:s.removeEventListener("click",this.selectItem);(i=this.inputRef)===null||i===void 0?void 0:i.removeEventListener("keydown",this.handleKeyDown);(e=this.inputRef)===null||e===void 0?void 0:e.removeEventListener("focus",this.handleFocus)}handleItemKeyDown(t,s){var i;if(t.key==="Enter"||t.key===" "||t.key==="ArrowRight"){this.selectItem(s);t.preventDefault()}else if(t.key==="Escape"){this.isComboBoxVisible=false;(i=this.inputRef)===null||i===void 0?void 0:i.blur();t.preventDefault()}else{return}}render(){return s("fieldset",{class:"m-0 p-0"},s("input",{type:"text",class:"form-control"}),s("ul",{class:""},s("p",null,"Room 1")))}get el(){return a(this)}};m.style=u;export{r as ir_channel_general,c as ir_channel_header,p as ir_channel_mapping,m as ir_combobox};
//# sourceMappingURL=p-06a3663f.entry.js.map