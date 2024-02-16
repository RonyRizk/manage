import{a as e}from"./p-539b691e.js";import{d as t,e as o}from"./p-34fcab72.js";class r{async getUnassignedDates(t,o,r){try{const a=JSON.parse(sessionStorage.getItem("token"));if(a){const{data:n}=await e.post(`/Get_UnAssigned_Dates?Ticket=${a}`,{propertyid:t,from_date:o,to_date:r});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return this.convertUnassignedDates(n.My_Result)}else{throw new Error("Invalid Token")}}catch(e){console.error(e);throw new Error(e)}}async getUnassignedRooms(t,o,r,a){try{const n=JSON.parse(sessionStorage.getItem("token"));if(n){const{data:s}=await e.post(`/Get_Aggregated_UnAssigned_Rooms?Ticket=${n}`,{propertyid:t,specific_date:o});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}return this.transformToAssignable(s,r,a)}else{throw new Error("Invalid Token")}}catch(e){console.error(e);throw new Error(e)}}async assignUnit(t,o,r){try{const a=JSON.parse(sessionStorage.getItem("token"));if(a){const{data:n}=await e.post(`/Assign_Exposed_Room?Ticket=${a}`,{booking_nbr:t,identifier:o,pr_id:r});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}console.log(n);return n["My_Result"]}else{throw new Error("Invalid token")}}catch(e){console.error(e);throw new Error(e)}}cleanSpacesAndSpecialChars(e){const t=/[^a-zA-Z0-9]+/g;return e.replace(t,"")}transformToAssignable(e,t,o){const r=[];e.My_Result.forEach((e=>{e.unassigned_rooms.forEach((e=>{let a={roomTypeName:e.room_type_name,ID:e.identifier,NAME:e.guest_name,identifier:e.identifier,FROM_DATE:e.unassigned_date,TO_DATE:e.unassigned_date,BOOKING_NUMBER:e.book_nbr,STATUS:"IN-HOUSE",defaultDateRange:{fromDate:undefined,toDate:undefined,fromDateTimeStamp:0,toDateTimeStamp:0,fromDateStr:"",toDateStr:"",dateDifference:0},NO_OF_DAYS:1,roomsInfo:t,legendData:o,availableRooms:[],RT_ID:this.getRoomTypeId(e.room_type_name,t)};this.updateAvailableRooms(e,a,o,t);this.addDefaultDateRange(a);r.push(a)}))}));return r}addDefaultDateRange(e){e.defaultDateRange.fromDate=new Date(e.FROM_DATE+"T00:00:00");e.defaultDateRange.fromDateStr=t(e.defaultDateRange.fromDate);e.defaultDateRange.fromDateTimeStamp=e.defaultDateRange.fromDate.getTime();e.defaultDateRange.toDate=new Date(e.TO_DATE+"T00:00:00");e.defaultDateRange.toDateStr=t(e.defaultDateRange.toDate);e.defaultDateRange.toDateTimeStamp=e.defaultDateRange.toDate.getTime();e.defaultDateRange.dateDifference=e.NO_OF_DAYS}getRoomTypeId(e,t){return t.find((t=>this.cleanSpacesAndSpecialChars(t.name)===this.cleanSpacesAndSpecialChars(e))).id||null}updateAvailableRooms(e,t,r,a){const n=[];e.assignable_units.forEach((e=>{if(e.Is_Fully_Available&&!e.Is_Not_Available){const s=o(e.from_date,e.to_date);n.push({RT_ID:t.RT_ID,STATUS:"PENDING-CONFIRMATION",FROM_DATE:e.from_date,roomName:e.name,PR_ID:e.pr_id,TO_DATE:e.to_date,NO_OF_DAYS:s,ID:"NEW_TEMP_EVENT",NAME:"",NOTES:"",BALANCE:"",INTERNAL_NOTE:"",hideBubble:true,legendData:r,roomsInfo:a});t.TO_DATE=e.to_date;t.NO_OF_DAYS=s}}));t.availableRooms=n}convertUnassignedDates(e){let t={};e.forEach((e=>{let o=new Date(e.date);o.setHours(0,0,0,0);t[o.getTime()]={categories:{},dateStr:e.description}}));return t}}export{r as T};
//# sourceMappingURL=p-ff2ce22b.js.map