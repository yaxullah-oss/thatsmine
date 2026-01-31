'use client';

import { motion } from 'framer-motion';

export default function NewsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={index}
          className="card h-48"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
      ))}
    </div>
  );
}
