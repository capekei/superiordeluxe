import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  delay?: number;
}

export default function Badge({ text, delay = 0 }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="
        inline-flex items-center gap-2
        px-6 py-2 rounded-full
        bg-blue/10 dark:bg-blue-light/10
        backdrop-blur-sm
        border border-blue/5 dark:border-blue-light/5
        shadow-lg shadow-blue/5
      "
    >
      <span className="text-sm font-medium bg-gradient-to-r from-blue to-steel bg-clip-text text-transparent">
        {text}
      </span>
      <span className="flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue"></span>
      </span>
    </motion.div>
  );
}
