import React from "react";
import { Bird, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-8 border-t border-gray-800" id="footer">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6" id="footer-inner">
        
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2.5 rounded-xl">
            <Bird className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white text-md font-bold tracking-tight">AI-Powered Duck Care System</h4>
            <p className="text-xs text-gray-500">ระบบฟาร์มเป็ดอัจฉริยะด้วย AI เพื่อชุมชนและโรงเรียนที่ยั่งยืน</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <p className="text-xs">
            พัฒนาขึ้นร่วมกับระบบสารบาลและเทคโนโลยีตรวจจับอัจฉริยะอย่างยั่งยืน
          </p>
          <p className="text-[11px] text-gray-500 flex items-center gap-1">
            สงวนลิขสิทธิ์ © {new Date().getFullYear()} AI Duck Care. สร้างสรรค์ด้วยความหอมหวานและ <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500" /> เพื่อการศึกษาและโรงเรียน
          </p>
        </div>

      </div>
    </footer>
  );
};
