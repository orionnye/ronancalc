(this.webpackJsonpronancalc=this.webpackJsonpronancalc||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(1),c=n.n(s),i=n(7),r=n.n(i),l=(n(16),n(5),n(2)),o=(n(17),n(6),n(8)),u=window.observers=new Map;function d(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"state",a=window[n]=null!==(t=window[n])&&void 0!==t?t:e,c=Object(s.useState)(a),i=Object(l.a)(c,2),r=(i[0],i[1]),d=u.get(n);null==d&&(d=new Set,u.set(n,d)),Object(s.useEffect)((function(){return d.add(r),function(){d.delete(r)}}));var h=function(e){window[n]=e;var t,a=Object(o.a)(d);try{for(a.s();!(t=a.n()).done;){(0,t.value)(e)}}catch(s){a.e(s)}finally{a.f()}};return[a,h]}var h=n(9),j=n(10),v=function(){function e(t,n){Object(h.a)(this,e),this.x=t,this.y=n}return Object(j.a)(e,[{key:"subtract",value:function(t){return new e(this.x-t.x,this.y-t.y)}},{key:"add",value:function(t){return new e(this.x+t.x,this.y+t.y)}},{key:"cross",value:function(t){return new e(this.x*t.x,this.y*t.y)}},{key:"scale",value:function(t){return new e(this.x*t,this.y*t)}},{key:"length",get:function(){var e=this.x,t=this.y;return Math.sqrt(e*e+t*t)}},{key:"signs",get:function(){var t=this.x,n=this.y;return new e(Math.sign(t),Math.sign(n))}},{key:"normal",get:function(){var e=1/this.length;return this.scale(e)}}]),e}();function b(e){for(var t=e.value,n=e.radix,a=e.color,s=void 0===a?"orange":a,c=new v(11,11),i=2*-Math.PI,r=i/n,l=i/n/2,o="",u=t%n===0?n:t%n,d=0;d<=u;d++){var h=Math.sin(r*d+l),j=Math.cos(r*d+l),b=c.add(new v(h,j).scale(10));o=o+b.x+" "+b.y+" ",d===parseInt(n)&&(o=o+0+" "+b.y)}return'data:image/svg+xml;utf8,\n    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-4 -5 30 30" xml:space="preserve">\n        <g>\n            <polyline points="'.concat(o,'" stroke="').concat(s,'" fill="transparent" strokeWidth="').concat(1,'"/>\n        </g>\n    </svg>')}function p(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"black",s=e.toString(),c=[];s<0&&c.push("-");for(var i=0;i<s.length;i++){var r=parseInt(s[i],t),l=Object(a.jsx)("div",{className:"symbolBox",children:Object(a.jsx)("img",{alt:"broken",src:b({value:r,radix:t,color:n})})},e+"#: "+i);c.push(l)}return c}function x(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"black",s=e.split(" "),c=[];return c.push(Object(a.jsx)("div",{className:"fillBox"},"fillStart: "+e)),s.forEach((function(e){isNaN(parseInt(e,t))?c.push(e):c.push(p(e,t,n))})),c.push(Object(a.jsx)("div",{className:"fillBox"},"fillEnd: "+e)),Object(a.jsx)("div",{className:"symbolRow",children:c},e)}function f(){var e=d(4,"radix"),t=Object(l.a)(e,2),n=t[0],s=t[1],c=d(!1,"arabic"),i=Object(l.a)(c,2),r=i[0],o=i[1];return Object(a.jsxs)("div",{className:"dataTap",children:[Object(a.jsx)("img",{className:"radixDisplay",alt:"broken",src:b({value:0,radix:n,color:"orange"})}),Object(a.jsxs)("div",{className:"inputBar",children:[Object(a.jsxs)("div",{className:"radixLabel",children:["Radix:",Object(a.jsx)("input",{className:"ronanInput",type:"number",defaultValue:n,onChange:function(e){e.target.value<2?e.target.value=2:e.target.value>36&&(e.target.value=36),s(e.target.value)}})]}),Object(a.jsxs)("div",{className:"radixLabel",children:["Western Arabic:",Object(a.jsx)("input",{className:"systemBox",type:"checkbox",checked:r,onChange:function(e){o(e.target.checked)}})]})]})]})}function g(e){var t=e.value,n=e.radix,s=70/Math.ceil(Math.sqrt(n))+"%";return Object(a.jsx)("button",{className:"numberButton",style:{minWidth:s,fontSize:"4vmin"},onClick:e.handleClick,children:t})}function m(e,t){var n="";return e.split(" ").forEach((function(e){isNaN(parseFloat(e))?n+=" "+e+" ":n+=parseFloat(e).toString(t)})),n}function O(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=e.map((function(e,s){var c=n?m(e,t):x(m(e,t),t,"orange");return Object(a.jsx)("div",{className:"displayRow",children:c},"display:"+s)}));return s}function y(){var e=Object(s.useState)(["5 + 5 = ","10"]),t=Object(l.a)(e,2),n=t[0],c=t[1],i=d(4,"radix"),r=Object(l.a)(i,1)[0],o=d(!0,"arabic"),u=Object(l.a)(o,1)[0];Object(s.useEffect)((function(){var e=document.getElementById("display");e.scrollTop=e.scrollHeight}));var h=[" / "," * "," - "," + "].map((function(e){return Object(a.jsx)(g,{value:e,handleClick:function(){var t=n.slice(0);t[t.length-1]+=e,c(t)}},e)}));h.push(Object(a.jsx)(g,{value:" =",handleClick:function(){var e=n.slice(0),t=e.pop(),a=function(e){for(var t=0,n="+",a=0;a<e.length;a++){var s=e[a];console.log(s,t),isNaN(parseFloat(s))?n=s:(s=parseFloat(e[a]),"/"===n?t/=s:"*"===n?t*=s:"-"===n?t-=s:"+"===n&&(t+=s))}return t.toString()}(t.split(" "));t+=" = "+a,e.push(t),e.push(a),c(e)}}," =")),h.push(Object(a.jsx)(g,{value:"c",handleClick:function(){var e=n.slice(0),t=e.pop();t+=" c",e.push(t),e.push("0"),c(e)}},"c"));for(var j=[],v=1;v<r;v++)j.push(v.toString(r));j.push(0);var b=j.map((function(e){return Object(a.jsx)(g,{value:u?e:p(e,r,"orange"),radix:r,handleClick:function(){var t=n.slice(0),a=function(e,t,n){var a=e.slice(0),s=a.split(" ").pop();return isNaN(parseFloat(s))?e+n.toString():a.substring(0,a.length-s.length)+(parseFloat(s)*t+n).toString()}(t.pop(),r,parseInt(e,r));t.push(a),c(t)}},"#"+e)}));return Object(a.jsxs)("div",{className:"calculator",children:[Object(a.jsx)("div",{id:"display",className:"display",children:Object(a.jsx)("div",{className:"calcScroll",children:O(n,r,u)})},"display"),Object(a.jsxs)("div",{className:"calcRow",children:[Object(a.jsx)("div",{className:"numPad",children:b}),Object(a.jsx)("div",{className:"operationPad",children:h})]})]},"parent")}function N(){return Object(a.jsxs)("div",{className:"banner",children:[Object(a.jsxs)("div",{className:"acronym",children:["RoNaN System",Object(a.jsx)("br",{})]}),"Radial-open, Not a Number System"]})}var w=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(N,{}),Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)(f,{}),Object(a.jsx)(y,{})]}),Object(a.jsx)("text",{children:"RoNaN recommended radix range(oooh alliteration) is between 3-8, and 12 if you think of a clock."}),Object(a.jsx)("br",{}),Object(a.jsx)("text",{children:"This is just a calculator to help me test my wacky number system, Pay no attention to the wonky CSS behind the curtain."}),Object(a.jsx)("p",{children:"Designed and Developed by Orion Nye"})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),s(e),c(e),i(e)}))};r.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(w,{})}),document.getElementById("root")),k()},5:function(e,t,n){},6:function(e,t,n){}},[[18,1,2]]]);
//# sourceMappingURL=main.2b50e49a.chunk.js.map