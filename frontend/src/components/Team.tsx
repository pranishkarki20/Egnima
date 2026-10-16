import { Linkedin, Github, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const departments = ["Core Team", "Technical", "Social Media", "Resource", "Operational", "Research"];
type TeamMember = { name: string; role: string; department: string; description: string; image: string; linkedin?: string; github?: string; email?: string };

const membersData = [
  {
    id: 1,
    name: "Yamuna Sharma D",
    role: "Lead",
    description:
      "Always drawn to art and creativity, i love finding stories in colors, design and the little details that often go unnoticed ",
    image: "/leads/lead.jpeg",
    social: {
      email: "yamusharma529@gmail.com",
      linkedin: "http://linkedin.com/in/yamuna-sharma-192a2029b",
      github: "https://github.com/yamunasharma24",
    },
  },
  {
    id: 9,
    name: "Kshitij Sharma",
    role: "Co-Lead",
    description: "A curious jack of all trades who loves learning, building, and exploring new skills across domains.",
    image: "/leads/colead.jpg",
    social: {
      email: "kshitijsharma.765@gmail.com",
      linkedin: "https://linkedin.com/in/kshitijjj", // Added https:// for better linking
      github: "https://github.com/kshxiscool",
    },
  },
  {
    id: 3,
    name: "Krishal Karna",
    role: "Technical Lead",
    description: "Turning data into decisions — one model at a time.",
    image: "/leads/tech.jpeg",
    social: {
      email: "karnakreeshal@gmail.com",
      linkedin: "https://www.linkedin.com/in/krishalkarna/",
      github: "https://github.com/kreeshal17",
    },
  },
  {
    id: 4,
    name: "Shaili Srivastava ",
    role: "Operation Lead",
    description:
      "Passionate about technology and problem-solving. I love building efficient systems, optimizing workflows, and constantly learning new stuff to stay ahead.",
    image: "/leads/operation.jpeg",
    social: {
      email: "23btrcn026@jainuniversity.ac.in",
      linkedin: "https://www.linkedin.com/in/shaili-srivastava0908/",
      github: "https://github.com/ShailiSrivastava",
    },
  },
  {
    id: 6,
    name: "Aakash Agarwal",
    role: "Resource Lead",
    description: "Passionate technologist solving real-world challenges",
    image: "/leads/resource.jpeg",
    social: {
      email: "aakashrkl603@gmail.com",
      linkedin: "https://www.linkedin.com/in/aakashagarwal1609/",
      github: "https://github.com/AaKaShAgArWaLs",
    },
  },
  {
    id: 7,
    name: "Ayadee Aphiwatamorn",
    role: "Creative lead",
    description:
      "Creativity isn’t just what i do…it’s how i see the world. i love turning ideas into something visual, meaningful and uniquely mine",
    image: "/leads/creative.jpeg",
    social: {
      email: "ayadee.aphiwatamorn@gmail.com",
      linkedin: "http://linkedin.com/in/ayadee-aphiwatamorn1878",
      github: "https://github.com/AyadeeAphiwatamorn",
    },
  },
  {
    id: 8,
    name: "Suyog Lal Shrestha",
    role: "Photography Lead",
    description: "Eager and enthusiastic about exploring new things.",
    image: "/leads/photography.jpeg",
    social: {
      email: "sathyac2004@gmail.com",
      linkedin: "https://www.linkedin.com/in/",
      github: "https://github.com/",
    },
  },
  {
    id: 10,
    name: "Sworaj Khadka",
    role: "Social Media Lead",
    description: "Crafting our digital presence and keeping the community engaged one post at a time.",
    image: "/leads/social.jpg",
    social: {
      email: "sworajkhadka21@gmail.com",
      linkedin: "https://www.linkedin.com/in/sworaj-khadka-071a20349",
      github: "https://github.com/SworajKhadka",
    },
  },
];

const formatTeamData = (members: typeof membersData) => {
  return members.map((member) => ({
    name: member.name,
    role: member.role,
    description: member.description,
    image: member.image,
    linkedin: member.social.linkedin,
    github: member.social.github,
    email: member.social.email,
  }));
};

const Team = () => {
  const [department, setDepartment] = useState("Core Team");
  const [savedMembers, setSavedMembers] = useState<TeamMember[] | null>(null);
  useEffect(() => {
    try { const value = localStorage.getItem("enigma-team-v1"); if (value) setSavedMembers(JSON.parse(value)); } catch { setSavedMembers(null); }
  }, []);
  const teamMembers = savedMembers ? savedMembers.map((m) => ({ ...m, linkedin: m.linkedin, email: m.email, github: m.github })) : formatTeamData(membersData).map((m) => ({ ...m, department: m.role.toLowerCase().includes("lead") && !m.role.toLowerCase().includes("technical") ? "Core Team" : m.role.toLowerCase().includes("technical") ? "Technical" : m.role.toLowerCase().includes("social") || m.role.toLowerCase().includes("photography") ? "Social Media" : m.role.toLowerCase().includes("resource") ? "Resource" : m.role.toLowerCase().includes("operation") ? "Operational" : "Research" }));
  const shownMembers = teamMembers.filter((m) => m.department === department);

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black font-poppins tracking-tighter leading-none mb-6">
              THE <br />
              <span className="text-primary italic">PEOPLE.</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-md border-l-2 border-primary pl-6 font-code text-sm uppercase">
              Six teams. One community building what comes next.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-sm font-code text-primary opacity-50 uppercase tracking-widest">[ Unit.Roster_v1.0 ]</span>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Team departments">
          {departments.map((item) => <button key={item} role="tab" aria-selected={department === item} onClick={() => setDepartment(item)} className={`px-4 py-2 text-xs font-code uppercase tracking-wider transition-colors ${department === item ? "bg-primary text-black" : "border border-white/10 text-white/55 hover:border-primary/50 hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-7xl mx-auto">
          {shownMembers.map((member, index) => (
            <div
              key={index}
              className="bg-background p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 font-code text-[8px] text-white/20 select-none">
                OP_{index + 101}
              </div>

              <div className="relative mb-8">
                <div className="w-full aspect-[4/5] bg-white/5 overflow-hidden border border-white/10 group-hover:border-primary transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Social Overlay */}
                <div className="absolute bottom-4 left-4 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="w-8 h-8 bg-zinc-900 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 bg-primary text-black flex items-center justify-center hover:bg-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-primary transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black font-poppins tracking-tight uppercase leading-none mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <div className="inline-block bg-primary/10 text-primary font-code text-[10px] px-2 py-0.5 tracking-tighter uppercase">
                    {member.role} · {member.department}
                  </div>
                </div>

                <p className="text-muted-foreground font-code text-[11px] leading-relaxed opacity-60 line-clamp-3">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
          {shownMembers.length === 0 && <p className="col-span-full bg-background p-8 text-sm text-muted-foreground">No members in this team yet. Add people from Admin Studio.</p>}
        </div>
      </div>
    </section>
  );
};

export default Team;
