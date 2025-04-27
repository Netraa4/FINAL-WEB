
import React from 'react';
import { motion } from "framer-motion";
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/components/auth/AuthContext';

export function FeedbackSection({ 
  feedback, 
  setFeedback, 
  selectedFile, 
  handleFileChange, 
  handleSubmitFeedback 
}) {
  const { user, setIsAuthModalOpen } = useAuth();

  const handleAction = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    handleSubmitFeedback();
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Share Your Experience</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="safety-card"
      >
        <div className="space-y-4">
          {!user && (
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Please sign in to share your experience
              </p>
            </div>
          )}
          
          <div>
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Share your experience and safety tips..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-2"
              disabled={!user}
            />
          </div>
          
          <div>
            <Label htmlFor="photo">Upload Photos (Optional)</Label>
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => document.getElementById('photo').click()}
                className="w-full"
                disabled={!user}
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedFile ? selectedFile.name : "Select Photo"}
              </Button>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={!user}
              />
            </div>
          </div>

          <Button
            onClick={handleAction}
            className="w-full"
          >
            {user ? "Submit Feedback" : "Sign in to Submit"}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
