"use strict";(self.webpackChunke_commerce=self.webpackChunke_commerce||[]).push([[829,754],{9522:function(n,e,t){t.d(e,{W2:function(){return g}});var i,r,o=t(9439),a=t(168),c=t(8789),s=t(6884),l=t(5029),d=t(2791),u=t(9434),p=t(2436),x=t(7616),h=t(3754),f=t(184),g=c.ZP.div(i||(i=(0,a.Z)(["\n  flex: 1;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  flex-wrap: wrap;\n  gap: 10px;\n  max-width: 320px;\n  min-width: 260px;\n  padding: 5px;\n  overflow: hidden;\n  color: ",";\n  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);\n  transition: all 0.3s;\n"])),(function(n){return n.theme.color})),m=(0,c.ZP)(h.ButtonsContainer)(r||(r=(0,a.Z)(["\n  justify-content: space-between;\n"])));e.ZP=function(n){var e=n.a,t=(0,d.useState)(""),i=(0,o.Z)(t,2),r=i[0],a=i[1],c=(0,d.useState)(!1),h=(0,o.Z)(c,2),v=h[0],j=h[1],Z=(0,u.v9)(x.oV),b=(0,u.I0)();return(0,d.useEffect)((function(){a(e.content),j(e.active)}),[e]),(0,f.jsxs)(g,{children:[(0,f.jsx)(s.II,{value:r,onChange:function(n){return a(n.target.value)}}),(0,f.jsxs)("div",{children:[(0,f.jsx)("input",{id:"active",checked:v,onChange:function(n){j(n.target.checked)},type:"checkbox",style:{marginRight:5}}),(0,f.jsx)("label",{title:"Created at ".concat(e.createdAt.slice(0,10)),htmlFor:"active",children:"Active"})]}),(0,f.jsxs)(m,{children:[(0,f.jsx)(l.b,{type:"checkout",onClick:function(){b((0,p._5)({token:Z.token,id:e.id}))},children:"delete"}),(0,f.jsx)(l.b,{onClick:function(){b((0,p.mW)({token:Z.token,newData:{content:r,active:v},id:e.id}))},children:"update"})]})]})}},7889:function(n,e,t){t.d(e,{c:function(){return f}});var i,r=t(9439),o=t(168),a=t(6884),c=t(5029),s=t(2791),l=t(9434),d=t(2436),u=t(7616),p=t(9522),x=t(8789),h=t(184),f=(0,x.ZP)(p.W2)(i||(i=(0,o.Z)(["\n  box-shadow: 0px 0px 4px 0px rgba(255, 0, 0, 0.7);\n"])));e.Z=function(){var n=(0,s.useState)(""),e=(0,r.Z)(n,2),t=e[0],i=e[1],o=(0,s.useState)(!1),p=(0,r.Z)(o,2),x=p[0],g=p[1],m=(0,l.v9)(u.oV),v=(0,l.I0)();return(0,h.jsxs)(f,{children:[(0,h.jsx)(a.II,{value:t,onChange:function(n){return i(n.target.value)}}),(0,h.jsxs)("div",{children:[(0,h.jsx)("input",{id:"active",checked:x,onChange:function(n){g(n.target.checked)},type:"checkbox",style:{marginRight:5}}),(0,h.jsx)("label",{htmlFor:"active",children:"Active"})]}),(0,h.jsx)(c.b,{onClick:function(){t&&(v((0,d.C8)({token:m.token,newData:{content:t,active:x}})),i(""),g(!1))},children:"create"})]})}},4829:function(n,e,t){t.r(e),t.d(e,{default:function(){return T}});var i,r,o,a,c,s=t(168),l=t(9434),d=t(9621),u=t(4165),p=t(5861),x=t(9439),h=t(5637),f=t(7616),g=t(2791),m=t(5029),v=t(3754),j=t(8789),Z=t(6884),b=t(1243),w=t(9243),y=t(184),k=j.ZP.div(i||(i=(0,s.Z)(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: start;\n  align-items: start;\n  gap: 5px;\n  height: 300px;\n  width: 240px;\n  overflow: hidden;\n  color: ",";\n  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);\n  transition: all 0.3s;\n"])),(function(n){return n.theme.color})),C=(0,j.ZP)(v.ButtonsContainer)(r||(r=(0,s.Z)(["\n  justify-content: space-between;\n  margin-top: auto;\n  width: 100%;\n"]))),P=(0,j.ZP)(w.l0)(o||(o=(0,s.Z)(["\n  position: absolute;\n  bottom: 2px;\n  padding: 3px;\n"]))),z=j.ZP.div(a||(a=(0,s.Z)(["\n  width: 100%;\n  height: 190px;\n  align-self: stretch;\n  position: relative;\n"]))),I=j.ZP.p(c||(c=(0,s.Z)(["\n  font-size: 14px;\n  align-self: center;\n  margin: 5px;\n"])));var S=function(n){var e=n.c,t=(0,l.v9)(f.oV),i=(0,g.useState)(""),r=(0,x.Z)(i,2),o=r[0],a=r[1],c=(0,g.useState)("Choose image"),s=(0,x.Z)(c,2),v=s[0],j=s[1],S=(0,g.useState)(),D=(0,x.Z)(S,2),U=D[0],E=D[1],F=(0,l.I0)();function R(){return(R=(0,p.Z)((0,u.Z)().mark((function n(i){var r;return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(i.preventDefault(),"Choose image"!==v){n.next=3;break}return n.abrupt("return");case 3:return(r=new FormData).append("name",v),r.append("file",U),n.next=8,b.Z.post("/api/categories/category-image/".concat(e.id),r,{headers:{"Content-Type":"multipart/form-data",Authorization:"bearer ".concat(t.token)}});case 8:window.location.reload();case 9:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,g.useEffect)((function(){e&&a(e.name)}),[e]),(0,y.jsxs)(k,{children:[(0,y.jsxs)(z,{children:[U?(0,y.jsx)(h.Ee,{alt:"chosen product image",src:U&&URL.createObjectURL(U)}):(0,y.jsx)(h.Ee,{alt:"category image",src:"/public/data/defaults/categories/".concat(e.id,".webp")}),(0,y.jsxs)(P,{id:"category-form",encType:"multipart/form-data",children:[(0,y.jsxs)("label",{htmlFor:"category".concat(e.id),style:{maxWidth:"70%"},children:[(0,y.jsx)("input",{style:{display:"none"},id:"category".concat(e.id),type:"file",name:"category".concat(e.id),onChange:function(n){console.log(e),j(e.id),E(n.target.files[0])}}),(0,y.jsx)(w.cX,{style:{fontSize:12},children:v})]}),(0,y.jsx)(w.zx,{style:{fontSize:12},onClick:function(n){return function(n){return R.apply(this,arguments)}(n)},children:"Set"})]})]}),(0,y.jsxs)(h.kI,{style:{width:"100%"},children:[(0,y.jsx)(Z.II,{style:{alignSelf:"center"},placeholder:"Enter category name",value:o,onChange:function(n){return a(n.target.value)}}),(0,y.jsxs)(I,{children:["Number od products: ",e.products_count]}),(0,y.jsxs)(C,{children:[(0,y.jsx)(m.b,{type:"checkout",onClick:function(){F((0,d.uu)({token:t.token,id:e.id}))},children:"delete"}),(0,y.jsx)(m.b,{onClick:function(){F((0,d.yr)({token:t.token,newData:{name:o},id:e.id}))},children:"update"})]})]})]})},D=t(7889);var U,E,F=function(){var n=(0,g.useState)(""),e=(0,x.Z)(n,2),t=e[0],i=e[1],r=(0,l.v9)(f.oV),o=(0,l.I0)();return(0,y.jsxs)(D.c,{children:[(0,y.jsx)(Z.II,{value:t,onChange:function(n){return i(n.target.value)}}),(0,y.jsx)(m.b,{onClick:function(){t&&(o((0,d.k4)({token:r.token,newData:{name:t}})),i(""))},children:"create category"})]})},R=j.ZP.div(U||(U=(0,s.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n  padding: 10px;\n  transition: all 0.3s;\n"]))),A=j.ZP.div(E||(E=(0,s.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  align-items: start;\n  justify-content: center;\n  align-content: start;\n  gap: 15px;\n  transition: all 0.3s;\n"])));var T=function(){var n=(0,l.v9)(d.sI);return(0,y.jsxs)(R,{children:[(0,y.jsx)(F,{}),(0,y.jsx)(A,{children:n.map((function(n){return(0,y.jsx)(S,{c:n},n.id)}))})]})}},5637:function(n,e,t){t.d(e,{Dx:function(){return w},Ee:function(){return Z},YD:function(){return C},kI:function(){return b},zx:function(){return P}});var i,r,o,a,c,s,l,d,u,p=t(168),x=t(8789),h=t(1087),f=t(9434),g=t(7616),m=t(184),v=x.ZP.div(i||(i=(0,p.Z)(["\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  gap: 5px;\n  height: 190px;\n  width: 100%;\n  overflow: hidden;\n  color: ",";\n  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);\n  transition: all 0.3s;\n\n  @media only screen and (max-width: 1000px) {\n    flex-direction: column;\n    justify-content: start;\n    flex-wrap: no-wrap;\n    height: 360px;\n  }\n\n  @media only screen and (min-width: 800px) {\n    width: 48%;\n  }\n"])),(function(n){return n.theme.color})),j=x.ZP.div(r||(r=(0,p.Z)(["\n  width: 200px;\n  align-self: stretch;\n  position: relative;\n\n  @media only screen and (max-width: 1000px) {\n    width: 100%;\n  }\n"]))),Z=x.ZP.img(o||(o=(0,p.Z)(["\n  width: 100%;\n  height: 190px;\n  object-fit: cover;\n"]))),b=x.ZP.div(a||(a=(0,p.Z)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: start;\n  gap: 5px;\n  padding: 10px;\n"]))),w=x.ZP.p(c||(c=(0,p.Z)(["\n  font-size: 20px;\n  max-height: 46px;\n  overflow: hidden;\n"]))),y=x.ZP.p(s||(s=(0,p.Z)(["\n  font-size: 14px;\n  max-height: 70px;\n  overflow: hidden;\n"]))),k=x.ZP.p(l||(l=(0,p.Z)(["\n  font-size: 14px;\n  font-weight: 800;\n"]))),C=x.ZP.div(d||(d=(0,p.Z)(["\n  position: absolute;\n  bottom: 5px;\n  right: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n"]))),P=x.ZP.button(u||(u=(0,p.Z)(["\n  background-color: red;\n  color: white;\n  padding: 2px;\n  font-size: 12px;\n  border: none;\n  border-radius: 1px;\n  cursor: pointer;\n  transition: all 0.2s;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    transform: scale(0.97);\n  }\n"])));e.ZP=function(n){var e=n.product,t=(0,f.v9)(g.oV);return(0,m.jsxs)(v,{children:[(0,m.jsx)(j,{children:(0,m.jsx)(Z,{alt:"product image",src:"/public/data/uploads/products/".concat(e.id,".webp")})}),(0,m.jsxs)(b,{children:[(0,m.jsx)(w,{children:e.title}),(0,m.jsx)(y,{children:e.description}),(0,m.jsxs)("p",{children:["ID: ",e.id]}),(0,m.jsxs)(k,{children:["$",e.price]}),(0,m.jsxs)(C,{children:[(0,m.jsx)(h.rU,{to:"/".concat(t.id,"/admin-panel/products/single-stats/").concat(e.id),children:(0,m.jsx)(P,{children:"Stats"})}),(0,m.jsx)(h.rU,{to:"/".concat(t.id,"/admin-panel/products/single/").concat(e.id),children:(0,m.jsx)(P,{children:"Update"})})]})]})]})}},3754:function(n,e,t){t.r(e),t.d(e,{ButtonsContainer:function(){return u},Container:function(){return d}});var i,r,o=t(168),a=t(8789),c=t(6884),s=t(7689),l=t(184),d=a.ZP.div(i||(i=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  margin: 10px;\n  width: 100%;\n"]))),u=a.ZP.div(r||(r=(0,o.Z)(["\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n"])));e.default=function(){var n=(0,s.s0)(),e=(0,s.TH)().pathname.split("/"),t=isNaN(e[e.length-1])?e[e.length-1]:e[e.length-2];return(0,l.jsxs)(d,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(c.zx,{active:"all"===t,onClick:function(){return n("all")},children:"Browse products"}),(0,l.jsx)(c.zx,{active:"single"===t,onClick:function(){return n("single")},children:"Update single product"}),(0,l.jsx)(c.zx,{active:"create"===t,onClick:function(){return n("create")},children:"New product"}),(0,l.jsx)(c.zx,{active:"statistics"===t,onClick:function(){return n("statistics")},children:"Products statistics"}),(0,l.jsx)(c.zx,{active:"single-stats"===t,onClick:function(){return n("single-stats")},children:"Single product stats"})]}),(0,l.jsx)(s.j3,{})]})}},6884:function(n,e,t){t.d(e,{II:function(){return d},gx:function(){return u},zx:function(){return l}});var i,r,o,a=t(168),c=t(8789),s=t(5029),l=(0,c.ZP)(s.b)(i||(i=(0,a.Z)(["\n  width: 150px;\n  box-shadow: ",";\n"])),(function(n){return n.active?"0 0 5px 0 black":""})),d=c.ZP.input(r||(r=(0,a.Z)(["\n  border: 1px solid ",";\n  color: ",";\n  background-color: transparent;\n  outline: none;\n  padding: 3px;\n  transition: all 0.3s;\n\n  &:focus {\n    border: 1px solid lime;\n    box-shadow: 0 0 3px 0 lime;\n  }\n"])),(function(n){return n.theme.color}),(function(n){return n.theme.color})),u=c.ZP.textarea(o||(o=(0,a.Z)(["\n  border: 1px solid ",";\n  color: ",";\n  background-color: transparent;\n  outline: none;\n  padding: 3px;\n  max-width: 100%;\n  transition: all 0.3s;\n\n  &:focus {\n    border: 1px solid lime;\n    box-shadow: 0 0 3px 0 lime;\n  }\n"])),(function(n){return n.theme.color}),(function(n){return n.theme.color}))},9243:function(n,e,t){t.d(e,{cX:function(){return v},l0:function(){return m},zx:function(){return j}});var i,r,o,a,c,s=t(4165),l=t(5861),d=t(9439),u=t(168),p=t(1243),x=t(2791),h=t(8789),f=t(184),g=h.ZP.div(i||(i=(0,u.Z)(["\n  flex: 3;\n"]))),m=h.ZP.form(r||(r=(0,u.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 5px;\n  width: 100%;\n"]))),v=h.ZP.div(o||(o=(0,u.Z)(["\n  background-color: ",";\n  font-size: 14px;\n  padding: 5px;\n  min-width: 50px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    background-color: ",";\n  }\n"])),(function(n){return n.theme.secondary}),(function(n){return n.theme.secondary})),j=h.ZP.div(a||(a=(0,u.Z)(["\n  background-color: ",";\n  font-size: 14px;\n  padding: 5px;\n  min-width: 50px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    background-color: ",";\n  }\n"])),(function(n){return n.theme.primary}),(function(n){return n.theme.primary})),Z=h.ZP.img(c||(c=(0,u.Z)(["\n  border-radius: 50%;\n  height: 200px;\n  width: 200px;\n  display: block;\n  margin: 20px auto;\n  object-fit: cover;\n"])));e.ZP=function(n){var e=n.loggedUser,t=(0,x.useState)("Choose avatar"),i=(0,d.Z)(t,2),r=i[0],o=i[1],a=(0,x.useState)(),c=(0,d.Z)(a,2),u=c[0],h=c[1];function b(){return(b=(0,l.Z)((0,s.Z)().mark((function n(t){var i;return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.preventDefault(),(i=new FormData).append("name",r),i.append("file",u),n.next=6,p.Z.post("/api/avatars/".concat(e.id),i,{headers:{"Content-Type":"multipart/form-data",Authorization:"bearer ".concat(e.token)}});case 6:window.location.reload();case 7:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,f.jsxs)(g,{children:[(0,f.jsxs)(m,{id:"avatar-form",encType:"multipart/form-data",children:[(0,f.jsxs)("label",{htmlFor:"avatar",style:{maxWidth:"70%"},children:[(0,f.jsx)("input",{style:{display:"none"},id:"avatar",type:"file",name:"avatar",onChange:function(n){o(e.id),h(n.target.files[0])}}),(0,f.jsx)(v,{children:"Choose avatar"})]}),(0,f.jsx)(j,{disabled:!u,onClick:function(n){return function(n){return b.apply(this,arguments)}(n)},children:"Set"})]}),u&&(0,f.jsx)(Z,{alt:"chosen avatar",src:u&&URL.createObjectURL(u)})]})}}}]);
//# sourceMappingURL=829.b898d84e.chunk.js.map