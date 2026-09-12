import { useEffect, useState } from "react";
import Lenis from "lenis";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Mail,
  Menu,
  Radio,
  Rocket,
  Sparkles,
  X,
} from "lucide-react";
import BlackHole from "@/components/ui/optimized-black-hole";

const projects = [
  {
    n: "01",
    title: "AI / PROMPT LAB",
    type: "EXPERIMENTS",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    text: "Interfaces, prompts, agents and strange ideas that deserve a prototype.",
  },
  {
    n: "02",
    title: "WEB SYSTEMS",
    type: "FULL STACK",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=85",
    text: "Product-minded web work: useful systems, fast interfaces and obsessive details.",
  },
  {
    n: "03",
    title: "CODE BLOODED",
    type: "COMMUNITY",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85",
    text: "A hackathon community for builders, teammates, experiments and shipping.",
  },
];

const socials = {
  github: "https://github.com/Aryanrai-007",
  linkedin: "https://www.linkedin.com/in/aryanrai007",
  email: "mailto:raiaryaneng@gmail.com",
};

export default function App() {
  const [menu, setMenu] = useState(false);
  const [online, setOnline] = useState(false);
  const [event, setEvent] = useState("scanning github telemetry");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/Aryanrai-007/events/public")
      .then((response) => (response.ok ? response.json() : []))
      .then((events) => {
        setOnline(true);
        setEvent(events?.[0]?.type?.replace("Event", "") || "public activity detected");
      })
      .catch(() => setEvent("telemetry unavailable"));
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-zinc-100 selection:bg-white selection:text-black">
      <div className="grain" />
      <div className="fixed left-0 top-0 z-[70] h-[2px] bg-white transition-[width] duration-150" style={{ width: `${progress}%` }} />

      <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-black/60 px-5 backdrop-blur-xl md:px-10">
        <button onClick={() => go("top")} className="display text-sm font-bold tracking-[-0.03em]">
          AR<span className="text-zinc-600">/</span>007
        </button>
        <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-zinc-400 md:flex">
          <button onClick={() => go("about")} className="transition hover:text-white">About</button>
          <button onClick={() => go("work")} className="transition hover:text-white">Work</button>
          <button onClick={() => go("community")} className="transition hover:text-white">Code Blooded</button>
          <button onClick={() => go("contact")} className="transition hover:text-white">Contact</button>
        </div>
        <button aria-label="Toggle menu" onClick={() => setMenu((value) => !value)} className="rounded-full border border-white/15 p-2 md:hidden">
          {menu ? <X size={16} /> : <Menu size={16} />}
        </button>
        {menu && (
          <div className="absolute right-4 top-16 flex w-48 flex-col gap-4 border border-white/10 bg-[#0b0b0b] p-5 text-xs uppercase tracking-widest shadow-2xl">
            <button onClick={() => go("about")}>About</button>
            <button onClick={() => go("work")}>Work</button>
            <button onClick={() => go("community")}>Community</button>
            <button onClick={() => go("contact")}>Contact</button>
          </div>
        )}
      </nav>

      <main id="top">
        <section className="grid-bg relative min-h-screen overflow-hidden pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(255,255,255,.07),transparent_28%)]" />
          <div className="absolute right-[-18vw] top-[9vh] h-[78vh] w-[78vh] opacity-90 md:right-[-8vw]">
            <BlackHole />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1500px] flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
            <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Delhi / India <span className="text-zinc-700">·</span> orbiting the internet
            </div>
            <h1 className="display max-w-6xl text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.8] tracking-[-0.075em]">
              ARYAN<br /><span className="text-zinc-500">RAI.</span>
            </h1>
            <div className="mt-10 grid gap-8 border-t border-white/10 pt-6 md:grid-cols-[1fr_1fr_180px] md:items-end">
              <p className="max-w-xl text-lg leading-7 text-zinc-300 md:text-xl">
                Full-stack developer, AI prompt engineer, writer, blogger, leader and founder of <span className="text-white">Code Blooded</span>. I like software with a point of view.
              </p>
              <p className="mono text-xs leading-6 text-zinc-500">I BUILD / I WRITE / I ORGANIZE<br />I SHIP / I BREAK / I LEARN<br />CURRENTLY: CSE · 2025—2029</p>
              <button onClick={() => go("about")} className="group flex items-center gap-3 justify-self-start text-xs uppercase tracking-[0.18em] md:justify-self-end">
                Enter orbit <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-44">
          <div className="grid gap-16 md:grid-cols-[0.7fr_1.3fr]">
            <div className="reveal">
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">01 / About the human</p>
              <div className="mt-10 overflow-hidden border border-white/10 bg-zinc-950">
                <img src="https://github.com/Aryanrai-007.png" alt="Aryan Rai" className="aspect-[4/5] w-full object-cover grayscale" />
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <span>ARYAN RAI</span><span>REAL PERSON / NO GENERATED HEAD</span>
                </div>
              </div>
            </div>
            <div className="reveal flex flex-col justify-end">
              <h2 className="display max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.055em] md:text-7xl">I make digital things, then obsess over the tiny things nobody asked me to obsess over.</h2>
              <div className="mt-12 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-2">
                <p className="text-sm leading-7 text-zinc-400">CSE undergraduate at Inderprastha Engineering College. My work sits somewhere between engineering, design, AI and community building.</p>
                <p className="mono text-xs leading-6 text-zinc-500">STACK / WEB / AI / WRITING<br />INTERESTS / SPACE / SYSTEMS / PEOPLE<br />MINDSET / CURIOUS OVER CLEVER</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-zinc-950/50">
          <div className="mx-auto grid max-w-[1500px] md:grid-cols-3">
            {[
              ["01", "FULL STACK", "Interfaces on the surface. Systems underneath. Comfortable moving between both."],
              ["02", "AI / PROMPTS", "Exploring how language models become useful tools instead of decorative chat boxes."],
              ["03", "LEADERSHIP", "Building rooms where people meet, learn, compete and actually ship something."],
            ].map(([n, title, text], index) => (
              <div key={n} className={`reveal p-7 md:p-10 ${index < 2 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""}`}>
                <span className="mono text-xs text-zinc-600">{n}</span>
                <h3 className="display mt-20 text-3xl tracking-tight">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div><p className="mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">02 / Selected orbit</p><h2 className="display mt-4 text-5xl font-medium tracking-[-0.05em] md:text-8xl">WORK<span className="text-zinc-700">.</span></h2></div>
            <a href={socials.github} target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white md:flex">All on GitHub <ArrowUpRight size={15} /></a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <a key={project.n} href={socials.github} target="_blank" rel="noreferrer" className="project-card reveal group overflow-hidden border border-white/10 bg-[#090909]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={project.image} alt="" className="h-full w-full object-cover grayscale opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
                  <span className="mono absolute left-4 top-4 text-xs text-white/60">{project.n}</span>
                  <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400">{project.type}</span>
                </div>
                <div className="p-5"><div className="flex items-center justify-between"><h3 className="display text-xl tracking-tight">{project.title}</h3><ArrowUpRight size={17} className="text-zinc-600 transition group-hover:text-white" /></div><p className="mt-3 text-sm leading-6 text-zinc-500">{project.text}</p></div>
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-zinc-700">Visual placeholders for v1. Real project screenshots, case studies and destinations come next.</p>
        </section>

        <section className="grid-bg relative overflow-hidden border-y border-white/10 py-28 md:py-40">
          <div className="mx-auto max-w-[1500px] px-5 md:px-10">
            <div className="reveal grid gap-12 md:grid-cols-[1fr_0.55fr] md:items-center">
              <div><p className="mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">03 / Live telemetry</p><h2 className="display mt-5 text-5xl font-medium leading-none tracking-[-0.06em] md:text-8xl">CODE<br />IN MOTION.</h2><p className="mt-8 max-w-xl text-lg leading-7 text-zinc-400">A small living window into the public side of my GitHub. No fake counters. The browser asks GitHub what it can see.</p></div>
              <div className="border border-white/10 bg-black/80 p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-5"><div className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${online ? "bg-white" : "bg-zinc-700"}`} /><span className="mono text-xs uppercase tracking-widest">{online ? "ONLINE" : "CONNECTING"}</span></div><Radio size={18} className="text-zinc-500" /></div>
                <div className="py-10"><p className="mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Latest public signal</p><p className="mt-3 text-2xl tracking-tight">{event}</p></div>
                <a href={socials.github} target="_blank" rel="noreferrer" className="flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-widest text-zinc-400 hover:text-white">open github <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
          <div className="reveal overflow-hidden border border-white/10 bg-[#0a0a0a]
          "><div className="grid md:grid-cols-[1.1fr_0.9fr]"><div className="relative min-h-[440px] overflow-hidden p-7 md:p-12"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" /><div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" /><div className="relative z-10"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white text-black"><Rocket size={24} /></div><p className="mono mt-24 text-[10px] uppercase tracking-[0.3em] text-zinc-600">04 / The community</p><h2 className="display mt-5 text-5xl font-medium tracking-[-0.055em] md:text-7xl">CODE<br />BLOODED<span className="text-zinc-600">.</span></h2></div></div><div className="flex flex-col justify-between border-t border-white/10 p-7 md:border-l md:border-t-0 md:p-12"><div><Sparkles className="mb-8" size={20} /><p className="text-2xl leading-9 tracking-tight text-zinc-200">Hackathons are more fun when the room is full of people who are slightly obsessed with making things.</p><p className="mt-7 text-sm leading-6 text-zinc-500">Code Blooded is my hackathon community — a place for builders, teammates, experiments and the beautiful chaos between idea and demo day.</p></div><a href={socials.github} target="_blank" rel="noreferrer" className="mt-12 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-widest">join / discover <ArrowUpRight size={17} /></a></div></div></div>
        </section>

        <section id="contact" className="min-h-[80vh] border-t border-white/10 px-5 py-28 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1500px]"><p className="mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">05 / Contact from Earth</p><div className="mt-16 flex flex-col justify-between gap-16 md:flex-row md:items-end"><h2 className="display text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.82] tracking-[-0.08em]">LET'S<br /><span className="text-zinc-600">BUILD.</span></h2><div className="max-w-md"><p className="text-lg leading-7 text-zinc-400">Have a project, hackathon, idea or unnecessarily ambitious side quest?</p><a href={socials.email} className="mt-8 flex items-center justify-between border-y border-white/10 py-5 text-sm uppercase tracking-widest hover:text-zinc-400">raiaryaneng@gmail.com <Mail size={18} /></a><div className="mt-7 flex gap-6 text-xs uppercase tracking-widest text-zinc-500"><a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a><a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></div></div></div><div className="mt-24 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-zinc-700"><span>ARYAN RAI / 007</span><span className="flex items-center gap-2"><Code2 size={12} /> built in public</span></div></div>
        </section>
      </main>
    </div>
  );
}
