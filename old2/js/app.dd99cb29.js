(function(t){function e(e){for(var n,o,i=e[0],c=e[1],l=e[2],d=0,m=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&m.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(m.length)m.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,i=1;i<a.length;i++){var c=a[i];0!==r[c]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},r={app:0},s=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("85ec")},"0c02":function(t,e,a){"use strict";a("da95")},"3ffd":function(t,e,a){t.exports=a.p+"img/amp.56ec9fe8.png"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t._m(0),a("router-view")],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"site-banner"},[n("div",{staticClass:"logo"},[n("img",{attrs:{src:a("cf05"),width:"129",height:"120"}})]),n("h1",{staticClass:"banner-text"},[t._v("network monitoring automation system")])])}],o=(a("034f"),a("2877")),i={},c=Object(o["a"])(i,r,s,!1,null,null,null),l=c.exports,u=a("5530"),d=(a("dca8"),"ws://193.148.63.148:8080/"),m="tcn-accessToken",f="http://193.148.63.148:3001/login",p=a("8c4f"),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"navigation"},[a("h2",{staticClass:"description"},[t._v("Ugwuaji 330 kva power line")]),a("div",{staticClass:"logout-section"},[a("button",{on:{click:t.logOut}},[t._v("Log out")])])]),t.msg.text?a("p",{staticClass:"general",class:t.msg.type},[t._v(" "+t._s(t.msg.text)+" ")]):t._e(),a("div",{staticClass:"container"},[a("div",{staticClass:"main-card",class:t.voltageDisplayClass},[a("div",{staticClass:"card-line input-line"}),a("div",{staticClass:"card-line output-line"}),a("div",{staticClass:"details-card"},[t._m(0),a("div",{staticClass:"detail"},[a("span",{staticClass:"detail-text"},[t._v(" "+t._s(t.transmissionDataMessage("power"))+" ")])])]),a("div",{staticClass:"details-card"},[t._m(1),a("div",{staticClass:"detail"},[a("span",{staticClass:"detail-text"},[t._v(" "+t._s(t.transmissionDataMessage("current"))+" ")])])]),a("div",{staticClass:"details-card"},[t._m(2),a("div",{staticClass:"detail"},[a("span",{staticClass:"detail-text"},[t._v(" "+t._s(t.transmissionDataMessage("voltage"))+" ")])])]),a("div",{staticClass:"details-card"},[t._m(3),a("div",{staticClass:"detail"},[a("span",{staticClass:"detail-text"},[t._v(" "+t._s(t.transmissionDataMessage("mvar"))+" ")])])])])])])},g=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"symbol"},[n("img",{attrs:{src:a("7d5b"),width:"170",height:"92"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"symbol"},[n("img",{attrs:{src:a("3ffd"),width:"170",height:"92"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"symbol"},[n("img",{attrs:{src:a("d808"),width:"170",height:"92"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"symbol"},[n("img",{attrs:{src:a("9d5d"),width:"170",height:"92"}})])}],h=(a("159b"),a("b64b"),a("caad"),a("2532"),a("07ac"),a("99af"),a("4128")),b=a.n(h),w=3e4,_=Object.freeze({power:"mw",mvar:"mvar",voltage:"kv",current:"amp"}),x=Object.freeze({voltage:Object.freeze({min:320,max:350})}),C=Object.freeze({power:2,mvar:2,voltage:0,current:0}),y=Object.freeze({power:1e3,mvar:1e3,voltage:1e3,current:1}),O=null,D=!1,j=null;function k(t){var e=t;return Object.keys(e).forEach((function(t){e[t]=b()(e[t]).abs().div(y[t]).toDP(C[t])})),e}var E={data:function(){return{ws:null,transmissionData:{power:null,mvar:null,voltage:null,current:null},msg:{text:"",type:""}}},computed:{hasEmptyTransmissionValue:function(){return Object.values(this.transmissionData).includes("")},voltageDisplayClass:function(){var t=this.transmissionData.voltage,e=x.voltage;return t?t.gt(e.max)||t.lt(e.min)?"error":"success":""},transmissionDataMessage:function(){var t=this;return function(e){var a=t.transmissionData[e],n=_[e];return a?"".concat(a).concat(n):"Loading..."}}},watch:{hasEmptyTransmissionValue:function(t,e){t?this.msg={text:"Error in connection"}:!t&&e&&(this.msg.text="")}},methods:{connect:function(){var t=this;this.ws=new WebSocket(d),O=setTimeout((function(){D=!0,t.msg={text:"No connection",type:"error"},console.error("connected, but no data received")}),w),this.ws.onmessage=function(e){D&&t.showConnectionMessage(),clearTimeout(O),t.transmissionData=k(JSON.parse(e.data)),O=setTimeout((function(){D=!0,t.msg={text:"Connection lost"}}),w)},this.ws.onerror=function(t){console.log("onerror",t)},this.ws.onclose=function(e){console.log("onclose",e),j=setInterval((function(){t.connect()}),5e3)},this.ws.onopen=function(e){console.log("onopen",e),clearInterval(j),D&&t.showConnectionMessage()}},showConnectionMessage:function(){var t=this;D=!1,this.msg={text:"Connected",type:"success"},setTimeout((function(){t.msg.text=""}),5e3)},logOut:function(){this.ws&&this.ws.close(),localStorage.removeItem(m),this.$router.push(H.LOGIN)}},mounted:function(){this.connect()}},M=E,$=(a("0c02"),Object(o["a"])(M,v,g,!1,null,"43b92b65",null)),T=$.exports,P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"login-card"},[a("h2",[t._v("Login")]),t.errorData.general?a("p",{staticClass:"error general"},[t._v(" "+t._s(t.errorData.general)+" ")]):t._e(),a("form",{attrs:{novalidate:""},on:{submit:function(e){return e.preventDefault(),t.logIn.apply(null,arguments)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"username"}},[t._v("Username")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.username,expression:"formData.username",modifiers:{trim:!0}}],attrs:{type:"text",id:"username",disabled:t.loading},domProps:{value:t.formData.username},on:{input:[function(e){e.target.composing||t.$set(t.formData,"username",e.target.value.trim())},function(e){t.errorData.username=t.validate("username")}],blur:function(e){return t.$forceUpdate()}}}),a("small",{staticClass:"error"},[t._v(t._s(t.errorData.username))])]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.password,expression:"formData.password",modifiers:{trim:!0}}],attrs:{type:"password",id:"password",disabled:t.loading},domProps:{value:t.formData.password},on:{input:[function(e){e.target.composing||t.$set(t.formData,"password",e.target.value.trim())},function(e){t.errorData.password=t.validate("password")}],blur:function(e){return t.$forceUpdate()}}}),a("small",{staticClass:"error"},[t._v(t._s(t.errorData.password))])]),a("div",[a("button",{attrs:{disabled:t.loading}},[t._v(t._s(t.buttonText))])])])])])},S=[],I=a("1da1"),L=(a("96cf"),a("d3b7"),{data:function(){return{errorData:{username:"",password:"",general:""},formData:{username:"",password:""},loading:!1}},computed:{buttonText:function(){return this.loading?"Loading...":"Login"}},methods:{logIn:function(){var t=this;return Object(I["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.loading){e.next=2;break}return e.abrupt("return");case 2:if(t.errorData.username=t.validate("username"),t.errorData.password=t.validate("password"),!t.errorData.username&&!t.errorData.password){e.next=6;break}return e.abrupt("return");case 6:return t.errorData.general="",t.loading=!0,e.prev=8,e.next=11,fetch(f,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t.formData)});case 11:return a=e.sent,e.next=14,a.json();case 14:if(n=e.sent,a.ok){e.next=17;break}throw new Error(n.message);case 17:localStorage.setItem(m,n.token),t.$router.push(H.HOME),e.next=24;break;case 21:e.prev=21,e.t0=e["catch"](8),t.errorData.general=e.t0.message||"Could not log in. Please try again";case 24:t.loading=!1;case 25:case"end":return e.stop()}}),e,null,[[8,21]])})))()},validate:function(t){return this.formData[t]?"":"Required"}}}),N=L,z=(a("d72b"),Object(o["a"])(N,P,S,!1,null,"e278c54a",null)),G=z.exports;n["a"].use(p["a"]);var H=Object.freeze({LOGIN:{path:"/login",name:"Login"},HOME:{path:"/",name:"Home"}}),J=[Object(u["a"])(Object(u["a"])({},H.HOME),{},{component:T,beforeEnter:function(t,e,a){var n=localStorage.getItem(m);n&&"undefined"!==n?a():a(H.LOGIN)}}),Object(u["a"])(Object(u["a"])({},H.LOGIN),{},{component:G})],U=new p["a"]({scrollBehavior:function(){return{x:0,y:0}},mode:"history",base:"/",routes:J}),R=U;n["a"].config.productionTip=!1,new n["a"]({router:R,render:function(t){return t(l)}}).$mount("#app")},"7d5b":function(t,e,a){t.exports=a.p+"img/watt.4af5e789.png"},"85ec":function(t,e,a){},"9d5d":function(t,e,a){t.exports=a.p+"img/reactive.cf1e0fb0.png"},cf05:function(t,e,a){t.exports=a.p+"img/logo.e0b27758.png"},d72b:function(t,e,a){"use strict";a("f768")},d808:function(t,e,a){t.exports=a.p+"img/volt.428a8622.png"},da95:function(t,e,a){},f768:function(t,e,a){}});
//# sourceMappingURL=app.dd99cb29.js.map