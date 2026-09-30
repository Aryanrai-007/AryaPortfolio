import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { LiquidMetalButton, TempleNightScene } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import "./styles.css";

type SpotlightCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

function SpotlightCard({ eyebrow, title, description, children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLArticleElement>(null);

  const move = (event: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--sx", "50%");
    ref.current?.style.setProperty("--sy", "50%");
  };

  return (
    <article
      ref={ref}
      className={`spotlight-card ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="spotlight-glow" aria-hidden="true" />
      <div className="card-topline">
        <span>{eyebrow}</span>
        <span className="card-index">↗</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </article>
  );
}

function MagneticButton({ children, href = "#work", secondary = false }: { children: ReactNode; href?: string; secondary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.18;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.18;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <a
      ref={ref}
      className={`magnetic-button ${secondary ? "is-secondary" : ""}`}
      href={href}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

const projects = [
  {
    code: "01",
    type: "AI / AGENTIC",
    name: "Logicure",
    copy: "A decision layer for modern operations: sense signals, understand risk, simulate outcomes, decide, act, and learn.",
    tags: ["LangGraph", "Agents", "Risk"],
  },
  {
    code: "02",
    type: "COMPUTER VISION",
    name: "Mayavihin",
    copy: "A deepfake-detection direction built around practical verification, visual signals, and explainable output.",
    tags: ["Python", "AI", "Vision"],
  },
  {
    code: "03",
    type: "AI / OPERATIONS",
    name: "SynQro",
    copy: "An intelligent queue-management concept designed to turn waiting time into a measurable, optimizable system.",
    tags: ["AI", "Automation", "UX"],
  },
  {
    code: "04",
    type: "GEO / SPACE",
    name: "SatQueryX",
    copy: "A remote-sensing project direction focused on turning satellite data into useful, queryable insight.",
    tags: ["Remote Sensing", "Python", "Data"],
  },
];

const stack = [
  "Python", "C / C++", "TypeScript", "React", "AI Agents",
  "LangGraph", "Three.js", "Supabase", "Vercel", "GitHub",
];

function App() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <div className="scene-layer" aria-hidden="true">
        <TempleNightScene />
      </div>
      <div className="scene-wash" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Aryan Rai home">
          <span className="wordmark-mark"><i /><b /></span>
          <span>
            <strong>ARYAN RAI</strong>
            <small>AI BUILDER · DEVELOPER</small>
          </span>
        </a>

        <nav>
          <a href="#about">ABOUT</a>
          <a href="#work">WORK</a>
          <a href="#lab">LAB</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <a className="menu-dot" href="#contact" aria-label="Contact Aryan">
          <span />
          <span />
        </a>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><span className="red-dot" /> DIGITAL BUILDER / INDIA</div>
            <h1>
              I BUILD
              <span>SYSTEMS</span>
              <em>THAT MOVE.</em>
            </h1>
            <p className="hero-lede">
              I&apos;m Aryan — a developer exploring AI agents, creative interfaces,
              automation, and products that make complicated things easier to understand.
            </p>
            <div className="hero-actions">
              <MagneticButton href="#work">Explore the work</MagneticButton>
              <MagneticButton href="#about" secondary>Read the story</MagneticButton>
            </div>
          </div>

          <div className="hero-meta">
            <div>
              <span>01 / 04</span>
              <strong>BUILD → SHIP → LEARN</strong>
            </div>
            <div className="hero-scroll">SCROLL TO EXPLORE <b /></div>
          </div>
        </section>

        <section id="about" className="about section-pad">
          <div className="section-kicker">
            <span>01</span>
            <span>ABOUT / APPROACH</span>
          </div>

          <div className="about-grid">
            <div>
              <h2>CURIOUS BY DEFAULT.<br /><span>OBSESSED WITH BUILDING.</span></h2>
            </div>
            <div className="about-copy">
              <p className="lead">
                I like the space between engineering and imagination — where code becomes
                a product, an interface becomes an experience, and an idea gets a working prototype.
              </p>
              <p>
                My work moves across software, AI, automation, data, and interactive web experiences.
                I learn by shipping: small experiments become systems, systems become products,
                and the feedback loop keeps going.
              </p>
              <div className="about-facts">
                <div><strong>AI</strong><span>AGENTS + AUTOMATION</span></div>
                <div><strong>WEB</strong><span>REACT + TYPESCRIPT</span></div>
                <div><strong>3D</strong><span>WEBGL + INTERACTION</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work section-pad">
          <div className="section-heading">
            <div className="section-kicker"><span>02</span><span>SELECTED WORK</span></div>
            <p>Projects, prototypes, and systems I&apos;ve been building around real problems.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <SpotlightCard
                key={project.code}
                className="project-card"
                eyebrow={`${project.code} · ${project.type}`}
                title={project.name}
                description={project.copy}
              >
                <div className="tag-row">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section id="lab" className="lab section-pad">
          <div className="section-kicker"><span>03</span><span>THE LAB</span></div>
          <div className="lab-grid">
            <div>
              <h2>CODEBLOODED<br /><span>IS THE BUILDING GROUND.</span></h2>
              <p>
                A coding and hackathon community where ideas get tested quickly,
                teams form around problems, and prototypes become something people can actually use.
              </p>
              <MagneticButton href="#contact">Work together</MagneticButton>
            </div>

            <div className="stack-panel">
              <div className="stack-header"><span>STACK / CURRENT TOOLS</span><span>∞</span></div>
              <div className="stack-marquee">
                {stack.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="principles">
                <div><span>01</span><strong>MAKE IT REAL</strong></div>
                <div><span>02</span><strong>KEEP IT USEFUL</strong></div>
                <div><span>03</span><strong>ITERATE IN PUBLIC</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="now section-pad">
          <div className="now-card">
            <div>
              <div className="section-kicker"><span>04</span><span>RIGHT NOW</span></div>
              <h2>BUILDING THE<br /><span>NEXT THING.</span></h2>
            </div>
            <div className="now-copy">
              <p>
                AI agents, resilient products, better interfaces, and experiments
                that are just weird enough to be interesting.
              </p>
              <div className="signal"><i /> OPEN TO COLLABORATION <span /></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-pad">
          <div className="contact-top">
            <div className="section-kicker"><span>05</span><span>CONTACT</span></div>
            <span className="contact-signal">LET&apos;S BUILD SOMETHING.</span>
          </div>
          <div className="contact-main">
            <h2>HAVE AN IDEA?<br /><span>MAKE IT MOVE.</span></h2>
            <p>
              For projects, experiments, hackathons, or interesting technical problems,
              start a conversation.
            </p>
            <div className="contact-actions">
              <button className="liquid-wrap" type="button" onClick={scrollToContact}>
                <LiquidMetalButton variant="pill" rendering="monotone" text="START A CONVERSATION" embedded />
              </button>
              <MagneticButton href="#top" secondary>Back to top</MagneticButton>
            </div>
          </div>
          <footer>
            <span>ARYAN RAI</span>
            <span>AI BUILDER · DEVELOPER</span>
            <span>© 2026</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
