import { Lightbulb, Trophy, Users } from "lucide-react";

const capabilities = [
  {
    title: "TECH INNOVATION",
    description: "Fostering creative solutions and cutting-edge technological advancement in a raw technical environment.",
    icon: Lightbulb,
  },
  {
    title: "CORE COMMUNITY",
    description: "Building a collaborative network of passionate tech enthusiasts and technical rebels.",
    icon: Users,
  },
  {
    title: "MISSION EXCELLENCE",
    description: "Striving for technical mastery and professional development through rigorous missions.",
    icon: Trophy,
  },
];

export default function About() {
  return (
    <section className="about-dossier section-pad" id="about" aria-labelledby="about-title">
      <div className="page-wrap about-layout">
        <aside className="about-rail" aria-label="Who we are">
          
          <span className="about-rail-label">WHO WE ARE</span>
        </aside>

        <div className="about-content">
          <header className="about-heading">
            <p className="about-overline">ENIGMA / CLUB DOSSIER</p>
            <h2 id="about-title"><span>ABOUT</span><em>ENIGMA.</em></h2>
          </header>

          <div className="about-manifesto">
            <p className="about-intro">ENIGMA is a collective of student innovators dedicated to technical excellence and creative destruction.</p>
            <div className="about-system-copy">
              <span>[SYSTEM_MANIFESTO]:</span>
              <p>We believe in creating an environment where high-intensity technology meets radical creativity, empowering the next generation of builders.</p>
            </div>
          </div>

          <div className="about-capabilities">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <article className="about-card" key={title}>
                
                <span className="about-card-rule" aria-hidden="true" />
                <Icon className="about-card-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="about-mission">
            <span className="about-mission-label">MISSION.LOG</span>
            <p>To empower students with the knowledge and community needed to excel in technical innovation.</p>
            
          </div>
        </div>
      </div>
      <span className="about-watermark" aria-hidden="true">E</span>
    </section>
  );
}

