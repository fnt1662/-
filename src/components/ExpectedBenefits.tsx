import React from "react";
import { TrendingUp, ShieldAlert, Sparkles, Network } from "lucide-react";

export const ExpectedBenefits: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      title: "1. เพิ่มปริมาณผลผลิต (Maximize Production)",
      desc: "การให้อาหารและน้ำที่มีความสะอาด ได้มาตรฐาน ตรงเวลา และสูตรอาหารที่ผ่านการคำนวณสรีระของเป็ด ช่วยกระตุ้นการเจริญเติบโตที่สมบูรณ์ เพิ่มปริมาณไข่และเนื้อสูงถึง 30%"
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
      title: "2. ลดความเสี่ยงในการสูญเสีย (Minimize Risk)",
      desc: "ระบบตรวจโรคและแจ้งเตือนพฤติกรรมผิดปกติด้วย AI สแกนอาการไข้หวัดนกและอหิวาต์ ช่วยให้ปศุสัตว์จำกัดวงเป็ดป่วยได้รวดเร็ว ลดสถิติเป็ดล้มตายกะทันหันอย่างเห็นผลชัดเจน"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      title: "3. แหล่งเทคโนโลยีเรียนรู้จริง (STEM Learning Center)",
      desc: "ผลใช้เป็นพื้นที่ทดลองวิทยาศาสตร์แนวใหม่ในโรงเรียน ส่งเสริมให้นักเรียนพัฒนาโครงงานระบบอัจฉริยะ รู้จักใช้ AI, เซนเซอร์บอร์ด และวิเคราะห์สถิติกราฟด้วยสายตาตัวเอง"
    },
    {
      icon: <Network className="w-6 h-6 text-indigo-600" />,
      title: "4. ชุมชนพึ่งพาตัวเองได้อย่างเข้มแข็ง (Strong Community)",
      desc: "สร้างห่วงโซ่มั่นคงทางอาหาร เพิ่มประสิทธิภาพวิสาหกิจฟาร์มชุมชน ต่อยอดเป็นผลิตภัณฑ์ไข่เค็มอัจฉริยะ ปัญญาประดิษฐ์สร้างแบรนด์ เพิ่มมูลค่าเชิงพาณิชย์"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8 border-b border-gray-100" id="benefits">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">ผลลัพธ์ที่คาดหวัง</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            ผลสัมฤทธิ์ที่ชุมชนและสมาชิกจะได้รับ
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            เป้าหมายสูงสุดคือการสร้างฟาร์มเลี้ยงเป็ดที่บริหารแบบเรียบง่าย ปลอดภัย เพิ่มผลลัพธ์พูนสุขอย่างมีหลักวิชาการ
          </p>
        </div>

        {/* Bento Grid Concept for Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => (
            <div 
              key={idx} 
              className="bg-gray-50/40 border border-gray-100 rounded-3xl p-6 flex gap-5 hover:bg-emerald-50/20 hover:border-emerald-100 transition-all duration-300"
            >
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 h-fit shrink-0">
                {b.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-gray-900">{b.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
