
import React from 'react';
import { motion } from "framer-motion";
import { MapPin } from 'lucide-react';

export function RegionSelector({ selectedRegion, onRegionChange }) {
  const regions = [
    { id: 'srinagar', name: 'Srinagar', description: 'Capital city with Dal Lake' },
    { id: 'gulmarg', name: 'Gulmarg', description: 'Famous for skiing and gondola' },
    { id: 'pahalgam', name: 'Pahalgam', description: 'Valley of Shepherds' },
    { id: 'sonamarg', name: 'Sonamarg', description: 'Meadow of Gold' },
    { id: 'kupwara', name: 'Kupwara', description: 'Border district with scenic beauty' },
    { id: 'baramulla', name: 'Baramulla', description: 'Historic town on Jhelum River' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="region-selector"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="h-6 w-6" />
        Select Region
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {regions.map((region) => (
          <motion.button
            key={region.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRegionChange(region.id)}
            className={`p-4 rounded-lg text-left transition-colors duration-300 ${
              selectedRegion === region.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <h3 className="font-semibold">{region.name}</h3>
            <p className="text-sm opacity-90">{region.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
