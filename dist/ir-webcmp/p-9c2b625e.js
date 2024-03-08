import{T as t,a as e}from"./p-d0086f2b.js";import{c as r,e as n,d as o,h as a}from"./p-9e2bfb9d.js";import{g as s}from"./p-5d41ad1a.js";import"./p-383186e3.js";import"./p-ac2141fd.js";class i extends t{async getCalendarData(t,o,a){try{const i=this.getToken();if(i!==null){const{data:c}=await e.post(`/Get_Exposed_Calendar?Ticket=${i}`,{propertyid:t,from_date:o,to_date:a});if(c.ExceptionMsg!==""){throw new Error(c.ExceptionMsg)}const l=c.My_Result.months;const _=[];const u=await s(l);const d=l.map((t=>{_.push({daysCount:t.days.length,monthName:t.description});return t.days.map((e=>({day:r(e.description,t.description),currentDate:n(e.description,t.description),dayDisplayName:e.description,rate:e.room_types,unassigned_units_nbr:e.unassigned_units_nbr,occupancy:e.occupancy})))})).flat();return Promise.resolve({ExceptionCode:null,ExceptionMsg:"",My_Params_Get_Rooming_Data:{AC_ID:t,FROM:c.My_Params_Get_Exposed_Calendar.from_date,TO:c.My_Params_Get_Exposed_Calendar.to_date},days:d,months:_,myBookings:u,defaultMonths:l})}}catch(t){console.error(t)}}async fetchGuest(t){try{const r=this.getToken();if(r!==null){const{data:n}=await e.post(`/Get_Exposed_Guest?Ticket=${r}`,{email:t});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}}catch(t){console.log(t);throw new Error(t)}}async editExposedGuest(t,r){try{const n=this.getToken();if(n!==null){const{data:o}=await e.post(`/Edit_Exposed_Guest?Ticket=${n}`,Object.assign(Object.assign({},t),{book_nbr:r}));if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.log(t);throw new Error(t)}}async getBookingAvailability(t,r,n,o,a,s,i){try{const c=this.getToken();if(c){const{data:l}=await e.post(`/Get_Exposed_Booking_Availability?Ticket=${c}`,{propertyid:n,from_date:t,to_date:r,adult_nbr:o.adult,child_nbr:o.child,language:a,currency_ref:i.code,room_type_ids:s});if(l.ExceptionMsg!==""){throw new Error(l.ExceptionMsg)}return l["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getCountries(t){try{const r=this.getToken();if(r){const{data:n}=await e.post(`/Get_Exposed_Countries?Ticket=${r}`,{language:t});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}}catch(t){console.error(t);throw new Error(t)}}async fetchSetupEntries(){try{const t=this.getToken();if(t){const{data:r}=await e.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${t}`,{TBL_NAMES:["_ARRIVAL_TIME","_RATE_PRICING_MODE","_BED_PREFERENCE_TYPE"]});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}const n=r.My_Result;return{arrivalTime:n.filter((t=>t.TBL_NAME==="_ARRIVAL_TIME")),ratePricingMode:n.filter((t=>t.TBL_NAME==="_RATE_PRICING_MODE")),bedPreferenceType:n.filter((t=>t.TBL_NAME==="_BED_PREFERENCE_TYPE"))}}}catch(t){console.error(t);throw new Error(t)}}async getBlockedInfo(){try{const t=this.getToken();if(t){const{data:r}=await e.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${t}`,{TBL_NAMES:["_CALENDAR_BLOCKED_TILL"]});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}}catch(t){console.error(t);throw new Error(t)}}async getUserDefaultCountry(){try{const t=this.getToken();if(t){const{data:r}=await e.post(`/Get_Country_By_IP?Ticket=${t}`,{IP:""});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r["My_Result"]}}catch(t){console.error(t);throw new Error(t)}}async blockUnit(t){try{const r=this.getToken();if(r){const{data:n}=await e.post(`/Block_Exposed_Unit?Ticket=${r}`,t);if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}console.log(n);return n["My_Params_Block_Exposed_Unit"]}}catch(t){console.error(t);throw new Error(t)}}async getUserInfo(t){try{const r=this.getToken();if(r){const{data:n}=await e.post(`/GET_EXPOSED_GUEST?Ticket=${r}`,{email:t});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}async getExposedBooking(t,r){try{const n=this.getToken();if(n){const{data:o}=await e.post(`/Get_Exposed_Booking?Ticket=${n}`,{booking_nbr:t,language:r});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t)}}generateDays(t,e,r){const n=new Date(t);const o=new Date(e);const a=[];while(n<o){a.push({date:n.toISOString().split("T")[0],amount:r});n.setDate(n.getDate()+1)}return a}calculateTotalRate(t,e,r,n){if(r&&n===2){return+t}return+t/+e}async fetchExposedGuest(t,r){try{const n=this.getToken();if(n){const{data:o}=await e.post(`/Fetch_Exposed_Guests?Ticket=${n}`,{email:t,property_id:r});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async fetchExposedBookings(t,r,n,o){try{const a=this.getToken();if(a){const{data:s}=await e.post(`/Fetch_Exposed_Bookings?Ticket=${a}`,{booking_nbr:t,property_id:r,from_date:n,to_date:o});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}return s["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getPCICardInfoURL(t){try{const r=this.getToken();if(r){const{data:n}=await e.post(`/Get_PCI_Card_Info_URL?Ticket=${r}`,{BOOK_NBR:t});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async bookUser(t,r,n,a,s,i,c,l,_,u,d,E,w,h,f){try{const y=this.getToken();if(y){const T=o(n);const p=o(a);let m={email:t.email||null,first_name:t.firstName,last_name:t.lastName,country_id:t.countryId===""?null:t.countryId,city:null,mobile:t.contactNumber===null?"":t.contactNumber,address:"",dob:null,subscribe_to_news_letter:t.emailGuest||false,cci:t.cardNumber?{nbr:t.cardNumber,holder_name:t.cardHolderName,expiry_month:t.expiryMonth,expiry_year:t.expiryYear}:null};if(t.id){m=Object.assign(Object.assign({},m),{id:t.id})}const I={assign_units:true,check_in:r,is_pms:true,is_direct:true,booking:{booking_nbr:d||"",from_date:T,to_date:p,remark:t.message||null,property:{id:l},source:c,currency:u,arrival:{code:w?w:t.selectedArrivalTime},guest:E||m,rooms:[...s.map((t=>({identifier:f||null,roomtype:{id:t.roomCategoryId,name:t.roomCategoryName,physicalrooms:null,rateplans:null,availabilities:null,inventory:t.inventory,rate:t.rate/i},rateplan:{id:t.ratePlanId,name:t.ratePlanName,rate_restrictions:null,variations:null,cancelation:t.cancelation,guarantee:t.guarantee},unit:typeof h==="undefined"&&t.roomId===""?null:{id:+h||+t.roomId},occupancy:{adult_nbr:t.adultCount,children_nbr:t.childrenCount,infant_nbr:null},bed_preference:t.preference,from_date:T,to_date:p,notes:null,days:this.generateDays(T,p,this.calculateTotalRate(t.rate,i,t.isRateModified,t.rateType)),guest:{email:null,first_name:t.guestName,last_name:null,country_id:null,city:null,mobile:null,address:null,dob:null,subscribe_to_news_letter:null}}))),..._]}};console.log("book user payload",I);const{data:g}=await e.post(`/DoReservation?Ticket=${y}`,I);if(g.ExceptionMsg!==""){throw new Error(g.ExceptionMsg)}console.log(g["My_Result"]);return g["My_Result"]}else{throw new Error("Invalid token")}}catch(t){console.error(t);throw new Error(t)}}}const c={"000":"IN-HOUSE","001":"PENDING-CONFIRMATION","002":"CONFIRMED","003":"CHECKED-OUT"};function l(t,e){if(t===null&&e===null)return"";if(e!==null&&e!==""){return`${t!==null&&t!==void 0?t:""} , ${e!==null&&e!==void 0?e:""}`}return t}function _(t){let e=[];const r=e=>{const r=a();const n=a(e.to_date,"YYYY-MM-DD");const o=a(e.from_date,"YYYY-MM-DD");if(o.isSame(r,"day")&&r.hour()>=12){return c["000"]}else if(r.isAfter(o,"day")&&r.isBefore(n,"day")){return c["000"]}else if(n.isSame(r,"day")&&r.hour()<12){return c["000"]}else if(n.isSame(r,"day")&&r.hour()>=12||n.isBefore(r,"day")){return c["003"]}else{return c[(t===null||t===void 0?void 0:t.status.code)||"001"]}};const n=t.rooms.filter((t=>!!t["assigned_units_pool"]));n.forEach((n=>{var o,a;e.push({ID:n["assigned_units_pool"],TO_DATE:n.to_date,FROM_DATE:n.from_date,NO_OF_DAYS:n.days.length,ARRIVAL:t.arrival,IS_EDITABLE:true,BALANCE:(o=t.financial)===null||o===void 0?void 0:o.due_amount,STATUS:r(n),NAME:l(n.guest.first_name,n.guest.last_name),PHONE:(a=t.guest.mobile)!==null&&a!==void 0?a:"",ENTRY_DATE:"12-12-2023",RATE:n.total,RATE_PLAN:n.rateplan.name,SPLIT_BOOKING:false,RATE_PLAN_ID:n.rateplan.id,IDENTIFIER:n.identifier,RATE_TYPE:n.roomtype.id,ADULTS_COUNT:n.occupancy.adult_nbr,CHILDREN_COUNT:n.occupancy.children_nbr,PR_ID:+n.unit.id,POOL:n["assigned_units_pool"],GUEST:t.guest,ROOMS:t.rooms,BOOKING_NUMBER:t.booking_nbr,cancelation:n.rateplan.cancelation,guarantee:n.rateplan.guarantee,TOTAL_PRICE:n.gross_total,COUNTRY:t.guest.country_id,FROM_DATE_STR:t.format.from_date,TO_DATE_STR:t.format.to_date,adult_child_offering:n.rateplan.selected_variation.adult_child_offering,ARRIVAL_TIME:t.arrival.description,origin:t.origin,channel_booking_nbr:t.channel_booking_nbr,is_direct:t.is_direct,NOTES:t.is_direct?t.remark:null,SOURCE:{code:t.source.code,description:t.source.description,tag:t.source.tag},ota_notes:t.ota_notes})}));return e}function u(t,e){const r=a(t,"YYYY-MM-DD");const n=a(e,"YYYY-MM-DD");const o=n.diff(r,"days");return o}function d(t){return["003","002","004"].includes(t)}function E(t){const e=new Intl.NumberFormat(undefined,{style:"currency",currency:t,minimumFractionDigits:0,maximumFractionDigits:0});return e.format(0).replace(/[0-9]/g,"").trim()}function w(t){return t<10?t.toString().padStart(2,"0"):t.toString()}function h(t,e){const r=E(t);return r+e.toFixed(2)}export{i as B,u as c,h as f,d as i,w as r,_ as t};
//# sourceMappingURL=p-9c2b625e.js.map