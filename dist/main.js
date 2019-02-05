!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(5);var r=e=>{try{JSON.parse(e)}catch(e){return!1}return!0};const o={info:"info",success:"success",error:"error",warning:"warning"},i=(e=>({el:document.querySelector(e),value(){return this.el.value},html(e){return this.el.innerHTML=e,this},removeClass(e){return this.el.classList.remove(e),this},removeClasses(e=[]){return e.map(e=>this.removeClass(e)),this},addClass(e){return this.el.classList.add(e),this}}))("#notification"),a=()=>i.removeClasses(Object.values(o));i.el.onclick=(()=>a());const s=()=>Object.values(o).reduce((e,t)=>({...e,[t](e){this.showNotification(e,t)}}),{});var c=((e=5)=>({autohideDuration:e,timer:void 0,removeAfter(){this.timer=setTimeout(()=>{a()},1e3*this.autohideDuration)},showNotification(e,t){a(),i.html(e).addClass(t),clearTimeout(this.timer),this.removeAfter()},...s()}))();var l=e=>{const t=document.querySelector(e);if(r(t.value)){const e=JSON.stringify(JSON.parse(t.value),null,2);t.value=e,c.success("👍 JSON value prettified")}else c.error("😧 Value is not in valid JSON format")};var u=e=>crypto.subtle.digest("SHA-256",new TextEncoder("utf-8").encode(e)).then(e=>{const t=[],n=new DataView(e);for(let e=0;e<n.byteLength;e+=4)t.push(`00000000${n.getUint32(e).toString(16)}`.slice(-8));return t.join("")});var f=()=>{const e=localStorage.getItem("miropad.user");e?c.info(`🤗 Happy to see you again from ${e}`):c.info("<h1>Welcome 👋 😃 </h1>\n    <p>Use  Ctrl+S:  to save your note<p/>\n    <p>& Ctrl+P: to format a JSON doc<p/>",100),localStorage.setItem("miropad.user",(new Date).toLocaleDateString())};var d={events:[],on(e,t){if(!e||!t)throw Error("on method does not have all the required parameters");return this.events=[...this.events,{key:e,fn(){t()}}],this},listen(){return document.addEventListener("keydown",e=>{this.handleEvent(e)}),this},handleEvent(e){this.events.map(t=>(t.key!==e.key||!0!==e.ctrlKey&&!0!==e.metaKey||(e.preventDefault(),t.fn()),!0))}};var p=e=>{const{message:t="Unexpected error occured!"}=e;console.log("error",e),c.error(t)};var h=e=>{if(!e)return;const t={...localStorage};return Object.values(t).filter(t=>t.toLowerCase().includes(e.toLowerCase()))[0]};(()=>{window.addEventListener("error",p),f(),d.listen().on("p",()=>l(".terminal")).on("s",()=>{(async e=>{if(e.length){const t=await u(e);try{localStorage.setItem(t,e),window.location.assign(`#${t}`),c.success("👌 Note saved!")}catch(e){c.error(`😱 Something went wrong while trying to save to local storage ${e}`)}}else c.warning("😕 Nothing to save!")})(document.querySelector(".terminal").value)});const e=(()=>{const e=window.location.hash.substr(1);return localStorage.getItem(e)})();document.querySelector(".terminal").value=e;const t=new URL(window.location.href).searchParams.get("q"),n=h(t);n&&(document.querySelector(".terminal").value=n)})()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),c=null,l=0,u=[],f=n(1);function d(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(g(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(g(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function p(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function h(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function v(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function m(e){var t=document.createElement("style");return e.attrs.type="text/css",b(t,e.attrs),h(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var a=l++;n=c||(c=m(t)),r=x.bind(null,n,a,!1),o=x.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",b(t,e.attrs),h(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){v(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return d(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}e&&d(p(e,t),t);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}};var y,w=(y=[],function(e,t){return y[e]=t,y.filter(Boolean).join("\n")});function x(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,'html,\n* {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",\n    "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  -webkit-text-size-adjust: 100%;\n}\n* {\n  font-size: 1rem;\n}\nbody {\n  margin: 0;\n  padding: 0px;\n}\n\n.terminal {\n  margin: 0px;\n  width: 100%;\n  height: 100%;\n  background: black;\n  color: #00ec00;\n  font-size: 25px;\n  padding: 10px;\n  outline-color: red;\n}\n\n.notification {\n  position: fixed;\n  right: 25px;\n  width: 30%;\n  background: #000;\n  color: #fff;\n  text-align: center;\n  padding: 15px;\n  margin: auto;\n  border-radius: 4px;\n  border: 2px solid rgba(255, 255, 255, 0.25);\n  bottom: -100%;\n  transition: all 0.25s cubic-bezier(1, 0, 0.7, 1);\n  cursor: pointer;\n}\n\n.notification.info {\n  border: 1px solid rgba(0, 123, 255, 0.25);\n  background: rgba(0, 123, 255, 0.25);\n  bottom: 25px;\n  transition: all 0.5s linear;\n}\n\n.notification.success {\n  border: 1px solid rgba(0, 255, 0, 0.25);\n  background: rgba(0, 255, 0, 0.25);\n  bottom: 25px;\n  transition: all 0.5s linear;\n}\n\n.notification.error {\n  border: 1px solid rgba(255, 0, 0, 0.25);\n  background: rgba(255, 0, 0, 0.25);\n  bottom: 25px;\n  transition: all 0.5s linear;\n}\n\n.notification.warning {\n  border: 1px solid rgba(255, 255, 0, 0.25);\n  background: rgba(255, 255, 0, 0.25);\n  bottom: 25px;\n  transition: all 0.5s linear;\n}\n',""])},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(2)(r,o);r.locals&&(e.exports=r.locals)}]);