"use strict";(self.webpackChunke_commerce=self.webpackChunke_commerce||[]).push([[429],{4429:function(n,e,t){t.r(e),t.d(e,{Container:function(){return C},Error:function(){return D},ImageContainer:function(){return U},InputContainer:function(){return I},Label:function(){return P},ProductInfo:function(){return S}});var r,i,o,a,c,s,l,u=t(4165),d=t(5861),p=t(9439),h=t(168),x=t(8789),f=t(6884),m=t(5029),g=t(2791),k=t(9434),j=t(9182),Z=t(7616),v=t(7689),b=t(1243),y=t(9243),w=t(184),C=x.ZP.div(r||(r=(0,h.Z)(["\n  display: flex;\n  gap: 20px;\n  width: 100%;\n\n  @media only screen and (max-width: 600px) {\n    flex-direction: column;\n    align-items: center;\n  }\n"]))),S=x.ZP.div(i||(i=(0,h.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  align-content: start;\n  gap: 20px;\n\n  @media only screen and (max-width: 600px) {\n    justify-content: center;\n  }\n"]))),I=x.ZP.div(o||(o=(0,h.Z)(["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  max-width: 200px;\n"]))),P=x.ZP.label(a||(a=(0,h.Z)(["\n  font-size: 12px;\n"]))),z=x.ZP.img(c||(c=(0,h.Z)(["\n  width: 200px;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 10px;\n  box-shadow: 0 0 5px -1px black;\n"]))),D=x.ZP.div(s||(s=(0,h.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: red;\n  width: 100%;\n"]))),U=x.ZP.div(l||(l=(0,h.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n"])));e.default=function(){var n=(0,v.UO)().id,e=(0,g.useState)({}),t=(0,p.Z)(e,2),r=t[0],i=t[1],o=(0,g.useState)(""),a=(0,p.Z)(o,2),c=a[0],s=a[1],l=(0,g.useState)(""),h=(0,p.Z)(l,2),x=h[0],F=h[1],M=(0,g.useState)(""),L=(0,p.Z)(M,2),R=L[0],T=L[1],E=(0,g.useState)(""),O=(0,p.Z)(E,2),_=O[0],A=O[1],N=(0,g.useState)(""),W=(0,p.Z)(N,2),X=W[0],V=W[1],q=(0,g.useState)(""),B=(0,p.Z)(q,2),G=B[0],H=B[1],J=(0,g.useState)(""),K=(0,p.Z)(J,2),Q=K[0],Y=K[1],$=(0,g.useState)(""),nn=(0,p.Z)($,2),en=nn[0],tn=nn[1],rn=(0,g.useState)("Choose avatar"),on=(0,p.Z)(rn,2),an=on[0],cn=on[1],sn=(0,g.useState)(),ln=(0,p.Z)(sn,2),un=ln[0],dn=ln[1],pn=(0,k.v9)(Z.oV),hn=(0,k.I0)();function xn(){return(xn=(0,d.Z)((0,u.Z)().mark((function n(e){var t;return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),(t=new FormData).append("name",an),t.append("file",un),n.next=6,b.Z.post("http://localhost:3003/api/products/product-image/".concat(r.id),t,{headers:{"Content-Type":"multipart/form-data",Authorization:"bearer ".concat(pn.token)}});case 6:window.location.reload();case 7:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,g.useEffect)((function(){function e(){return(e=(0,d.Z)((0,u.Z)().mark((function e(){var t;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=3;break}return s("ID missing"),e.abrupt("return");case 3:return e.prev=3,e.next=6,b.Z.get("".concat(j._n,"/").concat(n));case 6:t=e.sent,s(""),i(t.data),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),s("No such product");case 14:case"end":return e.stop()}}),e,null,[[3,11]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[n]),(0,g.useEffect)((function(){r.id&&(F(r.title),T(r.categories.map((function(n){return n.name})).join(", ")),A(r.colors.join(", ")),V(r.sizes.join(", ")),H(r.price),Y(r.inStock),tn(r.description))}),[r]),c?(0,w.jsx)(D,{children:c}):(0,w.jsxs)(C,{children:[(0,w.jsxs)(U,{children:[(0,w.jsx)(z,{alt:"product image",src:"/public/data/uploads/products/".concat(r.id,".webp")}),(0,w.jsxs)(y.l0,{id:"product-form",encType:"multipart/form-data",children:[(0,w.jsxs)("label",{htmlFor:"product",style:{maxWidth:"70%"},children:[(0,w.jsx)("input",{style:{display:"none"},id:"product",type:"file",name:"product",onChange:function(n){cn(r.id),dn(n.target.files[0])}}),(0,w.jsx)(y.cX,{children:"Choose image"})]}),(0,w.jsx)(y.zx,{disabled:!un,onClick:function(n){return function(n){return xn.apply(this,arguments)}(n)},children:"Set"})]}),un&&(0,w.jsx)(z,{alt:"chosen product image",src:un&&URL.createObjectURL(un)})]}),(0,w.jsxs)(S,{children:[(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"title",children:"Product name"}),(0,w.jsx)(f.II,{type:"text",id:"title",placeholder:"title",value:x,onChange:function(n){return F(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{title:x}}))},children:"Update"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"categories",children:"Categories"}),(0,w.jsx)(f.II,{type:"text",id:"categories",placeholder:"categories",value:R,onChange:function(n){return T(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{categories:R.split(", ")}}))},children:"Update"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"colors",children:"Colors"}),(0,w.jsx)(f.II,{type:"text",id:"colors",placeholder:"colors",value:_,onChange:function(n){return A(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{colors:_.split(", ")}}))},children:"Update"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"sizes",children:"Sizes"}),(0,w.jsx)(f.II,{type:"text",id:"sizes",placeholder:"sizes",value:X,onChange:function(n){return V(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{sizes:X.split(", ")}}))},children:"Update"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"price",children:"Price"}),(0,w.jsx)(f.II,{type:"text",id:"price",placeholder:"price",value:G,onChange:function(n){return H(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{price:Number(G)}}))},children:"Update"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"inStock",children:"In stock"}),(0,w.jsx)(f.II,{type:"text",id:"inStock",placeholder:"inStock",value:Q,onChange:function(n){return Y(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{inStock:"true"===Q}}))},children:"Update"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(P,{htmlFor:"description",children:"Description"}),(0,w.jsx)(f.gx,{type:"text",id:"description",placeholder:"description",value:en,onChange:function(n){return tn(n.target.value)}}),(0,w.jsx)(m.b,{type:"checkout",onClick:function(){hn((0,j.nM)({id:r.id,token:pn.token,newData:{description:en}}))},children:"Update"})]})]})]})}},6884:function(n,e,t){t.d(e,{II:function(){return u},gx:function(){return d},zx:function(){return l}});var r,i,o,a=t(168),c=t(8789),s=t(5029),l=(0,c.ZP)(s.b)(r||(r=(0,a.Z)(["\n  width: 150px;\n  box-shadow: ",";\n"])),(function(n){return n.active?"0 0 5px 0 black":""})),u=c.ZP.input(i||(i=(0,a.Z)(["\n  border: 1px solid ",";\n  color: ",";\n  background-color: transparent;\n  outline: none;\n  padding: 3px;\n  transition: all 0.3s;\n\n  &:focus {\n    border: 1px solid lime;\n    box-shadow: 0 0 3px 0 lime;\n  }\n"])),(function(n){return n.theme.color}),(function(n){return n.theme.color})),d=c.ZP.textarea(o||(o=(0,a.Z)(["\n  border: 1px solid ",";\n  color: ",";\n  background-color: transparent;\n  outline: none;\n  padding: 3px;\n  max-width: 100%;\n  transition: all 0.3s;\n\n  &:focus {\n    border: 1px solid lime;\n    box-shadow: 0 0 3px 0 lime;\n  }\n"])),(function(n){return n.theme.color}),(function(n){return n.theme.color}))},9243:function(n,e,t){t.d(e,{cX:function(){return k},l0:function(){return g},zx:function(){return j}});var r,i,o,a,c,s=t(4165),l=t(5861),u=t(9439),d=t(168),p=t(1243),h=t(2791),x=t(8789),f=t(184),m=x.ZP.div(r||(r=(0,d.Z)(["\n  flex: 3;\n"]))),g=x.ZP.form(i||(i=(0,d.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 5px;\n  width: 100%;\n"]))),k=x.ZP.div(o||(o=(0,d.Z)(["\n  background-color: ",";\n  font-size: 14px;\n  padding: 5px;\n  min-width: 50px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    background-color: ",";\n  }\n"])),(function(n){return n.theme.secondary}),(function(n){return n.theme.secondary})),j=x.ZP.div(a||(a=(0,d.Z)(["\n  background-color: ",";\n  font-size: 14px;\n  padding: 5px;\n  min-width: 50px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    background-color: ",";\n  }\n"])),(function(n){return n.theme.primary}),(function(n){return n.theme.primary})),Z=x.ZP.img(c||(c=(0,d.Z)(["\n  border-radius: 50%;\n  height: 200px;\n  width: 200px;\n  display: block;\n  margin: 20px auto;\n  object-fit: cover;\n"])));e.ZP=function(n){var e=n.loggedUser,t=(0,h.useState)("Choose avatar"),r=(0,u.Z)(t,2),i=r[0],o=r[1],a=(0,h.useState)(),c=(0,u.Z)(a,2),d=c[0],x=c[1];function v(){return(v=(0,l.Z)((0,s.Z)().mark((function n(t){var r;return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.preventDefault(),(r=new FormData).append("name",i),r.append("file",d),n.next=6,p.Z.post("http://localhost:3003/api/avatars/".concat(e.id),r,{headers:{"Content-Type":"multipart/form-data",Authorization:"bearer ".concat(e.token)}});case 6:window.location.reload();case 7:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,f.jsxs)(m,{children:[(0,f.jsxs)(g,{id:"avatar-form",encType:"multipart/form-data",children:[(0,f.jsxs)("label",{htmlFor:"avatar",style:{maxWidth:"70%"},children:[(0,f.jsx)("input",{style:{display:"none"},id:"avatar",type:"file",name:"avatar",onChange:function(n){o(e.id),x(n.target.files[0])}}),(0,f.jsx)(k,{children:"Choose avatar"})]}),(0,f.jsx)(j,{disabled:!d,onClick:function(n){return function(n){return v.apply(this,arguments)}(n)},children:"Set"})]}),d&&(0,f.jsx)(Z,{alt:"chosen avatar",src:d&&URL.createObjectURL(d)})]})}}}]);
//# sourceMappingURL=429.6b6823a1.chunk.js.map