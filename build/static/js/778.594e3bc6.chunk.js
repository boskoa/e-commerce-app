"use strict";(self.webpackChunke_commerce=self.webpackChunke_commerce||[]).push([[778,429],{3314:function(e,n,t){t.r(n);var r,i,o,a=t(9439),c=t(168),l=t(4429),s=t(6884),u=t(2791),d=t(9434),p=t(7616),h=t(5029),x=t(9182),f=t(7689),g=t(8789),m=t(184),j=g.ZP.div(r||(r=(0,c.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  width: 100%;\n"]))),v=g.ZP.div(i||(i=(0,c.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n"]))),Z=g.ZP.div(o||(o=(0,c.Z)(["\n  flex: 1\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: red;\n  height: 30px;\n"])));n.default=function(){var e=(0,u.useState)(""),n=(0,a.Z)(e,2),t=n[0],r=n[1],i=(0,u.useState)(""),o=(0,a.Z)(i,2),c=o[0],g=o[1],k=(0,u.useState)([]),y=(0,a.Z)(k,2),b=y[0],C=y[1],w=(0,u.useState)([]),I=(0,a.Z)(w,2),S=I[0],P=I[1],z=(0,u.useState)([]),F=(0,a.Z)(z,2),D=F[0],L=F[1],U=(0,u.useState)(""),E=(0,a.Z)(U,2),M=E[0],T=E[1],R=(0,u.useState)(""),_=(0,a.Z)(R,2),O=_[0],X=_[1],A=(0,u.useState)(""),N=(0,a.Z)(A,2),V=N[0],W=N[1],q=(0,d.v9)(p.oV),B=(0,d.v9)(x._7),G=(0,d.v9)(x.e3),H=(0,d.v9)(x.o4),J=(0,d.I0)(),K=(0,f.s0)();return(0,u.useEffect)((function(){if(!B){if(G){r("Product creation failed");var e=setTimeout((function(){return r("")}),5e3);return function(){return clearTimeout(e)}}H&&(K("/".concat(q.id,"/admin-panel/products/all")),J(x.Es))}}),[B,G,H,K,J,q]),(0,m.jsxs)(j,{children:[(0,m.jsxs)(v,{children:[(0,m.jsx)(h.b,{type:"checkout",onClick:function(){if(c&&M){var e={title:c,price:M};b.length&&(e.categories=b.split(", ")),S.length&&(e.colors=S.split(", ")),D.length&&(e.sizes=D.split(", ")),O&&(e.inStock="true"===O),V&&(e.description=V),J((0,x.ry)({token:q.token,newData:e}))}},children:"Create"}),(0,m.jsx)(Z,{children:t})]}),(0,m.jsxs)(l.ProductInfo,{children:[(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"title",children:"Product name"}),(0,m.jsx)(s.II,{type:"text",id:"title",placeholder:"Enter title",value:c,onChange:function(e){return g(e.target.value)}})]}),(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"categories",children:"Categories"}),(0,m.jsx)(s.II,{type:"text",id:"categories",placeholder:"e.g: hats, skirts, shirts",value:b,onChange:function(e){return C(e.target.value)}})]}),(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"colors",children:"Colors"}),(0,m.jsx)(s.II,{type:"text",id:"colors",placeholder:"e.g: red, blue, white",value:S,onChange:function(e){return P(e.target.value)}})]}),(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"sizes",children:"Sizes"}),(0,m.jsx)(s.II,{type:"text",id:"sizes",placeholder:"e.g: S, M, L, XL",value:D,onChange:function(e){return L(e.target.value)}})]}),(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"price",children:"Price"}),(0,m.jsx)(s.II,{type:"text",id:"price",placeholder:"Enter price",value:M,onChange:function(e){return T(e.target.value)}})]}),(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"inStock",children:"In stock"}),(0,m.jsx)(s.II,{type:"text",id:"inStock",placeholder:"true or false",value:O,onChange:function(e){return X(e.target.value)}})]}),(0,m.jsxs)(l.InputContainer,{children:[(0,m.jsx)(l.Label,{htmlFor:"description",children:"Description"}),(0,m.jsx)(s.gx,{type:"text",id:"description",placeholder:"Enter description",value:V,onChange:function(e){return W(e.target.value)}})]})]})]})}},4429:function(e,n,t){t.r(n),t.d(n,{Container:function(){return w},Error:function(){return F},Image:function(){return z},ImageContainer:function(){return D},InputContainer:function(){return S},Label:function(){return P},ProductInfo:function(){return I}});var r,i,o,a,c,l,s,u=t(4165),d=t(5861),p=t(9439),h=t(168),x=t(8789),f=t(6884),g=t(5029),m=t(2791),j=t(9434),v=t(9182),Z=t(7616),k=t(7689),y=t(1243),b=t(9243),C=t(184),w=x.ZP.div(r||(r=(0,h.Z)(["\n  display: flex;\n  gap: 20px;\n  width: 100%;\n\n  @media only screen and (max-width: 600px) {\n    flex-direction: column;\n    align-items: center;\n  }\n"]))),I=x.ZP.div(i||(i=(0,h.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  align-content: start;\n  gap: 20px;\n\n  @media only screen and (max-width: 600px) {\n    justify-content: center;\n  }\n"]))),S=x.ZP.div(o||(o=(0,h.Z)(["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  max-width: 200px;\n"]))),P=x.ZP.label(a||(a=(0,h.Z)(["\n  font-size: 12px;\n"]))),z=x.ZP.img(c||(c=(0,h.Z)(["\n  width: 200px;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 10px;\n  box-shadow: 0 0 5px -1px black;\n"]))),F=x.ZP.div(l||(l=(0,h.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: red;\n  width: 100%;\n"]))),D=x.ZP.div(s||(s=(0,h.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n"])));n.default=function(){var e=(0,k.UO)().id,n=(0,m.useState)({}),t=(0,p.Z)(n,2),r=t[0],i=t[1],o=(0,m.useState)(""),a=(0,p.Z)(o,2),c=a[0],l=a[1],s=(0,m.useState)(""),h=(0,p.Z)(s,2),x=h[0],L=h[1],U=(0,m.useState)(""),E=(0,p.Z)(U,2),M=E[0],T=E[1],R=(0,m.useState)(""),_=(0,p.Z)(R,2),O=_[0],X=_[1],A=(0,m.useState)(""),N=(0,p.Z)(A,2),V=N[0],W=N[1],q=(0,m.useState)(""),B=(0,p.Z)(q,2),G=B[0],H=B[1],J=(0,m.useState)(""),K=(0,p.Z)(J,2),Q=K[0],Y=K[1],$=(0,m.useState)(""),ee=(0,p.Z)($,2),ne=ee[0],te=ee[1],re=(0,m.useState)("Choose avatar"),ie=(0,p.Z)(re,2),oe=ie[0],ae=ie[1],ce=(0,m.useState)(),le=(0,p.Z)(ce,2),se=le[0],ue=le[1],de=(0,j.v9)(Z.oV),pe=(0,j.I0)();function he(){return(he=(0,d.Z)((0,u.Z)().mark((function e(n){var t;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),(t=new FormData).append("name",oe),t.append("file",se),e.next=6,y.Z.post("/api/products/product-image/".concat(r.id),t,{headers:{"Content-Type":"multipart/form-data",Authorization:"bearer ".concat(de.token)}});case 6:window.location.reload();case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,m.useEffect)((function(){function n(){return(n=(0,d.Z)((0,u.Z)().mark((function n(){var t;return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e){n.next=3;break}return l("ID missing"),n.abrupt("return");case 3:return n.prev=3,n.next=6,y.Z.get("".concat(v._n,"/").concat(e));case 6:t=n.sent,l(""),i(t.data),n.next=14;break;case 11:n.prev=11,n.t0=n.catch(3),l("No such product");case 14:case"end":return n.stop()}}),n,null,[[3,11]])})))).apply(this,arguments)}!function(){n.apply(this,arguments)}()}),[e]),(0,m.useEffect)((function(){var e,n,t;r.id&&(L(r.title),T(null===(e=r.categories)||void 0===e?void 0:e.map((function(e){return e.name})).join(", ")),X(null===(n=r.colors)||void 0===n?void 0:n.join(", ")),W(null===(t=r.sizes)||void 0===t?void 0:t.join(", ")),H(r.price),Y(r.inStock),te(r.description))}),[r]),c?(0,C.jsx)(F,{children:c}):(0,C.jsxs)(w,{children:[(0,C.jsxs)(D,{children:[(0,C.jsx)(z,{alt:"product image",src:"/public/data/uploads/products/".concat(r.id,".webp")}),(0,C.jsxs)(b.l0,{id:"product-form",encType:"multipart/form-data",children:[(0,C.jsxs)("label",{htmlFor:"product",style:{maxWidth:"70%"},children:[(0,C.jsx)("input",{style:{display:"none"},id:"product",type:"file",name:"product",onChange:function(e){ae(r.id),ue(e.target.files[0])}}),(0,C.jsx)(b.cX,{children:"Choose image"})]}),(0,C.jsx)(b.zx,{disabled:!se,onClick:function(e){return function(e){return he.apply(this,arguments)}(e)},children:"Set"})]}),se&&(0,C.jsx)(z,{alt:"chosen product image",src:se&&URL.createObjectURL(se)})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"title",children:"Product name"}),(0,C.jsx)(f.II,{type:"text",id:"title",placeholder:"title",value:x,onChange:function(e){return L(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{title:x}}))},children:"Update"})]}),(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"categories",children:"Categories"}),(0,C.jsx)(f.II,{type:"text",id:"categories",placeholder:"categories",value:M,onChange:function(e){return T(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{categories:M.split(", ")}}))},children:"Update"})]}),(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"colors",children:"Colors"}),(0,C.jsx)(f.II,{type:"text",id:"colors",placeholder:"colors",value:O,onChange:function(e){return X(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{colors:O.split(", ")}}))},children:"Update"})]}),(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"sizes",children:"Sizes"}),(0,C.jsx)(f.II,{type:"text",id:"sizes",placeholder:"sizes",value:V,onChange:function(e){return W(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{sizes:V.split(", ")}}))},children:"Update"})]}),(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"price",children:"Price"}),(0,C.jsx)(f.II,{type:"text",id:"price",placeholder:"price",value:G,onChange:function(e){return H(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{price:Number(G)}}))},children:"Update"})]}),(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"inStock",children:"In stock"}),(0,C.jsx)(f.II,{type:"text",id:"inStock",placeholder:"inStock",value:Q,onChange:function(e){return Y(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{inStock:"true"===Q}}))},children:"Update"})]}),(0,C.jsxs)(S,{children:[(0,C.jsx)(P,{htmlFor:"description",children:"Description"}),(0,C.jsx)(f.gx,{type:"text",id:"description",placeholder:"description",value:ne,onChange:function(e){return te(e.target.value)}}),(0,C.jsx)(g.b,{type:"checkout",onClick:function(){pe((0,v.nM)({id:r.id,token:de.token,newData:{description:ne}}))},children:"Update"})]})]})]})}},6884:function(e,n,t){t.d(n,{II:function(){return u},gx:function(){return d},zx:function(){return s}});var r,i,o,a=t(168),c=t(8789),l=t(5029),s=(0,c.ZP)(l.b)(r||(r=(0,a.Z)(["\n  width: 150px;\n  box-shadow: ",";\n"])),(function(e){return e.active?"0 0 5px 0 black":""})),u=c.ZP.input(i||(i=(0,a.Z)(["\n  border: 1px solid ",";\n  color: ",";\n  background-color: transparent;\n  outline: none;\n  padding: 3px;\n  transition: all 0.3s;\n\n  &:focus {\n    border: 1px solid lime;\n    box-shadow: 0 0 3px 0 lime;\n  }\n"])),(function(e){return e.theme.color}),(function(e){return e.theme.color})),d=c.ZP.textarea(o||(o=(0,a.Z)(["\n  border: 1px solid ",";\n  color: ",";\n  background-color: transparent;\n  outline: none;\n  padding: 3px;\n  max-width: 100%;\n  transition: all 0.3s;\n\n  &:focus {\n    border: 1px solid lime;\n    box-shadow: 0 0 3px 0 lime;\n  }\n"])),(function(e){return e.theme.color}),(function(e){return e.theme.color}))},9243:function(e,n,t){t.d(n,{cX:function(){return j},l0:function(){return m},zx:function(){return v}});var r,i,o,a,c,l=t(4165),s=t(5861),u=t(9439),d=t(168),p=t(1243),h=t(2791),x=t(8789),f=t(184),g=x.ZP.div(r||(r=(0,d.Z)(["\n  flex: 3;\n"]))),m=x.ZP.form(i||(i=(0,d.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 5px;\n  width: 100%;\n"]))),j=x.ZP.div(o||(o=(0,d.Z)(["\n  background-color: ",";\n  font-size: 14px;\n  padding: 5px;\n  min-width: 50px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    background-color: ",";\n  }\n"])),(function(e){return e.theme.secondary}),(function(e){return e.theme.secondary})),v=x.ZP.div(a||(a=(0,d.Z)(["\n  background-color: ",";\n  font-size: 14px;\n  padding: 5px;\n  min-width: 50px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: black;\n  }\n\n  &:active {\n    background-color: ",";\n  }\n"])),(function(e){return e.theme.primary}),(function(e){return e.theme.primary})),Z=x.ZP.img(c||(c=(0,d.Z)(["\n  border-radius: 50%;\n  height: 200px;\n  width: 200px;\n  display: block;\n  margin: 20px auto;\n  object-fit: cover;\n"])));n.ZP=function(e){var n=e.loggedUser,t=(0,h.useState)("Choose avatar"),r=(0,u.Z)(t,2),i=r[0],o=r[1],a=(0,h.useState)(),c=(0,u.Z)(a,2),d=c[0],x=c[1];function k(){return(k=(0,s.Z)((0,l.Z)().mark((function e(t){var r;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),(r=new FormData).append("name",i),r.append("file",d),e.next=6,p.Z.post("/api/avatars/".concat(n.id),r,{headers:{"Content-Type":"multipart/form-data",Authorization:"bearer ".concat(n.token)}});case 6:window.location.reload();case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,f.jsxs)(g,{children:[(0,f.jsxs)(m,{id:"avatar-form",encType:"multipart/form-data",children:[(0,f.jsxs)("label",{htmlFor:"avatar",style:{maxWidth:"70%"},children:[(0,f.jsx)("input",{style:{display:"none"},id:"avatar",type:"file",name:"avatar",onChange:function(e){o(n.id),x(e.target.files[0])}}),(0,f.jsx)(j,{children:"Choose avatar"})]}),(0,f.jsx)(v,{disabled:!d,onClick:function(e){return function(e){return k.apply(this,arguments)}(e)},children:"Set"})]}),d&&(0,f.jsx)(Z,{alt:"chosen avatar",src:d&&URL.createObjectURL(d)})]})}}}]);
//# sourceMappingURL=778.594e3bc6.chunk.js.map