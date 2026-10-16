import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, UsersRound, Plus, Trash2, Save } from "lucide-react";

type EventRecord = { id?: string; title: string; date: string; location: string; description: string; image: string; link: string };
type TeamRecord = { name: string; role: string; department: string; description: string; image: string; email: string; linkedin: string; github: string };
const TEAM_KEY = "enigma-team-v1";
const departments = ["Core Team", "Technical", "Social Media", "Resource", "Operational", "Research"];
const fieldClass = "w-full rounded border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary";
const initialEvent: EventRecord = { title: "", date: "", location: "", description: "", image: "", link: "" };
const initialMember: TeamRecord = { name: "", role: "", department: departments[0], description: "", image: "", email: "", linkedin: "", github: "" };
const starterRoster: TeamRecord[] = [
  { ...initialMember, name: "Yamuna Sharma D", role: "Lead", department: "Core Team", image: "/leads/lead.jpeg", email: "yamusharma529@gmail.com", linkedin: "http://linkedin.com/in/yamuna-sharma-192a2029b", github: "https://github.com/yamunasharma24", description: "Always drawn to art and creativity, I love finding stories in colors, design and the little details that often go unnoticed." },
  { ...initialMember, name: "Kshitij Sharma", role: "Co-Lead", department: "Core Team", image: "/leads/colead.jpg", email: "kshitijsharma.765@gmail.com", linkedin: "https://linkedin.com/in/kshitijjj", github: "https://github.com/kshxiscool", description: "A curious jack of all trades who loves learning, building, and exploring new skills across domains." },
  { ...initialMember, name: "Krishal Karna", role: "Technical Lead", department: "Technical", image: "/leads/tech.jpeg", email: "karnakreeshal@gmail.com", linkedin: "https://www.linkedin.com/in/krishalkarna/", github: "https://github.com/kreeshal17", description: "Turning data into decisions, one model at a time." },
  { ...initialMember, name: "Shaili Srivastava", role: "Operations Lead", department: "Operational", image: "/leads/operation.jpeg", email: "23btrcn026@jainuniversity.ac.in", linkedin: "https://www.linkedin.com/in/shaili-srivastava0908/", github: "https://github.com/ShailiSrivastava", description: "Passionate about technology, problem-solving, efficient systems, and better workflows." },
  { ...initialMember, name: "Aakash Agarwal", role: "Resource Lead", department: "Resource", image: "/leads/resource.jpeg", email: "aakashrkl603@gmail.com", linkedin: "https://www.linkedin.com/in/aakashagarwal1609/", github: "https://github.com/AaKaShAgArWaLs", description: "Passionate technologist solving real-world challenges." },
  { ...initialMember, name: "Ayadee Aphiwatamorn", role: "Creative Lead", department: "Research", image: "/leads/creative.jpeg", email: "ayadee.aphiwatamorn@gmail.com", linkedin: "http://linkedin.com/in/ayadee-aphiwatamorn1878", github: "https://github.com/AyadeeAphiwatamorn", description: "Creativity is how I see the world; I love turning ideas into something visual and meaningful." },
  { ...initialMember, name: "Suyog Lal Shrestha", role: "Photography Lead", department: "Social Media", image: "/leads/photography.jpeg", email: "sathyac2004@gmail.com", description: "Eager and enthusiastic about exploring new things." },
  { ...initialMember, name: "Sworaj Khadka", role: "Social Media Lead", department: "Social Media", image: "/leads/social.jpg", email: "sworajkhadka21@gmail.com", linkedin: "https://www.linkedin.com/in/sworaj-khadka-071a20349", description: "Crafting our digital presence and keeping the community engaged one post at a time." },
];

const read = <T,>(key: string): T[] => {
  try { return JSON.parse(localStorage.getItem(key) || "[]") as T[]; } catch { return []; }
};

