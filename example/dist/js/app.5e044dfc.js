(function(e){function n(n){for(var r,l,u=n[0],s=n[1],c=n[2],d=0,f=[];d<u.length;d++)l=u[d],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&f.push(i[l][0]),i[l]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);a&&a(n);while(f.length)f.shift()();return o.push.apply(o,c||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,u=1;u<t.length;u++){var s=t[u];0!==i[s]&&(r=!1)}r&&(o.splice(n--,1),e=l(l.s=t[0]))}return e}var r={},i={app:0},o=[];function l(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=e,l.c=r,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)l.d(t,r,function(n){return e[n]}.bind(null,r));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="/webgl-helix-ribbon/example/dist/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=n,u=u.slice();for(var c=0;c<u.length;c++)n(u[c]);var a=s;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("85ec")},"1f9b":function(e,n,t){e.exports=t.p+"img/photos.b0a9075f.png"},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("HelloWorld",{attrs:{textureUrl:e.texture}})],1)},o=[],l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"hello"},[t("div",{ref:"container"}),e._v(" > ")])},u=[],s=t("b5fd"),c={name:"HelloWorld",props:{textureUrl:String},mounted:function(){this.helixRibbonScene=new s["HelixRibbonScene"](window.innerWidth,window.innerHeight,{height:1.3,radius:1.7,thickness:.021,turnovers:3,turnoverSteps:30,shiftMultiplier:3,textureUrl:this.textureUrl}).prepare(),this.helixRibbonScene.setRotationSpeed(.005),this.helixRibbonScene.render(this.$refs.container),window.addEventListener("resize",this.onWindowResize),window.addEventListener("wheel",this.onWheel)},destroyed:function(){this.helixRibbonScene.destroy(),window.removeEventListener("resize",this.onWindowResize),window.removeEventListener("wheel",this.onWheel)},methods:{onWindowResize:function(){this.helixRibbonScene.resize(window.innerWidth,window.innerHeight)},onWheel:function(e){this.helixRibbonScene.addRotationDelta(e.deltaY/3*Math.PI/360)}}},a=c,d=(t("b853"),t("2877")),f=Object(d["a"])(a,l,u,!1,null,"0e8182ae",null),p=f.exports,h=t("1f9b"),b=t.n(h),w={name:"App",components:{HelloWorld:p},data:function(){return{texture:b.a}}},v=w,x=(t("034f"),Object(d["a"])(v,i,o,!1,null,null,null)),g=x.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(g)}}).$mount("#app")},"85ec":function(e,n,t){},b853:function(e,n,t){"use strict";t("cebf")},cebf:function(e,n,t){}});
//# sourceMappingURL=app.5e044dfc.js.map