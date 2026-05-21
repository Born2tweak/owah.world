(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[224],{737:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return n}});let n=r(8140)._(r(2115)).default.createContext({})},821:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{VALID_LOADERS:function(){return r},imageConfigDefault:function(){return n}});let r=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumResponseBody:5e7,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:void 0,unoptimized:!1}},861:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},1124:(e,t)=>{"use strict";function r(e){var t;let{config:r,src:n,width:i,quality:a}=e,o=a||(null==(t=r.qualities)?void 0:t.reduce((e,t)=>Math.abs(t-75)<Math.abs(e-75)?t:e))||75;return r.path+"?url="+encodeURIComponent(n)+"&w="+i+"&q="+o+(n.startsWith("/_next/static/media/"),"")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}}),r.__next_img_default=!0;let n=r},1262:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let n=r(2115),i=n.useLayoutEffect,a=n.useEffect;function o(e){let{headManager:t,reduceComponentsToState:r}=e;function o(){if(t&&t.mountedInstances){let i=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(i,e))}}return i(()=>{var r;return null==t||null==(r=t.mountedInstances)||r.add(e.children),()=>{var r;null==t||null==(r=t.mountedInstances)||r.delete(e.children)}}),i(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),a(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},1288:(e,t,r)=>{"use strict";let n,i;r.d(t,{N:()=>z});var a=r(8945),o=r(2115),s=r(5339),l=r(3388);let u=new s.NRn,f=new s.Pq0;class c extends s.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new s.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new s.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,r=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),r.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let r=new s.LuO(t,6,1);return this.setAttribute("instanceStart",new s.eHs(r,3,0)),this.setAttribute("instanceEnd",new s.eHs(r,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let r;e instanceof Float32Array?r=e:Array.isArray(e)&&(r=new Float32Array(e));let n=new s.LuO(r,2*t,1);return this.setAttribute("instanceColorStart",new s.eHs(n,t,0)),this.setAttribute("instanceColorEnd",new s.eHs(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new s.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new s.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),u.setFromBufferAttribute(t),this.boundingBox.union(u))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new s.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let r=this.boundingSphere.center;this.boundingBox.getCenter(r);let n=0;for(let i=0,a=e.count;i<a;i++)f.fromBufferAttribute(e,i),n=Math.max(n,r.distanceToSquared(f)),f.fromBufferAttribute(t,i),n=Math.max(n,r.distanceToSquared(f));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var d=r(7548),h=r(4814);class p extends s.BKk{constructor(e){super({type:"LineMaterial",uniforms:s.LlO.clone(s.LlO.merge([d.UniformsLib.common,d.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new s.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${h.r>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h.r>=125?"uv1":"uv2",m=new s.IUQ,g=new s.Pq0,y=new s.Pq0,_=new s.IUQ,b=new s.IUQ,x=new s.IUQ,S=new s.Pq0,w=new s.kn4,E=new s.cZY,M=new s.Pq0,D=new s.NRn,A=new s.iyt,T=new s.IUQ;function R(e,t,r){return T.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),T.multiplyScalar(1/T.w),T.x=i/r.width,T.y=i/r.height,T.applyMatrix4(e.projectionMatrixInverse),T.multiplyScalar(1/T.w),Math.abs(Math.max(T.x,T.y))}class U extends s.eaF{constructor(e=new c,t=new p({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,r=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)g.fromBufferAttribute(t,e),y.fromBufferAttribute(r,e),n[i]=0===i?0:n[i-1],n[i+1]=n[i]+g.distanceTo(y);let i=new s.LuO(n,2,1);return e.setAttribute("instanceDistanceStart",new s.eHs(i,1,0)),e.setAttribute("instanceDistanceEnd",new s.eHs(i,1,1)),this}raycast(e,t){let r,a,o=this.material.worldUnits,l=e.camera;null!==l||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let u=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let f=this.matrixWorld,c=this.geometry,d=this.material;if(i=d.linewidth+u,null===c.boundingSphere&&c.computeBoundingSphere(),A.copy(c.boundingSphere).applyMatrix4(f),o)r=.5*i;else{let e=Math.max(l.near,A.distanceToPoint(n.origin));r=R(l,e,d.resolution)}if(A.radius+=r,!1!==n.intersectsSphere(A)){if(null===c.boundingBox&&c.computeBoundingBox(),D.copy(c.boundingBox).applyMatrix4(f),o)a=.5*i;else{let e=Math.max(l.near,D.distanceToPoint(n.origin));a=R(l,e,d.resolution)}D.expandByScalar(a),!1!==n.intersectsBox(D)&&(o?function(e,t){let r=e.matrixWorld,a=e.geometry,o=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,o.count);for(let a=0;a<u;a++){E.start.fromBufferAttribute(o,a),E.end.fromBufferAttribute(l,a),E.applyMatrix4(r);let u=new s.Pq0,f=new s.Pq0;n.distanceSqToSegment(E.start,E.end,f,u),f.distanceTo(u)<.5*i&&t.push({point:f,pointOnLine:u,distance:n.origin.distanceTo(f),object:e,face:null,faceIndex:a,uv:null,[v]:null})}}(this,t):function(e,t,r){let a=t.projectionMatrix,o=e.material.resolution,l=e.matrixWorld,u=e.geometry,f=u.attributes.instanceStart,c=u.attributes.instanceEnd,d=Math.min(u.instanceCount,f.count),h=-t.near;n.at(1,x),x.w=1,x.applyMatrix4(t.matrixWorldInverse),x.applyMatrix4(a),x.multiplyScalar(1/x.w),x.x*=o.x/2,x.y*=o.y/2,x.z=0,S.copy(x),w.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<d;t++){if(_.fromBufferAttribute(f,t),b.fromBufferAttribute(c,t),_.w=1,b.w=1,_.applyMatrix4(w),b.applyMatrix4(w),_.z>h&&b.z>h)continue;if(_.z>h){let e=_.z-b.z,t=(_.z-h)/e;_.lerp(b,t)}else if(b.z>h){let e=b.z-_.z,t=(b.z-h)/e;b.lerp(_,t)}_.applyMatrix4(a),b.applyMatrix4(a),_.multiplyScalar(1/_.w),b.multiplyScalar(1/b.w),_.x*=o.x/2,_.y*=o.y/2,b.x*=o.x/2,b.y*=o.y/2,E.start.copy(_),E.start.z=0,E.end.copy(b),E.end.z=0;let u=E.closestPointToPointParameter(S,!0);E.at(u,M);let d=s.cj9.lerp(_.z,b.z,u),p=d>=-1&&d<=1,m=S.distanceTo(M)<.5*i;if(p&&m){E.start.fromBufferAttribute(f,t),E.end.fromBufferAttribute(c,t),E.start.applyMatrix4(l),E.end.applyMatrix4(l);let i=new s.Pq0,a=new s.Pq0;n.distanceSqToSegment(E.start,E.end,a,i),r.push({point:a,pointOnLine:i,distance:n.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[v]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(m),this.material.uniforms.resolution.value.set(m.z,m.w))}}class C extends c{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,r=new Float32Array(2*t);for(let n=0;n<t;n+=3)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];return super.setPositions(r),this}setColors(e,t=3){let r=e.length-t,n=new Float32Array(2*r);if(3===t)for(let i=0;i<r;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];else for(let i=0;i<r;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5],n[2*i+6]=e[i+6],n[2*i+7]=e[i+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class B extends U{constructor(e=new C,t=new p({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let z=o.forwardRef(function({points:e,color:t=0xffffff,vertexColors:r,linewidth:n,lineWidth:i,segments:u,dashed:f,...d},h){var v,m;let g=(0,l.C)(e=>e.size),y=o.useMemo(()=>u?new U:new B,[u]),[_]=o.useState(()=>new p),b=(null==r||null==(v=r[0])?void 0:v.length)===4?4:3,x=o.useMemo(()=>{let n=u?new c:new C,i=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Pq0||e instanceof s.IUQ?[e.x,e.y,e.z]:e instanceof s.I9Y?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(i.flat()),r){t=0xffffff;let e=r.map(e=>e instanceof s.Q1f?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,u,r,b]);return o.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),o.useLayoutEffect(()=>{f?_.defines.USE_DASH="":delete _.defines.USE_DASH,_.needsUpdate=!0},[f,_]),o.useEffect(()=>()=>{x.dispose(),_.dispose()},[x]),o.createElement("primitive",(0,a.A)({object:y,ref:h},d),o.createElement("primitive",{object:x,attach:"geometry"}),o.createElement("primitive",(0,a.A)({object:_,attach:"material",color:t,vertexColors:!!r,resolution:[g.width,g.height],linewidth:null!=(m=null!=n?n:i)?m:1,dashed:f,transparent:4===b},d)))})},1356:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return b}});let n=r(8140),i=r(9417),a=r(5155),o=i._(r(2115)),s=n._(r(7650)),l=n._(r(4841)),u=r(5040),f=r(821),c=r(3455);r(4781);let d=r(9862),h=n._(r(1124)),p=r(3011),v={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function m(e,t,r,n,i,a,o){let s=null==e?void 0:e.src;e&&e["data-loaded-src"]!==s&&(e["data-loaded-src"]=s,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}(null==n?void 0:n.current)&&n.current(e)}}))}function g(e){return o.use?{fetchPriority:e}:{fetchpriority:e}}let y=(0,o.forwardRef)((e,t)=>{let{src:r,srcSet:n,sizes:i,height:s,width:l,decoding:u,className:f,style:c,fetchPriority:d,placeholder:h,loading:v,unoptimized:y,fill:_,onLoadRef:b,onLoadingCompleteRef:x,setBlurComplete:S,setShowAltText:w,sizesInput:E,onLoad:M,onError:D,...A}=e,T=(0,o.useCallback)(e=>{e&&(D&&(e.src=e.src),e.complete&&m(e,h,b,x,S,y,E))},[r,h,b,x,S,D,y,E]),R=(0,p.useMergedRef)(t,T);return(0,a.jsx)("img",{...A,...g(d),loading:v,width:l,height:s,decoding:u,"data-nimg":_?"fill":"1",className:f,style:c,sizes:i,srcSet:n,src:r,ref:R,onLoad:e=>{m(e.currentTarget,h,b,x,S,y,E)},onError:e=>{w(!0),"empty"!==h&&S(!0),D&&D(e)}})});function _(e){let{isAppRouter:t,imgAttributes:r}=e,n={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...g(r.fetchPriority)};return t&&s.default.preload?(s.default.preload(r.src,n),null):(0,a.jsx)(l.default,{children:(0,a.jsx)("link",{rel:"preload",href:r.srcSet?void 0:r.src,...n},"__nimg-"+r.src+r.srcSet+r.sizes)})}let b=(0,o.forwardRef)((e,t)=>{let r=(0,o.useContext)(d.RouterContext),n=(0,o.useContext)(c.ImageConfigContext),i=(0,o.useMemo)(()=>{var e;let t=v||n||f.imageConfigDefault,r=[...t.deviceSizes,...t.imageSizes].sort((e,t)=>e-t),i=t.deviceSizes.sort((e,t)=>e-t),a=null==(e=t.qualities)?void 0:e.sort((e,t)=>e-t);return{...t,allSizes:r,deviceSizes:i,qualities:a}},[n]),{onLoad:s,onLoadingComplete:l}=e,p=(0,o.useRef)(s);(0,o.useEffect)(()=>{p.current=s},[s]);let m=(0,o.useRef)(l);(0,o.useEffect)(()=>{m.current=l},[l]);let[g,b]=(0,o.useState)(!1),[x,S]=(0,o.useState)(!1),{props:w,meta:E}=(0,u.getImgProps)(e,{defaultLoader:h.default,imgConf:i,blurComplete:g,showAltText:x});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y,{...w,unoptimized:E.unoptimized,placeholder:E.placeholder,fill:E.fill,onLoadRef:p,onLoadingCompleteRef:m,setBlurComplete:b,setShowAltText:S,sizesInput:e.sizes,ref:t}),E.priority?(0,a.jsx)(_,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2697:(e,t,r)=>{"use strict";r.d(t,{d:()=>c});var n=r(8945),i=r(2115),a=r(5339),o=r(3388),s=r(8587);class l extends a.BKk{constructor(e=new a.I9Y){super({uniforms:{inputBuffer:new a.nc$(null),depthBuffer:new a.nc$(null),resolution:new a.nc$(new a.I9Y),texelSize:new a.nc$(new a.I9Y),halfTexelSize:new a.nc$(new a.I9Y),kernel:new a.nc$(0),scale:new a.nc$(1),cameraNear:new a.nc$(0),cameraFar:new a.nc$(1),minDepthThreshold:new a.nc$(0),maxDepthThreshold:new a.nc$(1),depthScale:new a.nc$(0),depthToBlurRatioBias:new a.nc$(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${s.r>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:a.XIg,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class u{constructor({gl:e,resolution:t,width:r=500,height:n=500,minDepthThreshold:i=0,maxDepthThreshold:o=1,depthScale:s=0,depthToBlurRatioBias:u=.25}){this.renderToScreen=!1,this.renderTargetA=new a.nWS(t,t,{minFilter:a.k6q,magFilter:a.k6q,stencilBuffer:!1,depthBuffer:!1,type:a.ix0}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new l,this.convolutionMaterial.setTexelSize(1/r,1/n),this.convolutionMaterial.setResolution(new a.I9Y(r,n)),this.scene=new a.Z58,this.camera=new a.i7d,this.convolutionMaterial.uniforms.minDepthThreshold.value=i,this.convolutionMaterial.uniforms.maxDepthThreshold.value=o,this.convolutionMaterial.uniforms.depthScale.value=s,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=u,this.convolutionMaterial.defines.USE_DEPTH=s>0;let f=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),c=new Float32Array([0,0,2,0,0,2]),d=new a.LoY;d.setAttribute("position",new a.THS(f,3)),d.setAttribute("uv",new a.THS(c,2)),this.screen=new a.eaF(d,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,r){let n,i,a,o=this.scene,s=this.camera,l=this.renderTargetA,u=this.renderTargetB,f=this.convolutionMaterial,c=f.uniforms;c.depthBuffer.value=t.depthTexture;let d=f.kernel,h=t;for(i=0,a=d.length-1;i<a;++i)n=(1&i)==0?l:u,c.kernel.value=d[i],c.inputBuffer.value=h.texture,e.setRenderTarget(n),e.render(o,s),h=n;c.kernel.value=d[i],c.inputBuffer.value=h.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(o,s)}}class f extends a._4j{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;null!=(t=e.defines)&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}let c=i.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:r=256,blur:s=[0,0],minDepthThreshold:l=.9,maxDepthThreshold:c=1,depthScale:d=0,depthToBlurRatioBias:h=.25,mirror:p=0,distortion:v=1,mixContrast:m=1,distortionMap:g,reflectorOffset:y=0,..._},b)=>{(0,o.e)({MeshReflectorMaterialImpl:f});let x=(0,o.C)(({gl:e})=>e),S=(0,o.C)(({camera:e})=>e),w=(0,o.C)(({scene:e})=>e),E=(s=Array.isArray(s)?s:[s,s])[0]+s[1]>0,M=s[0],D=s[1],A=i.useRef(null);i.useImperativeHandle(b,()=>A.current,[]);let[T]=i.useState(()=>new a.Zcv),[R]=i.useState(()=>new a.Pq0),[U]=i.useState(()=>new a.Pq0),[C]=i.useState(()=>new a.Pq0),[B]=i.useState(()=>new a.kn4),[z]=i.useState(()=>new a.Pq0(0,0,-1)),[L]=i.useState(()=>new a.IUQ),[P]=i.useState(()=>new a.Pq0),[j]=i.useState(()=>new a.Pq0),[O]=i.useState(()=>new a.IUQ),[k]=i.useState(()=>new a.kn4),[I]=i.useState(()=>new a.ubm),F=i.useCallback(()=>{var e;let t=A.current.parent||(null==(e=A.current)||null==(e=e.__r3f.parent)?void 0:e.object);if(!t||(U.setFromMatrixPosition(t.matrixWorld),C.setFromMatrixPosition(S.matrixWorld),B.extractRotation(t.matrixWorld),R.set(0,0,1),R.applyMatrix4(B),U.addScaledVector(R,y),P.subVectors(U,C),P.dot(R)>0))return;P.reflect(R).negate(),P.add(U),B.extractRotation(S.matrixWorld),z.set(0,0,-1),z.applyMatrix4(B),z.add(C),j.subVectors(U,z),j.reflect(R).negate(),j.add(U),I.position.copy(P),I.up.set(0,1,0),I.up.applyMatrix4(B),I.up.reflect(R),I.lookAt(j),I.far=S.far,I.updateMatrixWorld(),I.projectionMatrix.copy(S.projectionMatrix),k.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),k.multiply(I.projectionMatrix),k.multiply(I.matrixWorldInverse),k.multiply(t.matrixWorld),T.setFromNormalAndCoplanarPoint(R,U),T.applyMatrix4(I.matrixWorldInverse),L.set(T.normal.x,T.normal.y,T.normal.z,T.constant);let r=I.projectionMatrix;O.x=(Math.sign(L.x)+r.elements[8])/r.elements[0],O.y=(Math.sign(L.y)+r.elements[9])/r.elements[5],O.z=-1,O.w=(1+r.elements[10])/r.elements[14],L.multiplyScalar(2/L.dot(O)),r.elements[2]=L.x,r.elements[6]=L.y,r.elements[10]=L.z+1,r.elements[14]=L.w},[S,y]),[N,q,W,G]=i.useMemo(()=>{let n={minFilter:a.k6q,magFilter:a.k6q,type:a.ix0},i=new a.nWS(r,r,n);i.depthBuffer=!0,i.depthTexture=new a.VCu(r,r),i.depthTexture.format=a.zdS,i.depthTexture.type=a.cHt;let o=new a.nWS(r,r,n),s=new u({gl:x,resolution:r,width:M,height:D,minDepthThreshold:l,maxDepthThreshold:c,depthScale:d,depthToBlurRatioBias:h}),f={mirror:p,textureMatrix:k,mixBlur:e,tDiffuse:i.texture,tDepth:i.depthTexture,tDiffuseBlur:o.texture,hasBlur:E,mixStrength:t,minDepthThreshold:l,maxDepthThreshold:c,depthScale:d,depthToBlurRatioBias:h,distortion:v,distortionMap:g,mixContrast:m,"defines-USE_BLUR":E?"":void 0,"defines-USE_DEPTH":d>0?"":void 0,"defines-USE_DISTORTION":g?"":void 0};return[i,o,s,f]},[x,M,D,k,r,p,E,e,t,l,c,d,h,v,g,m]);return(0,o.D)(()=>{var e;let t=A.current.parent||(null==(e=A.current)||null==(e=e.__r3f.parent)?void 0:e.object);if(!t)return;t.visible=!1;let r=x.xr.enabled,n=x.shadowMap.autoUpdate;F(),x.xr.enabled=!1,x.shadowMap.autoUpdate=!1,x.setRenderTarget(N),x.state.buffers.depth.setMask(!0),x.autoClear||x.clear(),x.render(w,I),E&&W.render(x,N,q),x.xr.enabled=r,x.shadowMap.autoUpdate=n,t.visible=!0,x.setRenderTarget(null)}),i.createElement("meshReflectorMaterialImpl",(0,n.A)({attach:"material",key:"key"+G["defines-USE_BLUR"]+G["defines-USE_DEPTH"]+G["defines-USE_DISTORTION"],ref:A},G,_))})},3011:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return i}});let n=r(2115);function i(e,t){let r=(0,n.useRef)(null),i=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=a(e,n)),t&&(i.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3455:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ImageConfigContext",{enumerable:!0,get:function(){return a}});let n=r(8140)._(r(2115)),i=r(821),a=n.default.createContext(i.imageConfigDefault)},4105:(e,t)=>{"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:n,blurHeight:i,blurDataURL:a,objectFit:o}=e,s=n?40*n:t,l=i?40*i:r,u=s&&l?"viewBox='0 0 "+s+" "+l+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+u+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(u?"none":"contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+a+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},4195:(e,t,r)=>{"use strict";function n(){return function(e){function t(e,t){for(var r,n,i,a,o,s=/([MLQCZ])([^MLQCZ]*)/g;r=s.exec(e);){var l=r[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(e){return parseFloat(e)});switch(r[1]){case"M":a=n=l[0],o=i=l[1];break;case"L":(l[0]!==a||l[1]!==o)&&t("L",a,o,a=l[0],o=l[1]);break;case"Q":t("Q",a,o,a=l[2],o=l[3],l[0],l[1]);break;case"C":t("C",a,o,a=l[4],o=l[5],l[0],l[1],l[2],l[3]);break;case"Z":(a!==n||o!==i)&&t("L",a,o,n,i)}}}function r(e,r,n){void 0===n&&(n=16);var i={x:0,y:0};t(e,function(e,t,a,o,s,l,u,f,c){switch(e){case"L":r(t,a,o,s);break;case"Q":for(var d=t,h=a,p=1;p<n;p++)!function(e,t,r,n,i,a,o,s){var l=1-o;s.x=l*l*e+2*l*o*r+o*o*i,s.y=l*l*t+2*l*o*n+o*o*a}(t,a,l,u,o,s,p/(n-1),i),r(d,h,i.x,i.y),d=i.x,h=i.y;break;case"C":for(var v=t,m=a,g=1;g<n;g++)!function(e,t,r,n,i,a,o,s,l,u){var f=1-l;u.x=f*f*f*e+3*f*f*l*r+3*f*l*l*i+l*l*l*o,u.y=f*f*f*t+3*f*f*l*n+3*f*l*l*a+l*l*l*s}(t,a,l,u,f,c,o,s,g/(n-1),i),r(v,m,i.x,i.y),v=i.x,m=i.y}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",i=new WeakMap,a={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function o(e,t){var r=e.getContext?e.getContext("webgl",a):e,n=i.get(r);if(!n){var o="undefined"!=typeof WebGL2RenderingContext&&r instanceof WebGL2RenderingContext,s={},l={},u={},f=-1,c=[];function d(e){var t=s[e];if(!t&&!(t=s[e]=r.getExtension(e)))throw Error(e+" not supported");return t}function h(e,t){var n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}function p(){s={},l={},u={},f=-1,c.length=0}r.canvas.addEventListener("webglcontextlost",function(e){p(),e.preventDefault()},!1),i.set(r,n={gl:r,isWebGL2:o,getExtension:d,withProgram:function(e,t,n,i){if(!l[e]){var a={},s={},u=r.createProgram();r.attachShader(u,h(t,r.VERTEX_SHADER)),r.attachShader(u,h(n,r.FRAGMENT_SHADER)),r.linkProgram(u),l[e]={program:u,transaction:function(e){r.useProgram(u),e({setUniform:function(e,t){for(var n=[],i=arguments.length-2;i-- >0;)n[i]=arguments[i+2];var a=s[t]||(s[t]=r.getUniformLocation(u,t));r["uniform"+e].apply(r,[a].concat(n))},setAttribute:function(e,t,n,i,s){var l=a[e];l||(l=a[e]={buf:r.createBuffer(),loc:r.getAttribLocation(u,e),data:null}),r.bindBuffer(r.ARRAY_BUFFER,l.buf),r.vertexAttribPointer(l.loc,t,r.FLOAT,!1,0,0),r.enableVertexAttribArray(l.loc),o?r.vertexAttribDivisor(l.loc,i):d("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(l.loc,i),s!==l.data&&(r.bufferData(r.ARRAY_BUFFER,s,n),l.data=s)}})}}}l[e].transaction(i)},withTexture:function(e,t){f++;try{r.activeTexture(r.TEXTURE0+f);var n=u[e];n||(n=u[e]=r.createTexture(),r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST)),r.bindTexture(r.TEXTURE_2D,n),t(n,f)}finally{f--}},withTextureFramebuffer:function(e,t,n){var i=r.createFramebuffer();c.push(i),r.bindFramebuffer(r.FRAMEBUFFER,i),r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);try{n(i)}finally{r.deleteFramebuffer(i),r.bindFramebuffer(r.FRAMEBUFFER,c[--c.length-1]||null)}},handleContextLoss:p})}t(n)}function s(e,t,r,i,a,s,l,u){void 0===l&&(l=15),void 0===u&&(u=null),o(e,function(e){var o=e.gl,f=e.withProgram;(0,e.withTexture)("copy",function(e,c){o.texImage2D(o.TEXTURE_2D,0,o.RGBA,a,s,0,o.RGBA,o.UNSIGNED_BYTE,t),f("copy",n,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",function(e){var t=e.setUniform;(0,e.setAttribute)("aUV",2,o.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),t("1i","image",c),o.bindFramebuffer(o.FRAMEBUFFER,u||null),o.disable(o.BLEND),o.colorMask(8&l,4&l,2&l,1&l),o.viewport(r,i,a,s),o.scissor(r,i,a,s),o.drawArrays(o.TRIANGLES,0,3)})})})}var l=Object.freeze({__proto__:null,withWebGLContext:o,renderImageData:s,resizeWebGLCanvasWithoutClearing:function(e,t,r){var n=e.width,i=e.height;o(e,function(a){var o=a.gl,l=new Uint8Array(n*i*4);o.readPixels(0,0,n,i,o.RGBA,o.UNSIGNED_BYTE,l),e.width=t,e.height=r,s(o,l,0,0,n,i)})}});function u(e,t,n,i,a,o){void 0===o&&(o=1);var s=new Uint8Array(e*t),l=i[2]-i[0],u=i[3]-i[1],f=[];r(n,function(e,t,r,n){f.push({x1:e,y1:t,x2:r,y2:n,minX:Math.min(e,r),minY:Math.min(t,n),maxX:Math.max(e,r),maxY:Math.max(t,n)})}),f.sort(function(e,t){return e.maxX-t.maxX});for(var c=0;c<e;c++)for(var d=0;d<t;d++){var h=function(e,t){for(var r=1/0,n=1/0,i=f.length;i--;){var a=f[i];if(a.maxX+n<=e)break;if(e+n>a.minX&&t-n<a.maxY&&t+n>a.minY){var o=function(e,t,r,n,i,a){var o=i-r,s=a-n,l=o*o+s*s,u=l?Math.max(0,Math.min(1,((e-r)*o+(t-n)*s)/l)):0,f=e-(r+u*o),c=t-(n+u*s);return f*f+c*c}(e,t,a.x1,a.y1,a.x2,a.y2);o<r&&(n=Math.sqrt(r=o))}}return function(e,t){for(var r=0,n=f.length;n--;){var i=f[n];if(i.maxX<=e)break;i.y1>t!=i.y2>t&&e<(i.x2-i.x1)*(t-i.y1)/(i.y2-i.y1)+i.x1&&(r+=i.y1<i.y2?1:-1)}return 0!==r}(e,t)&&(n=-n),n}(i[0]+l*(c+.5)/e,i[1]+u*(d+.5)/t),p=Math.pow(1-Math.abs(h)/a,o)/2;h<0&&(p=1-p),p=Math.max(0,Math.min(255,Math.round(255*p))),s[d*e+c]=p}return s}function f(e,t,r,n,i,a,o,s,l,u){void 0===a&&(a=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===u&&(u=0),c(e,t,r,n,i,a,o,null,s,l,u)}function c(e,t,r,n,i,a,o,l,f,c,d){void 0===a&&(a=1),void 0===f&&(f=0),void 0===c&&(c=0),void 0===d&&(d=0);for(var h=u(e,t,r,n,i,a),p=new Uint8Array(4*h.length),v=0;v<h.length;v++)p[4*v+d]=h[v];s(o,p,f,c,e,t,1<<3-d,l)}var d=Object.freeze({__proto__:null,generate:u,generateIntoCanvas:f,generateIntoFramebuffer:c}),h=new Float32Array([0,0,2,0,0,2]),p=null,v=!1,m={},g=new WeakMap;function y(e){if(!v&&!S(e))throw Error("WebGL generation not supported")}function _(e,t,r,n,i,a,s){if(void 0===a&&(a=1),void 0===s&&(s=null),!s&&!(s=p)){var l="function"==typeof OffscreenCanvas?new OffscreenCanvas(1,1):"undefined"!=typeof document?document.createElement("canvas"):null;if(!l)throw Error("OffscreenCanvas or DOM canvas not supported");s=p=l.getContext("webgl",{depth:!1})}y(s);var u=new Uint8Array(e*t*4);o(s,function(o){var s=o.gl,l=o.withTexture,f=o.withTextureFramebuffer;l("readable",function(o,l){s.texImage2D(s.TEXTURE_2D,0,s.RGBA,e,t,0,s.RGBA,s.UNSIGNED_BYTE,null),f(o,l,function(o){x(e,t,r,n,i,a,s,o,0,0,0),s.readPixels(0,0,e,t,s.RGBA,s.UNSIGNED_BYTE,u)})})});for(var f=new Uint8Array(e*t),c=0,d=0;c<u.length;c+=4)f[d++]=u[c];return f}function b(e,t,r,n,i,a,o,s,l,u){void 0===a&&(a=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===u&&(u=0),x(e,t,r,n,i,a,o,null,s,l,u)}function x(e,t,i,a,s,l,u,f,c,d,p){void 0===l&&(l=1),void 0===c&&(c=0),void 0===d&&(d=0),void 0===p&&(p=0),y(u);var v=[];r(i,function(e,t,r,n){v.push(e,t,r,n)}),v=new Float32Array(v),o(u,function(r){var i=r.gl,o=r.isWebGL2,u=r.getExtension,m=r.withProgram,g=r.withTexture,y=r.withTextureFramebuffer,_=r.handleContextLoss;if(g("rawDistances",function(r,g){(e!==r._lastWidth||t!==r._lastHeight)&&i.texImage2D(i.TEXTURE_2D,0,i.RGBA,r._lastWidth=e,r._lastHeight=t,0,i.RGBA,i.UNSIGNED_BYTE,null),m("main","precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}","precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",function(n){var f=n.setAttribute,c=n.setUniform,d=!o&&u("ANGLE_instanced_arrays"),p=!o&&u("EXT_blend_minmax");f("aUV",2,i.STATIC_DRAW,0,h),f("aLineSegment",4,i.DYNAMIC_DRAW,1,v),c.apply(void 0,["4f","uGlyphBounds"].concat(a)),c("1f","uMaxDistance",s),c("1f","uExponent",l),y(r,g,function(r){i.enable(i.BLEND),i.colorMask(!0,!0,!0,!0),i.viewport(0,0,e,t),i.scissor(0,0,e,t),i.blendFunc(i.ONE,i.ONE),i.blendEquationSeparate(i.FUNC_ADD,o?i.MAX:p.MAX_EXT),i.clear(i.COLOR_BUFFER_BIT),o?i.drawArraysInstanced(i.TRIANGLES,0,3,v.length/4):d.drawArraysInstancedANGLE(i.TRIANGLES,0,3,v.length/4)})}),m("post",n,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",function(r){r.setAttribute("aUV",2,i.STATIC_DRAW,0,h),r.setUniform("1i","tex",g),i.bindFramebuffer(i.FRAMEBUFFER,f),i.disable(i.BLEND),i.colorMask(0===p,1===p,2===p,3===p),i.viewport(c,d,e,t),i.scissor(c,d,e,t),i.drawArrays(i.TRIANGLES,0,3)})}),i.isContextLost())throw _(),Error("webgl context lost")})}function S(e){var t=e&&e!==p?e.canvas||e:m,r=g.get(t);if(void 0===r){v=!0;var n=null;try{var i=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],a=_(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,e);(r=a&&i.length===a.length&&a.every(function(e,t){return e===i[t]}))||(n="bad trial run results",console.info(i,a))}catch(e){r=!1,n=e.message}n&&console.warn("WebGL SDF generation not supported:",n),v=!1,g.set(t,r)}return r}var w=Object.freeze({__proto__:null,generate:_,generateIntoCanvas:b,generateIntoFramebuffer:x,isSupported:S});return e.forEachPathCommand=t,e.generate=function(e,t,r,n,i,a){void 0===i&&(i=Math.max(n[2]-n[0],n[3]-n[1])/2),void 0===a&&(a=1);try{return _.apply(w,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),u.apply(d,arguments)}},e.generateIntoCanvas=function(e,t,r,n,i,a,o,s,l,u){void 0===i&&(i=Math.max(n[2]-n[0],n[3]-n[1])/2),void 0===a&&(a=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===u&&(u=0);try{return b.apply(w,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),f.apply(d,arguments)}},e.javascript=d,e.pathToLineSegments=r,e.webgl=w,e.webglUtils=l,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}r.d(t,{A:()=>n})},4652:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return l},getImageProps:function(){return s}});let n=r(8140),i=r(5040),a=r(1356),o=n._(r(1124));function s(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let l=a.Image},4841:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return v},defaultHead:function(){return c}});let n=r(8140),i=r(9417),a=r(5155),o=i._(r(2115)),s=n._(r(1262)),l=r(737),u=r(2073),f=r(861);function c(e){void 0===e&&(e=!1);let t=[(0,a.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,a.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function d(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(4781);let h=["name","httpEquiv","charSet","itemProp"];function p(e,t){let{inAmpMode:r}=t;return e.reduce(d,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return i=>{let a=!0,o=!1;if(i.key&&"number"!=typeof i.key&&i.key.indexOf("$")>0){o=!0;let t=i.key.slice(i.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(i.type){case"title":case"base":t.has(i.type)?a=!1:t.add(i.type);break;case"meta":for(let e=0,t=h.length;e<t;e++){let t=h[e];if(i.props.hasOwnProperty(t))if("charSet"===t)r.has(t)?a=!1:r.add(t);else{let e=i.props[t],r=n[t]||new Set;("name"!==t||!o)&&r.has(e)?a=!1:(r.add(e),n[t]=r)}}}return a}}()).reverse().map((e,t)=>{let r=e.key||t;return o.default.cloneElement(e,{key:r})})}let v=function(e){let{children:t}=e,r=(0,o.useContext)(l.AmpStateContext),n=(0,o.useContext)(u.HeadManagerContext);return(0,a.jsx)(s.default,{reduceComponentsToState:p,headManager:n,inAmpMode:(0,f.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5040:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return l}}),r(4781);let n=r(4105),i=r(821),a=["-moz-initial","fill","none","scale-down",void 0];function o(e){return void 0!==e.default}function s(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l(e,t){var r,l;let u,f,c,{src:d,sizes:h,unoptimized:p=!1,priority:v=!1,loading:m,className:g,quality:y,width:_,height:b,fill:x=!1,style:S,overrideSrc:w,onLoad:E,onLoadingComplete:M,placeholder:D="empty",blurDataURL:A,fetchPriority:T,decoding:R="async",layout:U,objectFit:C,objectPosition:B,lazyBoundary:z,lazyRoot:L,...P}=e,{imgConf:j,showAltText:O,blurComplete:k,defaultLoader:I}=t,F=j||i.imageConfigDefault;if("allSizes"in F)u=F;else{let e=[...F.deviceSizes,...F.imageSizes].sort((e,t)=>e-t),t=F.deviceSizes.sort((e,t)=>e-t),n=null==(r=F.qualities)?void 0:r.sort((e,t)=>e-t);u={...F,allSizes:e,deviceSizes:t,qualities:n}}if(void 0===I)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let N=P.loader||I;delete P.loader,delete P.srcSet;let q="__next_img_default"in N;if(q){if("custom"===u.loader)throw Object.defineProperty(Error('Image with src "'+d+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=N;N=t=>{let{config:r,...n}=t;return e(n)}}if(U){"fill"===U&&(x=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[U];e&&(S={...S,...e});let t={responsive:"100vw",fill:"100vw"}[U];t&&!h&&(h=t)}let W="",G=s(_),H=s(b);if((l=d)&&"object"==typeof l&&(o(l)||void 0!==l.src)){let e=o(d)?d.default:d;if(!e.src)throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e)),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!e.height||!e.width)throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e)),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(f=e.blurWidth,c=e.blurHeight,A=A||e.blurDataURL,W=e.src,!x)if(G||H){if(G&&!H){let t=G/e.width;H=Math.round(e.height*t)}else if(!G&&H){let t=H/e.height;G=Math.round(e.width*t)}}else G=e.width,H=e.height}let $=!v&&("lazy"===m||void 0===m);(!(d="string"==typeof d?d:W)||d.startsWith("data:")||d.startsWith("blob:"))&&(p=!0,$=!1),u.unoptimized&&(p=!0),q&&!u.dangerouslyAllowSVG&&d.split("?",1)[0].endsWith(".svg")&&(p=!0);let V=s(y),X=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:C,objectPosition:B}:{},O?{}:{color:"transparent"},S),Y=k||"empty"===D?null:"blur"===D?'url("data:image/svg+xml;charset=utf-8,'+(0,n.getImageBlurSvg)({widthInt:G,heightInt:H,blurWidth:f,blurHeight:c,blurDataURL:A||"",objectFit:X.objectFit})+'")':'url("'+D+'")',Q=a.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,K=Y?{backgroundSize:Q,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},Z=function(e){let{config:t,src:r,unoptimized:n,width:i,quality:a,sizes:o,loader:s}=e;if(n)return{src:r,srcSet:void 0,sizes:void 0};let{widths:l,kind:u}=function(e,t,r){let{deviceSizes:n,allSizes:i}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(r);)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:i.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:i,kind:"w"}}return"number"!=typeof t?{widths:n,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>i.find(t=>t>=e)||i[i.length-1]))],kind:"x"}}(t,i,o),f=l.length-1;return{sizes:o||"w"!==u?o:"100vw",srcSet:l.map((e,n)=>s({config:t,src:r,quality:a,width:e})+" "+("w"===u?e:n+1)+u).join(", "),src:s({config:t,src:r,quality:a,width:l[f]})}}({config:u,src:d,unoptimized:p,width:G,quality:V,sizes:h,loader:N});return{props:{...P,loading:$?"lazy":m,fetchPriority:T,width:G,height:H,decoding:R,className:g,style:{...X,...K},sizes:Z.sizes,srcSet:Z.srcSet,src:w||Z.src},meta:{unoptimized:p,priority:v,placeholder:D,fill:x}}}},5239:(e,t,r)=>{"use strict";r.d(t,{default:()=>i.a});var n=r(4652),i=r.n(n)},5688:(e,t,r)=>{"use strict";var n=r(5704);r(6340);var i=r(2115),a=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(i),o=void 0!==n&&n.env&&!0,s=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,r=t.name,n=void 0===r?"stylesheet":r,i=t.optimizeForSpeed,a=void 0===i?o:i;u(s(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",u("boolean"==typeof a,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=a,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="undefined"!=typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){u("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),u(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(u(!this._injected,"sheet already injected"),this._injected=!0,"undefined"!=typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(u(s(e),"`insertRule` accepts only strings"),"undefined"==typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"undefined"==typeof window){var r="undefined"!=typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];u(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},r.deleteRule=function(e){if("undefined"==typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];u(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"undefined"!=typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"undefined"==typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&u(s(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return r?i.insertBefore(n,r):i.appendChild(n),n},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}();function u(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var f=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},c={};function d(e,t){if(!t)return"jsx-"+e;var r=String(t),n=e+r;return c[n]||(c[n]="jsx-"+f(e+"-"+r)),c[n]}function h(e,t){"undefined"==typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return c[r]||(c[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[r]}var p=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,n=void 0===r?null:r,i=t.optimizeForSpeed,a=void 0!==i&&i;this._sheet=n||new l({name:"styled-jsx",optimizeForSpeed:a}),this._sheet.inject(),n&&"boolean"==typeof a&&(this._sheet.setOptimizeForSpeed(a),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"undefined"==typeof window||this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),n=r.styleId,i=r.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var a=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=a,this._instancesCounts[n]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var n=this._fromServer&&this._fromServer[r];n?(n.parentNode.removeChild(n),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],n=e[1];return a.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,n=e.id;if(r){var i=d(n,r);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return h(i,e)}):[h(i,t)]}}return{styleId:d(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),v=i.createContext(null);v.displayName="StyleSheetContext";var m=a.default.useInsertionEffect||a.default.useLayoutEffect,g="undefined"!=typeof window?new p:void 0;function y(e){var t=g||i.useContext(v);return t&&("undefined"==typeof window?t.add(e):m(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}y.dynamic=function(e){return e.map(function(e){return d(e[0],e[1])}).join(" ")},t.style=y},6340:()=>{},6923:(e,t,r)=>{"use strict";r.d(t,{E:()=>l});var n=r(8945),i=r(2115),a=r(4785),o=r(3388),s=r(3689);let l=i.forwardRef(({sdfGlyphSize:e=64,anchorX:t="center",anchorY:r="middle",font:l,fontSize:u=1,children:f,characters:c,onSync:d,...h},p)=>{let v=(0,o.C)(({invalidate:e})=>e),[m]=i.useState(()=>new a.EY),[g,y]=i.useMemo(()=>{let e=[],t="";return i.Children.forEach(f,r=>{"string"==typeof r||"number"==typeof r?t+=r:e.push(r)}),[e,t]},[f]);return(0,s.DY)(()=>new Promise(e=>(0,a.PY)({font:l,characters:c},e)),["troika-text",l,c]),i.useLayoutEffect(()=>void m.sync(()=>{v(),d&&d(m)})),i.useEffect(()=>()=>m.dispose(),[m]),i.createElement("primitive",(0,n.A)({object:m,ref:p,font:l,text:y,anchorX:t,anchorY:r,fontSize:u,sdfGlyphSize:e},h),g)})},7509:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=function(){return function(e){var t,r,n,i,a={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},o={},s={};o.L=1,s[1]="L",Object.keys(a).forEach(function(e,t){o[e]=1<<t+1,s[o[e]]=e}),Object.freeze(o);var l=o.LRI|o.RLI|o.FSI,u=o.L|o.R|o.AL,f=o.B|o.S|o.WS|o.ON|o.FSI|o.LRI|o.RLI|o.PDI,c=o.BN|o.RLE|o.LRE|o.RLO|o.LRO|o.PDF,d=o.S|o.WS|o.B|l|o.PDI|c,h=null;function p(e){if(!h){h=new Map;var t=function(e){if(a.hasOwnProperty(e)){var t=0;a[e].split(",").forEach(function(r){var n=r.split("+"),i=n[0],a=n[1];i=parseInt(i,36),a=a?parseInt(a,36):0,h.set(t+=i,o[e]);for(var s=0;s<a;s++)h.set(++t,o[e])})}};for(var r in a)t(r)}return h.get(e.codePointAt(0))||o.L}function v(e,t){var r,n=0,i=new Map,a=t&&new Map;return e.split(",").forEach(function e(o){if(-1!==o.indexOf("+"))for(var s=+o;s--;)e(r);else{r=o;var l=o.split(">"),u=l[0],f=l[1];u=String.fromCodePoint(n+=parseInt(u,36)),f=String.fromCodePoint(n+=parseInt(f,36)),i.set(u,f),t&&a.set(f,u)}}),{map:i,reverseMap:a}}function m(){if(!t){var e=v("14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",!0),i=e.map,a=e.reverseMap;t=i,r=a,n=v("6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye",!1).map}}function g(e){return m(),t.get(e)||null}function y(e){return m(),r.get(e)||null}function _(e){return m(),n.get(e)||null}var b=o.L,x=o.R,S=o.EN,w=o.ES,E=o.ET,M=o.AN,D=o.CS,A=o.B,T=o.S,R=o.ON,U=o.BN,C=o.NSM,B=o.AL,z=o.LRO,L=o.RLO,P=o.LRE,j=o.RLE,O=o.PDF,k=o.LRI,I=o.RLI,F=o.FSI,N=o.PDI;function q(e){if(!i){var t=v("14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",!0),r=t.map;t.reverseMap.forEach(function(e,t){r.set(t,e)}),i=r}return i.get(e)||null}function W(e,t,r,n){var i=e.length;r=Math.max(0,null==r?0:+r),n=Math.min(i-1,null==n?i-1:+n);var a=[];return t.paragraphs.forEach(function(i){var o=Math.max(r,i.start),s=Math.min(n,i.end);if(o<s){for(var l=t.levels.slice(o,s+1),u=s;u>=o&&p(e[u])&d;u--)l[u]=i.level;for(var f=i.level,c=1/0,h=0;h<l.length;h++){var v=l[h];v>f&&(f=v),v<c&&(c=1|v)}for(var m=f;m>=c;m--)for(var g=0;g<l.length;g++)if(l[g]>=m){for(var y=g;g+1<l.length&&l[g+1]>=m;)g++;g>y&&a.push([y+o,g+o])}}}),a}function G(e,t,r,n){for(var i=W(e,t,r,n),a=[],o=0;o<e.length;o++)a[o]=o;return i.forEach(function(e){for(var t=e[0],r=e[1],n=a.slice(t,r+1),i=n.length;i--;)a[r-i]=n[i]}),a}return e.closingToOpeningBracket=y,e.getBidiCharType=p,e.getBidiCharTypeName=function(e){return s[p(e)]},e.getCanonicalBracket=_,e.getEmbeddingLevels=function(e,t){for(var r=new Uint32Array(e.length),n=0;n<e.length;n++)r[n]=p(e[n]);var i=new Map;function a(e,t){var n=r[e];r[e]=t,i.set(n,i.get(n)-1),n&f&&i.set(f,i.get(f)-1),i.set(t,(i.get(t)||0)+1),t&f&&i.set(f,(i.get(f)||0)+1)}for(var o=new Uint8Array(e.length),s=new Map,h=[],v=null,m=0;m<e.length;m++)v||h.push(v={start:m,end:e.length-1,level:"rtl"===t?1:"ltr"===t?0:tU(m,!1)}),r[m]&A&&(v.end=m,v=null);for(var q=j|P|L|z|l|N|O|A,W=function(e){return e+(1&e?1:2)},G=function(e){return e+(1&e?2:1)},H=0;H<h.length;H++){var $=[{_level:(v=h[H]).level,_override:0,_isolate:0}],V=void 0,X=0,Y=0,Q=0;i.clear();for(var K=v.start;K<=v.end;K++){var Z=r[K];if(V=$[$.length-1],i.set(Z,(i.get(Z)||0)+1),Z&f&&i.set(f,(i.get(f)||0)+1),Z&q)if(Z&(j|P)){o[K]=V._level;var J=(Z===j?G:W)(V._level);!(J<=125)||X||Y?!X&&Y++:$.push({_level:J,_override:0,_isolate:0})}else if(Z&(L|z)){o[K]=V._level;var ee=(Z===L?G:W)(V._level);!(ee<=125)||X||Y?!X&&Y++:$.push({_level:ee,_override:Z&L?x:b,_isolate:0})}else if(Z&l){Z&F&&(Z=1===tU(K+1,!0)?I:k),o[K]=V._level,V._override&&a(K,V._override);var et=(Z===I?G:W)(V._level);et<=125&&0===X&&0===Y?(Q++,$.push({_level:et,_override:0,_isolate:1,_isolInitIndex:K})):X++}else if(Z&N){if(X>0)X--;else if(Q>0){for(Y=0;!$[$.length-1]._isolate;)$.pop();var er=$[$.length-1]._isolInitIndex;null!=er&&(s.set(er,K),s.set(K,er)),$.pop(),Q--}V=$[$.length-1],o[K]=V._level,V._override&&a(K,V._override)}else Z&O?(0===X&&(Y>0?Y--:!V._isolate&&$.length>1&&($.pop(),V=$[$.length-1])),o[K]=V._level):Z&A&&(o[K]=v.level);else o[K]=V._level,V._override&&Z!==U&&a(K,V._override)}for(var en=[],ei=null,ea=v.start;ea<=v.end;ea++){var eo=r[ea];if(!(eo&c)){var es=o[ea],el=eo&l,eu=eo===N;ei&&es===ei._level?(ei._end=ea,ei._endsWithIsolInit=el):en.push(ei={_start:ea,_end:ea,_level:es,_startsWithPDI:eu,_endsWithIsolInit:el})}}for(var ef=[],ec=0;ec<en.length;ec++){var ed=en[ec];if(!ed._startsWithPDI||ed._startsWithPDI&&!s.has(ed._start)){for(var eh=[ei=ed],ep=void 0;ei&&ei._endsWithIsolInit&&null!=(ep=s.get(ei._end));)for(var ev=ec+1;ev<en.length;ev++)if(en[ev]._start===ep){eh.push(ei=en[ev]);break}for(var em=[],eg=0;eg<eh.length;eg++)for(var ey=eh[eg],e_=ey._start;e_<=ey._end;e_++)em.push(e_);for(var eb=o[em[0]],ex=v.level,eS=em[0]-1;eS>=0;eS--)if(!(r[eS]&c)){ex=o[eS];break}var ew=em[em.length-1],eE=o[ew],eM=v.level;if(!(r[ew]&l)){for(var eD=ew+1;eD<=v.end;eD++)if(!(r[eD]&c)){eM=o[eD];break}}ef.push({_seqIndices:em,_sosType:Math.max(ex,eb)%2?x:b,_eosType:Math.max(eM,eE)%2?x:b})}}for(var eA=0;eA<ef.length;eA++){var eT=ef[eA],eR=eT._seqIndices,eU=eT._sosType,eC=eT._eosType,eB=1&o[eR[0]]?x:b;if(i.get(C))for(var ez=0;ez<eR.length;ez++){var eL=eR[ez];if(r[eL]&C){for(var eP=eU,ej=ez-1;ej>=0;ej--)if(!(r[eR[ej]]&c)){eP=r[eR[ej]];break}a(eL,eP&(l|N)?R:eP)}}if(i.get(S))for(var eO=0;eO<eR.length;eO++){var ek=eR[eO];if(r[ek]&S)for(var eI=eO-1;eI>=-1;eI--){var eF=-1===eI?eU:r[eR[eI]];if(eF&u){eF===B&&a(ek,M);break}}}if(i.get(B))for(var eN=0;eN<eR.length;eN++){var eq=eR[eN];r[eq]&B&&a(eq,x)}if(i.get(w)||i.get(D))for(var eW=1;eW<eR.length-1;eW++){var eG=eR[eW];if(r[eG]&(w|D)){for(var eH=0,e$=0,eV=eW-1;eV>=0&&(eH=r[eR[eV]])&c;eV--);for(var eX=eW+1;eX<eR.length&&(e$=r[eR[eX]])&c;eX++);eH===e$&&(r[eG]===w?eH===S:eH&(S|M))&&a(eG,eH)}}if(i.get(S)){for(var eY=0;eY<eR.length;eY++)if(r[eR[eY]]&S){for(var eQ=eY-1;eQ>=0&&r[eR[eQ]]&(E|c);eQ--)a(eR[eQ],S);for(eY++;eY<eR.length&&r[eR[eY]]&(E|c|S);eY++)r[eR[eY]]!==S&&a(eR[eY],S)}}if(i.get(E)||i.get(w)||i.get(D))for(var eK=0;eK<eR.length;eK++){var eZ=eR[eK];if(r[eZ]&(E|w|D)){a(eZ,R);for(var eJ=eK-1;eJ>=0&&r[eR[eJ]]&c;eJ--)a(eR[eJ],R);for(var e1=eK+1;e1<eR.length&&r[eR[e1]]&c;e1++)a(eR[e1],R)}}if(i.get(S))for(var e0=0,e2=eU;e0<eR.length;e0++){var e3=eR[e0],e4=r[e3];e4&S?e2===b&&a(e3,b):e4&u&&(e2=e4)}if(i.get(f)){for(var e5=x|S|M,e6=e5|b,e8=[],e7=[],e9=0;e9<eR.length;e9++)if(r[eR[e9]]&f){var te=e[eR[e9]],tt=void 0;if(null!==g(te))if(e7.length<63)e7.push({char:te,seqIndex:e9});else break;else if(null!==(tt=y(te)))for(var tr=e7.length-1;tr>=0;tr--){var tn=e7[tr].char;if(tn===tt||tn===y(_(te))||g(_(tn))===te){e8.push([e7[tr].seqIndex,e9]),e7.length=tr;break}}}e8.sort(function(e,t){return e[0]-t[0]});for(var ti=0;ti<e8.length;ti++){for(var ta=e8[ti],to=ta[0],ts=ta[1],tl=!1,tu=0,tf=to+1;tf<ts;tf++){var tc=eR[tf];if(r[tc]&e6){tl=!0;var td=r[tc]&e5?x:b;if(td===eB){tu=td;break}}}if(tl&&!tu){tu=eU;for(var th=to-1;th>=0;th--){var tp=eR[th];if(r[tp]&e6){var tv=r[tp]&e5?x:b;tu=tv!==eB?tv:eB;break}}}if(tu){if(r[eR[to]]=r[eR[ts]]=tu,tu!==eB){for(var tm=to+1;tm<eR.length;tm++)if(!(r[eR[tm]]&c)){p(e[eR[tm]])&C&&(r[eR[tm]]=tu);break}}if(tu!==eB){for(var tg=ts+1;tg<eR.length;tg++)if(!(r[eR[tg]]&c)){p(e[eR[tg]])&C&&(r[eR[tg]]=tu);break}}}}for(var ty=0;ty<eR.length;ty++)if(r[eR[ty]]&f){for(var t_=ty,tb=ty,tx=eU,tS=ty-1;tS>=0;tS--)if(r[eR[tS]]&c)t_=tS;else{tx=r[eR[tS]]&e5?x:b;break}for(var tw=eC,tE=ty+1;tE<eR.length;tE++)if(r[eR[tE]]&(f|c))tb=tE;else{tw=r[eR[tE]]&e5?x:b;break}for(var tM=t_;tM<=tb;tM++)r[eR[tM]]=tx===tw?tx:eB;ty=tb}}}for(var tD=v.start;tD<=v.end;tD++){var tA=o[tD],tT=r[tD];if(1&tA?tT&(b|S|M)&&o[tD]++:tT&x?o[tD]++:tT&(M|S)&&(o[tD]+=2),tT&c&&(o[tD]=0===tD?v.level:o[tD-1]),tD===v.end||p(e[tD])&(T|A))for(var tR=tD;tR>=0&&p(e[tR])&d;tR--)o[tR]=v.level}}return{levels:o,paragraphs:h};function tU(t,n){for(var i=t;i<e.length;i++){var a=r[i];if(a&(x|B))return 1;if(a&(A|b)||n&&a===N)break;if(a&l){var o=function(t){for(var n=1,i=t+1;i<e.length;i++){var a=r[i];if(a&A)break;if(a&N){if(0==--n)return i}else a&l&&n++}return -1}(i);i=-1===o?e.length:o}}return 0}},e.getMirroredCharacter=q,e.getMirroredCharactersMap=function(e,t,r,n){var i=e.length;r=Math.max(0,null==r?0:+r),n=Math.min(i-1,null==n?i-1:+n);for(var a=new Map,o=r;o<=n;o++)if(1&t[o]){var s=q(e[o]);null!==s&&a.set(o,s)}return a},e.getReorderSegments=W,e.getReorderedIndices=G,e.getReorderedString=function(e,t,r,n){var i=G(e,t,r,n),a=[].concat(e);return i.forEach(function(r,n){a[n]=(1&t.levels[r]?q(e[r]):null)||e[r]}),a.join("")},e.openingToClosingBracket=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},7771:(e,t,r)=>{"use strict";r.d(t,{Do:()=>a,Fh:()=>h});var n=r(7548),i=r(5339);let a=/\bvoid\s+main\s*\(\s*\)\s*{/g;function o(e){return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(e,t){let r=n.ShaderChunk[t];return r?o(r):e})}let s=[];for(let e=0;e<256;e++)s[e]=(e<16?"0":"")+e.toString(16);let l=Object.assign||function(){let e=arguments[0];for(let t=1,r=arguments.length;t<r;t++){let r=arguments[t];if(r)for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},u=Date.now(),f=new WeakMap,c=new Map,d=1e10;function h(e,t){let r=function(e){let t=JSON.stringify(e,v),r=g.get(t);return null==r&&g.set(t,r=++m),r}(t),n=f.get(e);if(n||f.set(e,n=Object.create(null)),n[r])return new n[r];let a=`_onBeforeCompile${r}`,y=function(n,i){e.onBeforeCompile.call(this,n,i);let s=this.customProgramCacheKey()+"|"+n.vertexShader+"|"+n.fragmentShader,f=c[s];if(!f){let e=function(e,{vertexShader:t,fragmentShader:r},n,i){let{vertexDefs:a,vertexMainIntro:s,vertexMainOutro:l,vertexTransform:u,fragmentDefs:f,fragmentMainIntro:c,fragmentMainOutro:d,fragmentColorTransform:h,customRewriter:v,timeUniform:m}=n;if(a=a||"",s=s||"",l=l||"",f=f||"",c=c||"",d=d||"",(u||v)&&(t=o(t)),(h||v)&&(r=o(r=r.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"))),v){let e=v({vertexShader:t,fragmentShader:r});t=e.vertexShader,r=e.fragmentShader}if(h){let e=[];r=r.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,t=>(e.push(t),"")),d=`${h}
${e.join("\n")}
${d}`}if(m){let e=`
uniform float ${m};
`;a=e+a,f=e+f}return u&&(t=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${t}
`,a=`${a}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${u}
}
`,s=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${s}
`,t=t.replace(/\b(position|normal|uv)\b/g,(e,t,r,n)=>/\battribute\s+vec[23]\s+$/.test(n.substr(0,r))?t:`troika_${t}_${i}`),e.map&&e.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),{vertexShader:t=p(t,i,a,s,l),fragmentShader:r=p(r,i,f,c,d)}}(this,n,t,r);f=c[s]=e}n.vertexShader=f.vertexShader,n.fragmentShader=f.fragmentShader,l(n.uniforms,this.uniforms),t.timeUniform&&(n.uniforms[t.timeUniform]={get value(){return Date.now()-u}}),this[a]&&this[a](n)},_=function(){return b(t.chained?e:e.clone())},b=function(n){let i=Object.create(n,x);return Object.defineProperty(i,"baseMaterial",{value:e}),Object.defineProperty(i,"id",{value:d++}),i.uuid=function(){let e=0xffffffff*Math.random()|0,t=0xffffffff*Math.random()|0,r=0xffffffff*Math.random()|0,n=0xffffffff*Math.random()|0;return(s[255&e]+s[e>>8&255]+s[e>>16&255]+s[e>>24&255]+"-"+s[255&t]+s[t>>8&255]+"-"+s[t>>16&15|64]+s[t>>24&255]+"-"+s[63&r|128]+s[r>>8&255]+"-"+s[r>>16&255]+s[r>>24&255]+s[255&n]+s[n>>8&255]+s[n>>16&255]+s[n>>24&255]).toUpperCase()}(),i.uniforms=l({},n.uniforms,t.uniforms),i.defines=l({},n.defines,t.defines),i.defines[`TROIKA_DERIVED_MATERIAL_${r}`]="",i.extensions=l({},n.extensions,t.extensions),i._listeners=void 0,i},x={constructor:{value:_},isDerivedMaterial:{value:!0},type:{get:()=>e.type,set:t=>{e.type=t}},isDerivedFrom:{writable:!0,configurable:!0,value:function(e){let t=this.baseMaterial;return e===t||t.isDerivedMaterial&&t.isDerivedFrom(e)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return e.customProgramCacheKey()+"|"+r}},onBeforeCompile:{get:()=>y,set(e){this[a]=e}},copy:{writable:!0,configurable:!0,value:function(t){return e.copy.call(this,t),e.isShaderMaterial||e.isDerivedMaterial||(l(this.extensions,t.extensions),l(this.defines,t.defines),l(this.uniforms,i.LlO.clone(t.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){return b(new e.constructor).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let r=this._depthMaterial;return r||((r=this._depthMaterial=h(e.isDerivedMaterial?e.getDepthMaterial():new i.CSG({depthPacking:i.N5j}),t)).defines.IS_DEPTH_MATERIAL="",r.uniforms=this.uniforms),r}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let r=this._distanceMaterial;return r||((r=this._distanceMaterial=h(e.isDerivedMaterial?e.getDistanceMaterial():new i.aVO,t)).defines.IS_DISTANCE_MATERIAL="",r.uniforms=this.uniforms),r}},dispose:{writable:!0,configurable:!0,value(){let{_depthMaterial:t,_distanceMaterial:r}=this;t&&t.dispose(),r&&r.dispose(),e.dispose.call(this)}}};return n[r]=_,new _}function p(e,t,r,n,i){return(n||i||r)&&(e=e.replace(a,`
${r}
void troikaOrigMain${t}() {`)+`
void main() {
  ${n}
  troikaOrigMain${t}();
  ${i}
}`),e}function v(e,t){return"uniforms"===e?void 0:"function"==typeof t?t.toString():t}let m=0,g=new Map,y=`
uniform vec3 pointA;
uniform vec3 controlA;
uniform vec3 controlB;
uniform vec3 pointB;
uniform float radius;
varying float bezierT;

vec3 cubicBezier(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  float b0 = t2 * t2 * t2;
  float b1 = 3.0 * t * t2 * t2;
  float b2 = 3.0 * t * t * t2;
  float b3 = t * t * t;
  return b0 * p1 + b1 * c1 + b2 * c2 + b3 * p2;
}

vec3 cubicBezierDerivative(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  return -3.0 * p1 * t2 * t2 +
    c1 * (3.0 * t2 * t2 - 6.0 * t2 * t) +
    c2 * (6.0 * t2 * t - 3.0 * t * t) +
    3.0 * p2 * t * t;
}
`,_=`
float t = position.y;
bezierT = t;
vec3 bezierCenterPos = cubicBezier(pointA, controlA, controlB, pointB, t);
vec3 bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t));

// Make "sideways" always perpendicular to the camera ray; this ensures that any twists
// in the cylinder occur where you won't see them: 
vec3 viewDirection = normalMatrix * vec3(0.0, 0.0, 1.0);
if (bezierDir == viewDirection) {
  bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t == 1.0 ? t - 0.0001 : t + 0.0001));
}
vec3 sideways = normalize(cross(bezierDir, viewDirection));
vec3 upish = normalize(cross(sideways, bezierDir));

// Build a matrix for transforming this disc in the cylinder:
mat4 discTx;
discTx[0].xyz = sideways * radius;
discTx[1].xyz = bezierDir * radius;
discTx[2].xyz = upish * radius;
discTx[3].xyz = bezierCenterPos;
discTx[3][3] = 1.0;

// Apply transform, ignoring original y
position = (discTx * vec4(position.x, 0.0, position.z, 1.0)).xyz;
normal = normalize(mat3(discTx) * normal);
`,b=`
uniform vec3 dashing;
varying float bezierT;
`,x=`
if (dashing.x + dashing.y > 0.0) {
  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);
  if (dashFrac > dashing.x) {
    discard;
  }
}
`,S=null,w=new i._4j({color:0xffffff,side:i.$EB});class E extends i.eaF{static getGeometry(){return S||(S=new i.Ho_(1,1,1,6,64).translate(0,.5,0))}constructor(){super(E.getGeometry(),w),this.pointA=new i.Pq0,this.controlA=new i.Pq0,this.controlB=new i.Pq0,this.pointB=new i.Pq0,this.radius=.01,this.dashArray=new i.I9Y,this.dashOffset=0,this.frustumCulled=!1}get material(){let e=this._derivedMaterial,t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=w.clone());return e&&e.baseMaterial===t||(e=this._derivedMaterial=h(t,{chained:!0,uniforms:{pointA:{value:new i.Pq0},controlA:{value:new i.Pq0},controlB:{value:new i.Pq0},pointB:{value:new i.Pq0},radius:{value:.01},dashing:{value:new i.Pq0}},vertexDefs:y,vertexTransform:_,fragmentDefs:b,fragmentMainIntro:x}),t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),e.dispose()})),e}set material(e){this._baseMaterial=e}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(e){}onBeforeRender(){let{uniforms:e}=this.material,{pointA:t,controlA:r,controlB:n,pointB:i,radius:a,dashArray:o,dashOffset:s}=this;e.pointA.value.copy(t),e.controlA.value.copy(r),e.controlB.value.copy(n),e.pointB.value.copy(i),e.radius.value=a,e.dashing.value.set(o.x,o.y,s||0)}raycast(){}}},8587:(e,t,r)=>{"use strict";r.d(t,{r:()=>n});let n=parseInt(r(5339).sPf.replace(/\D+/g,""))},8661:(e,t,r)=>{"use strict";e.exports=r(5688).style},9625:(e,t,r)=>{"use strict";r.d(t,{A:()=>u});var n=r(2115),i=r(3388),a=r(5339),o=r(8587);class s extends a.BKk{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${o.r>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}let l=e=>new a.Pq0().setFromSpherical(new a.YHV(e,Math.acos(1-2*Math.random()),2*Math.random()*Math.PI)),u=n.forwardRef(({radius:e=100,depth:t=50,count:r=5e3,saturation:o=0,factor:u=4,fade:f=!1,speed:c=1},d)=>{let h=n.useRef(null),[p,v,m]=n.useMemo(()=>{let n=[],i=[],s=Array.from({length:r},()=>(.5+.5*Math.random())*u),f=new a.Q1f,c=e+t,d=t/r;for(let e=0;e<r;e++)c-=d*Math.random(),n.push(...l(c).toArray()),f.setHSL(e/r,o,.9),i.push(f.r,f.g,f.b);return[new Float32Array(n),new Float32Array(i),new Float32Array(s)]},[r,t,u,e,o]);(0,i.D)(e=>h.current&&(h.current.uniforms.time.value=e.clock.elapsedTime*c));let[g]=n.useState(()=>new s);return n.createElement("points",{ref:d},n.createElement("bufferGeometry",null,n.createElement("bufferAttribute",{attach:"attributes-position",args:[p,3]}),n.createElement("bufferAttribute",{attach:"attributes-color",args:[v,3]}),n.createElement("bufferAttribute",{attach:"attributes-size",args:[m,1]})),n.createElement("primitive",{ref:h,object:g,attach:"material",blending:a.EZo,"uniforms-fade-value":f,depthWrite:!1,transparent:!0,vertexColors:!0}))})},9862:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return n}});let n=r(8140)._(r(2115)).default.createContext(null)},9905:(e,t,r)=>{"use strict";function n(){var e=Object.create(null);function t(e,t){var r=void 0;self.troikaDefine=function(e){return r=e};var n=URL.createObjectURL(new Blob(["/** "+e.replace(/\*/g,"")+" **/\n\ntroikaDefine(\n"+t+"\n)"],{type:"application/javascript"}));try{importScripts(n)}catch(e){console.error(e)}return URL.revokeObjectURL(n),delete self.troikaDefine,r}self.addEventListener("message",function(r){var n=r.data,i=n.messageId,a=n.action,o=n.data;try{"registerModule"===a&&function r(n,i){var a=n.id,o=n.name,s=n.dependencies;void 0===s&&(s=[]);var l=n.init;void 0===l&&(l=function(){});var u=n.getTransferables;if(void 0===u&&(u=null),!e[a])try{s=s.map(function(t){return t&&t.isWorkerModule&&(r(t,function(e){if(e instanceof Error)throw e}),t=e[t.id].value),t}),l=t("<"+o+">.init",l),u&&(u=t("<"+o+">.getTransferables",u));var f=null;"function"==typeof l?f=l.apply(void 0,s):console.error("worker module init function failed to rehydrate"),e[a]={id:a,value:f,getTransferables:u},i(f)}catch(e){e&&e.noLog||console.error(e),i(e)}}(o,function(e){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:{isCallable:"function"==typeof e}})}),"callModule"===a&&function(t,r){var n,i=t.id,a=t.args;e[i]&&"function"==typeof e[i].value||r(Error("Worker module "+i+": not found or its 'init' did not return a function"));try{var o=(n=e[i]).value.apply(n,a);o&&"function"==typeof o.then?o.then(s,function(e){return r(e instanceof Error?e:Error(""+e))}):s(o)}catch(e){r(e)}function s(t){try{var n=e[i].getTransferables&&e[i].getTransferables(t);n&&Array.isArray(n)&&n.length||(n=void 0),r(t,n)}catch(e){console.error(e),r(e)}}}(o,function(e,t){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:e},t||void 0)})}catch(e){postMessage({messageId:i,success:!1,error:e.stack})}})}r.d(t,{Qw:()=>c,kl:()=>function e(t){if((!t||"function"!=typeof t.init)&&!s)throw Error("requires `options.init` function");var r,n=t.dependencies,o=t.init,l=t.getTransferables,f=t.workerId,c=((r=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return r._getInitResult().then(function(t){if("function"==typeof t)return t.apply(void 0,e);throw Error("Worker module function was called but `init` did not return a callable function")})})._getInitResult=function(){var e=t.dependencies,n=t.init,i=Promise.all(e=Array.isArray(e)?e.map(function(e){return e&&(e=e.onMainThread||e)._getInitResult&&(e=e._getInitResult()),e}):[]).then(function(e){return n.apply(null,e)});return r._getInitResult=function(){return i},i},r);null==f&&(f="#default");var p="workerModule"+ ++a,v=t.name||p,m=null;function g(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];if(!i())return c.apply(void 0,e);if(!m){m=h(f,"registerModule",g.workerModuleData);var r=function(){m=null,u[f].delete(r)};(u[f]||(u[f]=new Set)).add(r)}return m.then(function(t){if(t.isCallable)return h(f,"callModule",{id:p,args:e});throw Error("Worker module function was called but `init` did not return a callable function")})}return n=n&&n.map(function(t){return"function"!=typeof t||t.workerModuleData||(s=!0,t=e({workerId:f,name:"<"+v+"> function dependency: "+t.name,init:"function(){return (\n"+d(t)+"\n)}"}),s=!1),t&&t.workerModuleData&&(t=t.workerModuleData),t}),g.workerModuleData={isWorkerModule:!0,id:p,name:v,dependencies:n,init:d(o),getTransferables:l&&d(l)},g.onMainThread=c,g}}),r(5704);var i=function(){var e=!1;if("undefined"!=typeof window&&void 0!==window.document)try{new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"}))).terminate(),e=!0}catch(e){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+e.message+"]")}return i=function(){return e},e},a=0,o=0,s=!1,l=Object.create(null),u=Object.create(null),f=Object.create(null);function c(e){u[e]&&u[e].forEach(function(e){e()}),l[e]&&(l[e].terminate(),delete l[e])}function d(e){var t=e.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function h(e,t,r){return new Promise(function(i,a){var s=++o;f[s]=function(e){e.success?i(e.result):a(Error("Error in worker "+t+" call: "+e.error))},(function(e){var t=l[e];if(!t){var r=d(n);(t=l[e]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+e.replace(/\*/g,"")+" **/\n\n;("+r+")()"],{type:"application/javascript"})))).onmessage=function(e){var t=e.data,r=t.messageId,n=f[r];if(!n)throw Error("WorkerModule response with empty or unknown messageId");delete f[r],n(t)}}return t})(e).postMessage({messageId:s,action:t,data:r})})}}}]);