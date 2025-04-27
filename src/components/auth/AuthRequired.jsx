
import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { useAuth } from './AuthContext';

export function AuthRequired({ children }) {
  const { user, setIsAuthModalOpen } = useAuth();

  useEffect(() => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  }, []);

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="auth-required-overlay"
      >
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p>Please sign in to access the safety portal</p>
        </div>
      </motion.div>
    );
  }

  return children;
}
