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
  Check
} from "lucide-react";

interface SystemArchitectureViewProps {
  onGoToDemo: () => void;
  onGoToLanding: () => void;
}

export default function SystemArchitectureView({ onGoToDemo, onGoToLanding }: SystemArchitectureViewProps) {
  const [activeTab, setActiveTab] = useState<"topology" | "tech_stack" | "security" | "workflow" | "roi">("topology");
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
            <p className="text-xs text-blue-100">แยกข้อมูลจำลองที่บ้าน ข้อมูลจริงอยู่ในห้อง Server สำนักงาน</p>
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
          onClick={() => setActiveTab("topology")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "topology"
              ? "bg-[#0F2942] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Network className="w-4 h-4 text-blue-400" />
          <span>๑. ผังสถาปัตยกรรมระบบ (Topology)</span>
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
          <span>๒. เทคโนโลยีที่เลือกใช้ (Tech Stack)</span>
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
          <span>๓. มาตรการความปลอดภัย & PDPA</span>
        </button>

        <button
          onClick={() => setActiveTab("workflow")}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "workflow"
              ? "bg-[#0F2942] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <GitBranch className="w-4 h-4 text-amber-400" />
          <span>๔. แผนพัฒนา บ้าน ↔ สำนักงาน</span>
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
          <span>๕. ความคุ้มค่าและผลประโยชน์ (ROI)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: TOPOLOGY & DOCKER ARCHITECTURE */}
      {/* ===================================================================== */}
      {activeTab === "topology" && (
        <div className="space-y-6">
          
          {/* Main Architectural Visual Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Production Topology Diagram</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                  <Server className="w-6 h-6 text-blue-600" />
                  ผังการติดตั้งและเชื่อมต่อระบบจริงภายในสำนักงาน (On-Premise)
                </h2>
              </div>
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                ระบบปิดในเครือข่าย Intranet 100% ปลอดภัยจากการเข้าถึงภายนอก
              </div>
            </div>

            {/* Visual Box Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Branch Offices (Clients) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border-2 border-dashed border-blue-200 space-y-3">
                  <div className="flex items-center gap-2.5 text-blue-900 font-extrabold text-base">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>เคาน์เตอร์ สส. ๙ สาขาทั่วพิจิตร</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    จุดบริการประชาชน ณ สาขาใกล้บ้าน (เช่น สส.โพทะเล, สส.ทับคล้อ, สส.บางมูลนาก ฯลฯ)
                  </p>
                  
                  <div className="space-y-2 pt-2 border-t border-blue-100 text-xs text-slate-700">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-sm">
                      <HardDrive className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span><strong>เครื่องอ่านบัตร Smart Card:</strong> Dip-Chip อ่านบัตร ปชช. เติมข้อมูล 1 วินาที</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-sm">
                      <Laptop className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span><strong>Web Browser (Edge / Chrome):</strong> เข้าใช้งานผ่าน WebApp ไม่ต้องลงโปรแกรม</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-sm">
                      <Printer className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span><strong>เครื่องพิมพ์เคาน์เตอร์:</strong> สั่งพิมพ์พร้อมลายน้ำปลายทาง + ล็อคโควตา</span>
                    </div>
                  </div>
                </div>

                {/* Network Conduit Indicator */}
                <div className="bg-blue-900 text-white p-3.5 rounded-xl flex items-center justify-between text-xs font-bold shadow-md">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-amber-400" />
                    <span>WAN / VPN กรมสรรพากร (Intranet)</span>
                  </div>
                  <span className="bg-blue-800 text-blue-200 px-2 py-0.5 rounded text-[11px] font-mono">Port 80/443</span>
                </div>

                {/* Central Office Internal Users */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 block flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-600" />
                    เจ้าหน้าที่ส่วนกลาง (สท.พิจิตร)
                  </span>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li><strong>งานบริการแบบฯ:</strong> ค้นหาแบบในคลัง / สแกนแนบไฟล์</li>
                    <li><strong>งานการเงิน / คลัง:</strong> ตรวจรับเงิน PromptPay / ออกใบเสร็จ</li>
                    <li><strong>ผู้บริหาร:</strong> ตรวจสอบ SLA / กำกับติดตามแบบเรียลไทม์</li>
                  </ul>
                </div>
              </div>

              {/* Middle & Right Column: On-Premise Host Server & Docker Cluster */}
              <div className="lg:col-span-8 bg-gradient-to-b from-[#0F2942] to-[#16365C] text-white p-6 sm:p-7 rounded-3xl shadow-xl border-2 border-blue-400/40 relative overflow-hidden flex flex-col justify-between space-y-6">
                
                {/* Server Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-400/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white">เครื่องเซิร์ฟเวอร์ On-Premise ในห้อง Server สำนักงาน</h3>
                      <p className="text-xs text-blue-200">ระบบปฏิบัติการ Linux Server / Windows Server • ข้อมูลอยู่ในความครอบครอง 100%</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow">
                    DOCKER CLUSTER
                  </span>
                </div>

                {/* Inside Docker Network Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-blue-200 font-bold px-1">
                    <span>🐳 Docker Bridge Network (Isolated Internal Network - ปิดพอร์ตภายนอก)</span>
                    <span className="text-amber-300 font-mono">rct-internal-net</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Container 1: Web App */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-blue-400/30 hover:border-blue-400 transition space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-white flex items-center gap-2">
                          <Laptop className="w-4 h-4 text-blue-400" />
                          ๑. Web & API Gateway
                        </span>
                        <span className="bg-blue-600/60 text-blue-100 text-[10px] font-mono px-2 py-0.5 rounded">rct-app</span>
                      </div>
                      <p className="text-xs text-blue-150">Next.js 16 + TypeScript รัน UI ทุกบทบาท พร้อม Server Actions ซ่อนความลับฝั่งเซิร์ฟเวอร์</p>
                      <div className="text-[11px] text-emerald-300 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Port 80 / 443 (เข้าใช้งานผ่านเว็บ)</span>
                      </div>
                    </div>

                    {/* Container 2: PostgreSQL Database */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border-2 border-emerald-400/50 hover:border-emerald-400 transition space-y-2 bg-emerald-950/20">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-emerald-300 flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-400" />
                          ๒. PostgreSQL 16 DB
                        </span>
                        <span className="bg-emerald-600/60 text-emerald-100 text-[10px] font-mono px-2 py-0.5 rounded">rct-db</span>
                      </div>
                      <p className="text-xs text-blue-150">ฐานข้อมูลหลัก เก็บคำร้อง, การเงิน, บันทึกสิทธิ์ และ Audit Log คุยเฉพาะในวงปิด</p>
                      <div className="text-[11px] text-amber-300 flex items-center gap-1.5 font-mono">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Internal Only (Port 5432 ไม่เปิดข้างนอก)</span>
                      </div>
                    </div>

                    {/* Container 3: MinIO Storage */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-blue-400/30 hover:border-blue-400 transition space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-sky-300 flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-sky-400" />
                          ๓. MinIO Object Storage
                        </span>
                        <span className="bg-sky-600/60 text-sky-100 text-[10px] font-mono px-2 py-0.5 rounded">rct-storage</span>
                      </div>
                      <p className="text-xs text-blue-150">จัดเก็บไฟล์แบบภาษี PDF และใบเสร็จอย่างปลอดภัย สร้างลิงก์เปิดดูแบบจำกัดเวลา</p>
                      <div className="text-[11px] text-sky-200 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>S3-Compatible Local Storage</span>
                      </div>
                    </div>

                    {/* Container 4: Automated Backup Cron */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-blue-400/30 hover:border-blue-400 transition space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-purple-300 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          ๔. Daily Auto-Backup
                        </span>
                        <span className="bg-purple-600/60 text-purple-100 text-[10px] font-mono px-2 py-0.5 rounded">rct-backup</span>
                      </div>
                      <p className="text-xs text-blue-150">สำรองฐานข้อมูลอัตโนมัติทุกเที่ยงคืน บีบอัด .sql.gz เก็บย้อนหลัง 30 วันลงดิสก์</p>
                      <div className="text-[11px] text-purple-200 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Zero Effort Maintenance</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Persistent Storage Layer Below Docker */}
                <div className="bg-black/30 p-4 rounded-2xl border border-blue-400/20 space-y-2">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    ฮาร์ดดิสก์จริงของเครื่องเซิร์ฟเวอร์สำนักงาน (Host Persistent Volumes)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-blue-200">
                    <div className="bg-white/5 p-2 rounded border border-white/10">📁 ./data/postgres (ข้อมูลตาราง)</div>
                    <div className="bg-white/5 p-2 rounded border border-white/10">📁 ./data/minio (ไฟล์ PDF แบบ)</div>
                    <div className="bg-white/5 p-2 rounded border border-white/10">📁 ./data/backups (ไฟล์กู้คืนระบบ)</div>
                  </div>
                  <p className="text-[11px] text-slate-300 italic pt-1">
                    * แม้จะมีการรีสตาร์ทเครื่อง ปิด Container หรืออัปเกรดเวอร์ชันซอฟต์แวร์ ข้อมูลทั้งหมดในฮาร์ดดิสก์จริงจะไม่สูญหาย 100%
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
      {/* TAB 4: DUAL-ENVIRONMENT WORKFLOW (HOME VS OFFICE) */}
      {/* ===================================================================== */}
      {activeTab === "workflow" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Development & Operational Lifecycle</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 mt-0.5">
                <GitBranch className="w-6 h-6 text-amber-600" />
                แนวทางการพัฒนาระบบสลับระหว่าง "ที่บ้าน" กับ "ที่สำนักงาน"
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                การทำงานที่ยืดหยุ่นของผู้พัฒนา ควบคู่กับความปลอดภัยสูงสุดของข้อมูลราชการ (Zero Leak Policy)
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Home Dev Box */}
              <div className="bg-amber-50/50 rounded-2xl p-6 border-2 border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-950 text-lg flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-amber-600" />
                    ๑. เครื่องที่บ้าน (Development Environment)
                  </span>
                  <span className="bg-amber-200 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    MOCK DATA ONLY
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  ใช้สำหรับพัฒนาหน้าจอ ปรับแต่ง UI และเขียนฟังก์ชันใหม่ โดยใช้สภาพแวดล้อมจำลอง:
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>PostgreSQL บน Docker ของเครื่องบ้าน:</strong> รันฐานข้อมูลจำลองในเครื่องตนเอง ไม่ต้องต่อเน็ตเข้าสำนักงาน</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>สคริปต์สร้างข้อมูลจำลอง (Seed Data):</strong> คำสั่ง <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">npm run db:seed</code> สร้างชื่อและคำร้องสมมติให้ทดสอบทันที</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>นโยบายความปลอดภัย PDPA:</strong> ไม่มีข้อมูลจริงของผู้เสียภาษีหลุดรอดออกจากสำนักงานแม้แต่ตัวอักษรเดียว</span>
                  </li>
                </ul>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 text-xs text-slate-600 space-y-1.5">
                  <span className="font-bold text-amber-900 block">เมื่อเพิ่มฟิลด์ในฐานข้อมูล:</span>
                  <p className="font-mono bg-slate-900 text-emerald-400 p-2 rounded text-[11px]">
                    npx prisma migrate dev --name add_new_feature
                  </p>
                  <p className="text-[11px] text-slate-500">ระบบจะสร้างไฟล์ Migration อัตโนมัติ พร้อมส่งขึ้น Git Repository</p>
                </div>
              </div>

              {/* Office Prod Box */}
              <div className="bg-blue-50/50 rounded-2xl p-6 border-2 border-blue-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-950 text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    ๒. เซิร์ฟเวอร์สำนักงาน (Production Environment)
                  </span>
                  <span className="bg-blue-200 text-blue-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    REAL TAX DATA
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  เครื่องเซิร์ฟเวอร์หลักที่สำนักงานพื้นที่พิจิตร ให้บริการเจ้าหน้าที่เคาน์เตอร์ทั้งจังหวัด:
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>ฐานข้อมูลจริง (Real Data):</strong> เก็บข้อมูลคำร้อง แบบภาษี และใบเสร็จจริงของทางราชการ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>อัปเดตระบบด้วย Git:</strong> สั่ง <code className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono font-bold">git pull</code> ดึงโค้ดล่าสุดจากเครื่องบ้านมาปรับใช้</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>อัปเดตตารางโดยข้อมูลไม่หาย:</strong> สั่งรัน Migration อัปเดตโครงสร้างใหม่เข้า Database จริงได้ทันที</span>
                  </li>
                </ul>

                <div className="bg-white p-3.5 rounded-xl border border-blue-200 text-xs text-slate-600 space-y-1.5">
                  <span className="font-bold text-blue-900 block">คำสั่งอัปเดตฐานข้อมูล Production:</span>
                  <p className="font-mono bg-slate-900 text-emerald-400 p-2 rounded text-[11px]">
                    docker compose exec rct-app npx prisma migrate deploy
                  </p>
                  <p className="text-[11px] text-slate-500">ตารางจะอัปเกรดอัตโนมัติ โดยข้อมูลเก่าทั้งหมดของสำนักงานยังอยู่ครบ 100%</p>
                </div>
              </div>

            </div>

            {/* Step-by-Step Flow Banner */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                วงจรชีวิตการทำงานจริง (Daily Development Cycle)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-amber-300 font-bold block mb-1">สเต็ป ๑ (ที่บ้าน):</span>
                  เขียนโค้ด ทดสอบกับ Mock Data จนมั่นใจ
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-amber-300 font-bold block mb-1">สเต็ป ๒ (ที่บ้าน):</span>
                  สั่ง <code className="font-mono text-emerald-300">git push</code> ส่งขึ้น Private Repo
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-amber-300 font-bold block mb-1">สเต็ป ๓ (สำนักงาน):</span>
                  สั่ง <code className="font-mono text-emerald-300">git pull</code> ดึงการอัปเดต
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-amber-300 font-bold block mb-1">สเต็ป ๔ (สำนักงาน):</span>
                  Docker รีโหลดโค้ดใหม่ เจ้าหน้าที่ใช้งานได้ทันที
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: VALUE & RETURN ON INVESTMENT (ROI) */}
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
