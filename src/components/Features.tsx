import React from "react";
import { Cpu, Heart, BarChart3, Clock, AlertTriangle, Smartphone } from "lucide-react";

export const Features: React.FC = () => {
  const list = [
    {
      id: "feat-1",
      icon: <Cpu className="w-8 h-8 text-emerald-600" />,
      tag: "Feature 1",
      title: "ระบบให้อาหารอัตโนมัติ (AI Auto-feeder)",
      description: "อำนวยความสะดวก ประหยัดแรงงานและเวลา คอนโทรลระดับน้ำและอาหารจากเล้าเป็ดได้ทุกที่ทุกเวลา มีเซนเซอร์วัดปริมาณคงเหลืออัจฉริยะที่จะจ่ายอาหารเที่ยงตรงตามสูตรสารอาหารที่เป็ดต้องการ",
      details: [
        { label: "กำหนดเวลาอัจฉริย", desc: "ตั้งค่ามื้อจำเพาะเจาะจง หรือปล่อย AI คำนวณ" },
        { label: "เซนเซอร์น้ำหนักละเอียด", desc: "รู้ทันทีว่าเป็ดบริโภคอาหารไปกี่กรัมต่อวัน" }
      ],
      color: "from-emerald-50 to-emerald-100/30",
      border: "border-emerald-100"
    },
    {
      id: "feat-2",
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      tag: "Feature 2",
      title: "ระบบตรวจสุขภาพและพฤติกรรม (AI Behavior & Disease Detection)",
      description: "กล้อง AI คอมพิวเตอร์วิทัศน์เฝ้าระวังสแกนพฤติกรรมเป็ด ตรวจจับอาการซึม เบื่ออาหาร เดินกะเผลก หรือแยกจากฝูง ช่วยคัดกรองโรคระบาดล่วงหน้าเพื่อรักษาได้ทันท่วงทีและจำกัดวงความสูญเสีย",
      details: [
        { label: "Computer Vision", desc: "วิเคราะห์พฤติกรรมการเคลื่อนไหวและระยะหากลุ่มเป็ด" },
        { label: "ลดอัตราสูญเสีย", desc: "ป้องกันโรคอหิวาต์เป็ด ขจัดความกังวลของคนในฟาร์ม" }
      ],
      color: "from-rose-50/50 to-rose-100/10",
      border: "border-rose-100/60"
    },
    {
      id: "feat-3",
      icon: <BarChart3 className="w-8 h-8 text-cyan-600" />,
      tag: "Feature 3",
      title: "แดชบอร์ดวิเคราะห์ผลภาพรวม (Dashboard & Analytics)",
      description: "สรุปข้อมูลสุขภาพ ปริมาณอาหาร น้ำ สภาพแวดล้อมเล้า (อุณหภูมิ/ความชื้น) ออกมาเป็นภาพกราฟและแดชบอร์ดที่ใช้งานง่าย เข้าถึงได้สะดวก และส่งสัญญาณแจ้งเตือนสีแดงทันทีเมื่อตรวจพบเป็ดป่วย",
      details: [
        { label: "ระบบแจ้งเตือนเชิงรุก", desc: "ส่งข้อมูลเตือนเข้าแจ้งไลน์/แดชบอร์ดเมื่อเกิดวิกฤต" },
        { label: "สถิติสนับสนุนการเรียนรู้", desc: "เปิดให้คุณครูและนักเรียนดึงไฟล์ข้อมูลไปวิเคราะห์" }
      ],
      color: "from-cyan-50 to-cyan-100/30",
      border: "border-cyan-100"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8 border-b border-gray-100" id="features">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">ฟังก์ชันการทำงานหลัก</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            การทำงาน 3 ประสานเพื่อสร้างฟาร์มเป็ดอัจฉริยะ
          </h3>
          <p className="text-gray-600 text-base sm:text-lg">
            ดูแลเล้าเป็ดรอบด้านแบบครบวงจร ตอบโจทย์ผู้ทำเกษตรกรรมชุมชน และเป็นเครื่องมือการทดลองวิทยาศาสตร์จริงสำหรับโรงเรียน
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {list.map((feat) => (
            <div
              key={feat.id}
              className={`flex flex-col justify-between bg-gradient-to-br ${feat.color} rounded-3xl p-8 border ${feat.border} hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-100 transition-all duration-300`}
            >
              <div className="space-y-6">
                <div className="bg-white p-3.5 rounded-2xl w-fit shadow-md shadow-gray-100 border border-gray-100">
                  {feat.icon}
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{feat.tag}</span>
                  <h4 className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug">{feat.title}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{feat.description}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                {feat.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">{detail.label}</h5>
                      <p className="text-[11px] text-gray-500">{detail.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
