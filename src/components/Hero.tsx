import React from "react";
import { ArrowRight, LayoutDashboard, Sparkles, Shield, Cpu, RefreshCw } from "lucide-react";

interface HeroProps {
  setView: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white py-16 md:py-24 px-4 md:px-8 border-b border-gray-100">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10" id="hero-content">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-emerald-200/50">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            ระบบดูแลเป็ดอัจฉริยะด้วย AI สำหรับชุมชนและโรงเรียน
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] font-sans">
            ยกระดับการเลี้ยงเป็ดด้วย <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600">
              เทคโนโลยี AI
            </span> <br />
            เพื่อชุมชนและโรงเรียนที่ยั่งยืน
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
            นวัตกรรมฟาร์มเป็ดเพื่ออนาคต ผสานพลังเทคโนโลยี IoT คัดกรองตรวจสุขภาพอัจฉริยะ ให้อาหารอัตโนมัติแม่นยำ 
            ช่วยส่งเสริมทักษะการเรียนรู้ และยกระดับเศรษฐกิจชุมชนให้พึ่งพาตนเองได้อย่างยั่งยืน
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => setView("dashboard")}
              id="hero-cta-dashboard"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-200 hover:shadow-emerald-300 transition-all text-base flex items-center justify-center gap-2.5 group"
            >
              ดูแดชบอร์ดฟาร์ม
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => setView("ai-doctor")}
              id="hero-cta-chat"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all text-base flex items-center justify-center gap-2"
            >
              ปรึกษาหมอเป็ด AI
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 xl:gap-6 pt-8 max-w-md mx-auto lg:mx-0" id="hero-quick-stats">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <span className="block text-2xl font-bold text-emerald-700">100%</span>
              <span className="text-xs text-gray-500">อัตโนมัติ</span>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <span className="block text-2xl font-bold text-emerald-700">24/7</span>
              <span className="text-xs text-gray-500">ตรวจสุขภาพเป็ด</span>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <span className="block text-2xl font-bold text-emerald-700">&lt; 1 วิ</span>
              <span className="text-xs text-gray-500">แจ้งเตือนทันใจ</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visualization Illustration */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none" id="hero-illustration">
          <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100 shadow-emerald-100/40">
            {/* Header of Device */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-mono text-gray-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" /> live_telemetry.io
              </div>
            </div>

            {/* Simulated Live View */}
            <div className="bg-gray-900 rounded-2xl p-5 text-white relative overflow-hidden h-64 flex flex-col justify-between shadow-inner">
              <div className="absolute top-3 right-3 bg-red-500 text-[10px] text-white font-mono px-2 py-0.5 rounded-full uppercase flex items-center gap-1 select-none font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                LIVE DETECT
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-2 gap-3 z-10">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-gray-300 uppercase">อุณหภูมิเล้า</p>
                  <p className="text-xl font-bold font-mono text-emerald-400">28.4 °C</p>
                  <p className="text-[9px] text-emerald-300">สถานะ: ปกติดี</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-gray-300 uppercase">ระดับน้ำถัง</p>
                  <p className="text-xl font-bold font-mono text-cyan-400">82.5 L</p>
                  <p className="text-[9px] text-cyan-300">สถานะ: เต็มเกณฑ์</p>
                </div>
              </div>

              {/* Feed System Animated Bar */}
              <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 flex items-center justify-between mt-auto">
                <div>
                  <h4 className="text-xs font-semibold text-white">ถังจ่ายอาหารอัตโนมัติ</h4>
                  <p className="text-[10px] text-gray-400">จ่ายอาหารมื้อถัดไป: 12:00 น.</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono text-emerald-400 font-bold">คงเหลือ 74%</span>
                  <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500" style={{ width: "74%" }} />
                  </div>
                </div>
              </div>

              {/* Moving Grid in Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            </div>

            {/* Quick alert bar mockup */}
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200/50 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <p className="text-xs text-amber-900 font-medium">
                <strong>ตรวจสุขภาพอัจฉริยะ:</strong> น้องเป็ด tag #D-04 แสดงอาการซึมช่วงเช้า AI แนะนำเฝ้าระวัง
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
