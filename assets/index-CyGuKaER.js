(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const Mp=()=>{};var Rl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Op=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],a=n[t++],c=n[t++],u=((r&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(u>>10)),e[s++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Sd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],a=r+1<n.length,c=a?n[r+1]:0,u=r+2<n.length,d=u?n[r+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let w=(c&15)<<2|d>>6,A=d&63;u||(A=64,a||(w=64)),s.push(t[f],t[p],t[w],t[A])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ad(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Op(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const p=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||c==null||d==null||p==null)throw new xp;const w=i<<2|c>>4;if(s.push(w),d!==64){const A=c<<4&240|d>>2;if(s.push(A),p!==64){const C=d<<6&192|p;s.push(C)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class xp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $p=function(n){const e=Ad(n);return Sd.encodeByteArray(e,!0)},ti=function(n){return $p(n).replace(/\./g,"")},Rd=function(n){try{return Sd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp=()=>Fp().__FIREBASE_DEFAULTS__,Up=()=>{if(typeof process>"u"||typeof Rl>"u")return;const n=Rl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},qp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Rd(n[1]);return e&&JSON.parse(e)},ki=()=>{try{return Mp()||Bp()||Up()||qp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Pd=n=>{var e,t;return(t=(e=ki())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},jp=n=>{const e=Pd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Cd=()=>{var n;return(n=ki())==null?void 0:n.config},Dd=n=>{var e;return(e=ki())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ti(JSON.stringify(t)),ti(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Wp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function Gp(){var e;const n=(e=ki())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Kp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ld(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Qp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Yp(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Jp(){return!Gp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Nd(){try{return typeof indexedDB=="object"}catch{return!1}}function Vd(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function Xp(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zp="FirebaseError";class tt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Zp,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kn.prototype.create)}}class kn{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?eg(i,s):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new tt(r,c,s)}}function eg(n,e){return n.replace(tg,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const tg=/\{\$([^}]+)}/g;function ng(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Jt(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const i=n[r],a=e[r];if(Pl(i)&&Pl(a)){if(!Jt(i,a))return!1}else if(i!==a)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function Pl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Ds(n){const e={};return n.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Ls(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function sg(n,e){const t=new rg(n,e);return t.subscribe.bind(t)}class rg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");ig(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=To),r.error===void 0&&(r.error=To),r.complete===void 0&&(r.complete=To);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ig(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function To(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og=1e3,ag=2,cg=4*60*60*1e3,lg=.5;function Cl(n,e=og,t=ag){const s=e*Math.pow(t,n),r=Math.round(lg*s*(Math.random()-.5)*2);return Math.min(cg,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Md(n){return(await fetch(n,{credentials:"include"})).ok}class Ze{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Hp;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(hg(e))try{this.getOrInitializeService({instanceIdentifier:dn})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=dn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dn){return this.instances.has(e)}getOptions(e=dn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);s===c&&a.resolve(r)}return r}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:dg(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=dn){return this.component?this.component.multipleInstances?e:dn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dg(n){return n===dn?void 0:n}function hg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ug(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));const mg={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},pg=G.INFO,gg={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},yg=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=gg[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ai{constructor(e){this.name=e,this._logLevel=pg,this._logHandler=yg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}}const _g=(n,e)=>e.some(t=>n instanceof t);let Dl,Ll;function Eg(){return Dl||(Dl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vg(){return Ll||(Ll=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Od=new WeakMap,qo=new WeakMap,xd=new WeakMap,Io=new WeakMap,wa=new WeakMap;function wg(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(zt(n.result)),r()},a=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Od.set(t,n)}).catch(()=>{}),wa.set(e,n),e}function Tg(n){if(qo.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),r()},a=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});qo.set(n,e)}let jo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return qo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||xd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return zt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ig(n){jo=n(jo)}function bg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(bo(this),e,...t);return xd.set(s,e.sort?e.sort():[e]),zt(s)}:vg().includes(n)?function(...e){return n.apply(bo(this),e),zt(Od.get(this))}:function(...e){return zt(n.apply(bo(this),e))}}function kg(n){return typeof n=="function"?bg(n):(n instanceof IDBTransaction&&Tg(n),_g(n,Eg())?new Proxy(n,jo):n)}function zt(n){if(n instanceof IDBRequest)return wg(n);if(Io.has(n))return Io.get(n);const e=kg(n);return e!==n&&(Io.set(n,e),wa.set(e,n)),e}const bo=n=>wa.get(n);function $d(n,e,{blocked:t,upgrade:s,blocking:r,terminated:i}={}){const a=indexedDB.open(n,e),c=zt(a);return s&&a.addEventListener("upgradeneeded",u=>{s(zt(a.result),u.oldVersion,u.newVersion,zt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),r&&u.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Ag=["get","getKey","getAll","getAllKeys","count"],Sg=["put","add","delete","clear"],ko=new Map;function Nl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ko.get(e))return ko.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=Sg.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Ag.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,r?"readwrite":"readonly");let d=u.store;return s&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&u.done]))[0]};return ko.set(e,i),i}Ig(n=>({...n,get:(e,t,s)=>Nl(e,t)||n.get(e,t,s),has:(e,t)=>!!Nl(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Pg(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Pg(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ho="@firebase/app",Vl="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new Ai("@firebase/app"),Cg="@firebase/app-compat",Dg="@firebase/analytics-compat",Lg="@firebase/analytics",Ng="@firebase/app-check-compat",Vg="@firebase/app-check",Mg="@firebase/auth",Og="@firebase/auth-compat",xg="@firebase/database",$g="@firebase/data-connect",Fg="@firebase/database-compat",Bg="@firebase/functions",Ug="@firebase/functions-compat",qg="@firebase/installations",jg="@firebase/installations-compat",Hg="@firebase/messaging",zg="@firebase/messaging-compat",Wg="@firebase/performance",Gg="@firebase/performance-compat",Kg="@firebase/remote-config",Qg="@firebase/remote-config-compat",Yg="@firebase/storage",Jg="@firebase/storage-compat",Xg="@firebase/firestore",Zg="@firebase/ai",ey="@firebase/firestore-compat",ty="firebase",ny="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="[DEFAULT]",sy={[Ho]:"fire-core",[Cg]:"fire-core-compat",[Lg]:"fire-analytics",[Dg]:"fire-analytics-compat",[Vg]:"fire-app-check",[Ng]:"fire-app-check-compat",[Mg]:"fire-auth",[Og]:"fire-auth-compat",[xg]:"fire-rtdb",[$g]:"fire-data-connect",[Fg]:"fire-rtdb-compat",[Bg]:"fire-fn",[Ug]:"fire-fn-compat",[qg]:"fire-iid",[jg]:"fire-iid-compat",[Hg]:"fire-fcm",[zg]:"fire-fcm-compat",[Wg]:"fire-perf",[Gg]:"fire-perf-compat",[Kg]:"fire-rc",[Qg]:"fire-rc-compat",[Yg]:"fire-gcs",[Jg]:"fire-gcs-compat",[Xg]:"fire-fst",[ey]:"fire-fst-compat",[Zg]:"fire-vertex","fire-js":"fire-js",[ty]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni=new Map,ry=new Map,Wo=new Map;function Ml(n,e){try{n.container.addComponent(e)}catch(t){At.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ht(n){const e=n.name;if(Wo.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;Wo.set(e,n);for(const t of ni.values())Ml(t,n);for(const t of ry.values())Ml(t,n);return!0}function An(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ze(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Wt=new kn("app","Firebase",iy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ze("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Wt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=ny;function Fd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:zo,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Wt.create("bad-app-name",{appName:String(r)});if(t||(t=Cd()),!t)throw Wt.create("no-options");const i=ni.get(r);if(i){if(Jt(t,i.options)&&Jt(s,i.config))return i;throw Wt.create("duplicate-app",{appName:r})}const a=new fg(r);for(const u of Wo.values())a.addComponent(u);const c=new oy(t,s,a);return ni.set(r,c),c}function Ta(n=zo){const e=ni.get(n);if(!e&&n===zo&&Cd())return Fd();if(!e)throw Wt.create("no-app",{appName:n});return e}function Ke(n,e,t){let s=sy[n]??n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(a.join(" "));return}ht(new Ze(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay="firebase-heartbeat-database",cy=1,Hs="firebase-heartbeat-store";let Ao=null;function Bd(){return Ao||(Ao=$d(ay,cy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Hs)}catch(t){console.warn(t)}}}}).catch(n=>{throw Wt.create("idb-open",{originalErrorMessage:n.message})})),Ao}async function ly(n){try{const t=(await Bd()).transaction(Hs),s=await t.objectStore(Hs).get(Ud(n));return await t.done,s}catch(e){if(e instanceof tt)At.warn(e.message);else{const t=Wt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});At.warn(t.message)}}}async function Ol(n,e){try{const s=(await Bd()).transaction(Hs,"readwrite");await s.objectStore(Hs).put(e,Ud(n)),await s.done}catch(t){if(t instanceof tt)At.warn(t.message);else{const s=Wt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});At.warn(s.message)}}}function Ud(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy=1024,dy=30;class hy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new my(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=xl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>dy){const a=py(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){At.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=xl(),{heartbeatsToSend:s,unsentEntries:r}=fy(this._heartbeatsCache.heartbeats),i=ti(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return At.warn(t),""}}}function xl(){return new Date().toISOString().substring(0,10)}function fy(n,e=uy){const t=[];let s=n.slice();for(const r of n){const i=t.find(a=>a.agent===r.agent);if(i){if(i.dates.push(r.date),$l(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),$l(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class my{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Nd()?Vd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ly(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ol(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ol(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function $l(n){return ti(JSON.stringify({version:2,heartbeats:n})).length}function py(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gy(n){ht(new Ze("platform-logger",e=>new Rg(e),"PRIVATE")),ht(new Ze("heartbeat",e=>new hy(e),"PRIVATE")),Ke(Ho,Vl,n),Ke(Ho,Vl,"esm2020"),Ke("fire-js","")}gy("");var Fl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gt,qd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function _(){}_.prototype=g.prototype,v.F=g.prototype,v.prototype=new _,v.prototype.constructor=v,v.D=function(T,E,b){for(var y=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)y[Me-2]=arguments[Me];return g.prototype[E].apply(T,y)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(v,g,_){_||(_=0);const T=Array(16);if(typeof g=="string")for(var E=0;E<16;++E)T[E]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(E=0;E<16;++E)T[E]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=v.g[0],_=v.g[1],E=v.g[2];let b=v.g[3],y;y=g+(b^_&(E^b))+T[0]+3614090360&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+T[1]+3905402710&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+T[2]+606105819&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+T[3]+3250441966&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(b^_&(E^b))+T[4]+4118548399&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+T[5]+1200080426&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+T[6]+2821735955&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+T[7]+4249261313&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(b^_&(E^b))+T[8]+1770035416&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+T[9]+2336552879&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+T[10]+4294925233&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+T[11]+2304563134&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(b^_&(E^b))+T[12]+1804603682&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+T[13]+4254626195&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+T[14]+2792965006&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+T[15]+1236535329&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(E^b&(_^E))+T[1]+4129170786&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+T[6]+3225465664&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+T[11]+643717713&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+T[0]+3921069994&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(_^E))+T[5]+3593408605&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+T[10]+38016083&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+T[15]+3634488961&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+T[4]+3889429448&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(_^E))+T[9]+568446438&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+T[14]+3275163606&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+T[3]+4107603335&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+T[8]+1163531501&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(_^E))+T[13]+2850285829&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+T[2]+4243563512&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+T[7]+1735328473&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+T[12]+2368359562&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(_^E^b)+T[5]+4294588738&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+T[8]+2272392833&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+T[11]+1839030562&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+T[14]+4259657740&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^b)+T[1]+2763975236&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+T[4]+1272893353&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+T[7]+4139469664&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+T[10]+3200236656&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^b)+T[13]+681279174&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+T[0]+3936430074&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+T[3]+3572445317&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+T[6]+76029189&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^b)+T[9]+3654602809&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+T[12]+3873151461&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+T[15]+530742520&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+T[2]+3299628645&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(E^(_|~b))+T[0]+4096336452&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+T[7]+1126891415&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+T[14]+2878612391&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+T[5]+4237533241&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~b))+T[12]+1700485571&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+T[3]+2399980690&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+T[10]+4293915773&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+T[1]+2240044497&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~b))+T[8]+1873313359&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+T[15]+4264355552&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+T[6]+2734768916&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+T[13]+1309151649&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~b))+T[4]+4149444226&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+T[11]+3174756917&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+T[2]+718787259&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+b&4294967295}s.prototype.v=function(v,g){g===void 0&&(g=v.length);const _=g-this.blockSize,T=this.C;let E=this.h,b=0;for(;b<g;){if(E==0)for(;b<=_;)r(this,v,b),b+=this.blockSize;if(typeof v=="string"){for(;b<g;)if(T[E++]=v.charCodeAt(b++),E==this.blockSize){r(this,T),E=0;break}}else for(;b<g;)if(T[E++]=v[b++],E==this.blockSize){r(this,T),E=0;break}}this.h=E,this.o+=g},s.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;g=this.o*8;for(var _=v.length-8;_<v.length;++_)v[_]=g&255,g/=256;for(this.v(v),v=Array(16),g=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)v[g++]=this.g[_]>>>T&255;return v};function i(v,g){var _=c;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=g(v)}function a(v,g){this.h=g;const _=[];let T=!0;for(let E=v.length-1;E>=0;E--){const b=v[E]|0;T&&b==g||(_[E]=b,T=!1)}this.g=_}var c={};function u(v){return-128<=v&&v<128?i(v,function(g){return new a([g|0],g<0?-1:0)}):new a([v|0],v<0?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return p;if(v<0)return L(d(-v));const g=[];let _=1;for(let T=0;v>=_;T++)g[T]=v/_|0,_*=4294967296;return new a(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return L(f(v.substring(1),g));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(g,8));let T=p;for(let b=0;b<v.length;b+=8){var E=Math.min(8,v.length-b);const y=parseInt(v.substring(b,b+E),g);E<8?(E=d(Math.pow(g,E)),T=T.j(E).add(d(y))):(T=T.j(_),T=T.add(d(y)))}return T}var p=u(0),w=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-L(this).m();let v=0,g=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);v+=(T>=0?T:4294967296+T)*g,g*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(C(this))return"0";if(N(this))return"-"+L(this).toString(v);const g=d(Math.pow(v,6));var _=this;let T="";for(;;){const E=oe(_,g).g;_=j(_,E.j(g));let b=((_.g.length>0?_.g[0]:_.h)>>>0).toString(v);if(_=E,C(_))return b+T;for(;b.length<6;)b="0"+b;T=b+T}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function C(v){if(v.h!=0)return!1;for(let g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function N(v){return v.h==-1}n.l=function(v){return v=j(this,v),N(v)?-1:C(v)?0:1};function L(v){const g=v.g.length,_=[];for(let T=0;T<g;T++)_[T]=~v.g[T];return new a(_,~v.h).add(w)}n.abs=function(){return N(this)?L(this):this},n.add=function(v){const g=Math.max(this.g.length,v.g.length),_=[];let T=0;for(let E=0;E<=g;E++){let b=T+(this.i(E)&65535)+(v.i(E)&65535),y=(b>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);T=y>>>16,b&=65535,y&=65535,_[E]=y<<16|b}return new a(_,_[_.length-1]&-2147483648?-1:0)};function j(v,g){return v.add(L(g))}n.j=function(v){if(C(this)||C(v))return p;if(N(this))return N(v)?L(this).j(L(v)):L(L(this).j(v));if(N(v))return L(this.j(L(v)));if(this.l(A)<0&&v.l(A)<0)return d(this.m()*v.m());const g=this.g.length+v.g.length,_=[];for(var T=0;T<2*g;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let E=0;E<v.g.length;E++){const b=this.i(T)>>>16,y=this.i(T)&65535,Me=v.i(E)>>>16,rn=v.i(E)&65535;_[2*T+2*E]+=y*rn,M(_,2*T+2*E),_[2*T+2*E+1]+=b*rn,M(_,2*T+2*E+1),_[2*T+2*E+1]+=y*Me,M(_,2*T+2*E+1),_[2*T+2*E+2]+=b*Me,M(_,2*T+2*E+2)}for(v=0;v<g;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=g;v<2*g;v++)_[v]=0;return new a(_,0)};function M(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function W(v,g){this.g=v,this.h=g}function oe(v,g){if(C(g))throw Error("division by zero");if(C(v))return new W(p,p);if(N(v))return g=oe(L(v),g),new W(L(g.g),L(g.h));if(N(g))return g=oe(v,L(g)),new W(L(g.g),g.h);if(v.g.length>30){if(N(v)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var _=w,T=g;T.l(v)<=0;)_=ue(_),T=ue(T);var E=J(_,1),b=J(T,1);for(T=J(T,2),_=J(_,2);!C(T);){var y=b.add(T);y.l(v)<=0&&(E=E.add(_),b=y),T=J(T,1),_=J(_,1)}return g=j(v,E.j(g)),new W(E,g)}for(E=p;v.l(g)>=0;){for(_=Math.max(1,Math.floor(v.m()/g.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),b=d(_),y=b.j(g);N(y)||y.l(v)>0;)_-=T,b=d(_),y=b.j(g);C(b)&&(b=w),E=E.add(b),v=j(v,y)}return new W(E,v)}n.B=function(v){return oe(this,v).h},n.and=function(v){const g=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<g;T++)_[T]=this.i(T)&v.i(T);return new a(_,this.h&v.h)},n.or=function(v){const g=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<g;T++)_[T]=this.i(T)|v.i(T);return new a(_,this.h|v.h)},n.xor=function(v){const g=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<g;T++)_[T]=this.i(T)^v.i(T);return new a(_,this.h^v.h)};function ue(v){const g=v.g.length+1,_=[];for(let T=0;T<g;T++)_[T]=v.i(T)<<1|v.i(T-1)>>>31;return new a(_,v.h)}function J(v,g){const _=g>>5;g%=32;const T=v.g.length-_,E=[];for(let b=0;b<T;b++)E[b]=g>0?v.i(b+_)>>>g|v.i(b+_+1)<<32-g:v.i(b+_);return new a(E,v.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,qd=s,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Gt=a}).apply(typeof Fl<"u"?Fl:typeof self<"u"?self:typeof window<"u"?window:{});var Lr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jd,Ns,Hd,Ur,Go,zd,Wd,Gd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Lr=="object"&&Lr];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var s=t(this);function r(o,l){if(l)e:{var h=s;o=o.split(".");for(var m=0;m<o.length-1;m++){var I=o[m];if(!(I in h))break e;h=h[I]}o=o[o.length-1],m=h[o],l=l(m),l!=m&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}r("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(o){return o||function(l){var h=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&h.push([m,l[m]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,h){return o.call.apply(o.bind,arguments)}function d(o,l,h){return d=u,d.apply(null,arguments)}function f(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,l){function h(){}h.prototype=l.prototype,o.Z=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(m,I,k){for(var D=Array(arguments.length-2),z=2;z<arguments.length;z++)D[z-2]=arguments[z];return l.prototype[I].apply(m,D)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function A(o){const l=o.length;if(l>0){const h=Array(l);for(let m=0;m<l;m++)h[m]=o[m];return h}return[]}function C(o,l){for(let m=1;m<arguments.length;m++){const I=arguments[m];var h=typeof I;if(h=h!="object"?h:I?Array.isArray(I)?"array":h:"null",h=="array"||h=="object"&&typeof I.length=="number"){h=o.length||0;const k=I.length||0;o.length=h+k;for(let D=0;D<k;D++)o[h+D]=I[D]}else o.push(I)}}class N{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function L(o){a.setTimeout(()=>{throw o},0)}function j(){var o=v;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class M{constructor(){this.h=this.g=null}add(l,h){const m=W.get();m.set(l,h),this.h?this.h.next=m:this.g=m,this.h=m}}var W=new N(()=>new oe,o=>o.reset());class oe{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ue,J=!1,v=new M,g=()=>{const o=Promise.resolve(void 0);ue=()=>{o.then(_)}};function _(){for(var o;o=j();){try{o.h.call(o.g)}catch(h){L(h)}var l=W;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}J=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var b=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return o}();function y(o){return/^[\s\xa0]*$/.test(o)}function Me(o,l){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}p(Me,E),Me.prototype.init=function(o,l){const h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Me.Z.h.call(this)},Me.prototype.h=function(){Me.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var rn="closure_listenable_"+(Math.random()*1e6|0),sp=0;function rp(o,l,h,m,I){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!m,this.ha=I,this.key=++sp,this.da=this.fa=!1}function yr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function _r(o,l,h){for(const m in o)l.call(h,o[m],m,o)}function ip(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function Sc(o){const l={};for(const h in o)l[h]=o[h];return l}const Rc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Pc(o,l){let h,m;for(let I=1;I<arguments.length;I++){m=arguments[I];for(h in m)o[h]=m[h];for(let k=0;k<Rc.length;k++)h=Rc[k],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function Er(o){this.src=o,this.g={},this.h=0}Er.prototype.add=function(o,l,h,m,I){const k=o.toString();o=this.g[k],o||(o=this.g[k]=[],this.h++);const D=Xi(o,l,m,I);return D>-1?(l=o[D],h||(l.fa=!1)):(l=new rp(l,this.src,k,!!m,I),l.fa=h,o.push(l)),l};function Ji(o,l){const h=l.type;if(h in o.g){var m=o.g[h],I=Array.prototype.indexOf.call(m,l,void 0),k;(k=I>=0)&&Array.prototype.splice.call(m,I,1),k&&(yr(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Xi(o,l,h,m){for(let I=0;I<o.length;++I){const k=o[I];if(!k.da&&k.listener==l&&k.capture==!!h&&k.ha==m)return I}return-1}var Zi="closure_lm_"+(Math.random()*1e6|0),eo={};function Cc(o,l,h,m,I){if(Array.isArray(l)){for(let k=0;k<l.length;k++)Cc(o,l[k],h,m,I);return null}return h=Nc(h),o&&o[rn]?o.J(l,h,c(m)?!!m.capture:!1,I):op(o,l,h,!1,m,I)}function op(o,l,h,m,I,k){if(!l)throw Error("Invalid event type");const D=c(I)?!!I.capture:!!I;let z=no(o);if(z||(o[Zi]=z=new Er(o)),h=z.add(l,h,m,D,k),h.proxy)return h;if(m=ap(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)b||(I=D),I===void 0&&(I=!1),o.addEventListener(l.toString(),m,I);else if(o.attachEvent)o.attachEvent(Lc(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function ap(){function o(h){return l.call(o.src,o.listener,h)}const l=cp;return o}function Dc(o,l,h,m,I){if(Array.isArray(l))for(var k=0;k<l.length;k++)Dc(o,l[k],h,m,I);else m=c(m)?!!m.capture:!!m,h=Nc(h),o&&o[rn]?(o=o.i,k=String(l).toString(),k in o.g&&(l=o.g[k],h=Xi(l,h,m,I),h>-1&&(yr(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete o.g[k],o.h--)))):o&&(o=no(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Xi(l,h,m,I)),(h=o>-1?l[o]:null)&&to(h))}function to(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[rn])Ji(l.i,o);else{var h=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(h,m,o.capture):l.detachEvent?l.detachEvent(Lc(h),m):l.addListener&&l.removeListener&&l.removeListener(m),(h=no(l))?(Ji(h,o),h.h==0&&(h.src=null,l[Zi]=null)):yr(o)}}}function Lc(o){return o in eo?eo[o]:eo[o]="on"+o}function cp(o,l){if(o.da)o=!0;else{l=new Me(l,this);const h=o.listener,m=o.ha||o.src;o.fa&&to(o),o=h.call(m,l)}return o}function no(o){return o=o[Zi],o instanceof Er?o:null}var so="__closure_events_fn_"+(Math.random()*1e9>>>0);function Nc(o){return typeof o=="function"?o:(o[so]||(o[so]=function(l){return o.handleEvent(l)}),o[so])}function Ae(){T.call(this),this.i=new Er(this),this.M=this,this.G=null}p(Ae,T),Ae.prototype[rn]=!0,Ae.prototype.removeEventListener=function(o,l,h,m){Dc(this,o,l,h,m)};function Le(o,l){var h,m=o.G;if(m)for(h=[];m;m=m.G)h.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new E(l,o);else if(l instanceof E)l.target=l.target||o;else{var I=l;l=new E(m,o),Pc(l,I)}I=!0;let k,D;if(h)for(D=h.length-1;D>=0;D--)k=l.g=h[D],I=vr(k,m,!0,l)&&I;if(k=l.g=o,I=vr(k,m,!0,l)&&I,I=vr(k,m,!1,l)&&I,h)for(D=0;D<h.length;D++)k=l.g=h[D],I=vr(k,m,!1,l)&&I}Ae.prototype.N=function(){if(Ae.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const h=o.g[l];for(let m=0;m<h.length;m++)yr(h[m]);delete o.g[l],o.h--}}this.G=null},Ae.prototype.J=function(o,l,h,m){return this.i.add(String(o),l,!1,h,m)},Ae.prototype.K=function(o,l,h,m){return this.i.add(String(o),l,!0,h,m)};function vr(o,l,h,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let I=!0;for(let k=0;k<l.length;++k){const D=l[k];if(D&&!D.da&&D.capture==h){const z=D.listener,ye=D.ha||D.src;D.fa&&Ji(o.i,D),I=z.call(ye,m)!==!1&&I}}return I&&!m.defaultPrevented}function lp(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Vc(o){o.g=lp(()=>{o.g=null,o.i&&(o.i=!1,Vc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class up extends T{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Vc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function hs(o){T.call(this),this.h=o,this.g={}}p(hs,T);var Mc=[];function Oc(o){_r(o.g,function(l,h){this.g.hasOwnProperty(h)&&to(l)},o),o.g={}}hs.prototype.N=function(){hs.Z.N.call(this),Oc(this)},hs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ro=a.JSON.stringify,dp=a.JSON.parse,hp=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function xc(){}function $c(){}var fs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function io(){E.call(this,"d")}p(io,E);function oo(){E.call(this,"c")}p(oo,E);var on={},Fc=null;function wr(){return Fc=Fc||new Ae}on.Ia="serverreachability";function Bc(o){E.call(this,on.Ia,o)}p(Bc,E);function ms(o){const l=wr();Le(l,new Bc(l))}on.STAT_EVENT="statevent";function Uc(o,l){E.call(this,on.STAT_EVENT,o),this.stat=l}p(Uc,E);function Ne(o){const l=wr();Le(l,new Uc(l,o))}on.Ja="timingevent";function qc(o,l){E.call(this,on.Ja,o),this.size=l}p(qc,E);function ps(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function gs(){this.g=!0}gs.prototype.ua=function(){this.g=!1};function fp(o,l,h,m,I,k){o.info(function(){if(o.g)if(k){var D="",z=k.split("&");for(let ne=0;ne<z.length;ne++){var ye=z[ne].split("=");if(ye.length>1){const we=ye[0];ye=ye[1];const st=we.split("_");D=st.length>=2&&st[1]=="type"?D+(we+"="+ye+"&"):D+(we+"=redacted&")}}}else D=null;else D=k;return"XMLHTTP REQ ("+m+") [attempt "+I+"]: "+l+`
`+h+`
`+D})}function mp(o,l,h,m,I,k,D){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+I+"]: "+l+`
`+h+`
`+k+" "+D})}function Nn(o,l,h,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+gp(o,h)+(m?" "+m:"")})}function pp(o,l){o.info(function(){return"TIMEOUT: "+l})}gs.prototype.info=function(){};function gp(o,l){if(!o.g)return l;if(!l)return null;try{const k=JSON.parse(l);if(k){for(o=0;o<k.length;o++)if(Array.isArray(k[o])){var h=k[o];if(!(h.length<2)){var m=h[1];if(Array.isArray(m)&&!(m.length<1)){var I=m[0];if(I!="noop"&&I!="stop"&&I!="close")for(let D=1;D<m.length;D++)m[D]=""}}}}return ro(k)}catch{return l}}var Tr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},jc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Hc;function ao(){}p(ao,xc),ao.prototype.g=function(){return new XMLHttpRequest},Hc=new ao;function ys(o){return encodeURIComponent(String(o))}function yp(o){var l=1;o=o.split(":");const h=[];for(;l>0&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function Lt(o,l,h,m){this.j=o,this.i=l,this.l=h,this.S=m||1,this.V=new hs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new zc}function zc(){this.i=null,this.g="",this.h=!1}var Wc={},co={};function lo(o,l,h){o.M=1,o.A=br(nt(l)),o.u=h,o.R=!0,Gc(o,null)}function Gc(o,l){o.F=Date.now(),Ir(o),o.B=nt(o.A);var h=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),ol(h.i,"t",m),o.C=0,h=o.j.L,o.h=new zc,o.g=bl(o.j,h?l:null,!o.u),o.P>0&&(o.O=new up(d(o.Y,o,o.g),o.P)),l=o.V,h=o.g,m=o.ba;var I="readystatechange";Array.isArray(I)||(I&&(Mc[0]=I.toString()),I=Mc);for(let k=0;k<I.length;k++){const D=Cc(h,I[k],m||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=o.J?Sc(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),ms(),fp(o.i,o.v,o.B,o.l,o.S,o.u)}Lt.prototype.ba=function(o){o=o.target;const l=this.O;l&&Mt(o)==3?l.j():this.Y(o)},Lt.prototype.Y=function(o){try{if(o==this.g)e:{const z=Mt(this.g),ye=this.g.ya(),ne=this.g.ca();if(!(z<3)&&(z!=3||this.g&&(this.h.h||this.g.la()||fl(this.g)))){this.K||z!=4||ye==7||(ye==8||ne<=0?ms(3):ms(2)),uo(this);var l=this.g.ca();this.X=l;var h=_p(this);if(this.o=l==200,mp(this.i,this.v,this.B,this.l,this.S,z,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,I=this.g;if((m=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var k=m;break t}}k=null}if(o=k)Nn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ho(this,o);else{this.o=!1,this.m=3,Ne(12),an(this),_s(this);break e}}if(this.R){o=!0;let we;for(;!this.K&&this.C<h.length;)if(we=Ep(this,h),we==co){z==4&&(this.m=4,Ne(14),o=!1),Nn(this.i,this.l,null,"[Incomplete Response]");break}else if(we==Wc){this.m=4,Ne(15),Nn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else Nn(this.i,this.l,we,null),ho(this,we);if(Kc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||h.length!=0||this.h.h||(this.m=1,Ne(16),o=!1),this.o=this.o&&o,!o)Nn(this.i,this.l,h,"[Invalid Chunked Response]"),an(this),_s(this);else if(h.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),vo(D),D.P=!0,Ne(11))}}else Nn(this.i,this.l,h,null),ho(this,h);z==4&&an(this),this.o&&!this.K&&(z==4?vl(this.j,this):(this.o=!1,Ir(this)))}else Np(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ne(12)):(this.m=0,Ne(13)),an(this),_s(this)}}}catch{}finally{}};function _p(o){if(!Kc(o))return o.g.la();const l=fl(o.g);if(l==="")return"";let h="";const m=l.length,I=Mt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return an(o),_s(o),"";o.h.i=new a.TextDecoder}for(let k=0;k<m;k++)o.h.h=!0,h+=o.h.i.decode(l[k],{stream:!(I&&k==m-1)});return l.length=0,o.h.g+=h,o.C=0,o.h.g}function Kc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Ep(o,l){var h=o.C,m=l.indexOf(`
`,h);return m==-1?co:(h=Number(l.substring(h,m)),isNaN(h)?Wc:(m+=1,m+h>l.length?co:(l=l.slice(m,m+h),o.C=m+h,l)))}Lt.prototype.cancel=function(){this.K=!0,an(this)};function Ir(o){o.T=Date.now()+o.H,Qc(o,o.H)}function Qc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ps(d(o.aa,o),l)}function uo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Lt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(pp(this.i,this.B),this.M!=2&&(ms(),Ne(17)),an(this),this.m=2,_s(this)):Qc(this,this.T-o)};function _s(o){o.j.I==0||o.K||vl(o.j,o)}function an(o){uo(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,Oc(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function ho(o,l){try{var h=o.j;if(h.I!=0&&(h.g==o||fo(h.h,o))){if(!o.L&&fo(h.h,o)&&h.I==3){try{var m=h.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var I=m;if(I[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Pr(h),Sr(h);else break e;Eo(h),Ne(18)}}else h.xa=I[1],0<h.xa-h.K&&I[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=ps(d(h.Va,h),6e3));Xc(h.h)<=1&&h.ta&&(h.ta=void 0)}else ln(h,11)}else if((o.L||h.g==o)&&Pr(h),!y(l))for(I=h.Ba.g.parse(l),l=0;l<I.length;l++){let ne=I[l];const we=ne[0];if(!(we<=h.K))if(h.K=we,ne=ne[1],h.I==2)if(ne[0]=="c"){h.M=ne[1],h.ba=ne[2];const st=ne[3];st!=null&&(h.ka=st,h.j.info("VER="+h.ka));const un=ne[4];un!=null&&(h.za=un,h.j.info("SVER="+h.za));const Ot=ne[5];Ot!=null&&typeof Ot=="number"&&Ot>0&&(m=1.5*Ot,h.O=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const xt=o.g;if(xt){const Dr=xt.g?xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Dr){var k=m.h;k.g||Dr.indexOf("spdy")==-1&&Dr.indexOf("quic")==-1&&Dr.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(mo(k,k.h),k.h=null))}if(m.G){const wo=xt.g?xt.g.getResponseHeader("X-HTTP-Session-Id"):null;wo&&(m.wa=wo,re(m.J,m.G,wo))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),m=h;var D=o;if(m.na=Il(m,m.L?m.ba:null,m.W),D.L){Zc(m.h,D);var z=D,ye=m.O;ye&&(z.H=ye),z.D&&(uo(z),Ir(z)),m.g=D}else _l(m);h.i.length>0&&Rr(h)}else ne[0]!="stop"&&ne[0]!="close"||ln(h,7);else h.I==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?ln(h,7):_o(h):ne[0]!="noop"&&h.l&&h.l.qa(ne),h.A=0)}}ms(4)}catch{}}var vp=class{constructor(o,l){this.g=o,this.map=l}};function Yc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Jc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Xc(o){return o.h?1:o.g?o.g.size:0}function fo(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function mo(o,l){o.g?o.g.add(l):o.h=l}function Zc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Yc.prototype.cancel=function(){if(this.i=el(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function el(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.G);return l}return A(o.i)}var tl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function wp(o,l){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const m=o[h].indexOf("=");let I,k=null;m>=0?(I=o[h].substring(0,m),k=o[h].substring(m+1)):I=o[h],l(I,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function Nt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Nt?(this.l=o.l,Es(this,o.j),this.o=o.o,this.g=o.g,vs(this,o.u),this.h=o.h,po(this,al(o.i)),this.m=o.m):o&&(l=String(o).match(tl))?(this.l=!1,Es(this,l[1]||"",!0),this.o=ws(l[2]||""),this.g=ws(l[3]||"",!0),vs(this,l[4]),this.h=ws(l[5]||"",!0),po(this,l[6]||"",!0),this.m=ws(l[7]||"")):(this.l=!1,this.i=new Is(null,this.l))}Nt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Ts(l,nl,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Ts(l,nl,!0),"@"),o.push(ys(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Ts(h,h.charAt(0)=="/"?bp:Ip,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Ts(h,Ap)),o.join("")},Nt.prototype.resolve=function(o){const l=nt(this);let h=!!o.j;h?Es(l,o.j):h=!!o.o,h?l.o=o.o:h=!!o.g,h?l.g=o.g:h=o.u!=null;var m=o.h;if(h)vs(l,o.u);else if(h=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var I=l.h.lastIndexOf("/");I!=-1&&(m=l.h.slice(0,I+1)+m)}if(I=m,I==".."||I==".")m="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){m=I.lastIndexOf("/",0)==0,I=I.split("/");const k=[];for(let D=0;D<I.length;){const z=I[D++];z=="."?m&&D==I.length&&k.push(""):z==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),m&&D==I.length&&k.push("")):(k.push(z),m=!0)}m=k.join("/")}else m=I}return h?l.h=m:h=o.i.toString()!=="",h?po(l,al(o.i)):h=!!o.m,h&&(l.m=o.m),l};function nt(o){return new Nt(o)}function Es(o,l,h){o.j=h?ws(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function vs(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function po(o,l,h){l instanceof Is?(o.i=l,Sp(o.i,o.l)):(h||(l=Ts(l,kp)),o.i=new Is(l,o.l))}function re(o,l,h){o.i.set(l,h)}function br(o){return re(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function ws(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ts(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Tp),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Tp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var nl=/[#\/\?@]/g,Ip=/[#\?:]/g,bp=/[#\?]/g,kp=/[#\?@]/g,Ap=/#/g;function Is(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function cn(o){o.g||(o.g=new Map,o.h=0,o.i&&wp(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=Is.prototype,n.add=function(o,l){cn(this),this.i=null,o=Vn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function sl(o,l){cn(o),l=Vn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function rl(o,l){return cn(o),l=Vn(o,l),o.g.has(l)}n.forEach=function(o,l){cn(this),this.g.forEach(function(h,m){h.forEach(function(I){o.call(l,I,m,this)},this)},this)};function il(o,l){cn(o);let h=[];if(typeof l=="string")rl(o,l)&&(h=h.concat(o.g.get(Vn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)h=h.concat(o[l]);return h}n.set=function(o,l){return cn(this),this.i=null,o=Vn(this,o),rl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=il(this,o),o.length>0?String(o[0]):l):l};function ol(o,l,h){sl(o,l),h.length>0&&(o.i=null,o.g.set(Vn(o,l),A(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var h=l[m];const I=ys(h);h=il(this,h);for(let k=0;k<h.length;k++){let D=I;h[k]!==""&&(D+="="+ys(h[k])),o.push(D)}}return this.i=o.join("&")};function al(o){const l=new Is;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Vn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Sp(o,l){l&&!o.j&&(cn(o),o.i=null,o.g.forEach(function(h,m){const I=m.toLowerCase();m!=I&&(sl(this,m),ol(this,I,h))},o)),o.j=l}function Rp(o,l){const h=new gs;if(a.Image){const m=new Image;m.onload=f(Vt,h,"TestLoadImage: loaded",!0,l,m),m.onerror=f(Vt,h,"TestLoadImage: error",!1,l,m),m.onabort=f(Vt,h,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(Vt,h,"TestLoadImage: timeout",!1,l,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function Pp(o,l){const h=new gs,m=new AbortController,I=setTimeout(()=>{m.abort(),Vt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(k=>{clearTimeout(I),k.ok?Vt(h,"TestPingServer: ok",!0,l):Vt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),Vt(h,"TestPingServer: error",!1,l)})}function Vt(o,l,h,m,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),m(h)}catch{}}function Cp(){this.g=new hp}function go(o){this.i=o.Sb||null,this.h=o.ab||!1}p(go,xc),go.prototype.g=function(){return new kr(this.i,this.h)};function kr(o,l){Ae.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(kr,Ae),n=kr.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,ks(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,bs(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ks(this)),this.g&&(this.readyState=3,ks(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;cl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function cl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?bs(this):ks(this),this.readyState==3&&cl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,bs(this))},n.Na=function(o){this.g&&(this.response=o,bs(this))},n.ga=function(){this.g&&bs(this)};function bs(o){o.readyState=4,o.l=null,o.j=null,o.B=null,ks(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function ks(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(kr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function ll(o){let l="";return _r(o,function(h,m){l+=m,l+=":",l+=h,l+=`\r
`}),l}function yo(o,l,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=ll(h),typeof o=="string"?h!=null&&ys(h):re(o,l,h))}function de(o){Ae.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(de,Ae);var Dp=/^https?$/i,Lp=["POST","PUT"];n=de.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Hc.g(),this.g.onreadystatechange=w(d(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(k){ul(this,k);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var I in m)h.set(I,m[I]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const k of m.keys())h.set(k,m.get(k));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(k=>k.toLowerCase()=="content-type"),I=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Lp,l,void 0)>=0)||m||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,D]of h)this.g.setRequestHeader(k,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(k){ul(this,k)}};function ul(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,dl(o),Ar(o)}function dl(o){o.A||(o.A=!0,Le(o,"complete"),Le(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Le(this,"complete"),Le(this,"abort"),Ar(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ar(this,!0)),de.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?hl(this):this.Xa())},n.Xa=function(){hl(this)};function hl(o){if(o.h&&typeof i<"u"){if(o.v&&Mt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Le(o,"readystatechange"),Mt(o)==4){o.h=!1;try{const k=o.ca();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var m;if(m=k===0){let D=String(o.D).match(tl)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),m=!Dp.test(D?D.toLowerCase():"")}h=m}if(h)Le(o,"complete"),Le(o,"success");else{o.o=6;try{var I=Mt(o)>2?o.g.statusText:""}catch{I=""}o.l=I+" ["+o.ca()+"]",dl(o)}}finally{Ar(o)}}}}function Ar(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,l||Le(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Mt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Mt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),dp(l)}};function fl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Np(o){const l={};o=(o.g&&Mt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(y(o[m]))continue;var h=yp(o[m]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const k=l[I]||[];l[I]=k,k.push(h)}ip(l,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function As(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function ml(o){this.za=0,this.i=[],this.j=new gs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=As("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=As("baseRetryDelayMs",5e3,o),this.Za=As("retryDelaySeedMs",1e4,o),this.Ta=As("forwardChannelMaxRetries",2,o),this.va=As("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Yc(o&&o.concurrentRequestLimit),this.Ba=new Cp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=ml.prototype,n.ka=8,n.I=1,n.connect=function(o,l,h,m){Ne(0),this.W=o,this.H=l||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.J=Il(this,null,this.W),Rr(this)};function _o(o){if(pl(o),o.I==3){var l=o.V++,h=nt(o.J);if(re(h,"SID",o.M),re(h,"RID",l),re(h,"TYPE","terminate"),Ss(o,h),l=new Lt(o,o.j,l),l.M=2,l.A=br(nt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=bl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Ir(l)}Tl(o)}function Sr(o){o.g&&(vo(o),o.g.cancel(),o.g=null)}function pl(o){Sr(o),o.v&&(a.clearTimeout(o.v),o.v=null),Pr(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Rr(o){if(!Jc(o.h)&&!o.m){o.m=!0;var l=o.Ea;ue||g(),J||(ue(),J=!0),v.add(l,o),o.D=0}}function Vp(o,l){return Xc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ps(d(o.Ea,o,l),wl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const I=new Lt(this,this.j,o);let k=this.o;if(this.U&&(k?(k=Sc(k),Pc(k,this.U)):k=this.U),this.u!==null||this.R||(I.J=k,k=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=yl(this,I,l),h=nt(this.J),re(h,"RID",o),re(h,"CVER",22),this.G&&re(h,"X-HTTP-Session-Id",this.G),Ss(this,h),k&&(this.R?l="headers="+ys(ll(k))+"&"+l:this.u&&yo(h,this.u,k)),mo(this.h,I),this.Ra&&re(h,"TYPE","init"),this.S?(re(h,"$req",l),re(h,"SID","null"),I.U=!0,lo(I,h,null)):lo(I,h,l),this.I=2}}else this.I==3&&(o?gl(this,o):this.i.length==0||Jc(this.h)||gl(this))};function gl(o,l){var h;l?h=l.l:h=o.V++;const m=nt(o.J);re(m,"SID",o.M),re(m,"RID",h),re(m,"AID",o.K),Ss(o,m),o.u&&o.o&&yo(m,o.u,o.o),h=new Lt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),l&&(o.i=l.G.concat(o.i)),l=yl(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),mo(o.h,h),lo(h,m,l)}function Ss(o,l){o.H&&_r(o.H,function(h,m){re(l,m,h)}),o.l&&_r({},function(h,m){re(l,m,h)})}function yl(o,l,h){h=Math.min(o.i.length,h);const m=o.l?d(o.l.Ka,o.l,o):null;e:{var I=o.i;let z=-1;for(;;){const ye=["count="+h];z==-1?h>0?(z=I[0].g,ye.push("ofs="+z)):z=0:ye.push("ofs="+z);let ne=!0;for(let we=0;we<h;we++){var k=I[we].g;const st=I[we].map;if(k-=z,k<0)z=Math.max(0,I[we].g-100),ne=!1;else try{k="req"+k+"_"||"";try{var D=st instanceof Map?st:Object.entries(st);for(const[un,Ot]of D){let xt=Ot;c(Ot)&&(xt=ro(Ot)),ye.push(k+un+"="+encodeURIComponent(xt))}}catch(un){throw ye.push(k+"type="+encodeURIComponent("_badmap")),un}}catch{m&&m(st)}}if(ne){D=ye.join("&");break e}}D=void 0}return o=o.i.splice(0,h),l.G=o,D}function _l(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;ue||g(),J||(ue(),J=!0),v.add(l,o),o.A=0}}function Eo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ps(d(o.Da,o),wl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,El(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ps(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ne(10),Sr(this),El(this))};function vo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function El(o){o.g=new Lt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=nt(o.na);re(l,"RID","rpc"),re(l,"SID",o.M),re(l,"AID",o.K),re(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&re(l,"TO",o.ia),re(l,"TYPE","xmlhttp"),Ss(o,l),o.u&&o.o&&yo(l,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=br(nt(l)),h.u=null,h.R=!0,Gc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,Sr(this),Eo(this),Ne(19))};function Pr(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function vl(o,l){var h=null;if(o.g==l){Pr(o),vo(o),o.g=null;var m=2}else if(fo(o.h,l))h=l.G,Zc(o.h,l),m=1;else return;if(o.I!=0){if(l.o)if(m==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var I=o.D;m=wr(),Le(m,new qc(m,h)),Rr(o)}else _l(o);else if(I=l.m,I==3||I==0&&l.X>0||!(m==1&&Vp(o,l)||m==2&&Eo(o)))switch(h&&h.length>0&&(l=o.h,l.i=l.i.concat(h)),I){case 1:ln(o,5);break;case 4:ln(o,10);break;case 3:ln(o,6);break;default:ln(o,2)}}}function wl(o,l){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*l}function ln(o,l){if(o.j.info("Error code "+l),l==2){var h=d(o.bb,o),m=o.Ua;const I=!m;m=new Nt(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Es(m,"https"),br(m),I?Rp(m.toString(),h):Pp(m.toString(),h)}else Ne(2);o.I=0,o.l&&o.l.pa(l),Tl(o),pl(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ne(2)):(this.j.info("Failed to ping google.com"),Ne(1))};function Tl(o){if(o.I=0,o.ja=[],o.l){const l=el(o.h);(l.length!=0||o.i.length!=0)&&(C(o.ja,l),C(o.ja,o.i),o.h.i.length=0,A(o.i),o.i.length=0),o.l.oa()}}function Il(o,l,h){var m=h instanceof Nt?nt(h):new Nt(h);if(m.g!="")l&&(m.g=l+"."+m.g),vs(m,m.u);else{var I=a.location;m=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;const k=new Nt(null);m&&Es(k,m),l&&(k.g=l),I&&vs(k,I),h&&(k.h=h),m=k}return h=o.G,l=o.wa,h&&l&&re(m,h,l),re(m,"VER",o.ka),Ss(o,m),m}function bl(o,l,h){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new de(new go({ab:h})):new de(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function kl(){}n=kl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Cr(){}Cr.prototype.g=function(o,l){return new $e(o,l)};function $e(o,l){Ae.call(this),this.g=new ml(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!y(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Mn(this)}p($e,Ae),$e.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){_o(this.g)},$e.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=ro(o),o=h);l.i.push(new vp(l.Ya++,o)),l.I==3&&Rr(l)},$e.prototype.N=function(){this.g.l=null,delete this.j,_o(this.g),delete this.g,$e.Z.N.call(this)};function Al(o){io.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}p(Al,io);function Sl(){oo.call(this),this.status=1}p(Sl,oo);function Mn(o){this.g=o}p(Mn,kl),Mn.prototype.ra=function(){Le(this.g,"a")},Mn.prototype.qa=function(o){Le(this.g,new Al(o))},Mn.prototype.pa=function(o){Le(this.g,new Sl)},Mn.prototype.oa=function(){Le(this.g,"b")},Cr.prototype.createWebChannel=Cr.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,Gd=function(){return new Cr},Wd=function(){return wr()},zd=on,Go={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Tr.NO_ERROR=0,Tr.TIMEOUT=8,Tr.HTTP_ERROR=6,Ur=Tr,jc.COMPLETE="complete",Hd=jc,$c.EventType=fs,fs.OPEN="a",fs.CLOSE="b",fs.ERROR="c",fs.MESSAGE="d",Ae.prototype.listen=Ae.prototype.J,Ns=$c,de.prototype.listenOnce=de.prototype.K,de.prototype.getLastError=de.prototype.Ha,de.prototype.getLastErrorCode=de.prototype.ya,de.prototype.getStatus=de.prototype.ca,de.prototype.getResponseJson=de.prototype.La,de.prototype.getResponseText=de.prototype.la,de.prototype.send=de.prototype.ea,de.prototype.setWithCredentials=de.prototype.Fa,jd=de}).apply(typeof Lr<"u"?Lr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Pe.UNAUTHENTICATED=new Pe(null),Pe.GOOGLE_CREDENTIALS=new Pe("google-credentials-uid"),Pe.FIRST_PARTY=new Pe("first-party-uid"),Pe.MOCK_USER=new Pe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cs="12.11.0";function yy(n){cs=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new Ai("@firebase/firestore");function xn(){return _n.logLevel}function V(n,...e){if(_n.logLevel<=G.DEBUG){const t=e.map(Ia);_n.debug(`Firestore (${cs}): ${n}`,...t)}}function St(n,...e){if(_n.logLevel<=G.ERROR){const t=e.map(Ia);_n.error(`Firestore (${cs}): ${n}`,...t)}}function En(n,...e){if(_n.logLevel<=G.WARN){const t=e.map(Ia);_n.warn(`Firestore (${cs}): ${n}`,...t)}}function Ia(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,Kd(n,s,t)}function Kd(n,e,t){let s=`FIRESTORE (${cs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw St(s),new Error(s)}function Z(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||Kd(e,r,s)}function q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _y{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Pe.UNAUTHENTICATED))}shutdown(){}}class Ey{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class vy{constructor(e){this.t=e,this.currentUser=Pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Z(this.o===void 0,42304);let s=this.i;const r=u=>this.i!==s?(s=this.i,t(u)):Promise.resolve();let i=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Kt,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Kt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Z(typeof s.accessToken=="string",31837,{l:s}),new Qd(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Z(e===null||typeof e=="string",2055,{h:e}),new Pe(e)}}class wy{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=Pe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Ty{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new wy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Pe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Bl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Iy{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Z(this.o===void 0,3512);const s=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Bl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Z(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Bl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function by(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=by(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<t&&(s+=e.charAt(r[i]%62))}return s}}function K(n,e){return n<e?-1:n>e?1:0}function Ko(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const r=n.charAt(s),i=e.charAt(s);if(r!==i)return So(r)===So(i)?K(r,i):So(r)?1:-1}return K(n.length,e.length)}const ky=55296,Ay=57343;function So(n){const e=n.charCodeAt(0);return e>=ky&&e<=Ay}function Xn(n,e,t){return n.length===e.length&&n.every((s,r)=>t(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul="__name__";class ot{constructor(e,t,s){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&B(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return ot.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ot?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const i=ot.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return K(e.length,t.length)}static compareSegments(e,t){const s=ot.isNumericId(e),r=ot.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?ot.extractNumericId(e).compare(ot.extractNumericId(t)):Ko(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Gt.fromString(e.substring(4,e.length-2))}}class ae extends ot{construct(e,t,s){return new ae(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(r=>r.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const Sy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class be extends ot{construct(e,t,s){return new be(e,t,s)}static isValidIdentifier(e){return Sy.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ul}static keyField(){return new be([Ul])}static fromServerFormat(e){const t=[];let s="",r=0;const i=()=>{if(s.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=u,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(s+=c,r++):(i(),r++)}if(i(),a)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(t)}static emptyPath(){return new be([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(ae.fromString(e))}static fromName(e){return new x(ae.fromString(e).popFirst(5))}static empty(){return new x(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new ae(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ry(n,e,t){if(!t)throw new O(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Py(n,e,t,s){if(e===!0&&s===!0)throw new O(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ql(n){if(!x.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Yd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ka(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function Qt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ka(n);throw new O(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(n,e){const t={typeString:n};return e&&(t.value=e),t}function ir(n,e){if(!Yd(n))throw new O(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const a=n[s];if(r&&typeof a!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${s}' field to equal '${i.value}'`;break}}if(t)throw new O(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jl=-62135596800,Hl=1e6;class ie{static now(){return ie.fromMillis(Date.now())}static fromDate(e){return ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Hl);return new ie(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<jl)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Hl}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ir(e,ie._jsonSchema))return new ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-jl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ie._jsonSchemaVersion="firestore/timestamp/1.0",ie._jsonSchema={type:ge("string",ie._jsonSchemaVersion),seconds:ge("number"),nanoseconds:ge("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new ie(0,0))}static max(){return new U(new ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs=-1;function Cy(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=U.fromTimestamp(s===1e9?new ie(t+1,0):new ie(t,s));return new Xt(r,x.empty(),e)}function Dy(n){return new Xt(n.readTime,n.key,zs)}class Xt{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new Xt(U.min(),x.empty(),zs)}static max(){return new Xt(U.max(),x.empty(),zs)}}function Ly(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Vy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ls(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Ny)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(s,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,s)=>{t(e)})}static reject(e){return new R((t,s)=>{s(e)})}static waitFor(e){return new R((t,s)=>{let r=0,i=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++i,a&&i===r&&t()},u=>s(u))}),a=!0,i===r&&t()})}static or(e){let t=R.resolve(!1);for(const s of e)t=t.next(r=>r?R.resolve(r):s());return t}static forEach(e,t){const s=[];return e.forEach((r,i)=>{s.push(t.call(this,r,i))}),this.waitFor(s)}static mapArray(e,t){return new R((s,r)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++c,c===i&&s(a)},f=>r(f))}})}static doWhile(e,t){return new R((s,r)=>{const i=()=>{e()===!0?t().next(()=>{i()},r):s()};i()})}}function My(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function us(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>t.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Si.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa=-1;function Ri(n){return n==null}function si(n){return n===0&&1/n==-1/0}function Oy(n){return typeof n=="number"&&Number.isInteger(n)&&!si(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd="";function xy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=zl(e)),e=$y(n.get(t),e);return zl(e)}function $y(n,e){let t=e;const s=n.length;for(let r=0;r<s;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case Jd:t+="";break;default:t+=i}}return t}function zl(n){return n+Jd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Sn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Xd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t){this.comparator=e,this.root=t||Ie.EMPTY}insert(e,t){return new le(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ie.BLACK,null,null))}remove(e){return new le(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ie.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return t+s.left.size;r<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Nr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Nr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Nr(this.root,e,this.comparator,!0)}}class Nr{constructor(e,t,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?s(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ie{constructor(e,t,s,r,i){this.key=e,this.value=t,this.color=s??Ie.RED,this.left=r??Ie.EMPTY,this.right=i??Ie.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,r,i){return new Ie(e??this.key,t??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,s),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ie.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Ie.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}Ie.EMPTY=null,Ie.RED=!0,Ie.BLACK=!1;Ie.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,s,r,i){return this}insert(e,t,s){return new Ie(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.comparator=e,this.data=new le(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Gl(this.data.getIterator())}getIteratorFrom(e){return new Gl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof ve)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ve(this.comparator);return t.data=e,t}}class Gl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new Ye([])}unionWith(e){let t=new ve(be.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new Ye(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Xn(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Zd("Invalid base64 string: "+i):i}}(e);return new ke(t)}static fromUint8Array(e){const t=function(r){let i="";for(let a=0;a<r.length;++a)i+=String.fromCharCode(r[a]);return i}(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const Fy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zt(n){if(Z(!!n,39018),typeof n=="string"){let e=0;const t=Fy.exec(n);if(Z(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:he(n.seconds),nanos:he(n.nanos)}}function he(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function en(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh="server_timestamp",th="__type__",nh="__previous_value__",sh="__local_write_time__";function Sa(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[th])==null?void 0:s.stringValue)===eh}function Pi(n){const e=n.mapValue.fields[nh];return Sa(e)?Pi(e):e}function Ws(n){const e=Zt(n.mapValue.fields[sh].timestampValue);return new ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class By{constructor(e,t,s,r,i,a,c,u,d,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f,this.apiKey=p}}const ri="(default)";class Gs{constructor(e,t){this.projectId=e,this.database=t||ri}static empty(){return new Gs("","")}get isDefaultDatabase(){return this.database===ri}isEqual(e){return e instanceof Gs&&e.projectId===this.projectId&&e.database===this.database}}function Uy(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Gs(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh="__type__",qy="__max__",Vr={mapValue:{}},ih="__vector__",ii="value";function tn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Sa(n)?4:Hy(n)?9007199254740991:jy(n)?10:11:B(28295,{value:n})}function ft(n,e){if(n===e)return!0;const t=tn(n);if(t!==tn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ws(n).isEqual(Ws(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const a=Zt(r.timestampValue),c=Zt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,i){return en(r.bytesValue).isEqual(en(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,i){return he(r.geoPointValue.latitude)===he(i.geoPointValue.latitude)&&he(r.geoPointValue.longitude)===he(i.geoPointValue.longitude)}(n,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return he(r.integerValue)===he(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const a=he(r.doubleValue),c=he(i.doubleValue);return a===c?si(a)===si(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Xn(n.arrayValue.values||[],e.arrayValue.values||[],ft);case 10:case 11:return function(r,i){const a=r.mapValue.fields||{},c=i.mapValue.fields||{};if(Wl(a)!==Wl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!ft(a[u],c[u])))return!1;return!0}(n,e);default:return B(52216,{left:n})}}function Ks(n,e){return(n.values||[]).find(t=>ft(t,e))!==void 0}function Zn(n,e){if(n===e)return 0;const t=tn(n),s=tn(e);if(t!==s)return K(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=he(i.integerValue||i.doubleValue),u=he(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Kl(n.timestampValue,e.timestampValue);case 4:return Kl(Ws(n),Ws(e));case 5:return Ko(n.stringValue,e.stringValue);case 6:return function(i,a){const c=en(i),u=en(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=K(c[d],u[d]);if(f!==0)return f}return K(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=K(he(i.latitude),he(a.latitude));return c!==0?c:K(he(i.longitude),he(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ql(n.arrayValue,e.arrayValue);case 10:return function(i,a){var w,A,C,N;const c=i.fields||{},u=a.fields||{},d=(w=c[ii])==null?void 0:w.arrayValue,f=(A=u[ii])==null?void 0:A.arrayValue,p=K(((C=d==null?void 0:d.values)==null?void 0:C.length)||0,((N=f==null?void 0:f.values)==null?void 0:N.length)||0);return p!==0?p:Ql(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Vr.mapValue&&a===Vr.mapValue)return 0;if(i===Vr.mapValue)return 1;if(a===Vr.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const w=Ko(u[p],f[p]);if(w!==0)return w;const A=Zn(c[u[p]],d[f[p]]);if(A!==0)return A}return K(u.length,f.length)}(n.mapValue,e.mapValue);default:throw B(23264,{he:t})}}function Kl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=Zt(n),s=Zt(e),r=K(t.seconds,s.seconds);return r!==0?r:K(t.nanos,s.nanos)}function Ql(n,e){const t=n.values||[],s=e.values||[];for(let r=0;r<t.length&&r<s.length;++r){const i=Zn(t[r],s[r]);if(i)return i}return K(t.length,s.length)}function es(n){return Qo(n)}function Qo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const s=Zt(t);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return en(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return x.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let s="[",r=!0;for(const i of t.values||[])r?r=!1:s+=",",s+=Qo(i);return s+"]"}(n.arrayValue):"mapValue"in n?function(t){const s=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const a of s)i?i=!1:r+=",",r+=`${a}:${Qo(t.fields[a])}`;return r+"}"}(n.mapValue):B(61005,{value:n})}function qr(n){switch(tn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Pi(n);return e?16+qr(e):16;case 5:return 2*n.stringValue.length;case 6:return en(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((r,i)=>r+qr(i),0)}(n.arrayValue);case 10:case 11:return function(s){let r=0;return Sn(s.fields,(i,a)=>{r+=i.length+qr(a)}),r}(n.mapValue);default:throw B(13486,{value:n})}}function Yo(n){return!!n&&"integerValue"in n}function Ra(n){return!!n&&"arrayValue"in n}function Yl(n){return!!n&&"nullValue"in n}function Jl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function jr(n){return!!n&&"mapValue"in n}function jy(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[rh])==null?void 0:s.stringValue)===ih}function Fs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Sn(n.mapValue.fields,(t,s)=>e.mapValue.fields[t]=Fs(s)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Fs(n.arrayValue.values[t]);return e}return{...n}}function Hy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===qy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.value=e}static empty(){return new We({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!jr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fs(t)}setAll(e){let t=be.emptyPath(),s={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,s,r),s={},r=[],t=c.popLast()}a?s[c.lastSegment()]=Fs(a):r.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,s,r)}delete(e){const t=this.field(e.popLast());jr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ft(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=t.mapValue.fields[e.get(s)];jr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,s){Sn(t,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new We(Fs(this.value))}}function oh(n){const e=[];return Sn(n.fields,(t,s)=>{const r=new be([t]);if(jr(s)){const i=oh(s.mapValue).fields;if(i.length===0)e.push(r);else for(const a of i)e.push(r.child(a))}else e.push(r)}),new Ye(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,t,s,r,i,a,c){this.key=e,this.documentType=t,this.version=s,this.readTime=r,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ce(e,0,U.min(),U.min(),U.min(),We.empty(),0)}static newFoundDocument(e,t,s,r){return new Ce(e,1,t,U.min(),s,r,0)}static newNoDocument(e,t){return new Ce(e,2,t,U.min(),U.min(),We.empty(),0)}static newUnknownDocument(e,t){return new Ce(e,3,t,U.min(),U.min(),We.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=We.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=We.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ce(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e,t){this.position=e,this.inclusive=t}}function Xl(n,e,t){let s=0;for(let r=0;r<n.position.length;r++){const i=e[r],a=n.position[r];if(i.field.isKeyField()?s=x.comparator(x.fromName(a.referenceValue),t.key):s=Zn(a,t.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function Zl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ft(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t="asc"){this.field=e,this.dir=t}}function zy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{}class _e extends ah{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new Gy(e,t,s):t==="array-contains"?new Yy(e,s):t==="in"?new Jy(e,s):t==="not-in"?new Xy(e,s):t==="array-contains-any"?new Zy(e,s):new _e(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new Ky(e,s):new Qy(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Zn(t,this.value)):t!==null&&tn(this.value)===tn(t)&&this.matchesComparison(Zn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class mt extends ah{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new mt(e,t)}matches(e){return ch(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ch(n){return n.op==="and"}function lh(n){return Wy(n)&&ch(n)}function Wy(n){for(const e of n.filters)if(e instanceof mt)return!1;return!0}function Jo(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+es(n.value);if(lh(n))return n.filters.map(e=>Jo(e)).join(",");{const e=n.filters.map(t=>Jo(t)).join(",");return`${n.op}(${e})`}}function uh(n,e){return n instanceof _e?function(s,r){return r instanceof _e&&s.op===r.op&&s.field.isEqual(r.field)&&ft(s.value,r.value)}(n,e):n instanceof mt?function(s,r){return r instanceof mt&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,a,c)=>i&&uh(a,r.filters[c]),!0):!1}(n,e):void B(19439)}function dh(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${es(t.value)}`}(n):n instanceof mt?function(t){return t.op.toString()+" {"+t.getFilters().map(dh).join(" ,")+"}"}(n):"Filter"}class Gy extends _e{constructor(e,t,s){super(e,t,s),this.key=x.fromName(s.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ky extends _e{constructor(e,t){super(e,"in",t),this.keys=hh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Qy extends _e{constructor(e,t){super(e,"not-in",t),this.keys=hh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function hh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(s=>x.fromName(s.referenceValue))}class Yy extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ra(t)&&Ks(t.arrayValue,this.value)}}class Jy extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ks(this.value.arrayValue,t)}}class Xy extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ks(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ks(this.value.arrayValue,t)}}class Zy extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ra(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>Ks(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t=null,s=[],r=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function eu(n,e=null,t=[],s=[],r=null,i=null,a=null){return new e_(n,e,t,s,r,i,a)}function Pa(n){const e=q(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>Jo(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),Ri(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>es(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>es(s)).join(",")),e.Te=t}return e.Te}function Ca(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!zy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!uh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zl(n.startAt,e.startAt)&&Zl(n.endAt,e.endAt)}function Xo(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,t=null,s=[],r=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function t_(n,e,t,s,r,i,a,c){return new Ci(n,e,t,s,r,i,a,c)}function Di(n){return new Ci(n)}function tu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function n_(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function s_(n){return n.collectionGroup!==null}function Bs(n){const e=q(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ve(be.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new ai(i,s))}),t.has(be.keyField().canonicalString())||e.Ee.push(new ai(be.keyField(),s))}return e.Ee}function at(n){const e=q(n);return e.Ie||(e.Ie=r_(e,Bs(n))),e.Ie}function r_(n,e){if(n.limitType==="F")return eu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new ai(r.field,i)});const t=n.endAt?new oi(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new oi(n.startAt.position,n.startAt.inclusive):null;return eu(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function Zo(n,e,t){return new Ci(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Li(n,e){return Ca(at(n),at(e))&&n.limitType===e.limitType}function fh(n){return`${Pa(at(n))}|lt:${n.limitType}`}function $n(n){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(r=>dh(r)).join(", ")}]`),Ri(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(r=>es(r)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(r=>es(r)).join(",")),`Target(${s})`}(at(n))}; limitType=${n.limitType})`}function Ni(n,e){return e.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):x.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(n,e)&&function(s,r){for(const i of Bs(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,e)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(n,e)&&function(s,r){return!(s.startAt&&!function(a,c,u){const d=Xl(a,c,u);return a.inclusive?d<=0:d<0}(s.startAt,Bs(s),r)||s.endAt&&!function(a,c,u){const d=Xl(a,c,u);return a.inclusive?d>=0:d>0}(s.endAt,Bs(s),r))}(n,e)}function i_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function mh(n){return(e,t)=>{let s=!1;for(const r of Bs(n)){const i=o_(r,e,t);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function o_(n,e,t){const s=n.field.isKeyField()?x.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Zn(u,d):B(42886)}(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[t]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Sn(this.inner,(t,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return Xd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_=new le(x.comparator);function Rt(){return a_}const ph=new le(x.comparator);function Vs(...n){let e=ph;for(const t of n)e=e.insert(t.key,t);return e}function gh(n){let e=ph;return n.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function fn(){return Us()}function yh(){return Us()}function Us(){return new Rn(n=>n.toString(),(n,e)=>n.isEqual(e))}const c_=new le(x.comparator),l_=new ve(x.comparator);function Q(...n){let e=l_;for(const t of n)e=e.add(t);return e}const u_=new ve(K);function d_(){return u_}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Da(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:si(e)?"-0":e}}function _h(n){return{integerValue:""+n}}function h_(n,e){return Oy(e)?_h(e):Da(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(){this._=void 0}}function f_(n,e,t){return n instanceof ci?function(r,i){const a={fields:{[th]:{stringValue:eh},[sh]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Sa(i)&&(i=Pi(i)),i&&(a.fields[nh]=i),{mapValue:a}}(t,e):n instanceof Qs?vh(n,e):n instanceof Ys?wh(n,e):function(r,i){const a=Eh(r,i),c=nu(a)+nu(r.Ae);return Yo(a)&&Yo(r.Ae)?_h(c):Da(r.serializer,c)}(n,e)}function m_(n,e,t){return n instanceof Qs?vh(n,e):n instanceof Ys?wh(n,e):t}function Eh(n,e){return n instanceof li?function(s){return Yo(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class ci extends Vi{}class Qs extends Vi{constructor(e){super(),this.elements=e}}function vh(n,e){const t=Th(e);for(const s of n.elements)t.some(r=>ft(r,s))||t.push(s);return{arrayValue:{values:t}}}class Ys extends Vi{constructor(e){super(),this.elements=e}}function wh(n,e){let t=Th(e);for(const s of n.elements)t=t.filter(r=>!ft(r,s));return{arrayValue:{values:t}}}class li extends Vi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function nu(n){return he(n.integerValue||n.doubleValue)}function Th(n){return Ra(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function p_(n,e){return n.field.isEqual(e.field)&&function(s,r){return s instanceof Qs&&r instanceof Qs||s instanceof Ys&&r instanceof Ys?Xn(s.elements,r.elements,ft):s instanceof li&&r instanceof li?ft(s.Ae,r.Ae):s instanceof ci&&r instanceof ci}(n.transform,e.transform)}class g_{constructor(e,t){this.version=e,this.transformResults=t}}class Tt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Tt}static exists(e){return new Tt(void 0,e)}static updateTime(e){return new Tt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Hr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Mi{}function Ih(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new kh(n.key,Tt.none()):new or(n.key,n.data,Tt.none());{const t=n.data,s=We.empty();let r=new ve(be.comparator);for(let i of e.fields)if(!r.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?s.delete(i):s.set(i,a),r=r.add(i)}return new Pn(n.key,s,new Ye(r.toArray()),Tt.none())}}function y_(n,e,t){n instanceof or?function(r,i,a){const c=r.value.clone(),u=ru(r.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Pn?function(r,i,a){if(!Hr(r.precondition,i))return void i.convertToUnknownDocument(a.version);const c=ru(r.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(bh(r)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(r,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function qs(n,e,t,s){return n instanceof or?function(i,a,c,u){if(!Hr(i.precondition,a))return c;const d=i.value.clone(),f=iu(i.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,s):n instanceof Pn?function(i,a,c,u){if(!Hr(i.precondition,a))return c;const d=iu(i.fieldTransforms,u,a),f=a.data;return f.setAll(bh(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,s):function(i,a,c){return Hr(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function __(n,e){let t=null;for(const s of n.fieldTransforms){const r=e.data.field(s.field),i=Eh(s.transform,r||null);i!=null&&(t===null&&(t=We.empty()),t.set(s.field,i))}return t||null}function su(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&Xn(s,r,(i,a)=>p_(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class or extends Mi{constructor(e,t,s,r=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Pn extends Mi{constructor(e,t,s,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function bh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}}),e}function ru(n,e,t){const s=new Map;Z(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let r=0;r<t.length;r++){const i=n[r],a=i.transform,c=e.data.field(i.field);s.set(i.field,m_(a,c,t[r]))}return s}function iu(n,e,t){const s=new Map;for(const r of n){const i=r.transform,a=t.data.field(r.field);s.set(r.field,f_(i,a,e))}return s}class kh extends Mi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class E_ extends Mi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(e,t,s,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&y_(i,e,s[r])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=qs(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=qs(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=yh();return this.mutations.forEach(r=>{const i=e.get(r.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(r.key)?null:c;const u=Ih(a,c);u!==null&&s.set(r.key,u),a.isValidDocument()||a.convertToNoDocument(U.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Q())}isEqual(e){return this.batchId===e.batchId&&Xn(this.mutations,e.mutations,(t,s)=>su(t,s))&&Xn(this.baseMutations,e.baseMutations,(t,s)=>su(t,s))}}class La{constructor(e,t,s,r){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=r}static from(e,t,s){Z(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let r=function(){return c_}();const i=e.mutations;for(let a=0;a<i.length;a++)r=r.insert(i[a].key,s[a].version);return new La(e,t,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pe,Y;function I_(n){switch(n){case P.OK:return B(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Ah(n){if(n===void 0)return St("GRPC error has no .code"),P.UNKNOWN;switch(n){case pe.OK:return P.OK;case pe.CANCELLED:return P.CANCELLED;case pe.UNKNOWN:return P.UNKNOWN;case pe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case pe.INTERNAL:return P.INTERNAL;case pe.UNAVAILABLE:return P.UNAVAILABLE;case pe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case pe.NOT_FOUND:return P.NOT_FOUND;case pe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case pe.ABORTED:return P.ABORTED;case pe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case pe.DATA_LOSS:return P.DATA_LOSS;default:return B(39323,{code:n})}}(Y=pe||(pe={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_=new Gt([4294967295,4294967295],0);function ou(n){const e=b_().encode(n),t=new qd;return t.update(e),new Uint8Array(t.digest())}function au(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Gt([t,s],0),new Gt([r,i],0)]}class Na{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new Ms(`Invalid padding: ${t}`);if(s<0)throw new Ms(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Ms(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new Ms(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Gt.fromNumber(this.ge)}ye(e,t,s){let r=e.add(t.multiply(Gt.fromNumber(s)));return r.compare(k_)===1&&(r=new Gt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=ou(e),[s,r]=au(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(s,r,i);if(!this.we(a))return!1}return!0}static create(e,t,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Na(i,r,t);return s.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=ou(e),[s,r]=au(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(s,r,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class Ms extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,t,s,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const r=new Map;return r.set(e,ar.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new Oi(U.min(),r,new le(K),Rt(),Q())}}class ar{constructor(e,t,s,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new ar(s,t,Q(),Q(),Q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,t,s,r){this.be=e,this.removedTargetIds=t,this.key=s,this.De=r}}class Sh{constructor(e,t){this.targetId=e,this.Ce=t}}class Rh{constructor(e,t,s=ke.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=r}}class cu{constructor(){this.ve=0,this.Fe=lu(),this.Me=ke.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Q(),t=Q(),s=Q();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:s=s.add(r);break;default:B(38017,{changeType:i})}}),new ar(this.Me,this.xe,e,t,s)}qe(){this.Oe=!1,this.Fe=lu()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Z(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class A_{constructor(e){this.Ge=e,this.ze=new Map,this.je=Rt(),this.Je=Mr(),this.He=Mr(),this.Ze=new le(K)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const s=this.nt(t);switch(e.state){case 0:this.rt(t)&&s.Le(e.resumeToken);break;case 1:s.We(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(s.Qe(),s.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),s.Le(e.resumeToken));break;default:B(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((s,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,s=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Xo(i))if(s===0){const a=new x(i.path);this.et(t,a,Ce.newNoDocument(a,U.min()))}else Z(s===1,20013,{expectedCount:s});else{const a=this._t(t);if(a!==s){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=t;let a,c;try{a=en(s).toUint8Array()}catch(u){if(u instanceof Zd)return En("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Na(a,r,i)}catch(u){return En(u instanceof Ms?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,s){return t.Ce.count===s-this.Pt(e,t.targetId)?0:2}Pt(e,t){const s=this.Ge.getRemoteKeysForTarget(t);let r=0;return s.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Xo(c.target)){const u=new x(c.target.path);this.Et(u).has(a)||this.It(a,u)||this.et(a,u,Ce.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let s=Q();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(s=s.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const r=new Oi(e,t,this.Ze,this.je,s);return this.je=Rt(),this.Je=Mr(),this.He=Mr(),this.Ze=new le(K),r}Ye(e,t){if(!this.rt(e))return;const s=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,s){if(!this.rt(e))return;const r=this.nt(e);this.It(e,t)?r.Ke(t,1):r.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),s&&(this.je=this.je.insert(t,s))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new cu,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ve(K),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ve(K),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new cu),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Mr(){return new le(x.comparator)}function lu(){return new le(x.comparator)}const S_={asc:"ASCENDING",desc:"DESCENDING"},R_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},P_={and:"AND",or:"OR"};class C_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ea(n,e){return n.useProto3Json||Ri(e)?e:{value:e}}function ui(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ph(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function D_(n,e){return ui(n,e.toTimestamp())}function ct(n){return Z(!!n,49232),U.fromTimestamp(function(t){const s=Zt(t);return new ie(s.seconds,s.nanos)}(n))}function Va(n,e){return ta(n,e).canonicalString()}function ta(n,e){const t=function(r){return new ae(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ch(n){const e=ae.fromString(n);return Z(Mh(e),10190,{key:e.toString()}),e}function na(n,e){return Va(n.databaseId,e.path)}function Ro(n,e){const t=Ch(e);if(t.get(1)!==n.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(Lh(t))}function Dh(n,e){return Va(n.databaseId,e)}function L_(n){const e=Ch(n);return e.length===4?ae.emptyPath():Lh(e)}function sa(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Lh(n){return Z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function uu(n,e,t){return{name:na(n,e),fields:t.value.mapValue.fields}}function N_(n,e){let t;if("targetChange"in e){e.targetChange;const s=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:B(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(Z(f===void 0||typeof f=="string",58123),ke.fromBase64String(f||"")):(Z(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ke.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const f=d.code===void 0?P.UNKNOWN:Ah(d.code);return new O(f,d.message||"")}(a);t=new Rh(s,r,i,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Ro(n,s.document.name),i=ct(s.document.updateTime),a=s.document.createTime?ct(s.document.createTime):U.min(),c=new We({mapValue:{fields:s.document.fields}}),u=Ce.newFoundDocument(r,i,a,c),d=s.targetIds||[],f=s.removedTargetIds||[];t=new zr(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Ro(n,s.document),i=s.readTime?ct(s.readTime):U.min(),a=Ce.newNoDocument(r,i),c=s.removedTargetIds||[];t=new zr([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Ro(n,s.document),i=s.removedTargetIds||[];t=new zr([],i,r,null)}else{if(!("filter"in e))return B(11601,{Vt:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,a=new T_(r,i),c=s.targetId;t=new Sh(c,a)}}return t}function V_(n,e){let t;if(e instanceof or)t={update:uu(n,e.key,e.value)};else if(e instanceof kh)t={delete:na(n,e.key)};else if(e instanceof Pn)t={update:uu(n,e.key,e.data),updateMask:j_(e.fieldMask)};else{if(!(e instanceof E_))return B(16599,{dt:e.type});t={verify:na(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(i,a){const c=a.transform;if(c instanceof ci)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Qs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Ys)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof li)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw B(20930,{transform:a.transform})}(0,s))),e.precondition.isNone||(t.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:D_(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)}(n,e.precondition)),t}function M_(n,e){return n&&n.length>0?(Z(e!==void 0,14353),n.map(t=>function(r,i){let a=r.updateTime?ct(r.updateTime):ct(i);return a.isEqual(U.min())&&(a=ct(i)),new g_(a,r.transformResults||[])}(t,e))):[]}function O_(n,e){return{documents:[Dh(n,e.path)]}}function x_(n,e){const t={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=Dh(n,r);const i=function(d){if(d.length!==0)return Vh(mt.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(w){return{field:Fn(w.field),direction:B_(w.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ea(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function $_(n){let e=L_(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let r=null;if(s>0){Z(s===1,65062);const f=t.from[0];f.allDescendants?r=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const w=Nh(p);return w instanceof mt&&lh(w)?w.getFilters():[w]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(w=>function(C){return new ai(Bn(C.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(p){let w;return w=typeof p=="object"?p.value:p,Ri(w)?null:w}(t.limit));let u=null;t.startAt&&(u=function(p){const w=!!p.before,A=p.values||[];return new oi(A,w)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const w=!p.before,A=p.values||[];return new oi(A,w)}(t.endAt)),t_(e,r,a,i,c,"F",u,d)}function F_(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Nh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=Bn(t.unaryFilter.field);return _e.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=Bn(t.unaryFilter.field);return _e.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Bn(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Bn(t.unaryFilter.field);return _e.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Bn(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return mt.create(t.compositeFilter.filters.map(s=>Nh(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(t.compositeFilter.op))}(n):B(30097,{filter:n})}function B_(n){return S_[n]}function U_(n){return R_[n]}function q_(n){return P_[n]}function Fn(n){return{fieldPath:n.canonicalString()}}function Bn(n){return be.fromServerFormat(n.fieldPath)}function Vh(n){return n instanceof _e?function(t){if(t.op==="=="){if(Jl(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NAN"}};if(Yl(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Jl(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NOT_NAN"}};if(Yl(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Fn(t.field),op:U_(t.op),value:t.value}}}(n):n instanceof mt?function(t){const s=t.getFilters().map(r=>Vh(r));return s.length===1?s[0]:{compositeFilter:{op:q_(t.op),filters:s}}}(n):B(54877,{filter:n})}function j_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Mh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Oh(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t,s,r,i=U.min(),a=U.min(),c=ke.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Ht(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(e){this.yt=e}}function z_(n){const e=$_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Zo(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(){this.bn=new G_}addToCollectionParentIndex(e,t){return this.bn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(Xt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(Xt.min())}updateCollectionGroup(e,t,s){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class G_{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t]||new ve(ae.comparator),i=!r.has(s);return this.index[t]=r.add(s),i}has(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t];return r&&r.has(s)}getEntries(e){return(this.index[e]||new ve(ae.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},xh=41943040;class Oe{static withCacheSize(e){return new Oe(e,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe.DEFAULT_COLLECTION_PERCENTILE=10,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Oe.DEFAULT=new Oe(xh,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Oe.DISABLED=new Oe(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new ts(0)}static ar(){return new ts(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu="LruGarbageCollector",K_=1048576;function fu([n,e],[t,s]){const r=K(n,t);return r===0?K(e,s):r}class Q_{constructor(e){this.Pr=e,this.buffer=new ve(fu),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();fu(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Y_{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){V(hu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){us(t)?V(hu,"Ignoring IndexedDB error during garbage collection: ",t):await ls(t)}await this.Ar(3e5)})}}class J_{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(s=>Math.floor(t/100*s))}nthSequenceNumber(e,t){if(t===0)return R.resolve(Si.ce);const s=new Q_(t);return this.Vr.forEachTarget(e,r=>s.Ir(r.sequenceNumber)).next(()=>this.Vr.mr(e,r=>s.Ir(r))).next(()=>s.maxValue)}removeTargets(e,t,s){return this.Vr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(du)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),du):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let s,r,i,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),r=this.params.maximumSequenceNumbersToCollect):r=p,a=Date.now(),this.nthSequenceNumber(e,r))).next(p=>(s=p,c=Date.now(),this.removeTargets(e,s,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,s))).next(p=>(d=Date.now(),xn()<=G.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${r} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:p})))}}function X_(n,e){return new J_(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(){this.changes=new Rn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?R.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e,t,s,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(s!==null&&qs(s.mutation,r,Ye.empty(),ie.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,Q()).next(()=>s))}getLocalViewOfDocuments(e,t,s=Q()){const r=fn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,s).next(i=>{let a=Vs();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const s=fn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,Q()))}populateOverlays(e,t,s){const r=[];return s.forEach(i=>{t.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,s,r){let i=Rt();const a=Us(),c=function(){return Us()}();return t.forEach((u,d)=>{const f=s.get(d.key);r.has(d.key)&&(f===void 0||f.mutation instanceof Pn)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),qs(f.mutation,d,f.mutation.getFieldMask(),ie.now())):a.set(d.key,Ye.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>c.set(d,new eE(f,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const s=Us();let r=new le((a,c)=>a-c),i=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=s.get(u)||Ye.empty();f=c.applyToLocalView(d,f),s.set(u,f);const p=(r.get(c.batchId)||Q()).add(u);r=r.insert(c.batchId,p)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=yh();f.forEach(w=>{if(!i.has(w)){const A=Ih(t.get(w),s.get(w));A!==null&&p.set(w,A),i=i.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return R.waitFor(a)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,r){return n_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):s_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,r):this.getDocumentsMatchingCollectionQuery(e,t,s,r)}getNextDocuments(e,t,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,r).next(i=>{const a=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,r-i.size):R.resolve(fn());let c=zs,u=i;return a.next(d=>R.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?R.resolve():this.remoteDocumentCache.getEntry(e,f).next(w=>{u=u.insert(f,w)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,Q())).next(f=>({batchId:c,changes:gh(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next(s=>{let r=Vs();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,s,r){const i=t.collectionGroup;let a=Vs();return this.indexManager.getCollectionParents(e,i).next(c=>R.forEach(c,u=>{const d=function(p,w){return new Ci(w,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,s,r).next(f=>{f.forEach((p,w)=>{a=a.insert(p,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,i,r))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Ce.newInvalidDocument(f)))});let c=Vs();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&qs(f.mutation,d,Ye.empty(),ie.now()),Ni(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return R.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:ct(r.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(r){return{name:r.name,query:z_(r.bundledQuery),readTime:ct(r.readTime)}}(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(){this.overlays=new le(x.comparator),this.Lr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const s=fn();return R.forEach(t,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((r,i)=>{this.St(e,t,i)}),R.resolve()}removeOverlaysForBatchId(e,t,s){const r=this.Lr.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(s)),R.resolve()}getOverlaysForCollection(e,t,s){const r=fn(),i=t.length+1,a=new x(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>s&&r.set(u.getKey(),u)}return R.resolve(r)}getOverlaysForCollectionGroup(e,t,s,r){let i=new le((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>s){let f=i.get(d.largestBatchId);f===null&&(f=fn(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=fn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=r)););return R.resolve(c)}St(e,t,s){const r=this.overlays.get(s.key);if(r!==null){const a=this.Lr.get(r.largestBatchId).delete(s.key);this.Lr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(s.key,new w_(t,s));let i=this.Lr.get(t);i===void 0&&(i=Q(),this.Lr.set(t,i)),this.Lr.set(t,i.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(){this.kr=new ve(Te.qr),this.Kr=new ve(Te.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const s=new Te(e,t);this.kr=this.kr.add(s),this.Kr=this.Kr.add(s)}$r(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Wr(new Te(e,t))}Qr(e,t){e.forEach(s=>this.removeReference(s,t))}Gr(e){const t=new x(new ae([])),s=new Te(t,e),r=new Te(t,e+1),i=[];return this.Kr.forEachInRange([s,r],a=>{this.Wr(a),i.push(a.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new x(new ae([])),s=new Te(t,e),r=new Te(t,e+1);let i=Q();return this.Kr.forEachInRange([s,r],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Te(e,0),s=this.kr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Te{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return x.comparator(e.key,t.key)||K(e.Jr,t.Jr)}static Ur(e,t){return K(e.Jr,t.Jr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ve(Te.qr)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,r){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new v_(i,t,s,r);this.mutationQueue.push(a);for(const c of r)this.Hr=this.Hr.add(new Te(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(a)}lookupMutationBatch(e,t){return R.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,r=this.Xr(s),i=r<0?0:r;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Aa:this.Yn-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Te(t,0),r=new Te(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([s,r],a=>{const c=this.Zr(a.Jr);i.push(c)}),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new ve(K);return t.forEach(r=>{const i=new Te(r,0),a=new Te(r,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,a],c=>{s=s.add(c.Jr)})}),R.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,r=s.length+1;let i=s;x.isDocumentKey(i)||(i=i.child(""));const a=new Te(new x(i),0);let c=new ve(K);return this.Hr.forEachWhile(u=>{const d=u.key.path;return!!s.isPrefixOf(d)&&(d.length===r&&(c=c.add(u.Jr)),!0)},a),R.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(s=>{const r=this.Zr(s);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){Z(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Hr;return R.forEach(t.mutations,r=>{const i=new Te(r.key,t.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Hr=s})}nr(e){}containsKey(e,t){const s=new Te(t,0),r=this.Hr.firstAfterOrEqual(s);return R.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e){this.ti=e,this.docs=function(){return new le(x.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,r=this.docs.get(s),i=r?r.size:0,a=this.ti(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return R.resolve(s?s.document.mutableCopy():Ce.newInvalidDocument(t))}getEntries(e,t){let s=Rt();return t.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():Ce.newInvalidDocument(r))}),R.resolve(s)}getDocumentsMatchingQuery(e,t,s,r){let i=Rt();const a=t.path,c=new x(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Ly(Dy(f),s)<=0||(r.has(f.key)||Ni(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(e,t,s,r){B(9500)}ni(e,t){return R.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new aE(this)}getSize(e){return R.resolve(this.size)}}class aE extends Z_{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(s)}),R.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(e){this.persistence=e,this.ri=new Rn(t=>Pa(t),Ca),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ii=0,this.si=new Ma,this.targetCount=0,this.oi=ts._r()}forEachTarget(e,t){return this.ri.forEach((s,r)=>t(r)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.ii&&(this.ii=t),R.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new ts(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.lr(t),R.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,s){let r=0;const i=[];return this.ri.forEach((a,c)=>{c.sequenceNumber<=t&&s.get(c.targetId)===null&&(this.ri.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),R.waitFor(i).next(()=>r)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const s=this.ri.get(t)||null;return R.resolve(s)}addMatchingKeys(e,t,s){return this.si.$r(t,s),R.resolve()}removeMatchingKeys(e,t,s){this.si.Qr(t,s);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(a=>{i.push(r.markPotentiallyOrphaned(e,a))}),R.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const s=this.si.jr(t);return R.resolve(s)}containsKey(e,t){return R.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(e,t){this._i={},this.overlays={},this.ai=new Si(0),this.ui=!1,this.ui=!0,this.ci=new rE,this.referenceDelegate=e(this),this.li=new cE(this),this.indexManager=new W_,this.remoteDocumentCache=function(r){return new oE(r)}(s=>this.referenceDelegate.hi(s)),this.serializer=new H_(t),this.Pi=new nE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this._i[e.toKey()];return s||(s=new iE(t,this.referenceDelegate),this._i[e.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,s){V("MemoryPersistence","Starting transaction:",e);const r=new lE(this.ai.next());return this.referenceDelegate.Ti(),s(r).next(i=>this.referenceDelegate.Ei(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ii(e,t){return R.or(Object.values(this._i).map(s=>()=>s.containsKey(e,t)))}}class lE extends Vy{constructor(e){super(),this.currentSequenceNumber=e}}class Oa{constructor(e){this.persistence=e,this.Ri=new Ma,this.Ai=null}static Vi(e){return new Oa(e)}get di(){if(this.Ai)return this.Ai;throw B(60996)}addReference(e,t,s){return this.Ri.addReference(s,t),this.di.delete(s.toString()),R.resolve()}removeReference(e,t,s){return this.Ri.removeReference(s,t),this.di.add(s.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),R.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(r=>this.di.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(i=>this.di.add(i.toString()))}).next(()=>s.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.di,s=>{const r=x.fromPath(s);return this.mi(e,r).next(i=>{i||t.removeEntry(r,U.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(s=>{s?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return R.or([()=>R.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class di{constructor(e,t){this.persistence=e,this.fi=new Rn(s=>xy(s.path),(s,r)=>s.isEqual(r)),this.garbageCollector=X_(this,t)}static Vi(e,t){return new di(e,t)}Ti(){}Ei(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>t.next(r=>s+r))}pr(e){let t=0;return this.mr(e,s=>{t++}).next(()=>t)}mr(e,t){return R.forEach(this.fi,(s,r)=>this.wr(e,s,r).next(i=>i?R.resolve():t(r)))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ni(e,a=>this.wr(e,a,t).next(c=>{c||(s++,i.removeEntry(a,U.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.fi.set(s,e.currentSequenceNumber),R.resolve()}removeReference(e,t,s){return this.fi.set(s,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),R.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=qr(e.data.value)),t}wr(e,t,s){return R.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.fi.get(t);return R.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,t,s,r){this.targetId=e,this.fromCache=t,this.Ts=s,this.Es=r}static Is(e,t){let s=Q(),r=Q();for(const i of t.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new xa(e,t.fromCache,s,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Jp()?8:My(De())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,s,r){const i={result:null};return this.gs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ps(e,t,r,s).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new uE;return this.ys(e,t,a).next(c=>{if(i.result=c,this.As)return this.ws(e,t,a,c.size)})}).next(()=>i.result)}ws(e,t,s,r){return s.documentReadCount<this.Vs?(xn()<=G.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",$n(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),R.resolve()):(xn()<=G.DEBUG&&V("QueryEngine","Query:",$n(t),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.ds*r?(xn()<=G.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",$n(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):R.resolve())}gs(e,t){if(tu(t))return R.resolve(null);let s=at(t);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=Zo(t,null,"F"),s=at(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const a=Q(...i);return this.fs.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,s).next(u=>{const d=this.Ss(t,c);return this.bs(t,d,a,u.readTime)?this.gs(e,Zo(t,null,"F")):this.Ds(e,d,t,u)}))})))}ps(e,t,s,r){return tu(t)||r.isEqual(U.min())?R.resolve(null):this.fs.getDocuments(e,s).next(i=>{const a=this.Ss(t,i);return this.bs(t,a,s,r)?R.resolve(null):(xn()<=G.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),$n(t)),this.Ds(e,a,t,Cy(r,zs)).next(c=>c))})}Ss(e,t){let s=new ve(mh(e));return t.forEach((r,i)=>{Ni(e,i)&&(s=s.add(i))}),s}bs(e,t,s,r){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ys(e,t,s){return xn()<=G.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",$n(t)),this.fs.getDocumentsMatchingQuery(e,t,Xt.min(),s)}Ds(e,t,s,r){return this.fs.getDocumentsMatchingQuery(e,s,r).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="LocalStore",hE=3e8;class fE{constructor(e,t,s,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new le(K),this.Fs=new Rn(i=>Pa(i),Ca),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(s)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new tE(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function mE(n,e,t,s){return new fE(n,e,t,s)}async function Fh(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let r;return t.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,t.Os(e),t.mutationQueue.getAllMutationBatches(s))).next(i=>{const a=[],c=[];let u=Q();for(const d of r){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(s,u).next(d=>({Ns:d,removedBatchIds:a,addedBatchIds:c}))})})}function pE(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,w=p.keys();let A=R.resolve();return w.forEach(C=>{A=A.next(()=>f.getEntry(u,C)).next(N=>{const L=d.docVersions.get(C);Z(L!==null,48541),N.version.compareTo(L)<0&&(p.applyToRemoteDocument(N,d),N.isValidDocument()&&(N.setReadTime(d.commitVersion),f.addEntry(N)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,s,e,i).next(()=>i.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(c){let u=Q();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(s,r))})}function Bh(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function gE(n,e){const t=q(n),s=e.snapshotVersion;let r=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.xs.newChangeBuffer({trackRemovals:!0});r=t.vs;const c=[];e.targetChanges.forEach((f,p)=>{const w=r.get(p);if(!w)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.li.addMatchingKeys(i,f.addedDocuments,p)));let A=w.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(ke.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,s)),r=r.insert(p,A),function(N,L,j){return N.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=hE?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(w,A,f)&&c.push(t.li.updateTargetData(i,A))});let u=Rt(),d=Q();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(yE(i,a,e.documentUpdates).next(f=>{u=f.Bs,d=f.Ls})),!s.isEqual(U.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next(p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,s));c.push(f)}return R.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.vs=r,i))}function yE(n,e,t){let s=Q(),r=Q();return t.forEach(i=>s=s.add(i)),e.getEntries(n,s).next(i=>{let a=Rt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):V($a,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Bs:a,Ls:r}})}function _E(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=Aa),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function EE(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return t.li.getTargetData(s,e).next(i=>i?(r=i,R.resolve(r)):t.li.allocateTargetId(s).next(a=>(r=new Ht(e,a,"TargetPurposeListen",s.currentSequenceNumber),t.li.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=t.vs.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.vs=t.vs.insert(s.targetId,s),t.Fs.set(e,s.targetId)),s})}async function ra(n,e,t){const s=q(n),r=s.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",i,a=>s.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!us(a))throw a;V($a,`Failed to update sequence numbers for target ${e}: ${a}`)}s.vs=s.vs.remove(e),s.Fs.delete(r.target)}function mu(n,e,t){const s=q(n);let r=U.min(),i=Q();return s.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=q(u),w=p.Fs.get(f);return w!==void 0?R.resolve(p.vs.get(w)):p.li.getTargetData(d,f)}(s,a,at(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>s.Cs.getDocumentsMatchingQuery(a,e,t?r:U.min(),t?i:Q())).next(c=>(vE(s,i_(e),c),{documents:c,ks:i})))}function vE(n,e,t){let s=n.Ms.get(e)||U.min();t.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),n.Ms.set(e,s)}class pu{constructor(){this.activeTargetIds=d_()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class wE{constructor(){this.vo=new pu,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,s){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new pu,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="ConnectivityMonitor";class yu{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(gu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){V(gu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Or=null;function ia(){return Or===null?Or=function(){return 268435456+Math.round(2147483648*Math.random())}():Or++,"0x"+Or.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po="RestConnection",IE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class bE{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${s}/databases/${r}`,this.$o=this.databaseId.database===ri?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Wo(e,t,s,r,i){const a=ia(),c=this.Qo(e,t.toUriEncodedString());V(Po,`Sending RPC '${e}' ${a}:`,c,s);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,r,i);const{host:d}=new URL(c),f=rr(d);return this.zo(e,c,u,s,f).then(p=>(V(Po,`Received RPC '${e}' ${a}: `,p),p),p=>{throw En(Po,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",s),p})}jo(e,t,s,r,i,a){return this.Wo(e,t,s,r,i)}Go(e,t,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}Qo(e,t){const s=IE[e];let r=`${this.Ko}/v1/${t}:${s}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection",Rs=(n,e,t)=>{n.listen(e,s=>{try{t(s)}catch(r){setTimeout(()=>{throw r},0)}})};class Hn extends bE{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Hn.c_){const e=Wd();Rs(e,zd.STAT_EVENT,t=>{t.stat===Go.PROXY?V(Se,"STAT_EVENT: detected buffering proxy"):t.stat===Go.NOPROXY&&V(Se,"STAT_EVENT: detected no buffering proxy")}),Hn.c_=!0}}zo(e,t,s,r,i){const a=ia();return new Promise((c,u)=>{const d=new jd;d.setWithCredentials(!0),d.listenOnce(Hd.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Ur.NO_ERROR:const p=d.getResponseJson();V(Se,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case Ur.TIMEOUT:V(Se,`RPC '${e}' ${a} timed out`),u(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case Ur.HTTP_ERROR:const w=d.getStatus();if(V(Se,`RPC '${e}' ${a} failed with status:`,w,"response text:",d.getResponseText()),w>0){let A=d.getResponseJson();Array.isArray(A)&&(A=A[0]);const C=A==null?void 0:A.error;if(C&&C.status&&C.message){const N=function(j){const M=j.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(M)>=0?M:P.UNKNOWN}(C.status);u(new O(N,C.message))}else u(new O(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new O(P.UNAVAILABLE,"Connection failed."));break;default:B(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{V(Se,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(r);V(Se,`RPC '${e}' ${a} sending request:`,r),d.send(t,"POST",f,s,15)})}T_(e,t,s){const r=ia(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,s),c.encodeInitMessageHeaders=!0;const d=i.join("");V(Se,`Creating RPC '${e}' stream ${r}: ${d}`,c);const f=a.createWebChannel(d,c);this.E_(f);let p=!1,w=!1;const A=new kE({Jo:C=>{w?V(Se,`Not sending because RPC '${e}' stream ${r} is closed:`,C):(p||(V(Se,`Opening RPC '${e}' stream ${r} transport.`),f.open(),p=!0),V(Se,`RPC '${e}' stream ${r} sending:`,C),f.send(C))},Ho:()=>f.close()});return Rs(f,Ns.EventType.OPEN,()=>{w||(V(Se,`RPC '${e}' stream ${r} transport opened.`),A.i_())}),Rs(f,Ns.EventType.CLOSE,()=>{w||(w=!0,V(Se,`RPC '${e}' stream ${r} transport closed`),A.o_(),this.I_(f))}),Rs(f,Ns.EventType.ERROR,C=>{w||(w=!0,En(Se,`RPC '${e}' stream ${r} transport errored. Name:`,C.name,"Message:",C.message),A.o_(new O(P.UNAVAILABLE,"The operation could not be completed")))}),Rs(f,Ns.EventType.MESSAGE,C=>{var N;if(!w){const L=C.data[0];Z(!!L,16349);const j=L,M=(j==null?void 0:j.error)||((N=j[0])==null?void 0:N.error);if(M){V(Se,`RPC '${e}' stream ${r} received error:`,M);const W=M.status;let oe=function(v){const g=pe[v];if(g!==void 0)return Ah(g)}(W),ue=M.message;W==="NOT_FOUND"&&ue.includes("database")&&ue.includes("does not exist")&&ue.includes(this.databaseId.database)&&En(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),oe===void 0&&(oe=P.INTERNAL,ue="Unknown error status: "+W+" with message "+M.message),w=!0,A.o_(new O(oe,ue)),f.close()}else V(Se,`RPC '${e}' stream ${r} received:`,L),A.__(L)}}),Hn.u_(),setTimeout(()=>{A.s_()},0),A}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,s){super.Go(e,t,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Gd()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(n){return new Hn(n)}function Co(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(n){return new C_(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Hn.c_=!1;class Uh{constructor(e,t,s=1e3,r=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=s,this.A_=r,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-s);r>0&&V("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _u="PersistentStream";class qh{constructor(e,t,s,r,i,a,c,u){this.Ci=e,this.S_=s,this.b_=r,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Uh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(St(t.toString()),St("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.D_===t&&this.G_(s,r)},s=>{e(()=>{const r=new O(P.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(r)})})}G_(e,t){const s=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{s(()=>this.listener.Zo())}),this.stream.Yo(()=>{s(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(r=>{s(()=>this.z_(r))}),this.stream.onMessage(r=>{s(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return V(_u,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(V(_u,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class SE extends qh{constructor(e,t,s,r,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,r,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=N_(this.serializer,e),s=function(i){if(!("targetChange"in i))return U.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?ct(a.readTime):U.min()}(e);return this.listener.H_(t,s)}Z_(e){const t={};t.database=sa(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=Xo(u)?{documents:O_(i,u)}:{query:x_(i,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Ph(i,a.resumeToken);const d=ea(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(U.min())>0){c.readTime=ui(i,a.snapshotVersion.toTimestamp());const d=ea(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const s=F_(this.serializer,e);s&&(t.labels=s),this.q_(t)}X_(e){const t={};t.database=sa(this.serializer),t.removeTarget=e,this.q_(t)}}class RE extends qh{constructor(e,t,s,r,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,r,a),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Z(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Z(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Z(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=M_(e.writeResults,e.commitTime),s=ct(e.commitTime);return this.listener.na(s,t)}ra(){const e={};e.database=sa(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>V_(this.serializer,s))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{}class CE extends PE{constructor(e,t,s,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,ta(t,s),r,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new O(P.UNKNOWN,i.toString())})}jo(e,t,s,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.jo(e,ta(t,s),r,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(P.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function DE(n,e,t,s){return new CE(n,e,t,s)}class LE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(St(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="RemoteStore";class NE{constructor(e,t,s,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(a=>{s.enqueueAndForget(async()=>{Cn(this)&&(V(vn,"Restarting streams for network reachability change."),await async function(u){const d=q(u);d.Ia.add(4),await cr(d),d.Va.set("Unknown"),d.Ia.delete(4),await $i(d)}(this))})}),this.Va=new LE(s,r)}}async function $i(n){if(Cn(n))for(const e of n.Ra)await e(!0)}async function cr(n){for(const e of n.Ra)await e(!1)}function jh(n,e){const t=q(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),qa(t)?Ua(t):ds(t).O_()&&Ba(t,e))}function Fa(n,e){const t=q(n),s=ds(t);t.Ea.delete(e),s.O_()&&Hh(t,e),t.Ea.size===0&&(s.O_()?s.L_():Cn(t)&&t.Va.set("Unknown"))}function Ba(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ds(n).Z_(e)}function Hh(n,e){n.da.$e(e),ds(n).X_(e)}function Ua(n){n.da=new A_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),ds(n).start(),n.Va.ua()}function qa(n){return Cn(n)&&!ds(n).x_()&&n.Ea.size>0}function Cn(n){return q(n).Ia.size===0}function zh(n){n.da=void 0}async function VE(n){n.Va.set("Online")}async function ME(n){n.Ea.forEach((e,t)=>{Ba(n,e)})}async function OE(n,e){zh(n),qa(n)?(n.Va.ha(e),Ua(n)):n.Va.set("Unknown")}async function xE(n,e,t){if(n.Va.set("Online"),e instanceof Rh&&e.state===2&&e.cause)try{await async function(r,i){const a=i.cause;for(const c of i.targetIds)r.Ea.has(c)&&(await r.remoteSyncer.rejectListen(c,a),r.Ea.delete(c),r.da.removeTarget(c))}(n,e)}catch(s){V(vn,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await hi(n,s)}else if(e instanceof zr?n.da.Xe(e):e instanceof Sh?n.da.st(e):n.da.tt(e),!t.isEqual(U.min()))try{const s=await Bh(n.localStore);t.compareTo(s)>=0&&await function(i,a){const c=i.da.Tt(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(d);f&&i.Ea.set(d,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(ke.EMPTY_BYTE_STRING,f.snapshotVersion)),Hh(i,u);const p=new Ht(f.target,u,d,f.sequenceNumber);Ba(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(s){V(vn,"Failed to raise snapshot:",s),await hi(n,s)}}async function hi(n,e,t){if(!us(e))throw e;n.Ia.add(1),await cr(n),n.Va.set("Offline"),t||(t=()=>Bh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(vn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await $i(n)})}function Wh(n,e){return e().catch(t=>hi(n,t,e))}async function Fi(n){const e=q(n),t=nn(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Aa;for(;$E(e);)try{const r=await _E(e.localStore,s);if(r===null){e.Ta.length===0&&t.L_();break}s=r.batchId,FE(e,r)}catch(r){await hi(e,r)}Gh(e)&&Kh(e)}function $E(n){return Cn(n)&&n.Ta.length<10}function FE(n,e){n.Ta.push(e);const t=nn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Gh(n){return Cn(n)&&!nn(n).x_()&&n.Ta.length>0}function Kh(n){nn(n).start()}async function BE(n){nn(n).ra()}async function UE(n){const e=nn(n);for(const t of n.Ta)e.ea(t.mutations)}async function qE(n,e,t){const s=n.Ta.shift(),r=La.from(s,e,t);await Wh(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Fi(n)}async function jE(n,e){e&&nn(n).Y_&&await async function(s,r){if(function(a){return I_(a)&&a!==P.ABORTED}(r.code)){const i=s.Ta.shift();nn(s).B_(),await Wh(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Fi(s)}}(n,e),Gh(n)&&Kh(n)}async function Eu(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),V(vn,"RemoteStore received new credentials");const s=Cn(t);t.Ia.add(3),await cr(t),s&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await $i(t)}async function HE(n,e){const t=q(n);e?(t.Ia.delete(2),await $i(t)):e||(t.Ia.add(2),await cr(t),t.Va.set("Unknown"))}function ds(n){return n.ma||(n.ma=function(t,s,r){const i=q(t);return i.sa(),new SE(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Zo:VE.bind(null,n),Yo:ME.bind(null,n),t_:OE.bind(null,n),H_:xE.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),qa(n)?Ua(n):n.Va.set("Unknown")):(await n.ma.stop(),zh(n))})),n.ma}function nn(n){return n.fa||(n.fa=function(t,s,r){const i=q(t);return i.sa(),new RE(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:BE.bind(null,n),t_:jE.bind(null,n),ta:UE.bind(null,n),na:qE.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await Fi(n)):(await n.fa.stop(),n.Ta.length>0&&(V(vn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t,s,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,i){const a=Date.now()+s,c=new ja(e,t,a,r,i);return c.start(s),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ha(n,e){if(St("AsyncQueue",`${e}: ${n}`),us(n))return new O(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{static emptySet(e){return new zn(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||x.comparator(t.key,s.key):(t,s)=>x.comparator(t.key,s.key),this.keyedMap=Vs(),this.sortedSet=new le(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof zn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new zn;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(){this.ga=new le(x.comparator)}track(e){const t=e.doc.key,s=this.ga.get(t);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(t,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(t):e.type===1&&s.type===2?this.ga=this.ga.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):B(63341,{Vt:e,pa:s}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,s)=>{e.push(s)}),e}}class ns{constructor(e,t,s,r,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,s,r,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new ns(e,t,zn.emptySet(t),a,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Li(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==s[r].type||!t[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class WE{constructor(){this.queries=wu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,s){const r=q(t),i=r.queries;r.queries=wu(),i.forEach((a,c)=>{for(const u of c.Sa)u.onError(s)})})(this,new O(P.ABORTED,"Firestore shutting down"))}}function wu(){return new Rn(n=>fh(n),Li)}async function Qh(n,e){const t=q(n);let s=3;const r=e.query;let i=t.queries.get(r);i?!i.ba()&&e.Da()&&(s=2):(i=new zE,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await t.onListen(r,!0);break;case 1:i.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(a){const c=Ha(a,`Initialization of query '${$n(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&za(t)}async function Yh(n,e){const t=q(n),s=e.query;let r=3;const i=t.queries.get(s);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function GE(n,e){const t=q(n);let s=!1;for(const r of e){const i=r.query,a=t.queries.get(i);if(a){for(const c of a.Sa)c.Fa(r)&&(s=!0);a.wa=r}}s&&za(t)}function KE(n,e,t){const s=q(n),r=s.queries.get(e);if(r)for(const i of r.Sa)i.onError(t);s.queries.delete(e)}function za(n){n.Ca.forEach(e=>{e.next()})}var oa,Tu;(Tu=oa||(oa={})).Ma="default",Tu.Cache="cache";class Jh{constructor(e,t,s){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new ns(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const s=t!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=ns.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==oa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e){this.key=e}}class Zh{constructor(e){this.key=e}}class QE{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Q(),this.mutatedKeys=Q(),this.eu=mh(e),this.tu=new zn(this.eu)}get nu(){return this.Za}ru(e,t){const s=t?t.iu:new vu,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=r,c=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((f,p)=>{const w=r.get(f),A=Ni(this.query,p)?p:null,C=!!w&&this.mutatedKeys.has(w.key),N=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let L=!1;w&&A?w.data.isEqual(A.data)?C!==N&&(s.track({type:3,doc:A}),L=!0):this.su(w,A)||(s.track({type:2,doc:A}),L=!0,(u&&this.eu(A,u)>0||d&&this.eu(A,d)<0)&&(c=!0)):!w&&A?(s.track({type:0,doc:A}),L=!0):w&&!A&&(s.track({type:1,doc:w}),L=!0,(u||d)&&(c=!0)),L&&(A?(a=a.add(A),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),s.track({type:1,doc:f})}return{tu:a,iu:s,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,p)=>function(A,C){const N=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{Vt:L})}};return N(A)-N(C)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(s),r=r??!1;const c=t&&!r?this._u():[],u=this.Ya.size===0&&this.current&&!r?1:0,d=u!==this.Xa;return this.Xa=u,a.length!==0||d?{snapshot:new ns(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new vu,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Q(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))});const t=[];return e.forEach(s=>{this.Ya.has(s)||t.push(new Zh(s))}),this.Ya.forEach(s=>{e.has(s)||t.push(new Xh(s))}),t}cu(e){this.Za=e.ks,this.Ya=Q();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ns.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Wa="SyncEngine";class YE{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class JE{constructor(e){this.key=e,this.hu=!1}}class XE{constructor(e,t,s,r,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Rn(c=>fh(c),Li),this.Eu=new Map,this.Iu=new Set,this.Ru=new le(x.comparator),this.Au=new Map,this.Vu=new Ma,this.du={},this.mu=new Map,this.fu=ts.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function ZE(n,e,t=!0){const s=of(n);let r;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await ef(s,e,t,!0),r}async function ev(n,e){const t=of(n);await ef(t,e,!0,!1)}async function ef(n,e,t,s){const r=await EE(n.localStore,at(e)),i=r.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return s&&(c=await tv(n,e,i,a==="current",r.resumeToken)),n.isPrimaryClient&&t&&jh(n.remoteStore,r),c}async function tv(n,e,t,s,r){n.pu=(p,w,A)=>async function(N,L,j,M){let W=L.view.ru(j);W.bs&&(W=await mu(N.localStore,L.query,!1).then(({documents:v})=>L.view.ru(v,W)));const oe=M&&M.targetChanges.get(L.targetId),ue=M&&M.targetMismatches.get(L.targetId)!=null,J=L.view.applyChanges(W,N.isPrimaryClient,oe,ue);return bu(N,L.targetId,J.au),J.snapshot}(n,p,w,A);const i=await mu(n.localStore,e,!0),a=new QE(e,i.ks),c=a.ru(i.documents),u=ar.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",r),d=a.applyChanges(c,n.isPrimaryClient,u);bu(n,t,d.au);const f=new YE(e,t,a);return n.Tu.set(e,f),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),d.snapshot}async function nv(n,e,t){const s=q(n),r=s.Tu.get(e),i=s.Eu.get(r.targetId);if(i.length>1)return s.Eu.set(r.targetId,i.filter(a=>!Li(a,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await ra(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),t&&Fa(s.remoteStore,r.targetId),aa(s,r.targetId)}).catch(ls)):(aa(s,r.targetId),await ra(s.localStore,r.targetId,!0))}async function sv(n,e){const t=q(n),s=t.Tu.get(e),r=t.Eu.get(s.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),Fa(t.remoteStore,s.targetId))}async function rv(n,e,t){const s=dv(n);try{const r=await function(a,c){const u=q(a),d=ie.now(),f=c.reduce((A,C)=>A.add(C.key),Q());let p,w;return u.persistence.runTransaction("Locally write mutations","readwrite",A=>{let C=Rt(),N=Q();return u.xs.getEntries(A,f).next(L=>{C=L,C.forEach((j,M)=>{M.isValidDocument()||(N=N.add(j))})}).next(()=>u.localDocuments.getOverlayedDocuments(A,C)).next(L=>{p=L;const j=[];for(const M of c){const W=__(M,p.get(M.key).overlayedDocument);W!=null&&j.push(new Pn(M.key,W,oh(W.value.mapValue),Tt.exists(!0)))}return u.mutationQueue.addMutationBatch(A,d,j,c)}).next(L=>{w=L;const j=L.applyToLocalDocumentSet(p,N);return u.documentOverlayCache.saveOverlays(A,L.batchId,j)})}).then(()=>({batchId:w.batchId,changes:gh(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(a,c,u){let d=a.du[a.currentUser.toKey()];d||(d=new le(K)),d=d.insert(c,u),a.du[a.currentUser.toKey()]=d}(s,r.batchId,t),await lr(s,r.changes),await Fi(s.remoteStore)}catch(r){const i=Ha(r,"Failed to persist write");t.reject(i)}}async function tf(n,e){const t=q(n);try{const s=await gE(t.localStore,e);e.targetChanges.forEach((r,i)=>{const a=t.Au.get(i);a&&(Z(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.hu=!0:r.modifiedDocuments.size>0?Z(a.hu,14607):r.removedDocuments.size>0&&(Z(a.hu,42227),a.hu=!1))}),await lr(t,s,e)}catch(s){await ls(s)}}function Iu(n,e,t){const s=q(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const r=[];s.Tu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const u=q(a);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const w of p.Sa)w.va(c)&&(d=!0)}),d&&za(u)}(s.eventManager,e),r.length&&s.Pu.H_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function iv(n,e,t){const s=q(n);s.sharedClientState.updateQueryState(e,"rejected",t);const r=s.Au.get(e),i=r&&r.key;if(i){let a=new le(x.comparator);a=a.insert(i,Ce.newNoDocument(i,U.min()));const c=Q().add(i),u=new Oi(U.min(),new Map,new le(K),a,c);await tf(s,u),s.Ru=s.Ru.remove(i),s.Au.delete(e),Ga(s)}else await ra(s.localStore,e,!1).then(()=>aa(s,e,t)).catch(ls)}async function ov(n,e){const t=q(n),s=e.batch.batchId;try{const r=await pE(t.localStore,e);sf(t,s,null),nf(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await lr(t,r)}catch(r){await ls(r)}}async function av(n,e,t){const s=q(n);try{const r=await function(a,c){const u=q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(Z(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(s.localStore,e);sf(s,e,t),nf(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await lr(s,r)}catch(r){await ls(r)}}function nf(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function sf(n,e,t){const s=q(n);let r=s.du[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),s.du[s.currentUser.toKey()]=r}}function aa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Eu.get(e))n.Tu.delete(s),t&&n.Pu.yu(s,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(s=>{n.Vu.containsKey(s)||rf(n,s)})}function rf(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Fa(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Ga(n))}function bu(n,e,t){for(const s of t)s instanceof Xh?(n.Vu.addReference(s.key,e),cv(n,s)):s instanceof Zh?(V(Wa,"Document no longer in limbo: "+s.key),n.Vu.removeReference(s.key,e),n.Vu.containsKey(s.key)||rf(n,s.key)):B(19791,{wu:s})}function cv(n,e){const t=e.key,s=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(s)||(V(Wa,"New document in limbo: "+t),n.Iu.add(s),Ga(n))}function Ga(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new x(ae.fromString(e)),s=n.fu.next();n.Au.set(s,new JE(t)),n.Ru=n.Ru.insert(t,s),jh(n.remoteStore,new Ht(at(Di(t.path)),s,"TargetPurposeLimboResolution",Si.ce))}}async function lr(n,e,t){const s=q(n),r=[],i=[],a=[];s.Tu.isEmpty()||(s.Tu.forEach((c,u)=>{a.push(s.pu(u,e,t).then(d=>{var f;if((d||t)&&s.isPrimaryClient){const p=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;s.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){r.push(d);const p=xa.Is(u.targetId,d);i.push(p)}}))}),await Promise.all(a),s.Pu.H_(r),await async function(u,d){const f=q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>R.forEach(d,w=>R.forEach(w.Ts,A=>f.persistence.referenceDelegate.addReference(p,w.targetId,A)).next(()=>R.forEach(w.Es,A=>f.persistence.referenceDelegate.removeReference(p,w.targetId,A)))))}catch(p){if(!us(p))throw p;V($a,"Failed to update sequence numbers: "+p)}for(const p of d){const w=p.targetId;if(!p.fromCache){const A=f.vs.get(w),C=A.snapshotVersion,N=A.withLastLimboFreeSnapshotVersion(C);f.vs=f.vs.insert(w,N)}}}(s.localStore,i))}async function lv(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){V(Wa,"User change. New user:",e.toKey());const s=await Fh(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new O(P.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await lr(t,s.Ns)}}function uv(n,e){const t=q(n),s=t.Au.get(e);if(s&&s.hu)return Q().add(s.key);{let r=Q();const i=t.Eu.get(e);if(!i)return r;for(const a of i){const c=t.Tu.get(a);r=r.unionWith(c.view.nu)}return r}}function of(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=tf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=uv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=iv.bind(null,e),e.Pu.H_=GE.bind(null,e.eventManager),e.Pu.yu=KE.bind(null,e.eventManager),e}function dv(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ov.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=av.bind(null,e),e}class fi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xi(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return mE(this.persistence,new dE,e.initialUser,this.serializer)}Cu(e){return new $h(Oa.Vi,this.serializer)}Du(e){return new wE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}fi.provider={build:()=>new fi};class hv extends fi{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Z(this.persistence.referenceDelegate instanceof di,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new Y_(s,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new $h(s=>di.Vi(s,t),this.serializer)}}class ca{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Iu(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=lv.bind(null,this.syncEngine),await HE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new WE}()}createDatastore(e){const t=xi(e.databaseInfo.databaseId),s=AE(e.databaseInfo);return DE(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,r,i,a,c){return new NE(s,r,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Iu(this.syncEngine,t,0),function(){return yu.v()?new yu:new TE}())}createSyncEngine(e,t){return function(r,i,a,c,u,d,f){const p=new XE(r,i,a,c,u,d);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const i=q(r);V(vn,"RemoteStore shutting down."),i.Ia.add(5),await cr(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}ca.provider={build:()=>new ca};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):St("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="FirestoreClient";class fv{constructor(e,t,s,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this._databaseInfo=r,this.user=Pe.UNAUTHENTICATED,this.clientId=ba.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async a=>{V(sn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(s,a=>(V(sn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Ha(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Do(n,e){n.asyncQueue.verifyOperationInProgress(),V(sn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Fh(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function ku(n,e){n.asyncQueue.verifyOperationInProgress();const t=await mv(n);V(sn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(s=>Eu(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,r)=>Eu(e.remoteStore,r)),n._onlineComponents=e}async function mv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(sn,"Using user provided OfflineComponentProvider");try{await Do(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===P.FAILED_PRECONDITION||r.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;En("Error using user provided cache. Falling back to memory cache: "+t),await Do(n,new fi)}}else V(sn,"Using default OfflineComponentProvider"),await Do(n,new hv(void 0));return n._offlineComponents}async function cf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(sn,"Using user provided OnlineComponentProvider"),await ku(n,n._uninitializedComponentsProvider._online)):(V(sn,"Using default OnlineComponentProvider"),await ku(n,new ca))),n._onlineComponents}function pv(n){return cf(n).then(e=>e.syncEngine)}async function la(n){const e=await cf(n),t=e.eventManager;return t.onListen=ZE.bind(null,e.syncEngine),t.onUnlisten=nv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ev.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=sv.bind(null,e.syncEngine),t}function gv(n,e,t,s){const r=new af(s),i=new Jh(e,r,t);return n.asyncQueue.enqueueAndForget(async()=>Qh(await la(n),i)),()=>{r.Nu(),n.asyncQueue.enqueueAndForget(async()=>Yh(await la(n),i))}}function yv(n,e,t={}){const s=new Kt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new af({next:w=>{f.Nu(),a.enqueueAndForget(()=>Yh(i,p));const A=w.docs.has(c);!A&&w.fromCache?d.reject(new O(P.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&w.fromCache&&u&&u.source==="server"?d.reject(new O(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),p=new Jh(Di(c.path),f,{includeMetadataChanges:!0,qa:!0});return Qh(i,p)}(await la(n),n.asyncQueue,e,t,s)),s.promise}function _v(n,e){const t=new Kt;return n.asyncQueue.enqueueAndForget(async()=>rv(await pv(n),e,t)),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ev="ComponentProvider",Au=new Map;function vv(n,e,t,s,r){return new By(n,e,t,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,lf(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf="firestore.googleapis.com",Su=!0;class Ru{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=uf,this.ssl=Su}else this.host=e.host,this.ssl=e.ssl??Su;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=xh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<K_)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Py("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=lf(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ka{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ru({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ru(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new _y;switch(s.type){case"firstParty":return new Ty(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Au.get(t);s&&(V(Ev,"Removing Datastore"),Au.delete(t),s.terminate())}(this),Promise.resolve()}}function wv(n,e,t,s={}){var d;n=Qt(n,Ka);const r=rr(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&Md(`https://${c}`),i.host!==uf&&i.host!==c&&En("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:r,emulatorOptions:s};if(!Jt(u,a)&&(n._setSettings(u),s.mockUserToken)){let f,p;if(typeof s.mockUserToken=="string")f=s.mockUserToken,p=Pe.MOCK_USER;else{f=zp(s.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const w=s.mockUserToken.sub||s.mockUserToken.user_id;if(!w)throw new O(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Pe(w)}n._authCredentials=new Ey(new Qd(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Bi(this.firestore,e,this._query)}}class Ee{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Js(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ee(this.firestore,e,this._key)}toJSON(){return{type:Ee._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(ir(t,Ee._jsonSchema))return new Ee(e,s||null,new x(ae.fromString(t.referencePath)))}}Ee._jsonSchemaVersion="firestore/documentReference/1.0",Ee._jsonSchema={type:ge("string",Ee._jsonSchemaVersion),referencePath:ge("string")};class Js extends Bi{constructor(e,t,s){super(e,t,Di(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ee(this.firestore,null,new x(e))}withConverter(e){return new Js(this.firestore,e,this._path)}}function df(n,e,...t){if(n=fe(n),arguments.length===1&&(e=ba.newId()),Ry("doc","path",e),n instanceof Ka){const s=ae.fromString(e,...t);return ql(s),new Ee(n,null,new x(s))}{if(!(n instanceof Ee||n instanceof Js))throw new O(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ae.fromString(e,...t));return ql(s),new Ee(n.firestore,n instanceof Js?n.converter:null,new x(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu="AsyncQueue";class Cu{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Uh(this,"async_queue_retry"),this._c=()=>{const s=Co();s&&V(Pu,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=Co();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Co();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Kt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!us(e))throw e;V(Pu,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,St("INTERNAL UNHANDLED ERROR: ",Du(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=ja.createAndSchedule(this,e,t,s,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&B(47125,{Pc:Du(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Du(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Xs extends Ka{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new Cu,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cu(e),this._firestoreClient=void 0,await e}}}function Tv(n,e){const t=typeof n=="object"?n:Ta(),s=typeof n=="string"?n:ri,r=An(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=jp("firestore");i&&wv(r,...i)}return r}function Qa(n){if(n._terminated)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Iv(n),n._firestoreClient}function Iv(n){var s,r,i,a;const e=n._freezeSettings(),t=vv(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,(r=n._app)==null?void 0:r.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new fv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const d=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(ke.fromBase64String(e))}catch(t){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ir(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:ge("string",Ge._jsonSchemaVersion),bytes:ge("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:lt._jsonSchemaVersion}}static fromJSON(e){if(ir(e,lt._jsonSchema))return new lt(e.latitude,e.longitude)}}lt._jsonSchemaVersion="firestore/geoPoint/1.0",lt._jsonSchema={type:ge("string",lt._jsonSchemaVersion),latitude:ge("number"),longitude:ge("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Xe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ir(e,Xe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Xe(e.vectorValues);throw new O(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Xe._jsonSchemaVersion="firestore/vectorValue/1.0",Xe._jsonSchema={type:ge("string",Xe._jsonSchemaVersion),vectorValues:ge("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv=/^__.*__$/;class kv{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new Pn(e,this.data,this.fieldMask,t,this.fieldTransforms):new or(e,this.data,t,this.fieldTransforms)}}function mf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{dataSource:n})}}class Ya{constructor(e,t,s,r,i,a){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Ya({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.i({path:t,arrayElement:!1});return s.mc(e),s}fc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.i({path:t,arrayElement:!1});return s.Ac(),s}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return mi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(mf(this.dataSource)&&bv.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class Av{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||xi(e)}A(e,t,s,r=!1){return new Ya({dataSource:e,methodName:t,targetDoc:s,path:be.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Sv(n){const e=n._freezeSettings(),t=xi(n._databaseId);return new Av(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Rv(n,e,t,s,r,i={}){const a=n.A(i.merge||i.mergeFields?2:0,e,t,r);_f("Data must be an object, but it was:",a,s);const c=gf(s,a);let u,d;if(i.merge)u=new Ye(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const w=Ja(e,p,t);if(!a.contains(w))throw new O(P.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Dv(f,w)||f.push(w)}u=new Ye(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new kv(new We(c),u,d)}function pf(n,e){if(yf(n=fe(n)))return _f("Unsupported field value:",e,n),gf(n,e);if(n instanceof ff)return function(s,r){if(!mf(r.dataSource))throw r.yc(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.yc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(s,r){const i=[];let a=0;for(const c of s){let u=pf(c,r.gc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(s,r){if((s=fe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return h_(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=ie.fromDate(s);return{timestampValue:ui(r.serializer,i)}}if(s instanceof ie){const i=new ie(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ui(r.serializer,i)}}if(s instanceof lt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ge)return{bytesValue:Ph(r.serializer,s._byteString)};if(s instanceof Ee){const i=r.databaseId,a=s.firestore._databaseId;if(!a.isEqual(i))throw r.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Va(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof Xe)return function(a,c){const u=a instanceof Xe?a.toArray():a;return{mapValue:{fields:{[rh]:{stringValue:ih},[ii]:{arrayValue:{values:u.map(f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return Da(c.serializer,f)})}}}}}}(s,r);if(Oh(s))return s._toProto(r.serializer);throw r.yc(`Unsupported field value: ${ka(s)}`)}(n,e)}function gf(n,e){const t={};return Xd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Sn(n,(s,r)=>{const i=pf(r,e.dc(s));i!=null&&(t[s]=i)}),{mapValue:{fields:t}}}function yf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ie||n instanceof lt||n instanceof Ge||n instanceof Ee||n instanceof ff||n instanceof Xe||Oh(n))}function _f(n,e,t){if(!yf(t)||!Yd(t)){const s=ka(t);throw s==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+s)}}function Ja(n,e,t){if((e=fe(e))instanceof hf)return e._internalPath;if(typeof e=="string")return Cv(n,e);throw mi("Field path arguments must be of type string or ",n,!1,void 0,t)}const Pv=new RegExp("[~\\*/\\[\\]]");function Cv(n,e,t){if(e.search(Pv)>=0)throw mi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new hf(...e.split("."))._internalPath}catch{throw mi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function mi(n,e,t,s,r){const i=s&&!s.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${s}`),a&&(u+=` in document ${r}`),u+=")"),new O(P.INVALID_ARGUMENT,c+n+u)}function Dv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{convertValue(e,t="none"){switch(tn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return he(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(en(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return Sn(e,(r,i)=>{s[r]=this.convertValue(i,t)}),s}convertVectorValue(e){var s,r,i;const t=(i=(r=(s=e.fields)==null?void 0:s[ii].arrayValue)==null?void 0:r.values)==null?void 0:i.map(a=>he(a.doubleValue));return new Xe(t)}convertGeoPoint(e){return new lt(he(e.latitude),he(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=Pi(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(Ws(e));default:return null}}convertTimestamp(e){const t=Zt(e);return new ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=ae.fromString(e);Z(Mh(s),9688,{name:e});const r=new Gs(s.get(1),s.get(3)),i=new x(s.popFirst(5));return r.isEqual(t)||St(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef extends Lv{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,t)}}const Lu="@firebase/firestore",Nu="4.13.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(n){return function(t,s){if(typeof t!="object"||t===null)return!1;const r=t;for(const i of s)if(i in r&&typeof r[i]=="function")return!0;return!1}(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,t,s,r,i){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ee(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Nv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Ja("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Nv extends vf{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function Mv(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}class Os{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class yn extends vf{constructor(e,t,s,r,i,a){super(e,t,s,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Wr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Ja("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=yn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}yn._jsonSchemaVersion="firestore/documentSnapshot/1.0",yn._jsonSchema={type:ge("string",yn._jsonSchemaVersion),bundleSource:ge("string","DocumentSnapshot"),bundleName:ge("string"),bundle:ge("string")};class Wr extends yn{data(e={}){return super.data(e)}}class Wn{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Os(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new Wr(this._firestore,this._userDataWriter,s.key,s,new Os(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(c=>{const u=new Wr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Os(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Wr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Os(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:Ov(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Wn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ba.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Ov(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Wn._jsonSchemaVersion="firestore/querySnapshot/1.0",Wn._jsonSchema={type:ge("string",Wn._jsonSchemaVersion),bundleSource:ge("string","QuerySnapshot"),bundleName:ge("string"),bundle:ge("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(n){n=Qt(n,Ee);const e=Qt(n.firestore,Xs),t=Qa(e);return yv(t,n._key).then(s=>Tf(e,n,s))}function wf(n,e,t){n=Qt(n,Ee);const s=Qt(n.firestore,Xs),r=Mv(n.converter,e,t),i=Sv(s);return Fv(s,[Rv(i,"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Tt.none())])}function $v(n,...e){var d,f,p;n=fe(n);let t={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||Vu(e[s])||(t=e[s++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Vu(e[s])){const w=e[s];e[s]=(d=w.next)==null?void 0:d.bind(w),e[s+1]=(f=w.error)==null?void 0:f.bind(w),e[s+2]=(p=w.complete)==null?void 0:p.bind(w)}let i,a,c;if(n instanceof Ee)a=Qt(n.firestore,Xs),c=Di(n._key.path),i={next:w=>{e[s]&&e[s](Tf(a,n,w))},error:e[s+1],complete:e[s+2]};else{const w=Qt(n,Bi);a=Qt(w.firestore,Xs),c=w._query;const A=new Ef(a);i={next:C=>{e[s]&&e[s](new Wn(a,A,w,C))},error:e[s+1],complete:e[s+2]},Vv(n._query)}const u=Qa(a);return gv(u,c,r,i)}function Fv(n,e){const t=Qa(n);return _v(t,e)}function Tf(n,e,t){const s=t.docs.get(e._key),r=new Ef(n);return new yn(n,r,e._key,s,new Os(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){yy(as),ht(new Ze("firestore",(s,{instanceIdentifier:r,options:i})=>{const a=s.getProvider("app").getImmediate(),c=new Xs(new vy(s.getProvider("auth-internal")),new Iy(a,s.getProvider("app-check-internal")),Uy(a,r),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Ke(Lu,Nu,e),Ke(Lu,Nu,"esm2020")})();var Bv="firebase",Uv="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ke(Bv,Uv,"app");const If="@firebase/installations",Xa="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=1e4,kf=`w:${Xa}`,Af="FIS_v2",qv="https://firebaseinstallations.googleapis.com/v1",jv=60*60*1e3,Hv="installations",zv="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},wn=new kn(Hv,zv,Wv);function Sf(n){return n instanceof tt&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf({projectId:n}){return`${qv}/projects/${n}/installations`}function Pf(n){return{token:n.token,requestStatus:2,expiresIn:Kv(n.expiresIn),creationTime:Date.now()}}async function Cf(n,e){const s=(await e.json()).error;return wn.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function Df({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Gv(n,{refreshToken:e}){const t=Df(n);return t.append("Authorization",Qv(e)),t}async function Lf(n){const e=await n();return e.status>=500&&e.status<600?n():e}function Kv(n){return Number(n.replace("s","000"))}function Qv(n){return`${Af} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yv({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=Rf(n),r=Df(n),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const a={fid:t,authVersion:Af,appId:n.appId,sdkVersion:kf},c={method:"POST",headers:r,body:JSON.stringify(a)},u=await Lf(()=>fetch(s,c));if(u.ok){const d=await u.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Pf(d.authToken)}}else throw await Cf("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jv(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv=/^[cdef][\w-]{21}$/,ua="";function Zv(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=ew(n);return Xv.test(t)?t:ua}catch{return ua}}function ew(n){return Jv(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=new Map;function Mf(n,e){const t=Ui(n);Of(t,e),tw(t,e)}function Of(n,e){const t=Vf.get(n);if(t)for(const s of t)s(e)}function tw(n,e){const t=nw();t&&t.postMessage({key:n,fid:e}),sw()}let mn=null;function nw(){return!mn&&"BroadcastChannel"in self&&(mn=new BroadcastChannel("[Firebase] FID Change"),mn.onmessage=n=>{Of(n.data.key,n.data.fid)}),mn}function sw(){Vf.size===0&&mn&&(mn.close(),mn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rw="firebase-installations-database",iw=1,Tn="firebase-installations-store";let Lo=null;function Za(){return Lo||(Lo=$d(rw,iw,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Tn)}}})),Lo}async function pi(n,e){const t=Ui(n),r=(await Za()).transaction(Tn,"readwrite"),i=r.objectStore(Tn),a=await i.get(t);return await i.put(e,t),await r.done,(!a||a.fid!==e.fid)&&Mf(n,e.fid),e}async function xf(n){const e=Ui(n),s=(await Za()).transaction(Tn,"readwrite");await s.objectStore(Tn).delete(e),await s.done}async function qi(n,e){const t=Ui(n),r=(await Za()).transaction(Tn,"readwrite"),i=r.objectStore(Tn),a=await i.get(t),c=e(a);return c===void 0?await i.delete(t):await i.put(c,t),await r.done,c&&(!a||a.fid!==c.fid)&&Mf(n,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ec(n){let e;const t=await qi(n.appConfig,s=>{const r=ow(s),i=aw(n,r);return e=i.registrationPromise,i.installationEntry});return t.fid===ua?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function ow(n){const e=n||{fid:Zv(),registrationStatus:0};return $f(e)}function aw(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(wn.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=cw(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:lw(n)}:{installationEntry:e}}async function cw(n,e){try{const t=await Yv(n,e);return pi(n.appConfig,t)}catch(t){throw Sf(t)&&t.customData.serverCode===409?await xf(n.appConfig):await pi(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function lw(n){let e=await Mu(n.appConfig);for(;e.registrationStatus===1;)await Nf(100),e=await Mu(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await ec(n);return s||t}return e}function Mu(n){return qi(n,e=>{if(!e)throw wn.create("installation-not-found");return $f(e)})}function $f(n){return uw(n)?{fid:n.fid,registrationStatus:0}:n}function uw(n){return n.registrationStatus===1&&n.registrationTime+bf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dw({appConfig:n,heartbeatServiceProvider:e},t){const s=hw(n,t),r=Gv(n,t),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const a={installation:{sdkVersion:kf,appId:n.appId}},c={method:"POST",headers:r,body:JSON.stringify(a)},u=await Lf(()=>fetch(s,c));if(u.ok){const d=await u.json();return Pf(d)}else throw await Cf("Generate Auth Token",u)}function hw(n,{fid:e}){return`${Rf(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tc(n,e=!1){let t;const s=await qi(n.appConfig,i=>{if(!Ff(i))throw wn.create("not-registered");const a=i.authToken;if(!e&&pw(a))return i;if(a.requestStatus===1)return t=fw(n,e),i;{if(!navigator.onLine)throw wn.create("app-offline");const c=yw(i);return t=mw(n,c),c}});return t?await t:s.authToken}async function fw(n,e){let t=await Ou(n.appConfig);for(;t.authToken.requestStatus===1;)await Nf(100),t=await Ou(n.appConfig);const s=t.authToken;return s.requestStatus===0?tc(n,e):s}function Ou(n){return qi(n,e=>{if(!Ff(e))throw wn.create("not-registered");const t=e.authToken;return _w(t)?{...e,authToken:{requestStatus:0}}:e})}async function mw(n,e){try{const t=await dw(n,e),s={...e,authToken:t};return await pi(n.appConfig,s),t}catch(t){if(Sf(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await xf(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await pi(n.appConfig,s)}throw t}}function Ff(n){return n!==void 0&&n.registrationStatus===2}function pw(n){return n.requestStatus===2&&!gw(n)}function gw(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+jv}function yw(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function _w(n){return n.requestStatus===1&&n.requestTime+bf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ew(n){const e=n,{installationEntry:t,registrationPromise:s}=await ec(e);return s?s.catch(console.error):tc(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vw(n,e=!1){const t=n;return await ww(t),(await tc(t,e)).token}async function ww(n){const{registrationPromise:e}=await ec(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tw(n){if(!n||!n.options)throw No("App Configuration");if(!n.name)throw No("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw No(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function No(n){return wn.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf="installations",Iw="installations-internal",bw=n=>{const e=n.getProvider("app").getImmediate(),t=Tw(e),s=An(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},kw=n=>{const e=n.getProvider("app").getImmediate(),t=An(e,Bf).getImmediate();return{getId:()=>Ew(t),getToken:r=>vw(t,r)}};function Aw(){ht(new Ze(Bf,bw,"PUBLIC")),ht(new Ze(Iw,kw,"PRIVATE"))}Aw();Ke(If,Xa);Ke(If,Xa,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="analytics",Sw="firebase_id",Rw="origin",Pw=60*1e3,Cw="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",nc="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve=new Ai("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dw={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ue=new kn("analytics","Analytics",Dw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lw(n){if(!n.startsWith(nc)){const e=Ue.create("invalid-gtag-resource",{gtagURL:n});return Ve.warn(e.message),""}return n}function Uf(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function Nw(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function Vw(n,e){const t=Nw("firebase-js-sdk-policy",{createScriptURL:Lw}),s=document.createElement("script"),r=`${nc}?l=${n}&id=${e}`;s.src=t?t==null?void 0:t.createScriptURL(r):r,s.async=!0,document.head.appendChild(s)}function Mw(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function Ow(n,e,t,s,r,i){const a=s[r];try{if(a)await e[a];else{const u=(await Uf(t)).find(d=>d.measurementId===r);u&&await e[u.appId]}}catch(c){Ve.error(c)}n("config",r,i)}async function xw(n,e,t,s,r){try{let i=[];if(r&&r.send_to){let a=r.send_to;Array.isArray(a)||(a=[a]);const c=await Uf(t);for(const u of a){const d=c.find(p=>p.measurementId===u),f=d&&e[d.appId];if(f)i.push(f);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),n("event",s,r||{})}catch(i){Ve.error(i)}}function $w(n,e,t,s){async function r(i,...a){try{if(i==="event"){const[c,u]=a;await xw(n,e,t,c,u)}else if(i==="config"){const[c,u]=a;await Ow(n,e,t,s,c,u)}else if(i==="consent"){const[c,u]=a;n("consent",c,u)}else if(i==="get"){const[c,u,d]=a;n("get",c,u,d)}else if(i==="set"){const[c]=a;n("set",c)}else n(i,...a)}catch(c){Ve.error(c)}}return r}function Fw(n,e,t,s,r){let i=function(...a){window[s].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=$w(i,n,e,t),{gtagCore:i,wrappedGtag:window[r]}}function Bw(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(nc)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw=30,qw=1e3;class jw{constructor(e={},t=qw){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const qf=new jw;function Hw(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function zw(n){var a;const{appId:e,apiKey:t}=n,s={method:"GET",headers:Hw(t)},r=Cw.replace("{app-id}",e),i=await fetch(r,s);if(i.status!==200&&i.status!==304){let c="";try{const u=await i.json();(a=u.error)!=null&&a.message&&(c=u.error.message)}catch{}throw Ue.create("config-fetch-failed",{httpStatus:i.status,responseMessage:c})}return i.json()}async function Ww(n,e=qf,t){const{appId:s,apiKey:r,measurementId:i}=n.options;if(!s)throw Ue.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:s};throw Ue.create("no-api-key")}const a=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Qw;return setTimeout(async()=>{c.abort()},Pw),jf({appId:s,apiKey:r,measurementId:i},a,c,e)}async function jf(n,{throttleEndTimeMillis:e,backoffCount:t},s,r=qf){var c;const{appId:i,measurementId:a}=n;try{await Gw(s,e)}catch(u){if(a)return Ve.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:i,measurementId:a};throw u}try{const u=await zw(n);return r.deleteThrottleMetadata(i),u}catch(u){const d=u;if(!Kw(d)){if(r.deleteThrottleMetadata(i),a)return Ve.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:i,measurementId:a};throw u}const f=Number((c=d==null?void 0:d.customData)==null?void 0:c.httpStatus)===503?Cl(t,r.intervalMillis,Uw):Cl(t,r.intervalMillis),p={throttleEndTimeMillis:Date.now()+f,backoffCount:t+1};return r.setThrottleMetadata(i,p),Ve.debug(`Calling attemptFetch again in ${f} millis`),jf(n,p,s,r)}}function Gw(n,e){return new Promise((t,s)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(t,r);n.addEventListener(()=>{clearTimeout(i),s(Ue.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Kw(n){if(!(n instanceof tt)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Qw{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Yw(n,e,t,s,r){if(r&&r.global){n("event",t,s);return}else{const i=await e,a={...s,send_to:i};n("event",t,a)}}async function Jw(n,e,t,s){if(s&&s.global){const r={};for(const i of Object.keys(t))r[`user_properties.${i}`]=t[i];return n("set",r),Promise.resolve()}else{const r=await e;n("config",r,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xw(){if(Nd())try{await Vd()}catch(n){return Ve.warn(Ue.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return Ve.warn(Ue.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Zw(n,e,t,s,r,i,a){const c=Ww(n);c.then(w=>{t[w.measurementId]=w.appId,n.options.measurementId&&w.measurementId!==n.options.measurementId&&Ve.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${w.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(w=>Ve.error(w)),e.push(c);const u=Xw().then(w=>{if(w)return s.getId()}),[d,f]=await Promise.all([c,u]);Bw(i)||Vw(i,d.measurementId),r("js",new Date);const p=(a==null?void 0:a.config)??{};return p[Rw]="firebase",p.update=!0,f!=null&&(p[Sw]=f),r("config",d.measurementId,p),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e){this.app=e}_delete(){return delete Gn[this.app.options.appId],Promise.resolve()}}let Gn={},xu=[];const $u={};let Vo="dataLayer",tT="gtag",Fu,sc,Bu=!1;function nT(){const n=[];if(Ld()&&n.push("This is a browser extension environment."),Xp()||n.push("Cookies are not available."),n.length>0){const e=n.map((s,r)=>`(${r+1}) ${s}`).join(" "),t=Ue.create("invalid-analytics-context",{errorInfo:e});Ve.warn(t.message)}}function sT(n,e,t){nT();const s=n.options.appId;if(!s)throw Ue.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Ve.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ue.create("no-api-key");if(Gn[s]!=null)throw Ue.create("already-exists",{id:s});if(!Bu){Mw(Vo);const{wrappedGtag:i,gtagCore:a}=Fw(Gn,xu,$u,Vo,tT);sc=i,Fu=a,Bu=!0}return Gn[s]=Zw(n,xu,$u,e,Fu,Vo,t),new eT(n)}function rT(n=Ta()){n=fe(n);const e=An(n,gi);return e.isInitialized()?e.getImmediate():iT(n)}function iT(n,e={}){const t=An(n,gi);if(t.isInitialized()){const r=t.getImmediate();if(Jt(e,t.getOptions()))return r;throw Ue.create("already-initialized")}return t.initialize({options:e})}function oT(n,e,t){n=fe(n),Jw(sc,Gn[n.app.options.appId],e,t).catch(s=>Ve.error(s))}function aT(n,e,t,s){n=fe(n),Yw(sc,Gn[n.app.options.appId],e,t,s).catch(r=>Ve.error(r))}const Uu="@firebase/analytics",qu="0.10.21";function cT(){ht(new Ze(gi,(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return sT(s,r,t)},"PUBLIC")),ht(new Ze("analytics-internal",n,"PRIVATE")),Ke(Uu,qu),Ke(Uu,qu,"esm2020");function n(e){try{const t=e.getProvider(gi).getImmediate();return{logEvent:(s,r,i)=>aT(t,s,r,i),setUserProperties:(s,r)=>oT(t,s,r)}}catch(t){throw Ue.create("interop-component-reg-failed",{reason:t})}}}cT();const lT={apiKey:"AIzaSyALUloNt0HWTMeP4IARvRMS9JY-R5_NnFM",authDomain:"nistha-passi-core.firebaseapp.com",projectId:"nistha-passi-core",storageBucket:"nistha-passi-core.firebasestorage.app",messagingSenderId:"299692286010",appId:"1:299692286010:web:f9fbb02169500828aa5503",measurementId:"G-R3WSHC7JE5"},rc=Fd(lT);typeof window<"u"&&rT(rc);const Hf=Tv(rc),Gr={tasks:{},streak:{count:0,lastDate:null,longest:0},history:[],settings:{name:"",goal:"",reminders:{}},phase:"stabilization",lastDate:null,customPlan:null,taskDescs:{},immediateTasks:[],eodLocked:null,planTomorrow:null,lastUpdated:null,emailVerified:!1,verificationToken:null,tokenCreatedAt:null};let Zs=null,Re=null,pn=null;function ic(n){return df(Hf,"users",n,"data","profile")}async function uT(n){Zs=n;try{const e=await xv(ic(n));Re=e.exists()?{...Gr,...e.data()}:{...Gr}}catch(e){console.warn("[EveryDay DB] Firestore load failed — using defaults:",e.message),Re={...Gr}}return Re}function X(n,e=null){if(Re===null)return e;const t=Re[n];return t??e}async function me(n){if(Zs===null||Re===null){console.warn("[EveryDay DB] patchUserData called before init — skipped");return}const e={};for(const[s,r]of Object.entries(n))r!==null&&typeof r=="object"&&!Array.isArray(r)&&Re[s]!==null&&typeof Re[s]=="object"&&!Array.isArray(Re[s])?Re[s]={...Re[s],...r}:Re[s]=r,e[s]=Re[s];const t=new Date().toISOString();Re.lastUpdated=t,e.lastUpdated=t;try{await wf(ic(Zs),e,{merge:!0})}catch(s){console.error("[EveryDay DB] Firestore write failed:",s.message)}}function dT(n,e){return Zs=n,pn&&pn(),pn=$v(ic(n),{includeMetadataChanges:!0},t=>{if(!t.exists())return;const{hasPendingWrites:s,fromCache:r}=t.metadata;if(s||r)return;const i={...Gr,...t.data()};Re=i,e(i)},t=>{console.warn("[EveryDay DB] onSnapshot error:",t.message)}),pn}function hT(){pn&&(pn(),pn=null),Zs=null,Re=null}function Yt(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function fT(n){const e=new Date(n+"T00:00:00"),t=new Date;return t.setDate(t.getDate()-1),e.toDateString()===t.toDateString()}const mT=30;function pT(n){const e=new Date;e.setDate(e.getDate()-mT);const t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;for(const s of Object.keys(n))s<t&&delete n[s]}const gT={getToday:async()=>{const n=Yt(),e=X("tasks",{});return{date:n,tasks:e[n]||{}}},toggle:async(n,e)=>{const t=Yt(),s=X("tasks",{});s[t]||(s[t]={});const r=e!==void 0?e:!s[t][n];return s[t][n]=r,await me({tasks:s}),{date:t,taskId:n,done:r}},resetToday:async()=>{const n=Yt(),e=X("tasks",{});return e[n]={},await me({tasks:e}),{message:"Today's tasks reset.",date:n}}},yT={get:async()=>X("streak",{count:0,lastDate:null,longest:0}),update:async()=>{const n=Yt(),e=X("lastDate",null),t={...X("streak",{count:0,lastDate:null,longest:0})};let s=!1;if(e!==n){s=!0;const r=X("tasks",{});r[n]={},pT(r),e&&fT(e)?(t.count+=1,t.count>t.longest&&(t.longest=t.count)):e&&e!==n&&(t.count=0),t.lastDate=n,await me({tasks:r,streak:t,lastDate:n})}return{updated:s,newDay:s,streak:t}},confirmShowUp:async()=>{const n=Yt(),e={...X("streak",{count:0,lastDate:null,longest:0})};return e.count=Math.max(e.count,1),e.count>e.longest&&(e.longest=e.count),e.lastDate=n,await me({streak:e}),{streak:e}}},_T={getAll:async()=>[...X("history",[])].sort((e,t)=>t.date.localeCompare(e.date)),getToday:async()=>{const n=Yt();return X("history",[]).find(t=>t.date===n)||null},submit:async n=>{const e=Yt(),t=[...X("history",[])].filter(r=>r.date!==e),s={...n,date:e,submittedAt:new Date().toISOString()};return t.push(s),await me({history:t}),s}},ET={get:async()=>X("settings",{name:"",goal:"",reminders:{}}),update:async n=>(await me({settings:n}),X("settings",{name:"",goal:"",reminders:{}})),getPhase:async()=>({phase:X("phase","stabilization")}),setPhase:async n=>(await me({phase:n}),{phase:n})},vT={export:async()=>{const n={tasks:X("tasks",{}),streak:X("streak",{}),history:X("history",[]),settings:X("settings",{}),phase:X("phase","stabilization"),exportedAt:new Date().toISOString()},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),s=document.createElement("a");s.href=t,s.download=`everyday-backup-${Yt()}.json`,s.click(),URL.revokeObjectURL(t)},reset:async()=>(await me({tasks:{},streak:{count:0,lastDate:null,longest:0},history:[],settings:{name:"",goal:"",reminders:{}},phase:"stabilization",lastDate:null}),{message:"All data reset successfully."})},wT={check:()=>Promise.resolve({status:"firestore-only"})},xe={tasks:gT,streak:yT,history:_T,settings:ET,data:vT,health:wT},S={tasks:{},streak:{count:0,lastDate:null,longest:0},history:[],settings:{name:"",goal:"",reminders:{}},phase:"stabilization",expandedBlocks:new Set,minimumMode:!1,currentView:"dashboard",focusBlock:null,timerInterval:null,timerSeconds:25*60,timerRunning:!1,notificationsEnabled:!1,eod:{showed:null,effort:0,notes:""},eodLocked:!1,isLoading:!1,serverError:!1};let ju;function H(n,e="default",t=3e3){const s=document.getElementById("toast");s&&(s.textContent=n,s.className=`toast show ${e}`,clearTimeout(ju),ju=setTimeout(()=>{s.classList.remove("show")},t))}function er(){const n=new Date,e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),s=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${s}`}function TT(n){return new Date(n+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"})}function IT(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function zf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const bT=zf,Wf=new kn("auth","Firebase",zf());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi=new Ai("@firebase/auth");function kT(n,...e){yi.logLevel<=G.WARN&&yi.warn(`Auth (${as}): ${n}`,...e)}function Kr(n,...e){yi.logLevel<=G.ERROR&&yi.error(`Auth (${as}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(n,...e){throw oc(n,...e)}function ut(n,...e){return oc(n,...e)}function Gf(n,e,t){const s={...bT(),[e]:t};return new kn("auth","Firebase",s).create(e,{appName:n.name})}function It(n){return Gf(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oc(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return Wf.create(n,...e)}function F(n,e,...t){if(!n)throw oc(e,...t)}function vt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Kr(e),new Error(e)}function Pt(n,e){n||vt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function AT(){return Hu()==="http:"||Hu()==="https:"}function Hu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ST(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(AT()||Ld()||"connection"in navigator)?navigator.onLine:!0}function RT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,t){this.shortDelay=e,this.longDelay=t,Pt(t>e,"Short delay should be less than long delay!"),this.isMobile=Wp()||Qp()}get(){return ST()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(n,e){Pt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],DT=new ur(3e4,6e4);function Dt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yt(n,e,t,s,r={}){return Qf(n,r,async()=>{let i={},a={};s&&(e==="GET"?a=s:i={body:JSON.stringify(s)});const c=sr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return Kp()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&rr(n.emulatorConfig.host)&&(d.credentials="include"),Kf.fetch()(await Yf(n,n.config.apiHost,t,c),d)})}async function Qf(n,e,t){n._canInitEmulator=!1;const s={...PT,...e};try{const r=new NT(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw xr(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw xr(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw xr(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw xr(n,"user-disabled",a);const f=s[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Gf(n,f,d);et(n,f)}}catch(r){if(r instanceof tt)throw r;et(n,"network-request-failed",{message:String(r)})}}async function dr(n,e,t,s,r={}){const i=await yt(n,e,t,s,r);return"mfaPendingCredential"in i&&et(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Yf(n,e,t,s){const r=`${e}${t}?${s}`,i=n,a=i.config.emulator?ac(n.config,r):`${n.config.apiScheme}://${r}`;return CT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function LT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class NT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(ut(this.auth,"network-request-failed")),DT.get())})}}function xr(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=ut(n,e,s);return r.customData._tokenResponse=t,r}function zu(n){return n!==void 0&&n.enterprise!==void 0}class VT{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return LT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function MT(n,e){return yt(n,"GET","/v2/recaptchaConfig",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OT(n,e){return yt(n,"POST","/v1/accounts:delete",e)}async function _i(n,e){return yt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function js(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xT(n,e=!1){const t=fe(n),s=await t.getIdToken(e),r=cc(s);F(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:js(Mo(r.auth_time)),issuedAtTime:js(Mo(r.iat)),expirationTime:js(Mo(r.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Mo(n){return Number(n)*1e3}function cc(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Kr("JWT malformed, contained fewer than 3 sections"),null;try{const r=Rd(t);return r?JSON.parse(r):(Kr("Failed to decode base64 JWT payload"),null)}catch(r){return Kr("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Wu(n){const e=cc(n);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ss(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof tt&&$T(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function $T({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=js(this.lastLoginAt),this.creationTime=js(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ei(n){var p;const e=n.auth,t=await n.getIdToken(),s=await ss(n,_i(e,{idToken:t}));F(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const i=(p=r.providerUserInfo)!=null&&p.length?Jf(r.providerUserInfo):[],a=UT(n.providerData,i),c=n.isAnonymous,u=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new ha(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function BT(n){const e=fe(n);await Ei(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function UT(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Jf(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qT(n,e){const t=await Qf(n,{},async()=>{const s=sr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,a=await Yf(n,r,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:s};return n.emulatorConfig&&rr(n.emulatorConfig.host)&&(u.credentials="include"),Kf.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function jT(n,e){return yt(n,"POST","/v2/accounts:revokeToken",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Wu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");const t=Wu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:i}=await qT(e,t);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:i}=t,a=new Kn;return s&&(F(typeof s=="string","internal-error",{appName:e}),a.refreshToken=s),r&&(F(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),i&&(F(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Kn,this.toJSON())}_performRefresh(){return vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(n,e){F(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Je{constructor({uid:e,auth:t,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new FT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ha(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await ss(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return xT(this,e)}reload(){return BT(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Je({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await Ei(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(It(this.auth));const e=await this.getIdToken();return await ss(this,OT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:w,isAnonymous:A,providerData:C,stsTokenManager:N}=t;F(p&&N,e,"internal-error");const L=Kn.fromJSON(this.name,N);F(typeof p=="string",e,"internal-error"),$t(s,e.name),$t(r,e.name),F(typeof w=="boolean",e,"internal-error"),F(typeof A=="boolean",e,"internal-error"),$t(i,e.name),$t(a,e.name),$t(c,e.name),$t(u,e.name),$t(d,e.name),$t(f,e.name);const j=new Je({uid:p,auth:e,email:r,emailVerified:w,displayName:s,isAnonymous:A,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:L,createdAt:d,lastLoginAt:f});return C&&Array.isArray(C)&&(j.providerData=C.map(M=>({...M}))),u&&(j._redirectEventId=u),j}static async _fromIdTokenResponse(e,t,s=!1){const r=new Kn;r.updateFromServerResponse(t);const i=new Je({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Ei(i),i}static async _fromGetAccountInfoResponse(e,t,s){const r=t.users[0];F(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Jf(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),c=new Kn;c.updateFromIdToken(s);const u=new Je({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new ha(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu=new Map;function wt(n){Pt(n instanceof Function,"Expected a class definition");let e=Gu.get(n);return e?(Pt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Gu.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Xf.type="NONE";const Ku=Xf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(n,e,t){return`firebase:${n}:${e}:${t}`}class Qn{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Qr(this.userKey,r.apiKey,i),this.fullPersistenceKey=Qr("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await _i(this.auth,{idToken:e}).catch(()=>{});return t?Je._fromGetAccountInfoResponse(this.auth,t,e):null}return Je._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new Qn(wt(Ku),e,s);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=r[0]||wt(Ku);const a=Qr(s,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let p;if(typeof f=="string"){const w=await _i(e,{idToken:f}).catch(()=>{});if(!w)break;p=await Je._fromGetAccountInfoResponse(e,w,f)}else p=Je._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=r.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Qn(i,e,s):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Qn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(nm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Zf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(rm(e))return"Blackberry";if(im(e))return"Webos";if(em(e))return"Safari";if((e.includes("chrome/")||tm(e))&&!e.includes("edge/"))return"Chrome";if(sm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Zf(n=De()){return/firefox\//i.test(n)}function em(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function tm(n=De()){return/crios\//i.test(n)}function nm(n=De()){return/iemobile/i.test(n)}function sm(n=De()){return/android/i.test(n)}function rm(n=De()){return/blackberry/i.test(n)}function im(n=De()){return/webos/i.test(n)}function lc(n=De()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function HT(n=De()){var e;return lc(n)&&!!((e=window.navigator)!=null&&e.standalone)}function zT(){return Yp()&&document.documentMode===10}function om(n=De()){return lc(n)||sm(n)||im(n)||rm(n)||/windows phone/i.test(n)||nm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(n,e=[]){let t;switch(n){case"Browser":t=Qu(De());break;case"Worker":t=`${Qu(De())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${as}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GT(n,e={}){return yt(n,"GET","/v2/passwordPolicy",Dt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT=6;class QT{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??KT,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,t,s,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Yu(this),this.idTokenSubscription=new Yu(this),this.beforeStateQueue=new WT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=wt(t)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await Qn.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await _i(this,{idToken:e}),s=await Je._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(ze(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(s=u.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ei(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=RT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(It(this));const t=e?fe(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(It(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(It(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(wt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await GT(this),t=new QT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new kn("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await jT(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&wt(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await Qn.create(this,[wt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,s,r);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=am(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&kT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Dn(n){return fe(n)}class Yu{constructor(e){this.auth=e,this.observer=null,this.addObserver=sg(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ji={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function JT(n){ji=n}function cm(n){return ji.loadJS(n)}function XT(){return ji.recaptchaEnterpriseScript}function ZT(){return ji.gapiScript}function eI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class tI{constructor(){this.enterprise=new nI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class nI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const sI="recaptcha-enterprise",lm="NO_RECAPTCHA";class rI{constructor(e){this.type=sI,this.auth=Dn(e)}async verify(e="verify",t=!1){async function s(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{MT(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new VT(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function r(i,a,c){const u=window.grecaptcha;zu(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(lm)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new tI().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{s(this.auth).then(c=>{if(!t&&zu(window.grecaptcha))r(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=XT();u.length!==0&&(u+=c),cm(u).then(()=>{r(c,i,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Ju(n,e,t,s=!1,r=!1){const i=new rI(n);let a;if(r)a=lm;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return s?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function fa(n,e,t,s,r){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Ju(n,e,t,t==="getOobCode");return s(n,a)}else return s(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Ju(n,e,t,t==="getOobCode");return s(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI(n,e){const t=An(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(Jt(i,e??{}))return r;et(r,"already-initialized")}return t.initialize({options:e})}function oI(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(wt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function aI(n,e,t){const s=Dn(n);F(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=um(e),{host:a,port:c}=cI(e),u=c===null?"":`:${c}`,d={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){F(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),F(Jt(d,s.config.emulator)&&Jt(f,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=d,s.emulatorConfig=f,s.settings.appVerificationDisabledForTesting=!0,rr(a)?Md(`${i}//${a}${u}`):lI()}function um(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function cI(n){const e=um(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Xu(s.substr(i.length+1))}}else{const[i,a]=s.split(":");return{host:i,port:Xu(a)}}}function Xu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function lI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return vt("not implemented")}_getIdTokenResponse(e){return vt("not implemented")}_linkToIdToken(e,t){return vt("not implemented")}_getReauthenticationResolver(e){return vt("not implemented")}}async function uI(n,e){return yt(n,"POST","/v1/accounts:update",e)}async function dI(n,e){return yt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hI(n,e){return dr(n,"POST","/v1/accounts:signInWithPassword",Dt(n,e))}async function fI(n,e){return yt(n,"POST","/v1/accounts:sendOobCode",Dt(n,e))}async function mI(n,e){return fI(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pI(n,e){return dr(n,"POST","/v1/accounts:signInWithEmailLink",Dt(n,e))}async function gI(n,e){return dr(n,"POST","/v1/accounts:signInWithEmailLink",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends uc{constructor(e,t,s,r=null){super("password",s),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new tr(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new tr(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return fa(e,t,"signInWithPassword",hI);case"emailLink":return pI(e,{email:this._email,oobCode:this._password});default:et(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return fa(e,s,"signUpPassword",dI);case"emailLink":return gI(e,{idToken:t,email:this._email,oobCode:this._password});default:et(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yn(n,e){return dr(n,"POST","/v1/accounts:signInWithIdp",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI="http://localhost";class In extends uc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new In(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):et("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=t;if(!s||!r)return null;const a=new In(s,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Yn(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,Yn(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yn(e,t)}buildRequest(){const e={requestUri:yI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=sr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _I(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function EI(n){const e=Ds(Ls(n)).link,t=e?Ds(Ls(e)).deep_link_id:null,s=Ds(Ls(n)).deep_link_id;return(s?Ds(Ls(s)).link:null)||s||t||e||n}class dc{constructor(e){const t=Ds(Ls(e)),s=t.apiKey??null,r=t.oobCode??null,i=_I(t.mode??null);F(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=EI(e);try{return new dc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(){this.providerId=Ln.PROVIDER_ID}static credential(e,t){return tr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=dc.parseLink(t);return F(s,"argument-error"),tr._fromEmailAndCode(e,s.code,s.tenantId)}}Ln.PROVIDER_ID="password";Ln.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ln.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends dm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends hr{constructor(){super("facebook.com")}static credential(e){return In._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends hr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return In._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Ut.credential(t,s)}catch{return null}}}Ut.GOOGLE_SIGN_IN_METHOD="google.com";Ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends hr{constructor(){super("github.com")}static credential(e){return In._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.GITHUB_SIGN_IN_METHOD="github.com";qt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends hr{constructor(){super("twitter.com")}static credential(e,t){return In._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return jt.credentialFromTaggedObject(e)}static credentialFromError(e){return jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return jt.credential(t,s)}catch{return null}}}jt.TWITTER_SIGN_IN_METHOD="twitter.com";jt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vI(n,e){return dr(n,"POST","/v1/accounts:signUp",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const i=await Je._fromIdTokenResponse(e,s,r),a=Zu(s);return new bn({user:i,providerId:a,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=Zu(s);return new bn({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function Zu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends tt{constructor(e,t,s,r){super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,vi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new vi(e,t,s,r)}}function hm(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?vi._fromErrorAndOperation(n,i,e,s):i})}async function wI(n,e,t=!1){const s=await ss(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return bn._forOperation(n,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fm(n,e,t=!1){const{auth:s}=n;if(ze(s.app))return Promise.reject(It(s));const r="reauthenticate";try{const i=await ss(n,hm(s,r,e,n),t);F(i.idToken,s,"internal-error");const a=cc(i.idToken);F(a,s,"internal-error");const{sub:c}=a;return F(n.uid===c,s,"user-mismatch"),bn._forOperation(n,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&et(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mm(n,e,t=!1){if(ze(n.app))return Promise.reject(It(n));const s="signIn",r=await hm(n,s,e),i=await bn._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(i.user),i}async function TI(n,e){return mm(Dn(n),e)}async function II(n,e){return fm(fe(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pm(n){const e=Dn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function bI(n,e,t){if(ze(n.app))return Promise.reject(It(n));const s=Dn(n),a=await fa(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",vI).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&pm(n),u}),c=await bn._fromIdTokenResponse(s,"signIn",a);return await s._updateCurrentUser(c.user),c}function kI(n,e,t){return ze(n.app)?Promise.reject(It(n)):TI(fe(n),Ln.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&pm(n),s})}async function gm(n,e){const t=fe(n),r={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:i}=await mI(t.auth,r);i!==n.email&&await n.reload()}function AI(n,e){return SI(fe(n),null,e)}async function SI(n,e,t){const{auth:s}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(i.password=t);const a=await ss(n,uI(s,i));await n._updateTokensIfNecessary(a,!0)}function RI(n,e,t,s){return fe(n).onIdTokenChanged(e,t,s)}function PI(n,e,t){return fe(n).beforeAuthStateChanged(e,t)}function CI(n,e,t,s){return fe(n).onAuthStateChanged(e,t,s)}function DI(n){return fe(n).signOut()}async function LI(n){return fe(n).delete()}const wi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(wi,"1"),this.storage.removeItem(wi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NI=1e3,VI=10;class _m extends ym{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=om(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const s=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(s);!t&&this.localCache[s]===a||this.notifyListeners(s,a)},i=this.storage.getItem(s);zT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,VI):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},NI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}_m.type="LOCAL";const MI=_m;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em extends ym{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Em.type="SESSION";const vm=Em;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OI(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new Hi(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await OI(c);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=hc("",20);r.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},s);a={messageChannel:r,onMessage(p){const w=p;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(w.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return window}function $I(n){dt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(){return typeof dt().WorkerGlobalScope<"u"&&typeof dt().importScripts=="function"}async function FI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function BI(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function UI(){return wm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm="firebaseLocalStorageDb",qI=1,Ti="firebaseLocalStorage",Im="fbase_key";class fr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function zi(n,e){return n.transaction([Ti],e?"readwrite":"readonly").objectStore(Ti)}function jI(){const n=indexedDB.deleteDatabase(Tm);return new fr(n).toPromise()}function ma(){const n=indexedDB.open(Tm,qI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(Ti,{keyPath:Im})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(Ti)?e(s):(s.close(),await jI(),e(await ma()))})})}async function ed(n,e,t){const s=zi(n,!0).put({[Im]:e,value:t});return new fr(s).toPromise()}async function HI(n,e){const t=zi(n,!1).get(e),s=await new fr(t).toPromise();return s===void 0?null:s.value}function td(n,e){const t=zi(n,!0).delete(e);return new fr(t).toPromise()}const zI=800,WI=3;class bm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ma(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>WI)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return wm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hi._getInstance(UI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await FI(),!this.activeServiceWorker)return;this.sender=new xI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||BI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ma();return await ed(e,wi,"1"),await td(e,wi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>ed(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>HI(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>td(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=zi(r,!1).getAll();return new fr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}bm.type="LOCAL";const GI=bm;new ur(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KI(n,e){return e?wt(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc extends uc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function QI(n){return mm(n.auth,new fc(n),n.bypassAuthState)}function YI(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),fm(t,new fc(n),n.bypassAuthState)}async function JI(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),wI(t,new fc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(e,t,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return QI;case"linkViaPopup":case"linkViaRedirect":return JI;case"reauthViaPopup":case"reauthViaRedirect":return YI;default:et(this.auth,"internal-error")}}resolve(e){Pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI=new ur(2e3,1e4);class Un extends km{constructor(e,t,s,r,i){super(e,t,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Un.currentPopupAction&&Un.currentPopupAction.cancel(),Un.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){Pt(this.filter.length===1,"Popup operations only handle one event");const e=hc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ut(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ut(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Un.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ut(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,XI.get())};e()}}Un.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI="pendingRedirect",Yr=new Map;class eb extends km{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Yr.get(this.auth._key());if(!e){try{const s=await tb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Yr.set(this.auth._key(),e)}return this.bypassAuthState||Yr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tb(n,e){const t=rb(e),s=sb(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function nb(n,e){Yr.set(n._key(),e)}function sb(n){return wt(n._redirectPersistence)}function rb(n){return Qr(ZI,n.config.apiKey,n.name)}async function ib(n,e,t=!1){if(ze(n.app))return Promise.reject(It(n));const s=Dn(n),r=KI(s,e),a=await new eb(s,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await s._persistUserIfCurrent(a.user),await s._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ob=10*60*1e3;class ab{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Am(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(ut(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ob&&this.cachedEventUids.clear(),this.cachedEventUids.has(nd(e))}saveEventToCache(e){this.cachedEventUids.add(nd(e)),this.lastProcessedEventTime=Date.now()}}function nd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Am({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Am(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lb(n,e={}){return yt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,db=/^https?/;async function hb(n){if(n.config.emulator)return;const{authorizedDomains:e}=await lb(n);for(const t of e)try{if(fb(t))return}catch{}et(n,"unauthorized-domain")}function fb(n){const e=da(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===s}if(!db.test(t))return!1;if(ub.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb=new ur(3e4,6e4);function sd(){const n=dt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pb(n){return new Promise((e,t)=>{var r,i,a;function s(){sd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{sd(),t(ut(n,"network-request-failed"))},timeout:mb.get()})}if((i=(r=dt().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=dt().gapi)!=null&&a.load)s();else{const c=eI("iframefcb");return dt()[c]=()=>{gapi.load?s():t(ut(n,"network-request-failed"))},cm(`${ZT()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Jr=null,e})}let Jr=null;function gb(n){return Jr=Jr||pb(n),Jr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yb=new ur(5e3,15e3),_b="__/auth/iframe",Eb="emulator/auth/iframe",vb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Tb(n){const e=n.config;F(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ac(e,Eb):`https://${n.config.authDomain}/${_b}`,s={apiKey:e.apiKey,appName:n.name,v:as},r=wb.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${t}?${sr(s).slice(1)}`}async function Ib(n){const e=await gb(n),t=dt().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:Tb(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vb,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const a=ut(n,"network-request-failed"),c=dt().setTimeout(()=>{i(a)},yb.get());function u(){dt().clearTimeout(c),r(s)}s.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},kb=500,Ab=600,Sb="_blank",Rb="http://localhost";class rd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Pb(n,e,t,s=kb,r=Ab){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const u={...bb,width:s.toString(),height:r.toString(),top:i,left:a},d=De().toLowerCase();t&&(c=tm(d)?Sb:t),Zf(d)&&(e=e||Rb,u.scrollbars="yes");const f=Object.entries(u).reduce((w,[A,C])=>`${w}${A}=${C},`,"");if(HT(d)&&c!=="_self")return Cb(e||"",c),new rd(null);const p=window.open(e||"",c,f);F(p,n,"popup-blocked");try{p.focus()}catch{}return new rd(p)}function Cb(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Db="__/auth/handler",Lb="emulator/auth/handler",Nb=encodeURIComponent("fac");async function id(n,e,t,s,r,i){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:as,eventId:r};if(e instanceof dm){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ng(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof hr){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${Nb}=${encodeURIComponent(u)}`:"";return`${Vb(n)}?${sr(c).slice(1)}${d}`}function Vb({config:n}){return n.emulator?ac(n,Lb):`https://${n.authDomain}/${Db}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo="webStorageSupport";class Mb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vm,this._completeRedirectFn=ib,this._overrideRedirectResult=nb}async _openPopup(e,t,s,r){var a;Pt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await id(e,t,s,da(),r);return Pb(e,i,hc())}async _openRedirect(e,t,s,r){await this._originValidation(e);const i=await id(e,t,s,da(),r);return $I(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(Pt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Ib(e),s=new ab(e);return t.register("authEvent",r=>(F(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Oo,{type:Oo},r=>{var a;const i=(a=r==null?void 0:r[0])==null?void 0:a[Oo];i!==void 0&&t(!!i),et(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return om()||em()||lc()}}const Ob=Mb;var od="@firebase/auth",ad="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $b(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Fb(n){ht(new Ze("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=s.options;F(a&&!a.includes(":"),"invalid-api-key",{appName:s.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:am(n)},d=new YT(s,r,i,u);return oI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),ht(new Ze("auth-internal",e=>{const t=Dn(e.getProvider("auth").getImmediate());return(s=>new xb(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ke(od,ad,$b(n)),Ke(od,ad,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bb=5*60,Ub=Dd("authIdTokenMaxAge")||Bb;let cd=null;const qb=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Ub)return;const r=t==null?void 0:t.token;cd!==r&&(cd=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function jb(n=Ta()){const e=An(n,"auth");if(e.isInitialized())return e.getImmediate();const t=iI(n,{popupRedirectResolver:Ob,persistence:[GI,MI,vm]}),s=Dd("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const a=qb(i.toString());PI(t,a,()=>a(t.currentUser)),RI(t,c=>a(c))}}const r=Pd("auth");return r&&aI(t,`http://${r}`),t}function Hb(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}JT({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const i=ut("internal-error");i.customData=r,t(i)},s.type="text/javascript",s.charset="UTF-8",Hb().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Fb("Browser");const qe=jb(rc),zb=n=>CI(qe,n),Wb=(n,e)=>kI(qe,n,e),Gb=async(n,e)=>{const t=await bI(qe,n,e);try{await wf(df(Hf,"users",t.user.uid,"data","profile"),{emailVerified:!1},{merge:!0})}catch(s){console.warn("[Auth] Could not init Firestore profile:",s.message)}return await gm(t.user),console.log(`[Auth] ✉️  Firebase verification email sent to ${n}`),t},Kb=async()=>{const n=qe.currentUser;if(!n)throw new Error("No user signed in.");await gm(n),console.log(`[Auth] ✉️  Verification email resent to ${n.email}`)},Sm=()=>DI(qe),Rm=async n=>{const e=qe.currentUser;if(!e||!e.email)throw new Error("No user is currently signed in.");const t=Ln.credential(e.email,n);await II(e,t)},Qb=async(n,e)=>{await Rm(n),await AI(qe.currentUser,e)},Yb=async n=>{await Rm(n),await LI(qe.currentUser)};let te=null,nr="signin";function pa(){te||(te=document.createElement("div"),te.id="auth-screen",te.innerHTML=Xb("signin"),document.body.appendChild(te),Cm())}function ld(){te&&(te.remove(),te=null)}function Jb(){te||pa(),Xr("verify-email")}function Xb(n){return`
    <div class="auth-card" role="dialog" aria-modal="true" aria-label="Sign in to EveryDay">
      <div class="auth-brand">
        <div class="auth-brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <span class="auth-brand-name">EveryDay</span>
      </div>

      ${Pm(n)}
    </div>
  `}function Pm(n){var t;if(n==="verify-email")return`
      <div class="auth-verify-state" id="auth-mode-content">
        <div class="auth-verify-icon">📬</div>
        <h2 class="auth-title">Check your inbox</h2>
        <p class="auth-subtitle">
          We sent a verification link to<br>
          <strong>${((t=qe.currentUser)==null?void 0:t.email)||"your email"}</strong>
        </p>
        <p class="auth-verify-hint">Click the link in the email, then come back and press Continue.</p>

        <button class="auth-btn auth-btn--primary" id="auth-verified-btn">
          ✓ I've verified — Continue
        </button>

        <div class="auth-divider"><span>or</span></div>

        <button class="auth-btn auth-btn-ghost" id="auth-resend-btn">
          Resend verification email
        </button>
        <button class="auth-btn auth-btn-ghost auth-btn-sm" id="auth-back-signin-btn">
          ← Back to Sign In
        </button>

        <p class="auth-error" id="auth-error" hidden></p>
      </div>
    `;const e=n==="signup";return`
    <div id="auth-mode-content">
      <h2 class="auth-title">${e?"Create account":"Welcome back"}</h2>
      <p class="auth-subtitle">${e?"Start your discipline journey.":"Sign in to continue."}</p>

      <form class="auth-form" id="auth-form" novalidate>
        <div class="auth-field">
          <label class="auth-label" for="auth-email">Email</label>
          <input class="auth-input" id="auth-email" type="email"
                 placeholder="you@example.com" autocomplete="email" required />
        </div>

        <div class="auth-field">
          <label class="auth-label" for="auth-password">Password</label>
          <input class="auth-input" id="auth-password" type="password"
                 placeholder="${e?"Create a password (min. 6 chars)":"Your password"}"
                 autocomplete="${e?"new-password":"current-password"}" required />
        </div>

        <p class="auth-error" id="auth-error" hidden></p>

        <button class="auth-btn auth-btn--primary" id="auth-submit-btn" type="submit">
          ${e?"Create Account":"Sign In"}
        </button>
      </form>

      <div class="auth-mode-switch">
        ${e?'<span class="auth-mode-switch-text">Already have an account?</span> <button class="auth-mode-switch-btn" id="auth-mode-toggle">Sign In</button>':'<span class="auth-mode-switch-text">No account?</span> <button class="auth-mode-switch-btn" id="auth-mode-toggle">Create one</button>'}
      </div>
    </div>
  `}function Xr(n){nr=n;const e=te==null?void 0:te.querySelector(".auth-card");if(!e)return;const t=e.querySelector("#auth-mode-content");t&&t.remove(),e.insertAdjacentHTML("beforeend",Pm(n)),Cm()}function Cm(){var n,e,t,s,r;te&&((n=te.querySelector("#auth-mode-toggle"))==null||n.addEventListener("click",()=>{Xr(nr==="signin"?"signup":"signin")}),(e=te.querySelector("#auth-form"))==null||e.addEventListener("submit",async i=>{var u,d;i.preventDefault();const a=(u=te.querySelector("#auth-email"))==null?void 0:u.value.trim(),c=(d=te.querySelector("#auth-password"))==null?void 0:d.value;if(!(!a||!c)){Ps(!0),xo();try{nr==="signup"?(await Gb(a,c),Xr("verify-email")):await Wb(a,c)}catch(f){Cs(Zb(f.code))}finally{Ps(!1)}}}),(t=te.querySelector("#auth-verified-btn"))==null||t.addEventListener("click",async()=>{var i;Ps(!0),xo();try{const a=qe.currentUser;if(!a)throw new Error("Session expired. Please sign in again.");if(await a.reload(),(i=qe.currentUser)!=null&&i.emailVerified){try{await me({emailVerified:!0,verificationToken:null,tokenCreatedAt:null})}catch{}window.location.reload()}else Cs("Email not verified yet. Please click the link in your inbox (check spam too)."),Ps(!1)}catch(a){Cs(a.message||"Something went wrong. Please try again."),Ps(!1)}}),(s=te.querySelector("#auth-resend-btn"))==null||s.addEventListener("click",async()=>{xo();try{await Kb(),Cs("✅ Verification email sent! Check your inbox (and spam folder).")}catch(i){Cs("Failed to resend: "+(i.message||"Unknown error"))}}),(r=te.querySelector("#auth-back-signin-btn"))==null||r.addEventListener("click",async()=>{await Sm(),Xr("signin")}))}function Ps(n){const e=te==null?void 0:te.querySelector("#auth-submit-btn, #auth-verified-btn");e&&(e.disabled=n,e.textContent=n?"Please wait…":nr==="signup"?"Create Account":nr==="verify-email"?"✓ I've verified — Continue":"Sign In")}function Cs(n){const e=te==null?void 0:te.querySelector("#auth-error");e&&(e.textContent=n,e.hidden=!1)}function xo(){const n=te==null?void 0:te.querySelector("#auth-error");n&&(n.hidden=!0)}function Zb(n){return{"auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/invalid-credential":"Incorrect email or password.","auth/email-already-in-use":"An account with this email already exists.","auth/weak-password":"Password must be at least 6 characters.","auth/invalid-email":"Please enter a valid email address.","auth/too-many-requests":"Too many attempts. Please try again later."}[n]||"Something went wrong. Please try again."}const se=[{id:"morning",name:"Morning Block",icon:"🌅",time:"04:00 – 08:00",color:"linear-gradient(90deg, #f59e0b, #fbbf24)",tasks:[{id:"morning-1",label:"Wake up at 4AM",isCore:!0},{id:"morning-2",label:"Drink 100ml of Hot water",isCore:!0},{id:"morning-3",label:"Meditation for 15 minutes",isCore:!0},{id:"morning-4",label:"Exercise / Physical Movements",isCore:!0},{id:"morning-5",label:"@5:45AM - Walking / Jogging",isCore:!1},{id:"morning-6",label:"Face massage with Ice",isCore:!1},{id:"morning-7",label:"Fresh up Bathing & Get ready",isCore:!0}]},{id:"work1",name:"Work Block 1 — Resume & Job",icon:"🎯",time:"08:15 – 09:20",color:"linear-gradient(90deg, #7c3aed, #9d64f8)",tasks:[{id:"work1-1",label:"Temple",isCore:!1},{id:"work1-2",label:"Ragi Malt",isCore:!0},{id:"work1-3",label:"Resume polish / update",isCore:!0},{id:"work1-4",label:"Apply to job (10+)",isCore:!0},{id:"work1-5",label:"Breakfast (little)",isCore:!1}]},{id:"work2",name:"Work Block 2 — Chttrix",icon:"🏆",time:"09:30 – 12:30",color:"linear-gradient(90deg, #06b6d4, #22d3ee)",tasks:[{id:"work2-1",label:"Implement planned feature",isCore:!0},{id:"work2-2",label:"Fix known bugs / issues",isCore:!0},{id:"work2-3",label:"Code review & clean-up",isCore:!1},{id:"work2-4",label:"Document progress",isCore:!1}]},{id:"work3",name:"Work Block 3 — DSA / CS",icon:"🧩",time:"12:30 – 17:30",color:"linear-gradient(90deg, #10b981, #34d399)",tasks:[{id:"work3-1",label:"Sprint or body movement exercise",isCore:!0},{id:"work3-2",label:"Lunch",isCore:!1},{id:"work3-3",label:"Solve DSA problem (LeetCode)",isCore:!0},{id:"work3-4",label:"CS fundamentals and About Internet",isCore:!0}]},{id:"evening",name:"Evening Block",icon:"🌆",time:"17:30 – 20:00",color:"linear-gradient(90deg, #f43f5e, #fb7185)",tasks:[{id:"evening-1",label:"Video Record: Communication practice (spoken)",isCore:!0},{id:"evening-2",label:"Walk / Book Reading: Chapter wise",isCore:!0},{id:"evening-3",label:"Low-intensity movement - push-ups",isCore:!1},{id:"evening-4",label:"Shower Bath",isCore:!1},{id:"evening-5",label:"Dinner and short walk",isCore:!1},{id:"evening-6",label:"Meditation for 15 minutes",isCore:!0}]},{id:"night",name:"Night Block — AI / Deep Work",icon:"🌙",time:"20:00 – 22:00",color:"linear-gradient(90deg, #4f46e5, #7c3aed)",tasks:[{id:"night-1",label:"AI / LLM project exploration",isCore:!0},{id:"night-2",label:"Deep reading / research",isCore:!1},{id:"night-3",label:"Machine Learning",isCore:!0},{id:"night-4",label:"Everyday App work 💪",isCore:!1}]}],Wi=[{id:"stabilization",name:"Stabilization",emoji:"🌱",number:"Phase 1",color:"#06b6d4",gradient:"linear-gradient(135deg, #06b6d4, #0891b2)",intensity:40,description:"You're building the foundation. Consistency is more important than volume. Show up every single day, even imperfectly. The goal is to make execution a reflex.",hints:["Focus on core tasks only — don't overload","Missing a day is okay. Two in a row is the enemy.","Effort matters more than output right now","Morning routine is non-negotiable"]},{id:"control",name:"Control",emoji:"🎯",number:"Phase 2",color:"#7c3aed",gradient:"linear-gradient(135deg, #7c3aed, #5b21b6)",intensity:60,description:"You have the habit. Now sharpen the execution. You're in control of your blocks — no longer reactive. Track quality, not just completion.",hints:["Start eliminating low-impact tasks","Block external distractions during work blocks","Push your DSA difficulty one level up","Begin tracking your productivity patterns"]},{id:"intensity",name:"Intensity",emoji:"⚡",number:"Phase 3",color:"#f59e0b",gradient:"linear-gradient(135deg, #f59e0b, #d97706)",intensity:85,description:"You're no longer building discipline — you're deploying it. This phase is about maximum output, deliberate practice, and pushing hard every single day.",hints:["All tasks, no excuses — minimum mode rarely used","Increase workout intensity significantly","Apply to more jobs, build in public","Deep work blocks are sacred — protect them"]},{id:"expansion",name:"Expansion",emoji:"🌊",number:"Phase 4",color:"#10b981",gradient:"linear-gradient(135deg, #10b981, #059669)",intensity:100,description:"You've earned this. Your system is solid. Now you expand — new domains, higher standards, compound growth. This isn't about survival anymore. It's about dominance.",hints:["Add new learning tracks beyond current blocks","Mentor others or build in public consistently","Chttrix should be shipping features weekly","Your morning block should feel automatic"]}];function ud(n){const[e,t]=(n||"00:00").split(":").map(Number);return e*60+t}function Ct(n){const e=(n.time||"").split(/\s*[–-]\s*/);return{startMin:ud((e[0]||"00:00").trim()),endMin:ud((e[1]||"00:00").trim())}}function Dm(){const n=new Date;return n.getHours()*60+n.getMinutes()}function ek(n){const{endMin:e}=Ct(n),t=new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds(),s=e*60;return Math.max(0,s-t)}function tk(n){const{startMin:e}=Ct(n),t=new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds(),s=e*60;return Math.max(0,s-t)}function pt(n){const{startMin:e,endMin:t}=Ct(n),s=Dm();return s<e?"upcoming":s<t?"active":"past"}function mc(n){const{endMin:e}=Ct(n);return!(Dm()<e)}function dd(n){if(n<=0)return"DONE";const e=Math.floor(n/3600),t=Math.floor(n%3600/60),s=n%60;return e>0?`${e}h ${String(t).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`:t>0?`${t}m ${String(s).padStart(2,"0")}s`:`${s}s`}let $o=null;function nk(){$o&&clearInterval($o),hd(),$o=setInterval(hd,1e3)}function hd(){se.forEach(n=>{const e=pt(n),t=mc(n),s=document.getElementById(`block-cd-${n.id}`);if(s)if(e==="upcoming"){const i=tk(n);s.textContent=`Starts in ${dd(i)}`,s.className="block-countdown countdown-upcoming"}else if(e==="active"){const i=ek(n);s.textContent=`${dd(i)} left`,s.className="block-countdown countdown-active"}else s.textContent="Mark tasks ✎",s.className="block-countdown countdown-done";n.tasks.forEach(i=>{const a=document.getElementById(`task-${i.id}`);a&&(t?(a.classList.remove("task-locked"),a.removeAttribute("data-locked")):(a.classList.add("task-locked"),a.setAttribute("data-locked","true")))});const r=document.getElementById(`block-card-${n.id}`);r&&(r.classList.remove("block-status-upcoming","block-status-active","block-status-past","block-status-locked"),r.classList.add(`block-status-${e}`))})}let qn=null,bt=null,sk=document.title,gn={start:!1,mid:!1},pc=null;function Lm(n){const e=se.find(c=>c.id===n);if(!e)return;pc=n,S.focusBlock=n,gn={start:!1,mid:!1},uk();const t=document.getElementById("focus-overlay"),s=document.getElementById("focus-block-title"),r=document.getElementById("focus-tasks");s.textContent=`${e.icon} ${e.name}`,mc(e);const i=pt(e),a=i==="upcoming"||i==="active";r.innerHTML=e.tasks.map(c=>{const u=!!S.tasks[c.id];return`
      <div class="task-item${u?" done":""}${a?" task-locked":""}"
           id="focus-task-${c.id}"
           data-task="${c.id}"
           role="checkbox"
           aria-checked="${u}"
           tabindex="0">
        <div class="custom-checkbox"></div>
        <span class="task-label">${c.label}</span>
        ${a?'<span class="task-lock-icon" title="Mark tasks after block ends">🔒</span>':""}
      </div>
    `}).join(""),r.querySelectorAll(".task-item").forEach(c=>{const u=async()=>{await xs(c.dataset.task);const d=document.getElementById(`focus-task-${c.dataset.task}`);d&&(d.classList.toggle("done",!!S.tasks[c.dataset.task]),d.setAttribute("aria-checked",!!S.tasks[c.dataset.task]))};c.addEventListener("click",u),c.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),u())})}),ik(e),lk(),ak(e),t.hidden=!1,document.body.style.overflow="hidden",document.addEventListener("keydown",Nm),ya(`${e.icon} Focus Mode — ${e.name}`,`Block runs until ${Vm(e)}. Stay locked in. 🎯`,"start")}function ga(){const n=document.getElementById("focus-overlay");n.hidden=!0,document.body.style.overflow="",rk()}function rk(){clearInterval(qn),qn=null,bt&&(bt.release().catch(()=>{}),bt=null),document.title=sk,document.removeEventListener("keydown",Nm),S.focusBlock=null,pc=null}function ik(n){const{startMin:e,endMin:t}=Ct(n),s=pt(n),r=new Date,i=Vm(n),a=Mm(e),c=(t-e)*60;let u;if(s==="past")u=0;else{const f=new Date(r);f.setHours(Math.floor(t/60),t%60,0,0),u=Math.max(0,Math.floor((f-r)/1e3))}S.timerSeconds=u,S.timerTotalSeconds=c||1;const d=Math.min(100,(c-u)/c*100);ok(n,u,i,a,d)}function ok(n,e,t,s="Start",r=0){const i=document.getElementById("focus-timer-wrap");if(!i)return;const a=pt(n)==="past",c=a?100:r;i.innerHTML=`
    <div class="fm-countdown-block">

      <!-- End time pill -->
      <div class="fm-end-pill">
        ${a?'<span class="fm-done-chip">✅ Block ended</span>':`<span class="fm-end-chip">🏁 Ends at <strong>${t}</strong></span>`}
      </div>

      <!-- Big countdown digits -->
      <div class="fm-timer-display">
        <div id="focus-timer" class="fm-timer-digits ${a?"fm-timer-done":""}">${Zr(e)}</div>
        <div class="fm-timer-label">${a?"session ended":"remaining"}</div>
      </div>

      <!-- Progress bar: grows left→right as block elapses -->
      <div class="fm-bar-wrap">
        <div class="fm-bar-track">
          <div id="focus-progress-bar" class="fm-bar-fill" style="width:${c.toFixed(1)}%"></div>
        </div>
        <div class="fm-bar-labels">
          <span class="fm-bar-start">${s}</span>
          <span class="fm-bar-end">${t}</span>
        </div>
      </div>

      <!-- DND badge -->
      <div class="fm-dnd-badge ${a?"fm-dnd-done":""}">
        ${a?"🎉 Mark your tasks above!":"🔕 Focus Active — Do Not Disturb"}
      </div>

    </div>
  `}function ak(n){clearInterval(qn),qn=setInterval(()=>{const{endMin:e}=Ct(n),t=new Date,s=new Date(t);s.setHours(Math.floor(e/60),e%60,0,0);const r=Math.max(0,Math.floor((s-t)/1e3));S.timerSeconds=r;const i=document.getElementById("focus-timer");if(i&&(i.textContent=Zr(r)),ck(),pc&&(document.title=`${n.icon} ${Zr(r)} — ${n.name}`),!gn.mid&&S.timerTotalSeconds>0&&1-r/S.timerTotalSeconds>=.5&&(ya(`${n.icon} Halfway there — ${n.name}`,`${Zr(r)} remaining in your focus block. Keep going! 💪`,"mid"),gn.mid=!0),r===0&&!gn.end){gn.end=!0,clearInterval(qn),qn=null;const a=document.querySelector(".fm-dnd-badge");a&&(a.classList.add("fm-dnd-done"),a.textContent="🎉 Block complete — mark your tasks!");const c=document.querySelector(".fm-block-end-label");c&&(c.innerHTML='<span class="fm-done-label">✅ Block time ended — mark tasks above</span>'),bt&&(bt.release().catch(()=>{}),bt=null),document.title=`✅ Done — ${n.name}`,ya(`⏰ Block complete — ${n.name}`,"Time's up! Head to your dashboard to mark your tasks. 📋","end"),H(`⏰ ${n.name} is complete! Mark your tasks.`,"success")}},1e3)}function ck(){const n=document.getElementById("focus-progress-bar");if(!n||S.timerTotalSeconds<=0)return;const e=S.timerTotalSeconds-S.timerSeconds,t=Math.min(100,Math.max(0,e/S.timerTotalSeconds*100));n.style.width=t.toFixed(2)+"%";const s=100-t;s<10?n.style.background="linear-gradient(90deg, #7c3aed, #f43f5e)":s<25?n.style.background="linear-gradient(90deg, #7c3aed, #f59e0b)":n.style.background=""}async function lk(){if("wakeLock"in navigator)try{bt=await navigator.wakeLock.request("screen"),document.addEventListener("visibilitychange",async()=>{if(bt!==null&&document.visibilityState==="visible")try{bt=await navigator.wakeLock.request("screen")}catch{}},{once:!0})}catch{}}async function uk(){"Notification"in window&&Notification.permission==="default"&&await Notification.requestPermission()}function ya(n,e,t){if("Notification"in window&&Notification.permission==="granted"&&!(t&&gn[t]))try{const s=new Notification(n,{body:e,icon:"/favicon.ico",badge:"/favicon.ico",tag:`everyday-focus-${t}`,silent:!1});s.onclick=()=>{window.focus(),s.close()},setTimeout(()=>s.close(),8e3),t&&(gn[t]=!0)}catch{}}function Nm(n){n.key==="Escape"&&(n.preventDefault(),ga())}function Zr(n){if(n<=0)return"00:00";const e=Math.floor(n/3600),t=Math.floor(n%3600/60),s=n%60;return e>0?`${e}:${t.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`:`${t.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}function Vm(n){const{endMin:e}=Ct(n);return Mm(e)}function Mm(n){const e=Math.floor(n/60),t=n%60,s=e<12?"AM":"PM";return`${e%12||12}:${t.toString().padStart(2,"0")} ${s}`}function dk(){}function Om(n){return X("taskDescs",{})[n]||""}function _a(n,e){const t={...X("taskDescs",{})};e&&e.trim()?t[n]=e.trim():delete t[n],me({taskDescs:t}).catch(s=>console.warn("[EveryDay] taskDescs sync failed:",s.message))}function fd(n){const[e,t]=(n||"00:00").trim().split(":");let s=parseInt(e,10);const r=t||"00",i=s>=12?"PM":"AM";return s=s%12||12,`${s}:${r} ${i}`}function hk(n){const e=(n||"").split(/\s*[–-]\s*/);return e.length<2?n:`${fd(e[0])} – ${fd(e[1])}`}function mr(){let n=0,e=0;se.forEach(s=>{s.tasks.forEach(r=>{S.minimumMode&&!r.isCore||(r.subTasks&&r.subTasks.length>0?r.subTasks.forEach(i=>{const a=i.weight||1;n+=a,S.tasks[i.id]&&(e+=a)}):(n+=1,S.tasks[r.id]&&(e+=1)))})});const t=n>0?Math.round(e/n*100):0;return{total:Math.ceil(n),done:Math.round(e),pct:t}}function gc(n){let e=0,t=0;n.tasks.forEach(r=>{S.minimumMode&&!r.isCore||(r.subTasks&&r.subTasks.length>0?r.subTasks.forEach(i=>{const a=i.weight||1;e+=a,S.tasks[i.id]&&(t+=a)}):(e+=1,S.tasks[r.id]&&(t+=1)))});const s=e>0?Math.round(t/e*100):0;return{total:Math.ceil(e),done:Math.round(t),pct:s}}function Gi(){const n=document.getElementById("blocks-grid");n&&(n.innerHTML="",se.forEach(e=>{const{done:t,total:s,pct:r}=gc(e),i=s>0&&t===s,a=document.createElement("div");a.className=`block-card${i?" completed":""}`,a.id=`block-card-${e.id}`;const c=pt(e);a.classList.add(`block-status-${c}`),a.innerHTML=`
      <div class="block-header" id="block-header-${e.id}"
           role="button" aria-expanded="false"
           aria-controls="block-body-${e.id}" tabindex="0">
        <div class="block-header-left">
          <div class="block-icon">${e.icon}</div>
          <div class="block-info">
            <div class="block-name">${e.name}</div>
            <div class="block-time">${hk(e.time)}</div>
          </div>
        </div>
        <div class="block-header-right">
          <div class="block-header-meta">
            <span class="block-countdown" id="block-cd-${e.id}">—</span>
            <span class="block-pct">${r}%</span>
          </div>
          <svg class="block-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      <div class="block-progress">
        <div class="block-progress-fill" style="width: ${r}%; background: ${e.color}"></div>
      </div>
      <div class="block-body" id="block-body-${e.id}">
        <div class="block-inner">
          <div class="task-list" id="task-list-${e.id}">
            ${fk(e)}
          </div>
          <button class="block-focus-btn" data-block="${e.id}"
                  aria-label="Enter focus mode for ${e.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            Focus Mode
          </button>
        </div>
      </div>
    `,a.style.setProperty("--block-color",e.color),n.appendChild(a)}),mk(),S.expandedBlocks.forEach(e=>{const t=document.getElementById(`block-card-${e}`),s=document.getElementById(`block-header-${e}`);t&&t.classList.add("expanded"),s&&s.setAttribute("aria-expanded","true")}),window.dispatchEvent(new CustomEvent("everyday:blocksRendered")))}function fk(n){const e=pt(n),t=e==="upcoming"||e==="active";return n.tasks.map(s=>{const r=!!S.tasks[s.id],i=S.minimumMode&&!s.isCore,a=s.isCore?'<span class="task-badge badge-min">Essential</span>':"",c=t?`<span class="task-lock-icon" title="${e==="upcoming"?"Block hasn't started yet":"Mark after block ends"}">🔒</span>`:"",u=t?" task-locked":"",d=Om(s.id),f=`<button class="task-desc-btn${d?" has-desc":""}"
      data-task="${s.id}"
      title="${d?"Edit description":"Add description"}"
      aria-label="Task description"
      tabindex="0">ℹ</button>`,p=`
      <div class="task-desc-panel" id="desc-${s.id}" hidden>
        <textarea class="task-desc-textarea" id="desc-ta-${s.id}"
          placeholder="Write the essence… e.g. First 5 mins breathing, next 5 mins focus…"
          rows="3">${d}</textarea>
        <div class="task-desc-actions">
          <span class="task-desc-hint">Auto-saves as you type</span>
          <button class="task-desc-clear-btn" data-task="${s.id}">Clear</button>
        </div>
      </div>`;let w="";if(s.subTasks&&s.subTasks.length>0){const A=s.subTasks.map(C=>{const N=!!S.tasks[C.id];return`
          <div class="subtask-item${N?" done":""}${t?" task-locked":""}"
               id="task-${C.id}"
               data-task="${C.id}"
               role="checkbox"
               aria-checked="${N}"
               tabindex="0">
            <div class="custom-checkbox subtask-checkbox"></div>
            <span class="task-label subtask-label">${C.label}</span>
            <span class="subtask-weight">${C.weight||1}pts</span>
          </div>`}).join("");w=`<div class="subtask-list" id="subtasks-${s.id}">${A}</div>`}return`
      <div class="task-item-wrapper" id="task-wrapper-${s.id}"
           style="${i?"display:none":""}">
        <div class="task-item${r?" done":""}${u}"
             id="task-${s.id}"
             data-task="${s.id}"
             data-locked="${t}"
             role="checkbox"
             aria-checked="${r}"
             tabindex="0">
          <div class="custom-checkbox"></div>
          <span class="task-label">${s.label}</span>
          ${a}
          ${f}
          ${c}
        </div>
        ${p}
        ${w}
      </div>`}).join("")}function mk(){document.querySelectorAll(".block-header").forEach(n=>{const e=n.id.replace("block-header-","");n.addEventListener("click",()=>md(e)),n.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),md(e))})}),document.querySelectorAll(".task-item").forEach(n=>{n.addEventListener("click",e=>{e.target.closest(".task-desc-btn")||xs(n.dataset.task)}),n.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),xs(n.dataset.task))})}),document.querySelectorAll(".subtask-item").forEach(n=>{n.addEventListener("click",()=>xs(n.dataset.task)),n.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),xs(n.dataset.task))})}),document.querySelectorAll(".task-desc-btn").forEach(n=>{n.addEventListener("click",e=>{var i;e.stopPropagation();const t=n.dataset.task,s=document.getElementById(`desc-${t}`);if(!s)return;const r=s.hidden;s.hidden=!r,n.classList.toggle("desc-btn-active",r),r&&((i=document.getElementById(`desc-ta-${t}`))==null||i.focus())})}),document.querySelectorAll(".task-desc-textarea").forEach(n=>{const e=n.id.replace("desc-ta-","");n.addEventListener("input",()=>{_a(e,n.value);const t=document.querySelector(`.task-desc-btn[data-task="${e}"]`);t&&t.classList.toggle("has-desc",n.value.trim().length>0)}),n.addEventListener("click",t=>t.stopPropagation())}),document.querySelectorAll(".task-desc-clear-btn").forEach(n=>{n.addEventListener("click",e=>{e.stopPropagation();const t=n.dataset.task;_a(t,"");const s=document.getElementById(`desc-ta-${t}`);s&&(s.value="");const r=document.querySelector(`.task-desc-btn[data-task="${t}"]`);r&&r.classList.remove("has-desc"),H("Description cleared","success")})}),document.querySelectorAll(".block-focus-btn").forEach(n=>{n.addEventListener("click",e=>{e.stopPropagation(),Lm(n.dataset.block)})})}function md(n){const e=document.getElementById(`block-card-${n}`),t=document.getElementById(`block-header-${n}`);if(!e||!t)return;const r=!e.classList.contains("expanded");e.classList.toggle("expanded",r),t.setAttribute("aria-expanded",String(r)),r?S.expandedBlocks.add(n):S.expandedBlocks.delete(n)}async function xs(n){const e=se.find(d=>d.tasks.some(f=>f.id===n||f.subTasks&&f.subTasks.some(p=>p.id===n)));if(e&&!mc(e)){if(pt(e)==="upcoming"){const{startMin:f}=Ct(e),p=Math.floor(f/60)%12||12,w=(f%60).toString().padStart(2,"0"),A=f<720?"AM":"PM";H(`🔒 Block hasn't started yet. Begins at ${p}:${w} ${A}`,"error")}else{const{endMin:f}=Ct(e),p=Math.floor(f/60)%12||12,w=(f%60).toString().padStart(2,"0"),A=f<720?"AM":"PM";H(`⏳ Block in progress — mark tasks after ${p}:${w} ${A}`,"error")}return}if(S.eodLocked){H("🔒 Day locked after reflection. Unlocks at 4:00 AM.","error");return}const t=e==null?void 0:e.tasks.find(d=>d.id===n),s=!!t,r=s?null:e==null?void 0:e.tasks.find(d=>d.subTasks&&d.subTasks.some(f=>f.id===n)),i=!S.tasks[n];S.tasks[n]=i;const a=document.getElementById(`task-${n}`);a&&(a.classList.toggle("done",i),a.setAttribute("aria-checked",i));const c=[];if(s&&t.subTasks&&t.subTasks.length>0)for(const d of t.subTasks){S.tasks[d.id]=i;const f=document.getElementById(`task-${d.id}`);f&&(f.classList.toggle("done",i),f.setAttribute("aria-checked",i)),c.push({id:d.id,val:i})}else if(!s&&r){const d=r.subTasks.every(p=>!!S.tasks[p.id]);S.tasks[r.id]=d;const f=document.getElementById(`task-${r.id}`);f&&(f.classList.toggle("done",d),f.setAttribute("aria-checked",d)),c.push({id:r.id,val:d})}e&&Ea(e),rs(),i&&(a==null||a.animate([{transform:"scale(1)"},{transform:"scale(1.03)"},{transform:"scale(1)"}],{duration:200,easing:"ease-out"}));const u=()=>{S.tasks[n]=!i,a&&(a.classList.toggle("done",!i),a.setAttribute("aria-checked",!i));for(const{id:d,val:f}of c){S.tasks[d]=!f;const p=document.getElementById(`task-${d}`);p&&(p.classList.toggle("done",!f),p.setAttribute("aria-checked",!f))}e&&Ea(e),rs(),H("⚠️ Failed to save — check server connection","error")};try{await xe.tasks.toggle(n,i);for(const{id:d,val:f}of c)try{await xe.tasks.toggle(d,f)}catch{}}catch{u()}}function Ea(n){const{done:e,total:t,pct:s}=gc(n),r=document.getElementById(`block-card-${n.id}`);if(!r)return;const i=r.querySelector(".block-pct");i&&(i.textContent=`${s}%`);const a=r.querySelector(".block-progress-fill");a&&(a.style.width=`${s}%`),r.classList.toggle("completed",t>0&&e===t)}function rs(){const{total:n,done:e,pct:t}=mr(),s=document.getElementById("master-progress-fill");s&&(s.style.width=`${t}%`);const r=document.getElementById("master-progress-label");r&&(r.textContent=`${e} / ${n} tasks`);const i=document.getElementById("overall-progress-val");i&&(i.textContent=`${t}%`);const a=163.36,c=document.getElementById("master-ring-fill");c&&(c.style.strokeDashoffset=a*(1-t/100),t===100?(c.style.filter="drop-shadow(0 0 10px rgba(16,185,129,0.8))",c.setAttribute("stroke","#10b981")):(c.style.filter="drop-shadow(0 0 6px rgba(124,58,237,0.6))",c.setAttribute("stroke","url(#ringGradient)"))),window.dispatchEvent(new CustomEvent("everyday:progress",{detail:{pct:t}}))}function pk(){se.forEach(n=>{n.tasks.forEach(e=>{const t=document.getElementById(`task-wrapper-${e.id}`),s=document.getElementById(`task-${e.id}`),r=t||s;r&&(r.style.display=S.minimumMode&&!e.isCore?"none":"")}),Ea(n)}),rs()}function gk(){se.forEach(n=>{const e=document.getElementById(`block-card-${n.id}`),t=document.getElementById(`block-header-${n.id}`);e&&e.classList.add("expanded"),t&&t.setAttribute("aria-expanded","true"),S.expandedBlocks.add(n.id)})}function yc(){const n=document.getElementById("streak-count-header"),e=document.getElementById("streak-value");n&&(n.textContent=S.streak.count),e&&(e.textContent=`${S.streak.count} days`)}function _c(){const n=Wi.find(r=>r.id===S.phase),e=document.getElementById("phase-badge-header"),t=document.getElementById("phase-display"),s=(n==null?void 0:n.name)||"Stabilization";e&&(e.textContent=s),t&&(t.textContent=s)}function yk(){const n=document.getElementById("today-date");n&&(n.textContent=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}))}let $=[],is=!1;const _k=["🌅","🌄","🌞","☀️","🌤","🕐","🕑","🕒","💼","🚀","🧩","🌆","🌙","🌃","⭐","🔥","📚","💡","🎯","✅","🏋️","🧘","🚶","🏃","💻","🛠","🔬","📊","📝","🗒","📋","🗂","🎵","🎨","🎤","🏆","🤝","💬","📱","🌐"];function Ek(){try{if(new Date().getHours()<4){const t=X("planTomorrow",null);if(t&&Array.isArray(t.blocks)&&t.blocks.length>0)return se.length=0,t.blocks.forEach(({focusNote:s,...r})=>se.push(r)),me({planTomorrow:null,customPlan:JSON.parse(JSON.stringify(se))}).catch(()=>{}),console.log("[EveryDay] 📅 Tomorrow's plan carried forward into today."),!0}const e=X("customPlan",null);return Array.isArray(e)&&e.length>0?(se.length=0,e.forEach(t=>se.push(t)),!0):!1}catch{return!1}}function vk(){me({customPlan:JSON.parse(JSON.stringify(se))}).catch(n=>console.warn("[EveryDay] Plan Firestore sync failed:",n.message))}function wk(){is||(is=!0,$=JSON.parse(JSON.stringify(se)),vc(),Ec(!0))}function Tk(){is&&(is=!1,$=[],Gi(),Ec(!1))}function Ik(){is&&(Ic(),se.length=0,$.forEach(n=>se.push(n)),vk(),is=!1,$=[],Gi(),rs(),Ec(!1),H("✅ Plan saved!","success"))}function Ec(n){const e=document.getElementById("edit-plan-btn"),t=document.getElementById("inline-edit-actions");n?(e==null||e.classList.add("hidden"),t==null||t.classList.remove("hidden")):(e==null||e.classList.remove("hidden"),t==null||t.classList.add("hidden"))}function vc(){var t;const n=document.getElementById("blocks-grid");if(!n)return;n.innerHTML="",$.forEach((s,r)=>{const i=document.createElement("div");i.className="block-card expanded edit-mode-card",i.id=`block-card-${s.id}`,i.dataset.bi=r,i.innerHTML=bk(s,r),n.appendChild(i)}),Tc(n);const e=document.createElement("div");e.className="edit-add-block-row",e.innerHTML=`
    <button class="edit-add-block-btn" id="edit-add-block-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add Block
    </button>
  `,n.appendChild(e),(t=document.getElementById("edit-add-block-btn"))==null||t.addEventListener("click",()=>{var i;$.length;const s={id:`custom-${Date.now()}`,name:"New Block",icon:"⭐",time:Sk(),color:"linear-gradient(90deg, #7c3aed, #9d64f8)",tasks:[{id:`custom-${Date.now()}-1`,label:"New task",isCore:!1}]};$.push(s),vc();const r=document.getElementById(`block-card-${s.id}`);r==null||r.scrollIntoView({behavior:"smooth",block:"start"}),(i=r==null?void 0:r.querySelector(".ie-name-input"))==null||i.focus()})}function wc(n){return pt(n)==="past"}function bk(n,e){const[t,s]=Ak(n.time),r=wc(n),i=r?`
    <div class="ie-locked-banner">
      🔒 This block's time has passed — it's locked. Only current &amp; future blocks can be edited.
    </div>`:"",a=r?"disabled":"";return`
    ${i}
    <!-- Block header: icon + name + time + delete -->
    <div class="ie-card-header${r?" ie-card-header-locked":""}">
      <button class="ie-emoji-btn" data-bi="${e}" title="Change icon" type="button" ${a}>
        <span class="ie-emoji" id="ie-emoji-${e}">${n.icon}</span>
      </button>
      <input class="ie-name-input" id="ie-name-${e}" data-bi="${e}"
             value="${Ii(n.name)}" placeholder="Block name" ${a}/>
      <div class="ie-time-group">
        <input class="ie-time" id="ie-start-${e}" data-bi="${e}" data-f="start"
               type="time" value="${t}" ${a}/>
        <span class="ie-sep">–</span>
        <input class="ie-time" id="ie-end-${e}" data-bi="${e}" data-f="end"
               type="time" value="${s}" ${a}/>
      </div>
      ${r?"":`<button class="ie-delete-block-btn" data-bi="${e}" title="Remove block" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
        </svg>
      </button>`}
    </div>

    <!-- Task list -->
    <div class="ie-task-list" id="ie-tasks-${e}">
      ${n.tasks.map((c,u)=>xm(c,e,u,r)).join("")}
    </div>

    <!-- Add task (only if not locked) -->
    ${r?"":`<button class="ie-add-task-btn" data-bi="${e}" type="button">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add task
    </button>`}
  `}function xm(n,e,t,s=!1){const r=Om(n.id),i=s?"disabled":"",c=(n.subTasks||[]).map((u,d)=>`
    <div class="ie-subtask-row" data-bi="${e}" data-ti="${t}" data-si="${d}" id="ie-subtask-${e}-${t}-${d}">
      <span class="ie-subtask-bullet">↳</span>
      <input class="ie-subtask-input" data-bi="${e}" data-ti="${t}" data-si="${d}"
             value="${Ii(u.label)}" placeholder="Sub-task name" ${i}/>
      <input class="ie-subtask-weight" type="number" min="1" max="10"
             data-bi="${e}" data-ti="${t}" data-si="${d}"
             value="${u.weight||1}" title="Points" ${i}/>
      <span class="ie-subtask-pts-label">pts</span>
      <label class="ie-essential-wrap ie-subtask-core" title="Mark sub-task as Essential">
        <input type="checkbox" class="ie-subtask-core-cb" data-bi="${e}" data-ti="${t}" data-si="${d}"
               ${u.isCore?"checked":""} ${i}/>
        <span class="ie-essential-pill">Core</span>
      </label>
      ${s?"":`<button class="ie-remove-subtask-btn" data-bi="${e}" data-ti="${t}" data-si="${d}" title="Remove sub-task" type="button">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`}
    </div>
  `).join("");return`
    <div class="ie-task-row${s?" ie-task-row-locked":""}" data-bi="${e}" data-ti="${t}" id="ie-task-${e}-${t}">
      <div class="ie-task-main">
        ${s?'<span class="ie-locked-icon">🔒</span>':'<span class="ie-drag-handle" title="Reorder">⠿</span>'}
        <input class="ie-task-input" data-bi="${e}" data-ti="${t}"
               value="${Ii(n.label)}" placeholder="Task name" ${i}/>
        <label class="ie-essential-wrap" title="Mark as Essential">
          <input type="checkbox" class="ie-essential-cb" data-bi="${e}" data-ti="${t}"
                 ${n.isCore?"checked":""} ${i}/>
          <span class="ie-essential-pill">Essential</span>
        </label>
        ${s?"":`<button class="ie-remove-task-btn" data-bi="${e}" data-ti="${t}" title="Remove" type="button">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>`}
      </div>
      <textarea class="ie-task-desc" data-bi="${e}" data-ti="${t}" data-taskid="${n.id}"
        placeholder="Description / essence of this task (optional)…"
        rows="2" ${i}>${r}</textarea>

      <!-- Sub-tasks section -->
      <div class="ie-subtasks-section">
        <div class="ie-subtasks-list" id="ie-subtasks-${e}-${t}">
          ${c}
        </div>
        ${s?"":`<button class="ie-add-subtask-btn" data-bi="${e}" data-ti="${t}" type="button">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add sub-task
        </button>`}
      </div>
    </div>
  `}function Tc(n){n.querySelectorAll(".ie-name-input:not([disabled])").forEach(e=>{e.oninput=()=>{$[+e.dataset.bi].name=e.value}}),n.querySelectorAll(".ie-time:not([disabled])").forEach(e=>{e.oninput=()=>{var i,a;const t=+e.dataset.bi,s=((i=document.getElementById(`ie-start-${t}`))==null?void 0:i.value)||"00:00",r=((a=document.getElementById(`ie-end-${t}`))==null?void 0:a.value)||"00:00";$[t].time=`${s} – ${r}`}}),n.querySelectorAll(".ie-task-input:not([disabled])").forEach(e=>{e.oninput=()=>{var r;const t=+e.dataset.bi,s=+e.dataset.ti;(r=$[t])!=null&&r.tasks[s]&&($[t].tasks[s].label=e.value)}}),n.querySelectorAll(".ie-task-desc:not([disabled])").forEach(e=>{e.addEventListener("input",()=>{const t=e.dataset.taskid;t&&_a(t,e.value)}),e.addEventListener("click",t=>t.stopPropagation())}),n.querySelectorAll(".ie-essential-cb:not([disabled])").forEach(e=>{e.onchange=()=>{var r;const t=+e.dataset.bi,s=+e.dataset.ti;(r=$[t])!=null&&r.tasks[s]&&($[t].tasks[s].isCore=e.checked)}}),n.querySelectorAll(".ie-remove-task-btn").forEach(e=>{e.onclick=()=>{const t=+e.dataset.bi,s=+e.dataset.ti;$[t].tasks.splice(s,1),Fo(n,t)}}),n.querySelectorAll(".ie-add-task-btn").forEach(e=>{e.onclick=()=>{var r;const t=+e.dataset.bi;$[t].tasks.push({id:`${$[t].id}-t-${Date.now()}`,label:"",isCore:!1,subTasks:[]}),Fo(n,t);const s=document.getElementById(`ie-tasks-${t}`);(r=s==null?void 0:s.querySelector(".ie-task-row:last-child .ie-task-input"))==null||r.focus()}}),n.querySelectorAll(".ie-subtask-input:not([disabled])").forEach(e=>{e.oninput=()=>{var i,a,c;const t=+e.dataset.bi,s=+e.dataset.ti,r=+e.dataset.si;(c=(a=(i=$[t])==null?void 0:i.tasks[s])==null?void 0:a.subTasks)!=null&&c[r]&&($[t].tasks[s].subTasks[r].label=e.value)},e.addEventListener("click",t=>t.stopPropagation())}),n.querySelectorAll(".ie-subtask-weight:not([disabled])").forEach(e=>{e.oninput=()=>{var a,c,u;const t=+e.dataset.bi,s=+e.dataset.ti,r=+e.dataset.si,i=parseInt(e.value,10)||1;(u=(c=(a=$[t])==null?void 0:a.tasks[s])==null?void 0:c.subTasks)!=null&&u[r]&&($[t].tasks[s].subTasks[r].weight=i)},e.addEventListener("click",t=>t.stopPropagation())}),n.querySelectorAll(".ie-subtask-core-cb:not([disabled])").forEach(e=>{e.onchange=()=>{var i,a,c;const t=+e.dataset.bi,s=+e.dataset.ti,r=+e.dataset.si;(c=(a=(i=$[t])==null?void 0:i.tasks[s])==null?void 0:a.subTasks)!=null&&c[r]&&($[t].tasks[s].subTasks[r].isCore=e.checked)}}),n.querySelectorAll(".ie-remove-subtask-btn").forEach(e=>{e.onclick=t=>{var a,c;t.stopPropagation();const s=+e.dataset.bi,r=+e.dataset.ti,i=+e.dataset.si;(c=(a=$[s])==null?void 0:a.tasks[r])!=null&&c.subTasks&&($[s].tasks[r].subTasks.splice(i,1),Fo(n,s))}}),n.querySelectorAll(".ie-add-subtask-btn").forEach(e=>{e.onclick=t=>{var c,u;t.stopPropagation();const s=+e.dataset.bi,r=+e.dataset.ti;if(!((c=$[s])!=null&&c.tasks[r]))return;$[s].tasks[r].subTasks||($[s].tasks[r].subTasks=[]);const i=`${$[s].tasks[r].id}-st-${Date.now()}`;$[s].tasks[r].subTasks.push({id:i,label:"",weight:1,isCore:!1}),kk(n,s,r);const a=document.getElementById(`ie-subtasks-${s}-${r}`);(u=a==null?void 0:a.querySelector(".ie-subtask-row:last-child .ie-subtask-input"))==null||u.focus()}}),n.querySelectorAll(".ie-delete-block-btn").forEach(e=>{e.onclick=()=>{const t=+e.dataset.bi;if($.length===1){H("⚠️ Need at least one block","error");return}confirm(`Remove block "${$[t].name}"?`)&&($.splice(t,1),vc())}}),n.querySelectorAll(".ie-emoji-btn:not([disabled])").forEach(e=>{e.onclick=t=>{t.stopPropagation();const s=+e.dataset.bi;document.querySelectorAll(".ie-emoji-popup").forEach(a=>a.remove());const r=document.createElement("div");r.className="ie-emoji-popup",r.innerHTML=_k.map(a=>`<button class="ie-emoji-opt" data-bi="${s}" data-em="${a}" type="button">${a}</button>`).join(""),e.style.position="relative",e.appendChild(r),r.querySelectorAll(".ie-emoji-opt").forEach(a=>{a.onclick=()=>{$[+a.dataset.bi].icon=a.dataset.em,document.getElementById(`ie-emoji-${a.dataset.bi}`).textContent=a.dataset.em,r.remove()}});const i=a=>{!r.contains(a.target)&&a.target!==e&&(r.remove(),document.removeEventListener("click",i))};setTimeout(()=>document.addEventListener("click",i),0)}})}function Fo(n,e){Ic();const t=wc($[e]),s=document.getElementById(`ie-tasks-${e}`);s&&(s.innerHTML=$[e].tasks.map((r,i)=>xm(r,e,i,t)).join(""),Tc(n))}function kk(n,e,t){Ic();const s=wc($[e]),r=document.getElementById(`ie-subtasks-${e}-${t}`);if(!r)return;const i=$[e].tasks[t].subTasks||[];r.innerHTML=i.map((a,c)=>`
    <div class="ie-subtask-row" data-bi="${e}" data-ti="${t}" data-si="${c}" id="ie-subtask-${e}-${t}-${c}">
      <span class="ie-subtask-bullet">↳</span>
      <input class="ie-subtask-input" data-bi="${e}" data-ti="${t}" data-si="${c}"
             value="${Ii(a.label)}" placeholder="Sub-task name" ${s?"disabled":""}/>
      <input class="ie-subtask-weight" type="number" min="1" max="10"
             data-bi="${e}" data-ti="${t}" data-si="${c}"
             value="${a.weight||1}" title="Points" ${s?"disabled":""}/>
      <span class="ie-subtask-pts-label">pts</span>
      <label class="ie-essential-wrap ie-subtask-core" title="Mark sub-task as Essential">
        <input type="checkbox" class="ie-subtask-core-cb" data-bi="${e}" data-ti="${t}" data-si="${c}"
               ${a.isCore?"checked":""} ${s?"disabled":""}/>
        <span class="ie-essential-pill">Core</span>
      </label>
      ${s?"":`<button class="ie-remove-subtask-btn" data-bi="${e}" data-ti="${t}" data-si="${c}" title="Remove" type="button">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`}
    </div>
  `).join(""),Tc(n)}function Ic(){document.querySelectorAll(".ie-name-input:not([disabled])").forEach(n=>{const e=+n.dataset.bi;$[e]&&($[e].name=n.value)}),document.querySelectorAll(".ie-task-input:not([disabled])").forEach(n=>{var s;const e=+n.dataset.bi,t=+n.dataset.ti;(s=$[e])!=null&&s.tasks[t]&&($[e].tasks[t].label=n.value)}),document.querySelectorAll(".ie-essential-cb:not([disabled])").forEach(n=>{var s;const e=+n.dataset.bi,t=+n.dataset.ti;(s=$[e])!=null&&s.tasks[t]&&($[e].tasks[t].isCore=n.checked)}),document.querySelectorAll('.ie-time[data-f="start"]:not([disabled])').forEach(n=>{const e=+n.dataset.bi,t=n.value||"00:00",s=document.getElementById(`ie-end-${e}`),r=(s==null?void 0:s.value)||"00:00";$[e]&&($[e].time=`${t} – ${r}`)}),document.querySelectorAll(".ie-subtask-input:not([disabled])").forEach(n=>{var r,i,a;const e=+n.dataset.bi,t=+n.dataset.ti,s=+n.dataset.si;(a=(i=(r=$[e])==null?void 0:r.tasks[t])==null?void 0:i.subTasks)!=null&&a[s]&&($[e].tasks[t].subTasks[s].label=n.value)}),document.querySelectorAll(".ie-subtask-weight:not([disabled])").forEach(n=>{var r,i,a;const e=+n.dataset.bi,t=+n.dataset.ti,s=+n.dataset.si;(a=(i=(r=$[e])==null?void 0:r.tasks[t])==null?void 0:i.subTasks)!=null&&a[s]&&($[e].tasks[t].subTasks[s].weight=parseInt(n.value,10)||1)}),document.querySelectorAll(".ie-subtask-core-cb:not([disabled])").forEach(n=>{var r,i,a;const e=+n.dataset.bi,t=+n.dataset.ti,s=+n.dataset.si;(a=(i=(r=$[e])==null?void 0:r.tasks[t])==null?void 0:i.subTasks)!=null&&a[s]&&($[e].tasks[t].subTasks[s].isCore=n.checked)})}function Ii(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ak(n){const e=(n||"").split(/\s*[–-]\s*/);return[(e[0]||"00:00").trim().padStart(5,"0"),(e[1]||"00:00").trim().padStart(5,"0")]}function Sk(){const n=new Date,e=n.getHours()*60+n.getMinutes(),t=Math.ceil((e+30)/30)*30,s=t+60,r=i=>{const a=Math.floor(i/60)%24,c=i%60;return`${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}`};return`${r(t)} – ${r(s)}`}let ee=[],os=new Map;function Rk(){const n=X("planTomorrow",null);n&&Array.isArray(n.blocks)&&n.blocks.length>0?ee=JSON.parse(JSON.stringify(n.blocks)):ee=JSON.parse(JSON.stringify(se)).map(e=>{const{focusNote:t,...s}=e;return{...s,tasks:(s.tasks||[]).map(r=>({...r,desc:r.desc||"",subTasks:r.subTasks||[]}))}}),os.size===0&&ee.forEach(e=>os.set(e.id,!0))}function Qe(){me({planTomorrow:{blocks:JSON.parse(JSON.stringify(ee)),savedAt:new Date().toISOString()}}).catch(n=>console.warn("[EveryDay] tomorrowPlan save failed:",n.message))}function $m(){Rk(),va()}function Pk(){ee=[],os.clear();const n=document.getElementById("tomorrow-plan-grid");n&&(n.innerHTML="")}function Ck(){return Ft(),ee.some(e=>{var t;return(t=e.tasks)==null?void 0:t.some(s=>s.label.trim())})?(Qe(),!0):(me({planTomorrow:null}).catch(()=>{}),!1)}function va(){const n=document.getElementById("tomorrow-plan-grid");n&&(n.innerHTML=[...ee.map((e,t)=>Dk(e,t)),`<div class="tmp-add-block-row">
       <button class="tmp-add-block-btn" id="tmp-add-block-btn">
         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
           <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
         </svg>
         Add Block
       </button>
     </div>`].join(""),Bm(n))}function Dk(n,e){const t=os.get(n.id)===!1,s=(n.tasks||[]).length;return`
    <div class="tmp-block-card${t?" expanded":""}"
         id="tmp-block-${n.id}" data-bi="${e}">

      <!-- Block header: click to collapse/expand -->
      <div class="tmp-block-header" id="tmp-bh-${n.id}" role="button"
           tabindex="0" aria-expanded="${t}">
        <div class="tmp-bh-left">
          <div class="tmp-block-icon">${n.icon}</div>
          <div class="tmp-block-info">
            <div class="tmp-block-name">${bi(n.name)}</div>
            <div class="tmp-block-time">${n.time}</div>
          </div>
        </div>
        <div class="tmp-bh-right">
          <span class="tmp-task-count">${s} task${s!==1?"s":""}</span>
          <button class="tmp-del-block-btn" data-bi="${e}"
                  title="Remove block" type="button" aria-label="Delete block">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
            </svg>
          </button>
          <svg class="tmp-chevron" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      <!-- Block body: task list -->
      <div class="tmp-block-body" id="tmp-bb-${n.id}">
        <div class="tmp-task-list" id="tmp-tasks-${e}">
          ${(n.tasks||[]).map((r,i)=>Fm(r,e,i)).join("")}
        </div>
        <button class="tmp-add-task-btn" data-bi="${e}" type="button">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add task
        </button>
      </div>
    </div>
  `}function Fm(n,e,t){const s=n.desc||"",r=n.subTasks||[];return`
    <div class="tmp-task-row" id="tmp-task-${e}-${t}" data-bi="${e}" data-ti="${t}">
      <div class="tmp-task-main">
        <span class="tmp-task-dot"></span>
        <input class="tmp-task-input" data-bi="${e}" data-ti="${t}"
               value="${bi(n.label)}" placeholder="Task name…" />
        <label class="tmp-core-wrap" title="Mark as Essential">
          <input type="checkbox" class="tmp-core-cb" data-bi="${e}" data-ti="${t}"
                 ${n.isCore?"checked":""} />
          <span class="tmp-essential-pill">Essential</span>
        </label>
        <button class="tmp-desc-btn${s?" has-desc":""}" data-bi="${e}" data-ti="${t}"
                title="${s?"Edit description":"Add description"}"
                type="button" aria-label="Task description">ℹ</button>
        <button class="tmp-task-del-btn" data-bi="${e}" data-ti="${t}"
                title="Delete task" type="button">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Description panel (hidden by default) -->
      <div class="tmp-desc-panel" id="tmp-dp-${e}-${t}" hidden>
        <textarea class="tmp-desc-ta" data-bi="${e}" data-ti="${t}"
                  placeholder="Describe the essence of this task for tomorrow…"
                  rows="2">${bi(s)}</textarea>
      </div>

      <!-- Sub-tasks -->
      <div class="tmp-sub-list" id="tmp-subs-${e}-${t}">
        ${r.map((i,a)=>Lk(i,e,t,a)).join("")}
      </div>
      <button class="tmp-add-sub-btn" data-bi="${e}" data-ti="${t}" type="button">
        ↳ Add sub-task
      </button>
    </div>
  `}function Lk(n,e,t,s){return`
    <div class="tmp-sub-row" data-bi="${e}" data-ti="${t}" data-si="${s}">
      <span class="tmp-sub-bullet">↳</span>
      <input class="tmp-sub-input" data-bi="${e}" data-ti="${t}" data-si="${s}"
             value="${bi(n.label)}" placeholder="Sub-task…" />
      <button class="tmp-sub-del-btn" data-bi="${e}" data-ti="${t}" data-si="${s}"
              title="Remove" type="button">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `}function Bm(n){var e;n.querySelectorAll(".tmp-block-header").forEach(t=>{const s=t.id.replace("tmp-bh-",""),r=()=>{const i=document.getElementById(`tmp-block-${s}`),a=i.classList.contains("expanded");i.classList.toggle("expanded",!a),t.setAttribute("aria-expanded",String(!a)),os.set(s,a)};t.addEventListener("click",i=>{i.target.closest(".tmp-del-block-btn")||r()}),t.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&!i.target.closest(".tmp-del-block-btn")&&(i.preventDefault(),r())})}),n.querySelectorAll(".tmp-del-block-btn").forEach(t=>{t.addEventListener("click",s=>{var i;s.stopPropagation();const r=+t.dataset.bi;if(ee.length===1){H("Need at least one block","error");return}confirm(`Remove block "${(i=ee[r])==null?void 0:i.name}"?`)&&(Ft(),ee.splice(r,1),Qe(),va())})}),n.querySelectorAll(".tmp-task-input").forEach(t=>{t.addEventListener("input",()=>{var i;const[s,r]=On(t);(i=ee[s])!=null&&i.tasks[r]&&(ee[s].tasks[r].label=t.value)}),t.addEventListener("blur",Qe),t.addEventListener("click",s=>s.stopPropagation())}),n.querySelectorAll(".tmp-core-cb").forEach(t=>{t.addEventListener("change",()=>{var i;const[s,r]=On(t);(i=ee[s])!=null&&i.tasks[r]&&(ee[s].tasks[r].isCore=t.checked,Qe())})}),n.querySelectorAll(".tmp-desc-btn").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const[r,i]=On(t),a=document.getElementById(`tmp-dp-${r}-${i}`);if(!a)return;const c=a.hidden;a.hidden=!c,t.classList.toggle("active",c),c&&setTimeout(()=>{var u;return(u=a.querySelector("textarea"))==null?void 0:u.focus()},50)})}),n.querySelectorAll(".tmp-desc-ta").forEach(t=>{t.addEventListener("input",()=>{var i;const[s,r]=On(t);if((i=ee[s])!=null&&i.tasks[r]){ee[s].tasks[r].desc=t.value;const a=n.querySelector(`.tmp-desc-btn[data-bi="${s}"][data-ti="${r}"]`);a&&a.classList.toggle("has-desc",t.value.trim().length>0)}}),t.addEventListener("blur",Qe),t.addEventListener("click",s=>s.stopPropagation())}),n.querySelectorAll(".tmp-task-del-btn").forEach(t=>{t.addEventListener("click",s=>{var a;s.stopPropagation();const[r,i]=On(t);Ft(),(a=ee[r])==null||a.tasks.splice(i,1),Qe(),$r(n,r)})}),n.querySelectorAll(".tmp-add-task-btn").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const r=+t.dataset.bi;if(!ee[r])return;Ft(),ee[r].tasks.push({id:`tmpt-${Date.now()}`,label:"",isCore:!1,desc:"",subTasks:[]}),Qe(),$r(n,r);const i=document.getElementById(`tmp-tasks-${r}`),a=i==null?void 0:i.querySelectorAll(".tmp-task-input");a!=null&&a.length&&a[a.length-1].focus()})}),n.querySelectorAll(".tmp-sub-input").forEach(t=>{t.addEventListener("input",()=>{var a,c,u;const[s,r,i]=pd(t);(u=(c=(a=ee[s])==null?void 0:a.tasks[r])==null?void 0:c.subTasks)!=null&&u[i]&&(ee[s].tasks[r].subTasks[i].label=t.value)}),t.addEventListener("blur",Qe),t.addEventListener("click",s=>s.stopPropagation())}),n.querySelectorAll(".tmp-sub-del-btn").forEach(t=>{t.addEventListener("click",s=>{var c,u,d;s.stopPropagation();const[r,i,a]=pd(t);Ft(),(d=(u=(c=ee[r])==null?void 0:c.tasks[i])==null?void 0:u.subTasks)==null||d.splice(a,1),Qe(),$r(n,r)})}),n.querySelectorAll(".tmp-add-sub-btn").forEach(t=>{t.addEventListener("click",s=>{var u;s.stopPropagation();const[r,i]=On(t);if(!((u=ee[r])!=null&&u.tasks[i]))return;Ft(),ee[r].tasks[i].subTasks||(ee[r].tasks[i].subTasks=[]),ee[r].tasks[i].subTasks.push({id:`tmps-${Date.now()}`,label:"",isCore:!1}),Qe(),$r(n,r);const a=document.getElementById(`tmp-subs-${r}-${i}`),c=a==null?void 0:a.querySelectorAll(".tmp-sub-input");c!=null&&c.length&&c[c.length-1].focus()})}),(e=document.getElementById("tmp-add-block-btn"))==null||e.addEventListener("click",()=>{Ft();const t=`tmpb-${Date.now()}`;ee.push({id:t,name:"New Block",icon:"⭐",time:Nk(),color:"linear-gradient(90deg,#7c3aed,#9d64f8)",tasks:[{id:`tmpt-${Date.now()}`,label:"",isCore:!1,desc:"",subTasks:[]}]}),os.set(t,!1),Qe(),va(),setTimeout(()=>{var r;const s=document.getElementById(`tmp-block-${t}`);s==null||s.scrollIntoView({behavior:"smooth",block:"start"}),(r=s==null?void 0:s.querySelector(".tmp-task-input"))==null||r.focus()},60)})}function $r(n,e){var a;Ft();const t=ee[e];if(!t)return;const s=document.getElementById(`tmp-tasks-${e}`);s&&(s.innerHTML=(t.tasks||[]).map((c,u)=>Fm(c,e,u)).join(""));const r=document.getElementById(`tmp-block-${t.id}`),i=r==null?void 0:r.querySelector(".tmp-task-count");if(i){const c=((a=t.tasks)==null?void 0:a.length)||0;i.textContent=`${c} task${c!==1?"s":""}`}Bm(n)}function Ft(){ee.forEach((n,e)=>{(n.tasks||[]).forEach((t,s)=>{const r=document.querySelector(`.tmp-task-input[data-bi="${e}"][data-ti="${s}"]`);r&&(t.label=r.value);const i=document.querySelector(`.tmp-desc-ta[data-bi="${e}"][data-ti="${s}"]`);i&&(t.desc=i.value),(t.subTasks||[]).forEach((a,c)=>{const u=document.querySelector(`.tmp-sub-input[data-bi="${e}"][data-ti="${s}"][data-si="${c}"]`);u&&(a.label=u.value)})})})}function On(n){return[+n.dataset.bi,+n.dataset.ti]}function pd(n){return[+n.dataset.bi,+n.dataset.ti,+n.dataset.si]}function bi(n){return String(n||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Nk(){const e=(new Date().getHours()+1)%24,t=(e+1)%24,s=r=>String(r).padStart(2,"0");return`${s(e)}:00 – ${s(t)}:00`}function Um(){return new Date().getHours()>=17}function Vk(){new Date().getHours()>=4&&(S.eodLocked=!1,me({eodLocked:null}).catch(()=>{}))}function Jn(){const{pct:n}=mr();return Um()||n>=80}function hn(){return S.history.some(n=>n.date===er())}function Mk(n){return n>=95?{effort:5,showed:"yes"}:n>=80?{effort:4,showed:"yes"}:n>=60?{effort:3,showed:"yes"}:n>=40?{effort:2,showed:"yes"}:n>=20?{effort:1,showed:"yes"}:{effort:1,showed:"no"}}function Ok(n){return n>=95?"Outstanding execution today! Every block crushed. 🔥":n>=80?"Solid day. You showed up and delivered. Keep the momentum. 💪":n>=60?"Good effort — more than half the battle won. Push harder tomorrow.":n>=40?"Partial execution. Identify what blocked you and fix it tomorrow.":n>=20?"Rough day. Rest, reset, and come back stronger.":"Missed most tasks. Reflect on what happened and recommit."}function qm(){const n=er(),e=S.history.find(t=>t.date===n);if(e){zm(),Wm(e),Gm();return}$k(),Jn()?(bc(),jm()):Hm()}function jm(){const{pct:n}=mr(),{effort:e,showed:t}=Mk(n),s=Ok(n);S.eod.effort=e,S.eod.showed=t,Ki(e);const r=document.getElementById("eod-yes"),i=document.getElementById("eod-no");r&&i&&(r.classList.toggle("selected-yes",t==="yes"),i.classList.toggle("selected-no",t==="no"));const a=document.getElementById("eod-notes");a&&!a.value&&(a.value=s,a.dataset.autoFilled="true");const c=document.getElementById("eod-suggestion-badge");c&&(c.hidden=!1,c.textContent=`✨ Auto-suggested based on ${n}% completion — edit freely`)}function Ki(n){document.querySelectorAll(".star-btn").forEach((e,t)=>{e.classList.toggle("active",t<n),e.style.color=t<n?"var(--accent-amber)":""})}function xk(){hn()||(Jn()?(bc(),jm()):Hm())}function Hm(){const{pct:n}=mr(),e=Math.max(0,80-n),t=new Date,s=Math.max(0,17*60-(t.getHours()*60+t.getMinutes())),r=s>60?`${Math.ceil(s/60)}h ${s%60}m`:`${s}m`,i=document.getElementById("eod-lock-overlay"),a=document.getElementById("eod-body");a&&(a.style.display="none"),i&&(i.hidden=!1,i.innerHTML=`
      <div class="eod-lock-icon">🔒</div>
      <div class="eod-lock-content">
        <p class="eod-lock-title">Reflection unlocks when you're ready</p>
        <p class="eod-lock-caption">
          ${n>=80?"✓ Task threshold met — waiting for 5 PM":`Complete <strong>${e}% more tasks</strong> — or wait until <strong>5:00 PM</strong> ${Um()?"":`(${r} away)`}`}
        </p>
        <div class="eod-lock-track-row">
          <div class="eod-lock-track">
            <div class="eod-lock-fill" style="width: ${Math.min(n,100)}%"></div>
            <div class="eod-lock-threshold" style="left: 80%"></div>
          </div>
          <span class="eod-lock-pct">${n}%</span>
        </div>
        <p class="eod-lock-hint">Target: 80% tasks or 5 PM</p>
      </div>
    `)}function bc(){const n=document.getElementById("eod-lock-overlay"),e=document.getElementById("eod-body");n&&(n.hidden=!0),e&&(e.style.display="")}function zm(){bc()}function Wm(n){const e=document.getElementById("eod-submitted-badge");e&&(e.hidden=!1);const t=document.getElementById("eod-yes"),s=document.getElementById("eod-no");t&&s&&(t.classList.toggle("selected-yes",n.showed==="yes"),s.classList.toggle("selected-no",n.showed==="no")),Ki(n.effort);const r=document.getElementById("eod-notes");r&&(r.value=n.notes||"",r.readOnly=!0);const i=document.getElementById("eod-plan-tomorrow-section");i&&(i.hidden=!0)}function Gm(){const n=document.getElementById("eod-submit");n&&(n.disabled=!0,n.textContent="✓ Submitted for Today",n.classList.add("eod-submitted-state")),document.querySelectorAll("#eod-body .eod-option, #eod-body .star-btn").forEach(e=>{e.style.pointerEvents="none",e.style.cursor="default"})}function $k(){var i,a;const n=document.getElementById("eod-submitted-badge");n&&(n.hidden=!0);const e=document.getElementById("eod-suggestion-badge");e&&(e.hidden=!0);const t=document.getElementById("eod-notes");t&&(t.value="",t.readOnly=!1,t.dataset.autoFilled="");const s=document.getElementById("eod-submit");s&&(s.disabled=!1,s.textContent="Save Reflection",s.classList.remove("eod-submitted-state")),document.querySelectorAll("#eod-body .eod-option, #eod-body .star-btn").forEach(c=>{c.style.pointerEvents="",c.style.cursor=""}),S.eod.showed=null,S.eod.effort=0,Ki(0),(i=document.getElementById("eod-yes"))==null||i.classList.remove("selected-yes"),(a=document.getElementById("eod-no"))==null||a.classList.remove("selected-no");const r=document.getElementById("eod-plan-tomorrow-section");r&&(r.hidden=!1)}async function Fk(){var s,r;if(hn()){H("⚠️ Already submitted for today.","error");return}if(!Jn()){H("🔒 Complete 80% of tasks or wait until 5 PM.","error");return}if(!S.eod.showed){H("Please select if you showed up today.","error");return}if(S.eod.effort===0){H("Please rate your effort level.","error");return}const n=((r=(s=document.getElementById("eod-notes"))==null?void 0:s.value)==null?void 0:r.trim())||"",{pct:e}=mr(),t={showed:S.eod.showed,effort:S.eod.effort,notes:n,tasksCompleted:e,phase:S.phase};try{const i=await xe.history.submit(t);if(S.history=S.history.filter(c=>c.date!==er()),S.history.push(i),Ck()&&H("📅 Tomorrow's plan saved!","success"),S.eodLocked=!0,me({eodLocked:er()}).catch(()=>{}),zm(),Wm(i),Gm(),H("🌙 Reflection saved. Great work today.","success"),S.eod.showed==="yes"){await xe.streak.confirmShowUp();const c=await xe.streak.get();S.streak=c,yc()}}catch(i){H(`⚠️ Failed to save reflection: ${i.message}`,"error")}}function Bk(){var n,e,t,s;(n=document.getElementById("eod-yes"))==null||n.addEventListener("click",()=>{var r,i;hn()||!Jn()||(S.eod.showed="yes",(r=document.getElementById("eod-yes"))==null||r.classList.add("selected-yes"),(i=document.getElementById("eod-no"))==null||i.classList.remove("selected-no"))}),(e=document.getElementById("eod-no"))==null||e.addEventListener("click",()=>{var r,i;hn()||!Jn()||(S.eod.showed="no",(r=document.getElementById("eod-no"))==null||r.classList.add("selected-no"),(i=document.getElementById("eod-yes"))==null||i.classList.remove("selected-yes"))}),document.querySelectorAll(".star-btn").forEach((r,i)=>{r.addEventListener("click",()=>{hn()||!Jn()||(S.eod.effort=parseInt(r.dataset.val),Ki(S.eod.effort))}),r.addEventListener("mouseenter",()=>{hn()||document.querySelectorAll(".star-btn").forEach((a,c)=>{a.style.color=c<=i?"var(--accent-amber)":""})}),r.addEventListener("mouseleave",()=>{document.querySelectorAll(".star-btn").forEach((a,c)=>{a.style.color=c<S.eod.effort?"var(--accent-amber)":""})})}),(t=document.getElementById("eod-submit"))==null||t.addEventListener("click",Fk),(s=document.getElementById("eod-notes"))==null||s.addEventListener("focus",r=>{r.target.dataset.autoFilled==="true"&&r.target.select()}),window.addEventListener("everyday:progress",r=>{hn()||xk()})}function Uk(n=365){const e=[],t=new Date;for(let s=n-1;s>=0;s--){const r=new Date(t);r.setDate(t.getDate()-s),e.push(new Date(r))}return e}function qk(n){const e=[];let t=new Array(7).fill(null);return n.forEach(s=>{const r=s.getDay();t[r]=s,r===6&&(e.push(t),t=new Array(7).fill(null))}),t.some(s=>s!==null)&&e.push(t),e}function ei(n){return n.toISOString().split("T")[0]}function jk(n){return n?n<2?"hm-l1":n<4?"hm-l2":n<6?"hm-l3":"hm-l4":"hm-l0"}function Hk(){const n={},e=new Set;for(const t of S.history)!t.date||e.has(t.date)||(e.add(t.date),t.showed==="yes"?n[t.date]=t.effort||1:n[t.date]=-1);return n}function zk(n){const e=[];return n.forEach((t,s)=>{const r=t.find(d=>d!==null);if(!r)return;const i=r.getMonth(),a=n[s-1],c=a==null?void 0:a.find(d=>d!==null),u=c==null?void 0:c.getMonth();(s===0||i!==u)&&e.push({index:s,label:r.toLocaleString("default",{month:"short"})})}),e}function Wk(){var j;const n=document.getElementById("heatmap-grid");if(!n)return;const e=Uk(365),t=Hk(),s=qk(e),r=ei(new Date);let i=0;e.forEach(M=>{const W=ei(M);t[W]&&t[W]>0&&i++});const a=zk(s),c=12,u=4,d=c+u,f=s.map((M,W)=>{if(!M.find(J=>J))return`<div style="width:${d}px" class="hm-month-col"></div>`;const ue=a.find(J=>J.index===W);return`<div style="width:${d}px" class="hm-month-col">${ue?ue.label:""}</div>`}).join(""),p=s.map(M=>`<div class="hm-week">${M.map((oe,ue)=>{if(!oe)return'<div class="hm-cell hm-cell--empty"></div>';const J=ei(oe),v=t[J]||0,g=t[J]===-1,_=J===r,T=g?"hm-miss":jk(v),E=_?" hm-today":"",b=oe.toDateString(),y=g?"missed day":v>0?`${v} ${v===1?"activity":"activities"}`:"no activity";return`<div class="hm-cell ${T}${E}" title="${b} — ${y}" data-date="${J}"></div>`}).join("")}</div>`).join("");n.innerHTML=`
    <div class="hm-root" style="--hm-cell:${c}px;--hm-gap:${u}px;">
      <div class="hm-month-row">
        ${f}
      </div>
      <div class="hm-grid-body">
        ${p}
      </div>
    </div>
  `;const w=document.getElementById("gh-lc-count"),A=document.getElementById("gh-lc-total"),C=document.querySelector(".gh-lc-sub"),N=document.getElementById("gh-lc-streak"),L=document.getElementById("gh-year-range");w&&(w.textContent=String(i)),A&&(A.textContent=String(i)),C&&(C.textContent=" days active in the past year"),N&&(N.textContent=String(((j=S.streak)==null?void 0:j.count)??0)),L&&(L.textContent="")}function Gk(){const n=document.getElementById("history-grid"),e=document.getElementById("history-empty");if(!n)return;const t=new Map;S.history.forEach(i=>{t.has(i.date)||t.set(i.date,i)});const s=[...t.values()].sort((i,a)=>a.date.localeCompare(i.date));if(!s.length){n.innerHTML="",e&&(e.hidden=!1);return}e&&(e.hidden=!0);const r=ei(new Date);n.innerHTML=s.map(i=>{const a=Array.from({length:5},(f,p)=>`<span class="history-star${p<i.effort?"":" empty"}">★</span>`).join(""),c=i.showed==="yes"?'<span class="showed-yes">✓ Showed up</span>':`<span class="showed-no">✗ Didn't show</span>`,u=i.tasksCompleted!=null?`<div class="history-completed">⚡ ${i.tasksCompleted}% tasks done</div>`:"",d=i.date===r;return`<div class="history-entry${d?" history-entry--today":""}">
      <div class="history-entry-date-row">
        <span class="history-entry-date">${TT(i.date)}</span>
        ${d?'<span class="history-today-badge">Today</span>':""}
      </div>
      <div class="history-entry-showed">${c}</div>
      <div class="history-effort">${a}</div>${u}
      <div class="history-notes">${IT(i.notes||"")}</div>
    </div>`}).join("")}function Kk(){var s;const n=((s=S.streak)==null?void 0:s.count)??0,e=document.getElementById("history-streak-val"),t=document.getElementById("gh-lc-streak");e&&(e.textContent=`${n} days`),t&&(t.textContent=String(n))}function Km(){Kk(),Wk(),Gk()}function Qm(){Ym(),kc()}function Qk(){Ym(),kc()}function Ym(){const n=document.getElementById("phase-selector-grid");n&&(n.innerHTML=Wi.map(e=>`
    <div class="phase-option${S.phase===e.id?" active":""}"
         data-phase="${e.id}"
         id="phase-option-${e.id}"
         role="radio"
         aria-checked="${S.phase===e.id}"
         tabindex="0"
         style="--phase-color: ${e.color}; --phase-gradient: ${e.gradient}">
      <span class="phase-emoji">${e.emoji}</span>
      <div class="phase-option-name">${e.name}</div>
      <div class="phase-number">${e.number}</div>
    </div>
  `).join(""),n.querySelectorAll(".phase-option").forEach(e=>{e.addEventListener("click",()=>gd(e.dataset.phase)),e.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),gd(e.dataset.phase))})}))}async function gd(n){var e;S.phase=n,document.querySelectorAll(".phase-option").forEach(t=>{const s=t.dataset.phase===n;t.classList.toggle("active",s),t.setAttribute("aria-checked",s)}),kc(),_c(),H(`Phase set to ${(e=Wi.find(t=>t.id===n))==null?void 0:e.name}`);try{await xe.settings.setPhase(n)}catch{H("⚠️ Failed to save phase to server","error")}}function kc(){const n=Wi.find(t=>t.id===S.phase),e=document.getElementById("phase-detail-card");!n||!e||(e.style.setProperty("--phase-color",n.color),e.style.borderColor=`${n.color}33`,e.innerHTML=`
    <div class="phase-detail-header">
      <div class="phase-detail-icon">${n.emoji}</div>
      <div>
        <div class="phase-detail-name" style="color: ${n.color}">${n.name}</div>
        <div class="phase-detail-sub">${n.number} — Identity Evolution</div>
      </div>
    </div>
    <p class="phase-detail-desc">${n.description}</p>
    <div class="phase-intensity-bar">
      <span class="phase-intensity-label">Intensity</span>
      <div class="phase-intensity-track">
        <div class="phase-intensity-fill" style="width: ${n.intensity}%; background: ${n.gradient}"></div>
      </div>
      <span style="font-size: 0.8rem; font-weight: 700; color: ${n.color}; font-family: 'JetBrains Mono', monospace">${n.intensity}%</span>
    </div>
    <div class="phase-hints">
      ${n.hints.map(t=>`
        <div class="phase-hint">
          <div class="phase-hint-dot" style="background: ${n.color}"></div>
          <span>${t}</span>
        </div>
      `).join("")}
    </div>
  `)}async function Yk(){if(!("Notification"in window)){H("Browser notifications not supported");return}const n=await Notification.requestPermission();S.notificationsEnabled=n==="granted",S.notificationsEnabled?(H("🔔 Notifications enabled!","success"),Qi()):H("Notifications blocked. Enable in browser settings.")}function Qi(){if(!S.notificationsEnabled)return;const n=S.settings.reminders||{},e=new Date;se.forEach(t=>{var d,f;const s=n[t.id];if(!s||s.enabled===!1)return;const r=s.time24||((f=(d=t.time)==null?void 0:d.match(/\d{2}:\d{2}/))==null?void 0:f[0])||"09:00",[i,a]=r.split(":").map(Number),c=new Date;c.setHours(i,a,0,0);const u=c-e;u>0&&setTimeout(()=>{new Notification(`${t.icon} ${t.name}`,{body:t.tasks.slice(0,2).map(p=>p.label).join(" · "),icon:"/favicon.png"})},u)})}function Jk(n){const[e,t]=(n||"06:00").split(":").map(Number),s=e<12?"AM":"PM";let r=e%12;return r===0&&(r=12),{h12:r,minute:t,period:s}}function Xk({h12:n,minute:e,period:t}){let s=n%12;return t==="PM"&&(s+=12),`${String(s).padStart(2,"0")}:${String(e).padStart(2,"0")}`}function Zk(n){const e=(n.time||"").match(/\d{2}:\d{2}/);return e?e[0]:"09:00"}function Jm(){var i;const n=document.getElementById("user-name"),e=document.getElementById("user-goal");n&&(n.value=S.settings.name||""),e&&(e.value=S.settings.goal||"");const t=document.getElementById("settings-account-email");t&&((i=qe.currentUser)!=null&&i.email)&&(t.textContent=`Signed in as ${qe.currentUser.email}`);const s=document.getElementById("reminder-list");if(!s)return;const r=S.settings.reminders||{};s.innerHTML=se.map(a=>{const c=r[a.id]||{},u=c.time24||Zk(a),d=c.enabled!==!1,{h12:f,minute:p,period:w}=Jk(u),A=Array.from({length:12},(N,L)=>{const j=L+1;return`<option value="${j}" ${j===f?"selected":""}>${j}</option>`}).join(""),C=["00","05","10","15","20","25","30","35","40","45","50","55"].map(N=>{const L=parseInt(N,10);return`<option value="${L}" ${L===p?"selected":""}>${N}</option>`}).join("");return`
      <div class="reminder-row ${d?"":"reminder-row--off"}" data-block="${a.id}">
        <div class="reminder-label">
          <span class="reminder-icon">${a.icon}</span>
          <span class="reminder-name">${a.name}</span>
        </div>
        <div class="reminder-controls">
          <div class="time-picker-12h">
            <select class="tp-hour" data-block="${a.id}" aria-label="Hour">
              ${A}
            </select>
            <span class="tp-colon">:</span>
            <select class="tp-min" data-block="${a.id}" aria-label="Minute">
              ${C}
            </select>
            <button class="tp-period ${w==="AM"?"is-am":"is-pm"}"
                    data-block="${a.id}" data-period="${w}"
                    type="button" aria-label="Toggle AM/PM">
              ${w}
            </button>
          </div>
          <label class="rem-toggle" title="${d?"Disable":"Enable"} reminder">
            <input type="checkbox" class="rem-toggle-cb" data-block="${a.id}"
                   ${d?"checked":""} />
            <span class="rem-toggle-slider"></span>
          </label>
        </div>
      </div>
    `}).join(""),s.querySelectorAll(".tp-period").forEach(a=>{a.addEventListener("click",()=>{const u=a.dataset.period==="AM"?"PM":"AM";a.dataset.period=u,a.textContent=u,a.className=`tp-period ${u==="AM"?"is-am":"is-pm"}`})}),s.querySelectorAll(".rem-toggle-cb").forEach(a=>{a.addEventListener("change",()=>{a.closest(".reminder-row").classList.toggle("reminder-row--off",!a.checked)})})}function eA(){var n,e,t,s,r,i,a,c;(n=document.getElementById("save-identity"))==null||n.addEventListener("click",async()=>{var f,p,w,A;const u=((p=(f=document.getElementById("user-name"))==null?void 0:f.value)==null?void 0:p.trim())||"",d=((A=(w=document.getElementById("user-goal"))==null?void 0:w.value)==null?void 0:A.trim())||"";try{const C=await xe.settings.update({name:u,goal:d});S.settings.name=C.name,S.settings.goal=C.goal,H("✅ Identity saved!","success")}catch{H("⚠️ Failed to save identity","error")}}),(e=document.getElementById("save-reminders"))==null||e.addEventListener("click",async()=>{const u=document.getElementById("reminder-list"),d={};u.querySelectorAll(".reminder-row").forEach(f=>{const p=f.dataset.block,w=parseInt(f.querySelector(".tp-hour").value,10),A=parseInt(f.querySelector(".tp-min").value,10),C=f.querySelector(".tp-period").dataset.period,N=f.querySelector(".rem-toggle-cb").checked;d[p]={time24:Xk({h12:w,minute:A,period:C}),enabled:N}});try{await xe.settings.update({reminders:d}),S.settings.reminders=d,H("🔔 Reminders saved!","success"),S.notificationsEnabled&&Qi()}catch{H("⚠️ Failed to save reminders","error")}}),(t=document.getElementById("export-data"))==null||t.addEventListener("click",()=>{try{const u=new Date,d=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}-${String(u.getDate()).padStart(2,"0")}`,f={exportedAt:u.toISOString(),tasks:S.tasks,history:S.history,settings:S.settings,phase:S.phase,streak:S.streak},p=new Blob([JSON.stringify(f,null,2)],{type:"application/json"}),w=URL.createObjectURL(p),A=document.createElement("a");A.href=w,A.download=`everyday-backup-${d}.json`,A.click(),URL.revokeObjectURL(w),H("📤 Data exported! File downloaded.","success")}catch(u){H("⚠️ Export failed: "+u.message,"error")}}),(s=document.getElementById("import-data-file"))==null||s.addEventListener("change",async u=>{var f;const d=(f=u.target.files)==null?void 0:f[0];if(d){try{const p=await d.text(),w=JSON.parse(p),A={};w.tasks&&(A.tasks=w.tasks),w.history&&(A.history=w.history),w.streak&&(A.streak=w.streak),w.phase&&(A.phase=w.phase),w.settings&&(A.settings=w.settings),await me(A),H("📥 Data imported! Refreshing...","success"),setTimeout(()=>location.reload(),1200)}catch{H("⚠️ Import failed — invalid JSON file","error")}u.target.value=""}}),(r=document.getElementById("reset-data"))==null||r.addEventListener("click",async()=>{if(confirm("⚠️ This will permanently delete ALL your data and reset to the boilerplate. Are you absolutely sure?")&&confirm("Last warning — this cannot be undone. Confirm?"))try{await xe.data.reset(),H("🗑 All data cleared. Reloading...","success"),setTimeout(()=>location.reload(),800)}catch(u){H("⚠️ Reset failed: "+u.message,"error")}}),(i=document.getElementById("logout-btn"))==null||i.addEventListener("click",async()=>{try{await Sm()}catch(u){H("⚠️ Sign out failed: "+u.message,"error");return}location.reload()}),(a=document.getElementById("change-password-form"))==null||a.addEventListener("submit",async u=>{var A,C,N;u.preventDefault();const d=(A=document.getElementById("settings-current-pwd"))==null?void 0:A.value,f=(C=document.getElementById("settings-new-pwd"))==null?void 0:C.value,p=(N=document.getElementById("settings-confirm-pwd"))==null?void 0:N.value;if(!d||!f||!p){H("⚠️ Please fill in all password fields.","error");return}if(f!==p){H("⚠️ New passwords do not match.","error");return}if(f.length<6){H("⚠️ New password must be at least 6 characters.","error");return}const w=document.getElementById("change-password-btn");w&&(w.disabled=!0,w.textContent="Updating…");try{await Qb(d,f),H("✅ Password updated successfully!","success"),u.target.reset()}catch(L){const j=L.code==="auth/wrong-password"||L.code==="auth/invalid-credential"?"Current password is incorrect.":L.message;H("⚠️ "+j,"error")}finally{w&&(w.disabled=!1,w.textContent="Update Password")}}),(c=document.getElementById("delete-account-btn"))==null||c.addEventListener("click",async()=>{if(!confirm("⚠️ This will permanently delete your account AND all your data. This cannot be undone."))return;const u=prompt("Enter your current password to confirm account deletion:");if(u)try{await me({tasks:{},streak:{count:0,lastDate:null,longest:0},history:[],settings:{name:"",goal:"",reminders:{}},phase:"stabilization",lastDate:null,customPlan:null,taskDescs:{},immediateTasks:[],eodLocked:null,planTomorrow:null}),await Yb(u),H("Account deleted.","success"),setTimeout(()=>location.reload(),600)}catch(d){const f=d.code==="auth/wrong-password"||d.code==="auth/invalid-credential"?"⚠️ Incorrect password — account not deleted.":"⚠️ Delete failed: "+d.message;H(f,"error")}})}const yd="dragging",He="drag-over";let rt=null,_d=null,Fr=!1;function Xm(){document.querySelectorAll(".task-list").forEach(n=>{const e=n.closest(".block-card");if(!e)return;const t=e.id.replace("block-card-","");tA(n),nA(n,t),sA(n,t)})}function tA(n){n.querySelectorAll(".task-item-wrapper").forEach(e=>{if(e.querySelector(".drag-handle"))return;const t=document.createElement("div");t.className="drag-handle",t.setAttribute("title","Drag to reorder"),t.setAttribute("aria-label","Drag to reorder"),t.innerHTML=`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="9" cy="4" r="2"/><circle cx="15" cy="4" r="2"/>
      <circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>
      <circle cx="9" cy="20" r="2"/><circle cx="15" cy="20" r="2"/>
    </svg>`;const s=e.querySelector(".task-item");s&&s.insertBefore(t,s.firstChild)})}function nA(n,e){n.querySelectorAll(".task-item-wrapper").forEach(t=>{t.draggable=!1;const s=t.querySelector(".drag-handle");s&&s.addEventListener("mousedown",()=>{Fr=!0,t.draggable=!0}),t.addEventListener("mouseup",()=>{rt||(Fr=!1,t.draggable=!1)}),t.addEventListener("dragstart",r=>{if(!Fr){r.preventDefault();return}rt=t,_d=e,t.classList.add(yd),r.dataTransfer.effectAllowed="move",r.dataTransfer.setData("text/plain",t.id),Fr=!1}),t.addEventListener("dragend",()=>{t.classList.remove(yd),t.draggable=!1,n.querySelectorAll(`.${He}`).forEach(r=>r.classList.remove(He)),rt=null}),t.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move",rt&&rt!==t&&(n.querySelectorAll(`.${He}`).forEach(i=>i.classList.remove(He)),t.classList.add(He))}),t.addEventListener("dragleave",r=>{t.contains(r.relatedTarget)||t.classList.remove(He)}),t.addEventListener("drop",r=>{if(r.preventDefault(),t.classList.remove(He),!rt||rt===t||_d!==e)return;const i=[...n.querySelectorAll(".task-item-wrapper")],a=i.indexOf(rt),c=i.indexOf(t);a===-1||c===-1||(a<c?n.insertBefore(rt,t.nextSibling):n.insertBefore(rt,t),Zm(e,a,c))})})}let _t=null,Fe=null,Ed=0,vd=0,je=null,wd=null;function sA(n,e){n.querySelectorAll(".drag-handle").forEach(t=>{t.addEventListener("touchstart",s=>{const r=t.closest(".task-item-wrapper");if(!r)return;_t=r,je=n,wd=e;const i=r.getBoundingClientRect();Ed=s.touches[0].clientX-i.left,vd=s.touches[0].clientY-i.top,Fe=r.cloneNode(!0),Object.assign(Fe.style,{position:"fixed",width:`${i.width}px`,left:`${i.left}px`,top:`${i.top}px`,zIndex:"9999",pointerEvents:"none",opacity:"0.88",boxShadow:"0 8px 32px rgba(0,0,0,0.55)",borderRadius:"8px",transition:"none"}),document.body.appendChild(Fe),r.style.opacity="0.25"},{passive:!0}),t.addEventListener("touchmove",s=>{if(s.preventDefault(),!Fe)return;const r=s.touches[0];Fe.style.left=`${r.clientX-Ed}px`,Fe.style.top=`${r.clientY-vd}px`,Fe.style.display="none";const i=document.elementFromPoint(r.clientX,r.clientY);Fe.style.display="";const a=i==null?void 0:i.closest(".task-item-wrapper");je.querySelectorAll(`.${He}`).forEach(c=>c.classList.remove(He)),a&&a!==_t&&je.contains(a)&&a.classList.add(He)},{passive:!1}),t.addEventListener("touchend",s=>{if(!Fe)return;const r=s.changedTouches[0];Fe.style.display="none";const i=document.elementFromPoint(r.clientX,r.clientY);Fe.style.display="";const a=i==null?void 0:i.closest(".task-item-wrapper");if(a&&a!==_t&&(je!=null&&je.contains(a))){const c=[...je.querySelectorAll(".task-item-wrapper")],u=c.indexOf(_t),d=c.indexOf(a);u!==-1&&d!==-1&&(u<d?je.insertBefore(_t,a.nextSibling):je.insertBefore(_t,a),Zm(wd,u,d))}Fe.remove(),Fe=null,_t&&(_t.style.opacity=""),je==null||je.querySelectorAll(`.${He}`).forEach(c=>c.classList.remove(He)),_t=null},{passive:!0})})}function Zm(n,e,t){if(e===t)return;const s=se.find(a=>a.id===n);if(!s)return;const r=s.tasks,[i]=r.splice(e,1);r.splice(t,0,i),me({customPlan:JSON.parse(JSON.stringify(se))}).catch(a=>console.warn("[EveryDay] dragSort Firestore sync failed:",a.message))}let ce=[],kt=new Set,it=null,Br=!1,Et=null,Be=null,Td=0,Id=0;function rA(){ce=X("immediateTasks",[]).map(n=>({...n}))}function gt(){me({immediateTasks:JSON.parse(JSON.stringify(ce))}).catch(n=>console.warn("[EveryDay] immediateTasks sync failed:",n.message))}function ep(){return`imm-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function iA(){if(ce.length===0)return{done:0,total:0,pct:0};const n=ce.filter(e=>e.done).length;return{done:n,total:ce.length,pct:Math.round(n/ce.length*100)}}function bd(n){if(!n.trim())return;const e={id:ep(),title:n.trim(),desc:"",subtasks:[],startTime:"",endTime:"",done:!1,createdAt:Date.now()};ce.push(e),gt(),gr(),setTimeout(()=>{const t=document.getElementById("imm-quick-input");t&&t.focus()},50)}function oA(n){const e=ce.find(t=>t.id===n);e&&(e.done=!e.done,gt(),Yi(),pr(e))}function aA(n,e){const t=ce.find(r=>r.id===n);if(!t)return;const s=t.subtasks.find(r=>r.id===e);s&&(s.done=!s.done,gt(),Yi(),pr(t))}function cA(n){ce=ce.filter(e=>e.id!==n),kt.delete(n),gt(),gr(),H("Task removed")}function Bo(n,e,t){const s=ce.find(r=>r.id===n);s&&(s[e]=t,gt())}function lA(n,e){const t=ce.find(s=>s.id===n);!t||!e.trim()||(t.subtasks.push({id:ep(),label:e.trim(),done:!1}),gt(),pr(t))}function uA(n,e){const t=ce.find(s=>s.id===n);t&&(t.subtasks=t.subtasks.filter(s=>s.id!==e),gt(),pr(t))}function dA(){ce.length&&confirm("Clear all immediate tasks?")&&(ce=[],kt.clear(),gt(),gr(),H("Immediate tasks cleared"))}function Yi(){const n=document.getElementById("imm-progress-bar"),e=document.getElementById("imm-progress-label");if(!n||!e)return;const{done:t,total:s,pct:r}=iA();n.style.width=`${r}%`,e.textContent=s===0?"No tasks yet":`${t} of ${s} done`;const i=document.getElementById("imm-progress-fill");i&&(r===100?i.style.background="linear-gradient(90deg, #10b981, #34d399)":r>=50?i.style.background="linear-gradient(90deg, #7c3aed, #06b6d4)":i.style.background="linear-gradient(90deg, #7c3aed, #9d64f8)")}function hA(n){return!n.subtasks.length&&!kt.has(n.id)?"":`
    <div class="imm-subtasks" id="imm-subtasks-${n.id}">
      ${n.subtasks.map(e=>`
        <div class="imm-subtask-item${e.done?" done":""}"
             data-task="${n.id}" data-sub="${e.id}">
          <div class="imm-sub-checkbox"></div>
          <span class="imm-sub-label">${Ac(e.label)}</span>
          <button class="imm-sub-del" data-task="${n.id}" data-sub="${e.id}" title="Remove subtask">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `).join("")}
      ${kt.has(n.id)?`
        <div class="imm-add-subtask-row">
          <input class="imm-sub-input" id="imm-sub-input-${n.id}"
                 placeholder="Add subtask…" maxlength="80" />
          <button class="imm-sub-add-btn" data-task="${n.id}">+</button>
        </div>
      `:""}
    </div>
  `}function fA(n){return kt.has(n.id)?`
    <div class="imm-task-expand" id="imm-expand-${n.id}">
      <div class="imm-expand-inner">
        <textarea class="imm-desc-input" id="imm-desc-${n.id}"
                  placeholder="Description (optional)…"
                  rows="2">${Ac(n.desc)}</textarea>
        <div class="imm-time-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <input class="imm-time-input" id="imm-start-${n.id}"
                 type="time" value="${n.startTime}" title="Start time" />
          <span class="imm-time-sep">→</span>
          <input class="imm-time-input" id="imm-end-${n.id}"
                 type="time" value="${n.endTime}" title="End time" />
        </div>
      </div>
      ${hA(n)}
    </div>
  `:""}function tp(n){const e=kt.has(n.id),t=n.subtasks.length>0,s=n.desc.trim().length>0,r=n.startTime||n.endTime;let i="";r&&(i=`<span class="imm-time-badge">⏱ ${[n.startTime,n.endTime].filter(Boolean).join(" → ")}</span>`);let a="";return t&&(a=`<span class="imm-sub-badge">${n.subtasks.filter(u=>u.done).length}/${n.subtasks.length}</span>`),`
    <div class="imm-task-card${n.done?" done":""}${e?" expanded":""}"
         id="imm-card-${n.id}">
      <div class="imm-task-main">
        <div class="imm-drag-handle" title="Drag to reorder" aria-label="Drag to reorder">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="4" r="2"/><circle cx="15" cy="4" r="2"/>
            <circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>
            <circle cx="9" cy="20" r="2"/><circle cx="15" cy="20" r="2"/>
          </svg>
        </div>
        <button class="imm-checkbox${n.done?" checked":""}"
                data-action="toggle" data-id="${n.id}"
                aria-label="${n.done?"Mark incomplete":"Mark complete"}">
        </button>
        <div class="imm-task-body">
          <span class="imm-task-title${n.done?" done":""}">${Ac(n.title)}</span>
          <div class="imm-task-meta">
            ${i}
            ${a}
            ${s?'<span class="imm-has-desc-dot" title="Has description"></span>':""}
          </div>
        </div>
        <div class="imm-task-actions">
          <button class="imm-expand-btn${e?" open":""}"
                  data-action="expand" data-id="${n.id}"
                  aria-label="${e?"Collapse":"Expand"}" title="Details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="${e?"18 15 12 9 6 15":"6 9 12 15 18 9"}"/>
            </svg>
          </button>
          <button class="imm-del-btn"
                  data-action="delete" data-id="${n.id}"
                  aria-label="Delete task" title="Delete">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      ${fA(n)}
    </div>
  `}function pr(n){const e=document.getElementById(`imm-card-${n.id}`);if(!e)return;const t=document.createElement("div");t.innerHTML=tp(n);const s=t.firstElementChild;e.replaceWith(s),np(s,n),Yi()}function np(n,e){var c,u,d;(c=n.querySelector('[data-action="toggle"]'))==null||c.addEventListener("click",f=>{f.stopPropagation(),oA(e.id)}),(u=n.querySelector('[data-action="expand"]'))==null||u.addEventListener("click",f=>{f.stopPropagation(),kt.has(e.id)?kt.delete(e.id):kt.add(e.id),pr(e)}),(d=n.querySelector('[data-action="delete"]'))==null||d.addEventListener("click",f=>{f.stopPropagation(),cA(e.id)});const t=n.querySelector(`#imm-desc-${e.id}`);t&&t.addEventListener("input",()=>Bo(e.id,"desc",t.value));const s=n.querySelector(`#imm-start-${e.id}`);s&&s.addEventListener("change",()=>Bo(e.id,"startTime",s.value));const r=n.querySelector(`#imm-end-${e.id}`);r&&r.addEventListener("change",()=>Bo(e.id,"endTime",r.value)),n.querySelectorAll(".imm-subtask-item").forEach(f=>{f.addEventListener("click",p=>{p.target.closest(".imm-sub-del")||aA(f.dataset.task,f.dataset.sub)})}),n.querySelectorAll(".imm-sub-del").forEach(f=>{f.addEventListener("click",p=>{p.stopPropagation(),uA(f.dataset.task,f.dataset.sub)})});const i=n.querySelector(`[data-task="${e.id}"].imm-sub-add-btn`),a=n.querySelector(`#imm-sub-input-${e.id}`);if(i&&a){const f=()=>{a.value.trim()&&(lA(e.id,a.value),a.value="",a.focus())};i.addEventListener("click",f),a.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),f())})}}function mA(){const n=document.getElementById("imm-task-list");if(n){if(ce.length===0){n.innerHTML=`
      <div class="imm-empty" id="imm-empty">
        <div class="imm-empty-icon">⚡</div>
        <p>No immediate tasks.</p>
        <p class="imm-empty-hint">Use the field below to capture a thought fast.</p>
      </div>
    `;return}n.innerHTML=ce.map(e=>tp(e)).join(""),ce.forEach(e=>{const t=document.getElementById(`imm-card-${e.id}`);t&&np(t,e)}),gA(n)}}function gr(){rA(),Yi(),mA(),pA()}function pA(){const n=document.getElementById("imm-quick-input"),e=document.getElementById("imm-quick-add-btn"),t=document.getElementById("imm-clear-btn");n&&!n._immListenerAttached&&(n._immListenerAttached=!0,n.addEventListener("keydown",s=>{s.key==="Enter"&&n.value.trim()&&(s.preventDefault(),bd(n.value),n.value="")}),e==null||e.addEventListener("click",()=>{n.value.trim()&&(bd(n.value),n.value=""),n.focus()}),t==null||t.addEventListener("click",dA))}function gA(n){n&&n.querySelectorAll(".imm-task-card").forEach(e=>{e.draggable=!1;const t=e.querySelector(".imm-drag-handle");t&&(t.addEventListener("mousedown",()=>{Br=!0,e.draggable=!0}),e.addEventListener("mouseup",()=>{it||(Br=!1,e.draggable=!1)}),e.addEventListener("dragstart",s=>{if(!Br){s.preventDefault();return}it=e,e.classList.add("imm-dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",e.id),Br=!1}),e.addEventListener("dragend",()=>{e.classList.remove("imm-dragging"),e.draggable=!1,n.querySelectorAll(".imm-drag-over").forEach(s=>s.classList.remove("imm-drag-over")),it=null}),e.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move",it&&it!==e&&(n.querySelectorAll(".imm-drag-over").forEach(r=>r.classList.remove("imm-drag-over")),e.classList.add("imm-drag-over"))}),e.addEventListener("dragleave",s=>{e.contains(s.relatedTarget)||e.classList.remove("imm-drag-over")}),e.addEventListener("drop",s=>{if(s.preventDefault(),e.classList.remove("imm-drag-over"),!it||it===e)return;const r=[...n.querySelectorAll(".imm-task-card")],i=r.indexOf(it),a=r.indexOf(e);if(i===-1||a===-1)return;i<a?n.insertBefore(it,e.nextSibling):n.insertBefore(it,e);const[c]=ce.splice(i,1);ce.splice(a,0,c),gt()}),t.addEventListener("touchstart",s=>{const r=e.getBoundingClientRect();Et=e,Td=s.touches[0].clientX-r.left,Id=s.touches[0].clientY-r.top,Be=e.cloneNode(!0),Object.assign(Be.style,{position:"fixed",width:`${r.width}px`,left:`${r.left}px`,top:`${r.top}px`,zIndex:"9999",pointerEvents:"none",opacity:"0.88",boxShadow:"0 8px 32px rgba(0,0,0,0.55)",borderRadius:"12px",transition:"none"}),document.body.appendChild(Be),e.style.opacity="0.25"},{passive:!0}),t.addEventListener("touchmove",s=>{if(s.preventDefault(),!Be)return;const r=s.touches[0];Be.style.left=`${r.clientX-Td}px`,Be.style.top=`${r.clientY-Id}px`,Be.style.display="none";const i=document.elementFromPoint(r.clientX,r.clientY);Be.style.display="";const a=i==null?void 0:i.closest(".imm-task-card");n.querySelectorAll(".imm-drag-over").forEach(c=>c.classList.remove("imm-drag-over")),a&&a!==Et&&n.contains(a)&&a.classList.add("imm-drag-over")},{passive:!1}),t.addEventListener("touchend",s=>{if(!Be)return;const r=s.changedTouches[0];Be.style.display="none";const i=document.elementFromPoint(r.clientX,r.clientY);Be.style.display="";const a=i==null?void 0:i.closest(".imm-task-card");if(a&&a!==Et&&n.contains(a)){const c=[...n.querySelectorAll(".imm-task-card")],u=c.indexOf(Et),d=c.indexOf(a);if(u!==-1&&d!==-1){u<d?n.insertBefore(Et,a.nextSibling):n.insertBefore(Et,a);const[f]=ce.splice(u,1);ce.splice(d,0,f),gt()}}Be.remove(),Be=null,Et&&(Et.style.opacity=""),n.querySelectorAll(".imm-drag-over").forEach(c=>c.classList.remove("imm-drag-over")),Et=null},{passive:!0}))})}function Ac(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Uo(n){document.querySelectorAll(".view").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".nav-tab").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".mobile-nav-btn").forEach(r=>r.classList.remove("active"));const e=document.getElementById(`view-${n}`),t=document.getElementById(`tab-${n}`),s=document.getElementById(`mob-tab-${n}`);if(e&&e.classList.add("active"),t&&t.classList.add("active"),s&&s.classList.add("active"),S.currentView=n,n!=="dashboard"){const r=document.getElementById("phase-panel");r&&(r.hidden=!0)}n==="immediate"&&gr(),n==="history"&&Km(),n==="progression"&&Qk(),n==="settings"&&Jm()}function yA(){var u,d,f,p,w,A,C,N,L,j;document.querySelectorAll(".nav-tab").forEach(M=>{M.addEventListener("click",()=>Uo(M.dataset.view))}),document.querySelectorAll(".mobile-nav-btn").forEach(M=>{M.addEventListener("click",()=>Uo(M.dataset.view))}),(u=document.getElementById("focus-mode-toggle"))==null||u.addEventListener("click",()=>{const M=se.find(J=>pt(J)==="active"),W=se.find(J=>pt(J)==="upcoming"),oe=se.find(J=>{const{total:v,done:g}=gc(J);return g<v}),ue=M||W||oe||se[0];Lm(ue.id)}),(d=document.getElementById("focus-exit-btn"))==null||d.addEventListener("click",ga),(f=document.getElementById("timer-start"))==null||f.addEventListener("click",()=>{}),(p=document.getElementById("timer-reset"))==null||p.addEventListener("click",dk),(w=document.getElementById("min-mode-toggle"))==null||w.addEventListener("change",M=>{S.minimumMode=M.target.checked,pk(),H(S.minimumMode?"🛡 Minimum Mode ON — essential tasks shown":"Full mode restored")}),(A=document.getElementById("edit-plan-btn"))==null||A.addEventListener("click",wk),(C=document.getElementById("inline-save-btn"))==null||C.addEventListener("click",Ik),(N=document.getElementById("inline-cancel-btn"))==null||N.addEventListener("click",Tk),(L=document.getElementById("plan-tomorrow-btn"))==null||L.addEventListener("click",()=>{Uo("dashboard"),setTimeout(()=>{const M=document.getElementById("tomorrow-plan-card");M&&(M.scrollIntoView({behavior:"smooth",block:"start"}),M.classList.remove("tmp-highlight"),M.offsetWidth,M.classList.add("tmp-highlight"))},80)}),(j=document.getElementById("notify-btn"))==null||j.addEventListener("click",Yk),document.addEventListener("keydown",M=>{var W;M.key==="Escape"&&!((W=document.getElementById("focus-overlay"))!=null&&W.hidden)&&ga()}),Bk(),eA(),window.addEventListener("everyday:blocksRendered",()=>Xm());const n=document.getElementById("metric-phase"),e=document.getElementById("phase-panel"),t=document.getElementById("phase-panel-close");function s(){if(!e)return;const M=e.hidden;e.hidden=!M,M&&(Qm(),setTimeout(()=>e.scrollIntoView({behavior:"smooth",block:"nearest"}),50))}n==null||n.addEventListener("click",s),n==null||n.addEventListener("keydown",M=>{(M.key==="Enter"||M.key===" ")&&(M.preventDefault(),s())}),t==null||t.addEventListener("click",()=>{e&&(e.hidden=!0)});const r=document.getElementById("collapse-all-btn"),i=document.getElementById("collapse-label"),a=document.getElementById("collapse-icon");let c=!1;r==null||r.addEventListener("click",()=>{c=!c,document.querySelectorAll(".block-card").forEach(M=>{const W=M.id.replace("block-card-",""),oe=document.getElementById(`block-header-${W}`);M.classList.toggle("expanded",!c),oe==null||oe.setAttribute("aria-expanded",String(!c)),c?S.expandedBlocks.delete(W):S.expandedBlocks.add(W)}),i.textContent=c?"Expand All":"Collapse All",a.querySelector("polyline").setAttribute("points",c?"6 9 12 15 18 9":"18 15 12 9 6 15")})}async function _A(){try{const t=await xe.streak.update();S.streak=t.streak;const[s,r,i,a]=await Promise.all([xe.tasks.getToday(),xe.history.getAll(),xe.settings.get(),xe.settings.getPhase()]);S.tasks=s.tasks||{},S.history=r||[],S.settings=i||{name:"",goal:"",reminders:{}},S.phase=a.phase||"stabilization"}catch(t){console.error("[EveryDay] Boot error:",t.message)}const n=X("eodLocked",null);n&&n===er()?(Vk(),new Date().getHours()<4&&(S.eodLocked=!0)):S.eodLocked=!1,Ek(),yk(),Gi(),rs(),yc(),_c(),qm(),$m(),Xm();const e=document.getElementById("min-mode-toggle");e&&(e.checked=S.minimumMode),yA(),gk(),"Notification"in window&&Notification.permission==="granted"&&(S.notificationsEnabled=!0,Qi()),nk(),console.log("[EveryDay] Booted. Phase:",S.phase,"| Streak:",S.streak.count)}const EA=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1";let $s=!1;async function vA(n){const e=new URLSearchParams(window.location.search),t=e.get("verify"),s=e.get("uid");if(t&&window.history.replaceState({},"",window.location.pathname),!t||s!==n)return!1;const r=X("verificationToken",null),i=X("tokenCreatedAt",null);if(!r||r!==t)return console.warn("[EveryDay] Verification token mismatch or already used."),!1;if(i&&Date.now()-new Date(i).getTime()>24*60*60*1e3)return console.warn("[EveryDay] Verification token expired (>24 h). Please resend."),!1;try{return await me({emailVerified:!0,verificationToken:null,tokenCreatedAt:null}),console.log("[EveryDay] ✅ Email verified via Brevo token!"),!0}catch(a){return console.error("[EveryDay] Failed to write emailVerified to Firestore:",a.message),!1}}let jn=null;function wA(n){if($s){if(n.lastUpdated&&jn&&n.lastUpdated<jn){console.log("[EveryDay] ⏭ Skipping genuinely stale remote snapshot.");return}switch(jn=n.lastUpdated||jn,S.tasks=n.tasks||{},S.streak=n.streak||S.streak,S.history=n.history||[],S.settings=n.settings||S.settings,S.phase=n.phase||S.phase,S.eodLocked=n.eodLocked||null,S.planTomorrow=n.planTomorrow||null,n.customPlan&&(se.length=0,n.customPlan.forEach(e=>se.push(e))),S.notificationsEnabled&&Qi(),yc(),_c(),S.currentView){case"dashboard":Gi(),rs(),Qm(),qm(),$m();break;case"immediate":gr();break;case"history":Km();break;case"settings":Jm();break}console.log("[EveryDay] 🔄 Remote update applied from another device.")}}async function kd(n){jn=X("lastUpdated",null),await _A(),dT(n,wA)}function TA(){pa(),zb(async n=>{if(n){try{await uT(n.uid)}catch(s){console.warn("[EveryDay] Pre-auth data load failed:",s.message)}const e=X("emailVerified",!1);if(!(n.emailVerified||e)&&!await vA(n.uid))if(EA)console.warn("%c[EveryDay DEV] ⚠️  EMAIL VERIFICATION BYPASSED","background:#7c3aed;color:#fff;padding:4px 10px;border-radius:4px;font-weight:700;font-size:13px"),console.warn(`[EveryDay DEV] User "${n.email}" is NOT verified.
  → Gate skipped on localhost — sign up fresh to get a Brevo email.
  → In production this blocks the user until they verify.`);else{ld(),Jb();return}ld(),$s||($s=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>kd(n.uid)):await kd(n.uid))}else hT(),Pk(),jn=null,$s?($s=!1,location.reload()):pa()})}TA();
