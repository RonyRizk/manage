import{c as n}from"./p-e948214f.js";const e={channels:[],selectedChannel:null,mappedChannels:[],connected_channels:[],isConnectedToChannel:false,channel_settings:null,property_id:null,channel_id:-1,is_active:false};const{state:t,onChange:l,dispose:s}=n(e);function a(n,e){t.channel_id=n;t.is_active=e}function i(n){if(n===""){t.selectedChannel=null;return}const e=t.channels.find((e=>e.id.toString()===n));if(e){t.selectedChannel=e}else{t.selectedChannel={id:n,name:"",properties:[]}}r()}function o(n,e){if(!t.channel_settings){t.channel_settings={hotel_id:"",hotel_title:""}}t.channel_settings[n]=e}function r(){let n=t.connected_channels.find((n=>n.channel.id.toString()===t.selectedChannel.id.toString()));if(!n){t.mappedChannels=[];return}t.mappedChannels=[...n.map]}function c(){t.selectedChannel=null;t.mappedChannels=[];t.isConnectedToChannel=false;t.channel_settings=null}function u(n,e,l){t.mappedChannels.push({channel_id:e,ir_id:n,type:l?"room_type":"rate_plan"})}function f(){var n;const e=t.selectedChannel.properties.find((n=>n.id===t.channel_settings.hotel_id));if(!e){return false}t.selectedChannel.property=e;if(t.mappedChannels.length===0){t.mappedChannels.push({ir_id:((n=t.property_id)!==null&&n!==void 0?n:-1).toString(),channel_id:t.channel_settings.hotel_id,type:"property"})}t.isConnectedToChannel=true;return true}export{i as a,u as b,t as c,r as d,l as o,c as r,a as s,f as t,o as u};
//# sourceMappingURL=p-baada5b8.js.map