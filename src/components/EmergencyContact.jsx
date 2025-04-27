
import React from 'react';
import { motion } from "framer-motion";

export function EmergencyContact({ contact, index }) {
  const handleClick = () => {
    window.location.href = `tel:${contact.number}`;
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="emergency-contact"
      onClick={handleClick}
    >
      <contact.icon className="h-6 w-6 mb-2" />
      <h3 className="font-semibold">{contact.name}</h3>
      <a href={`tel:${contact.number}`} className="phone-link">
        {contact.number}
      </a>
    </motion.div>
  );
}
