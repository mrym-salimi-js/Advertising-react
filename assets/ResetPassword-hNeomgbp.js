import{r as e,u as h,b as w,j as n,a as x,n as y}from"./index-BZ_Dsnwq.js";import{a as T,b as j}from"./TextComponent-DJFMzBJi.js";import{A as k}from"./AuthForm-BHYHCprh.js";import{N as L}from"./NotifToast-DAqZWmjw.js";import"./Logo-BKDSPWJk.js";function S(){const s=e.useRef([]),[o,i]=e.useState(),m=h(),u=w(),[f,c]=e.useState(!1),v="https://pensive-volhard-wbilxm8r4.liara.run",[d,l]=e.useState({message:"",status:""}),[p,b]=e.useState();e.useEffect(()=>{document.title="ساخت رمز عبور جدید"},[]);const g=async()=>{var r;(r=s==null?void 0:s.current)==null||r.map(a=>{a.value===""?T(t=>{i(t)},a.getAttribute("data-label"),a.value,o,a.type):b(a.value)})};return e.useEffect(()=>{var a;const r=async()=>{try{c(!0);const t=await x.post(`${v}/resetPassword/${u.token}`,{password:s==null?void 0:s.current[0].value,passwordConfirm:s==null?void 0:s.current[1].value},{headers:{Authorization:`Bearer ${u.token}`}});t!==void 0&&(t.data.status==="success"&&l({message:"رمز عبور شما تغییر کرد",status:"success"}),j.remove("user-pass"),y("/login","",m))}catch(t){c(!1),t&&l({message:"رمز عبور موقتی وجود ندارد یا منقضی شده",status:"fail"})}};p&&(o&&((a=Object==null?void 0:Object.keys(o))==null?void 0:a.length)==0||o===void 0)&&r()},[p]),n.jsxs(n.Fragment,{children:[d.message&&n.jsx(L,{setNotif:l,notif:d}),n.jsx(k,{fieldes:[{label:"رمز عبور",type:"password",valueType:"password"},{label:"تکرار رمز عبور",type:"password",valueType:"password"}],handleBtn:g,headerLabel:"ساخت رمز عبور جدید",inputRefs:s,validation:o,setValidation:i,loading:f,otherLink:[{label:"فراموشی رمز عبور!",link:"/forgetPassword"}],btnLabel:"ارسال"})]})}export{S as default};
