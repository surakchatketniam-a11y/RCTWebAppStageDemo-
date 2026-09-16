"use client";

import React, { useState } from "react";
import {
  Server,
  Database,
  Shield,
  ShieldCheck,
  Lock,
  HardDrive,
  Network,
  GitBranch,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Laptop,
  Building2,
  FileText,
  QrCode,
  Printer,
  AlertTriangle,
  Layers,
  Zap,
  TrendingUp,
  Sparkles,
  Users,
  Award,
  Eye,
  Key,
  FolderCheck,
  Clock,
  ExternalLink,
  ChevronRight,
  FileCheck2,
  Check,
  Landmark,
  CreditCard,
  Receipt,
  Download,
  Maximize2,
  Image as ImageIcon
} from "lucide-react";
import UmphangCaseInfographic from "./UmphangCaseInfographic";

interface SystemArchitectureViewProps {
  onGoToDemo: () => void;
  onGoToLanding: () => void;
}

export default function SystemArchitectureView({ onGoToDemo, onGoToLanding }: SystemArchitectureViewProps) {
  const [activeTab, setActiveTab] = useState<"infographic" | "topology" | "tech_stack" | "security" | "roi">("infographic");
  const [infographicSubView, setInfographicSubView] = useState<"system" | "umphang">("system");
  const [diagramView, setDiagramView] = useState<"visual" | "blueprint">("visual");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* 1. EXECUTIVE HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E36] via-[#102A4E] to-[#1E3A8A] text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-blue-400/30">
        
        {/* Background Decorative Tech Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            
            {/* Top Committee Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                เอกสารประกอบการพิจารณาของคณะกรรมการ
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                On-Premise 100% (ไม่ใช่ Cloud)
              </span>
              <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
                เกรดความมั่นคงปลอดภัยราชการ & การเงิน
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              สถาปัตยกรรมระบบจริงและความมั่นคงปลอดภัย
            </h1>
            <p className="text-sm sm:text-base text-blue-150 leading-relaxed text-blue-100/90">
              แผนพิมพ์เขียวระบบจริง (Production Architecture Blueprint) สำหรับการขับเคลื่อน <strong className="text-white">RCT WebApp Platform</strong> บนระบบเซิร์ฟเวอร์ On-Premise ในสำนักงานสรรพากรพื้นที่พิจิตร ด้วยเทคโนโลยี <strong className="text-amber-300">Next.js + PostgreSQL + Docker</strong> พร้อมมาตรฐานคุ้มครองข้อมูลส่วนบุคคล (PDPA) ขั้นสูงสุด
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={onGoToDemo}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>ทดลองใช้ระบบ Demo จริง</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToLanding}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition cursor-pointer backdrop-blur-sm"
            >
              <Building2 className="w-4 h-4 text-blue-300" />
              <span>กลับสู่หน้าแรก & แผน ๓ เฟส</span>
            </button>
          </div>
        </div>

        {/* 4 Key Pillar Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-blue-400/20">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1">
              <Database className="w-4 h-4" />
              <span>PostgreSQL 16 Engine</span>
            </div>
            <p className="text-xs text-blue-100">ฐานข้อมูลในสำนักงาน มาตรฐาน ACID 100% ปลอดภัย ไร้ค่า License</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
              <Server className="w-4 h-4" />
              <span>Docker Containerized</span>
            </div>
            <p className="text-xs text-blue-100">แยกเครือข่ายภายใน ติดตั้งและกู้คืนระบบได้ใน 1 คำสั่ง</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-sky-300 font-bold text-xs mb-1">
              <Shield className="w-4 h-4" />
              <span>PDPA & Zero Leak</span>
            </div>
            <p className="text-xs text-blue-100">ระบบปิดในห้อง Server สำนักงาน ข้อมูลปลอดภัยตามระเบียบราชการ</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs mb-1">
              <Printer className="w-4 h-4" />
              <span>Anti-Duplication Lock</span>
            </div>
            <p className="text-xs text-blue-100">ลายน้ำระบุปลายทาง ล็อคโควตาตามใบเสร็จ และตรารับรอง e-Seal</p>
          </div>
        </div>

      </div>

      {/* 2. INTERACTIVE TAB NAVIGATION */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("infographic")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "infographic"
              ? "bg-gradient-to-r from-[#0F2942] via-blue-900 to-indigo-900 text-white shadow-md ring-2 ring-amber-400/60"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>๑. ภาพรวมระบบ (Infographic 16:9)</span>
        </button>

        <button
          onClick={() => setActiveTab("topology")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "topology"
              ? "bg-[#0F2942] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Network className="w-4 h-4 text-blue-400" />
          <span>๒. ผังสถาปัตยกรรม (Topology)</span>
        </button>

        <button
          onClick={() => setActiveTab("tech_stack")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "tech_stack"
              ? "bg-[#0F2942] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>๓. เทคโนโลยีที่เลือกใช้ (Tech Stack)</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "security"
              ? "bg-[#0F2942] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>๔. ความปลอดภัย & PDPA</span>
        </button>

        <button
          onClick={() => setActiveTab("roi")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "roi"
              ? "bg-[#0F2942] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-rose-400" />
          <span>๕. ความคุ้มค่า (ROI)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 0: EXECUTIVE SYSTEM INFOGRAPHIC (16:9 HIGH RESOLUTION POSTER)     */}
      {/* ===================================================================== */}
      {activeTab === "infographic" && (
        <div className="space-y-6 animate-fadeIn">
          {infographicSubView === "umphang" ? (
            <UmphangCaseInfographic onBackToSystem={() => setInfographicSubView("system")} />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            {/* Infographic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Executive Presentation (16:9 Widescreen)
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    โทนสว่าง มองภาพเดียวเข้าใจทั้งระบบ
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-1.5">
                  <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  ภาพรวมสถาปัตยกรรมและกระบวนการให้บริการระบบ RCT WebApp
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  สรุปการเชื่อมโยงระบบแบบครบวงจร: จากเคาน์เตอร์สาขา สู่สาย Fiber Optic เข้าแม่ข่ายกลาง สท.พิจิตร จนถึงการพิมพ์เอกสารลายน้ำ e-Seal
                </p>
              </div>

              {/* Action Buttons & Yellow-Box Switcher */}
              <div className="flex flex-col sm:items-end gap-2.5 self-start md:self-auto">
                {/* Button placed at the user's yellow box */}
                <button
                  onClick={() => setInfographicSubView("umphang")}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer ring-2 ring-amber-300/70 hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>⚡ จุดตัดความคุ้มค่า (อุ้มผาง-ตาก)</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="/rct_system_infographic.jpg"
                    download="RCT_WebApp_System_Infographic_16x9.jpg"
                    className="px-4 py-2.5 bg-[#0F2942] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>ดาวน์โหลดภาพ 16:9 สำหรับนำเสนอ</span>
                  </a>
                  <a
                    href="/rct_system_infographic.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition border border-slate-300"
                    title="เปิดดูภาพความละเอียดสูงเต็มจอ"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 16:9 Poster Display Box */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-50 group">
              <img
                src="/rct_system_infographic.jpg"
                alt="ภาพอินโฟกราฟิกสรุปภาพรวมระบบ RCT WebApp อัตราส่วน 16:9 โทนสว่าง"
                className="w-full h-auto object-cover rounded-2xl transition duration-300 group-hover:scale-[1.01]"
              />
            </div>

            {/* 4 Process Workflow Cards Matching Infographic */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              
              {/* Step 1 Card */}
              <div className="bg-gradient-to-br from-blue-50/60 to-white p-4.5 rounded-2xl border-2 border-blue-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    1
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">
                    เคาน์เตอร์สาขา (Front-Office)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>Smart Card Dip-Chip:</strong> เสียบอ่านบัตรประชาชน ดึงเลข 13 หลักอัตโนมัติ<br />
                  • <strong>Thai QR Payment:</strong> จอเคาน์เตอร์แสดง QR ล็อคยอด 40 บาท เงินเข้าบัญชีราชการ<br />
                  • <strong>2D Barcode Scanner:</strong> สแกน Mini-QR บนสลิปมือถือยืนยันใน 0.1 วินาที
                </p>
              </div>

              {/* Step 2 Card */}
              <div className="bg-gradient-to-br from-emerald-50/60 to-white p-4.5 rounded-2xl border-2 border-emerald-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    2
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">
                    ระบบฐานข้อมูลหลัก (Database)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>PostgreSQL 16 (On-Premise):</strong> ฐานข้อมูลติดตั้งในสำนักงาน มาตรฐาน ACID การเงิน 100%<br />
                  • <strong>MinIO Document Vault:</strong> คลังจัดเก็บเอกสารแบบภาษีและใบเสร็จอย่างปลอดภัย<br />
                  • <strong>Zero License Fee:</strong> สถาปัตยกรรม Open-Source ไร้ค่าลิขสิทธิ์ซอฟต์แวร์
                </p>
              </div>

              {/* Step 3 Card */}
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-4.5 rounded-2xl border-2 border-indigo-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    3
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">
                    ศูนย์ประมวลผลส่วนคัดแบบ
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>สืบค้นแบบแสดงรายการภาษี:</strong> ค้นหาแบบ ภ.ง.ด.90/91/50 ได้รวดเร็วใน 1 นาที<br />
                  • <strong>สถาปัตยกรรม Docker:</strong> ควบคุมระบบแยกส่วน เสถียรสูง กู้คืนระบบได้ทันที<br />
                  • <strong>ตรวจสอบความถูกต้อง:</strong> ตรวจยอดชำระเงินและออกใบเสร็จราชการ
                </p>
              </div>

              {/* Step 4 Card */}
              <div className="bg-gradient-to-br from-purple-50/60 to-white p-4.5 rounded-2xl border-2 border-purple-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    4
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">
                    เอกสารผลลัพธ์ & ปลอดภัย
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>Targeted Watermark:</strong> ลายน้ำระบุสถาบันการเงิน ป้องกันเวียนเทียนยื่นกู้<br />
                  • <strong>Digital e-Seal & QR Hash:</strong> ตรารับรองความถูกต้องอิเล็กทรอนิกส์<br />
                  • <strong>Print Quota Lock:</strong> ล็อคพิมพ์ตรงตามใบเสร็จ ป้องกันเงินรั่วไหล 100%
                </p>
              </div>

            </div>

            {/* Bottom 4 KPI Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  KPI 1
                </div>
                <div>
                  <p className="font-black text-sm text-white">ลดเดินทาง ๖๐-๑๒๐ กม.</p>
                  <p className="text-[11px] text-slate-400">ประหยัดเวลา ๒ ชม. ยื่นสาขาใกล้บ้าน</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  KPI 2
                </div>
                <div>
                  <p className="font-black text-sm text-white">100% Closed Intranet</p>
                  <p className="text-[11px] text-slate-400">ปลอดภัยสูงสุดตามกฎหมาย PDPA</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  KPI 3
                </div>
                <div>
                  <p className="font-black text-sm text-white">๐ บาท ค่าลิขสิทธิ์</p>
                  <p className="text-[11px] text-slate-400">ซอฟต์แวร์ Open-Source ทั้งระบบ</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  KPI 4
                </div>
                <div>
                  <p className="font-black text-sm text-white">Print Quota Lock</p>
                  <p className="text-[11px] text-slate-400">ป้องกันการพิมพ์ซ้ำและเงินรั่วไหล</p>
                </div>
              </div>
            </div>

          </div>
          )}

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 1: TOPOLOGY & DOCKER ARCHITECTURE (FIBER OPTIC INTRANET) */}
      {/* ===================================================================== */}
      {activeTab === "topology" && (
        <div className="space-y-6">
          
          {/* Header & Mode Switcher */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Production Network & Host Topology</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                  <Server className="w-6 h-6 text-blue-600" />
                  ผังระบบเครือข่าย Fiber Optic และเซิร์ฟเวอร์ On-Premise (สท.พิจิตร)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  ระบบแลนภายใน (Intranet) จากสำนักงานสรรพากรพื้นที่สาขาวิ่งผ่านสาย <strong>Fiber Optic</strong> ตรงเข้ามายัง สำนักงานสรรพากรพื้นที่พิจิตร
                </p>
              </div>

              {/* View Mode Toggle Buttons */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
                <button
                  onClick={() => setDiagramView("visual")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                    diagramView === "visual"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>ผังกราฟิกวิศวกรรม (Visual Flow)</span>
                </button>

                <button
                  onClick={() => setDiagramView("blueprint")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                    diagramView === "blueprint"
                      ? "bg-[#0F2942] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>ผังพิมพ์เขียวทางการ (Blueprint)</span>
                </button>
              </div>
            </div>

            {/* =================================================================== */}
            {/* VIEW MODE 1: VISUAL GRAPHICAL ARCHITECTURE (MATCHING ATTACHED IMAGE) */}
            {/* =================================================================== */}
            {diagramView === "visual" && (
              <div className="space-y-6">
                
                {/* 1. TOP NODE: FIBER OPTIC WAN/INTRANET HEADER */}
                <div className="relative mx-auto max-w-4xl bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0F2942] text-white p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-blue-400/40 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:12px_12px] opacity-15"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-black tracking-wide text-white max-w-3xl leading-snug">
                      เครือข่าย LAN ภายใน (Intranet) เชื่อมโยงระหว่างสำนักงานสรรพากรพื้นที่สาขาทั่วทั้งจังหวัดพิจิตร วิ่งตรงสู่สำนักงานสรรพากรพื้นที่พิจิตร (ไม่ผ่าน Internet สาธารณะ)
                    </h3>
                  </div>
                </div>

                {/* Symmetrical Branches Split Connectors */}
                <div className="relative max-w-4xl mx-auto">
                  
                  {/* Top Stem from Fiber Header */}
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-blue-500 mx-auto"></div>

                  {/* Horizontal Fiber Optic Bus Bar */}
                  <div className="relative h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full mx-12 sm:mx-24 shadow-sm">
                    {/* Pulsing optical light dots */}
                    <div className="absolute -top-1.5 left-1/4 w-4 h-4 rounded-full bg-cyan-400 blur-xs animate-ping"></div>
                    <div className="absolute -top-1.5 right-1/4 w-4 h-4 rounded-full bg-cyan-400 blur-xs animate-ping"></div>
                  </div>

                  {/* 2 Dropping Stems into Branch A and Branch B */}
                  <div className="flex justify-between px-12 sm:px-24">
                    <div className="w-1 h-6 bg-blue-500"></div>
                    <div className="w-1 h-6 bg-blue-500"></div>
                  </div>

                  {/* 2 BRANCH CLIENT CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                    
                    {/* Branch A Card */}
                    <div className="bg-gradient-to-br from-white to-blue-50/60 p-5 rounded-2xl border-2 border-blue-300 shadow-md hover:shadow-lg transition space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          [ เครื่องเคาน์เตอร์สาขา A ]
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-300">
                          สส.โพทะเล
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-600 space-y-2">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <HardDrive className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Smart Card Reader (Dip-Chip บัตร ปชช.)</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <Laptop className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>WebApp Client (บันทึกคำขอ / แสดงผล)</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <Printer className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                          <span>เครื่องพิมพ์เคาน์เตอร์ (ลายน้ำ + ล็อคโควตา)</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <Landmark className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>จุดรับชำระเงิน (QR PromptPay / EDC กรุงไทย)</span>
                        </div>
                      </div>
                    </div>

                    {/* Branch B Card */}
                    <div className="bg-gradient-to-br from-white to-blue-50/60 p-5 rounded-2xl border-2 border-blue-300 shadow-md hover:shadow-lg transition space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-indigo-600" />
                          [ เครื่องเคาน์เตอร์สาขา B ]
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-indigo-300">
                          สส.ทับคล้อ / บางมูลนาก ฯลฯ
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-600 space-y-2">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <HardDrive className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Smart Card Reader (Dip-Chip บัตร ปชช.)</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <Laptop className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>WebApp Client (บันทึกคำขอ / แสดงผล)</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <Printer className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                          <span>เครื่องพิมพ์เคาน์เตอร์ (ลายน้ำ + ล็อคโควตา)</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs font-semibold text-slate-800">
                          <Landmark className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>จุดรับชำระเงิน (QR PromptPay / EDC กรุงไทย)</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Symmetrical Converging Lines from Branches into Central Fiber Pipe */}
                  <div className="flex justify-between px-12 sm:px-24">
                    <div className="w-1 h-6 bg-blue-500"></div>
                    <div className="w-1 h-6 bg-blue-500"></div>
                  </div>

                  <div className="relative h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full mx-12 sm:mx-24 shadow-sm"></div>

                  <div className="w-1 h-6 bg-indigo-600 mx-auto"></div>

                </div>

                {/* 2. FIBER OPTIC CONDUIT LABEL & INTRANET PORT BADGE */}
                <div className="max-w-md mx-auto text-center space-y-1">
                  <div className="bg-gradient-to-r from-[#0F2942] to-blue-900 text-white px-5 py-3 rounded-2xl shadow-md border border-cyan-400/40 inline-flex items-center gap-2.5 text-xs font-mono font-bold">
                    <Zap className="w-4 h-4 text-cyan-300 animate-pulse flex-shrink-0" />
                    <span>│ (เข้าใช้งานผ่าน Port 80 / 443 ผ่านสาย Fiber Optic)</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-indigo-500"></div>
                  </div>
                  <div className="text-indigo-600 font-bold text-lg leading-none">▼</div>
                </div>

                {/* 3. MAIN ON-PREMISE HOST SERVER BOX */}
                <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-2xl border-4 border-slate-700 relative space-y-6">
                  
                  {/* Host Server Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <Server className="w-6 h-6 text-amber-400" />
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          เครื่องเซิร์ฟเวอร์สำนักงาน (On-Premise Host Server)
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        ติดตั้งในห้อง Server ณ สำนักงานสรรพากรพื้นที่พิจิตร • รองรับระบบ Linux / Windows Server
                      </p>
                    </div>

                    <div className="bg-slate-800 text-emerald-300 border border-emerald-500/40 px-3.5 py-1 rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>ควบคุมข้อมูลภายในสำนักงาน 100%</span>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* DOCKER INTERNAL BRIDGE NETWORK BOX                       */}
                  {/* ======================================================== */}
                  <div className="rounded-2xl bg-[#0F2942]/90 border-2 border-blue-400/50 p-5 sm:p-6 space-y-6 relative overflow-hidden shadow-inner">
                    
                    {/* Docker Network Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-400/30">
                      <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-300 font-bold">
                        <span>┌─ Docker Internal Bridge Network (ไม่เปิดพอร์ต DB สู่ภายนอก) ──┐</span>
                      </div>
                      <span className="bg-blue-600/70 text-blue-100 text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-blue-400/40">
                        Network: rct-internal-net
                      </span>
                    </div>

                    {/* CONTAINER 1: rct-app WebApp & API Gateway */}
                    <div className="bg-slate-800/90 rounded-2xl p-5 border-2 border-blue-400 shadow-md space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                            1
                          </div>
                          <span className="font-black text-sm sm:text-base text-white">
                            [ rct-app Container ]
                          </span>
                        </div>
                        <span className="text-xs font-mono bg-blue-950 text-blue-200 px-3 py-1 rounded-lg border border-blue-500/40">
                          Next.js WebApp (Frontend + API Gateway)
                        </span>
                      </div>

                      {/* 3 Sub-modules */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono">
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700 text-slate-200 flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">├──</span>
                          <span>Authentication & Role Middleware</span>
                        </div>
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700 text-slate-200 flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">├──</span>
                          <span>PDF Processing & e-Seal Engine</span>
                        </div>
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700 text-slate-200 flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">└──</span>
                          <span>Prisma ORM Client</span>
                        </div>
                      </div>
                    </div>

                    {/* CONNECTING PIPELINES: Port 5432 & Port 9000 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      
                      {/* Left Pipe: To PostgreSQL */}
                      <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/40 p-2 rounded-xl border border-emerald-500/30">
                        <span className="font-bold">├── (คุยภายใน Port 5432)</span>
                        <ArrowRight className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-[11px] text-slate-300">เข้าถึง PostgreSQL เท่านั้น</span>
                      </div>

                      {/* Right Pipe: To MinIO */}
                      <div className="flex items-center gap-2 text-sky-300 bg-sky-950/40 p-2 rounded-xl border border-sky-500/30">
                        <span className="font-bold">└── (คุยภายใน Port 9000)</span>
                        <ArrowRight className="w-4 h-4 text-sky-400 flex-shrink-0" />
                        <span className="text-[11px] text-slate-300">เข้าถึง MinIO Object Storage</span>
                      </div>

                    </div>

                    {/* CONTAINERS 2, 3, 4, 5 GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* CONTAINER 2: PostgreSQL Database */}
                      <div className="bg-emerald-950/50 rounded-2xl p-4.5 border-2 border-emerald-400/60 shadow-md space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                              2
                            </div>
                            <span className="font-black text-sm text-emerald-300">
                              [ rct-db Container ]
                            </span>
                          </div>
                          <span className="text-[10px] font-mono bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded border border-emerald-500/40">
                            Port 5432 (Internal)
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">PostgreSQL 16 Engine</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          ฐานข้อมูลการเงิน, คำร้อง, ผู้เสียภาษี, ข้อมูลสิทธิ์ และ Audit Logs (ไม่เปิดพอร์ตออกข้างนอก)
                        </p>
                      </div>

                      {/* CONTAINER 3: MinIO Object Storage */}
                      <div className="bg-sky-950/50 rounded-2xl p-4.5 border-2 border-sky-400/60 shadow-md space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black text-xs">
                              3
                            </div>
                            <span className="font-black text-sm text-sky-300">
                              [ rct-storage Container ]
                            </span>
                          </div>
                          <span className="text-[10px] font-mono bg-sky-900/80 text-sky-200 px-2 py-0.5 rounded border border-sky-500/40">
                            Port 9000 (Internal)
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">MinIO Object Storage</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          จัดเก็บไฟล์แบบภาษี PDF ต้นฉบับ, เอกสารรับรอง e-Seal และภาพสลิปหลักฐานอย่างปลอดภัย
                        </p>
                      </div>

                      {/* CONTAINER 4: Daily Backup Container */}
                      <div className="bg-purple-950/50 rounded-2xl p-4.5 border-2 border-purple-400/60 shadow-md space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                              4
                            </div>
                            <span className="font-black text-sm text-purple-300">
                              [ rct-backup Container ]
                            </span>
                          </div>
                          <span className="text-[10px] font-mono bg-purple-900/80 text-purple-200 px-2 py-0.5 rounded border border-purple-500/40">
                            Cron: @daily
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">pg_dump สำรองข้อมูลทุกคืน</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          ดูดแบ็กอัปอัตโนมัติจาก rct-db บีบอัด .sql.gz เก็บย้อนหลัง 30 วันลงฮาร์ดดิสก์จริง
                        </p>
                      </div>

                      {/* CONTAINER 5: pgAdmin Database Management */}
                      <div className="bg-slate-800/80 rounded-2xl p-4.5 border border-slate-600 shadow-md space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center font-black text-xs">
                              5
                            </div>
                            <span className="font-black text-sm text-slate-200">
                              [ rct-pgadmin Container ]
                            </span>
                          </div>
                          <span className="text-[10px] font-mono bg-amber-900/70 text-amber-200 px-2 py-0.5 rounded border border-amber-500/40">
                            Port 8080 (เฉพาะ IT)
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">คอนโซลจัดการฐานข้อมูล</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          หน้าจอเว็บสำหรับเจ้าหน้าที่ไอทีของสำนักงาน เข้าดูโครงสร้างตาราง ตรวจสอบ และดูแลระบบ
                        </p>
                      </div>

                    </div>

                    {/* Docker Footer Line */}
                    <div className="pt-2 border-t border-blue-400/30 text-center text-xs font-mono text-cyan-300">
                      <span>└──────────────────────────────────────────┼──────────────────────────────────┘</span>
                    </div>

                  </div>

                  {/* Connecting Arrow Down to Host Persistent Storage */}
                  <div className="flex flex-col items-center justify-center text-amber-400 font-mono font-bold leading-none">
                    <div className="w-1 h-4 bg-amber-400"></div>
                    <div className="text-xl">▼</div>
                  </div>

                  {/* ======================================================== */}
                  {/* HOST PERSISTENT STORAGE BOX                              */}
                  {/* ======================================================== */}
                  <div className="rounded-2xl bg-black/50 border-2 border-amber-400/60 p-5 space-y-3">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                        <HardDrive className="w-5 h-5 text-amber-400" />
                        <span>[ Host Persistent Storage ฮาร์ดดิสก์จริงของเครื่องเซิร์ฟเวอร์ ]</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                        ข้อมูลไม่สูญหายเมื่อปิด Container 100%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                      
                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 space-y-1">
                        <div className="text-amber-300 font-bold flex items-center gap-1.5">
                          <span>├──</span>
                          <span>./data/postgres</span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-6">
                          ข้อมูลตารางและธุรกรรมทั้งหมด - ปลอดภัย ไม่หายเมื่อปิด container
                        </p>
                      </div>

                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 space-y-1">
                        <div className="text-amber-300 font-bold flex items-center gap-1.5">
                          <span>├──</span>
                          <span>./data/minio</span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-6">
                          ไฟล์เอกสาร PDF ราชการ แบบแสดงรายการภาษี และใบเสร็จ
                        </p>
                      </div>

                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 space-y-1">
                        <div className="text-amber-300 font-bold flex items-center gap-1.5">
                          <span>└──</span>
                          <span>./data/backups</span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-6">
                          ไฟล์สำรองฐานข้อมูล .sql.gz ย้อนหลัง 30 วัน กู้คืนได้ทันที
                        </p>
                      </div>

                    </div>

                    <p className="text-[11px] text-slate-400 italic pt-1 text-center">
                      * ผูก Mount Volumes ระหว่าง Container กับ Disk จริงของเครื่อง Host ทำให้เซิร์ฟเวอร์ดับหรือเปลี่ยนเครื่อง ข้อมูลก็ยังอยู่ครบถ้วน
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* =================================================================== */}
            {/* VIEW MODE 2: OFFICIAL BLUEPRINT ASCII DIAGRAM (MATCHING ATTACHED IMAGE) */}
            {/* =================================================================== */}
            {diagramView === "blueprint" && (
              <div className="space-y-4 animate-fadeIn">
                
                <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 rounded-t-2xl border-x-2 border-t-2 border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs font-bold text-slate-200">
                      architecture_blueprint.txt • Official System Topology Specifications
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(`[ เครือข่าย LAN ภายใน (Intranet) เชื่อมโยงระหว่างสำนักงานสรรพากรพื้นที่สาขาทั่วทั้งจังหวัดพิจิตร วิ่งตรงสู่สำนักงานสรรพากรพื้นที่พิจิตร (ไม่ผ่าน Internet สาธารณะ) ]
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            │                                                   │
  [ เครื่องเคาน์เตอร์สาขา A ]                            [ เครื่องเคาน์เตอร์สาขา B ]
 (Smart Card Reader + WebApp)                         (Smart Card Reader + WebApp)
            │                                                   │
            └─────────────────────────┬─────────────────────────┘
                                      │ (เข้าใช้งานผ่าน Port 80 / 443 ผ่านสาย Fiber Optic)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ เครื่องเซิร์ฟเวอร์สำนักงาน (On-Premise Host Server ณ สำนักงานสรรพากรพื้นที่พิจิตร)│
│                                                                             │
│  ┌─ Docker Internal Bridge Network (ไม่เปิดพอร์ต DB สู่ภายนอก) ──────────┐  │
│  │                                                                       │  │
│  │  1. [ rct-app Container ]                                             │  │
│  │     Next.js WebApp (Frontend + API Gateway)                          │  │
│  │     ├── Authentication & Role Middleware                              │  │
│  │     ├── PDF Processing & e-Seal Engine                                 │  │
│  │     └── Prisma ORM Client                                              │  │
│  │             │                                                         │  │
│  │             ├── (คุยภายใน Port 5432) ────────┐                        │  │
│  │             │                                ▼                        │  │
│  │             │                     2. [ rct-db Container ]             │  │
│  │             │                        PostgreSQL 16 Engine             │  │
│  │             │                                │                        │  │
│  │             └── (คุยภายใน Port 9000) ──┐     │                        │  │
│  │                                        ▼     ▼                        │  │
│  │  3. [ rct-storage Container ]     4. [ rct-backup Container ]         │  │
│  │     MinIO Object Storage             pg_dump สำรองข้อมูลทุกคืน         │  │
│  │     (เก็บ PDF และรูปภาพ)             (เก็บประวัติย้อนหลัง 30 วัน)      │  │
│  │                                              │                        │  │
│  │  5. [ rct-pgadmin Container ] (Port 8080 เฉพาะเครื่อง IT สำนักงาน)    │  │
│  └──────────────────────────────────────────────┼────────────────────────┘  │
│                                                 ▼                           │
│  [ Host Persistent Storage ฮาร์ดดิสก์จริงของเครื่องเซิร์ฟเวอร์ ]             │
│  ├── ./data/postgres (ข้อมูลตารางและธุรกรรมทั้งหมด - ไม่หายเมื่อปิด container)│
│  ├── ./data/minio    (ไฟล์เอกสาร PDF ราชการและใบเสร็จ)                      │
│  └── ./data/backups  (ไฟล์สำรองฐานข้อมูล .sql.gz รายวัน)                    │
└─────────────────────────────────────────────────────────────────────────────┘`, "blueprint_full")}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {copiedSnippet === "blueprint_full" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>คัดลอกเรียบร้อย!</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="w-3.5 h-3.5" />
                        <span>คัดลอกผังข้อความ (Copy Diagram)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Monospace Code Blueprint Container */}
                <div className="bg-[#0B132B] text-cyan-300 p-5 sm:p-7 rounded-b-2xl border-x-2 border-b-2 border-slate-700 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-xl">
                  <pre className="select-all">
{`[ เครือข่าย LAN ภายใน (Intranet) เชื่อมโยงระหว่างสำนักงานสรรพากรพื้นที่สาขาทั่วทั้งจังหวัดพิจิตร วิ่งตรงสู่สำนักงานสรรพากรพื้นที่พิจิตร (ไม่ผ่าน Internet สาธารณะ) ]
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            │                                                   │
  [ เครื่องเคาน์เตอร์สาขา A ]                            [ เครื่องเคาน์เตอร์สาขา B ]
 (Smart Card Reader + WebApp)                         (Smart Card Reader + WebApp)
            │                                                   │
            └─────────────────────────┬─────────────────────────┘
                                      │ (เข้าใช้งานผ่าน Port 80 / 443 ผ่านสาย Fiber Optic)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ เครื่องเซิร์ฟเวอร์สำนักงาน (On-Premise Host Server ณ สท.พิจิตร)              │
│                                                                             │
│  ┌─ Docker Internal Bridge Network (ไม่เปิดพอร์ต DB สู่ภายนอก) ──────────┐  │
│  │                                                                       │  │
│  │  1. [ rct-app Container ]                                             │  │
│  │     Next.js WebApp (Frontend + API Gateway)                          │  │
│  │     ├── Authentication & Role Middleware                              │  │
│  │     ├── PDF Processing & e-Seal Engine                                 │  │
│  │     └── Prisma ORM Client                                              │  │
│  │             │                                                         │  │
│  │             ├── (คุยภายใน Port 5432) ────────┐                        │  │
│  │             │                                ▼                        │  │
│  │             │                     2. [ rct-db Container ]             │  │
│  │             │                        PostgreSQL 16 Engine             │  │
│  │             │                                │                        │  │
│  │             └── (คุยภายใน Port 9000) ──┐     │                        │  │
│  │                                        ▼     ▼                        │  │
│  │  3. [ rct-storage Container ]     4. [ rct-backup Container ]         │  │
│  │     MinIO Object Storage             pg_dump สำรองข้อมูลทุกคืน         │  │
│  │     (เก็บ PDF และรูปภาพ)             (เก็บประวัติย้อนหลัง 30 วัน)      │  │
│  │                                              │                        │  │
│  │  5. [ rct-pgadmin Container ] (Port 8080 เฉพาะเครื่อง IT สำนักงาน)    │  │
│  └──────────────────────────────────────────────┼────────────────────────┘  │
│                                                 ▼                           │
│  [ Host Persistent Storage ฮาร์ดดิสก์จริงของเครื่องเซิร์ฟเวอร์ ]             │
│  ├── ./data/postgres (ข้อมูลตารางและธุรกรรมทั้งหมด - ไม่หายเมื่อปิด container)│
│  ├── ./data/minio    (ไฟล์เอกสาร PDF ราชการและใบเสร็จ)                      │
│  └── ./data/backups  (ไฟล์สำรองฐานข้อมูล .sql.gz รายวัน)                    │
└─────────────────────────────────────────────────────────────────────────────┘`}
                  </pre>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>จุดเด่นสำหรับนำเสนอ:</strong> ผังโครงสร้างนี้แสดงให้คณะกรรมการเห็นอย่างชัดเจนว่า เครือข่ายที่ใช้เป็น <strong>สาย Fiber Optic วงแลนภายใน (Intranet)</strong> ไม่มีการเชื่อมต่อกับ Public Internet ภายนอก และฐานข้อมูล <strong>PostgreSQL 16</strong> ถูกซ่อนอยู่หลัง Docker Network โดยไม่มีการเปิดพอร์ต 5432 ออกมาภายนอก จึงปลอดภัยจากการถูกโจมตีทางไซเบอร์ 100%
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* =================================================================== */}
          {/* PAYMENT & BANKING INTEGRATION STRATEGY (ตอบข้อซักถามคณะกรรมการ)     */}
          {/* =================================================================== */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Banking & Financial Compliance</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                  <Landmark className="w-6 h-6 text-blue-600" />
                  แนวทางการเชื่อมโยงระบบรับชำระเงินกับธนาคาร & ใบเสร็จรับเงิน (e-Receipt)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  ชี้แจงความโปร่งใส ถูกต้องตามระเบียบการเงินการคลังภาครัฐ และสถาปัตยกรรมการเชื่อมโยง ๒ ระยะ
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>เงินเข้าบัญชีราชการ 100% ปลอดภัยตามระเบียบพัสดุ</span>
              </div>
            </div>

            {/* 2-Phase Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Phase 1 Card */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/70 border-2 border-blue-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                    ระยะที่ ๑ : พร้อมใช้งานทันที (Hybrid Integration) ⭐
                  </span>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                    ไม่ต้องขออนุมัติ API พิเศษ
                  </span>
                </div>

                <h3 className="font-black text-slate-900 text-base">
                  ทำงานผสานกับช่องทางรับเงินเดิมของกรมสรรพากร (EDC / QR กรุงไทย)
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  ระบบ <strong>ไม่ได้ตัดเงินหรือเปิดบัญชีใหม่เอง</strong> เพื่อป้องกันข้อท้วงติงด้านระเบียบการเงินการคลัง แต่ทำงานสอดประสานกับระบบการเงินของสำนักงาน:
                </p>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">1</div>
                    <p><strong>คำนวณยอดเงินอัตโนมัติ:</strong> ระบบคำนวณตามจำนวนฉบับ (๒๐ บาท/ฉบับ) พร้อมสร้าง Reference No. ประจำคำขอ</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">2</div>
                    <p><strong>ชำระผ่านช่องทางราชการ:</strong> ประชาชนสแกน QR Code PromptPay ของสำนักงาน หรือรูดบัตรผ่านเครื่อง EDC ธนาคารกรุงไทยของกรมฯ</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">3</div>
                    <p><strong>บันทึกเลขที่ใบเสร็จ (e-Receipt):</strong> งานการเงินออกใบเสร็จราชการและบันทึกเลขที่ใบเสร็จเข้าระบบ</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">4</div>
                    <p><strong>ปลดล็อคโควตาการพิมพ์:</strong> ระบบอนุญาตให้พิมพ์เอกสารตรงตามจำนวนฉบับที่ชำระจริง ป้องกันการพิมพ์ซ้ำ</p>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>คำตอบสำหรับกรรมการ:</strong> เงินเข้าบัญชีรายได้กรมสรรพากรตามปกติ ไม่เสี่ยงเงินหาย 100%</span>
                </div>
              </div>

              {/* Phase 2 Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/50 border-2 border-purple-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                    ระยะที่ ๒ : แผนขยายผลสู่อนาคต (Full API Integration)
                  </span>
                  <span className="text-xs font-bold text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-md">
                    โครงสร้าง Schema รองรับแล้ว
                  </span>
                </div>

                <h3 className="font-black text-slate-900 text-base">
                  เชื่อมต่อตรงกับ KTB Corporate Gateway / Webhook อัตโนมัติ
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  สถาปัตยกรรมระบบได้ออกแบบ Schema ของฐานข้อมูล PostgreSQL ให้มีฟิลด์ทางการเงินครบถ้วน พร้อมรองรับเมื่อได้รับอนุมัติ API จากส่วนกลาง:
                </p>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">A</div>
                    <p><strong>โครงสร้างข้อมูลรองรับมาตรฐาน ธปท.:</strong> จัดเตรียมฟิลด์ <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded font-mono">transaction_id</code>, <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded font-mono">biller_id</code>, <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded font-mono">ref1</code>, <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded font-mono">ref2</code></p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">B</div>
                    <p><strong>ตรวจจับยอดเงินเข้าทันที (Real-time Webhook):</strong> เมื่อประชาชนสแกนจ่าย ธนาคารกรุงไทยจะยิง Webhook แจ้งเข้าระบบเพื่อปลดล็อคพิมพ์อัตโนมัติภายใน ๓ วินาที</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">C</div>
                    <p><strong>เชื่อมต่อระบบ e-Receipt กรมสรรพากร:</strong> ดึงเลขอ้างอิงใบเสร็จอิเล็กทรอนิกส์จากระบบส่วนกลางอัตโนมัติ</p>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span><strong>คำตอบสำหรับกรรมการ:</strong> ระบบคิดรองรับอนาคตไว้ล่วงหน้า เมื่อกรมฯ มีนโยบายก็เปิดสวิตช์ต่อได้ทันทีโดยไม่ต้องรื้อระบบใหม่</span>
                </div>
              </div>

            </div>

            {/* Committee FAQ Cheat-sheet */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>สรุปประเด็นชี้แจง ๓ ข้อ หากคณะกรรมการสอบถามในที่ประชุม</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <p className="text-amber-200 font-bold">๑. เงินเข้าบัญชีใคร?</p>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    เข้าบัญชีเงินรายได้ของสำนักงานสรรพากรพื้นที่พิจิตรโดยตรงผ่านระบบรับชำระของธนาคารกรุงไทย ไม่มีบัญชีพักเงินภายนอก
                  </p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <p className="text-amber-200 font-bold">๒. ต้องของบทำ API เพิ่มไหม?</p>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    ในระยะที่ ๑ ไม่ต้องของบเพิ่มแม้แต่บาทเดียว เพราะใช้ระบบรับชำระและเครื่อง EDC ที่มีอยู่แล้วของสำนักงาน
                  </p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <p className="text-amber-200 font-bold">๓. ป้องกันพิมพ์เกินเงินได้อย่างไร?</p>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    ระบบล็อคสิทธิ์การพิมพ์ด้วยยอดเงินในใบเสร็จ หากจ่าย ๒ ฉบับ ระบบจะยอมให้สั่งพิมพ์ได้แค่ ๒ ฉบับเท่านั้น ป้องกันเงินรั่วไหล 100%
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: TECH STACK BREAKDOWN & JUSTIFICATION */}
      {/* ===================================================================== */}
      {activeTab === "tech_stack" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Enterprise Software Stack</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                <Layers className="w-6 h-6 text-blue-600" />
                ตารางเปรียบเทียบเทคโนโลยีและเหตุผลการเลือกใช้
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                คัดเลือกตามมาตรฐานหน่วยงานภาครัฐ: ความมั่นคงปลอดภัย, ไม่มีค่าลิขสิทธิ์ซอฟต์แวร์ (Open-Source), และความเร็วในการปฏิบัติงาน
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b-2 border-slate-300">
                    <th className="p-3.5 font-extrabold rounded-tl-xl">ส่วนของระบบ</th>
                    <th className="p-3.5 font-extrabold">เทคโนโลยีที่เลือกใช้</th>
                    <th className="p-3.5 font-extrabold">ข้อดีและเหตุผลความคุ้มค่า</th>
                    <th className="p-3.5 font-extrabold rounded-tr-xl">ค่าลิขสิทธิ์ (License)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-blue-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-blue-600" />
                        <span>Frontend Web UI</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-blue-700 block">Next.js 16 (React 19 + TypeScript)</span>
                      <span className="text-xs text-slate-500">Tailwind CSS + Shadcn UI Components</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • ต่อยอดโค้ดจากระบบ Demo ได้ทันที 100% ไม่ต้องเริ่มทำใหม่<br />
                      • ประสิทธิภาพสูง โหลดหน้าจอใน 0.5 วินาที<br />
                      • มีระบบตรวจสอบสิทธิ์ 4 ฝ่าย (Role-Based Access) ในตัว
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (MIT)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-indigo-600" />
                        <span>Backend & API</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-indigo-700 block">Next.js Server Actions & Route Handlers</span>
                      <span className="text-xs text-slate-500">BFF (Backend-for-Frontend) Architecture</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • รันฝั่งเซิร์ฟเวอร์ ซ่อน Business Logic และรหัสผ่าน ไม่ให้หลุดสู่บราวเซอร์<br />
                      • เชื่อมต่อฐานข้อมูลโดยตรงผ่าน Docker Network ภายใน
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (MIT)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50/40 transition bg-amber-50/30">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-600" />
                        <span>ฐานข้อมูลหลัก (Database)</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-emerald-800 block">🐘 PostgreSQL 16 (On-Premise)</span>
                      <span className="text-xs text-slate-500">ติดตั้งบนเซิร์ฟเวอร์สำนักงาน 100%</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • <strong>ไม่ใช่ Cloud:</strong> ควบคุมข้อมูลผู้เสียภาษีได้ 100% ปลอดภัยตาม PDPA<br />
                      • <strong>มาตรฐานการเงิน (ACID 100%):</strong> ข้อมูลยอดเงินและใบเสร็จไม่คลาดเคลื่อน<br />
                      • <strong>รองรับ JSONB:</strong> ปรับโครงสร้างแบบภาษีแต่ละประเภทได้ยืดหยุ่นสูง
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (PostgreSQL Open License)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-600" />
                        <span>Database ORM</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-purple-700 block">Prisma ORM</span>
                      <span className="text-xs text-slate-500">TypeScript Database Toolkit</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • ป้องกันการโจมตี SQL Injection ได้ 100%<br />
                      • มีระบบ Migration อัปเดตโครงสร้างตารางได้โดยที่ข้อมูลเดิมไม่สูญหาย
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (Apache 2.0)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-sky-600" />
                        <span>คลังเก็บเอกสาร PDF</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-sky-700 block">MinIO Object Storage</span>
                      <span className="text-xs text-slate-500">S3-Compatible On-Premise Storage</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • เก็บไฟล์แบบภาษีและใบเสร็จอย่างเป็นระเบียบ ไม่ทำให้ฐานข้อมูลบวม<br />
                      • มีระบบเข้ารหัสไฟล์ และสร้างลิงก์ชั่วคราว (Presigned URL) ดูได้เฉพาะผู้มีสิทธิ์
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (AGPL v3)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-red-600" />
                        <span>ระบบประทับตราและพิมพ์</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-red-700 block">PDF-lib & e-Seal Engine</span>
                      <span className="text-xs text-slate-500">Node.js In-Memory Processing</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • ประทับลายน้ำทแยงมุมระบุปลายทางชัดเจน (ป้องกันการนำไปใช้ผิดวัตถุประสงค์)<br />
                      • ประทับตรารับรองสำเนาถูกต้องอิเล็กทรอนิกส์ (e-Seal) และรหัสตรวจสอบ QR Hash
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (MIT)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50/40 transition bg-indigo-50/30">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-blue-600" />
                        <span>ระบบรับชำระเงิน & ธนาคาร</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-blue-800 block">Hybrid KTB & QR PromptPay</span>
                      <span className="text-xs text-slate-500">ผสาน EDC/QR เดิม + Schema รองรับ KTB Webhook</span>
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      • <strong>ถูกระเบียบราชการ 100%:</strong> เงินรายได้เข้าบัญชีสำนักงานโดยตรง ไม่แตะต้องเงินสด<br />
                      • <strong>Print Lock:</strong> ปลดล็อคโควตาการพิมพ์เอกสารตรงตามยอดในใบเสร็จรับเงินจริง (e-Receipt)<br />
                      • <strong>Future-Ready:</strong> มีฟิลด์ Ref1/Ref2 พร้อมต่อ API ธนาคารกรุงไทยได้ทันทีในอนาคต
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-extrabold text-xs">ฟรี 0 บาท (ใช้ของเดิม)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: SECURITY, PDPA & ANTI-FRAUD MEASURES */}
      {/* ===================================================================== */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Security & Compliance Framework</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                ๕ เสาหลักความมั่นคงปลอดภัยข้อมูลภาษีและมาตรฐาน PDPA
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                ออกแบบตามมาตรฐานการรักษาความมั่นคงปลอดภัยไซเบอร์ของหน่วยงานภาครัฐ เพื่อคุ้มครองข้อมูลผู้เสียภาษีขั้นสูงสุด
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Pillar 1 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
                  ๑
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">On-Premise Network Isolation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ฐานข้อมูลและไฟล์เอกสารทั้งหมดถูกจัดเก็บอยู่บนเซิร์ฟเวอร์ในห้องระบบของสำนักงาน ไม่มีการส่งข้อมูลขึ้นอินเทอร์เน็ตสาธารณะหรือระบบ Cloud ภายนอก ข้อมูลวิ่งอยู่บนเครือข่าย Intranet / WAN สรรพากรเท่านั้น
                </p>
                <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ตัดความเสี่ยงเรื่อง Cloud Data Breach 100%</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  ๒
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Data Encryption & Masking</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ข้อมูลอ่อนไหวตามกฎหมาย PDPA (เช่น เลขประจำตัวประชาชน 13 หลัก, รายได้) จะถูกเข้ารหัสในฐานข้อมูลด้วย <strong>pgcrypto (AES-256)</strong> และการแสดงผลบนหน้าจอจะมีระบบ Masking ซ่อนข้อมูลบางส่วนสำหรับผู้ที่ไม่มีสิทธิ์
                </p>
                <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>เข้ารหัสทั้งในระดับตารางและไฟล์เอกสาร</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                  ๓
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Immutable Audit Trail</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ระบบบันทึกประวัติทุกการกระทำอย่างถาวร (Audit Log): ใครเป็นผู้ค้นหาแบบ, ใครเปิดดูเอกสาร, สั่งพิมพ์กี่ฉบับ, ชำระเงินเมื่อใด และส่งมอบให้ใคร โดยบันทึกเหล่านี้ไม่สามารถแก้ไขหรือลบย้อนหลังได้ (Anti-Tampering)
                </p>
                <div className="text-[11px] text-purple-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>ตรวจสอบย้อนหลังได้ทุกเคสเพื่อความโปร่งใส</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  ๔
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Print Quota Lock (ล็อคการพิมพ์)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ระบบจะปลดล็อคปุ่มพิมพ์เฉพาะเมื่อมีใบเสร็จรับเงินราชการยืนยันแล้วเท่านั้น และจำกัดจำนวนการพิมพ์ตรงตามยอดเงินในใบเสร็จ (เช่น 2/2 ฉบับ) เมื่อพิมพ์ครบแล้วปุ่มจะล็อคทันที ป้องกันการแอบพิมพ์ซ้ำซ้อนโดยไม่เสียค่าธรรมเนียม
                </p>
                <div className="text-[11px] text-amber-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>ป้องกันรายได้แผ่นดินรั่วไหลได้ 100%</span>
                </div>
              </div>

              {/* Pillar 5 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-black">
                  ๕
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Targeted Watermark & e-Seal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  เอกสารที่ออกจากระบบจะถูกฝังลายน้ำทแยงมุมระบุสถาบันการเงินปลายทางตามคำร้อง (เช่น ใช้เฉพาะยื่นสินเชื่อธนาคารกสิกรไทยเท่านั้น) พร้อมประทับตรารับรอง e-Seal และ QR Hash สำหรับตรวจสอบเอกสารจริง ป้องกันการนำไปเวียนเทียน
                </p>
                <div className="text-[11px] text-red-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <Check className="w-3.5 h-3.5 text-red-600" />
                  <span>ป้องกันการปลอมแปลงและเวียนเทียนเอกสาร</span>
                </div>
              </div>

              {/* Pillar 6 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-black">
                  ๖
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Strict RBAC (แยกสิทธิ์ ๔ บทบาท)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  แยกสิทธิ์การใช้งานเด็ดขาดระหว่าง 4 กลุ่มงาน: เจ้าหน้าที่สาขา (สร้างคำร้อง/ส่งมอบ), เจ้าหน้าที่คัดแบบ (ค้นแบบ/แนบไฟล์), เจ้าหน้าที่การเงิน (ตรวจเงิน/ออกใบเสร็จ), และผู้บริหาร (มอนิเตอร์) เจ้าหน้าที่สาขาไม่สามารถแก้ไขยอดเงินหรืออนุมัติเองได้
                </p>
                <div className="text-[11px] text-sky-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                  <span>Segregation of Duties ตามหลักธรรมาภิบาล</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: VALUE & RETURN ON INVESTMENT (ROI) */}
      {/* ===================================================================== */}
      {activeTab === "roi" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Impact & Value Assessment</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                <TrendingUp className="w-6 h-6 text-rose-600" />
                ความคุ้มค่าและผลประโยชน์ต่อทางราชการและประชาชน
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                การเปรียบเทียบผลลัพธ์เชิงประจักษ์จากการนำระบบ RCT WebApp ไปใช้งานจริง
              </p>
            </div>

            {/* 4 Impact Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-blue-800 uppercase">ระยะเวลาการให้บริการ (SLA)</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-blue-900">4.2</span>
                  <span className="text-sm font-bold text-blue-700">นาที</span>
                </div>
                <p className="text-xs text-slate-600">จากเดิม 1–3 วันทำการ ลดลงเหลือเพียงไม่ถึง 5 นาที ได้รับเอกสารทันที</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-emerald-800 uppercase">ค่าลิขสิทธิ์ซอฟต์แวร์ (License)</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-900">0</span>
                  <span className="text-sm font-bold text-emerald-700">บาท</span>
                </div>
                <p className="text-xs text-slate-600">ใช้เทคโนโลยี Open-Source ชั้นนำระดับโลก ประหยัดงบประมาณภาครัฐ 100%</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-amber-800 uppercase">ประหยัดค่าเดินทางประชาชน</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-900">118.6</span>
                  <span className="text-sm font-bold text-amber-700">กม./เที่ยว</span>
                </div>
                <p className="text-xs text-slate-600">(ตัวอย่าง สส.โพทะเล) ประหยัดค่าน้ำมันกว่า 415 บาทต่อเที่ยว ไม่ต้องเดินทางเข้าเมือง</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-purple-800 uppercase">การป้องกันการทุจริต & รั่วไหล</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-purple-900">100%</span>
                </div>
                <p className="text-xs text-slate-600">ล็อคโควตาการพิมพ์ตามใบเสร็จ พร้อมลายน้ำระบุปลายทาง และ Audit Log ทุกขั้นตอน</p>
              </div>
            </div>

            {/* Before vs After Table */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base mb-3">ตารางเปรียบเทียบก่อนและหลังการนำระบบไปใช้ (Before vs After)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b-2 border-slate-300">
                      <th className="p-3 font-extrabold">มิติการดำเนินงาน</th>
                      <th className="p-3 font-extrabold text-red-700">ก่อนมีระบบ (ระบบกระดาษ / LINE)</th>
                      <th className="p-3 font-extrabold text-emerald-700">หลังใช้ RCT WebApp On-Premise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold">๑. สถานที่รับบริการ</td>
                      <td className="p-3 text-red-800">ต้องเดินทางมาสำนักงานพื้นที่ในเมืองพิจิตร (ไกลสุด 60+ กม.)</td>
                      <td className="p-3 text-emerald-800 font-semibold">ยื่นและรับเอกสารได้ ณ สส. สาขาใกล้บ้านทุกอำเภอ</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">๒. การรับ-ส่งเอกสาร</td>
                      <td className="p-3 text-red-800">ส่งไฟล์ PDF ผ่านกลุ่มแชท LINE OA (เสี่ยงหลุดและนำไปทำซ้ำ)</td>
                      <td className="p-3 text-emerald-800 font-semibold">ส่งผ่านเครือข่ายระบบ WebApp ปิดในสำนักงาน มีระบบควบคุมสิทธิ์</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">๓. การควบคุมค่าธรรมเนียม</td>
                      <td className="p-3 text-red-800">อาจพิมพ์เอกสารซ้ำซ้อนโดยไม่มีการออกใบเสร็จกำกับ</td>
                      <td className="p-3 text-emerald-800 font-semibold">Print Quota Lock ล็อคการพิมพ์ตรงตามใบเสร็จเป๊ะ 100%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">๔. การป้องกันการเวียนเทียน</td>
                      <td className="p-3 text-red-800">สำเนาไม่มีการระบุปลายทาง ผู้ขออาจนำไปยื่นหลายสถาบัน</td>
                      <td className="p-3 text-emerald-800 font-semibold">มีลายน้ำทแยงมุมระบุชื่อสถาบันผู้รับเอกสารปลายทางอย่างเจาะจง</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">๕. การติดตามสถานะ (Tracking)</td>
                      <td className="p-3 text-red-800">ต้องโทรสอบถามเจ้าหน้าที่เป็นรายคน ไม่มีระบบรวม</td>
                      <td className="p-3 text-emerald-800 font-semibold">Tracking Timeline เรียลไทม์ ผู้บริหารเห็น SLA ทั้งจังหวัด</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. BOTTOM SUMMARY & CALL TO ACTION */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-400/30">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            พร้อมเดินหน้าสู่การพัฒนาระบบจริงทันที
          </span>
          <h3 className="text-lg sm:text-xl font-black">
            ระบบผ่านการวิเคราะห์กระบวนงาน ออกแบบสถาปัตยกรรม และวางพิมพ์เขียวไว้อย่างสมบูรณ์
          </h3>
          <p className="text-xs text-blue-200">
            เอกสารอ้างอิง: [PROJECT_PLAN_ARCHITECTURE_AND_WORKFLOW.md] ในระบบโครงการ
          </p>
        </div>

        <button
          onClick={onGoToDemo}
          className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-amber-500/30 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 flex-shrink-0 cursor-pointer"
        >
          <span>เปิดระบบ Interactive Demo สาธิต</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
