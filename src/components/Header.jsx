import { GridIcon } from "./Icons";

export const NAV = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Work", target: "work" },
  { label: "Journey", target: "journey" },
];

export default function Header({ ready, onMenu, onContact }) {
  return <header className={`site-header${ready ? " ready" : ""}`}>
    <div className="header-inner shell">
      <a className="brand" href="#home" aria-label="Aryan Rai home">AR<span>✦</span></a>
      <nav aria-label="Primary navigation">
        {NAV.map((item) => <a key={item.target} href={`#${item.target}`}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="talk-button" onClick={onContact}>Let's talk</button>
        <button className="menu-button" onClick={onMenu} aria-label="Open menu"><GridIcon /></button>
      </div>
    </div>
  </header>;
}
