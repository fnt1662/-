import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Coffee, 
  Droplets,
  Thermometer,
  Cloud,
  Bell,
  AlertOctagon,
  RotateCcw,
  HeartPulse,
  CheckCircle2,
  ListRestart
} from "lucide-react";
import { DuckHealthRecord, MetricState, FarmAlert } from "../types";

export const Dashboard: React.FC = () => {
  // Initial metrics
  const [metrics, setMetrics] = useState<MetricState>({
    foodLevel: 74,
    waterLevel: 82,
    temperature: 28.4,
    humidity: 62.1
  });

  // Initial ducks
  const [ducks, setDucks] = useState<DuckHealthRecord[]>([
    { id: "1", tagNo: "TAG-D01", status: "healthy", behavior: "เดินเล่นปกติ, กินเยอะ", temperature: 39.1, lastChecked: "เมื่อสักครู่" },
    { id: "2", tagNo: "TAG-D02", status: "healthy", behavior: "ว่ายน้ำในบ่อ, ร่าเริง", temperature: 38.9, lastChecked: "5 นาทีที่แล้ว" },
    { id: "3", tagNo: "TAG-D03", status: "healthy", behavior: "พักผ่อนในร่ม, คุ้ยดิน", temperature: 39.3, lastChecked: "12 นาทีที่แล้ว" },
    { id: "4", tagNo: "TAG-D04", status: "healthy", behavior: "ว่ายน้ำจับปลา, เดินปกติ", temperature: 39.0, lastChecked: "18 นาทีที่แล้ว" },
    { id: "5", tagNo: "TAG-D05", status: "healthy", behavior: "ไซ้ขนบริเวณลานกลางแจ้ง", temperature: 39.2, lastChecked: "1 ชั่วโมงที่แล้ว" },
  ]);

  // Initial alerts
  const [alerts, setAlerts] = useState<FarmAlert[]>([
    {
      id: "a1",
      timestamp: "วันนี้ 06:15 น.",
      type: "info",
      title: "ระบบอาหารอัตโนมัติทำงาน",
      message: "เปิดตัวจ่ายอาหารเช้าเรียบร้อย 2.5 กิโลกรัม สำเร็จเสร็จสิ้น",
      resolved: true
    }
  ]);

  // State for popups/alerts
  const [activePopupAlert, setActivePopupAlert] = useState<FarmAlert | null>(null);
  const [isFeedingRunning, setIsFeedingRunning] = useState(false);
  const [isWaterFillingRunning, setIsWaterFillingRunning] = useState(false);

  // Fluctuating environment simulator (makes it look live!)
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => {
        const isSick = ducks.some(d => d.status === "sick");
        // if duck is sick, maybe temperature rises slightly or stays slightly warm
        const tempFluctuation = (Math.random() - 0.5) * 0.4;
        const humidFluctuation = (Math.random() - 0.5) * 0.6;
        
        return {
          ...prev,
          temperature: parseFloat(Math.min(Math.max(prev.temperature + tempFluctuation, 26.0), 32.0).toFixed(1)),
          humidity: parseFloat(Math.min(Math.max(prev.humidity + humidFluctuation, 50.0), 75.0).toFixed(1))
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [ducks]);

  // Manual Trigger: Feed Ducks
  const handleFeeding = () => {
    if (isFeedingRunning) return;
    setIsFeedingRunning(true);
    
    // Increment food level
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        foodLevel: Math.min(prev.foodLevel + 15, 100)
      }));
      setAlerts(prev => [
        {
          id: `a-${Date.now()}`,
          timestamp: "เมื่อสักครู่",
          type: "info",
          title: "สั่งจ่ายอาหารด้วยตนเอง",
          message: "ระบบสั่งจ่ายอาหารเพิ่มเติมสำเร็จ เสริมสูตรโภชนาการพรีเมียม",
          resolved: true
        },
        ...prev
      ]);
      setIsFeedingRunning(false);
    }, 2000);
  };

  // Manual Trigger: Refill Water
  const handleWaterRefill = () => {
    if (isWaterFillingRunning) return;
    setIsWaterFillingRunning(true);
    
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        waterLevel: Math.min(prev.waterLevel + 12, 100)
      }));
      setAlerts(prev => [
        {
          id: `a-${Date.now()}`,
          timestamp: "เมื่อสักครู่",
          type: "info",
          title: "สั่งเติมน้ำอัตโนมัติ",
          message: "น้ำยาฆ่าเชื้อเข้มข้นเจือจางถูกคัดกรองผสมลงถังน้ำเรียบยอดเยี่ยม",
          resolved: true
        },
        ...prev
      ]);
      setIsWaterFillingRunning(false);
    }, 2000);
  };

  // Simulate AI Detecting a Sick Duck (as requested for visual testing)
  const handleSimulateSickDuck = () => {
    // Modify one duck (e.g. tag TAG-D04) to represent sick symptoms
    setDucks(prev => prev.map(d => {
      if (d.tagNo === "TAG-D04") {
        return {
          ...d,
          status: "sick",
          behavior: "ซึมหนักมาก, แยกฝูงอย่างชัดเจน, ไม่รับอาหาร, คอตกสั่น",
          temperature: 42.6,
          lastChecked: "วิเคราะห์สดโดย AI"
        };
      }
      return d;
    }));

    const sickAlert: FarmAlert = {
      id: `alert-sick-${Date.now()}`,
      timestamp: "เมื่อสักครู่",
      type: "danger",
      title: "🚨 ตรวจพบเป็ดมีอาการป่วยรุนแรง (วิกฤต)!",
      message: "AI Camera ตัวที่ 2 สแกนพบพฤติกรรมเป็ด TAG-D04 ซึมหนัก ยืนคอตก แยกฝูงมากกว่า 15 นาที และมีค่าอุณหภูมิกายสูงผิดปกติ (42.6 °C) มีความเสี่ยงอหิวาต์เป็ดสูง!",
      resolved: false
    };

    setAlerts(prev => [sickAlert, ...prev]);
    setActivePopupAlert(sickAlert);
  };

  // Resolve All Alerts (Heal action)
  const handleResolveAlerts = () => {
    setDucks(prev => prev.map(d => {
      if (d.tagNo === "TAG-D04") {
        return {
          ...d,
          status: "healthy",
          behavior: "อาการกลับมาปลอดภัย, คึกคักเดินเล่นปกติ",
          temperature: 39.0,
          lastChecked: "ตรวจสอบหลังทำความสะอาดเล้า"
        };
      }
      return d;
    }));
    setActivePopupAlert(null);
    setAlerts(prev => prev.map(a => ({ ...a, resolved: true })));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8 space-y-10" id="dashboard-view">
      
      {/* Red Pulse Banner for active sick duck notifications */}
      {ducks.some(d => d.status === "sick") && (
        <div className="bg-red-50 border-2 border-red-500 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse" id="sick-duck-banner">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-red-500 text-white p-3.5 rounded-full shadow-lg">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-red-900 font-sans">
                ⚠️ คำเตือนสีแดง: ระบบ AI ตรวจพบเป็ดป่วยวิกฤตใดยี่ห้อหนึ่ง!
              </h3>
              <p className="text-sm text-red-700 font-sans">
                สลักตรวจจับ ID: <strong className="underline">D04 (อุณหภูมิร่างกายขึ้นสูงถึง 42.6°C ซึมนิ่ง แยกฝูง)</strong> แนะนำกักกันเป็ดออกจากคอกทันทีเพื่อป้องกันการระบาด!
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <button
              onClick={handleResolveAlerts}
              className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <HeartPulse className="w-4 h-4" />
              ทำความสะอาดเล้าและรักษาเสร็จสิ้น
            </button>
          </div>
        </div>
      )}

      {/* Grid: Live Gauges / Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="dashboard-gauges">
        
        {/* Gauge: Remaining Food */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-bold text-gray-500 font-sans uppercase">ปริมาณอาหารคงเหลือ</h4>
              <p className="text-4xl font-extrabold font-mono text-emerald-750 mt-1">{metrics.foodLevel}%</p>
            </div>
            <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>
          
          {/* Custom SVG Graphic Gauge (representing remaining food level circular meter) */}
          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${metrics.foodLevel < 35 ? "bg-amber-500" : "bg-emerald-600"}`} 
              style={{ width: `${metrics.foodLevel}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleFeeding}
              disabled={isFeedingRunning}
              className="w-full text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/50 hover:border-emerald-200 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isFeedingRunning ? "กำลังสับจ่าย..." : "สั่งเครื่องเติมอาหารเมล็ด"}
            </button>
          </div>
        </div>

        {/* Gauge: Remaining Water */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-bold text-gray-500 font-sans uppercase">ปริมาณน้ำคงเหลือ</h4>
              <p className="text-4xl font-extrabold font-mono text-cyan-700 mt-1">{metrics.waterLevel}%</p>
            </div>
            <div className="bg-cyan-100 text-cyan-700 p-2.5 rounded-xl">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-cyan-500 rounded-full transition-all duration-1000" style={{ width: `${metrics.waterLevel}%` }} />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleWaterRefill}
              disabled={isWaterFillingRunning}
              className="w-full text-center bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200/50 hover:border-cyan-200 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isWaterFillingRunning ? "กำลังเติมน้ำ..." : "สั่งเครื่องเติมน้ำก๊อกดื่ม"}
            </button>
          </div>
        </div>

        {/* Gauge: Environmental Temp */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-bold text-gray-500 font-sans uppercase">อุณหภูมิภายในเล้า</h4>
              <p className="text-4xl font-extrabold font-mono text-gray-900 mt-1">{metrics.temperature} °C</p>
            </div>
            <div className="bg-amber-100 text-amber-700 p-2.5 rounded-xl">
              <Thermometer className="w-5 h-5" />
            </div>
          </div>
          <div className="text-[11px] text-gray-500 flex justify-between">
            <span>สถานะห้องเล้า: {metrics.temperature > 30.5 ? "ร้อนอบอ้าว (เปิดพัดลม)" : "ถ่ายเทอากาศดี"}</span>
            <span className="font-semibold text-emerald-600">ค่าแปรผันไลฟ์</span>
          </div>
        </div>

        {/* Gauge: Humidity */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-bold text-gray-500 font-sans uppercase">ความชื้นสัมพัทธ์ในเล้า</h4>
              <p className="text-4xl font-extrabold font-mono text-gray-900 mt-1">{metrics.humidity} %</p>
            </div>
            <div className="bg-blue-100 text-blue-700 p-2.5 rounded-xl">
              <Cloud className="w-5 h-5" />
            </div>
          </div>
          <div className="text-[11px] text-gray-500 flex justify-between">
            <span>สถานะดินคอก: {metrics.humidity > 68 ? "ชื้นเกินเกณฑ์" : "แห้งสะอาดพอเหมาะ"}</span>
            <span className="font-semibold text-emerald-600">ค่าแปรผันไลฟ์</span>
          </div>
        </div>

      </div>

      {/* Main Dashboard Layout section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="dashboard-elements">
        
        {/* Duck Health Status and tags (2 columns of width on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-emerald-100 rounded-3xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 font-sans flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 block" />
                  รายชื่อเป็ดที่ติดตั้งแท็กติดตามอัจฉริยะ (IoT Tags)
                </h3>
                <p className="text-xs text-gray-500 mt-1">วิเคราะห์ความผิดปกติล่วงหน้าโดยอาศัย Computer Vision และอุณหภูมิร่างกาย</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleSimulateSickDuck}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  🧪 จำลองอาการเป็ดไข้หวัดนก (D04)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse" id="duck-tags-table">
                <thead>
                  <tr className="border-b border-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-2">ลานแท็กเป็ด</th>
                    <th className="py-3 px-2">พฤติกรรมและการทำกิจกรรม</th>
                    <th className="py-3 px-2 font-mono">อุณหภูมิภายใน</th>
                    <th className="py-3 px-2 text-right">สถานะคัดกรอง</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {ducks.map((duck) => (
                    <tr 
                      key={duck.id} 
                      className={`transition-colors ${duck.status === "sick" ? "bg-red-50/50" : "hover:bg-gray-50/30"}`}
                    >
                      <td className="py-4 px-2 font-extrabold text-emerald-800 font-sans">
                        {duck.tagNo}
                      </td>
                      <td className="py-4 px-2 text-gray-600 font-sans">
                        {duck.behavior}
                      </td>
                      <td className="py-4 px-2 font-mono text-gray-900">
                        {duck.temperature} °C
                      </td>
                      <td className="py-4 px-2 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold uppercase ${
                          duck.status === "sick"
                            ? "bg-red-100 text-red-800 border border-red-200 animate-pulse"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            duck.status === "sick" ? "bg-red-600 animate-ping" : "bg-emerald-600"
                          }`} />
                          {duck.status === "sick" ? "ไม่สบาย / ซึมเกณฑ์" : "ปกติดี"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Real-time Alerts logs sidebar (1 column) */}
        <div className="space-y-6">
          <div className="bg-white border border-emerald-100 rounded-3xl shadow-lg p-6">
            <h3 className="text-lg font-extrabold text-gray-900 font-sans flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-600 animate-bounce" />
                ประวัติบันทึกระบบฟาร์ม
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">{alerts.length} รายการ</span>
            </h3>

            <div className="space-y-4 pt-4 overflow-y-auto max-h-[360px]" id="alerts-history-list">
              {alerts.length === 0 ? (
                <p className="text-xs text-center text-gray-400 py-6">ไม่มีประวัติแจ้งเตือนในขณะนี้</p>
              ) : (
                alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-2xl border transition-all ${
                      alert.type === "danger" 
                        ? "bg-red-50/70 border-red-200 text-red-900" 
                        : alert.type === "warning"
                        ? "bg-amber-50/70 border-amber-200 text-amber-900"
                        : "bg-emerald-50/40 border-emerald-100/50 text-emerald-900"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
                        {alert.timestamp}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        alert.resolved ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                      }`}>
                        {alert.resolved ? "เรียนรู้แล้ว/แก้ไขแล้ว" : "รอดำเนินการ"}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold mt-1.5 font-sans leading-snug">{alert.title}</h4>
                    <p className="text-[11px] mt-1 text-gray-600 leading-relaxed">{alert.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Pop-up modal warning inside frame (Red Popup when AI detects duck sickness - directly from instructions prompt) */}
      {activePopupAlert && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="red-popup-modal">
          <div className="bg-white rounded-3xl border-2 border-red-500 shadow-2xl p-6 md:p-8 max-w-lg w-full space-y-6 relative animate-scale-up">
            <button 
              onClick={() => setActivePopupAlert(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full text-xs"
            >
              ปิด (X)
            </button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-red-100 text-red-600 p-4 rounded-full animate-bounce">
                <AlertOctagon className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-red-900 font-sans uppercase">
                  🚨 AI คัดกรองตรวจพบความผิดปกติวิกฤต!
                </h3>
                <p className="text-xs text-red-500 font-semibold uppercase tracking-wider">
                  ระบบตรวจจับด้วย Computer Vision ในเล้าเป็ดเปิดใช้งานแล้ว
                </p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed bg-red-50/50 p-4 rounded-2xl border border-red-200/50 text-left">
                {activePopupAlert.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleResolveAlerts}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                รีเพลย์แก้ไขสถานการณ์เล้าเป็ดทั้งหมด
              </button>
              <button
                onClick={() => setActivePopupAlert(null)}
                className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium py-3.5 px-4 rounded-2xl transition-all text-sm"
              >
                ละทิ้งคำเตือนชั่วคราว
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
