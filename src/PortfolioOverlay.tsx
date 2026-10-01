import React, { useState, useEffect, useRef } from "react";

interface Project {
  id: string;
  title: string;
  japanese: string;
  category: string;
  subtitle: string;
  description: string;
  loop?: string[];
  tech: string[];
  githubUrl?: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: "logicure",
    title: "LOGICURE",
    japanese: "論理学",
    category: "AI / AGENTIC SYSTEMS",
    subtitle: "Operational Risk Intelligence & Decision Support Layer",
    description:
      "An intelligent decision-support system designed to help organizations understand operational risk, simulate disruptions, and take action before problems become costly. Evolved from early explorations under Nexus into an independent agentic architecture.",
    loop: ["SENSE", "UNDERSTAND", "SIMULATE", "DECIDE", "ACT", "LEARN"],
    tech: ["AI Agents", "LangGraph", "Python", "LLMs", "APIs", "Supabase", "React", "TypeScript"],
    githubUrl: "https://github.com/CodeBloodedCB/Nexus",
    highlights: [
      "Simulates real-world supply chain and operational bottlenecks in real time",
      "LangGraph agentic graph orchestration for multi-step reasoning",
      "Operational intelligence layer moving beyond basic chat interfaces",
      "Dynamic impact scoring and action proposal engine"
    ]
  },
  {
    id: "mayavihin",
    title: "MAYAVIHIN",
    japanese: "無妄",
    category: "AI / COMPUTER VISION",
    subtitle: "Deepfake Detection & Media Authenticity Verification",
    description:
      "Built around the problem of synthetic and manipulated media, Mayavihin explores computer-vision techniques for detecting subtle visual inconsistencies and distinguishing authentic media from generated content.",
    tech: ["Python", "AI / ML", "Computer Vision", "Deepfake Detection", "Image Processing"],
    githubUrl: "https://github.com/CodeBloodedCB/MayaVihin",
    highlights: [
      "Presented with CodeBlooded at national-level hackathon competitions",
      "Analyzes spatial & temporal artifacts in synthetic video frames",
      "Visual inconsistency scoring pipeline for media integrity verification"
    ]
  },
  {
    id: "synqro",
    title: "SYNQRO",
    japanese: "同期",
    category: "AI / AUTOMATION",
    subtitle: "Predictive Queue Management & Flow Optimization System",
    description:
      "An intelligent queue-management platform designed to make waiting predictable, measurable, and efficient for both users and service providers through real-time automation and telemetry.",
    tech: ["AI", "Automation", "Web Development", "REST APIs", "Data Telemetry", "UI/UX"],
    githubUrl: "https://github.com/Aryanrai-007/SynQro1.0",
    highlights: [
      "Predictive wait-time estimation using traffic patterns",
      "Real-time queue balancing and automated user notification dispatch",
      "Minimal friction web portal for mobile users"
    ]
  },
  {
    id: "satqueryx",
    title: "SATQUERYX",
    japanese: "宇宙",
    category: "GEO / SPACE / REMOTE SENSING",
    subtitle: "Satellite Imagery Natural Query & Geospatial Insight Engine",
    description:
      "SatQueryX explores how satellite and remote-sensing data can become easier to search, analyze, and understand without requiring specialist GIS software or complex workflows.",
    tech: ["Python", "Remote Sensing", "Geospatial Data", "Satellite Imagery", "AI", "Data Analysis"],
    githubUrl: "https://github.com/CodeBloodedCB/SatQueryX",
    highlights: [
      "Natural language interface for querying Earth observation data",
      "Automated feature detection across multi-spectral satellite imagery",
      "Accessible spatial analytics dashboard for environmental & urban tracking"
    ]
  },
  {
    id: "cleanflow",
    title: "CLEANFLOW",
    japanese: "清流",
    category: "HACKATHONS / SUSTAINABILITY",
    subtitle: "Smart Waste Collection Tracking & Transparency Platform",
    description:
      "A prototype developed during Aryan's first hackathon experience, reaching Round 2 in Build With Gemini. Tracks waste management streams with AI verification.",
    tech: ["Google Gemini API", "Python", "React", "Smart Tracking"],
    highlights: [
      "Reached Round 2 in 'Build With Gemini' hackathon",
      "Automated image classification for municipal waste segregation",
      "Catalyzed the journey into rapid prototyping and hackathons"
    ]
  }
];

