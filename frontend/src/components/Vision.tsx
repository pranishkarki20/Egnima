import { Button } from "@/components/ui/button";
import { Target, Rocket, Heart } from "lucide-react";

const Vision = () => {
  return (
    <section id="vision" className="py-24 relative overflow-hidden bg-background">
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 border-y border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16 items-center">

            {/* Left Content - Massive Quote */}
            <div className="md:col-span-8 space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary font-code tracking-[0.3em] uppercase text-xs">Sector.Vision</span>
              </div>

              <blockquote className="text-5xl md:text-7xl font-black font-poppins tracking-tighter leading-[0.9] uppercase italic text-white">
                "CREATING A <span className="text-primary">COMMUNITY</span> WHERE <span className="underline decoration-primary/50 underline-offset-8">INNOVATION</span> FLOURISHES."
              </blockquote>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-primary pl-8 font-code text-sm uppercase opacity-60">
                We envision ENIGMA as the cornerstone of technical rebellion on campus. A place where builders, hackers, and designers collide to forge the next phase of the digital frontier.
              </p>
            </div>

            {/* Right Content - Technical Specs */}
            <div className="md:col-span-4 space-y-2">
              {[
                {
                  title: "INNOVATION_FIRST",
                  description: "Embracing new ideas and pushing boundaries",
                  status: "ACTIVE",
                },
                {
                  title: "CORE_COMMUNITY",
                  description: "Inclusive network of technical rebels",
                  status: "ONLINE",
                },
                {
                  title: "VERTICAL_GROWTH",
                  description: "Constant evolution and technical mastery",
                  status: "SYNCING",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="border border-white/10 p-6 hover:bg-white/5 transition-colors group hover:animate-jitter"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-code text-primary opacity-50">VALUE.ID: 0{index + 1}</span>
                    <span className="text-[8px] font-code text-primary bg-primary/10 px-2 py-0.5 rounded-sm">{value.status}</span>
                  </div>
                  <h3 className="text-xl font-black mb-2 font-poppins tracking-tight uppercase group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground font-code text-xs leading-relaxed">{value.description}</p>
                </div>
              ))}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
