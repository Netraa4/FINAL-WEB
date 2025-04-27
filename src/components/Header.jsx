
import React from 'react';
import { motion } from "framer-motion";
import { AlertTriangle, Sun, Moon, Mountain } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/components/auth/AuthContext';

export function Header({ isDarkMode, setIsDarkMode }) {
  const { user, logout, setIsAuthModalOpen } = useAuth();

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="alert-banner"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            <span>Important Safety Alert: Stay vigilant and follow local authority guidelines</span>
          </div>
        </div>
      </motion.div>

      <header className="nav-header mt-16">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="logo-container">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="hidden md:block">My Jammu & Kashmir</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle theme"
              />
              <Moon className="h-4 w-4" />
            </div>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden md:block">Welcome, {user.email || user.phoneNumber || "Guest"}</span>
                <Button variant="outline" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
