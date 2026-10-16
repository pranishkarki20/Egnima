import { Github, Linkedin, Twitter, Instagram, ArrowUp, X, LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Assuming enigmaLogo is available in your assets/ directory
import enigmaLogo from "@/assets/Logo_Updated.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isLogoOpen, setIsLogoOpen] = useState(false);

  const quickLinks = [
    { name: "HOME.EXE", href: "#home" },
    { name: "ABOUT.LOG", href: "#about" },
    { name: "MISSIONS.ARC", href: "#events" },
    { name: "OPERATIVES.LST", href: "#team" },
    { name: "UPLINK.CON", href: "#contact" },
  ];

  interface SocialLink {
    icon?: LucideIcon;
    customIcon?: boolean;
    href: string;
    label: string;
  }

  const socialLinks: SocialLink[] = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/ju_enigma/?hl=en",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/enigma-club-ju/posts/?feedView=all",
      label: "LinkedIn",
    },
    {
      customIcon: true,
      href: "https://chat.whatsapp.com/KUe221OJGsd63Hs5grwUMS",
      label: "WhatsApp",
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-32 pb-16 bg-background border-t border-white/10 overflow-hidden">
      {/* Brutalist Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none font-black text-[20vw] flex items-center justify-center select-none">
        ENIGMA
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

          {/* Brand/About Section */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setIsLogoOpen(true)}>
              <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                <img src={enigmaLogo} alt="ENIGMA Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-3xl font-black font-poppins tracking-tighter text-white">ENIGMA.</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm font-code text-sm uppercase opacity-60">
              Sector.Alpha // Student-led collective dedicated to technical rebellion and innovative deployment.
            </p>

            {/* Social Links - Brutalist Blocks */}
            <div className="flex gap-1 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon as LucideIcon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-primary transition-all group"
                  >
                    {social.customIcon ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 group-hover:text-black transition-colors"
                      >
                        <path d="M20.52 3.48A11.86 11.86 0 0012 .5C6.21.5 1.5 5.21 1.5 11c0 1.95.51 3.87 1.47 5.54L.5 23l6.71-2.1A11.9 11.9 0 0012 22.5c5.79 0 10.5-4.71 10.5-10.5 0-1.98-.52-3.84-1.48-5.52zM12 20.5c-1.36 0-2.69-.34-3.86-.98l-.28-.16-3.99 1.25 1.3-3.86-.18-.31A8.01 8.01 0 014 11c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" />
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5 group-hover:text-black transition-colors" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-code text-primary opacity-50 uppercase tracking-widest">Navigation_Tree</span>
            </div>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white font-black font-poppins text-lg hover:text-primary transition-colors tracking-tight uppercase"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-code text-primary opacity-50 uppercase tracking-widest">Communication_Log</span>
            </div>
            <ul className="space-y-6 text-muted-foreground font-code text-xs uppercase opacity-60">
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[8px]">LOCATION</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=12.638143296188357,77.44063386876661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  JCVR+27P, Karnataka 562112
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[8px]">UPLINK_EMAIL</span>
                enigmaclub5@gmail.com
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[8px]">COMMS_LINE</span>
                +91 96967 24664
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-code text-[10px] tracking-widest text-white/20 uppercase">
            &copy; {currentYear} // ENIGMA_COLLECTIVE // ALL_MISSIONS_RESERVED
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center bg-primary text-black hover:bg-white transition-all transform hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Logo Popup Modal */}
      <AnimatePresence>
        {isLogoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 cursor-pointer"
            onClick={() => setIsLogoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: -360, opacity: 0 }}
              animate={{
                scale: 1.5,
                rotateY: 0,
                opacity: 1
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <img
                src={enigmaLogo}
                alt="ENIGMA Logo Large"
                className="w-full h-full object-contain mix-blend-screen filter drop-shadow-[0_0_50px_#d4aa2722]"
              />
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-primary font-code text-xs tracking-[.8em] uppercase whitespace-nowrap opacity-50 font-bold">
                Operational_Asset // System_Alpha
              </div>
            </motion.div>
            <button
              className="absolute top-12 right-12 text-white/50 hover:text-primary transition-colors"
              onClick={() => setIsLogoOpen(false)}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
