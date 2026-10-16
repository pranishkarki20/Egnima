import { Mail, Phone, MapPin, Send } from "lucide-react";
// Removed Button import as it's no longer used
// import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "UPLINK.EMAIL",
      value: "enigmaclub5@gmail.com",
      href: "mailto:enigmaclub5@gmail.com",
    },
    {
      icon: Phone,
      title: "COMMS.DIRECT",
      value: "+91 96967 24664",
      href: "tel:+919696724664",
    },
    {
      icon: MapPin,
      title: "BASE.LOC",
      value: "JCVR+27P, Karnataka 562112",
      href: "https://www.google.com/maps/search/?api=1&query=12.638143296188357,77.44063386876661",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black font-poppins tracking-tighter leading-none mb-6">
              SECURE <br />
              <span className="text-primary italic">UPLINK.</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-md border-l-2 border-primary pl-6 font-code text-sm uppercase">
              Establish a direct connection for technical inquiries or collaboration requests.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-sm font-code text-primary opacity-50 uppercase tracking-widest">[ Protocol.Contact_v2.0 ]</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-12 bg-background hover:bg-primary/5 transition-all relative overflow-hidden"
              >
                {/* Visual Label Decor */}
                <div className="absolute top-4 right-4 text-[10px] font-code text-white/10 uppercase tracking-widest">
                  Secure_Channel_0{index + 1}
                </div>

                <div className="mb-8 w-12 h-12 bg-primary flex items-center justify-center text-black">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-black mb-4 font-poppins tracking-tight uppercase group-hover:text-primary transition-colors">
                  {info.title}
                </h3>

                <p className="text-muted-foreground font-code text-sm leading-relaxed border-t border-white/5 pt-4">
                  {info.value}
                </p>

                {/* Arrow Decor */}
                <div className="mt-8 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black tracking-widest uppercase">Connect</span>
                  <div className="h-[1px] w-8 bg-primary"></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Technical Footer Metadata */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 opacity-20 hover:opacity-100 transition-opacity">
          <div className="font-code text-[10px] tracking-widest uppercase">
            ENIGMA_SECURITY_PROTOCOL: ENCRYPTED
          </div>
          <div className="font-code text-[10px] tracking-widest uppercase">
            ESTABLISHED: 2025 // UPDATED: 2026
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;