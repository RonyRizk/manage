import{T as t,a as r}from"./p-d0086f2b.js";import{c as o}from"./p-07d18110.js";import{l as e}from"./p-e948214f.js";class s extends t{async fetchData(t,e){try{const s=this.getToken();if(s!==null){const{data:a}=await r.post(`/Get_Exposed_Property?Ticket=${s}`,{id:t,language:e});if(a.ExceptionMsg!==""){throw new Error(a.ExceptionMsg)}const n=a.My_Result;o.adultChildConstraints=n.adult_child_constraints;o.allowedBookingSources=n.allowed_booking_sources;o.allowed_payment_methods=n.allowed_booking_methods;o.currency=n.currency;o.is_vacation_rental=n.is_vacation_rental;o.pickup_service=n.pickup_service;o.max_nights=n.max_nights;o.roomsInfo=n.roomtypes;o.taxes=n.taxes;o.id=n.id;o.name=n.name;o.is_frontdesk_enabled=n.is_frontdesk_enabled;return a}}catch(t){console.log(t);throw new Error(t)}}async fetchLanguage(t,o=["_PMS_FRONT"]){try{const s=this.getToken();if(s!==null){const{data:a}=await r.post(`/Get_Exposed_Language?Ticket=${s}`,{code:t,sections:o});if(a.ExceptionMsg!==""){throw new Error(a.ExceptionMsg)}let n=this.transformArrayToObject(a.My_Result.entries);e.entries=n;e.direction=a.My_Result.direction;return{entries:n,direction:a.My_Result.direction}}}catch(t){console.log(t);throw new Error(t)}}transformArrayToObject(t){let r={};for(const o of t){r[o.code]=o.description}return r}}export{s as R};
//# sourceMappingURL=p-517ae422.js.map