export function PortfolioOverlay() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      {/* MODAL DRAWER OVERLAY */}
      {activeTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm transition-all duration-300 pointer-events-auto">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0a0e12] border border-white/15 rounded-xl p-6 sm:p-10 text-[#dfe7e0] shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl font-light focus:outline-none"
            >
              ✕
            </button>

            {/* CASE STUDIES TAB */}
            {activeTab === "case-studies" && (
              <div>
                <div className="flex items-center gap-3 mb-2 text-xs font-mono tracking-widest text-[#e0231c] uppercase">
                  <span>SYSTEM ARCHITECTURE & CASE STUDIES</span>
                  <span>/</span>
                  <span className="font-sans text-[#e0231c] text-[7px] tracking-[0.25em]">事例</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white mb-6">
                  FEATURED PROJECTS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="group cursor-pointer p-5 bg-[#10161a] border border-white/10 hover:border-[#e0231c] rounded-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-mono tracking-widest text-[#e0231c] uppercase">
                            {proj.category}
                          </span>
                          <span className="font-sans text-[#e0231c]/90 bg-[#e0231c]/10 border border-[#e0231c]/30 px-1.5 py-0.5 rounded text-[7px] tracking-[0.25em]">
                            {proj.japanese}
                          </span>
                        </div>
                        <h3 className="text-xl font-medium text-white group-hover:text-[#e0231c] transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-300">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-[#e0231c] font-mono group-hover:translate-x-1 transition-transform">
                          VIEW SPECS →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === "skills" && (
              <div>
                <div className="flex items-center gap-3 mb-2 text-xs font-mono tracking-widest text-[#e0231c] uppercase">
                  <span>TECHNICAL MATRIX</span>
                  <span>/</span>
                  <span className="font-sans text-[#e0231c] text-[7px] tracking-[0.25em]">技術</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white mb-6">
                  CURRENT TECH STACK
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 bg-[#10161a] border border-white/10 rounded-lg">
                    <h3 className="text-xs font-mono text-[#e0231c] uppercase tracking-widest mb-3">
                      AI & Agentic Systems
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "AI Agents",
                        "LangGraph",
                        "LLMs",
                        "Prompt Engineering",
                        "Computer Vision",
                        "Deepfake Detection",
                        "AI Automation"
                      ].map((s, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#10161a] border border-white/10 rounded-lg">
                    <h3 className="text-xs font-mono text-[#e0231c] uppercase tracking-widest mb-3">
                      Programming Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "C", "C++", "JavaScript", "TypeScript"].map((s, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#10161a] border border-white/10 rounded-lg">
                    <h3 className="text-xs font-mono text-[#e0231c] uppercase tracking-widest mb-3">
                      Frontend & Creative Web
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "HTML5", "CSS3", "Tailwind CSS", "Three.js", "WebGL", "Vite"].map((s, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#10161a] border border-white/10 rounded-lg">
                    <h3 className="text-xs font-mono text-[#e0231c] uppercase tracking-widest mb-3">
                      Backend & Infrastructure
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Supabase", "Firebase", "Vercel", "REST APIs", "Git & GitHub", "VS Code"].map((s, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* JOURNEY & CONNECT TAB */}
            {activeTab === "journey" && (
              <div>
                <div className="flex items-center gap-3 mb-2 text-xs font-mono tracking-widest text-[#e0231c] uppercase">
                  <span>TIMELINE & LINKS</span>
                  <span>/</span>
                  <span className="font-sans text-[#e0231c] text-[7px] tracking-[0.25em]">軌跡</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white mb-6">
                  FROM HACKATHONS TO SYSTEMS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6 relative border-l border-white/20 pl-6 ml-2">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#e0231c]"></div>
                      <span className="text-xs font-mono text-[#e0231c]">2025</span>
                      <h3 className="text-base font-medium text-white">First Hackathon & CleanFlow</h3>
                      <p className="text-xs text-gray-300 mt-1">
                        Participated in 'Build With Gemini', reaching Round 2 with CleanFlow.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#e0231c]"></div>
                      <span className="text-xs font-mono text-[#e0231c]">2025 – 2026</span>
                      <h3 className="text-base font-medium text-white">MAYAVIHIN & Computer Vision</h3>
                      <p className="text-xs text-gray-300 mt-1">
                        Explored AI-powered deepfake detection with CodeBlooded team members.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#e0231c]"></div>
                      <span className="text-xs font-mono text-[#e0231c]">2026</span>
                      <h3 className="text-base font-medium text-white">SAP Hackathon Grand Finale</h3>
                      <p className="text-xs text-gray-300 mt-1">
                        CodeBlooded team reached the grand-finale stage, evolving concepts into Logicure.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#e0231c]"></div>
                      <span className="text-xs font-mono text-[#e0231c]">2026</span>
                      <h3 className="text-base font-medium text-white">SIH 2026 & CodeBlooded</h3>
                      <p className="text-xs text-gray-300 mt-1">
                        Building in SIH 2026 ecosystem & leading CodeBlooded student builder community.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 justify-center">
                    <a
                      href="https://github.com/Aryanrai-007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-[#10161a] border border-white/10 hover:border-[#e0231c] rounded-lg transition-all group"
                    >
                      <div className="text-[10px] font-mono text-[#e0231c] uppercase tracking-widest">CODEBLOODED / GITHUB</div>
                      <div className="text-sm font-medium text-white mt-1 group-hover:text-[#e0231c] transition-colors">
                        github.com/Aryanrai-007 →
                      </div>
                    </a>

                    <a
                      href="https://instagram.com/aryanrai007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-[#10161a] border border-white/10 hover:border-[#e0231c] rounded-lg transition-all group"
                    >
                      <div className="text-[10px] font-mono text-[#e0231c] uppercase tracking-widest">INSTAGRAM</div>
                      <div className="text-sm font-medium text-white mt-1 group-hover:text-[#e0231c] transition-colors">
                        instagram.com/aryanrai007 →
                      </div>
                    </a>

                    <a
                      href="https://in.linkedin.com/in/aryanrai007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-[#10161a] border border-white/10 hover:border-[#e0231c] rounded-lg transition-all group"
                    >
                      <div className="text-[10px] font-mono text-[#e0231c] uppercase tracking-widest">LINKEDIN</div>
                      <div className="text-sm font-medium text-white mt-1 group-hover:text-[#e0231c] transition-colors">
                        linkedin.com/in/aryanrai007 →
                      </div>
                    </a>

                    <a
                      href="mailto:aryanraiavengers@gmail.com"
                      className="p-4 bg-[#10161a] border border-white/10 hover:border-[#e0231c] rounded-lg transition-all group"
                    >
                      <div className="text-[10px] font-mono text-[#e0231c] uppercase tracking-widest">DIRECT EMAIL</div>
                      <div className="text-sm font-medium text-white mt-1 group-hover:text-[#e0231c] transition-colors">
                        aryanraiavengers@gmail.com →
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROJECT CASE STUDY DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md pointer-events-auto">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a0e12] border border-[#e0231c]/50 rounded-xl p-6 sm:p-10 text-[#dfe7e0] shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl font-light focus:outline-none"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2 text-xs font-mono tracking-widest text-[#e0231c] uppercase">
              <span>{selectedProject.category}</span>
              <span>/</span>
              <span className="font-sans text-[#e0231c] border border-[#e0231c]/40 bg-[#e0231c]/10 px-1.5 py-0.5 rounded text-[7px] tracking-[0.25em]">
                {selectedProject.japanese}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white mb-2">
              {selectedProject.title}
            </h2>
            <p className="text-sm text-[#e0231c] font-mono mb-6">{selectedProject.subtitle}</p>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Loop Diagram if present */}
            {selectedProject.loop && (
              <div className="my-6 p-4 bg-[#10161a] border border-white/10 rounded-lg">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">
                  SYSTEM ARCHITECTURE LOOP
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white">
                  {selectedProject.loop.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <span className="bg-[#e0231c]/20 border border-[#e0231c]/40 px-3 py-1 rounded text-[#e0231c]">
                        {item}
                      </span>
                      {idx < selectedProject.loop!.length - 1 && <span className="text-gray-500">↓</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">KEY HIGHLIGHTS</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#e0231c]">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">TECHNOLOGY STACK</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t, i) => (
                  <span key={i} className="text-xs bg-white/10 border border-white/15 px-3 py-1 rounded text-white font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#e0231c] hover:bg-[#ff5a3c] text-white text-xs font-mono tracking-widest uppercase rounded transition-colors"
              >
                VIEW ON GITHUB →
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
