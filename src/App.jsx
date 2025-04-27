
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Hotel as Hospital, Inspect as Police, MapPin, MessageSquare, Bus as Ambulance, Flame as FireExtinguisher, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AuthModal } from "@/components/auth/AuthModal";
import { AuthRequired } from "@/components/auth/AuthRequired";
import { Header } from "@/components/Header";
import { FeedbackSection } from "@/components/FeedbackSection";
import { RegionSelector } from "@/components/RegionSelector";
import { EmergencyContact } from "@/components/EmergencyContact";
import { useAuth } from "@/components/auth/AuthContext";

function App() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('srinagar');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location Access Granted",
            description: "We can now provide location-based safety information.",
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Location Access Denied",
            description: "Please enable location services for better safety information.",
          });
        }
      );
    }
  }, []);

  const emergencyContacts = {
    srinagar: [
      { name: "Srinagar Police Control Room", number: "0194-2477568", icon: Police },
      { name: "SMHS Hospital", number: "0194-2452052", icon: Hospital },
      { name: "Tourist Emergency Helpline", number: "1363", icon: Phone },
      { name: "Fire Emergency", number: "101", icon: FireExtinguisher },
      { name: "Ambulance Service", number: "102", icon: Ambulance },
      { name: "Women Helpline", number: "1091", icon: Phone },
      { name: "District Control Room", number: "0194-2452138", icon: Phone },
      { name: "Anti-Terror Helpline", number: "1090", icon: Shield }
    ],
    pahalgam: [
      { name: "Pahalgam Police Station", number: "01936-243232", icon: Police },
      { name: "District Hospital Anantnag", number: "01932-222201", icon: Hospital },
      { name: "Tourist Emergency Helpline", number: "1363", icon: Phone },
      { name: "Fire Emergency", number: "101", icon: FireExtinguisher },
      { name: "Ambulance Service", number: "102", icon: Ambulance },
      { name: "Women Helpline", number: "1091", icon: Phone }
    ],
    gulmarg: [
      { name: "Gulmarg Police Station", number: "01954-254244", icon: Police },
      { name: "Sub-District Hospital", number: "01954-254230", icon: Hospital },
      { name: "Tourist Emergency", number: "1363", icon: Phone },
      { name: "Mountain Rescue", number: "01954-254291", icon: Shield }
    ],
    // Add more regions as needed
  };

  const safeAreas = {
    srinagar: [
      {
        name: "Dal Lake Area",
        description: "Well-monitored tourist zone with regular police patrols",
        safetyLevel: "High",
      },
      {
        name: "Lal Chowk",
        description: "Central business district with 24/7 security",
        safetyLevel: "High",
      },
    ],
    pahalgam: [
      {
        name: "Betaab Valley",
        description: "Well-patrolled tourist spot with regular security checks",
        safetyLevel: "High",
      },
      {
        name: "Aru Valley",
        description: "Popular destination with dedicated tourist police",
        safetyLevel: "High",
      },
    ],
    // Add more regions
  };

  const safetyTips = [
    "Always carry identification documents",
    "Keep emergency contact numbers saved",
    "Stay updated with local weather conditions",
    "Register with local police station upon arrival",
    "Travel in groups when possible",
    "Share your itinerary with family/friends",
    "Keep local emergency numbers handy",
    "Avoid traveling after dark",
    "Stay connected with local authorities",
    "Download offline maps for emergency",
  ];

  const visitorStories = [
    {
      name: "Sarah Thompson",
      date: "April 20, 2025",
      story: "Had a wonderful and safe trip to Kashmir. The local authorities were very helpful and responsive.",
    },
    {
      name: "Raj Patel",
      date: "April 15, 2025",
      story: "The emergency response system here is excellent. Felt very secure throughout my stay.",
    },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select a file smaller than 5MB",
        });
        return;
      }
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: "Your image has been selected successfully",
      });
    }
  };

  const handleSubmitFeedback = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to submit feedback",
      });
      return;
    }

    if (!feedback.trim()) {
      toast({
        variant: "destructive",
        title: "Feedback required",
        description: "Please write your feedback before submitting",
      });
      return;
    }
    
    // Here we would integrate with a database
    toast({
      title: "Thank you for your feedback!",
      description: "Your experience will help other tourists stay safe.",
    });
    setFeedback("");
    setSelectedFile(null);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-background`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AuthModal />

      <AuthRequired>
        <main className="container mx-auto px-4 pt-20">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-center mb-8">Kashmir Tourist Safety Portal</h1>
            
            <RegionSelector
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="safety-card">
                <h2 className="text-2xl font-semibold mb-4">Current Safety Status</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Area is under increased security measures. Tourist activities are being monitored
                  and protected by local authorities.
                </p>
              </div>

              <div className="safety-card">
                <h2 className="text-2xl font-semibold mb-4">Weather & Alerts</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {userLocation ? "Location access enabled - receiving local alerts" : "Enable location for local alerts"}
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    toast({
                      title: "Alert System Active",
                      description: `You will receive real-time safety alerts for ${selectedRegion} area.`,
                    });
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Enable Alerts
                </Button>
              </div>
            </div>
          </motion.section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Safe Tourist Areas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {safeAreas[selectedRegion]?.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="safety-card"
                >
                  <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{area.description}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                    Safety Level: {area.safetyLevel}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Emergency Contacts</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {emergencyContacts[selectedRegion]?.map((contact, index) => (
                <EmergencyContact key={index} contact={contact} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Safety Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {safetyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="safety-card"
                >
                  <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Visitor Stories</h2>
            {visitorStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="story-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="font-semibold">{story.name}</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">({story.date})</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{story.story}</p>
              </motion.div>
            ))}
          </section>

          <FeedbackSection
            feedback={feedback}
            setFeedback={setFeedback}
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            handleSubmitFeedback={handleSubmitFeedback}
          />
        </main>
      </AuthRequired>
      <Toaster />
    </div>
  );
}

export default App;
