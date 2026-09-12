type RendererOptions = { canvas: HTMLCanvasElement };

export function createRenderer({ canvas }: RendererOptions) {
  const ctx = canvas.getContext("2d");
  let raf = 0;
  let disposed = false;
  let t = 0;

  const resize = () => {
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(canvas.clientWidth, 1);
    const height = Math.max(canvas.clientHeight, 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    if (disposed || !ctx) return;
    t += 0.0045;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w * 0.5;
    const cy = h * 0.52;
    const size = Math.min(w, h);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    // Soft ambient glow makes the renderer read against the black hero.
    const ambient = ctx.createRadialGradient(cx, cy, size * 0.03, cx, cy, size * 0.52);
    ambient.addColorStop(0, "rgba(255,255,255,0.13)");
    ambient.addColorStop(0.16, "rgba(220,225,235,0.075)");
    ambient.addColorStop(0.42, "rgba(150,155,165,0.035)");
    ambient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, w, h);

    // Rotating accretion disk: many thin elliptical streams create motion.
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.16 + Math.sin(t * 0.45) * 0.018);
    ctx.scale(1, 0.31);

    for (let i = 0; i < 170; i++) {
      const p = i / 170;
      const radius = size * (0.09 + p * 0.39);
      const wobble = Math.sin(t * 1.8 + i * 0.37) * size * 0.0035;
      const alpha = 0.025 + (1 - p) * 0.055;
      ctx.beginPath();
      ctx.ellipse(wobble, 0, radius, radius * (0.46 + p * 0.08), 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(235,238,242,${alpha})`;
      ctx.lineWidth = p < 0.25 ? 1.4 : 0.8;
      ctx.stroke();
    }

    // Bright, broken bands give the disk a photographic light-ring quality.
    for (let i = 0; i < 48; i++) {
      const angle = i * 0.48 + t * 0.9;
      const radius = size * (0.12 + (i % 13) * 0.018);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.58;
      const length = size * (0.025 + (i % 5) * 0.009);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length * 0.42);
      ctx.strokeStyle = `rgba(255,255,255,${0.10 + (i % 6) * 0.025})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // Bright photon ring surrounding the event horizon.
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.16);
    ctx.scale(1, 0.31);
    const ring = ctx.createRadialGradient(0, 0, size * 0.105, 0, 0, size * 0.15);
    ring.addColorStop(0, "rgba(0,0,0,0)");
    ring.addColorStop(0.58, "rgba(255,255,255,0.08)");
    ring.addColorStop(0.72, "rgba(255,255,255,0.30)");
    ring.addColorStop(0.80, "rgba(225,230,235,0.10)");
    ring.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = ring;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // The black event horizon remains the visual anchor.
    const hole = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.125);
    hole.addColorStop(0, "#000000");
    hole.addColorStop(0.82, "#000000");
    hole.addColorStop(0.94, "rgba(0,0,0,0.96)");
    hole.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = hole;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.13, 0, Math.PI * 2);
    ctx.fill();

    // Sparse stars / particles, with a few brighter points near the disk.
    for (let i = 0; i < 180; i++) {
      const a = i * 2.399963 + t * (0.12 + (i % 3) * 0.025);
      const r = ((i * 17) % 100) / 100 * size * 0.48;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.56;
      const alpha = 0.08 + (i % 7) * 0.014;
      const dot = i % 23 === 0 ? 1.6 : i % 7 === 0 ? 1.1 : 0.7;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(x, y, dot, dot);
    }

    raf = requestAnimationFrame(draw);
  };

  const ready = new Promise<void>((resolve) => {
    resize();
    draw();
    resolve();
  });

  window.addEventListener("resize", resize);

  return {
    ready,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    },
  };
}
