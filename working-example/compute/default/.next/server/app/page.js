(()=>{var e={};e.id=931,e.ids=[931],e.modules={58097:e=>{"use strict";e.exports=require("@sentry/nextjs")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},41790:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page-experimental.runtime.prod.js")},50852:e=>{"use strict";e.exports=require("async_hooks")},32081:e=>{"use strict";e.exports=require("child_process")},67643:e=>{"use strict";e.exports=require("diagnostics_channel")},13639:e=>{"use strict";e.exports=require("domain")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},31405:e=>{"use strict";e.exports=require("inspector")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},91440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Home});var a=r(9534),s="undefined"!=typeof global?global:"undefined"!=typeof self?self:{};s.__sentryRewritesTunnelPath__=void 0,s.SENTRY_RELEASE={id:"9cE2t8EeJLM5SxMI0LDvt"},s.__sentryBasePath=void 0,s.__rewriteFramesDistDir__=".next",a.init({dsn:process.env.NEXT_PUBLIC_SENTRY_DSN,tracesSampleRate:1});var i=r(30784),n=r(9885),l=r.n(n),o=r(52451),c=r.n(o),d=r(94571),u=r(30569),p=r(27487),g=r.n(p);let m=require("crypto"),usePerfMetrics=()=>{(0,n.useEffect)(()=>(new PerformanceObserver(e=>{let t=e.getEntries(),r=t.find(e=>"first-contentful-paint"===e.name);r&&r.startTime}).observe({entryTypes:["paint"]}),new PerformanceObserver(e=>{let t=e.getEntries();t.length>0&&t[t.length-1].startTime}).observe({entryTypes:["largest-contentful-paint"]}),new PerformanceObserver(e=>{let t=0;e.getEntries().forEach(e=>{e.hadRecentInput||(t+=e.value)})}).observe({entryTypes:["layout-shift"]}),()=>{}),[])};let ErrorBoundary=class ErrorBoundary extends l().Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){}render(){return this.state.hasError?(0,i.jsxs)("div",{className:"p-6 bg-red-50 dark:bg-red-900/10 rounded-lg",children:[(0,i.jsx)("h2",{className:"text-red-600 dark:text-red-400 font-medium",children:"Something went wrong"}),(0,i.jsx)("button",{onClick:()=>this.setState({hasError:!1}),className:"mt-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400",children:"Try again"})]}):this.props.children}};let x="Elegant minimalist workspace with soft natural lighting, muted colors",RealTimeToggle=({enabled:e,onToggle:t,isGenerating:r})=>(0,i.jsxs)(d.E.button,{type:"button",onClick:t,disabled:r,className:`
        relative p-3 rounded-xl
        transition-all duration-300
        ${e?"bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20":"bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}
        disabled:opacity-50 disabled:cursor-not-allowed
        group text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30
      `,whileHover:{scale:1.05},whileTap:{scale:.95},transition:{type:"spring",stiffness:700,damping:30},children:[(0,i.jsx)(d.E.div,{className:`
          absolute inset-0 rounded-xl
          ${e?"bg-blue-500/5 dark:bg-blue-400/5":"bg-gray-500/5 dark:bg-gray-400/5"}
        `,initial:!1,animate:e?{scale:1.5,opacity:0}:{scale:1,opacity:0},transition:{duration:.5,repeat:e?1/0:0}}),(0,i.jsx)("span",{className:"relative z-10","aria-label":e?"Real-time mode":"Manual mode",children:e?"⚡":"\uD83C\uDFAF"}),e&&(0,i.jsx)(d.E.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"absolute -top-2 -right-2 text-xs bg-blue-500 text-white dark:text-blue-100 rounded-full w-4 h-4 flex items-center justify-center",children:"2"})]}),GenerateButton=({isGenerating:e,disabled:t,hasError:r})=>{let[a,s]=(0,n.useState)(!1),[l]=(0,n.useState)(r);return(0,n.useEffect)(()=>{if(!e&&!l){s(!0);let e=setTimeout(()=>s(!1),1e3);return()=>clearTimeout(e)}},[e,l]),(0,i.jsx)(d.E.button,{type:"submit",disabled:t,className:`
        relative p-3 rounded-xl transition-all duration-300
        ${r?"bg-red-500/10 text-red-600":a?"bg-green-500/10 text-green-600":"bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"}
        disabled:opacity-50 disabled:cursor-not-allowed
        text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30
      `,whileHover:{scale:1.05},whileTap:{scale:.95},"aria-label":e?"Generating image":"Generate image",children:(0,i.jsx)(u.M,{mode:"wait",children:e?(0,i.jsxs)(d.E.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"relative",children:[(0,i.jsx)(d.E.div,{className:"absolute inset-0 flex items-center justify-center",animate:{rotate:360},transition:{duration:2,repeat:1/0,ease:"linear"},children:"✨"}),(0,i.jsx)("span",{className:"opacity-0",children:"\uD83E\uDE84"})]},"generating"):r?(0,i.jsx)(d.E.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},children:"⚠️"},"error"):a?(0,i.jsx)(d.E.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},children:"✓"},"success"):(0,i.jsx)(d.E.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},children:"\uD83E\uDE84"},"idle")})})},h=l().memo(({url:e,alt:t,loading:r,error:a,onRetry:s})=>(0,i.jsxs)(d.E.div,{variants:{hidden:{opacity:0,scale:.95},visible:{opacity:1,scale:1,transition:{type:"spring",stiffness:300,damping:30}}},initial:"hidden",animate:"visible",className:"relative w-full max-w-4xl aspect-square rounded-3xl overflow-hidden shadow-2xl",children:[e?(0,i.jsx)(c(),{src:e,alt:t,fill:!0,className:"object-cover",priority:!0}):(0,i.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"}),r&&(0,i.jsx)(d.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center",children:(0,i.jsx)(d.E.div,{animate:{rotate:360},transition:{duration:2,repeat:1/0,ease:"linear"},className:"w-12 h-12 border-2 border-white/30 border-t-white rounded-full"})}),a&&(0,i.jsxs)(d.E.div,{initial:{opacity:0},animate:{opacity:1},className:"absolute inset-0 backdrop-blur-sm bg-black/20 flex flex-col items-center justify-center",children:[(0,i.jsxs)("p",{className:"text-white mb-4",children:["⚠️ ",a.message]}),(0,i.jsx)("button",{onClick:s,className:"px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors",children:"Try Again"})]})]}));h.displayName="ImageDisplay";let imageReducer=(e,t)=>{switch(t.type){case"START_LOADING":return{...e,loading:!0,error:null,timestamp:Date.now()};case"LOAD_SUCCESS":return{url:t.url,loading:!1,error:null,timestamp:Date.now()};case"LOAD_ERROR":return{...e,loading:!1,error:t.error,timestamp:Date.now()};case"RESET":return{url:null,loading:!1,error:null,timestamp:Date.now()};default:return e}},useImageCache=()=>{let e=(0,n.useRef)(new Map),t=(0,n.useCallback)((t,r)=>{e.current.set(t,{url:r,timestamp:Date.now()});try{localStorage.setItem("imageCache",JSON.stringify(Array.from(e.current.entries())))}catch(e){}},[]),r=(0,n.useCallback)(t=>{let r=e.current.get(t);return r?Date.now()-r.timestamp>864e5?(e.current.delete(t),null):r.url:null},[]);return(0,n.useEffect)(()=>{try{let t=localStorage.getItem("imageCache");t&&(e.current=new Map(JSON.parse(t)))}catch(e){}},[]),{get:r,set:t}},useRequestQueue=()=>{let e=(0,n.useRef)([]),t=(0,n.useRef)(!1),r=(0,n.useCallback)(async()=>{if(!t.current&&0!==e.current.length){t.current=!0;try{let t=e.current[0];await t(),e.current.shift()}catch(e){}finally{t.current=!1,e.current.length>0&&r()}}},[]),a=(0,n.useCallback)(t=>{e.current.push(t),r()},[r]);return{enqueue:a}},historyReducer=(e,t)=>{switch(t.type){case"ADD_ENTRY":return{...e,entries:[t.entry,...e.entries.filter(e=>e.hash!==t.entry.hash)],error:null};case"REMOVE_ENTRY":return{...e,entries:e.entries.filter(e=>e.id!==t.id),selectedId:e.selectedId===t.id?null:e.selectedId};case"SELECT_ENTRY":return{...e,selectedId:t.id,error:null};case"CLEAR_SELECTION":return{...e,selectedId:null};case"SET_ERROR":return{...e,error:t.error,isLoading:!1};case"CLEAR_ERROR":return{...e,error:null};case"START_LOADING":return{...e,isLoading:!0,error:null};case"STOP_LOADING":return{...e,isLoading:!1};default:return e}},HistoryToggle=({isVisible:e,onToggle:t,hasNewItems:r})=>(0,i.jsxs)(d.E.button,{onClick:t,className:`
      relative p-3 rounded-xl transition-colors
      ${e?"bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20":"bg-gray-100/50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"}
      focus:outline-none focus:ring-2 focus:ring-blue-500/30
    `,whileHover:{scale:1.05},whileTap:{scale:.95},"aria-label":e?"Close history":"Open history",children:[(0,i.jsx)("span",{className:"text-lg",children:e?"\uD83D\uDCDA":"\uD83D\uDCD6"}),r&&!e&&(0,i.jsx)(d.E.div,{initial:{scale:0},animate:{scale:1},className:"absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"})]}),HistoryItem=({entry:e,isSelected:t,onSelect:r,onRemove:a,onRegenerate:s})=>{let[l,o]=(0,n.useState)(!1);return(0,i.jsx)(d.E.div,{layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:`
        relative rounded-xl overflow-hidden
        ${t?"ring-2 ring-blue-500 dark:ring-blue-400":"hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-700"}
        bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all
      `,onHoverStart:()=>o(!0),onHoverEnd:()=>o(!1),children:(0,i.jsxs)(d.E.div,{className:"relative aspect-square",onClick:r,children:[(0,i.jsx)(c(),{src:e.imageUrl,alt:e.prompt,fill:!0,className:"object-cover",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",priority:t}),(0,i.jsx)(u.M,{children:l&&(0,i.jsxs)(d.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 p-4 flex flex-col justify-end",children:[(0,i.jsx)("p",{className:"text-sm text-white line-clamp-2",children:e.prompt}),(0,i.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,i.jsx)("button",{onClick:e=>{e.stopPropagation(),s()},className:"p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors","aria-label":"Regenerate image",children:"↺"}),(0,i.jsx)("button",{onClick:e=>{e.stopPropagation(),a()},className:"p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors","aria-label":"Remove from history",children:"\xd7"})]})]})}),e.metadata.fromCache&&(0,i.jsx)("div",{className:"absolute top-2 right-2 p-1 bg-blue-500 rounded-md",children:(0,i.jsx)("span",{className:"text-xs text-white",children:"⚡"})})]})})},HistoryPanel=({isVisible:e,entries:t,selectedId:r,onClose:a,onSelect:s,onRemove:l,onRegenerate:o,error:c})=>{let p=(0,n.useRef)(null),[g,m]=(0,n.useState)({isDragging:!1,startY:0,translateY:0});return(0,i.jsx)(u.M,{children:e&&(0,i.jsxs)(d.E.div,{ref:p,initial:{opacity:0,y:"100%"},animate:{opacity:1,y:g.translateY||0,transition:{type:"spring",damping:30,stiffness:300}},exit:{opacity:0,y:"100%"},className:"fixed bottom-20 inset-x-0 h-[70vh] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl rounded-t-3xl overflow-hidden",onTouchStart:e=>{m({isDragging:!0,startY:e.touches[0].clientY,translateY:0})},onTouchMove:e=>{if(!g.isDragging)return;let t=e.touches[0].clientY-g.startY;t>0&&m(e=>({...e,translateY:t}))},onTouchEnd:()=>{g.translateY>100&&a(),m({isDragging:!1,startY:0,translateY:0})},children:[(0,i.jsx)("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full my-3"}),(0,i.jsxs)("div",{className:"h-full pt-8 pb-6 px-6 overflow-y-auto custom-scrollbar",children:[(0,i.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{className:"text-base font-medium text-gray-900 dark:text-white",children:"History"}),(0,i.jsxs)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:[t.length," ",1===t.length?"image":"images"," generated"]})]}),(0,i.jsx)("button",{onClick:a,className:"p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg transition-colors","aria-label":"Close history",children:"\xd7"})]}),c&&(0,i.jsxs)(d.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"mb-4 p-4 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg",children:["⚠️ ",c.message]}),(0,i.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-4",children:(0,i.jsx)(u.M,{mode:"popLayout",children:t.map(e=>(0,i.jsx)(HistoryItem,{entry:e,isSelected:e.id===r,onSelect:()=>s(e),onRemove:()=>l(e.id),onRegenerate:()=>o(e)},e.id))})}),0===t.length&&(0,i.jsx)(d.E.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:(0,i.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:"No images generated yet"})})]})]})})};function Home(){usePerfMetrics();let[e,t]=(0,n.useReducer)(imageReducer,{url:null,loading:!1,error:null,timestamp:0}),[r,a]=(0,n.useState)(x),[s,l]=(0,n.useState)(!1),o=(0,n.useRef)(null),{get:c,set:u}=useImageCache(),{enqueue:p}=useRequestQueue(),y=(0,n.useMemo)(()=>e=>(0,m.createHash)("sha256").update(e).digest("hex").substring(0,8),[]),b=(0,n.useCallback)(async e=>{if(!e.trim())return;o.current&&o.current.abort(),o.current=new AbortController;let r=y(e),a=c(r),s=Date.now();if(a){t({type:"LOAD_SUCCESS",url:a,prompt:e}),_({type:"ADD_ENTRY",entry:{id:r,prompt:e,imageUrl:a,hash:r,timestamp:Date.now(),metadata:{generationTime:0,fromCache:!0,seed:r}}});return}t({type:"START_LOADING",prompt:e}),_({type:"START_LOADING"});try{let a=`/api/generate-image?text=${encodeURIComponent(e)}&seed=${r}`;if(await new Promise(e=>setTimeout(e,2e3)),o.current?.signal.aborted)return;t({type:"LOAD_SUCCESS",url:a,prompt:e}),u(r,a),_({type:"ADD_ENTRY",entry:{id:r,prompt:e,imageUrl:a,hash:r,timestamp:Date.now(),metadata:{generationTime:Date.now()-s,fromCache:!1,seed:r}}})}catch(e){e instanceof Error&&(t({type:"LOAD_ERROR",error:e}),_({type:"SET_ERROR",error:e}))}finally{_({type:"STOP_LOADING"})}},[y,c,u]),f=(0,n.useMemo)(()=>g()(e=>{p(()=>b(e))},2e3),[b,p]),v=(0,n.useCallback)(e=>{let t=e.target.value;a(t),s&&f(t)},[s,f]),E=(0,n.useCallback)(e=>{e.preventDefault(),s||p(()=>b(r))},[s,r,b,p]),w=(0,n.useCallback)(()=>{p(()=>b(r))},[r,b,p]);(0,n.useEffect)(()=>()=>{o.current&&o.current.abort()},[]);let[j,_]=(0,n.useReducer)(historyReducer,{entries:[],selectedId:null,error:null,isLoading:!1}),[N,k]=(0,n.useState)(!1),R=(0,n.useMemo)(()=>!N&&j.entries.some(e=>Date.now()-e.timestamp<5e3),[j.entries,N]);return(0,i.jsx)(ErrorBoundary,{children:(0,i.jsx)("div",{className:"min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",children:(0,i.jsxs)("main",{className:"relative min-h-[calc(100vh-4rem)]",children:[(0,i.jsx)("div",{className:"absolute inset-0 flex items-center justify-center p-8 pb-24",children:(0,i.jsx)(h,{url:e.url,alt:r,loading:e.loading,error:e.error,onRetry:w})}),(0,i.jsx)("nav",{className:"fixed bottom-0 inset-x-0 z-50",children:(0,i.jsx)(d.E.div,{className:"glass-effect mx-auto px-4 sm:px-6 lg:px-8 pb-safe",initial:{y:100},animate:{y:0},transition:{type:"spring",stiffness:300,damping:30},children:(0,i.jsxs)("form",{onSubmit:E,className:"flex items-center h-16 gap-4",children:[(0,i.jsxs)("div",{className:"flex items-center gap-2",children:[(0,i.jsx)(RealTimeToggle,{enabled:s,onToggle:()=>l(!s),isGenerating:e.loading}),(0,i.jsx)(GenerateButton,{isGenerating:e.loading,disabled:e.loading||s,hasError:!!e.error})]}),(0,i.jsxs)("div",{className:"relative flex-1",children:[(0,i.jsx)("input",{type:"text",value:r,onChange:v,placeholder:"Describe your vision...",className:"w-full px-4 py-2 text-base text-gray-900 dark:text-white bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"}),r!==x&&(0,i.jsx)("button",{type:"button",onClick:()=>a(x),className:"absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",children:"\xd7"})]}),(0,i.jsx)(HistoryToggle,{isVisible:N,onToggle:()=>k(!N),hasNewItems:R})]})})}),(0,i.jsx)(HistoryPanel,{isVisible:N,entries:j.entries,selectedId:j.selectedId,error:j.error,onClose:()=>{k(!1),_({type:"CLEAR_SELECTION"})},onSelect:e=>{_({type:"SELECT_ENTRY",id:e.id}),a(e.prompt),s||p(()=>b(e.prompt))},onRemove:e=>_({type:"REMOVE_ENTRY",id:e}),onRegenerate:e=>{a(e.prompt),p(()=>b(e.prompt))}})]})})})}},78397:(e,t,r)=>{"use strict";let a;r.r(t),r.d(t,{$$typeof:()=>d,__esModule:()=>c,default:()=>x,generateImageMetadata:()=>g,generateMetadata:()=>p,generateViewport:()=>m}),r(36869);var s=r(61875),i=r(58097),n=r(54580),l=r(91115);let o=(0,l.createProxy)(String.raw`/codebuild/output/src2780279085/src/fast-flux-demo/app/page.tsx`),{__esModule:c,$$typeof:d}=o,u=o.default;a="function"==typeof u?new Proxy(u,{apply:(e,t,r)=>{let a,l,o;try{let e=n.requestAsyncStorage.getStore();a=(0,s.hd)((0,s.xY)([e,"optionalAccess",e=>e.headers,"access",e=>e.get,"call",e=>e("sentry-trace")]),()=>void 0),l=(0,s.hd)((0,s.xY)([e,"optionalAccess",e=>e.headers,"access",e=>e.get,"call",e=>e("baggage")]),()=>void 0),o=(0,s.xY)([e,"optionalAccess",e=>e.headers])}catch(e){}return i.wrapServerComponentWithSentry(e,{componentRoute:"/",componentType:"Page",sentryTraceHeader:a,baggageHeader:l,headers:o}).apply(t,r)}}):u;let p=void 0,g=void 0,m=void 0,x=a},19122:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>g,tree:()=>c});var a=r(45140),s=r(50401),i=r(72622),n=r.n(i),l=r(71867),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,78397)),"/codebuild/output/src2780279085/src/fast-flux-demo/app/page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,43866)),"/codebuild/output/src2780279085/src/fast-flux-demo/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,56420)),"/codebuild/output/src2780279085/src/fast-flux-demo/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,77570,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/codebuild/output/src2780279085/src/fast-flux-demo/app/page.tsx"],u="/page",p={require:r,loadChunk:()=>Promise.resolve()},g=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},30883:(e,t,r)=>{Promise.resolve().then(r.bind(r,91440))},57481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=r(59556);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,a.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[921,831,184,818,221],()=>__webpack_exec__(19122));module.exports=r})();
//# sourceMappingURL=page.js.map