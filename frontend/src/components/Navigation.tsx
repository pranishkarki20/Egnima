import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import enigmaLogo from "@/assets/Logo_Updated.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Handles nav clicks: if on home page, scroll directly; if on another page, navigate to / then scroll
  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const sectionId = hash.replace("#", "");

    if (isHomePage) {
      // Already on home — just scroll to the section
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home first, then scroll after page renders
      navigate("/");
      // Wait for home page to mount, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    // After navigating to /, check if there's a pending hash to scroll to
    if (isHomePage && location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME.EXE", href: "#home" },
    { name: "ABOUT.LOG", href: "#about" },
    { name: "MISSIONS.ARC", href: "#events" },
    { name: "OPERATIVES.LST", href: "#team" },
    { name: "SECURE.CON", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/95 border-white/10 backdrop-blur-md h-16" : "bg-transparent border-transparent h-24"
          }`}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => setIsLogoOpen(true)}>
              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
                <img src={enigmaLogo} alt="ENIGMA Logo" className="w-full h-full object-contain mix-blend-screen" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black font-poppins tracking-tighter text-white">ENIGMA</span>
                <span className="text-[8px] font-code text-primary tracking-[0.2em] uppercase">Sector.Alpha</span>
              </div>
            </div>

        {/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-12">
  <div className="flex items-center space-x-8">
    {navLinks.map((link) => (
      <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="relative group font-code text-[10px] tracking-widest text-white/70 hover:text-primary transition-colors">
        {link.name}
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
      </a>
    ))}
    <Link to="/admin" className="font-code text-[10px] tracking-widest text-primary/70 hover:text-primary">ADMIN</Link>
    
  </div>
</div>
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                className="w-10 h-10 flex items-center justify-center bg-primary text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Radical Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 top-[64px] bg-background z-50 p-6 animate-fade-in-up">
              <div className="flex flex-col space-y-8">
                <div className="flex items-center gap-4 opacity-20">
                  <div className="h-[1px] w-12 bg-primary" />
                  <span className="font-code text-xs tracking-widest">Protocol.Menu</span>
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { handleNavClick(e, link.href); setIsMobileMenuOpen(false); }}
                    className="text-4xl font-black font-poppins tracking-tighter text-white hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black font-poppins tracking-tighter text-primary">ADMIN STUDIO ↗</Link>
             
              </div>

              <div className="absolute bottom-12 left-6 opacity-10">
                <span className="text-[10rem] font-black pointer-events-none select-none">ENIGMA</span>
              </div>
            </div>
          )}
        </div>
      </nav>

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
                className="w-full h-full object-contain mix-blend-screen filter drop-shadow-[0_0_30px_#d4aa2744]"
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-primary font-code text-[10px] tracking-[.5em] uppercase whitespace-nowrap opacity-50">
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
    </>
  );
};

export default Navigation;
