import{c,j as e,L as r}from"./index-kO1_QYJF.js";import{C as x}from"./chevron-right-Dqfib-qv.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=c("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);function d({crumbs:n,light:t=!1}){const a=t?"text-white/60 hover:text-white":"text-slate-400 hover:text-amber-600",o=t?"text-white/90":"text-slate-600",i=t?"text-white/30":"text-slate-300";return e.jsxs("nav",{"aria-label":"Breadcrumb",className:"flex items-center gap-1.5 text-xs flex-wrap",children:[e.jsxs(r,{to:"/",className:`flex items-center gap-1 transition-colors ${a}`,children:[e.jsx(m,{size:12}),"Home"]}),n.map((s,l)=>e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(x,{size:12,className:i}),s.href?e.jsx(r,{to:s.href,className:`transition-colors ${a}`,children:s.label}):e.jsx("span",{className:`font-medium ${o}`,children:s.label})]},l))]})}export{d as B};
