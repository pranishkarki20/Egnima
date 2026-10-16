import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight, ExternalLink, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postedEvents, setPostedEvents] = useState<Array<{id:string;title:string;date:string;location:string;description:string;image:string;link:string}>>([]);
  useEffect(() => { fetch("/api/events/").then(response => response.json()).then(data => setPostedEvents(data.events || [])).catch(() => setPostedEvents([])); }, []);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const upcomingEvents = postedEvents.filter(event => event.date >= today);
  const pastEvents = postedEvents.filter(event => event.date < today);

  const innovationImages = [
    "/events/event_2025.jpg",
    "/events/p1.jpg",
    "/events/p2.jpg",
    "/events/p3.jpg",
    "/events/p4.jpg",
    "/events/p5.jpg",
    "/events/p6.jpg",
  ];

  const innovationDuel = {
    title: "INNOVATION DUEL 2025",
    date: "Nov 27, 2025",
    location: "LH 113 & 127",
    participants: "60+ Members",
    description: "Students turned campus problems into real solutions. Showcased prototypes and smart innovations for campus life improvement.",
    status: "completed",
  };

  const raceForRoles = {
    title: "RACE FOR ROLES 2026",
    date: "Feb 11, 2026",
    location: "Main Auditorium",
    participants: "120+ Applicants",
    description: "Recruitment drive for Enigma's core teams. Technical, Social Media, Design, and Management roles filled by passionate innovators.",
    image: "/events/raceforroles.jpg",
    status: "completed",
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % innovationImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? innovationImages.length - 1 : prev - 1
    );
  };

  return (
    <section id="events" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* ================= UPCOMING SECTION ================= */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black font-poppins tracking-tighter leading-none mb-6 text-white uppercase flex flex-col">
                CLUB <br />
                <span className="text-primary italic">CALENDAR.</span>
              </h2>
              <p className="text-muted-foreground text-xl max-w-md border-l-2 border-primary pl-6">
                New frontiers waiting to be explored.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-sm font-code text-primary opacity-50 uppercase tracking-widest">[ Active v2.07 ]</span>
            </div>
          </div>

          <h3 className="mb-6 text-2xl font-bold text-primary">Upcoming events</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcomingEvents.map(event => <article key={event.id} className="overflow-hidden border border-primary/20 bg-primary/[.035]">
              {event.image && <img src={event.image} alt="" className="h-56 w-full object-cover"/>}
              <div className="p-6"><span className="font-code text-xs uppercase tracking-widest text-primary">{event.date} · {event.location}</span><h3 className="mt-3 text-2xl font-bold">{event.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>{event.link && <a href={event.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-black">Event details ↗</a>}</div>
            </article>)}
          </div>
          {!upcomingEvents.length && <div className="mt-8 border border-white/10 p-5 text-sm text-muted-foreground">New events are on the way. Check back soon.</div>}
          {/* Archive item retained for event history */}
          <div className="!hidden mt-10 grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white/[.02] p-8 md:p-12 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 bg-secondary text-secondary-foreground font-bold text-xs uppercase tracking-tighter z-10">
              Event archive
            </div>
            
            <div className="md:col-span-7 relative group">
              <div className="absolute -inset-1 bg-primary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/events/BlindDate.jpeg"
                alt="THE BLINDDATE"
                className="w-full transition-all duration-500 object-cover h-[500px] border border-primary/20 group-hover:border-primary/50"
              />
              <div className="absolute top-0 right-0 p-4 bg-primary text-black font-bold text-xs uppercase tracking-tighter">
                SIGHTINGS CONFIRMED
              </div>
            </div>

            <div className="md:col-span-5">
              <span className="text-primary font-code text-sm mb-4 block underline decoration-primary/30 underline-offset-4">Event.Incoming_01</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 font-poppins leading-tight">
                THE BLINDDATE
              </h3>
              <p className="text-muted-foreground mb-8 text-lg border-b border-white/10 pb-8 italic">
                "Who is gonna be your tech partner?"
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-bold font-code text-sm tracking-widest uppercase">March 17, 2026</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-bold font-code text-sm tracking-widest uppercase">002 Seminar Hall</span>
                </div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdj_OQQb5HFQEwzP9FdsrfMKCSINzQp8JlQ5b8EOG_JQciMHg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center bg-primary hover:bg-white text-black font-black uppercase tracking-widest px-8 py-4 text-sm transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#d4aa27] hover:-translate-y-1 hover:-translate-x-1 active:shadow-none active:translate-y-0 active:translate-x-0 cursor-pointer border-none ring-0 outline-none w-fit no-underline"
                >
                  Join Mission
                </a>
              </div>
            </div>
          </div>
        

        {pastEvents.length > 0 && <div className="mb-24">
          <h3 className="mb-6 text-2xl font-bold text-secondary-foreground/70">Recent events</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pastEvents.map(event => <article key={event.id} className="overflow-hidden border border-white/10 bg-white/[.02]">
              {event.image && <img src={event.image} alt="" className="h-56 w-full object-cover"/>}
              <div className="p-6"><span className="font-code text-xs uppercase tracking-widest text-muted-foreground">{event.date} · {event.location}</span><h3 className="mt-3 text-2xl font-bold">{event.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p></div>
            </article>)}
          </div>
        </div>}
        {/* Header (Past Missions) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black font-poppins tracking-tighter leading-none mb-6">
              PAST <br />
              <span className="text-secondary-foreground/40 italic">MISSIONS.</span>
            </h2>
            <p className="text-muted-foreground/60 text-xl max-w-md border-l-2 border-primary/20 pl-6">
              Archive of completed operations and technical deployments.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-sm font-code text-primary opacity-30 uppercase tracking-widest">[ Archive v2.06 ]</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-32">

          {/* Managed Recruitment Event */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 relative group">
              <div className="absolute -inset-1 bg-primary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={raceForRoles.image}
                alt={raceForRoles.title}
                className="w-full transition-all duration-500 object-cover h-[500px]"
              />
              <div className="absolute top-0 right-0 p-4 bg-primary text-black font-bold text-xs uppercase tracking-tighter">
                Mission Complete
              </div>
            </div>
            <div className="md:col-span-5">
              <span className="text-primary font-code text-sm mb-4 block underline decoration-primary/30 underline-offset-4">Event.Archive_02</span>
              <h3 className="text-4xl font-bold mb-6 font-poppins leading-tight">
                {raceForRoles.title}
              </h3>
              <p className="text-muted-foreground mb-8 text-lg border-b border-white/10 pb-8">
                {raceForRoles.description}
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-bold font-code text-sm">{raceForRoles.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-bold font-code text-sm">{raceForRoles.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation Duel Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <span className="text-primary font-code text-sm mb-4 block underline decoration-primary/30 underline-offset-4">Event.Archive_01</span>
              <h3 className="text-4xl font-bold mb-6 font-poppins leading-tight">
                {innovationDuel.title}
              </h3>
              <p className="text-muted-foreground mb-8 text-lg border-b border-white/10 pb-8">
                {innovationDuel.description}
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-bold font-code text-sm">{innovationDuel.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-bold font-code text-sm">{innovationDuel.location}</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 relative group">
              <div className="absolute top-0 right-0 p-4 bg-primary text-black font-bold text-xs uppercase tracking-tighter z-10">
                Mission Complete
              </div>
              <img
                src={innovationImages[currentImageIndex]}
                alt={innovationDuel.title}
                className="w-full h-[500px] object-cover border border-white/10"
              />
              
              {/* NAVIGATION ARROWS - UPDATED WITH BLINKING FOR MOBILE */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-4">
                <button 
                  onClick={prevImage} 
                  className="p-4 bg-primary text-black hover:bg-white transition-colors animate-pulse md:animate-none"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage} 
                  className="p-4 bg-primary text-black hover:bg-white transition-colors animate-pulse md:animate-none"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STAY TUNED SECTION ================= */}
        <div className="mt-48 text-center opacity-50">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-1 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent">
              <div className="bg-background p-12 md:p-20 relative overflow-hidden group">
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="w-12 h-[1px] bg-primary/30"></span>
                    <span className="text-primary/50 font-code tracking-[0.3em] uppercase text-xs">More Missions Encrypting</span>
                    <span className="w-12 h-[1px] bg-primary/30"></span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black mb-8 font-poppins tracking-tighter opacity-80">
                    STAY <span className="text-primary/60 italic font-medium">TUNED.</span>
                  </h2>

                  <p className="text-lg text-muted-foreground/60 mb-12 max-w-xl mx-auto leading-relaxed">
                    The next phase of innovation launches soon. Join our community to be the first to know.
                  </p>

                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="inline-flex items-center justify-center border border-primary/30 hover:border-primary hover:bg-primary/5 text-primary/70 hover:text-primary font-bold uppercase tracking-widest px-8 py-4 text-xs transition-all duration-200 cursor-pointer"
                  >
                    Request Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      </div>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-background border px-8 py-16 md:px-16 md:py-20 max-w-3xl w-full relative shadow-[16px_16px_0px_0px_#D5FF40]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 pointer-events-none" />
              <div className="absolute top-4 left-4 text-[10px] font-code text-primary opacity-50 tracking-[0.2em]">SYS.REQ_001</div>

              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-primary transition-colors cursor-pointer"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col items-center text-center space-y-8 mt-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins tracking-tighter leading-[1.1] uppercase">
                  Interested in creative destruction?
                </h3>

                <a
                  href="https://chat.whatsapp.com/KUe221OJGsd63Hs5grwUMS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-5xl md:text-6xl font-black font-poppins tracking-tighter text-primary hover:text-white transition-colors underline decoration-4 decoration-primary/50 hover:decoration-white underline-offset-[12px]"
                >
                  JOIN US.
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Events;




