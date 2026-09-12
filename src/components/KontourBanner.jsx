import { ArrowUpRight } from "./Icons";

export default function KontourBanner({ id = "home" }) {
  return <section id={id} className="kontour-banner">
    <div className="kontour-grid" aria-hidden="true" />
    <div className="kontour-glow" aria-hidden="true" />
    <div className="kontour-shell shell">
      <div className="kontour-topline"><span>Full-Stack Developer · AI Prompt Engineer</span><span>Ghaziabad / India</span></div>
      <div className="kontour-content">
        <p className="kontour-kicker">I build things, write things & occasionally break things.</p>
        <h1>ARYAN<br/><em>RAI</em></h1>
        <p className="kontour-copy">Full-stack developer, AI prompt engineer, writer, blogger, leader and founder of <strong>Code Blooded</strong> — a hackathon community built for people who think their best idea starts at 2 AM.</p>
        <div className="kontour-actions"><a className="kontour-pill" href="#work">See my work <ArrowUpRight /></a><a className="kontour-link" href="https://github.com/Aryanrai-007" target="_blank" rel="noreferrer">GitHub ↗</a></div>
      </div>
      <div className="kontour-stats"><div><b>2025–29</b><span>CSE Undergraduate</span></div><div><b>01</b><span>Hackathon community</span></div><div><b>∞</b><span>Things left to build</span></div></div>
    </div>
  </section>;
}
