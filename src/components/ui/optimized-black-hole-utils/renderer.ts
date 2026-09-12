type RendererOptions={canvas:HTMLCanvasElement};
export function createRenderer({canvas}:RendererOptions){
  const ctx=canvas.getContext('2d'); let raf=0; let disposed=false; let t=0;
  const resize=()=>{const d=Math.min(devicePixelRatio,2);canvas.width=canvas.clientWidth*d;canvas.height=canvas.clientHeight*d;ctx?.setTransform(d,0,0,d,0,0)};
  const draw=()=>{if(disposed||!ctx)return; t+=.006; const w=canvas.clientWidth,h=canvas.clientHeight,cx=w/2,cy=h/2; ctx.clearRect(0,0,w,h); ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);
    const g=ctx.createRadialGradient(cx,cy,Math.min(w,h)*.025,cx,cy,Math.min(w,h)*.48);g.addColorStop(0,'rgba(255,255,255,.05)');g.addColorStop(.18,'rgba(255,255,255,.025)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(t*.22);ctx.scale(1,.34);
    for(let i=0;i<90;i++){const p=i/90,rx=Math.min(w,h)*(.10+p*.36),a=.025*(1-p)+.004;ctx.beginPath();ctx.ellipse(0,0,rx,rx*.55,0,0,Math.PI*2);ctx.strokeStyle=`rgba(255,255,255,${a})`;ctx.lineWidth=1;ctx.stroke()}
    ctx.restore();
    const hole=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*.11);hole.addColorStop(0,'#000');hole.addColorStop(.82,'#000');hole.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=hole;ctx.beginPath();ctx.arc(cx,cy,Math.min(w,h)*.13,0,Math.PI*2);ctx.fill();
    for(let i=0;i<130;i++){const a=i*2.399+t*.3,r=(i%17)/17*Math.min(w,h)*.45,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.45;ctx.fillStyle=`rgba(255,255,255,${.04+(i%5)*.012})`;ctx.fillRect(x,y,1,1)}
    raf=requestAnimationFrame(draw)};
  const ready=new Promise<void>(resolve=>{resize();draw();resolve()}); window.addEventListener('resize',resize); return {ready,dispose:()=>{disposed=true;cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}};
}
