import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Code2, Cpu, Github, Instagram, Linkedin, Menu, ShieldCheck, Sparkles, Terminal, X } from "lucide-react";
import enigmaLogo from "@/assets/Logo_Updated.png";
import About from "@/components/About";
import "./Index.css";

const navItems = [{ label: "About", href: "#about" }, { label: "What We Do", href: "#programs" }, { label: "Events", href: "#events" }, { label: "Team", href: "#team" }];
const programs = [
  { number: "01", name: "Build Lab", icon: Code2, description: "Weekly product-building sprints, web development, applications, and open source. Bring a sketch. Leave with a working thing.", tags: ["PRODUCT", "WEB", "OPEN SOURCE"] },
  { number: "02", name: "Frontier Sessions", icon: Cpu, description: "Curiosity-led sessions across AI, machine learning, robotics, and cybersecurity. Make the unfamiliar feel buildable.", tags: ["AI / ML", "ROBOTICS", "SECURITY"] },
  { number: "03", name: "Launchpad", icon: Sparkles, description: "Mentorship, project development, demo days, and career preparation to move promising ideas into the world.", tags: ["MENTORSHIP", "DEMO DAYS", "CAREERS"] },
];
const events = [
  { index: "01", date: "NOV 06, 2026", type: "BUILD SESSION", time: "05:30 PM", title: "Build Night: Zero to MVP" },
  { index: "02", date: "NOV 14, 2026", type: "FRONTIER SESSION", time: "04:00 PM", title: "AI Without the Hype" },
  { index: "03", date: "NOV 28, 2026", type: "MINI HACKATHON", time: "09:00 AM", title: "Enigma Mini Hack" },
];
const teams = {
  "Core Team": [{ initials: "AS", name: "Aarav Shah", role: "President" }, { initials: "RM", name: "Riya Menon", role: "Vice President" }, { initials: "DK", name: "Dev Khanna", role: "General Secretary" }],
  "Technical Team": [{ initials: "NV", name: "Nisha Varma", role: "Technical Lead" }, { initials: "IK", name: "Ishaan Kapoor", role: "Web Lead" }, { initials: "SR", name: "Sana Rao", role: "AI/ML Lead" }],
  "Social Media": [{ initials: "AM", name: "Anya Mehta", role: "Creative Lead" }, { initials: "KR", name: "Kabir Reddy", role: "Content Lead" }, { initials: "TP", name: "Tara Pillai", role: "Design Lead" }],
  "Operations & Resources": [{ initials: "VN", name: "Vihaan Nair", role: "Operations Lead" }, { initials: "SP", name: "Siya Prasad", role: "Resource Manager" }, { initials: "MJ", name: "Mira Joshi", role: "Partnerships Lead" }],
};
type TeamName = keyof typeof teams;
const teamNames = Object.keys(teams) as TeamName[];
const joinLink = "https://chat.whatsapp.com/KUe221OJGsd63Hs5grwUMS";

