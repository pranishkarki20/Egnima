import { apiFetch, apiUrl } from "@/lib/api";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Github, Instagram, Linkedin, Menu, ShieldCheck, Terminal, X } from "lucide-react";
import enigmaLogo from "@/assets/Logo_Updated.png";
import About from "@/components/About";
import "./Index.css";

const navItems = [{ label: "About", href: "#about" }, { label: "Events", href: "#events" }, { label: "Team", href: "#team" }];
type PublicEvent = { id: string; title: string; date: string; location: string; description: string; image: string; link: string };
type PublicMember = { id?: string; name: string; role: string; department: string; description: string; image: string; email?: string; linkedin?: string; github?: string };
const teamGroups = [{ department: "Core Team", title: "Leads" }, { department: "Technical", title: "Technical Team" }, { department: "Social Media", title: "Social Media" }, { department: "Resource", title: "Resource Team" }, { department: "Operational", title: "Operations Team" }, { department: "Research", title: "Research Team" }];
const joinLink = "https://chat.whatsapp.com/KUe221OJGsd63Hs5grwUMS";
const memberBelongsToGroup = (member: PublicMember, department: string) => {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");
  const categories = new Set<string>();
  const primaryDepartment = normalize(member.department || "");
  if (primaryDepartment) categories.add(primaryDepartment);
  const role = normalize(member.role || "");
  const target = normalize(department);
  if (target === "technical" && (role.includes("techlead") || role.includes("technicallead"))) return true;
  if (["lead", "president", "secretary", "treasurer", "chair"].some(title => role.includes(title))) categories.add("coreteam");
  const roleCategories: Record<string, string[]> = {
    technical: ["technical", "tech", "developer", "development", "coding", "software", "programming"],
    socialmedia: ["social", "media", "photography", "photo", "creative", "design", "content"],
    resource: ["resource"],
    operational: ["operation", "operational", "operations"],
    research: ["research"]
  };
  Object.entries(roleCategories).forEach(([category, keywords]) => {
    if (keywords.some(keyword => role.includes(keyword))) categories.add(category);
  });
  return [...categories].some(category => category === target || category.includes(target) || target.includes(category));
};
const memberOrder = (member: PublicMember, department: string) => {
  const role = (member.role || "").toLowerCase().replace(/[^a-z]/g, "");
  if (department === "Core Team") {
    if (role.includes("copresident")) return 1;
    if (role.includes("vicepresident")) return 2;
    if (role.includes("president")) return 0;
    if (role.includes("generalsecretary")) return 3;
    if (role.includes("secretary")) return 4;
    if (role.includes("treasurer")) return 5;
    if (role.includes("colead")) return 6;
    if (role.includes("lead")) return 7;
    return 20;
  }
  if (role.includes("colead")) return 1;
  if (role.includes("lead")) return 0;
  return 10;
};
function Index() {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PublicEvent | null>(null);
  const [teamMembers, setTeamMembers] = useState<PublicMember[]>([]);
  const [activeTeam, setActiveTeam] = useState("Core Team");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    apiFetch("/api/events/").then(response => { if (!response.ok) throw new Error("Events unavailable"); return response.json(); }).then(data => setEvents(data.events || [])).catch(() => setEvents([]));
    apiFetch("/api/team/").then(response => { if (!response.ok) throw new Error("Team roster unavailable"); return response.json(); }).then(data => setTeamMembers(data.members || [])).catch(() => { try { setTeamMembers(JSON.parse(localStorage.getItem("enigma-team-v1") || "[]")); } catch { setTeamMembers([]); } });
  }, []);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const orderedEvents = [...events.filter(event => event.date >= today).sort((a, b) => a.date.localeCompare(b.date)), ...events.filter(event => event.date < today).sort((a, b) => b.date.localeCompare(a.date))];
  useEffect(() => {
    if (!selectedEvent) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedEvent(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [selectedEvent]);
  useEffect(() => {
    const root = document.querySelector(".enigma-site");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return undefined;

    root.setAttribute("data-motion-ready", "true");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "120px 0px" });

    const revealGroups: [string, string, number][] = [
      [".hero-copy .eyebrow", "hero-eyebrow", 0], [".hero h1", "hero-title", 1], [".hero-description", "hero-copy", 2], [".hero-actions", "hero-actions", 3], [".hero-meta", "hero-meta", 4], [".hero-art", "hero-crest", 2],
      [".about-heading", "about-heading", 0], [".about-manifesto", "about-manifesto", 1], [".about-card", "about-capability", 0], [".about-mission", "about-mission", 1],
      [".section-kicker", "rise", 0], [".section-heading-row:not(.events-heading):not(.team-heading)", "rise", 0], [".program-card", "capability", 0],
      [".events-heading", "events-intro", 0], [".event-row", "event-row", 0], [".team-heading", "team-heading", 0], [".team-tabs", "team-controls", 0], [".team-group", "team-panel", 0],
      [".team-note", "rise", 0], [".join-content", "join-content", 0], [".join-watermark", "join-watermark", 0], [".footer-main", "rise", 0], [".footer-bottom", "rise", 0],
    ];
    revealGroups.forEach(([selector, variant, baseDelay]) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.setAttribute("data-reveal", variant);
        element.style.setProperty("--reveal-delay", `${baseDelay * 95 + Math.min(index, 4) * 75}ms`);
        observer.observe(element);
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          window.requestAnimationFrame(() => {
            element.classList.add("is-visible");
            observer.unobserve(element);
          });
        }
      });
    });
    return () => observer.disconnect();
  }, [events, teamMembers, activeTeam]);

  useEffect(() => {
    const nav = document.querySelector(".site-nav");
    const updateNav = () => nav?.classList.toggle("is-scrolled", window.scrollY > 16);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".enigma-site");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !pointer.matches) return undefined;
    let stopTimer = 0;

    const moveCursor = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.classList.add("has-custom-cursor");
      const target = event.target instanceof Element ? event.target : null;
      root.classList.toggle("cursor-text", Boolean(target?.closest("input, textarea, [contenteditable=\"true\"]")));
      if (!reducedMotion.matches) {
        root.classList.add("cursor-moving");
        window.clearTimeout(stopTimer);
        stopTimer = window.setTimeout(() => root.classList.remove("cursor-moving"), 150);
      }
    };
    const leaveSite = () => {
      root.classList.remove("has-custom-cursor", "cursor-moving", "cursor-text");
      window.clearTimeout(stopTimer);
    };
    window.addEventListener("pointermove", moveCursor, { passive: true });
    root.addEventListener("pointerleave", leaveSite);
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      root.removeEventListener("pointerleave", leaveSite);
      window.clearTimeout(stopTimer);
    };
  }, []);
  return <main className="enigma-site">
    <div className="pointer-aura" aria-hidden="true" />
    <div className="enigma-cursor" aria-hidden="true"><img className="enigma-cursor-logo" src={enigmaLogo} alt="" /></div>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-nav"><div className="nav-inner">
      <a className="brand" href="#home" aria-label="ENIGMA home" onClick={() => setMenuOpen(false)}><img src={enigmaLogo} alt="" className="brand-mark" /><span className="brand-name">ENIGMA<span className="brand-period">.</span></span></a>
      <nav id="mobile-navigation" className={`nav-links${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <a className="nav-mobile-cta" href={joinLink} target="_blank" rel="noreferrer">Join the Club <ArrowUpRight size={15} /></a>
      </nav>
      <a className="nav-cta" href={joinLink} target="_blank" rel="noreferrer">Join the Club <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
    </div></header>
    <div id="main-content">
      <section className="hero" id="home"><div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
        <div className="hero-content page-wrap"><div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> The tech club for the relentlessly curious</p>
          <h1>Decode ideas.<br /><span className="hero-second"><em>Build</em> the future.</span></h1>
          <p className="hero-description">A place to learn out loud, experiment without a map, and build things that reach beyond the classroom.</p>
          <div className="hero-actions"><a className="button button-gold" href={joinLink} target="_blank" rel="noreferrer">Become a Member <ArrowUpRight size={17} /></a><a className="text-link" href="#about">Explore the Club <ArrowDownRight size={16} /></a></div>
          <div className="hero-meta"><span>JAIN UNIVERSITY</span><span className="meta-dot" /><span>EST. FOR THE CURIOUS</span></div>
        </div><div className="hero-art"><img src={enigmaLogo} alt="ENIGMA emblem" /></div></div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a><span className="hero-coord" aria-hidden="true">12°38'17?N &nbsp; 77°26'26?E</span>
      </section>
      <About />
      <section className="events section-pad" id="events"><div className="page-wrap"><div className="section-kicker"><span>ON THE CALENDAR</span><span className="kicker-line" /></div>
        <div className="section-heading-row events-heading"><div><p className="eyebrow">Make room for a new idea</p><h2 className="section-title">Coming <em>into focus.</em></h2></div><span className="mono-label">UP NEXT / 2026</span></div>
        <div className="event-list">{orderedEvents.map((event) => <article className="event-row" key={event.id} onClick={() => setSelectedEvent(event)}>
          
          <span className="event-date"><strong>{event.date}</strong><small>{event.date < today ? "PAST EVENT" : "UPCOMING EVENT"}</small>{event.image && <img className="event-photo" src={apiUrl(event.image)} alt="" />}</span><span className="event-title">{event.title}</span><span className="event-time">{event.location}</span><button type="button" className="event-arrow" aria-label={`View details for ${event.title}`} ><ArrowUpRight size={18} /></button>
        </article>)}{orderedEvents.length === 0 && <p className="team-note">New events are on the way. Check back soon.</p>}</div>
      </div></section>
      <section className="team section-pad" id="team"><div className="page-wrap"><div className="section-kicker"><span>THE PEOPLE</span><span className="kicker-line" /></div>
        <div className="section-heading-row team-heading"><div><p className="eyebrow">Different strengths. Shared curiosity.</p><h2 className="section-title">Meet the <em>makers.</em></h2></div><p className="section-aside">The people creating space<br />for the next big question.</p></div>
        <div className="team-tabs" role="tablist" aria-label="Team categories">{teamGroups.filter(group => teamMembers.some(member => memberBelongsToGroup(member, group.department))).map(group => <button key={group.department} type="button" role="tab" aria-selected={activeTeam === group.department} onClick={() => setActiveTeam(group.department)}>{group.department}</button>)}</div>
        {(() => { const group = teamGroups.find(item => item.department === activeTeam); const members = teamMembers.filter(member => memberBelongsToGroup(member, activeTeam)).sort((a, b) => memberOrder(a, activeTeam) - memberOrder(b, activeTeam)); return <section className="team-group" key={activeTeam} aria-labelledby="active-team-heading"><h3 className="team-group-heading" id="active-team-heading">{group?.title || activeTeam}</h3><div className={`team-grid${members.length <= 2 ? " team-grid-centered" : ""}${members.length === 1 ? " team-grid-single" : ""}`}>{members.map((member, i) => { const initials = member.name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase(); return <article className={`member-card member-tone-${i % 3 + 1}`} key={member.id || member.name}>
          <h3 className="member-name">{member.name}</h3>
          <div className={`member-art${member.image ? " has-photo" : ""}`}>{member.image ? <img className="member-photo" src={apiUrl(member.image)} alt={member.name} /> : <><span className="member-orbit" aria-hidden="true" /><span className="member-initials">{initials}</span></>}</div>
          <div className="member-info"><p>{member.role}</p>{(member.github || member.linkedin) && <div className="member-socials">{member.linkedin && <a className="member-social" href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn profile for ${member.name}`}><Linkedin size={16} /><span>LinkedIn</span></a>}{member.github && <a className="member-social" href={member.github} target="_blank" rel="noreferrer" aria-label={`GitHub profile for ${member.name}`}><Github size={16} /><span>GitHub</span></a>}</div>}</div>
        </article>; })}{members.length === 0 && <p className="team-note">No members in this category yet.</p>}</div></section>; })()}
        <p className="team-note">The team roster is updated by ENIGMA administrators.</p>
      </div></section>
      <section className="join-section" id="join"><div className="join-watermark" aria-hidden="true">YOUR NEXT IDEA</div><div className="join-grid" aria-hidden="true" />
        <div className="page-wrap join-content"><p className="eyebrow"><span className="eyebrow-rule" /> THE DOOR IS OPEN</p><h2>Bring your curiosity.<br />We’ll bring the<br /><em>momentum.</em></h2><p className="join-copy">Experience doesn’t matter. Curiosity does. Join Enigma and start building what’s next.</p><a className="button button-gold join-cta" href={joinLink} target="_blank" rel="noreferrer">Join Enigma <ArrowRight size={17} aria-hidden="true" /></a></div>
      </section>
    </div>
    <footer className="site-footer"><div className="page-wrap"><div className="footer-main"><a className="brand footer-brand" href="#home"><img src={enigmaLogo} alt="" className="brand-mark" /><span className="brand-name">ENIGMA<span className="brand-period">.</span></span></a><p>Built by curious minds,<br />for curious minds.</p><div className="footer-socials"><a href="https://www.instagram.com/ju_enigma/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="https://www.linkedin.com/company/enigma-club-ju/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ENIGMA CLUB · JAIN UNIVERSITY</span><a href="#home">BACK TO THE SURFACE <ArrowRight size={13} /></a><span>MADE FOR THE RELENTLESSLY CURIOUS</span></div>
    </div></footer><a className="floating-join" href={joinLink} target="_blank" rel="noreferrer" aria-label="Join ENIGMA"><span>JOIN</span><ArrowUpRight size={15} /></a>
    {selectedEvent && createPortal(<div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
      <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onClick={event => event.stopPropagation()}>
        <button type="button" className="event-modal-close" aria-label="Close event details" onClick={() => setSelectedEvent(null)}><X size={20} /></button>
        <div className="event-modal-media">{selectedEvent.image ? <img src={apiUrl(selectedEvent.image)} alt={selectedEvent.title} /> : <div className="event-modal-placeholder"><span>ENIGMA EVENT</span></div>}</div>
        <div className="event-modal-content"><p className="event-modal-kicker">{selectedEvent.date < today ? "PAST EVENT" : "UPCOMING EVENT"}</p><h2 id="event-modal-title">{selectedEvent.title}</h2><p className="event-modal-description">{selectedEvent.description}</p><dl className="event-modal-details"><div><dt>Date</dt><dd>{selectedEvent.date}</dd></div><div><dt>Location</dt><dd>{selectedEvent.location}</dd></div></dl>{selectedEvent.link && <a className="event-modal-link" href={selectedEvent.link} target="_blank" rel="noreferrer">Event details / Register <ArrowUpRight size={16} /></a>}</div>
      </section>
    </div>, document.body)}  </main>;
}
export default Index;