export default function Admin() {
  const [tab, setTab] = useState<"events" | "team">("events");
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [members, setMembers] = useState<TeamRecord[]>([]);
  const [event, setEvent] = useState(initialEvent);
  const [member, setMember] = useState(initialMember);
  const [editMember, setEditMember] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => { fetch("/api/events/").then(async r => { if (!r.ok) throw new Error("Could not load events from the server."); const data = await r.json(); setEvents(data.events || []); }).catch(error => setNotice(error.message)); const current = read<TeamRecord>(TEAM_KEY); if (current.length) setMembers(current); else { setMembers(starterRoster); localStorage.setItem(TEAM_KEY, JSON.stringify(starterRoster)); } }, []);

  const saveMembers = (next: TeamRecord[]) => { setMembers(next); localStorage.setItem(TEAM_KEY, JSON.stringify(next)); };
  const submitEvent = async (e: FormEvent) => { e.preventDefault(); setNotice(""); try { const response = await fetch("/api/events/", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` }, body: JSON.stringify(event) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not publish event."); setEvents(current => [...current, data.event].sort((a,b) => a.date.localeCompare(b.date))); setEvent(initialEvent); setNotice("Event published for everyone to see."); } catch (error) { setNotice(error instanceof Error ? error.message : "Could not publish event."); } };
  const submitMember = (e: FormEvent) => {
    e.preventDefault();
    const next = [...members];
    if (editMember === null) next.push(member); else next[editMember] = member;
    saveMembers(next); setMember(initialMember); setEditMember(null); setNotice("Team roster saved in this browser.");
  };
  const edit = (index: number) => { setMember(members[index]); setEditMember(index); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <main className="min-h-screen bg-background px-4 py-8 text-white md:px-8">
    <div className="mx-auto max-w-6xl">
      <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16}/> Back to site</Link>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-8">
        <div><span className="font-code text-xs uppercase tracking-[.3em] text-primary">ENIGMA / MANAGEMENT</span><h1 className="mt-3 text-4xl font-black md:text-6xl">Admin studio</h1><p className="mt-3 max-w-xl text-sm text-muted-foreground">Manage the events and team roster shown on the public site.</p></div>
        <div className="flex gap-2"><button onClick={() => setTab("events")} className={`flex items-center gap-2 px-4 py-3 text-sm ${tab === "events" ? "bg-primary text-black" : "border border-white/15"}`}><CalendarDays size={16}/> Events</button><button onClick={() => setTab("team")} className={`flex items-center gap-2 px-4 py-3 text-sm ${tab === "team" ? "bg-primary text-black" : "border border-white/15"}`}><UsersRound size={16}/> Team</button></div>
      </div>
      {notice && <p role="status" className="mb-5 border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">{notice}</p>}
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={tab === "events" ? submitEvent : submitMember} className="space-y-4 border border-white/10 bg-white/[.025] p-5 md:p-7">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">{tab === "events" ? <><Plus size={19}/> Post an event</> : <><Save size={19}/> {editMember === null ? "Add a team member" : "Update team member"}</>}</h2>
          {tab === "events" ? <>
            <input type="password" required className={fieldClass} placeholder="Admin API token" value={adminToken} onChange={e=>setAdminToken(e.target.value)}/><input required className={fieldClass} placeholder="Event name" value={event.title} onChange={e=>setEvent({...event,title:e.target.value})}/>
            <div className="grid gap-4 sm:grid-cols-2"><input required type="date" className={fieldClass} value={event.date} onChange={e=>setEvent({...event,date:e.target.value})}/><input required className={fieldClass} placeholder="Location" value={event.location} onChange={e=>setEvent({...event,location:e.target.value})}/></div>
            <textarea required rows={4} className={fieldClass} placeholder="Event description" value={event.description} onChange={e=>setEvent({...event,description:e.target.value})}/>
            <input className={fieldClass} placeholder="Image URL (optional)" value={event.image} onChange={e=>setEvent({...event,image:e.target.value})}/><input className={fieldClass} placeholder="Registration URL (optional)" value={event.link} onChange={e=>setEvent({...event,link:e.target.value})}/>
            <button className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-black"><Plus size={16}/> Publish event</button>
          </> : <>
            <div className="grid gap-4 sm:grid-cols-2"><input required className={fieldClass} placeholder="Full name" value={member.name} onChange={e=>setMember({...member,name:e.target.value})}/><input required className={fieldClass} placeholder="Role / title" value={member.role} onChange={e=>setMember({...member,role:e.target.value})}/></div>
            <select className={fieldClass} value={member.department} onChange={e=>setMember({...member,department:e.target.value})}>{departments.map(x=><option key={x}>{x}</option>)}</select>
            <textarea rows={3} className={fieldClass} placeholder="Short bio" value={member.description} onChange={e=>setMember({...member,description:e.target.value})}/>
            <input className={fieldClass} placeholder="Photo URL (e.g. /leads/name.jpg)" value={member.image} onChange={e=>setMember({...member,image:e.target.value})}/>
            <div className="grid gap-4 sm:grid-cols-3"><input className={fieldClass} placeholder="Email" value={member.email} onChange={e=>setMember({...member,email:e.target.value})}/><input className={fieldClass} placeholder="LinkedIn URL" value={member.linkedin} onChange={e=>setMember({...member,linkedin:e.target.value})}/><input className={fieldClass} placeholder="GitHub URL" value={member.github} onChange={e=>setMember({...member,github:e.target.value})}/></div>
            <div className="flex gap-3"><button className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-black"><Save size={16}/>{editMember === null ? "Add member" : "Save changes"}</button>{editMember !== null && <button type="button" onClick={()=>{setEditMember(null);setMember(initialMember);}} className="border border-white/15 px-5 py-3 text-sm">Cancel</button>}</div>
          </>}
          <p className="pt-3 text-xs leading-relaxed text-muted-foreground">{tab === "events" ? "Events are shared through the server database. Configure ADMIN_API_TOKEN on the backend and enter it here to publish or delete." : "Team roster changes are stored in this browser."}</p>
        </form>
        <section className="border border-white/10 bg-white/[.025] p-5 md:p-7">
          <h2 className="mb-5 text-xl font-bold">{tab === "events" ? `Events (${events.length})` : `Roster (${members.length})`}</h2>
          <div className="space-y-3">
            {tab === "events" ? events.map((item,i)=><article key={`${item.title}-${i}`} className="flex justify-between gap-4 border border-white/10 p-4"><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-xs text-muted-foreground">{item.date} Â· {item.location}</p></div><button aria-label={`Delete ${item.title}`} onClick={async()=>{ try { const response = await fetch(`/api/events/?id=${encodeURIComponent(item.id || "")}`, { method: "DELETE", headers: { Authorization: `Bearer ${adminToken}` } }); const data = response.status === 204 ? {} : await response.json(); if (!response.ok) throw new Error(data.error || "Could not delete event."); setEvents(events.filter((_,j)=>j!==i)); setNotice("Event deleted."); } catch (error) { setNotice(error instanceof Error ? error.message : "Could not delete event."); } }} className="self-start p-2 text-muted-foreground hover:text-red-400"><Trash2 size={16}/></button></article>) : members.map((item,i)=><article key={`${item.name}-${i}`} className="flex items-center justify-between gap-4 border border-white/10 p-4"><div><h3 className="font-semibold">{item.name}</h3><p className="mt-1 text-xs text-primary">{item.role} Â· {item.department}</p></div><div className="flex gap-1"><button onClick={()=>edit(i)} className="px-3 py-2 text-xs text-primary hover:bg-primary/10">Edit</button><button aria-label={`Delete ${item.name}`} onClick={()=>saveMembers(members.filter((_,j)=>j!==i))} className="p-2 text-muted-foreground hover:text-red-400"><Trash2 size={16}/></button></div></article>)}
            {((tab === "events" && events.length === 0) || (tab === "team" && members.length === 0)) && <p className="py-8 text-sm text-muted-foreground">Nothing added yet.</p>}
          </div>
        </section>
      </div>
    </div>
  </main>;
}




