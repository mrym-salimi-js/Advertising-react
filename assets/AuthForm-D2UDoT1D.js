import{j as e,C as x,L as d,r as u,I as f,V as p}from"./index-BzOAfmGi.js";import{L as m}from"./Logo-B44iCCyT.js";import{S as h}from"./SpinnerLoading-DE0fHWrO.js";import{T as j}from"./TextComponent-BkWP5nvC.js";function w({label:s}){return e.jsx("p",{className:"py-2 px-4 text-lg border-r-4 border-pink-400",children:s})}function b({label:s,handleBtn:l,loading:t}){return e.jsxs("button",{onClick:l,className:"w-36 h-11 bg-[#84105C] p-3 rounded-full flex gap-3 items-center justify-around  hover:opacity-[0.9] shadow-md focus:outline-none",children:[e.jsx("p",{className:"text-sm text-white",children:s}),e.jsx("div",{className:"rounded-full bg-[#89677f87] p-1 relative right-3",children:t?e.jsx(h,{w:"w-5",h:"h-5"}):e.jsx(x,{color:"#ffffff",strokeWidth:"1.5",size:"size-5"})})]})}function v({otherLink:s}){return e.jsx("div",{className:"flex flex-col gap-2",children:s.map((l,t)=>e.jsx(d,{to:l.link,children:e.jsx("p",{className:"text-gray-300 text-[0.8rem] mr-4",children:l.label})},t))})}function y({fieldes:s,inputRefs:l,validation:t,setValidation:o}){const[a,i]=u.useState("password"),n=()=>{i(a==="password"?"text":"password")};return e.jsx("div",{className:"w-[98%]  relative  right-[2%] mt-5 p-4 flex flex-col gap-6 justify-between",children:s.map((r,c)=>e.jsxs("div",{className:"w-full h-auto relative ",children:[e.jsx(j,{index:c,inputRefs:l,label:r.label,filedType:"text",valueType:r.label.includes("رمز")?a:r.valueType,type:r.type,validation:t,setValidation:o}),r.label.includes("رمز")&&e.jsx("div",{onClick:n,className:"w-auto h-auto cursor-pointer absolute top-3 left-1 ",children:a==="text"?e.jsx(f,{color:"#cccccc",size:"size-6"}):e.jsx(p,{color:"#cccccc",size:"size-6"})})]},c))})}function C({headerLabel:s,fieldes:l,inputRefs:t,validation:o,setValidation:a,handleBtn:i,loading:n,otherLink:r,btnLabel:c}){return e.jsx("div",{className:"w-full h-full absolute flex justify-center items-center",children:e.jsxs("div",{className:"w-[90%]  md:w-[52%] lg:w-[58%] xl:w-[35%] flex flex-col gap-10 items-center  rounded-[2rem]  ",children:[e.jsx("div",{className:"w-auto h-auto p-3 flex rounded-3xl",children:e.jsx(m,{color:"#84105C",size:"size-10",textStyle:"text-black text-2xl"})}),e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx(w,{label:s}),e.jsx(y,{fieldes:l,inputRefs:t,setValidation:a,validation:o}),e.jsxs("div",{className:"w-full p-2 mt-2 flex justify-between items-start",children:[e.jsx(v,{otherLink:r}),e.jsx(b,{label:c,handleBtn:i,loading:n})]})]})]})})}export{C as A};
