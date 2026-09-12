import { ArrowUpRight } from "./Icons";

const projects = [
  { name: "Project One", url: "#", services: ["React", "JavaScript", "AI"], description: "Placeholder ready for your real project details." },
  { name: "Project Two", url: "#", services: ["Next.js", "TypeScript", "Node.js"], description: "Placeholder ready for your real project details." },
  { name: "Project Three", url: "#", services: ["Python", "AI", "APIs"], description: "Placeholder ready for your real project details." },
  { name: "Project Four", url: "#", services: ["Full Stack", "Database", "Deployment"], description: "Placeholder ready for your real project details." },
  { name: "Project Five", url: "#", services: ["Automation", "Prompt Engineering", "Web"], description: "Placeholder ready for your real project details." },
  { name: "Project Six", url: "#", services: ["Community", "Hackathon", "Product"], description: "Placeholder ready for your real project details." },
];

export default function ProjectsSection() {
  return <section id="work" className="projects-section">
    <div className="shell">
      <div className="section-kicker">02 / Selected work</div>
      <div className="projects-head"><h2>Things I’ve <em>built.</em></h2><p>A source-inspired project list. We’ll swap these placeholders for your actual projects one by one.</p></div>
      <div className="project-list">
        {projects.map((project, index) => <article className="project-row" key={project.name}>
          <span className="project-number">({String(index + 1).padStart(2, "0")})</span>
          <div className="project-main"><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.services.map((service) => <span key={service}>{service}</span>)}</div></div>
          <a href={project.url} aria-label={`Open ${project.name}`}><ArrowUpRight /></a>
        </article>)}
      </div>
    </div>
  </section>;
}
