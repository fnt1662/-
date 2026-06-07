import React from "react";
import { GraduationCap, Users, Bookmark, Briefcase, ChevronRight } from "lucide-react";

export const TargetAudience: React.FC = () => {
  return (
    <section className="bg-gray-50/50 py-16 md:py-24 px-4 md:px-8 border-b border-gray-100" id="target-audience">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">กลุ่มเป้าหมายผู้ใช้งาน</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            นวัตกรรมร่วมสร้างคุณค่าให้สองเสาหลัก
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            ออกแบบขึ้นพิเศษเพื่อให้เข้าถึงง่าย เหมาะสำหรับคุณครู นักเรียน และคนในชุมชนทั่วไป แม้ไม่มีพื้นฐานเทคโนโลยี
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card 1: School */}
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-lg shadow-emerald-50/30 flex flex-col justify-between hover:border-emerald-200 transition-all group">
            <div className="space-y-6">
              <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-extrabold text-gray-900">แหล่งเรียนรู้สมัยใหม่สำหรับ 'โรงเรียน'</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  เปลี่ยนฟาร์มโรงเรียนให้เป็นศูนย์รวมสะเต็มศึกษา (STEM Education) ปลูกฝังนักเรียนให้มีความคิดสร้างสรรค์และเข้าใจวิทยาศาสตร์ข้อมูลจากการลงมือปฏิบัติจริง
                </p>
              </div>

              {/* Subbullets */}
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center shrink-0">1</span>
                  <span><strong>เรียนรู้เทคโนโลยี AI และ IoT:</strong> นักเรียนได้ฝึกเก็บข้อมูล สังเกตการณ์ ทำกราฟสภาพอากาศ และวิเคราะห์พฤติกรรมสัตว์จริง</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center shrink-0">2</span>
                  <span><strong>เพาะบ่มสำนึกวิชาการคลังอาหาร:</strong> ส่งเสริมโครงการอาหารกลางวันโรงเรียนด้วยไข่เป็ดสดสะอาด ปลอดโรค ผลิตผลจากเทคโนโลยีฝีมือพวกเขาเอง</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Community */}
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-lg shadow-emerald-50/30 flex flex-col justify-between hover:border-emerald-200 transition-all group">
            <div className="space-y-6">
              <div className="bg-lime-100 text-lime-800 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-extrabold text-gray-900">ส่งเสริมสุขภาวะยั่งยืนแด่ 'คนในชุมชน'</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  เป็นพี่เลี้ยงอัจฉริยะที่ช่วยเหลือกลุ่มเกษตรกรและผู้บริโภคในท้องถิ่น ลดอัตราการล้มป่วยและฟาร์มเสียหาย เพิ่มความมั่นใจและคุณภาพผลผลิตให้ทำเงินได้ต่อเนื่องเป็นกอบเป็นกำ
                </p>
              </div>

              {/* Subbullets */}
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-lime-50 text-lime-700 font-bold flex items-center justify-center shrink-0">1</span>
                  <span><strong>ยกระดับรายได้ถาวร:</strong> แนะนำราคาไข่เป็ด เผยแพร่ทักษะค้ำจุนกลุ่มสตรี เกษตรกรสูงอายุ และสร้างวิสาหกิจชุมชนครบวงจร</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-lime-50 text-lime-700 font-bold flex items-center justify-center shrink-0">2</span>
                  <span><strong>ลดภาระดูเฝ้าฟาร์ม:</strong> ชาวบ้านมีเวลาว่างไปรับงานหลักหรือทำเกษตรแขนงอื่นได้อย่างสบายใจ โดยมี AI คอยเฝ้าระวังภัยพิบัติทางสภาพอากาศและโรค</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
