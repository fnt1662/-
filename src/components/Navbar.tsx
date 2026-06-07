import React from "react";
import { Bird, LayoutDashboard, MessageSquareText, FileText, Info } from "lucide-react";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-emerald-100 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setView("home")}
        id="nav-logo-container"
      >
        <div className="bg-emerald-600 text-white p-2 rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-emerald-200/50">
          <Bird className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1.5 font-sans">
            AI Duck Care <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">PRO</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-sans tracking-wide">ระบบฟาร์มเป็ดอัจฉริยะด้วย AI</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-2" id="nav-links">
        <button
          onClick={() => setView("home")}
          id="nav-btn-home"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            currentView === "home"
              ? "bg-emerald-50 text-emerald-700 font-bold"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          หน้าแรก
        </button>
        <button
          onClick={() => {
            setView("dashboard");
          }}
          id="nav-btn-dashboard"
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
            currentView === "dashboard"
              ? "bg-emerald-50 text-emerald-700 font-bold"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          แดชบอร์ดฟาร์ม
        </button>
        <button
          onClick={() => setView("ai-doctor")}
          id="nav-btn-chat"
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
            currentView === "ai-doctor"
              ? "bg-emerald-50 text-emerald-700 font-bold"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <MessageSquareText className="w-4 h-4 text-emerald-500" />
          หมอเป็ด AI
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setView("dashboard")}
          id="nav-btn-cta"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-200/50 flex items-center gap-1.5"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          ดูแดชบอร์ดฟาร์ม
        </button>
      </div>
    </nav>
  );
};
