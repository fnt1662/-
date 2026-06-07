import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { TargetAudience } from "./components/TargetAudience";
import { ExpectedBenefits } from "./components/ExpectedBenefits";
import { Dashboard } from "./components/Dashboard";
import { AiChat } from "./components/AiChat";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentView, setView] = useState<string>("home");

  return (
    <div className="min-h-screen bg-white text-gray-850 flex flex-col font-sans transition-colors duration-150">
      
      {/* Persistent Navbar */}
      <Navbar currentView={currentView} setView={setView} />

      {/* Main Dynamically Rendered Content Area with micro-animations */}
      <main className="flex-grow animate-fade-in">
        {currentView === "home" && (
          <div className="space-y-0">
            <Hero setView={setView} />
            <Features />
            <TargetAudience />
            <ExpectedBenefits />
          </div>
        )}

        {currentView === "dashboard" && (
          <div className="bg-gray-50/30 min-h-[calc(100vh-73px)]">
            <Dashboard />
          </div>
        )}

        {currentView === "ai-doctor" && (
          <div className="bg-gray-50/30 min-h-[calc(100vh-73px)]">
            <AiChat />
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
