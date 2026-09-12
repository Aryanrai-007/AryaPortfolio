"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

/* A physically-inspired WebGL black-hole scene. The complete renderer is intentionally
   kept self-contained so the hero needs no image asset or runtime dependency. */

const RAD = Math.PI / 180;
const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}
`;
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uTime; uniform vec2 uFocus; uniform float uBright;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*noise(p);p=p*2.03+13.7;a*=.5;}return s;}
void main(){
 vec2 p=(gl_FragCoord.xy-uFocus*uRes)/uRes.y;
 float r=length(p); float a=atan(p.y,p.x);
 float diskR=0.34;
 float ring=exp(-pow((r-diskR)/0.055,2.0));
 float inner=exp(-pow((r-0.235)/0.09,2.0));
 float outer=exp(-pow((r-0.47)/0.18,2.0));
 float angle=a+uTime*(1.7+1.8*pow(max(0.0,0.52-r),1.4));
 float clouds=fbm(vec2(cos(angle),sin(angle))*(8.0+5.0*r)+vec2(uTime*.11,-uTime*.035));
 float fil=pow(clamp(clouds*.95+.12,0.0,1.0),3.0);
 float asym=0.48+0.72*clamp(cos(a-0.42),0.0,1.0);
 float gas=(ring*1.65+inner*.42+outer*.24)*(.52+1.25*fil)*asym;
 float glow=exp(-pow(max(0.0,r-.27)/.25,2.0))*.10;
 vec3 hot=vec3(1.0,.92,.78), mid=vec3(.72,.56,.38), cool=vec3(.20,.16,.13);
 float heat=clamp(1.0-(r-.18)/.48,0.0,1.0);
 vec3 col=mix(cool,mid,smoothstep(0.05,.55,heat)); col=mix(col,hot,smoothstep(.48,1.0,heat));
 col*=gas*uBright; col+=vec3(.42,.33,.24)*glow*uBright;
 float shadow=smoothstep(.205,.245,r); col*=shadow;
 float stars=step(.996,hash(floor(p*90.0)))*(.35+.65*hash(floor(p*137.0)));
 col+=vec3(.55,.58,.62)*stars*(1.0-smoothstep(.0,.72,r));
 float vignette=1.0-smoothstep(.55,1.0,r)*.7;
 col*=vignette;
 gl_FragColor=vec4(col,1.0);
}
`;

export interface BlackHoleHeroSectionProps extends React.HTMLAttributes<HTMLDivElement>{
 distance?:number; elevation?:number; azimuth?:number; orbitSpeed?:number; roll?:number; fov?:number;
 diskInner?:number; diskOuter?:number; diskThickness?:number; diskDensity?:number; brightness?:number;
 spinSpeed?:number; grain?:number; doppler?:number; hotColor?:string; midColor?:string; coolColor?:string;
 starBrightness?:number; glow?:number; exposure?:number; vignette?:number; steps?:number; resolution?:number;
 maxDpr?:number; focus?:[number,number]; scrim?:"none"|"left"|"right"|"top"|"bottom"; scrimStrength?:number;
 paused?:boolean; children?:React.ReactNode;
}

export function BlackHoleHeroSection({
 brightness=1.35, spinSpeed=.06, resolution=.78, maxDpr=1.75, focus=[.72,.46], paused=false,
 className="", children, ...rest
}:BlackHoleHeroSectionProps){
 const hostRef=useRef<HTMLDivElement|null>(null); const canvasRef=useRef<HTMLCanvasElement|null>(null);
 const cfg=useRef({brightness,spinSpeed,resolution,maxDpr,focus,paused});
 cfg.current={brightness,spinSpeed,resolution,maxDpr,focus,paused};
 useEffect(()=>{
  const host=hostRef.current, canvas=canvasRef.current; if(!host||!canvas)return;
  const gl=canvas.getContext("webgl2",{alpha:false,antialias:false,powerPreference:"high-performance"})||canvas.getContext("webgl",{alpha:false,antialias:false,powerPreference:"high-performance"});
  if(!gl){canvas.style.display="none";return;}
  const vs=gl.createShader(gl.VERTEX_SHADER), fs=gl.createShader(gl.FRAGMENT_SHADER); if(!vs||!fs)return;
  gl.shaderSource(vs,VERT);gl.compileShader(vs);gl.shaderSource(fs,FRAG);gl.compileShader(fs);
  if(!gl.getShaderParameter(vs,gl.COMPILE_STATUS)||!gl.getShaderParameter(fs,gl.COMPILE_STATUS)){console.error("blackhole shader failed",gl.getShaderInfoLog(fs));return;}
  const program=gl.createProgram();if(!program)return;gl.attachShader(program,vs);gl.attachShader(program,fs);gl.bindAttribLocation(program,0,"aPos");gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){console.error("blackhole link failed",gl.getProgramInfoLog(program));return;}
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.useProgram(program);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  const uRes=gl.getUniformLocation(program,"uRes"),uTime=gl.getUniformLocation(program,"uTime"),uFocus=gl.getUniformLocation(program,"uFocus"),uBright=gl.getUniformLocation(program,"uBright");
  let raf=0,start=performance.now(),visible=true;
  const resize=()=>{const r=host.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,cfg.current.maxDpr),w=Math.max(2,Math.round(r.width*dpr)),h=Math.max(2,Math.round(r.height*dpr));canvas.width=w;canvas.height=h;canvas.style.width=r.width+"px";canvas.style.height=r.height+"px";gl.viewport(0,0,w,h);};
  const draw=(now:number)=>{if(!visible)return;const c=cfg.current;gl.useProgram(program);gl.uniform2f(uRes!,canvas.width,canvas.height);gl.uniform1f(uTime!,c.paused?0:(now-start)/1000*c.spinSpeed*10);gl.uniform2f(uFocus!,c.focus[0],1-c.focus[1]);gl.uniform1f(uBright!,c.brightness);gl.drawArrays(gl.TRIANGLES,0,3);raf=requestAnimationFrame(draw);};
  const ro=new ResizeObserver(resize);ro.observe(host);resize();raf=requestAnimationFrame(draw);
  const io=new IntersectionObserver(e=>{visible=e[0]?.isIntersecting??true;});io.observe(host);
  return()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
 },[]);
 return <div ref={hostRef} className={`relative isolate h-full w-full overflow-hidden bg-black ${className}`} {...rest}><canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />{children?<div className="relative z-10 h-full w-full">{children}</div>:null}</div>;
}
export default BlackHoleHeroSection;
