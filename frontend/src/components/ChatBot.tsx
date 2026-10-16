import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const ChatBot = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      id="bp-toggle-chat"
      className="fixed bottom-8 right-8 h-16 w-16 bg-primary text-black z-[9999] flex items-center justify-center transition-all border-none"
    >
      <HelpCircle className="h-9 w-9" />
    </motion.button>
  );
};

export default ChatBot;