import {motion } from 'framer-motion';

export const MiniShopMenu = ({ rows }: { rows: { text: string; url: string }[] }) => {
  return (
    <motion.div 
      className="w-full px-10 py-4 bg-primary border-t border-light/10 flex items-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col space-y-3">
        {rows.map((row) => (
          <a
            key={row.text}
            href={row.url}
            className="text-light text-lg hover:text-tertiary transition-colors"
          >
            {row.text}
          </a>
        ))}
      </div>
    </motion.div>
  );
};