function Index() {
  const [activeTeam, setActiveTeam] = useState<TeamName>("Core Team");
  const [menuOpen, setMenuOpen] = useState(false);
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
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    const staggerGroups = [
      ".hero-copy, .hero-art", ".section-kicker",
      ".section-heading-row", ".program-card", ".event-row", ".team-tabs", ".team-note", ".join-content", ".footer-main", ".footer-bottom",
    ];
    staggerGroups.forEach((selector) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.setAttribute("data-reveal", "");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 75}ms`);
        observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return undefined;
    const root = document.querySelector(".enigma-site");
    const cards = root?.querySelectorAll<HTMLElement>(".team-grid .member-card");
    if (!root || !cards?.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    cards.forEach((card, index) => {
      card.setAttribute("data-reveal", "");
      card.style.setProperty("--reveal-delay", `${index * 75}ms`);
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [activeTeam]);
  useEffect(() => {
    const nav = document.querySelector(".site-nav");
    const updateNav = () => nav?.classList.toggle("is-scrolled", window.scrollY > 16);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);
  return <main className="enigma-site">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-nav"><div className="nav-inner">
      <a className="brand" href="#home" aria-label="ENIGMA home" onClick={() => setMenuOpen(false)}><img src={enigmaLogo} alt="" className="brand-mark" /><span className="brand-name">ENIGMA<span className="brand-period">.</span></span></a>
      <nav id="mobile-navigation" className={`nav-links${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item, i) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span className="nav-index">0{i + 1}</span>{item.label}</a>)}
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
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a><span className="hero-coord" aria-hidden="true">12°38′17″N &nbsp; 77°26′26″E</span>
      </section>
      <About />
      <section className="programs section-pad" id="programs"><div className="page-wrap"><div className="section-kicker"><span>02 / YOUR ENTRY POINT</span><span className="kicker-line" /></div>
        <div className="section-heading-row"><div><p className="eyebrow">Choose a direction. Change it anytime.</p><h2 className="section-title">Find your <em>way in.</em></h2></div><p className="section-aside">Three ways to get curious,<br />get practical, and get moving.</p></div>
        <div className="program-grid">{programs.map((program) => { const Icon = program.icon; return <article className="program-card" key={program.number}>
          <div className="program-top"><span className="mono-label">{program.number} / PROGRAM</span><Icon size={22} strokeWidth={1.4} /></div><h3>{program.name}</h3><p className="program-description">{program.description}</p>
          <div className="program-bottom"><div className="tag-list">{program.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={joinLink} target="_blank" rel="noreferrer" className="learn-link">Learn More <ArrowUpRight size={15} /></a></div>
        </article>; })}</div>
      </div></section>
      <section className="events section-pad" id="events"><div className="page-wrap"><div className="section-kicker"><span>03 / ON THE CALENDAR</span><span className="kicker-line" /></div>
        <div className="section-heading-row events-heading"><div><p className="eyebrow">Make room for a new idea</p><h2 className="section-title">Coming <em>into focus.</em></h2></div><span className="mono-label">UP NEXT / 2026</span></div>
        <div className="event-list">{events.map((event) => <a className="event-row" href={joinLink} target="_blank" rel="noreferrer" key={event.index}>
          <span className="event-ghost" aria-hidden="true">{event.index}</span><span className="event-index">{event.index}<span className="event-index-dot">.</span></span>
          <span className="event-date"><strong>{event.date}</strong><small>{event.type}</small></span><span className="event-title">{event.title}</span><span className="event-time">{event.time}</span><span className="event-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </a>)}</div>
      </div></section>
      <section className="team section-pad" id="team"><div className="page-wrap"><div className="section-kicker"><span>04 / THE PEOPLE</span><span className="kicker-line" /></div>
        <div className="section-heading-row team-heading"><div><p className="eyebrow">Different strengths. Shared curiosity.</p><h2 className="section-title">Meet the <em>makers.</em></h2></div><p className="section-aside">The people creating space<br />for the next big question.</p></div>
        <div className="team-tabs" role="tablist" aria-label="Team categories">{teamNames.map((team) => <button key={team} type="button" role="tab" id={`tab-${team.replace(/\W/g, "-")}`} aria-selected={activeTeam === team} aria-controls="team-members" onClick={() => setActiveTeam(team)}>{team}</button>)}</div>
        <div className="team-grid" key={activeTeam} id="team-members" role="tabpanel" aria-labelledby={`tab-${activeTeam.replace(/\W/g, "-")}`}>{teams[activeTeam].map((member, i) => <article className={`member-card member-tone-${i + 1}`} key={member.name}>
          <div className="member-art"><span className="member-orbit" aria-hidden="true" /><span className="member-initials">{member.initials}</span><span className="member-serial">EN / {String(i + 1).padStart(2, "0")}</span><a className="member-social" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label={`LinkedIn profile for ${member.name}`}><Linkedin size={16} /></a></div>
          <div className="member-info"><div><h3>{member.name}</h3><p>{member.role}</p></div><span className="member-arrow"><ArrowUpRight size={16} /></span></div>
        </article>)}</div><p className="team-note">Team names shown as a preview. Find your own place in the next chapter.</p>
      </div></section>
      <section className="join-section" id="join"><div className="join-watermark" aria-hidden="true">THINK / MAKE / SHARE</div><div className="join-grid" aria-hidden="true" />
        <div className="page-wrap join-content"><p className="eyebrow"><span className="eyebrow-rule" /> The Door Is Open</p><h2>Bring your<br />curiosity.<br /><span>We’ll bring the<br /><em>momentum.</em></span></h2><p className="join-copy">Whether you have a first idea or a half-built prototype, there’s a place for you here. Come learn, make, and meet your people.</p><a className="button button-gold" href={joinLink} target="_blank" rel="noreferrer">Join Enigma <ArrowUpRight size={17} /></a></div>
      </section>
    </div>
    <footer className="site-footer"><div className="page-wrap"><div className="footer-main"><a className="brand footer-brand" href="#home"><img src={enigmaLogo} alt="" className="brand-mark" /><span className="brand-name">ENIGMA<span className="brand-period">.</span></span></a><p>Built by curious minds,<br />for curious minds.</p><div className="footer-socials"><a href="https://www.instagram.com/ju_enigma/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="https://www.linkedin.com/company/enigma-club-ju/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ENIGMA CLUB · JAIN UNIVERSITY</span><a href="#home">BACK TO THE SURFACE <ArrowRight size={13} /></a><span>MADE FOR THE RELENTLESSLY CURIOUS</span></div>
    </div></footer><a className="floating-join" href={joinLink} target="_blank" rel="noreferrer" aria-label="Join ENIGMA"><span>JOIN</span><ArrowUpRight size={15} /></a>
  </main>;
}
export default Index;








