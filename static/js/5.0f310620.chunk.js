(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{117:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(7),s=a(6),i=a(1),c=a.n(i),l=a(0),u=a.n(l),d=a(5),m=a.n(d),f=a(2),p={children:u.a.node,inline:u.a.bool,tag:f.h,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),className:u.a.string,cssModule:u.a.object},h=function(e){function t(t){var a;return(a=e.call(this,t)||this).getRef=a.getRef.bind(Object(o.a)(a)),a.submit=a.submit.bind(Object(o.a)(a)),a}Object(s.a)(t,e);var a=t.prototype;return a.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},a.submit=function(){this.ref&&this.ref.submit()},a.render=function(){var e=this.props,t=e.className,a=e.cssModule,o=e.inline,s=e.tag,i=e.innerRef,l=Object(r.a)(e,["className","cssModule","inline","tag","innerRef"]),u=Object(f.e)(m()(t,!!o&&"form-inline"),a);return c.a.createElement(s,Object(n.a)({},l,{ref:i,className:u}))},t}(i.Component);h.propTypes=p,h.defaultProps={tag:"form"},t.a=h},118:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(1),s=a.n(o),i=a(0),c=a.n(i),l=a(5),u=a.n(l),d=a(2),m={tag:d.h,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,o=e.tag,i=Object(r.a)(e,["className","cssModule","tag"]),c=Object(d.e)(u()(t,"card-title"),a);return s.a.createElement(o,Object(n.a)({},i,{className:c}))};f.propTypes=m,f.defaultProps={tag:"div"},t.a=f},119:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(1),s=a.n(o),i=a(0),c=a.n(i),l=a(5),u=a.n(l),d=a(2),m={children:c.a.node,row:c.a.bool,check:c.a.bool,inline:c.a.bool,disabled:c.a.bool,tag:d.h,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,o=e.row,i=e.disabled,c=e.check,l=e.inline,m=e.tag,f=Object(r.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),p=Object(d.e)(u()(t,!!o&&"row",c?"form-check":"form-group",!(!c||!l)&&"form-check-inline",!(!c||!i)&&"disabled"),a);return s.a.createElement(m,Object(n.a)({},f,{className:p}))};f.propTypes=m,f.defaultProps={tag:"div"},t.a=f},120:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(1),s=a.n(o),i=a(0),c=a.n(i),l=a(5),u=a.n(l),d=a(25),m=a.n(d),f=a(2),p=c.a.oneOfType([c.a.number,c.a.string]),h=c.a.oneOfType([c.a.string,c.a.number,c.a.shape({size:p,order:p,offset:p})]),g={children:c.a.node,hidden:c.a.bool,check:c.a.bool,size:c.a.string,for:c.a.string,tag:f.h,className:c.a.string,cssModule:c.a.object,xs:h,sm:h,md:h,lg:h,xl:h,widths:c.a.array},b={tag:"label",widths:["xs","sm","md","lg","xl"]},v=function(e,t,a){return!0===a||""===a?e?"col":"col-"+t:"auto"===a?e?"col-auto":"col-"+t+"-auto":e?"col-"+a:"col-"+t+"-"+a},y=function(e){var t=e.className,a=e.cssModule,o=e.hidden,i=e.widths,c=e.tag,l=e.check,d=e.size,p=e.for,h=Object(r.a)(e,["className","cssModule","hidden","widths","tag","check","size","for"]),g=[];i.forEach(function(t,n){var r=e[t];if(delete h[t],r||""===r){var o,s=!n;if(m()(r)){var i,c=s?"-":"-"+t+"-";o=v(s,t,r.size),g.push(Object(f.e)(u()(((i={})[o]=r.size||""===r.size,i["order"+c+r.order]=r.order||0===r.order,i["offset"+c+r.offset]=r.offset||0===r.offset,i))),a)}else o=v(s,t,r),g.push(o)}});var b=Object(f.e)(u()(t,!!o&&"sr-only",!!l&&"form-check-label",!!d&&"col-form-label-"+d,g,!!g.length&&"col-form-label"),a);return s.a.createElement(c,Object(n.a)({htmlFor:p},h,{className:b}))};y.propTypes=g,y.defaultProps=b,t.a=y},121:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(1),s=a.n(o),i=a(0),c=a.n(i),l=a(5),u=a.n(l),d=a(2),m={children:c.a.node,tag:d.h,className:c.a.string,cssModule:c.a.object,valid:c.a.bool,tooltip:c.a.bool},f={tag:"div",valid:void 0},p=function(e){var t=e.className,a=e.cssModule,o=e.valid,i=e.tooltip,c=e.tag,l=Object(r.a)(e,["className","cssModule","valid","tooltip","tag"]),m=i?"tooltip":"feedback",f=Object(d.e)(u()(t,o?"valid-"+m:"invalid-"+m),a);return s.a.createElement(c,Object(n.a)({},l,{className:f}))};p.propTypes=m,p.defaultProps=f,t.a=p},137:function(e,t,a){"use strict";a.r(t);var n=a(18),r=a(11),o=a(12),s=a(15),i=a(13),c=a(7),l=a(14),u=a(1),d=a.n(u),m=a(67),f=a(74),p=a(75),h=a(117),g=a(133),b=a(118),v=a(119),y=a(120),j=a(129),O=a(121),w=a(116),E=a(78),k=a.n(E),x=a(80),N=a.n(x),C=a(24),M=a.n(C),P=a(10),R=a(17),T=a(85),U=a.n(T),S=a(26),I=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={username:"",password:"",loading:!1,usernameError:"",passwordError:"",error:"",redirect:""},a.handlePasswordChange=a.handlePasswordChange.bind(Object(c.a)(a)),a.handleUsernameChange=a.handleUsernameChange.bind(Object(c.a)(a)),a.renderButtonText=a.renderButtonText.bind(Object(c.a)(a)),a.onLoginPress=a.onLoginPress.bind(Object(c.a)(a)),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=(new S.a).get("token");t&&t.length>0&&N.a.fire({title:"You have already Log In",type:"info",text:"Redirecting...",timer:"2000",animation:!0}).then(function(){e.setState({redirect:"/"})})}},{key:"onLoginPress",value:function(){var e=this,t=this.state,a=t.username,r=t.password;this.setState(function(e){return Object(n.a)({},e,{loading:!0})});k.a.post("https://api.stya.net/nim/login",U.a.stringify({username:a,password:r}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){var a=t.data;"OK"===a.status?N.a.fire({title:"Success",type:"success",text:"Log In success!",timer:"1500",animation:!0}).then(function(){(new S.a).set("token",a.token,{maxAge:86400}),e.setState({loading:!1,redirect:"/"})}):(N.a.fire({title:"Failed",type:"info",text:a.status,timer:"2000",animation:!0}),e.setState({loading:!1,password:""}))}).catch(function(){N.a.fire({title:"Error",type:"info",text:"Login failed",timer:"2000",animation:!0}),e.setState({loading:!1,password:""})})}},{key:"handleUsernameChange",value:function(e){var t=e.target,a="";t.value&&t.value.length>20&&(a="Username melebihi batas 20 karakter"),this.setState({username:t.value,usernameError:a})}},{key:"handlePasswordChange",value:function(e){var t=e.target;this.setState({password:t.value,error:""})}},{key:"renderButtonText",value:function(){return this.state.loading?d.a.createElement(M.a,{name:"spinner",size:"2x",spin:!0}):"Login"}},{key:"renderError",value:function(){var e=this.state.error;return""!==e?d.a.createElement("div",{className:"alert alert-danger",role:"alert"},e):null}},{key:"render",value:function(){var e=this.state,t=e.username,a=e.password,n=e.loading,r=e.usernameError,o=e.passwordError,s=e.redirect;return s?d.a.createElement(P.a,{to:{pathname:s},push:!0}):d.a.createElement("div",{style:{flex:"1 1 auto",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem 0"}},d.a.createElement(m.a,null,d.a.createElement(f.a,null,d.a.createElement(p.a,{style:{maxWidth:"24rem"},className:"mx-auto"},d.a.createElement("div",{className:"text-center mb-4"},d.a.createElement("h3",null,"Aromage NIMFinder")),d.a.createElement(h.a,{className:"card",onSubmit:function(e){return e.preventDefault()}},d.a.createElement(g.a,{className:"p-4"},d.a.createElement(b.a,{style:{fontSize:"1.125rem"}},"Login to your account"),d.a.createElement(v.a,null,d.a.createElement(y.a,{for:"login-username"},"Username"),d.a.createElement(j.a,{type:"text",onChange:this.handleUsernameChange,value:t||"",name:"username",id:"login-username",placeholder:" ",invalid:r.length>0}),d.a.createElement(O.a,{style:{display:r.length>0&&""!==t?"block":"none"}},r)),d.a.createElement(v.a,null,d.a.createElement(y.a,{for:"login-password"},"Password"),d.a.createElement(j.a,{type:"password",name:"password",id:"login-password",onChange:this.handlePasswordChange,placeholder:" ",value:a||""}),d.a.createElement(O.a,{style:{display:o.length>0&&""!==a?"block":"none"}},o)),d.a.createElement("div",{style:{marginTop:"1.5rem"}},d.a.createElement(w.a,{color:"primary",block:!0,onClick:this.onLoginPress,type:"submit",disabled:o.length>0||n||t.length<1||a.length<1||t.length>20},this.renderButtonText())))),d.a.createElement("div",{className:"text-center mt-2"},d.a.createElement(R.b,{to:"/register"},"Don't have account? Sign Up"))))))}}]),t}(d.a.PureComponent);t.default=Object(P.e)(I)},85:function(e,t,a){"use strict";t.decode=t.parse=a(86),t.encode=t.stringify=a(87)},86:function(e,t,a){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,a,o){t=t||"&",a=a||"=";var s={};if("string"!==typeof e||0===e.length)return s;var i=/\+/g;e=e.split(t);var c=1e3;o&&"number"===typeof o.maxKeys&&(c=o.maxKeys);var l=e.length;c>0&&l>c&&(l=c);for(var u=0;u<l;++u){var d,m,f,p,h=e[u].replace(i,"%20"),g=h.indexOf(a);g>=0?(d=h.substr(0,g),m=h.substr(g+1)):(d=h,m=""),f=decodeURIComponent(d),p=decodeURIComponent(m),n(s,f)?r(s[f])?s[f].push(p):s[f]=[s[f],p]:s[f]=p}return s};var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},87:function(e,t,a){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,a,i){return t=t||"&",a=a||"=",null===e&&(e=void 0),"object"===typeof e?o(s(e),function(s){var i=encodeURIComponent(n(s))+a;return r(e[s])?o(e[s],function(e){return i+encodeURIComponent(n(e))}).join(t):i+encodeURIComponent(n(e[s]))}).join(t):i?encodeURIComponent(n(i))+a+encodeURIComponent(n(e)):""};var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function o(e,t){if(e.map)return e.map(t);for(var a=[],n=0;n<e.length;n++)a.push(t(e[n],n));return a}var s=Object.keys||function(e){var t=[];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.push(a);return t}}}]);
//# sourceMappingURL=5.0f310620.chunk.js.map