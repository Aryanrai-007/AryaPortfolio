import { XIcon } from "./Icons";
import { NAV } from "./Header";

export default function NavMenu({ open, onClose, onContact }) {
  if (!open) return null;
  return <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <button className="nav-close" onClick={onClose} aria-label="Close menu"><XIcon /></button>
    <nav className="nav-overlay-links">
      {NAV.map((item) => <a key={item.target} href={`#${item.target}`} onClick={onClose}>{item.label}</a>)}
      <button onClick={onContact}>Let's talk</button>
    </nav>
  </div>;
}
