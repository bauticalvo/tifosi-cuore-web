import {motion } from 'framer-motion';

export const ShopMenu = ({ rows }: { rows: { text: string; url: string }[] }) => {
  return (
    <motion.div 
      className="w-full px-10 py-4 bg-primary border-t border-light/10 flex items-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-row space-x-3">
        {rows.map((row) => (
          <div key={row.text} className="flex flex-col xl:flex-row space-x-2 items-center justify-center mx-4">
            {
              row?.photo && (
                <img src={row.photo} alt={row.text} className="w-10 h-10 mb-2"/>
              )
            }
            <a
              key={row.text}
              href={row.url}
              className="text-light text-lg hover:text-tertiary transition-colors"
              >
              {row.text}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
