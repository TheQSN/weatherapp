import React from 'react';
import { motion } from 'framer-motion';
import type { City } from '../types';

interface ProgressBarProps {
  total: number;
  current: number;
  duration: number;
  cities: City[];
  showCityNames: boolean;
}

export default function ProgressBar({ total, current, duration, cities, showCityNames }: ProgressBarProps) {
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-2/3 min-w-[300px]">
      {showCityNames && (
        <div className="flex justify-between text-white/80 text-sm mb-2">
          <span>{cities[prevIndex].name}</span>
          <span>{cities[nextIndex].name}</span>
        </div>
      )}
      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20"
            >
              {index === current && (
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: duration / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}