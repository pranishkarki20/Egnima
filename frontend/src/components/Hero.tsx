import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { MatrixText } from "./MatrixText";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Media - Grainy Filtered Image */}
      <div
        className="absolute inset-0 opacity-20 grayscale brightness-50"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Radical Typographic Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 className="text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none">
          ENIGMA
        </h2>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-start gap-12">

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-[1px] w-12 sm:w-20 bg-primary"></div>
            <span className="text-primary font-code tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs">Technical Rebellion</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-black font-poppins leading-[0.9] sm:leading-[0.85] tracking-tighter break-words max-w-[100vw] overflow-hidden">
            SOLVE THE <br />
            <span className="text-primary italic break-words block sm:inline-block max-w-full"><MatrixText text="UNKNOWN." /></span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full border-t border-white/10 pt-12">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We are a collective of developers, designers, and innovators unraveling the mysteries of technology through creative destruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start md:items-center md:justify-end">
              <a
                href="https://www.instagram.com/ju_enigma/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto bg-primary text-black font-black uppercase tracking-widest px-12 py-8 text-lg hover:bg-white transition-all transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#d4aa27]">
                  Access Socials
                </Button>
              </a>
              <a
                href="https://chat.whatsapp.com/KUe221OJGsd63Hs5grwUMS"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full sm:w-auto"
              >
                <Button variant="ghost" className="w-full text-white font-bold uppercase tracking-widest px-8 py-8 border border-white/10 hover:bg-white/5">
                  Join Network
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Metadata Decor */}
      <div className="absolute bottom-12 left-12 hidden md:block">
        <a
          href="https://www.google.com/maps/search/?api=1&query=12.638143296188357,77.44063386876661"
          target="_blank"
          rel="noopener noreferrer"
          className="font-code text-[10px] text-white/20 hover:text-primary transition-colors leading-tight block"
        >
          LAT: 12.6381° N <br />
          LONG: 77.4406° E <br />
          V_ID: 0x88F2A
        </a>
      </div>

      {/* Scroll Indicator - Brutalist Style */}
      <div className="absolute bottom-0 right-12 w-[1px] h-32 bg-gradient-to-t from-primary to-transparent animate-pulse" />
    </section>
  );
};

export default Hero;
