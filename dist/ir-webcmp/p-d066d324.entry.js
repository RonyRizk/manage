import{r as t,c as i,h as s,H as e}from"./p-05195efb.js";import{B as o}from"./p-848d99b2.js";import{R as n}from"./p-517ae422.js";import{c as a}from"./p-07d18110.js";import{l as r}from"./p-e948214f.js";import{a as h}from"./p-d0086f2b.js";const l=".sc-igl-book-property-container-h{display:block;margin:0;padding:0}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}";const d=class{constructor(s){t(this,s);this.resetBookingData=i(this,"resetBookingData",7);this.bookingService=new o;this.roomService=new n;this.language="";this.ticket="";this.baseurl="";this.propertyid=undefined;this.from_date=undefined;this.to_date=undefined;this.bookingItem=undefined;this.showPaymentDetails=undefined;this.countryNodeList=undefined;this.calendarData={}}setRoomsData(t){var i,s;let e=new Array;if((s=(i=t.My_Result)===null||i===void 0?void 0:i.roomtypes)===null||s===void 0?void 0:s.length){e=t.My_Result.roomtypes;t.My_Result.roomtypes.forEach((t=>{t.expanded=true}))}this.calendarData.roomsInfo=e}async initializeApp(){try{const[t,i,s]=await Promise.all([this.roomService.fetchData(this.propertyid,this.language),this.roomService.fetchLanguage(this.language),this.bookingService.getCountries(this.language)]);console.log(i);if(!r.entries){r.entries=i.entries;r.direction=i.direction}this.countryNodeList=s;const{allowed_payment_methods:e,currency:o,allowed_booking_sources:n,adult_child_constraints:a,calendar_legends:h}=t["My_Result"];this.calendarData={currency:o,allowed_booking_sources:n,adult_child_constraints:a,legendData:h};this.setRoomsData(t);const l=["001","004"];this.showPaymentDetails=e.some((t=>l.includes(t.code)))}catch(t){console.error("Error initializing app:",t)}}componentWillLoad(){if(this.baseurl){h.defaults.baseURL=this.baseurl}if(this.ticket!==""){a.token=this.ticket;this.bookingService.setToken(this.ticket);this.roomService.setToken(this.ticket);this.initializeApp()}}async ticketChanged(){a.token=this.ticket;this.bookingService.setToken(this.ticket);this.roomService.setToken(this.ticket);this.initializeApp()}handleCloseBookingWindow(){this.bookingItem=null}handleTriggerClicked(){const t=new Date;t.setDate(t.getDate()+1);this.bookingItem={FROM_DATE:this.from_date,defaultDateRange:{fromDate:new Date,fromDateStr:"",toDate:t,toDateStr:"",dateDifference:0,message:""},TO_DATE:this.to_date,EMAIL:"",event_type:"PLUS_BOOKING",ID:"",NAME:"",PHONE:"",REFERENCE_TYPE:"",TITLE:r.entries.Lcz_NewBooking}}render(){return s(e,null,s("ir-toast",null),s("ir-interceptor",null),s("div",{class:"book-container",onClick:this.handleTriggerClicked.bind(this)},s("slot",{name:"trigger"})),this.bookingItem&&s("igl-book-property",{allowedBookingSources:this.calendarData.allowed_booking_sources,adultChildConstraints:this.calendarData.adult_child_constraints,showPaymentDetails:this.showPaymentDetails,countryNodeList:this.countryNodeList,currency:this.calendarData.currency,language:this.language,propertyid:this.propertyid,bookingData:this.bookingItem,onResetBookingData:t=>{t.stopImmediatePropagation();t.stopPropagation();this.resetBookingData.emit(null)},onCloseBookingWindow:()=>this.handleCloseBookingWindow()}))}static get watchers(){return{ticket:["ticketChanged"]}}};d.style=l;export{d as igl_book_property_container};
//# sourceMappingURL=p-d066d324.entry.js.map