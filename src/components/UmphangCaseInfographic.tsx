"use client";

import React, { useState } from "react";
import { 
  Fuel, 
  Hotel, 
  Utensils, 
  FileText, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Maximize2, 
  TrendingUp, 
  DollarSign, 
  Zap,
  Car,
  Download,
  ArrowLeft
} from "lucide-react";

interface UmphangCaseInfographicProps {
  onBackToSystem?: () => void;
}

export default function UmphangCaseInfographic({ onBackToSystem }: UmphangCaseInfographicProps) {
  const [viewMode, setViewMode] = useState<"interactive" | "poster">("interactive");

  return (
    <div className="space-y-6">
      {/* Top Header & Main Card - โทนสว่าง (Executive Light Theme) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-slate-800 relative space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                จุดตัดทางสถิติ (Contrast Data)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Executive Presentation (16:9 Widescreen)
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                โทนสว่าง เข้าใจง่าย ชัดเจน
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              "กระดาษ 1 แผ่น <span className="text-amber-600 underline decoration-amber-400 decoration-wavy">6 บาท</span>... กับต้นทุนจริง <span className="text-rose-600 underline decoration-rose-400">3,000 กว่าบาท</span>"
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>กรณีศึกษา: การเดินทางจาก <strong className="text-slate-900 font-bold">สส.อุ้มผาง</strong> สู่ <strong className="text-slate-900 font-bold">สท.ตาก</strong> เพื่อคัดแบบแสดงรายการภาษี</span>
            </p>
          </div>

          {/* Actions & Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
            {onBackToSystem && (
              <button
                onClick={onBackToSystem}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center gap-1.5 border border-slate-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>กลับสู่ภาพรวมระบบ</span>
              </button>
            )}

            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setViewMode("interactive")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "interactive" 
                    ? "bg-[#0F2942] text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>อินโฟกราฟิกแบบโต้ตอบ</span>
              </button>
              <button
                onClick={() => setViewMode("poster")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "poster" 
                    ? "bg-[#0F2942] text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>โปสเตอร์นำเสนอ (16:9)</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === "interactive" ? (
          /* Interactive Infographic Content - โทนสว่าง */
          <div className="space-y-6">
            
            {/* Concept Highlight Banner */}
            <div className="bg-gradient-to-r from-amber-50 via-slate-50 to-rose-50 border-2 border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  VS
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">เปรียบเทียบแบบ Side-by-Side: ต้นทุนบนกระดาษ VS ต้นทุนชีวิตจริง</h3>
                  <p className="text-xs text-slate-600 font-light">
                    สะท้อนความเหลื่อมล้ำทางภูมิศาสตร์และความจำเป็นเร่งด่วนของการขับเคลื่อนสู่ Digital Tax Services
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 bg-white px-4 py-2 rounded-xl border border-rose-200 shadow-xs">
                <span className="text-[11px] text-slate-500 block">ส่วนต่างต้นทุนที่ประชาชนต้องแบกรับ</span>
                <span className="text-xl font-black text-rose-600">สูงกว่าค่าธรรมเนียม 534 เท่า</span>
              </div>
            </div>

            {/* 3 Main Data Blocks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Data Block 1: The Harsh Reality (4 cols) */}
              <div className="lg:col-span-4 bg-gradient-to-b from-rose-50/70 to-white border-2 border-rose-200 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 border-b border-rose-200/70 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-rose-950">1. The Harsh Reality</h3>
                    <p className="text-[11px] text-rose-700">ตัวเลขความยากลำบากในการเดินทางจริง</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Stat 1 */}
                  <div className="bg-white border border-rose-200 rounded-2xl p-3.5 shadow-2xs">
                    <span className="text-xs text-slate-500 font-medium">ระยะทาง ไป–กลับ</span>
                    <div className="my-1">
                      <span className="text-3xl font-black text-rose-600">500</span>
                      <span className="text-xs font-bold text-slate-600 ml-1">กม.</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block border-t border-slate-100 pt-1">
                      ทล. 1090 + ทล. 12
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-white border border-rose-200 rounded-2xl p-3.5 shadow-2xs">
                    <span className="text-xs text-slate-500 font-medium">โค้งภูเขาสูงชัน</span>
                    <div className="my-1">
                      <span className="text-3xl font-black text-amber-600">1,219</span>
                      <span className="text-xs font-bold text-slate-600 ml-1">โค้ง</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block border-t border-slate-100 pt-1">
                      ช่วงอุ้มผาง – แม่สอด
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-white border border-rose-200 rounded-2xl p-3.5 shadow-2xs">
                    <span className="text-xs text-slate-500 font-medium">เวลาขับรถบนเขา</span>
                    <div className="my-1">
                      <span className="text-2xl font-black text-orange-600">10–12</span>
                      <span className="text-xs font-bold text-slate-600 ml-1">ชม.</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block border-t border-slate-100 pt-1">
                      ความเร็วเฉลี่ย ~35–45 กม./ชม.
                    </span>
                  </div>

                  {/* Stat 4 */}
                  <div className="bg-white border border-rose-200 rounded-2xl p-3.5 shadow-2xs">
                    <span className="text-xs text-slate-500 font-medium">เวลาภารกิจขั้นต่ำ</span>
                    <div className="my-1">
                      <span className="text-2xl font-black text-red-600">2 วัน</span>
                      <span className="text-xs font-bold text-slate-600 ml-1">1 คืน</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block border-t border-slate-100 pt-1">
                      ไม่สามารถไป–กลับวันเดียวได้
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-rose-100/70 border border-rose-300 flex items-start gap-2.5">
                  <Car className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-rose-900 leading-relaxed">
                    เส้นทางสายนี้ได้รับการขนานนามว่า <strong>"ถนนลอยฟ้า"</strong> มีความสูงชัน คดเคี้ยว และเสี่ยงดินถล่มในฤดูฝนสูงที่สุดแห่งหนึ่งในไทย
                  </p>
                </div>
              </div>

              {/* Data Block 2: The Cost Breakdown (4 cols) */}
              <div className="lg:col-span-4 bg-gradient-to-b from-amber-50/70 to-white border-2 border-amber-200 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 border-b border-amber-200/70 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-amber-950">2. The Cost Breakdown</h3>
                    <p className="text-[11px] text-amber-700">แจกแจงค่าใช้จ่ายจริงรวม ~3,206 บาท</p>
                  </div>
                </div>

                {/* Donut Chart Visual */}
                <div className="flex items-center justify-around py-1 bg-white p-3 rounded-2xl border border-amber-200/70 shadow-2xs">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      {/* Fuel 59% */}
                      <path className="text-rose-500" strokeDasharray="59, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      {/* Hotel 25% */}
                      <path className="text-amber-500" strokeDasharray="25, 100" strokeDashoffset="-59" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      {/* Food 16% */}
                      <path className="text-sky-500" strokeDasharray="16, 100" strokeDashoffset="-84" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-slate-500">รวมทั้งหมด</span>
                      <span className="text-lg font-black text-slate-900">~3,206</span>
                      <span className="text-[9px] text-slate-500">บาท</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="text-slate-700">ค่าน้ำมัน <strong>59%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-slate-700">ค่าที่พัก <strong>25%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                      <span className="text-slate-700">ค่าอาหาร <strong>16%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-700 font-bold">ค่าธรรมเนียม &lt;0.2%</span>
                    </div>
                  </div>
                </div>

                {/* Table Breakdown */}
                <div className="space-y-2 border-t border-amber-200/80 pt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-rose-500" /> ค่าน้ำมันรถยนต์ (~500 กม.)
                    </span>
                    <span className="font-bold text-rose-700">~1,900 บ. (59%)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5 text-amber-600" /> ค่าที่พักในเมืองตาก (1 คืน)
                    </span>
                    <span className="font-bold text-amber-700">~800 บ. (25%)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-sky-600" /> ค่าครองชีพ/อาหาร (2 วัน)
                    </span>
                    <span className="font-bold text-sky-700">~500 บ. (16%)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 rounded-xl bg-emerald-100 border-2 border-emerald-300">
                    <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" /> ค่าธรรมเนียมคัดแบบราชการ
                    </span>
                    <span className="font-black text-emerald-800 text-sm">6 บาท (&lt; 0.2%)</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-600 bg-amber-100/50 p-2 rounded-xl border border-amber-200">
                  *(กรณีไปราชการ: เบิกค่าพาหนะ 4 บ./กม. + เบี้ยเลี้ยง + ที่พัก รวม <strong>~3,280 – 3,980 บาท</strong>)
                </div>
              </div>

              {/* Data Block 3: Key Contrast (4 cols) */}
              <div className="lg:col-span-4 bg-gradient-to-b from-emerald-50/70 to-white border-2 border-emerald-200 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 border-b border-emerald-200/70 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-emerald-950">3. Key Contrast</h3>
                    <p className="text-[11px] text-emerald-700">หมัดฮุกเปรียบเทียบมิติความคุ้มค่า 2 ฝั่ง</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Traditional */}
                  <div className="bg-rose-50/80 border-2 border-rose-300 rounded-2xl p-3 flex flex-col justify-between text-center space-y-3 shadow-2xs">
                    <div className="border-b border-rose-200 pb-1.5">
                      <span className="text-[10px] uppercase font-bold text-rose-700 block">แบบเดิม</span>
                      <span className="text-xs font-black text-rose-950">ไปติดต่อเอง สท.ตาก</span>
                    </div>

                    <div className="space-y-2 text-left text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">ค่าใช้จ่าย</span>
                        <strong className="text-rose-700 text-sm">~3,200+ บาท</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">เวลาที่ใช้</span>
                        <strong className="text-rose-800">2 วัน (1,200 นาที)</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">ความเสี่ยง</span>
                        <strong className="text-rose-600 text-[11px]">ทางเขา 1,219 โค้ง</strong>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-xl text-center border border-rose-200">
                      <span className="text-[9px] text-slate-500 block">ส่วนต่างต้นทุน</span>
                      <span className="text-xs font-black text-rose-700">สูงกว่าค่าธรรมเนียม <span className="text-amber-600">534 เท่า</span></span>
                    </div>
                  </div>

                  {/* Digital Online */}
                  <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 flex flex-col justify-between text-center space-y-3 shadow-sm">
                    <div className="border-b border-emerald-200 pb-1.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 block">บริการดิจิทัล</span>
                      <span className="text-xs font-black text-emerald-950">Digital Tax Online</span>
                    </div>

                    <div className="space-y-2 text-left text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">ค่าใช้จ่าย</span>
                        <strong className="text-emerald-700 text-sm">0 บาท (ฟรี)</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">เวลาที่ใช้</span>
                        <strong className="text-emerald-800">ไม่เกิน 5 นาที</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">ความเสี่ยง</span>
                        <strong className="text-emerald-700 text-[11px]">ปลอดภัย ทำจากบ้าน</strong>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-xl text-center border border-emerald-300">
                      <span className="text-[9px] text-slate-500 block">ผลลัพธ์</span>
                      <span className="text-xs font-black text-emerald-700">ประหยัดค่าใช้จ่าย <span className="text-emerald-600">100%</span></span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-100/70 border border-emerald-300 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <p className="text-[11px] text-emerald-950 leading-relaxed font-medium">
                    ขจัดความเหลื่อมล้ำทางภูมิศาสตร์ด้วยระบบสแกนบัตรประชาชน & ดิจิทัล e-Seal แบบเรียลไทม์
                  </p>
                </div>
              </div>

            </div>

            {/* Footer Hook & Key Takeaway - โทนสว่าง */}
            <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border-2 border-blue-200/80 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-lg sm:text-xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
                  <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                  "ทำไมต้องเดินทาง 500 กม. ในเมื่อทุกอย่างอยู่บนหน้าจอ?"
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-light">
                  ยกระดับบริการสรรพากรสู้ยุคดิจิทัล ด้วยระบบ <strong className="text-blue-900 font-bold underline decoration-emerald-500">คัดแบบแสดงรายการฯ ได้ที่ สาขาใกล้บ้านคุณ</strong>
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href="/umphang_tax_cost_infographic.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#0F2942] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>ดูภาพความละเอียดสูง 16:9</span>
                </a>
              </div>
            </div>

          </div>
        ) : (
          /* Poster 16:9 Display */
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
              <img
                src="/umphang_tax_cost_infographic.jpg"
                alt="Infographic Poster: Bridging the Gap - Cost of Citizen Travel vs Digital Tax Services (16:9)"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>ภาพกราฟิกอัตราส่วน 16:9 สำหรับฉายขึ้นจอภาพสไลด์และจอภาพในห้องประชุม</span>
              <a
                href="/umphang_tax_cost_infographic.jpg"
                download="Umphang_Tax_Cost_Contrast_Infographic_16x9.jpg"
                className="text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ดาวน์โหลดภาพต้นฉบับ</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
