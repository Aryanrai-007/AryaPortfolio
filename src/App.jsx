import { useState } from "react";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import NavMenu from "./components/NavMenu";
import KontourBanner from "./components/KontourBanner";
import ProjectsSection from "./components/ProjectsSection";
import { CONTACT } from "./lib/contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openContact = () => window.open(CONTACT.emailUrl, "_blank", "noopener,noreferrer");

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <PageLoader onDone={() => setReady(true)} />
      <Header ready={ready} onMenu={() => setMenuOpen(true)} onContact={openContact} />
      <main id="main">
        <KontourBanner id="home" theme="purple" />
        <section id="about" className="about-section">
          <div className="shell">
            <span className="section-kicker">01 / About</span>
            <div className="about-grid">
              <h2>Not just a <em>developer.</em></h2>
              <div className="about-copy">
                <p>I’m Aryan Rai — a full-stack developer, AI prompt engineer, writer, blogger, leader, and founder of Code Blooded.</p>
                <p>Code Blooded is a hackathon community for people who build fast, learn together, and turn ambitious ideas into working prototypes.</p>
                <div className="role-tags">
                  <span>Full-Stack Developer</span><span>AI Prompt Engineer</span><span>Writer</span><span>Blogger</span><span>Leader</span><span>Founder — Code Blooded</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProjectsSection />
        <section id="journey" className="journey-section">
          <div className="shell">
            <span className="section-kicker">03 / Journey</span>
            <h2>Still <em>loading...</em></h2>
            <div className="timeline">
              <div><b>2025 — Present</b><h3>B.Tech — Computer Science & Engineering</h3><p>Inderprastha Engineering College</p></div>
              <div><b>2025 — Present</b><h3>Graphic Designer</h3><p>IEEE IPEC</p></div>
              <div><b>Now</b><h3>Building Code Blooded</h3><p>Growing a community around hackathons, builders and ambitious ideas.</p></div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="shell">
            <span className="section-kicker">04 / Contact</span>
            <h2>Have an idea?<br/><em>Let’s make it real.</em></h2>
            <a className="contact-email" href={CONTACT.emailUrl}>{CONTACT.email}</a>
            <div className="socials">
              <a href="https://github.com/Aryanrai-007" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/aryanrai007" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={`mailto:${CONTACT.email}`}>Email ↗</a>
            </div>
          </div>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} Aryan Rai</span><span>Built with curiosity & questionable amounts of caffeine.</span></footer>
      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} onContact={openContact} />
    </>
  );
}
