"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[874],{1138:(e,t,r)=>{r.d(t,{v:()=>o});var a=r(2115),n=r(490);let i=e=>{let t=(0,n.y)(e),r=e=>(function(e,t=e=>e){let r=a.useSyncExternalStore(e.subscribe,a.useCallback(()=>t(e.getState()),[e,t]),a.useCallback(()=>t(e.getInitialState()),[e,t]));return a.useDebugValue(r),r})(t,e);return Object.assign(r,t),r},o=e=>e?i(e):i},3617:(e,t,r)=>{r.d(t,{o:()=>n});var a=r(5339);class n{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}new a.qUd(-1,1,1,-1,0,1);class i extends a.LoY{constructor(){super(),this.setAttribute("position",new a.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new a.qtW([0,2,0,0,2,0],2))}}new i},5951:(e,t,r)=>{r.d(t,{zo:()=>l});var a=r(2115),n=r(5339),i=r(3388);let o=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function l(e,t){let r=(0,i.C)(e=>e.gl),l=(0,i.G)(n.Tap,o(e)?Object.values(e):e);return(0,a.useLayoutEffect)(()=>{null==t||t(l)},[t]),(0,a.useEffect)(()=>{if("initTexture"in r){let e=[];Array.isArray(l)?e=l:l instanceof n.gPd?e=[l]:o(l)&&(e=Object.values(l)),e.forEach(e=>{e instanceof n.gPd&&r.initTexture(e)})}},[r,l]),(0,a.useMemo)(()=>{if(!o(e))return l;{let t={},r=0;for(let a in e)t[a]=l[r++];return t}},[e,l])}l.preload=e=>i.G.preload(n.Tap,e),l.clear=e=>i.G.clear(n.Tap,e)},8381:(e,t,r)=>{r.d(t,{mK:()=>_,E8:()=>M,s0:()=>g,fE:()=>S});var a=r(5155),n=r(2115),i=r(5339),o=r(3388),l=r(3303);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}new i.I9Y,new i.I9Y;function u(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}var f=function e(t,r,a){var n=this;u(this,e),s(this,"dot2",function(e,t){return n.x*e+n.y*t}),s(this,"dot3",function(e,t,r){return n.x*e+n.y*t+n.z*r}),this.x=t,this.y=r,this.z=a},c=[new f(1,1,0),new f(-1,1,0),new f(1,-1,0),new f(-1,-1,0),new f(1,0,1),new f(-1,0,1),new f(1,0,-1),new f(-1,0,-1),new f(0,1,1),new f(0,-1,1),new f(0,1,-1),new f(0,-1,-1)],d=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],p=Array(512),m=Array(512);!function(e){e>0&&e<1&&(e*=65536),(e=Math.floor(e))<256&&(e|=e<<8);for(var t,r=0;r<256;r++)t=1&r?d[r]^255&e:d[r]^e>>8&255,p[r]=p[r+256]=t,m[r]=m[r+256]=c[t%12]}(0);function h(e){var t=function(e){if("number"==typeof e)e=Math.abs(e);else if("string"==typeof e){var t=e;e=0;for(var r=0;r<t.length;r++)e=(e+(r+1)*(t.charCodeAt(r)%96))%0x7fffffff}return 0===e&&(e=311),e}(e);return function(){var e=48271*t%0x7fffffff;return t=e,e/0x7fffffff}}new function e(t){var r=this;u(this,e),s(this,"seed",0),s(this,"init",function(e){r.seed=e,r.value=h(e)}),s(this,"value",h(this.seed)),this.init(t)}(Math.random());i.LoY;r(1948);let b=(0,n.createContext)(null),v=e=>(2&e.getAttributes())==2,g=(0,n.memo)((0,n.forwardRef)(({children:e,camera:t,scene:r,resolutionScale:s,enabled:u=!0,renderPriority:f=1,autoClear:c=!0,depthBuffer:d,enableNormalPass:p,stencilBuffer:m,multisampling:h=8,frameBufferType:g=i.ix0},w)=>{let{gl:x,scene:y,camera:_,size:M}=(0,o.C)(),P=r||y,S=t||_,[C,j,E]=(0,n.useMemo)(()=>{let e=new l.s0(x,{depthBuffer:d,stencilBuffer:m,multisampling:h,frameBufferType:g});e.addPass(new l.AH(P,S));let t=null,r=null;return p&&((r=new l.Xe(P,S)).enabled=!1,e.addPass(r),void 0!==s&&((t=new l.SP({normalBuffer:r.texture,resolutionScale:s})).enabled=!1,e.addPass(t))),[e,r,t]},[S,x,d,m,h,g,P,p,s]);(0,n.useEffect)(()=>C?.setSize(M.width,M.height),[C,M]),(0,o.D)((e,t)=>{if(u){let e=x.autoClear;x.autoClear=c,m&&!c&&x.clearStencil(),C.render(t),x.autoClear=e}},u?f:0);let A=(0,n.useRef)(null);(0,n.useLayoutEffect)(()=>{let e=[],t=A.current.__r3f;if(t&&C){let r=t.children;for(let t=0;t<r.length;t++){let a=r[t].object;if(a instanceof l.Mj){let n=[a];if(!v(a)){let e=null;for(;(e=r[t+1]?.object)instanceof l.Mj&&!v(e);)n.push(e),t++}let i=new l.Vu(S,...n);e.push(i)}else a instanceof l.oF&&e.push(a)}for(let t of e)C?.addPass(t);j&&(j.enabled=!0),E&&(E.enabled=!0)}return()=>{for(let t of e)C?.removePass(t);j&&(j.enabled=!1),E&&(E.enabled=!1)}},[C,e,S,j,E]),(0,n.useEffect)(()=>{let e=x.toneMapping;return x.toneMapping=i.y_p,()=>{x.toneMapping=e}},[x]);let T=(0,n.useMemo)(()=>({composer:C,normalPass:j,downSamplingPass:E,resolutionScale:s,camera:S,scene:P}),[C,j,E,s,S,P]);return(0,n.useImperativeHandle)(w,()=>C,[C]),(0,a.jsx)(b.Provider,{value:T,children:(0,a.jsx)("group",{ref:A,children:e})})})),w=0,x=new WeakMap,y=(e,t)=>function({blendFunction:r=t?.blendFunction,opacity:i=t?.opacity,...l}){let s=x.get(e);if(!s){let t=`@react-three/postprocessing/${e.name}-${w++}`;(0,o.e)({[t]:e}),x.set(e,s=t)}let u=(0,o.C)(e=>e.camera),f=n.useMemo(()=>[...t?.args??[],...l.args??[{...t,...l}]],[JSON.stringify(l)]);return(0,a.jsx)(s,{camera:u,"blendMode-blendFunction":r,"blendMode-opacity-value":i,...l,args:f})};l.Mj;let _=y(l.bv,{blendFunction:0}),M=y(l.t$);l.i,l.hH;var P=(e=>(e[e.Linear=0]="Linear",e[e.Radial=1]="Radial",e[e.MirroredLinear=2]="MirroredLinear",e))(P||{});l.Mj;let S=y(l.K1),C=(l.To,{fragmentShader:`

    // original shader by Evan Wallace

    #define MAX_ITERATIONS 100

    uniform float blur;
    uniform float taper;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 direction;
    uniform int samples;

    float random(vec3 scale, float seed) {
        /* use the fragment position for a different seed per-pixel */
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 startPixel = vec2(start.x * resolution.x, start.y * resolution.y);
        vec2 endPixel = vec2(end.x * resolution.x, end.y * resolution.y);
        float f_samples = float(samples);
        float half_samples = f_samples / 2.0;

        // use screen diagonal to normalize blur radii
        float maxScreenDistance = distance(vec2(0.0), resolution); // diagonal distance
        float gradientRadius = taper * (maxScreenDistance);
        float blurRadius = blur * (maxScreenDistance / 16.0);

        /* randomize the lookup values to hide the fixed number of samples */
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        vec2 normal = normalize(vec2(startPixel.y - endPixel.y, endPixel.x - startPixel.x));
        float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - startPixel, normal)) / gradientRadius) * blurRadius;

        #pragma unroll_loop_start
        for (int i = 0; i <= MAX_ITERATIONS; i++) {
            if (i >= samples) { break; } // return early if over sample count
            float f_i = float(i);
            float s_i = -half_samples + f_i;
            float percent = (s_i + offset - 0.5) / half_samples;
            float weight = 1.0 - abs(percent);
            vec4 sample_i = texture2D(inputBuffer, uv + normalize(direction) / resolution * percent * radius);
            /* switch to pre-multiplied alpha to correctly blur transparent images */
            sample_i.rgb *= sample_i.a;
            color += sample_i * weight;
            total += weight;
        }
        #pragma unroll_loop_end

        outputColor = color / total;

        /* switch back from pre-multiplied alpha */
        outputColor.rgb /= outputColor.a + 0.00001;
    }
    `});l.Mj;l.Mj;l.Mj}}]);