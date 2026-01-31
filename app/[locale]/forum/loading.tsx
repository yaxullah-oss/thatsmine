'use client';

import { motion } from 'framer-motion';

export default function ForumLoading() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="card h-32"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
      ))}
    </div>
  );
}
