import{a as r}from"./index-BzOAfmGi.js";const e=async()=>{const a="http://127.0.0.1:3000";try{const t=await r.get(`${a}/api/users/me`,{withCredentials:!0});if(t.data.status==="fail")throw new Error("درخواست با خطا مواجه شد");return t.data.data}catch(t){return t.response.data.status}};export{e as g};
