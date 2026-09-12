import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const projects = [
  { name: 'Project One', url: '#', stack: ['React', 'Node.js', 'AI'], description: 'A placeholder for a real project. We will replace this with your actual work next.' },
  { name: 'Project Two', url: '#', stack: ['Next.js', 'TypeScript'], description: 'A placeholder for a real project. We will replace this with your actual work next.' },
  { name: 'Project Three', url: '#', stack: ['Python', 'AI'], description: 'A placeholder for a real project. We will replace this with your actual work next.' },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 950); return () => clearTimeout(t); }, []);

  return <>
    <div className={`loader ${loading ? '' : 'done'}`}><span>ARYAN RAI</span><b>100</b></div>

    <header className="header">
      <a className="brand" href="#home">AR<span>✦</span></a>
      <nav className={menu ? 'open' : ''}>
        <a href="#about" onClick={() => setMenu(false)}>About</a>
        <a href="#work" onClick={() => setMenu(false)}>Work</a>
        <a href="#journey" onClick={() => setMenu(false)}>Journey</a>
        <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
      </nav>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-topline"><span>Full-Stack Developer · AI Prompt Engineer</span><span>Ghaziabad / India</span></div>
        <div className="hero-content">
          <p className="kicker">I build things, write things & occasionally break things.</p>
          <h1>ARYAN<br/><em>RAI</em></h1>
          <p className="hero-copy">Full-stack developer, AI prompt engineer, writer, blogger, leader and founder of <strong>Code Blooded</strong> — a hackathon community built for people who think their best idea starts at 2 AM.</p>
          <div className="actions"><a className="pill purple" href="#work">See my work <ArrowUpRight/></a><a className="text-link" href="https://www.linkedin.com/in/aryanrai007" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight/></a></div>
        </div>
        <div className="hero-stats"><div><b>2025–29</b><span>CSE Undergraduate</span></div><div><b>01</b><span>Hackathon community</span></div><div><b>∞</b><span>Things left to build</span></div></div>
      </section>

      <section id="about" className="dark-section about">
        <div className="section-label">01 / About</div>
        <div className="two-col"><h2>Not just a<br/><em>developer.</em></h2><div><p className="big-copy">I'm a computer science undergraduate who likes turning curiosity into projects, ideas into communities, and prompts into surprisingly useful things.</p><p>I’m exploring software development, artificial intelligence, system design and the art of explaining complicated things without making everyone fall asleep.</p></div></div>
        <div className="roles"><span>Full-Stack Developer</span><span>AI Prompt Engineer</span><span>Writer</span><span>Blogger</span><span>Leader</span><span>Founder — Code Blooded</span></div>
      </section>

      <section id="work" className="work"><div className="section-label">02 / Selected work</div><div className="work-head"><h2>Things I’ve <em>built.</em></h2><p>Real projects go here. No imaginary “Netflix clone #47” unless you actually want one.</p></div><div className="projects">{projects.map((p,i)=><article className="project" key={p.name}><div className="project-num">({String(i+1).padStart(2,'0')})</div><div><h3>{p.name}</h3><p>{p.description}</p><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div></div><a href={p.url} aria-label={`Open ${p.name}`}><ArrowUpRight/></a></article>)}</div></section>

      <section id="journey" className="dark-section journey"><div className="section-label">03 / Journey</div><h2>Still <em>loading...</em></h2><div className="timeline"><div><b>2025 — Present</b><h3>Computer Science & Engineering</h3><p>Inderprastha Engineering College · B.Tech CSE</p></div><div><b>2025 — Present</b><h3>Graphic Designer</h3><p>IEEE IPEC</p></div><div><b>Now</b><h3>Building Code Blooded</h3><p>Creating a community around hackathons, builders and ambitious ideas.</p></div></div></section>

      <section id="contact" className="contact"><div className="section-label">04 / Contact</div><h2>Have an idea?<br/><em>Let’s make it real.</em></h2><a className="email" href="mailto:raiaryaneng@gmail.com">raiaryaneng@gmail.com <ArrowUpRight/></a><div className="socials"><a href="https://github.com/Aryanrai-007" target="_blank" rel="noreferrer"><Github/> GitHub</a><a href="https://www.linkedin.com/in/aryanrai007" target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href="mailto:raiaryaneng@gmail.com"><Mail/> Email</a></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Aryan Rai</span><span>Built with curiosity & questionable amounts of caffeine.</span></footer>
  </>;
}
