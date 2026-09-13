"use client";

import React, { useState } from "react";
import { 
  Building2, 
  FolderSearch, 
  CreditCard, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  ArrowRight,
  Stamp,
  Lock,
  Smartphone,
  Receipt,
  Check,
  Shield,
  Send,
  Eye,
  CheckCircle,
  DollarSign,
  Award,
  Upload,
  FileCheck,
  Scan,
  HardDrive,
  UserCheck,
  Search,
  Edit3,
  X,
  FileSignature,
  Save,
  Home,
  ChevronRight,
  Layers,
  AlertTriangle,
  Zap,
  TrendingUp,
  ShieldAlert
} from "lucide-react";

// Flow Step Types
export type FlowStep = 
  | "landing"           // 🏠 หน้าแรก: Hero Header + แผนพัฒนา ๓ เฟส + CTA
  | "branch_intake"     // 1. เคาน์เตอร์ สส. (รับคำขอ / เสียบบัตร)
  | "central_search"    // 2. ส่วนคัดแบบ (ค้นภาพ/สแกนกระดาษ & อัปโหลด & สร้าง QR)
  | "branch_payment"    // 3. เคาน์เตอร์ สส. (ประชาชนสแกน QR จ่ายเงิน)
  | "treasury_finance"  // 4. หน้าจอการเงิน (ตัดรับเงิน & ออกใบเสร็จ)
  | "branch_print"      // 5. เคาน์เตอร์ สส. (พิมพ์เอกสารพร้อมลายน้ำ & e-Seal)
  | "executive_sla";    // 6. แดชบอร์ดผู้บริหาร

// Comprehensive Watermark Preset Options based on Real-World Tax Form Intake
export interface WatermarkPreset {
  id: string;
  category: string;
  label: string;
  watermarkText: string;
  targetOrg: string;
  inspectionFocus: string;
}

export const WATERMARK_PRESETS: WatermarkPreset[] = [
  // 1. ขอสินเชื่อ
  {
    id: "loan_kbank",
    category: "ขอสินเชื่อ / สถาบันการเงิน",
    label: "ธนาคารกสิกรไทย (KBANK) - ขอสินเชื่อธุรกิจ/ส่วนบุคคล",
    watermarkText: "ธนาคารกสิกรไทย (KBANK)",
    targetOrg: "ธนาคารกสิกรไทย สาขาพิจิตร",
    inspectionFocus: "รายได้และความสามารถในการชำระหนี้"
  },
  {
    id: "loan_scb",
    category: "ขอสินเชื่อ / สถาบันการเงิน",
    label: "ธนาคารไทยพาณิชย์ (SCB) - ขอสินเชื่อ/บัตรเครดิต",
    watermarkText: "ธนาคารไทยพาณิชย์ (SCB)",
    targetOrg: "ธนาคารไทยพาณิชย์",
    inspectionFocus: "รายได้และความสามารถในการชำระหนี้"
  },
  {
    id: "loan_ktb",
    category: "ขอสินเชื่อ / สถาบันการเงิน",
    label: "ธนาคารกรุงไทย (KTB) - สินเชื่อข้าราชการ/ประชาชน",
    watermarkText: "ธนาคารกรุงไทย (KTB)",
    targetOrg: "ธนาคารกรุงไทย สาขาโพทะเล",
    inspectionFocus: "ประวัติรายได้และความมั่นคงทางการเงิน"
  },
  {
    id: "loan_auto",
    category: "ขอสินเชื่อ / สถาบันการเงิน",
    label: "สถาบันการเงิน / ไฟแนนซ์รถยนต์ / เช่าซื้อยานพาหนะ",
    watermarkText: "ไฟแนนซ์/เช่าซื้อรถยนต์",
    targetOrg: "สถาบันการเงินผู้ให้สินเชื่อยานยนต์",
    inspectionFocus: "รายได้และความสามารถในการชำระหนี้"
  },

  // 2. ทำธุรกรรมด้านที่อยู่อาศัย
  {
    id: "housing_ghb",
    category: "ทำธุรกรรมด้านที่อยู่อาศัย",
    label: "ธนาคารอาคารสงเคราะห์ (ธอส.) - ขอสินเชื่อบ้าน",
    watermarkText: "ธอส. สินเชื่อบ้าน",
    targetOrg: "ธนาคารอาคารสงเคราะห์ (ธอส.)",
    inspectionFocus: "รายได้ย้อนหลังของผู้กู้/ผู้ค้ำ"
  },
  {
    id: "housing_refinance",
    category: "ทำธุรกรรมด้านที่อยู่อาศัย",
    label: "สถาบันการเงิน - ขอสินเชื่อบ้าน / รีไฟแนนซ์ / เช่าซื้อ",
    watermarkText: "สินเชื่อที่อยู่อาศัย/รีไฟแนนซ์",
    targetOrg: "สถาบันการเงินผู้รับรีไฟแนนซ์",
    inspectionFocus: "รายได้ย้อนหลังของผู้กู้/ผู้ค้ำ"
  },

  // 3. ขอวีซ่าหรือเดินทางต่างประเทศ
  {
    id: "visa_embassy",
    category: "ขอวีซ่าหรือเดินทางต่างประเทศ",
    label: "สถานทูต / สถานกงสุล - ยื่นคำร้องขอวีซ่า (Visa)",
    watermarkText: "FOR VISA APPLICATION ONLY / ยื่นขอวีซ่า",
    targetOrg: "สถานทูต / สถานกงสุล",
    inspectionFocus: "ฐานะการเงินและรายได้ที่ตรวจสอบได้"
  },

  // 4. สมัครเรียน/ทุน/งานบางประเภท
  {
    id: "scholarship",
    category: "สมัครเรียน / ทุน / งานบางประเภท",
    label: "หน่วยงานผู้ให้ทุน / สถานศึกษา - ยื่นขอรับทุนการศึกษา",
    watermarkText: "ยื่นขอรับทุนการศึกษา",
    targetOrg: "สถานศึกษา / หน่วยงานผู้ให้ทุน",
    inspectionFocus: "สถานะรายได้ หรือใช้ประกอบเอกสารทางการเงิน"
  },
  {
    id: "job_application",
    category: "สมัครเรียน / ทุน / งานบางประเภท",
    label: "นายจ้าง / หน่วยงานที่ทำงาน - สมัครงาน/ตรวจคุณสมบัติ",
    watermarkText: "สมัครงาน/ตรวจคุณสมบัติรายได้",
    targetOrg: "นายจ้าง / ฝ่ายบุคคล",
    inspectionFocus: "สถานะรายได้ หรือใช้ประกอบเอกสารทางการเงิน"
  },

  // 5. ธุรกิจและนิติบุคคล
  {
    id: "biz_partner",
    category: "ธุรกิจและนิติบุคคล",
    label: "คู่ค้า / ผู้ร่วมลงทุน - ตรวจสอบความน่าเชื่อถือทางธุรกิจ",
    watermarkText: "คู่ค้า/ตรวจสอบเครดิตทางธุรกิจ",
    targetOrg: "ธนาคาร, คู่ค้า, ผู้ลงทุน",
    inspectionFocus: "ผลประกอบการ รายได้ และภาษีที่ยื่น"
  },
  {
    id: "biz_audit",
    category: "ธุรกิจและนิติบุคคล",
    label: "ผู้สอบบัญชีรับอนุญาต (CPA) - ตรวจสอบบัญชีธุรกิจ",
    watermarkText: "งานตรวจสอบบัญชี (Audit Only)",
    targetOrg: "ผู้สอบบัญชี / สำนักงานบัญชี",
    inspectionFocus: "ผลประกอบการ รายได้ และภาษีที่ยื่น"
  },

  // 6. ร่วมงานภาครัฐ/เอกชน
  {
    id: "gov_procurement",
    category: "ร่วมงานภาครัฐ/เอกชน",
    label: "หน่วยงานจัดซื้อจัดจ้างภาครัฐ (e-GP) - ยื่นประมูลงาน",
    watermarkText: "ยื่นจัดซื้อจัดจ้างภาครัฐ/e-GP",
    targetOrg: "หน่วยงานจัดซื้อจัดจ้าง, คู่สัญญา",
    inspectionFocus: "ใช้ประกอบคุณสมบัติหรือเอกสารทางการเงิน"
  },

  // 7. คดีและนิติกรรม
  {
    id: "legal_court",
    category: "คดีและนิติกรรม",
    label: "ศาลยุติธรรม / เจ้าพนักงานบังคับคดี - ประกอบสำนวนคดี",
    watermarkText: "ประกอบการพิจารณาคดีในศาล",
    targetOrg: "ศาล, ทนาย, การแบ่งทรัพย์สิน/มรดก",
    inspectionFocus: "หลักฐานรายได้ในช่วงเวลาที่เกี่ยวข้อง"
  },
  {
    id: "legal_estate",
    category: "คดีและนิติกรรม",
    label: "ทนายความ / นิติกรรมการแบ่งทรัพย์สินและมรดก",
    watermarkText: "นิติกรรมมรดก/แบ่งทรัพย์สิน",
    targetOrg: "ศาล, ทนาย, การแบ่งทรัพย์สิน/มรดก",
    inspectionFocus: "หลักฐานรายได้ในช่วงเวลาที่เกี่ยวข้อง"
  },

  // 8. แก้ไขเอกสารสูญหาย
  {
    id: "lost_personal",
    category: "แก้ไขเอกสารสูญหาย",
    label: "ผู้เสียภาษีเอง - ขอคัดทดแทนเอกสารเดิมสูญหาย",
    watermarkText: "หลักฐานส่วนบุคคล (ทดแทนฉบับสูญหาย)",
    targetOrg: "ผู้เสียภาษีเอง (นายสมชาย มุ่งมั่นพัฒนา)",
    inspectionFocus: "ใช้อ้างอิงรายการที่เคยยื่นหรือจัดทำบัญชีย้อนหลัง"
  },
  {
    id: "lost_accounting",
    category: "แก้ไขเอกสารสูญหาย",
    label: "สำนักงานบัญชี - ใช้อ้างอิงจัดทำบัญชีย้อนหลัง",
    watermarkText: "อ้างอิงจัดทำบัญชีย้อนหลัง",
    targetOrg: "สำนักงานบัญชี",
    inspectionFocus: "ใช้อ้างอิงรายการที่เคยยื่นหรือจัดทำบัญชีย้อนหลัง"
  },

  // 9. กำหนดเอง
  {
    id: "custom",
    category: "กำหนดปลายทางเอง (Custom)",
    label: "✏️ กำหนดปลายทาง/ข้อความลายน้ำเอง (Custom)",
    watermarkText: "หน่วยงานปลายทางเฉพาะ",
    targetOrg: "ระบุตามคำขอของประชาชน",
    inspectionFocus: "ตรวจสอบตามวัตถุประสงค์เฉพาะ"
  }
];

export default function RCTDemoApp() {
  // Active Flow Step (Defaults to Landing Page: Hero Header + แผน ๓ เฟส)
  const [currentStep, setCurrentStep] = useState<FlowStep>("landing");
  
  // Smart Card & Request Form States (Step 1)
  const [cardInserted, setCardInserted] = useState<boolean>(false);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  // Search & Upload State in Central (Step 2)
  const [searchSource, setSearchSource] = useState<"database_image" | "paper_scan">("database_image");
  const [fileFound, setFileFound] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<boolean>(true);

  // Simulation States
  const [qrGenerated, setQrGenerated] = useState<boolean>(true);
  const [qrScanned, setQrScanned] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [receiptIssued, setReceiptIssued] = useState<boolean>(false);
  const [printedCopies, setPrintedCopies] = useState<number>(0);
  const totalCopies = 2;
  const feePerCopy = 20;
  const totalFee = 40;

  // Selected Targeted Watermark
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>("loan_kbank");
  const [customWatermark, setCustomWatermark] = useState<string>("");

  const currentPreset = WATERMARK_PRESETS.find(p => p.id === selectedPurposeId) || WATERMARK_PRESETS[0];

  const activeWatermarkText = selectedPurposeId === "custom" && customWatermark.trim()
    ? customWatermark.trim()
    : currentPreset.watermarkText;
  
  // Modals
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // -------------------------------------------------------------
  // FLOW STEP ACTIONS (With Auto-Jumping)
  // -------------------------------------------------------------

  // Step 1: Branch sends request to Central
  const handleBranchSendToCentral = () => {
    if (!requestSubmitted) {
      showToast("⚠️ กรุณากดเขียนคำร้องและกด 'ส่งคำร้อง' ก่อนส่งต่อไปยังส่วนคัดแบบ");
      if (!cardInserted) setCardInserted(true);
      setShowRequestModal(true);
      return;
    }
    showToast("✓ เคาน์เตอร์ สส.โพทะเล ส่งคำขอคัดแบบ ภ.ง.ด.90 ไปยังส่วนคัดแบบ (สท.พิจิตร) เรียบร้อย");
    setCurrentStep("central_search"); // Jump to Step 2!
  };

  // Step 2: Central Officer uploads scanned PDF and generates QR -> Sends to Branch
  const handleCentralUploadAndSend = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFileUploaded(true);
      setQrGenerated(true);
      showToast("✓ อัปโหลดไฟล์แบบ ภ.ง.ด.90 และส่ง QR คิดเงิน 40 บ. ไปยัง เคาน์เตอร์ สส. แล้ว");
      setCurrentStep("branch_payment"); // Jump to Step 3!
    }, 400);
  };

  // Step 3: Citizen scans QR at Branch Counter
  const handleCitizenScanQR = () => {
    setQrScanned(true);
    showToast("✓ ประชาชนสแกน QR ชำระเงิน 40.00 บาท สำเร็จ -> ส่งสัญญาณแจ้งฝ่ายการเงินทันที");
    setTimeout(() => {
      setCurrentStep("treasury_finance"); // Jump to Step 4!
    }, 600);
  };

  // Step 4: Finance confirms & issues e-Receipt & unlocks quota
  const handleFinanceConfirmAndUnlock = () => {
    setPaymentConfirmed(true);
    setReceiptIssued(true);
    showToast("✓ ฝ่ายการเงินออกใบเสร็จรับเงิน e-Receipt สำเร็จ -> ปลดล็อคโควตาพิมพ์ 2 ฉบับให้ สส. แล้ว");
    setCurrentStep("branch_print"); // Jump to Step 5!
  };

  // Step 5: Print Document with Quota Deduction
  const handlePrintDocument = () => {
    if (printedCopies >= totalCopies) {
      alert("⚠️ โควตาการพิมพ์เอกสารครบตามจำนวนที่ชำระเงินแล้ว (2/2 ฉบับ) ระบบล็อคป้องกันการพิมพ์ซ้ำ");
      return;
    }
    const next = printedCopies + 1;
    setPrintedCopies(next);
    setShowDocumentModal(true);
    showToast(`🖨️ สั่งพิมพ์เอกสารชุดที่ ${next}/${totalCopies} พร้อมลายน้ำและ e-Seal เรียบร้อย`);
  };

  // Step 5 Completion: Finish delivery and jump to Dashboard
  const handleFinishDelivery = () => {
    showToast("🎉 ส่งมอบเอกสารให้ประชาชนเรียบร้อย -> เข้าสู่แดชบอร์ด SLA สรุปผลงาน");
    setCurrentStep("executive_sla"); // Jump to Step 6!
  };

  // Reset Demo
  const handleResetDemo = () => {
    setCurrentStep("landing");
    setCardInserted(false);
    setRequestSubmitted(false);
    setShowRequestModal(false);
    setSearchSource("database_image");
    setFileFound(true);
    setFileUploaded(true);
    setQrGenerated(true);
    setQrScanned(false);
    setPaymentConfirmed(false);
    setReceiptIssued(false);
    setPrintedCopies(0);
    setShowDocumentModal(false);
    setShowGuideModal(false);
    showToast("🔄 รีเซ็ตข้อมูลการสาธิตกลับสู่หน้าแรก (Hero & แผนงาน ๓ เฟส) เรียบร้อย");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans text-sm">
      
      {/* Toast Notification (Bottom Right) */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-blue-700 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-blue-400 flex items-center gap-3.5 animate-bounce">
          <Sparkles className="w-6 h-6 text-amber-300 flex-shrink-0" />
          <span className="font-bold text-base">{toastMessage}</span>
        </div>
      )}

      {/* TOP BAR: Clean Government Header */}
      <header className="bg-[#0F2942] text-white sticky top-0 z-40 px-6 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & System Identity */}
          <div 
            onClick={() => setCurrentStep("landing")}
            className="flex items-center gap-3.5 cursor-pointer group"
            title="คลิกเพื่อกลับสู่หน้าแรก & แผนยุทธศาสตร์ ๓ เฟส"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 group-hover:bg-blue-500 flex items-center justify-center shadow-md border border-blue-400/50 transition">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-lg tracking-wide group-hover:text-blue-300 transition">RCT PLATFORM</span>
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
                  STAGE DEMO
                </span>
                <span className="bg-blue-800 text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-600">
                  เฟส ๒ WebApp
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">ระบบบริการคัดแบบแสดงรายการภาษีอัจฉริยะ • สท.พิจิตร กรมสรรพากร</p>
            </div>
          </div>

          {/* Quick Stage Controls */}
          <div className="flex items-center gap-3">
            {currentStep === "landing" ? (
              <button
                onClick={() => setCurrentStep("branch_intake")}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
              >
                <span>เข้าสู่ระบบ Demo ➔</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep("landing")}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>หน้าแรก & แผน ๓ เฟส</span>
              </button>
            )}

            <button
              onClick={() => setShowGuideModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>🎙️ คู่มือบทพูดบนเวที</span>
            </button>

            <button
              onClick={handleResetDemo}
              className="px-3.5 py-2 bg-blue-900/90 hover:bg-blue-800 text-blue-100 text-sm font-medium rounded-xl border border-blue-700 flex items-center gap-1.5 transition cursor-pointer"
              title="เริ่มสาธิตใหม่ตั้งแต่ต้น"
            >
              <RefreshCw className="w-4 h-4" />
              <span>เริ่มใหม่</span>
            </button>
          </div>

        </div>
      </header>

      {/* STEP PROGRESS BAR / FLOW CONTROLLER (Home + 6 Clear Operational Steps) */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 shadow-sm sticky top-[66px] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
            
            {/* Tab: หน้าแรก & แผน ๓ เฟส */}
            <button
              onClick={() => setCurrentStep("landing")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "landing"
                  ? "bg-amber-50 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "landing" ? "bg-amber-500 text-slate-950 shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                <Home className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold truncate">หน้าแรก & แผน ๓ เฟส</span>
            </button>

            {/* Step 1: สส. รับคำขอ */}
            <button
              onClick={() => setCurrentStep("branch_intake")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "branch_intake"
                  ? "bg-blue-50 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "branch_intake" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                ๑
              </div>
              <span className="text-xs font-bold truncate">สส. (รับคำขอ/เสียบบัตร)</span>
            </button>

            {/* Step 2: ส่วนคัดแบบ (อัปโหลดไฟล์) */}
            <button
              onClick={() => setCurrentStep("central_search")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "central_search"
                  ? "bg-blue-50 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "central_search" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                ๒
              </div>
              <span className="text-xs font-bold truncate">ส่วนคัดแบบ (อัปโหลดไฟล์)</span>
            </button>

            {/* Step 3: สส. ชำระเงิน */}
            <button
              onClick={() => setCurrentStep("branch_payment")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "branch_payment"
                  ? "bg-blue-50 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "branch_payment" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                ๓
              </div>
              <span className="text-xs font-bold truncate">สส. (สแกนจ่าย QR)</span>
              {qrScanned && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
            </button>

            {/* Step 4: การเงิน */}
            <button
              onClick={() => setCurrentStep("treasury_finance")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "treasury_finance"
                  ? "bg-blue-50 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "treasury_finance" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                ๔
              </div>
              <span className="text-xs font-bold truncate">การเงิน (ออกใบเสร็จ)</span>
              {receiptIssued && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
            </button>

            {/* Step 5: พิมพ์เอกสาร */}
            <button
              onClick={() => setCurrentStep("branch_print")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "branch_print"
                  ? "bg-blue-50 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "branch_print" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                ๕
              </div>
              <span className="text-xs font-bold truncate">พิมพ์แบบ (e-Seal)</span>
              {printedCopies > 0 && (
                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[11px] font-extrabold flex-shrink-0">
                  {printedCopies}/{totalCopies}
                </span>
              )}
            </button>

            {/* Step 6: แดชบอร์ด SLA */}
            <button
              onClick={() => setCurrentStep("executive_sla")}
              className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl transition font-medium border cursor-pointer ${
                currentStep === "executive_sla"
                  ? "bg-blue-50 border-blue-600 text-blue-950 shadow-sm ring-2 ring-blue-500/20 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                currentStep === "executive_sla" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
              }`}>
                ๖
              </div>
              <span className="text-xs font-bold truncate">แดชบอร์ด SLA</span>
            </button>

          </div>
        </div>
      </div>

      {/* MAIN VIEW CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">

        {/* ========================================================================= */}
        {/* LANDING PAGE: Hero Header + CTA + 4 Feature Cards + 3-Phase Roadmap Table */}
        {/* ========================================================================= */}
        {currentStep === "landing" && (
          <div className="space-y-10 animate-fadeIn">

            {/* 1. HERO HEADER SECTION (Matching Reference Image Layout) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E33] via-[#102D4F] to-[#1A3D69] text-white p-8 md:p-12 shadow-2xl border border-blue-500/20">
              {/* Background ambient glows */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Column: Text & Call-To-Actions */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>RCT PLATFORM • สรรพากรพื้นที่พิจิตร กรมสรรพากร</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]">
                    สร้างระบบบริการคัดแบบภาษี <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                      ที่พร้อมใช้งานจริง
                    </span>{" "}
                    <span className="text-blue-300 text-2xl sm:text-3xl md:text-4xl font-extrabold block sm:inline">
                      (RCT WebApp)
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
                    ยกระดับความสะดวกให้ประชาชน ประหยัดเวลาและค่าเดินทาง พร้อมทั้งเพิ่มความมั่นคงปลอดภัยของข้อมูลภาษี ปิดความเสี่ยง PDPA และควบคุมการพิมพ์สำเนา ๔ ชั้น ป้องกันการทำซ้ำ 100%
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900/60 border border-blue-600/50 text-xs font-semibold text-blue-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ลดเวลาเหลือ ๓ - ๕ นาที
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900/60 border border-blue-600/50 text-xs font-semibold text-blue-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      ห้ามดาวน์โหลด No Local Storage
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900/60 border border-blue-600/50 text-xs font-semibold text-blue-200">
                      <Lock className="w-3.5 h-3.5 text-amber-300" />
                      Print Quota Lock ๑ สิทธิ์/คำขอ
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <button
                      onClick={() => setCurrentStep("branch_intake")}
                      className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-base font-black rounded-2xl shadow-xl hover:shadow-amber-500/25 flex items-center gap-3 transition transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>เข้าสู่ระบบ Demo</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setShowGuideModal(true)}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-base font-bold rounded-2xl border border-white/20 backdrop-blur-md flex items-center gap-2.5 transition cursor-pointer"
                    >
                      <Award className="w-5 h-5 text-amber-300" />
                      <span>ดูบทพูดบนเวที</span>
                    </button>

                    <a
                      href="#roadmap-section"
                      className="text-sm font-semibold text-blue-300 hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition ml-1"
                    >
                      <span>ดูแผนพัฒนา ๓ เฟส</span>
                      <span>↓</span>
                    </a>
                  </div>

                </div>

                {/* Right Column: Live Mockup / Platform Dashboard Frame */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-blue-400/30 rounded-2xl shadow-2xl p-5 relative overflow-hidden group">
                    {/* Window Controls Header */}
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                        <span className="ml-2 font-mono text-[11px] text-blue-300">rct-internal.rd.go.th/portal</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        LIVE READY
                      </span>
                    </div>

                    {/* Dashboard Preview Cards inside Mockup */}
                    <div className="space-y-3.5">
                      <div className="bg-gradient-to-r from-blue-900/50 to-indigo-950/50 p-4 rounded-xl border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-blue-200">สถานะระบบวันนี้</span>
                          <span className="text-[11px] font-bold text-amber-300">สท.พิจิตร ⇄ สส.โพทะเล</span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-3xl font-black text-white">3.8</span>
                          <span className="text-xs text-blue-300">นาที เฉลี่ย/คำขอ (SLA &lt; 5 นาที)</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700">
                          <div className="text-[11px] text-slate-400">ความปลอดภัย PDPA</div>
                          <div className="text-lg font-black text-emerald-400 mt-1">100%</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">No Local Storage</div>
                        </div>
                        <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700">
                          <div className="text-[11px] text-slate-400">ระบบคุมพิมพ์ 4 ชั้น</div>
                          <div className="text-lg font-black text-amber-300 mt-1">Active</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Print Quota Locked</div>
                        </div>
                      </div>

                      {/* Mockup Quick Jump */}
                      <button
                        onClick={() => setCurrentStep("branch_intake")}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Scan className="w-4 h-4" />
                        <span>เริ่มการจำลองขั้นตอนที่ ๑: เคาน์เตอร์ สส. ➔</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* 2. FOUR FEATURE HIGHLIGHT CARDS (Matching Reference Image) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: ปลอดภัย มั่นใจได้ */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition group">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">ปลอดภัย มั่นใจได้ (PDPA)</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  ปิดความเสี่ยงข้อมูลภาษีรั่วไหล 100% ด้วยสถาปัตยกรรม No Local Storage เจ้าหน้าที่ไม่สามารถเซฟหรือดาวน์โหลดไฟล์ลงเครื่องคอมพิวเตอร์ส่วนตัวได้
                </p>
              </div>

              {/* Card 2: ใช้งานง่าย รวดเร็ว */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">ใช้งานง่าย รวดเร็ว (Smart Counter)</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  เสียบบัตร Smart Card ดึงข้อมูลกรอกคำร้องอัตโนมัติ ลดขั้นตอนการพิมพ์และขจัดความผิดพลาดในการสะกดชื่อ-สกุล ข้อมูลแม่นยำ 100%
                </p>
              </div>

              {/* Card 3: ควบคุมการพิมพ์ ๔ ชั้น */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition group">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">ควบคุมการพิมพ์ ๔ ชั้น</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  ปลดล็อกโควตา 1 ครั้งต่อคำขอ + ลายน้ำระบุปลายทางเฉพาะเจาะจง + e-Seal + QR Code ตรวจสอบย้อนหลัง ป้องกันการเวียนใช้ซ้ำ 100%
                </p>
              </div>

              {/* Card 4: ดูแลต่อเนื่องและโปร่งใส */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition group">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">โปร่งใส ตรวจสอบได้ (SLA)</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  มีระบบ Audit Log บันทึกทุกกิจกรรมและจำนวนครั้งที่พิมพ์ พร้อมแดชบอร์ด SLA แบบ Real-Time ให้ผู้บริหารกำกับดูแลได้ทันที
                </p>
              </div>

            </div>

            {/* 3. ROADMAP SECTION: แผนการพัฒนาระบบคัดแบบแสดงรายการภาษีอากร RCT (3 เฟส) */}
            <div id="roadmap-section" className="space-y-6 pt-4">
              
              {/* Section Header */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>ROADMAP STRATEGY • ยุทธศาสตร์การพัฒนานวัตกรรม</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      แผนการพัฒนาระบบคัดแบบแสดงรายการภาษีอากร RCT
                    </h2>
                    <p className="text-sm font-semibold text-blue-700">
                      (Request for Copy of Tax Return Platform)
                    </p>
                    <p className="text-sm text-slate-600 max-w-4xl leading-relaxed pt-1">
                      ถูกวางกรอบการดำเนินงานออกเป็น 3 เฟส เพื่อยกระดับความสะดวกให้ประชาชน ประหยัดเวลาและค่าเดินทาง พร้อมทั้งเพิ่มความมั่นคงปลอดภัยของข้อมูลภาษี ดังนี้
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentStep("branch_intake")}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow flex items-center gap-2 transition flex-shrink-0 cursor-pointer"
                  >
                    <span>ทดสอบระบบ Demo ➔</span>
                  </button>
                </div>
              </div>

              {/* 3.1 COMPARATIVE TABLE (ตารางเปรียบเทียบ ๓ เฟส) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      📊
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      ตารางเปรียบเทียบการดำเนินงาน ๓ เฟส (Comparative Matrix)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    เลื่อนในแนวนอนเพื่อดูรายละเอียดครบทุกคอลัมน์ ➔
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                        <th className="p-4 w-[18%] min-w-[160px] bg-slate-100 text-slate-900 font-extrabold">
                          มิติการเปรียบเทียบ
                        </th>
                        
                        {/* Col 1: Phase 1 */}
                        <th className="p-4 w-[27%] min-w-[240px] bg-amber-50/70 border-l border-slate-200">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black">๑</span>
                            <span className="text-amber-950 font-black text-sm">เฟส 1: ระบบปัจจุบัน</span>
                          </div>
                          <div className="text-xs font-semibold text-amber-800 mt-1">LINE + เครื่อง EDC</div>
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-amber-200/80 text-amber-950 text-[11px] font-bold">
                            Zero Budget (เครื่องมือเดิม)
                          </span>
                        </th>

                        {/* Col 2: Phase 2 (Current Demo) */}
                        <th className="p-4 w-[28%] min-w-[260px] bg-blue-50/90 border-l border-blue-200 ring-1 ring-blue-500/20">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">๒</span>
                            <span className="text-blue-950 font-black text-sm">เฟส 2: เว็บแอปภายใน (RCT)</span>
                          </div>
                          <div className="text-xs font-semibold text-blue-800 mt-1">[ระบบใน Stage Demo นี้]</div>
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-black shadow-sm">
                            🌟 ปลอดภัย & คุมพิมพ์ ๔ ชั้น
                          </span>
                        </th>

                        {/* Col 3: Phase 3 */}
                        <th className="p-4 w-[27%] min-w-[240px] bg-emerald-50/70 border-l border-slate-200">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">๓</span>
                            <span className="text-emerald-950 font-black text-sm">เฟส 3: ดิจิทัลเต็มรูปแบบ</span>
                          </div>
                          <div className="text-xs font-semibold text-emerald-800 mt-1">Citizen Self-Service</div>
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-950 text-[11px] font-bold">
                            🚀 Paperless 100% (ThaID)
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      
                      {/* Row 1: วัตถุประสงค์ & แนวคิด */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          🎯 วัตถุประสงค์หลัก & แนวคิด
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-700">
                          เน้นแก้ปัญหาความเดือดร้อนเร่งด่วนด้วยเครื่องมือที่มีอยู่เดิม (Zero Budget)
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 font-semibold text-blue-950">
                          เน้นยกระดับความปลอดภัย ปิดความเสี่ยง PDPA และควบคุมการพิมพ์สำเนา
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 text-slate-700">
                          เน้นความสะดวกสูงสุด ประชาชนขอคัดแบบออนไลน์ได้เองทุกที่ ทุกเวลา สู่ระบบ Paperless 100%
                        </td>
                      </tr>

                      {/* Row 2: การทำงานหลัก */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          ⚙️ รูปแบบการทำงาน
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-700 leading-relaxed">
                          เจ้าหน้าที่ สส. รับคำร้อง สแกนบัตรฯ แจ้งขอคัดแบบไปยังส่วนคัดแบบผ่านกลุ่ม LINE (ไม่มีส่งไฟล์ภาพกลับทาง LINE) ค้นหา/พิมพ์แบบดั้งเดิม แล้วส่งเอกสารกระดาษ
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 text-blue-950 leading-relaxed">
                          ระบบเว็บแอปพลิเคชันภายใน เชื่อมโยง สส. (สาขา) และส่วนคัดแบบ (สป.) แบบเรียลไทม์ รับส่งไฟล์ผ่านระบบปิดที่ควบคุมเบ็ดเสร็จ
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 text-slate-700 leading-relaxed">
                          ประชาชนดำเนินการด้วยตนเองผ่านมือถือ/คอมพิวเตอร์ จากที่บ้าน เชื่อมโยงฐานข้อมูลภาษีและส่งเอกสารดิจิทัลตรงสู่ปลายทาง
                        </td>
                      </tr>

                      {/* Row 3: การยืนยันตัวตน */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          🪪 การยืนยันตัวตน
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-700">
                          สแกนบัตรประชาชนกระดาษ / ถ่ายสำเนาบัตร
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 font-semibold text-blue-950">
                          อ่านบัตรประชาชน Smart Card ณ เคาน์เตอร์ สส. (ดึงข้อมูลอัตโนมัติ)
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 font-semibold text-emerald-900">
                          ยืนยันตัวตนระดับสากลผ่านแอปพลิเคชัน <strong>ThaID (IAL 2.3)</strong>
                        </td>
                      </tr>

                      {/* Row 4: ความปลอดภัย & PDPA */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          🛡️ ความปลอดภัย & PDPA
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-rose-700">
                          <span className="font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 inline" />
                            เสี่ยงต่อข้อมูลส่วนบุคคล (PDPA)
                          </span>
                          มีโอกาสข้อมูลตกหล่น หรือส่งผ่านแอปพลิเคชันภายนอก
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 text-blue-950 font-semibold">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 inline" />
                            ปลอดภัยตามมาตรฐาน PDPA 100%
                          </span>
                          ห้ามบันทึกลงเครื่อง (No Local Storage) และมีสิทธิ์การเข้าถึงชัดเจน
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 text-emerald-950">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 inline" />
                            Digital e-Consent
                          </span>
                          ให้ความยินยอมเปิดเผยข้อมูลตามมาตรฐาน PDPA สากล
                        </td>
                      </tr>

                      {/* Row 5: ควบคุมการพิมพ์ / ป้องกันทำซ้ำ */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          🖨️ ระบบควบคุมการพิมพ์
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-600">
                          ไม่มีระบบควบคุม อาจเกิดการทำซ้ำโดยไม่สามารถตรวจสอบย้อนหลังได้
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 text-blue-950">
                          <div className="font-bold text-blue-900">ควบคุม ๔ ชั้น (Anti-Duplication):</div>
                          <ul className="mt-1 space-y-0.5 text-xs text-blue-900 list-disc list-inside">
                            <li>1. ห้ามเซฟไฟล์ลงเครื่อง (No Local Storage)</li>
                            <li>2. Print Quota Lock (พิมพ์ได้ 1 ครั้ง/คำขอ)</li>
                            <li>3. ลายน้ำระบุผู้รับ &amp; วัตถุประสงค์เจาะจง</li>
                            <li>4. QR Code ตรวจสอบความถูกต้อง (e-Verification)</li>
                          </ul>
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 text-emerald-950">
                          <strong>สู่ Paperless 100%:</strong> ไม่ต้องพิมพ์กระดาษ ส่งสำเนาแบบลง Digital Signature/e-Seal ตรงสู่ปลายทาง หรือส่ง Digital Token
                        </td>
                      </tr>

                      {/* Row 6: การชำระเงิน */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          💳 การชำระค่าธรรมเนียม
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-700">
                          ชำระผ่านเครื่อง EDC ณ เคาน์เตอร์ สส.
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 font-semibold text-blue-950">
                          Thai QR Payment บนหน้าจอเคาน์เตอร์ สส. ตัดรับเงินและออก e-Receipt อัตโนมัติ
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 font-semibold text-emerald-900">
                          e-Payment (PromptPay / Mobile Banking) ผ่านระบบอิเล็กทรอนิกส์
                        </td>
                      </tr>

                      {/* Row 7: ระยะเวลา SLA */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          ⏱️ ระยะเวลาให้บริการ (SLA)
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-700">
                          1 - 2 ชั่วโมง หรือข้ามวัน (หากต้องเดินทางส่งเอกสารกระดาษ)
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 font-bold text-blue-900">
                          ⚡ 3 - 5 นาที (ได้รับเอกสารทันที ณ สส. ใกล้บ้าน)
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 font-bold text-emerald-800">
                          ⚡ ทันที (Real-Time Instant ในไม่กี่วินาที)
                        </td>
                      </tr>

                      {/* Row 8: ความสะดวกของประชาชน */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                          🚶 การเดินทางของประชาชน
                        </td>
                        <td className="p-4 bg-amber-50/30 border-l border-slate-200 text-slate-700">
                          ต้องเดินทางมาที่ สส. สาขา และรอนาน
                        </td>
                        <td className="p-4 bg-blue-50/40 border-l border-blue-200 font-semibold text-blue-950">
                          เดินทางไปเพียง สส. สาขาใกล้บ้าน (ไม่ต้องเข้าเมือง/สท.)
                        </td>
                        <td className="p-4 bg-emerald-50/30 border-l border-slate-200 font-bold text-emerald-900">
                          ไม่ต้องเดินทางมาที่ สส. เลยแม้แต่ก้าวเดียว (ทำจากที่บ้าน 100%)
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3.2 DETAILED PHASE CARDS (รายละเอียดแต่ละเฟสแบบเจาะลึก) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* ---------------- PHASE 1 CARD ---------------- */}
                <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-300">
                        เฟส ๑ (ระบบปัจจุบัน)
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Zero Budget</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        เฟส 1: ระบบปัจจุบัน (LINE + EDC)
                      </h3>
                      <p className="text-xs font-bold text-amber-800 mt-1">
                        เน้นแก้ปัญหาความเดือดร้อนเร่งด่วนด้วยเครื่องมือที่มีอยู่เดิม (Zero Budget)
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-amber-600" />
                        <span>การทำงาน:</span>
                      </div>
                      <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
                        เจ้าหน้าที่ สส. รับคำร้อง สแกนบัตรประชาชน และแจ้งขอคัดแบบไปยังส่วนคัดแบบผ่านกลุ่ม LINE โดยไม่มีการส่งไฟล์ภาพแบบกลับมาทาง LINE แต่ใช้ระบบค้นหา/พิมพ์แบบดั้งเดิม แล้วส่งเอกสารกระดาษ หรือให้ผู้เสียภาษีชำระค่าธรรมเนียมผ่านเครื่อง EDC
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                      <div className="font-bold text-rose-700 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                        <span>ข้อจำกัด:</span>
                      </div>
                      <p className="bg-rose-50/70 p-3 rounded-xl border border-rose-200 text-rose-900 font-medium">
                        เสี่ยงต่อความปลอดภัยของข้อมูลส่วนบุคคล (PDPA) มีโอกาสที่ข้อมูลจะตกหล่นหรือเกิดการทำซ้ำโดยไม่สามารถตรวจสอบย้อนหลังได้อย่างเป็นระบบ
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-4 text-center">
                    <span className="text-xs text-slate-400 font-medium">
                      สถานะ: อยู่ระหว่างการยกระดับสู่เฟส ๒
                    </span>
                  </div>
                </div>

                {/* ---------------- PHASE 2 CARD (Current Demo) ---------------- */}
                <div className="bg-gradient-to-b from-blue-50/80 via-white to-blue-50/40 rounded-2xl border-2 border-blue-500 shadow-md p-6 flex flex-col justify-between relative overflow-hidden ring-4 ring-blue-500/10">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-black px-3.5 py-1 rounded-bl-xl shadow-sm">
                    🌟 ระบบใน Demo นี้
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black shadow-sm">
                        เฟส ๒ (ระบบปัจจุบันใน Demo)
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-blue-950">
                        เฟส 2: เว็บแอปภายในสำหรับเจ้าหน้าที่
                      </h3>
                      <p className="text-xs font-extrabold text-blue-700 mt-0.5">
                        (RCT Internal WebApp)
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        เน้นยกระดับความปลอดภัย ปิดความเสี่ยง PDPA และควบคุมการพิมพ์สำเนา
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed border-t border-blue-100 pt-3">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span>การทำงาน:</span>
                      </div>
                      <p className="bg-white p-3 rounded-xl border border-blue-200 text-blue-950 font-medium">
                        ระบบเว็บแอปพลิเคชันภายในที่เชื่อมโยงระหว่าง สส. (สาขา) และส่วนคัดแบบ (สป.)
                      </p>
                    </div>

                    {/* 4-Tier Anti-Duplication Feature List */}
                    <div className="space-y-2 text-xs border-t border-blue-100 pt-3">
                      <div className="font-bold text-blue-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>จุดเด่นสำคัญ (ระบบควบคุมการพิมพ์ 4 ชั้น - Anti-Duplication):</span>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                          <span className="font-black text-blue-900 block">
                            1. ห้ามดาวน์โหลด/บันทึกไฟล์ (No Local Storage)
                          </span>
                          <span className="text-slate-600 text-[11px] block mt-0.5">
                            เจ้าหน้าที่ไม่สามารถ Save หรือ Download ไฟล์ PDF ต้นฉบับลงเครื่องคอมพิวเตอร์ส่วนตัวได้
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                          <span className="font-black text-blue-900 block">
                            2. Print Quota Lock
                          </span>
                          <span className="text-slate-600 text-[11px] block mt-0.5">
                            ปลดล็อกการพิมพ์ได้ 1 ครั้ง ต่อ 1 คำขอเท่านั้น โดยระบบจะนับถอยหลังและตัดสิทธิ์การพิมพ์ทันทีเมื่อพิมพ์สำเร็จ
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                          <span className="font-black text-blue-900 block">
                            3. ลายน้ำระบุผู้รับและวัตถุประสงค์ (Dynamic Tailored Watermark)
                          </span>
                          <span className="text-slate-600 text-[11px] block mt-0.5">
                            พิมพ์ลายน้ำลงบนเอกสารระบุชื่อหน่วยงานปลายทาง วัตถุประสงค์ และวันหมดอายุชัดเจน ป้องกันการนำไปเวียนใช้ซ้ำ
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                          <span className="font-black text-blue-900 block">
                            4. QR Code ตรวจสอบความถูกต้อง (e-Verification)
                          </span>
                          <span className="text-slate-600 text-[11px] block mt-0.5">
                            สแกนตรวจสอบความถูกต้องและเช็กจำนวนครั้งที่เคยพิมพ์ได้ทันที
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs border-t border-blue-100 pt-3">
                      <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>ผลลัพธ์:</span>
                      </div>
                      <p className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-950 font-bold leading-relaxed">
                        ลดระยะเวลาการให้บริการลงเหลือ 3-5 นาที, มี Audit Log บันทึกทุกกิจกรรม และประหยัดงบประมาณในการเดินทาง/จัดส่งเอกสาร
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-blue-200 mt-4">
                    <button
                      onClick={() => setCurrentStep("branch_intake")}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>▶ ทดสอบการทำงาน เฟส ๒ (เข้าสู่ Demo)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ---------------- PHASE 3 CARD ---------------- */}
                <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-sm p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold border border-emerald-300">
                        เฟส ๓ (เป้าหมายอนาคต)
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Paperless 100%</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        เฟส 3: บริการประชาชนดิจิทัลเต็มรูปแบบ
                      </h3>
                      <p className="text-xs font-extrabold text-emerald-700 mt-0.5">
                        (Citizen Self-Service)
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        เน้นความสะดวกสูงสุด ประชาชนขอคัดแบบออนไลน์ได้เองทุกที่ ทุกเวลา สู่ระบบ Paperless 100%
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>การทำงาน:</span>
                      </div>

                      <ul className="space-y-2">
                        <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <strong className="text-slate-900 block font-bold">
                            • ยืนยันตัวตนระดับสากล:
                          </strong>
                          <span className="text-slate-600 block mt-0.5">
                            ประชาชนเข้าใช้งานผ่านแอปพลิเคชัน <strong>ThaID (IAL 2.3)</strong> เพื่อความปลอดภัยสูงสุดของข้อมูลภาษี
                          </span>
                        </li>

                        <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <strong className="text-slate-900 block font-bold">
                            • Digital e-Consent &amp; e-Payment:
                          </strong>
                          <span className="text-slate-600 block mt-0.5">
                            ให้ความยินยอมเปิดเผยข้อมูลตามมาตรฐาน PDPA และชำระค่าธรรมเนียมผ่านระบบอิเล็กทรอนิกส์ (PromptPay / Mobile Banking)
                          </span>
                        </li>

                        <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <strong className="text-slate-900 block font-bold">
                            • Digital Token / B2G Direct API:
                          </strong>
                          <span className="text-slate-600 block mt-0.5">
                            ไม่ต้องพิมพ์เอกสารกระดาษอีกต่อไป แต่ระบบจะส่งสำเนาแบบที่ลงลายมือชื่อดิจิทัล (Digital Signature/e-Seal) ให้ธนาคารหรือหน่วยงานปลายทางโดยตรงผ่าน Secure API หรือส่ง Digital Token ทาง SMS/Email ให้ผู้เสียภาษียื่นต่อธนาคาร
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                      <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>ผลลัพธ์:</span>
                      </div>
                      <p className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-emerald-950 font-bold leading-relaxed">
                        ประชาชนไม่ต้องเดินทางมาที่ สส. เลยแม้แต่ก้าวเดียว, ต้นทุนการออกเอกสารลดลงเป็นศูนย์, และป้องกันการปลอมแปลงเอกสารภาษีได้อย่างสมบูรณ์แบบ 100%
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-4 text-center">
                    <span className="text-xs text-slate-500 font-semibold">
                      เป้าหมายพัฒนาต่อเนื่องร่วมกับระบบยืนยันตัวตนดิจิทัลภาครัฐ
                    </span>
                  </div>
                </div>

              </div>

              {/* 3.3 BOTTOM CALL-TO-ACTION BANNER */}
              <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 shadow-xl border border-blue-400/20 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>พร้อมเริ่มต้นการสาธิตสดบนเวที</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  สัมผัสประสบการณ์การทำงานจริงของ RCT WebApp (เฟส ๒)
                </h3>
                <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  จำลองทุกขั้นตอนตั้งแต่การเสียบบัตรประชาชน Smart Card ณ เคาน์เตอร์ สส., การค้นหาและอัปโหลดไฟล์ของส่วนคัดแบบ, การชำระเงินผ่าน QR, ไปจนถึงการพิมพ์เอกสารพร้อมระบบควบคุมการพิมพ์ ๔ ชั้น
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep("branch_intake")}
                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-base font-black rounded-2xl shadow-2xl hover:shadow-amber-500/20 inline-flex items-center gap-3 transition transform hover:scale-105 cursor-pointer"
                  >
                    <span>เริ่มต้นทดสอบระบบ Demo ทันที (ขั้นตอนที่ ๑: เคาน์เตอร์ สส.)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: เคาน์เตอร์ สส. (รับคำขอ / บันทึกข้อมูล / เสียบบัตร Smart Card) */}
        {/* ========================================================================= */}
        {currentStep === "branch_intake" && (
          <div className="space-y-6">
            
            {/* Stage Guidance Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-black text-lg shadow">
                  ๑
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 text-base flex items-center gap-2">
                    <span>หน้าจอ: เคาน์เตอร์บริการ สส.โพทะเล (จุดเริ่มต้นรับคำขอใกล้บ้าน)</span>
                    <span className="bg-blue-200 text-blue-900 text-xs font-bold px-2 py-0.5 rounded">สส. สาขา</span>
                  </h3>
                  <p className="text-sm text-blue-800 mt-1 leading-relaxed">
                    <strong>ขั้นตอนการทำงาน ๓ สเต็ป:</strong> ๑. เจ้าหน้าที่ สส. กดปุ่มอ่านบัตรฯ ➔ ๒. กดปุ่มเขียนคำร้อง (เปิด Modal ตรวจสอบแล้วกดส่งคำร้อง) ➔ ๓. กดปุ่มบันทึกคำร้องและส่งต่อไปยัง ส่วนคัดแบบ (สท.พิจิตร)
                  </p>
                </div>
              </div>

              {/* Transition Button to Step 2 */}
              <button
                onClick={handleBranchSendToCentral}
                className={`px-5 py-3 font-bold text-sm rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition cursor-pointer whitespace-nowrap ${
                  requestSubmitted
                    ? "bg-blue-700 hover:bg-blue-800 text-white animate-pulse"
                    : "bg-slate-200 hover:bg-blue-100 text-slate-700 hover:text-blue-900 border border-slate-300"
                }`}
              >
                <span>ส่งคำขอไปยัง ส่วนคัดแบบ (สท.) ➔</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: 3 Operational Steps at Counter สส. */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* STEP 1.1: เครื่องอ่านบัตรประจำตัวประชาชน (Smart Card Reader) */}
                <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow-xs ${cardInserted ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"}`}>
                        ๑
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <span>ขั้นตอนที่ ๑ : อ่านบัตรประจำตัวประชาชน (Smart Card)</span>
                          <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded">
                            IAL 2.3
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500">ตรวจสอบตัวตนและดึงข้อมูลทะเบียนราษฎร์อัตโนมัติ</p>
                      </div>
                    </div>

                    {cardInserted && (
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Dip-Chip สำเร็จ (พร้อมใช้งาน)
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setCardInserted(false);
                            showToast("ถอดบัตรประชาชนออกจากเครื่องอ่านแล้ว (สถานะ: รอเสียบบัตร)");
                          }}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold border border-slate-300 transition cursor-pointer"
                          title="จำลองการถอดบัตรประชาชน"
                        >
                          ถอดบัตร
                        </button>
                      </div>
                    )}
                  </div>

                  {!cardInserted ? (
                    <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center space-y-3.5">
                      <div className="w-14 h-14 mx-auto bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center shadow-inner">
                        <HardDrive className="w-7 h-7 animate-pulse" />
                      </div>
                      <div className="max-w-md mx-auto space-y-1">
                        <h5 className="font-bold text-slate-900 text-base">รอเจ้าหน้าที่กดปุ่มอ่านบัตรประชาชน</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          ประชาชนยื่นบัตรประจำตัวประชาชน ณ เคาน์เตอร์ สส.โพทะเล เจ้าหน้าที่กดปุ่มอ่านบัตรฯ เพื่อดึงข้อมูลประชากรเข้าสู่ระบบทันที
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCardInserted(true);
                          showToast("✓ ตรวจพบเครื่องอ่านบัตร: ดึงข้อมูลบัตรประชาชนสำเร็จ (IAL 2.3) - นายสมชาย มุ่งมั่นพัฒนา");
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition cursor-pointer transform hover:scale-[1.02]"
                      >
                        <HardDrive className="w-4 h-4" />
                        <span>⚡ กดปุ่มอ่านบัตรฯ (Dip-Chip Smart Card)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 bg-blue-100 border border-blue-300 rounded-lg flex flex-col items-center justify-center text-blue-800 font-bold text-[10px] shadow-xs">
                            <span className="text-xs">👤</span>
                            <span>บัตร ปชช.</span>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">ชื่อผู้ถือบัตร / ผู้มีเงินได้:</div>
                            <div className="text-base font-black text-slate-900">นายสมชาย มุ่งมั่นพัฒนา</div>
                            <div className="font-mono text-xs font-bold text-blue-700">เลข ๑๓ หลัก: 1-6699-00123-45-6</div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right text-xs">
                          <span className="text-slate-500 block">สถานะการยืนยันตัวตน:</span>
                          <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300 inline-block mt-0.5">
                            ✓ ตรวจสอบผ่าน DOPA IAL 2.3
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        <div>
                          <span className="text-slate-500">ที่อยู่ตามทะเบียนราษฎร์: </span>
                          <span className="font-bold text-slate-900">124/5 หมู่ 3 ต.โพทะเล อ.โพทะเล จ.พิจิตร 66130</span>
                        </div>
                        <div>
                          <span className="text-slate-500">โทรศัพท์มือถือ: </span>
                          <span className="font-mono font-bold text-slate-900">081-999-8877</span>
                        </div>
                        <div>
                          <span className="text-slate-500">ฐานะ: </span>
                          <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">ผู้มีเงินได้ (ขอคัดแบบของตนเอง)</span>
                        </div>
                        <div>
                          <span className="text-slate-500">จุดบริการ: </span>
                          <span className="font-bold text-slate-800">เคาน์เตอร์ สส.โพทะเล</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 1.2: การเขียนคำร้องขอคัดแบบฯ (ตามคำร้องขอคัดแบบ.pdf) */}
                <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow-xs ${requestSubmitted ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white"}`}>
                        ๒
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <span>ขั้นตอนที่ ๒ : จัดทำคำร้องขอรับบริการข้อมูลสำเนาแบบฯ</span>
                          <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded">
                            คำร้องขอคัดแบบ.pdf
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500">เปิดแบบฟอร์มคำร้องฉบับเต็ม ระบุแบบ ภ.ง.ด.90 และเลือกลายน้ำปลายทาง</p>
                      </div>
                    </div>

                    {requestSubmitted && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        ส่งคำร้องในระบบแล้ว (REQ-2569-0449)
                      </span>
                    )}
                  </div>

                  {!requestSubmitted ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
                      <div className="w-14 h-14 mx-auto bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center shadow-inner">
                        <FileSignature className="w-7 h-7" />
                      </div>
                      <div className="max-w-md mx-auto space-y-1.5">
                        <h5 className="font-bold text-slate-900 text-base">คำร้องขอคัดแบบฯ ถูกซ่อนไว้เพื่อความเรียบร้อย</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          กดปุ่ม <strong>"เขียนคำร้อง"</strong> ด้านล่างเพื่อเปิดหน้าต่าง Modal แสดงแบบฟอร์มคำร้องฉบับเต็มของกรมสรรพากร พร้อมข้อมูลที่กรอกจากบัตรประชาชน และกดส่งคำร้องกลับมาที่หน้านี้
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!cardInserted) {
                            setCardInserted(true);
                            showToast("✓ ดึงข้อมูลบัตรประชาชนและเปิดแบบฟอร์มคำร้อง");
                          }
                          setShowRequestModal(true);
                        }}
                        className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-extrabold text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition cursor-pointer transform hover:scale-[1.02]"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>✍️ กดปุ่ม เขียนคำร้อง (เปิด Modal คำร้องขอคัดแบบ)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Summary of Submitted Request */}
                      <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4.5 space-y-3 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2">
                          <span className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            รายละเอียดคำร้องที่จัดทำและส่งเข้าระบบเรียบร้อย
                          </span>
                          <span className="font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                            เลขที่รับ: REQ-2569-0449
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                          <div>
                            <span className="text-slate-500">แบบภาษีที่ขอรับบริการ: </span>
                            <span className="font-bold text-slate-900">แบบ ภ.ง.ด.90 (บุคคลธรรมดา)</span>
                          </div>
                          <div>
                            <span className="text-slate-500">ปีภาษี: </span>
                            <span className="font-bold text-slate-900">๒๕๖๘ (มกราคม - ธันวาคม)</span>
                          </div>
                          <div>
                            <span className="text-slate-500">จำนวนที่ขอ: </span>
                            <span className="font-bold text-slate-900 font-mono">2 ชุด</span>
                            <span className="text-slate-500 ml-2">(รวมค่าธรรมเนียม 40.00 บาท)</span>
                          </div>
                          <div>
                            <span className="text-slate-500">วัตถุประสงค์ปลายทาง: </span>
                            <span className="font-bold text-slate-900">{currentPreset.label}</span>
                          </div>
                          <div className="sm:col-span-2 flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-100">
                            <span className="text-slate-500">ข้อความลายน้ำที่จะพิมพ์บนแบบ:</span>
                            <span className="font-mono font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                              "ใช้สำหรับ {activeWatermarkText} เท่านั้น"
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-emerald-200 text-emerald-900 font-medium">
                          <span>สถานะการตรวจรับ: [✓] เห็นควรดำเนินการได้ / [✓] คำสั่งอนุมัติ (นางสาว มยุรี ชื่นจิตต์)</span>
                          <button
                            type="button"
                            onClick={() => setShowRequestModal(true)}
                            className="text-xs bg-white hover:bg-slate-100 text-blue-700 font-bold px-3 py-1 rounded-lg border border-blue-300 transition cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>ดู/แก้ไขคำร้องฉบับเต็ม</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 1.3: ส่งต่อไปยัง ส่วนคัดแบบ (สท.พิจิตร) */}
                <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow-xs ${requestSubmitted ? "bg-blue-600 text-white" : "bg-slate-300 text-slate-700"}`}>
                      ๓
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        ขั้นตอนที่ ๓ : บันทึกคำร้องและส่งต่อไปยัง ส่วนคัดแบบ (สท.พิจิตร)
                      </h4>
                      <p className="text-xs text-slate-500">ส่งคำขออิเล็กทรอนิกส์ข้ามสาขาไปยังห้องจัดเก็บเอกสารศูนย์กลาง</p>
                    </div>
                  </div>

                  {!requestSubmitted ? (
                    <button
                      type="button"
                      onClick={() => {
                        showToast("⚠️ กรุณากดอ่านบัตรฯ และเขียนคำร้อง (ส่งคำร้อง) ก่อนส่งต่อไปยังส่วนคัดแบบ");
                        if (!cardInserted) setCardInserted(true);
                        setShowRequestModal(true);
                      }}
                      className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold rounded-xl flex items-center justify-center gap-2.5 transition cursor-pointer text-base border border-slate-300"
                    >
                      <Lock className="w-5 h-5 text-slate-500" />
                      <span>กรุณากดเขียนและ "ส่งคำร้อง" ในขั้นตอนที่ ๒ ก่อนส่งต่อไปยัง ส่วนคัดแบบ</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleBranchSendToCentral}
                        className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer text-base transform hover:scale-[1.01] animate-pulse"
                      >
                        <Send className="w-5 h-5" />
                        <span>บันทึกคำร้องและส่งต่อไปยัง ส่วนคัดแบบ (สท.พิจิตร) ➔ (กระโดดไปส่วนคัดแบบ)</span>
                      </button>
                      <p className="text-xs text-slate-500 text-center">
                        * เมื่อบันทึกคำร้อง ระบบจะส่งคำขอทางอิเล็กทรอนิกส์ไปยังห้องจัดเก็บเอกสาร และสลับหน้าจอไปที่ส่วนคัดแบบทันที
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Workflow Overview */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    ข้อมูลคำร้องขอคัดแบบฯ ใหม่
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">เลขที่คำขอระบบ:</span>
                      <span className="font-mono font-bold text-blue-700">REQ-2569-0449</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">หมายเลขติดตาม (Tracking):</span>
                      <span className="font-mono font-bold text-slate-800">RCT-6909-088</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">จุดรับเรื่อง:</span>
                      <span className="font-bold text-slate-800">สส.โพทะเล</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">ช่องทางให้บริการ:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">Smart Counter สาขา</span>
                    </div>
                  </div>

                  {/* Sub-step Checklist Status */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs">
                    <span className="font-bold text-slate-800 block text-sm">📋 ลำดับขั้นตอน ณ เคาน์เตอร์ สส.:</span>
                    <div className="space-y-2 text-slate-700">
                      <div className={`flex items-center gap-2 p-2 rounded-lg border ${cardInserted ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-bold" : "bg-white border-slate-200"}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${cardInserted ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>๑</span>
                        <span>อ่านบัตรประชาชน: {cardInserted ? "อ่านสำเร็จ (IAL 2.3)" : "รอเสียบบัตร"}</span>
                      </div>
                      <div className={`flex items-center gap-2 p-2 rounded-lg border ${requestSubmitted ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-bold" : "bg-white border-slate-200"}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${requestSubmitted ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>๒</span>
                        <span>เขียนคำร้อง (Modal): {requestSubmitted ? "ส่งคำร้องแล้ว" : "รอเขียนคำร้อง"}</span>
                      </div>
                      <div className={`flex items-center gap-2 p-2 rounded-lg border ${requestSubmitted ? "bg-blue-50 border-blue-200 text-blue-900 font-bold" : "bg-white border-slate-200 text-slate-400"}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${requestSubmitted ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>๓</span>
                        <span>ส่งต่อส่วนคัดแบบ: {requestSubmitted ? "พร้อมส่งต่อ ➔" : "รอดำเนินการ"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block text-sm">🔄 กระบวนการถัดไปในระบบ:</span>
                    <p className="text-slate-600 leading-relaxed">
                      คำขอนี้จะถูกส่งไปที่ <strong>ส่วนคัดแบบ (สท.พิจิตร)</strong> เจ้าหน้าที่จะดำเนินการค้นหาภาพสแกนในระบบ หรือค้นหาแบบกระดาษเพื่อสแกนเป็นไฟล์ PDF แล้วอัปโหลดเข้าระบบเพื่อออก QR Code คิดเงิน
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: ส่วนคัดแบบ (อัปโหลดไฟล์แบบ PDF เข้าระบบ & สร้าง QR คิดเงิน) */}
        {/* ========================================================================= */}
        {currentStep === "central_search" && (
          <div className="space-y-6">
            
            {/* Stage Guidance Banner */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center flex-shrink-0 font-black text-lg shadow">
                  ๒
                </div>
                <div>
                  <h3 className="font-bold text-purple-950 text-base flex items-center gap-2">
                    <span>หน้าจอ: ส่วนคัดแบบ (ห้องจัดเก็บและคลังเอกสาร สท.พิจิตร)</span>
                    <span className="bg-purple-200 text-purple-950 text-xs font-bold px-2 py-0.5 rounded">ส่วนกลาง สท.</span>
                  </h3>
                  <p className="text-sm text-purple-900 mt-1 leading-relaxed">
                    <strong>จุดสังเกตสำหรับคณะกรรมการ:</strong> ในระบบเดิม (เฟส ๑) เจ้าหน้าที่จะโยนไฟล์ PDF ส่งผ่านทาง LINE ส่งกลับไปให้ สส. แต่ในระบบ RCT WebApp (เฟส ๒) เจ้าหน้าที่จะ<strong>อัปโหลดไฟล์ PDF เข้าระบบโดยตรง</strong> เพื่อให้ระบบคำนวณค่าธรรมเนียม สร้าง QR Code และควบคุมความปลอดภัยด้วย Digital e-Seal อัตโนมัติ
                  </p>
                </div>
              </div>

              {/* Transition Button to Step 3 */}
              <button
                onClick={handleCentralUploadAndSend}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition animate-pulse cursor-pointer whitespace-nowrap"
              >
                <span>อัปโหลด & ส่ง QR ไปยัง สส. ➔</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Direct File Upload Controls */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2.5">
                      <Upload className="w-6 h-6 text-purple-600" />
                      อัปโหลดไฟล์แบบแสดงรายการภาษีเข้าระบบ (Upload PDF)
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">คำร้องจาก: สส.โพทะเล (นายสมชาย มุ่งมั่นพัฒนา / ภ.ง.ด.90 ปีภาษี 2568)</p>
                  </div>
                  <span className="bg-purple-100 text-purple-900 font-bold text-xs px-3 py-1 rounded-full font-mono">
                    REQ-2569-0449
                  </span>
                </div>

                {/* Comparison Callout: Replacing legacy LINE method */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs space-y-1 text-amber-950">
                  <span className="font-bold flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    การยกระดับจากระบบเดิม (เปลี่ยนจากการโยนไฟล์ผ่าน LINE เป็นระบบ Web Portal):
                  </span>
                  <p className="text-amber-900 leading-relaxed">
                    ระบบเดิมเจ้าหน้าที่จะโยนไฟล์ PDF ผ่านแชท LINE ส่งกลับไปให้สาขาพิมพ์เอง ซึ่งเสี่ยงต่อการหลุดรอดและทำซ้ำไม่จำกัด แต่ระบบ WebApp นี้ เจ้าหน้าที่จะอัปโหลดไฟล์ PDF เข้าระบบศูนย์กลางโดยตรง เพื่อเริ่มกลไกความปลอดภัย e-Seal และล็อคโควตาการพิมพ์
                  </p>
                </div>

                {/* Direct File Upload & Attached Box */}
                <div className="border-2 border-dashed border-blue-400 bg-blue-50/50 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white text-red-600 border border-red-200 shadow-sm flex flex-col items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-red-600" />
                    <span className="text-[10px] font-black tracking-wider text-red-700 uppercase mt-0.5">PDF</span>
                  </div>

                  <div>
                    <div className="font-extrabold text-lg text-slate-900">
                      RD_PND90_2568_1669900123456.pdf
                    </div>
                    <div className="text-xs text-slate-600 mt-1 font-mono font-medium">
                      ขนาดไฟล์: 1.84 MB • เอกสารความละเอียด 300 DPI • ประทับตรารับรอง e-Seal อัตโนมัติ
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-300">
                      <Check className="w-4 h-4 text-emerald-600" />
                      พร้อมอัปโหลดเข้าสู่ระบบ RCT WebApp
                    </span>
                  </div>
                </div>

                {/* Action Box to Upload & Send to Branch */}
                <div className="pt-2">
                  <button
                    onClick={handleCentralUploadAndSend}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer text-base"
                  >
                    <Upload className="w-5 h-5" />
                    <span>อัปโหลดไฟล์ขึ้นระบบ & ส่ง QR คิดเงิน 40 บ. ไปยัง เคาน์เตอร์ สส. ➔ (กระโดดไปหน้า สส.)</span>
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-2.5">
                    * เมื่อกดปุ่มนี้ ไฟล์แบบจะถูกอัปโหลดขึ้นคลาวด์ พร้อมส่ง Dynamic QR ไปยังหน้าจอเคาน์เตอร์ สส. ทันที
                  </p>
                </div>
              </div>

              {/* Right Column: Automated Calculation & Generated QR */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Fee Calculation Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    ระบบคิดเงินอัตโนมัติเมื่อพบแบบ
                  </h3>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">แบบ ภ.ง.ด.90 (ปี 2568)</span>
                      <span className="font-bold text-slate-900">{totalCopies} ชุด</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">อัตราค่าธรรมเนียมราชการชุดละ</span>
                      <span className="font-bold text-slate-900">20.00 บาท</span>
                    </div>
                    <div className="flex justify-between py-2.5 bg-emerald-50 px-3.5 rounded-xl border border-emerald-200 text-emerald-950 font-bold text-base items-center">
                      <span>ยอดเงินที่ต้องชำระทั้งสิ้น</span>
                      <span className="font-mono text-xl text-emerald-700 font-black">40.00 บาท</span>
                    </div>
                  </div>

                  {/* QR Code Preview */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-3">
                    <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1.5">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      Dynamic PromptPay QR Code (ระบบสร้างอัตโนมัติ)
                    </div>

                    <div className="inline-block p-3 bg-white border-2 border-blue-600 rounded-xl shadow-sm relative">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=PROMPTPAY-TAX-REF-RCT6909088-AMOUNT-40.00" 
                        alt="QR Payment"
                        className="w-40 h-40 mx-auto"
                      />
                      <div className="text-xs font-mono text-slate-600 font-bold mt-1.5">Ref: RCT6909088-40</div>
                    </div>

                    <div className="text-xs text-slate-600 font-medium">
                      จะถูกส่งไปแสดงที่หน้าจอ เคาน์เตอร์ สส. เพื่อให้ประชาชนสแกนจ่ายทันที
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: เคาน์เตอร์ สส. (ประชาชนสแกน QR จ่ายเงิน ณ จุดบริการสาขา) */}
        {/* ========================================================================= */}
        {currentStep === "branch_payment" && (
          <div className="space-y-6">
            
            {/* Stage Guidance Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0 font-black text-lg shadow">
                  ๓
                </div>
                <div>
                  <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                    <span>หน้าจอ: เคาน์เตอร์ สส.โพทะเล (จุดบริการประชาชนใกล้บ้าน)</span>
                    <span className="bg-amber-200 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">สส. สาขา</span>
                  </h3>
                  <p className="text-sm text-amber-900 mt-1 leading-relaxed">
                    <strong>จุดสังเกตสำหรับคณะกรรมการ:</strong> ข้อมูลไฟล์แบบ ภ.ง.ด.90 และ QR Code 40 บาท ถูกส่งจากส่วนคัดแบบมาขึ้นที่หน้าจอเคาน์เตอร์ทันที ประชาชนเปิดแอปธนาคารสแกนจ่ายหน้าเคาน์เตอร์ได้ทันที
                  </p>
                </div>
              </div>

              {/* Transition Button to Step 4 */}
              <button
                onClick={handleCitizenScanQR}
                className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition animate-pulse cursor-pointer whitespace-nowrap"
              >
                <Smartphone className="w-5 h-5" />
                <span>จำลองประชาชนสแกนชำระเงิน ➔</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Counter Staff Screen */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2.5">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      เคาน์เตอร์บริการ สส.โพทะเล
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">เจ้าหน้าที่: นางสาว มยุรี ชื่นจิตต์</p>
                  </div>
                  <span className="bg-blue-50 text-blue-800 border border-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">
                    รอชำระเงินค่าธรรมเนียม
                  </span>
                </div>

                {/* Incoming Central Data Banner */}
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4.5 flex items-center gap-3.5 text-sm text-emerald-900">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-base">ได้รับไฟล์แบบ ภ.ง.ด.90 และ QR Code จากส่วนคัดแบบแล้ว:</span>
                    <span className="block text-xs text-emerald-800 mt-0.5">ไฟล์ PDF พร้อมส่งมอบทันทีเมื่อระบบการเงินตัดรับยอดเงินสำเร็จ</span>
                  </div>
                </div>

                {/* Taxpayer Information Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 text-sm space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="text-slate-500">ชื่อผู้เสียภาษี:</span>
                    <span className="font-bold text-slate-900">นายสมชาย มุ่งมั่นพัฒนา</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="text-slate-500">เลขประจำตัวประชาชน:</span>
                    <span className="font-mono font-bold text-slate-900">1-6699-00123-45-6</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="text-slate-500">รายการที่ขอคัด:</span>
                    <span className="font-bold text-blue-800">แบบ ภ.ง.ด.90 ปีภาษี 2568 (จำนวน 2 ฉบับ)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">วัตถุประสงค์เฉพาะ:</span>
                    <span className="font-bold text-amber-800">ยื่นขอสินเชื่อ ธนาคารกสิกรไทย สาขาพิจิตร</span>
                  </div>
                </div>

                {/* Action Box to Simulate Citizen Scan */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={handleCitizenScanQR}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer text-base"
                  >
                    <Smartphone className="w-5 h-5 text-emerald-200" />
                    <span>จำลอง: ประชาชนเปิดแอปธนาคารสแกน QR จ่าย 40 บาท สำเร็จ ➔ (กระโดดไปหน้าการเงิน)</span>
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-2.5">
                    * เมื่อกดปุ่มนี้ ระบบจะจำลองว่าประชาชนโอนเงินสำเร็จ แล้วกระโดดไปหน้าจอการเงินเพื่อดูว่าเกิดอะไรขึ้นอัตโนมัติ
                  </p>
                </div>
              </div>

              {/* Right Column: Citizen-Facing QR Terminal Screen */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span>จอแสดงผลฝั่งประชาชน (Customer Display)</span>
                  </div>
                  <span className="bg-blue-100 text-blue-900 text-xs font-extrabold px-2.5 py-0.5 rounded">PromptPay QR</span>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 w-full flex flex-col items-center">
                  <div className="text-sm text-slate-600 mb-1 font-medium">ยอดค่าธรรมเนียมคัดแบบภาษี (๒ ชุด)</div>
                  <div className="text-4xl font-black text-blue-950 font-mono tracking-tight mb-4">
                    40.00 <span className="text-lg font-bold text-slate-600">บาท</span>
                  </div>

                  <div className="p-3 bg-white border-2 border-blue-600 rounded-xl shadow-sm relative">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=PROMPTPAY-TAX-REF-RCT6909088-AMOUNT-40.00" 
                      alt="Citizen Payment QR"
                      className="w-48 h-48 mx-auto"
                    />
                    {qrScanned && (
                      <div className="absolute inset-0 bg-emerald-600/95 rounded-lg flex flex-col items-center justify-center text-white font-bold">
                        <CheckCircle2 className="w-14 h-14 mb-2 text-white" />
                        <span className="text-lg">ชำระเงินสำเร็จแล้ว</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 mt-3 font-semibold">
                    สแกนจ่ายได้ทุกธนาคาร (KTB, SCB, KBANK, BBL ฯลฯ)
                  </div>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ระบบตัดยอดแบบ Real-time เชื่อมโยง KTB Corporate Online</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: หน้าจอการเงิน (Treasury / งานการเงิน สท.) */}
        {/* ========================================================================= */}
        {currentStep === "treasury_finance" && (
          <div className="space-y-6">
            
            {/* Stage Guidance Banner */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center flex-shrink-0 font-black text-lg shadow">
                  ๔
                </div>
                <div>
                  <h3 className="font-bold text-purple-950 text-base flex items-center gap-2">
                    <span>หน้าจอ: งานการเงินและบัญชี สท.พิจิตร (ระบบตัดเงินอัตโนมัติ)</span>
                    <span className="bg-purple-200 text-purple-950 text-xs font-bold px-2 py-0.5 rounded">Real-Time Treasury</span>
                  </h3>
                  <p className="text-sm text-purple-900 mt-1 leading-relaxed">
                    <strong>จุดสังเกตสำหรับคณะกรรมการ:</strong> เมื่อประชาชนสแกนที่สาขา ยอดเงิน 40 บาท จะวิ่งเข้าบัญชีราชการทันที ระบบออกใบเสร็จ e-Receipt เลขที่ทางการ และส่งสัญญาณปลดล็อคสิทธิ์การพิมพ์เอกสารกลับไปที่สาขาอัตโนมัติ โดยเจ้าหน้าที่การเงินไม่ต้องคีย์มือ
                  </p>
                </div>
              </div>

              {/* Transition Button to Step 5 */}
              <button
                onClick={handleFinanceConfirmAndUnlock}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition animate-pulse cursor-pointer whitespace-nowrap"
              >
                <Lock className="w-4 h-4" />
                <span>ปลดล็อคโควตาพิมพ์ ➔ กลับไปหน้า สส.</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Live Reconciliation & e-Receipt Card */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2.5">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                      ระบบรับชำระเงินและตรวจสอบความถูกต้องแบบอัตโนมัติ
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Auto-Reconciliation ผ่าน KTB Payment Gateway API</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    รับเงินตัดยอดสำเร็จ
                  </span>
                </div>

                {/* Real-time Payment Signal Received Box */}
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4.5 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-emerald-950 flex items-center gap-2 text-base">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ตรวจพบยอดเงินโอนเข้าบัญชีราชการแล้ว (Instant Settlement)
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded">
                      เวลา 09:32:45 น.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-white p-3.5 rounded-xl border border-emerald-200 text-sm">
                    <div>
                      <span className="text-slate-500 block text-xs mb-0.5">ยอดเงินที่ได้รับ:</span>
                      <span className="font-mono font-black text-emerald-700 text-lg">40.00 บาท</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs mb-0.5">ช่องทางชำระ:</span>
                      <span className="font-bold text-slate-800">PromptPay QR (EDC FastPay)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs mb-0.5">รหัสอ้างอิง KTB Ref:</span>
                      <span className="font-mono font-bold text-slate-800">KTB-6909-TX99281</span>
                    </div>
                  </div>
                </div>

                {/* Official e-Receipt Generation Preview */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50 space-y-3.5 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <span className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
                      <Receipt className="w-5 h-5 text-blue-600" />
                      ใบเสร็จรับเงินทางราชการ (e-Receipt) ที่ระบบออกให้อัตโนมัติ
                    </span>
                    <span className="font-mono font-extrabold text-blue-900 bg-blue-100 px-2.5 py-1 rounded text-xs">
                      เล่มที่ 0449 / เลขที่ 00188
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-slate-700">
                    <div>
                      <span className="block text-slate-500 text-xs mb-0.5">ออกในนาม:</span>
                      <span className="font-bold text-slate-900">นายสมชาย มุ่งมั่นพัฒนา (1-6699-00123-45-6)</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-0.5">ค่าธรรมเนียม:</span>
                      <span className="font-bold text-slate-900">คัดสำเนาแบบ ภ.ง.ด.90 (2 ฉบับ x 20 บ. = 40.00 บ.)</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-0.5">หน่วยงานผู้ออก:</span>
                      <span className="font-bold text-slate-900">สำนักงานสรรพากรพื้นที่พิจิตร</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-0.5">สถานะทางบัญชี:</span>
                      <span className="font-extrabold text-emerald-700">ลงบัญชีรายได้แผ่นดินอัตโนมัติ 100%</span>
                    </div>
                  </div>
                </div>

                {/* Action Box to Unlock Quota */}
                <div className="pt-2">
                  <button
                    onClick={handleFinanceConfirmAndUnlock}
                    className="w-full py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer text-base"
                  >
                    <Lock className="w-5 h-5 text-purple-200" />
                    <span>ออกใบเสร็จรับเงินราชการ & ปลดล็อคโควตาพิมพ์ (2 ฉบับ) ➔ ส่งกลับเคาน์เตอร์ สส.</span>
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-2.5">
                    * เมื่อกดปุ่มนี้ ระบบจะส่งสิทธิ์การพิมพ์กลับไปยังเคาน์เตอร์ สส. เพื่อให้เจ้าหน้าที่สั่งพิมพ์เอกสารได้ 2 ชุดตามใบเสร็จ
                  </p>
                </div>
              </div>

              {/* Right Column: Print Quota Security Lock Summary */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  กลไกควบคุมโควตาการพิมพ์ (Anti-Duplication)
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-950">
                    <span className="font-bold block mb-1.5 text-base">🔒 ระบบ Print Quota Lock:</span>
                    <p className="leading-relaxed text-xs">
                      ระบบจะอนุญาตให้เคาน์เตอร์พิมพ์เอกสารได้ <strong>เฉพาะจำนวนที่ชำระเงินจริงเท่านั้น</strong> (ในเคสนี้คือ 2 ฉบับ) หากพิมพ์ครบ 2 ฉบับแล้ว ปุ่มพิมพ์จะถูกล็อคทันที ป้องกันการแอบทำซ้ำโดยไม่เสียค่าธรรมเนียม
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">โควตาที่ได้รับอนุมัติ:</span>
                      <span className="font-bold text-slate-900 font-mono text-base">2 ฉบับ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">พิมพ์ไปแล้ว:</span>
                      <span className="font-bold text-slate-900 font-mono text-base">{printedCopies} ฉบับ</span>
                    </div>
                    <div className="flex justify-between text-blue-800 font-black border-t border-slate-200 pt-2 text-base">
                      <span>คงเหลือสิทธิ์พิมพ์:</span>
                      <span className="font-mono">{totalCopies - printedCopies} ฉบับ</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: เคาน์เตอร์ สส. (พิมพ์เอกสารพร้อมลายน้ำ & e-Seal & ล็อคโควตา) */}
        {/* ========================================================================= */}
        {currentStep === "branch_print" && (
          <div className="space-y-6">
            
            {/* Stage Guidance Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-black text-lg shadow">
                  ๕
                </div>
                <div>
                  <h3 className="font-bold text-emerald-950 text-base flex items-center gap-2">
                    <span>หน้าจอ: เคาน์เตอร์ สส.โพทะเล (ขั้นตอนพิมพ์และส่งมอบเอกสาร)</span>
                    <span className="bg-emerald-200 text-emerald-950 text-xs font-bold px-2 py-0.5 rounded">ปลอดภัย ไร้การทำซ้ำ</span>
                  </h3>
                  <p className="text-sm text-emerald-900 mt-1 leading-relaxed">
                    <strong>จุดสังเกตสำหรับคณะกรรมการ:</strong> ลายน้ำระบุปลายทางถูกล็อคตามที่ระบุไว้ในคำร้องอัตโนมัติ (Targeted Watermark), มีการประทับตราดิจิทัล e-Seal และตัวนับโควตาการพิมพ์จะลดลงตามจริง ({printedCopies}/{totalCopies}) ป้องกันการนำไฟล์ไปพิมพ์ซ้ำโดยเด็ดขาด
                  </p>
                </div>
              </div>

              {/* Transition Button to Step 6 */}
              <button
                onClick={handleFinishDelivery}
                className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition cursor-pointer whitespace-nowrap"
              >
                <span>ส่งมอบเรียบร้อย ➔ ดูแดชบอร์ด SLA</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Watermark Display & Print Control */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2.5">
                      <Printer className="w-6 h-6 text-emerald-600" />
                      สั่งพิมพ์แบบ ภ.ง.ด.90 พร้อมลายน้ำป้องกันการทำซ้ำ
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">สิทธิ์การพิมพ์ตามใบเสร็จ: เล่มที่ 0449 / เลขที่ 00188</p>
                  </div>
                  
                  {/* Quota Badge */}
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block mb-0.5">โควตาพิมพ์คงเหลือ:</span>
                    <span className={`font-mono font-black text-base px-3 py-1 rounded-lg ${
                      totalCopies - printedCopies > 0 
                        ? "bg-blue-100 text-blue-900 border border-blue-300" 
                        : "bg-red-100 text-red-700 border border-red-300"
                    }`}>
                      {printedCopies} / {totalCopies} ฉบับ
                    </span>
                  </div>
                </div>

                {/* 1. Watermark Status (Locked from Request Form) */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span className="font-extrabold text-slate-900 text-base">
                        ลายน้ำระบุปลายทาง (ล็อคตามคำร้องขอคัดแบบแล้ว)
                      </span>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      ระบุไว้ตั้งแต่ขั้นตอนคำร้อง
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-700">
                      <div>
                        <span className="text-slate-500 block text-[11px]">วัตถุประสงค์ / หมวดหมู่:</span>
                        <span className="font-bold text-slate-900 text-sm">{currentPreset.label}</span>
                        <span className="text-blue-700 text-[10px] ml-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          {currentPreset.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">หน่วยงานปลายทาง:</span>
                        <span className="font-bold text-slate-900">{currentPreset.targetOrg}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-500 block text-[11px]">สิ่งที่ปลายทางต้องการตรวจ:</span>
                        <span className="font-bold text-blue-900">{currentPreset.inspectionFocus}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-slate-600">
                      <span className="font-semibold">ข้อความลายน้ำที่ถูกพิมพ์ลงบนเอกสาร:</span>
                      <span className="font-mono font-bold text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200 text-sm">
                        "ใช้สำหรับ {activeWatermarkText} เท่านั้น"
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium leading-relaxed">
                    * ข้อความลายน้ำนี้ถูกกำหนดและล็อคมาจากขั้นตอนการยื่นคำร้อง (คำร้องเลขที่ REQ-2569-0449) เพื่อความปลอดภัย ป้องกันเจ้าหน้าที่หรือบุคคลภายนอกแก้ไขเปลี่ยนแปลงปลายทาง และป้องกันการนำเอกสารไปใช้ผิดวัตถุประสงค์
                  </div>
                </div>

                {/* 2. Print Trigger Button */}
                <div className="space-y-3">
                  <button
                    onClick={handlePrintDocument}
                    disabled={printedCopies >= totalCopies}
                    className={`w-full py-4.5 rounded-xl font-extrabold shadow-lg flex items-center justify-center gap-3 transition cursor-pointer text-base ${
                      printedCopies < totalCopies
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/20 animate-pulse-subtle"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                    }`}
                  >
                    <Printer className="w-5 h-5" />
                    <span>
                      {printedCopies < totalCopies 
                        ? `🖨️ สั่งพิมพ์เอกสารชุดที่ ${printedCopies + 1} (หักโควตา ${printedCopies}/${totalCopies} ➔ ${printedCopies + 1}/${totalCopies})`
                        : "🔒 โควตาการพิมพ์ครบ 2 ฉบับแล้ว (ระบบล็อคการพิมพ์แล้ว)"}
                    </span>
                  </button>

                  {printedCopies > 0 && (
                    <button
                      onClick={() => setShowDocumentModal(true)}
                      className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-xl border border-blue-200 text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>คลิกเพื่อดูตัวอย่างเอกสาร ภ.ง.ด.90 ที่พิมพ์ออกมา (พร้อม e-Seal และลายน้ำ)</span>
                    </button>
                  )}
                </div>

                {/* 3. Handover & Move to Dashboard */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={handleFinishDelivery}
                    className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 text-sm transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>ส่งมอบเอกสารให้ประชาชนเสร็จสิ้น ➔ ดูแดชบอร์ด SLA & สรุปผลงานผู้บริหาร</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Mini Live Preview of Document */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      ตัวอย่างเอกสารที่จะพิมพ์ออกมา (Laser B&W Print Preview)
                    </h3>
                    <span className="text-[11px] text-slate-500">แบบ ภ.ง.ด.90 ขาวดำเลเซอร์ พร้อม e-Seal & ลายน้ำ</span>
                  </div>
                  <button 
                    onClick={() => setShowDocumentModal(true)}
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border border-blue-200 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    ขยายเต็มจอ
                  </button>
                </div>

                {/* Laser B&W Document Mockup Container */}
                <div 
                  onClick={() => setShowDocumentModal(true)}
                  className="border border-slate-300 rounded-xl overflow-hidden bg-slate-50 shadow-md relative group cursor-pointer max-h-[520px] overflow-y-auto"
                  title="คลิกเพื่อดูเอกสารขนาดเต็ม"
                >
                  <div className="relative bg-white">
                    {/* Actual B&W Laser Printout Image */}
                    <img 
                      src="/pnd90_filled_laser_bw.png" 
                      alt="ภ.ง.ด.90 Laser B&W Printout"
                      className="w-full h-auto block select-none"
                    />
                    
                    {/* Diagonal Targeted Watermark Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
                      <div className="transform -rotate-25 text-red-600/25 font-black text-xs md:text-sm text-center border-2 border-dashed border-red-600/35 px-3 py-2 rounded-xl leading-tight bg-white/10 backdrop-blur-[0.5px]">
                        ใช้สำหรับ {activeWatermarkText} เท่านั้น<br />
                        <span className="text-[8px] md:text-[9px] font-bold">ห้ามนำไปทำสำเนาหรือใช้เพื่อวัตถุประสงค์อื่น</span>
                      </div>
                    </div>

                    {/* Red e-Seal Digital Stamp Overlay (Positioned around 65% height) */}
                    <div className="absolute top-[68%] right-4 pointer-events-none z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full border-2 border-red-600 flex flex-col items-center justify-center text-red-600 font-bold text-[7px] transform -rotate-12 bg-red-50/80 shadow-md">
                        <span className="text-[6px]">สำเนาถูกต้อง</span>
                        <span className="text-[8px] font-black">กรมสรรพากร</span>
                        <span className="text-[6px]">e-Seal 2569</span>
                      </div>
                      <span className="text-[6px] text-red-700 font-mono font-bold mt-0.5 bg-white/90 px-1 rounded border border-red-200 shadow-xs">e-Seal สท.พิจิตร</span>
                    </div>

                    {/* Bottom Verification QR code Overlay (Positioned around 78% height) */}
                    <div className="absolute top-[78%] right-4 pointer-events-none z-10 bg-white/95 p-1 rounded border border-slate-300 shadow-sm flex items-center gap-1.5">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=VERIFY-TAX-DOC-RCT6909088" 
                        alt="QR Verify"
                        className="w-7 h-7"
                      />
                      <div className="text-[6px] text-slate-700 font-mono leading-tight">
                        <span className="font-bold text-slate-900 block">QR ตรวจสอบ</span>
                        <span>RCT6909088</span>
                      </div>
                    </div>

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
                      <span className="bg-slate-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
                        <Eye className="w-3.5 h-3.5" /> คลิกเพื่อดูแบบขยายใหญ่
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 text-center font-medium">
                  * ภาพจำลองเหมือนพิมพ์ออกจากเครื่องเลเซอร์ขาวดำของ สส. พร้อมตราประทับ e-Seal และลายน้ำระบุปลายทาง
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: แดชบอร์ด SLA & ผู้บริหาร (Executive Dashboard) */}
        {/* ========================================================================= */}
        {currentStep === "executive_sla" && (
          <div className="space-y-6">
            
            {/* Stage Guidance Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-black text-lg shadow">
                  ๖
                </div>
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <span>หน้าจอ: แดชบอร์ดผู้บริหารและติดตาม SLA (Executive Dashboard)</span>
                    <span className="bg-blue-800 text-blue-100 text-xs font-bold px-2 py-0.5 rounded">Real-Time Analytics</span>
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    <strong>จุดสังเกตสำหรับคณะกรรมการ:</strong> แสดงผลการยกระดับบริการ RCT WebApp เฟส ๒ ที่ลดระยะเวลาบริการจาก 1-2 วัน เหลือเพียง 4.2 นาที, ขจัดข้อผิดพลาดเป็น 0%, และล็อคโควตาพิมพ์ป้องกันการทำซ้ำ 100%
                  </p>
                </div>
              </div>

              {/* Reset to Step 1 Button */}
              <button
                onClick={handleResetDemo}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className="w-4 h-4" />
                <span>เริ่มสาธิตใหม่อีกครั้ง</span>
              </button>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>ระยะเวลาเฉลี่ยต่อคำขอ (SLA)</span>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-4xl font-black text-slate-900 font-mono">4.2 <span className="text-base font-bold text-slate-500">นาที</span></div>
                <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <span>↓ ลดลง 99.7%</span>
                  <span className="text-slate-500 font-medium">(จากเดิม 1-2 วัน)</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>อัตราความพึงพอใจประชาชน</span>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-4xl font-black text-slate-900 font-mono">99.4%</div>
                <div className="text-xs text-emerald-700 font-bold">
                  ระดับดีเยี่ยม (คะแนน 4.97/5.00)
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>การป้องกันพิมพ์ซ้ำ (Anti-Duplication)</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-4xl font-black text-emerald-700 font-mono">100%</div>
                <div className="text-xs text-slate-600 font-semibold">
                  โควตาล็อคตามใบเสร็จ 0 ใบหลุดรอด
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>ประหยัดงบประมาณและเวลาเดินทาง</span>
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-4xl font-black text-slate-900 font-mono">840K <span className="text-base font-bold text-slate-500">บ./ปี</span></div>
                <div className="text-xs text-purple-700 font-bold">
                  ประหยัดค่ากระดาษและเวลาประชากร
                </div>
              </div>

            </div>

            {/* Performance Comparison & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Branch Statistics Table */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    สถิติการให้บริการคัดแบบฯ แยกตามสาขา สส. (พื้นที่ จ.พิจิตร)
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">ข้อมูล Real-Time ประจำวัน</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                        <th className="py-3 px-3.5 font-bold">หน่วยบริการ (สส.)</th>
                        <th className="py-3 px-3.5 font-bold text-center">คำขอวันนี้</th>
                        <th className="py-3 px-3.5 font-bold text-center">เวลาเฉลี่ย</th>
                        <th className="py-3 px-3.5 font-bold text-right">ค่าธรรมเนียมรวม</th>
                        <th className="py-3 px-3.5 font-bold text-center">สถานะ SLA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-blue-50/50">
                        <td className="py-3 px-3.5 font-bold text-slate-900">สส.เมืองพิจิตร</td>
                        <td className="py-3 px-3.5 text-center font-mono">42 ราย</td>
                        <td className="py-3 px-3.5 text-center font-mono text-emerald-700 font-bold">3.8 นาที</td>
                        <td className="py-3 px-3.5 text-right font-mono font-bold">1,680.00 บ.</td>
                        <td className="py-3 px-3.5 text-center"><span className="bg-emerald-100 text-emerald-900 text-xs px-2.5 py-0.5 rounded font-bold">100% ผ่าน</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50/50 bg-blue-50/40">
                        <td className="py-3 px-3.5 font-extrabold text-blue-950">สส.โพทะเล (เคสตัวอย่าง)</td>
                        <td className="py-3 px-3.5 text-center font-mono font-extrabold text-blue-950">28 ราย</td>
                        <td className="py-3 px-3.5 text-center font-mono text-emerald-700 font-extrabold">4.2 นาที</td>
                        <td className="py-3 px-3.5 text-right font-mono font-extrabold text-blue-950">1,120.00 บ.</td>
                        <td className="py-3 px-3.5 text-center"><span className="bg-emerald-100 text-emerald-900 text-xs px-2.5 py-0.5 rounded font-bold">100% ผ่าน</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50/50">
                        <td className="py-3 px-3.5 font-bold text-slate-900">สส.บางมูลนาก</td>
                        <td className="py-3 px-3.5 text-center font-mono">19 ราย</td>
                        <td className="py-3 px-3.5 text-center font-mono text-emerald-700 font-bold">4.0 นาที</td>
                        <td className="py-3 px-3.5 text-right font-mono font-bold">760.00 บ.</td>
                        <td className="py-3 px-3.5 text-center"><span className="bg-emerald-100 text-emerald-900 text-xs px-2.5 py-0.5 rounded font-bold">100% ผ่าน</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50/50">
                        <td className="py-3 px-3.5 font-bold text-slate-900">สส.ตะพานหิน</td>
                        <td className="py-3 px-3.5 text-center font-mono">24 ราย</td>
                        <td className="py-3 px-3.5 text-center font-mono text-emerald-700 font-bold">4.5 นาที</td>
                        <td className="py-3 px-3.5 text-right font-mono font-bold">960.00 บ.</td>
                        <td className="py-3 px-3.5 text-center"><span className="bg-emerald-100 text-emerald-900 text-xs px-2.5 py-0.5 rounded font-bold">100% ผ่าน</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Evolution Summary Card */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  บทสรุปความก้าวหน้าโครงการ ๓ ระยะ
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-800 block text-sm">ระยะที่ ๑ (ระบบเดิม):</span>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">LINE OA + KTB Corporate + เจ้าหน้าที่ส่งไฟล์ PDF ให้พิมพ์เอง</p>
                  </div>

                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                    <span className="font-bold text-blue-950 block text-sm">ระยะที่ ๒ (ปัจจุบัน - WebApp Demo):</span>
                    <p className="text-blue-800 text-xs mt-0.5 leading-relaxed">ระบบ Smart Counter + Targeted Watermark + Print Quota Lock + e-Seal</p>
                  </div>

                  <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl">
                    <span className="font-bold text-purple-950 block text-sm">ระยะที่ ๓ (เป้าหมายอนาคต):</span>
                    <p className="text-purple-800 text-xs mt-0.5 leading-relaxed">Citizen Self-Service คัดแบบผ่าน ThaID (IAL 2.3) ได้จากที่บ้านตลอด 24 ชม.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: Official Government Request Form (คำร้องขอคัดแบบ.pdf) */}
      {/* ========================================================================= */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Top Bar */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                    แบบการขอรับบริการข้อมูลสำเนาแบบแสดงรายการภาษี และเอกสารที่เกี่ยวข้อง
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    ของกรมสรรพากร (คำร้องขอคัดแบบฯ) • สส.โพทะเล | เลขที่รับ: <span className="font-mono font-bold text-amber-300">REQ-2569-0449</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Full Official Form */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50/50">
              
              {/* Paper Replica Container */}
              <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-5">
                
                {/* Header: Office Details */}
                <div className="border-b-2 border-slate-900/80 pb-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>สส.โพทะเล • สท.พิจิตร กรมสรรพากร</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Dip-Chip Smart Card แล้ว (IAL 2.3)
                      </span>
                    </div>
                  </div>

                  {/* Form Title according to คำร้องขอคัดแบบ.pdf */}
                  <div className="text-center space-y-1 pt-1">
                    <h2 className="text-base md:text-lg font-black text-slate-900 tracking-tight">
                      แบบการขอรับบริการข้อมูลสำเนาแบบแสดงรายการภาษี และเอกสารที่เกี่ยวข้อง
                    </h2>
                    <p className="text-xs text-slate-600 font-bold">ของกรมสรรพากร</p>
                  </div>

                  {/* Metadata Boxes: (สำหรับเจ้าหน้าที่) On Left & Written Details On Right */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                    <div className="md:col-span-5 border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-xs space-y-1">
                      <span className="font-bold text-slate-700 block border-b border-slate-200 pb-1">
                        (สำหรับเจ้าหน้าที่)
                      </span>
                      <div className="flex justify-between">
                        <span className="text-slate-500">เลขที่รับคำขอ:</span>
                        <span className="font-mono font-bold text-blue-700">REQ-2569-0449</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">รับที่:</span>
                        <span className="font-bold text-slate-800">เคาน์เตอร์ สส.โพทะเล</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">วันที่/เวลา:</span>
                        <span className="font-mono text-slate-700">13 ก.ย. 2569 เวลา 09:15 น.</span>
                      </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-end text-xs text-right space-y-1.5 pt-2 md:pt-0">
                      <div>
                        <span className="text-slate-500">เขียนที่: </span>
                        <span className="font-bold text-slate-800 border-b border-dotted border-slate-400 pb-0.5">
                          สำนักงานสรรพากรพื้นที่สาขาโพทะเล จ.พิจิตร
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">วันที่ </span>
                        <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 px-2 pb-0.5">๑๓</span>
                        <span className="text-slate-500"> เดือน </span>
                        <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 px-2 pb-0.5">กันยายน</span>
                        <span className="text-slate-500"> พ.ศ. </span>
                        <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 px-2 pb-0.5">๒๕๖๙</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 1: ข้อมูลผู้ยื่นคำร้อง */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-3">
                  <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      ๑. ข้อมูลผู้ยื่นคำร้อง (ข้าพเจ้า)
                    </span>
                    <span className="text-emerald-700 text-[11px] font-bold bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                      ✓ ดึงข้อมูลบัตรประชาชนอัตโนมัติ
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-slate-500">ข้าพเจ้า:</span>
                      <span className="font-bold text-blue-900">☑ นาย □ นาง □ นางสาว</span>
                      <span className="font-bold text-slate-900 text-sm bg-white px-3 py-1 rounded border border-slate-300 shadow-xs">
                        นายสมชาย มุ่งมั่นพัฒนา
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-slate-500">เลขบัตรประจำตัวประชาชน / เลขประจำตัวผู้เสียภาษีอากร:</span>
                      <span className="font-mono font-bold text-blue-800 bg-white px-2.5 py-1 rounded border border-slate-300 text-sm">
                        1-6699-00123-45-6
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed space-y-1">
                      <div>
                        ที่อยู่: <span className="font-bold text-slate-900">124/5</span> หมู่ที่: <span className="font-bold text-slate-900">3</span> ถนน: <span className="font-bold text-slate-900">-</span> ตำบล/แขวง: <span className="font-bold text-slate-900">โพทะเล</span> อำเภอ/เขต: <span className="font-bold text-slate-900">โพทะเล</span> จังหวัด: <span className="font-bold text-slate-900">พิจิตร</span> โทรศัพท์มือถือ: <span className="font-mono font-bold text-slate-900">081-999-8877</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-slate-600">
                      <span>มีฐานะเป็น:</span>
                      <span className="text-slate-400">□ กรรมการผู้มีอำนาจ</span>
                      <span className="text-slate-400">□ ผู้รับมอบอำนาจ</span>
                      <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        ☑ ผู้มีเงินได้
                      </span>
                      <span className="text-slate-400">□ อื่นๆ</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: ความประสงค์ขอรับบริการข้อมูลสำเนาแบบฯ */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-3">
                  <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FolderSearch className="w-4 h-4 text-blue-600" />
                      ๒. ความประสงค์ขอรับบริการข้อมูลสำเนาแบบแสดงรายการภาษี และเอกสารที่เกี่ยวข้อง
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-slate-500">ขอรับบริการ:</span>
                      <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        ☑ ข้อมูลสำเนาแบบแสดงรายการภาษี
                      </span>
                      <span className="text-slate-400">□ ใบเสร็จรับเงิน</span>
                      <span className="text-slate-400">□ อื่นๆ</span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ☑ รับรองสำเนาแบบฯ □ ไม่รับรองสำเนาแบบฯ
                      </span>
                    </div>

                    <div className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <div className="text-slate-500 text-[11px]">
                        ตามระเบียบฯ ของราชการกรมสรรพากร ของราย: <span className="font-bold text-slate-900">นายสมชาย มุ่งมั่นพัฒนา</span> เลขประจำตัวประชาชน: <span className="font-mono font-bold text-slate-900">1-6699-00123-45-6</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-md border border-blue-200 text-xs">
                          <span className="font-bold text-blue-900">☑ แบบฯ</span>
                          <span className="font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">ภ.ง.ด.90 (บุคคลธรรมดา)</span>
                          <span className="text-slate-600">ปีภาษี:</span>
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">2568</span>
                          <span className="text-slate-600">เดือน:</span>
                          <span className="font-bold text-slate-800">มกราคม</span>
                          <span className="text-slate-600">ถึงเดือน:</span>
                          <span className="font-bold text-slate-800">ธันวาคม</span>
                          <span className="text-slate-600">จำนวน:</span>
                          <span className="font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded text-sm">2</span>
                          <span>(ชุด)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 pl-2">
                          □ แบบฯ .............................. ปีภาษี ............ เดือน ............ ถึงเดือน ............ จำนวน ...... (ชุด)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: เพื่อนำไปเป็นหลักฐานในการ */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-3">
                  <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-blue-600" />
                      ๓. เพื่อนำไปเป็นหลักฐานในการ (จัดทำลายน้ำระบุปลายทางป้องกันการทำซ้ำ)
                    </span>
                    <span className="text-blue-700 text-[11px] font-bold bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200">
                      {currentPreset.category}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex flex-wrap items-center gap-3 text-slate-600">
                      <span>เพื่อนำไปเป็นหลักฐานในการ:</span>
                      <span className="text-slate-400">□ ขอต่อวีซ่า</span>
                      <span className="text-slate-400">□ ขอใบอนุญาตทำงาน</span>
                      <span className="text-slate-400">□ เก็บไว้เป็นหลักฐาน</span>
                      <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        ☑ อื่นๆ (ระบุวัตถุประสงค์/ปลายทางเพื่อจัดทำลายน้ำ):
                      </span>
                    </div>

                    {/* Dropdown matching our 8 categories */}
                    <select
                      value={selectedPurposeId}
                      onChange={(e) => setSelectedPurposeId(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl p-2.5 text-sm font-bold text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      {Array.from(new Set(WATERMARK_PRESETS.map(p => p.category))).map(cat => (
                        <optgroup key={cat} label={`📂 ${cat}`}>
                          {WATERMARK_PRESETS.filter(p => p.category === cat).map(p => (
                            <option key={p.id} value={p.id}>{p.label}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>

                    {selectedPurposeId === "custom" && (
                      <div className="pt-1">
                        <input
                          type="text"
                          placeholder="พิมพ์ระบุหน่วยงานหรือข้อความลายน้ำเอง..."
                          value={customWatermark}
                          onChange={(e) => setCustomWatermark(e.target.value)}
                          className="w-full bg-white border-2 border-blue-400 rounded-xl p-2 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] bg-blue-50/80 p-2.5 rounded-lg border border-blue-200 text-blue-900">
                      <span><strong>สิ่งที่ปลายทางต้องการตรวจ:</strong> {currentPreset.inspectionFocus}</span>
                      <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        ลายน้ำที่จะพิมพ์: "ใช้สำหรับ {activeWatermarkText} เท่านั้น"
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: ลายมือชื่อ & ส่วนสำหรับเจ้าหน้าที่ตามแบบฟอร์มจริง */}
                <div className="border border-slate-300 rounded-xl overflow-hidden text-xs bg-white space-y-0">
                  
                  {/* Signatures row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 p-3.5 border-b border-slate-200 gap-4 bg-slate-50/40">
                    <div>
                      <span className="text-slate-500 block mb-1">ได้รับแบบฯ แล้ว (ลงชื่อเมื่อรับเอกสาร):</span>
                      <div className="border-b border-dotted border-slate-400 h-6 text-slate-400 text-center italic">
                        (จะลงชื่อรับมอบในขั้นตอนที่ ๕)
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">ผู้ยื่นคำร้อง:</span>
                      <div className="border-b border-dotted border-slate-400 pb-0.5 flex justify-between items-center">
                        <span className="font-bold text-slate-900">ลงชื่อ: สมชาย มุ่งมั่นพัฒนา</span>
                        <span className="text-slate-500 font-mono text-[11px]">โทร. 081-999-8877</span>
                      </div>
                    </div>
                  </div>

                  {/* Official Examination Grid */}
                  <div className="bg-slate-100 font-bold text-slate-800 px-3.5 py-1.5 border-b border-slate-300 flex justify-between items-center">
                    <span>(ส่วนสำหรับเจ้าหน้าที่ผู้ตรวจรับคำขอและคัดค้นข้อมูล)</span>
                    <span className="text-[11px] font-normal text-slate-500 font-mono">คำร้องขอคัดแบบฯ พ.ศ. ๒๕๖๙</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300">
                    {/* Left: เรียน / คำสั่ง */}
                    <div className="p-3.5 space-y-2 bg-white">
                      <div>
                        <span className="text-slate-500">เรียน:</span>
                        <span className="font-bold text-slate-800 ml-1.5">หัวหน้าสำนักงานสรรพากรพื้นที่สาขาโพทะเล</span>
                      </div>
                      <div className="text-emerald-800 font-bold bg-emerald-50 p-1.5 rounded border border-emerald-200">
                        ☑ เห็นควรดำเนินการได้
                      </div>
                      <div className="text-[11px] text-slate-600 flex justify-between pt-0.5">
                        <span>เจ้าหน้าที่ผู้ตรวจ:</span>
                        <span className="font-bold text-slate-900">นางสาว มยุรี ชื่นจิตต์ (จนท.สส.)</span>
                      </div>
                      <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between">
                        <span className="font-bold text-slate-700">คำสั่ง:</span>
                        <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          ☑ อนุมัติ □ ไม่อนุมัติ
                        </span>
                      </div>
                    </div>

                    {/* Right: ผลการคัดค้นข้อมูล & อัตราค่าธรรมเนียม */}
                    <div className="p-3.5 space-y-2 bg-slate-50/50">
                      <div className="font-bold text-slate-800 text-[11px]">ผลการคัดค้นข้อมูล & ค่าธรรมเนียม:</div>
                      <div className="text-[11px] space-y-1 text-slate-700">
                        <div className="text-emerald-800 font-semibold">☑ ค้นพบข้อมูลการยื่นแบบแสดงรายการภาษีในระบบ</div>
                        <div className="flex justify-between">
                          <span>จำนวนที่ให้บริการ:</span>
                          <span className="font-mono font-bold text-slate-900">2 ฉบับ (ฉบับละ 20.00 บาท)</span>
                        </div>
                        <div className="flex justify-between text-emerald-800 font-black border-t border-slate-200 pt-1 text-xs">
                          <span>รวมค่าธรรมเนียมทั้งสิ้น:</span>
                          <span className="font-mono text-sm">40.00 บาท</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          เลขที่ใบเสร็จรับเงิน: <span className="font-mono font-bold text-purple-700">RC-2569-00188</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footnotes matching คำร้องขอคัดแบบ.pdf */}
                <div className="text-[10px] text-slate-400 leading-tight space-y-0.5 border-t border-slate-100 pt-2">
                  <div>1. กรณีมอบอำนาจให้นำสำเนาบัตรประจำตัวประชาชนหรือหนังสือเดินทาง (กรณีชาวต่างชาติ) ของผู้มอบอำนาจพร้อมรับรองสำเนา</div>
                  <div>2. กรณีมอบอำนาจให้ผู้อื่นทำการแทน หนังสือมอบอำนาจให้ติดอากรแสตมป์ 10 บาท หรือ 30 บาท ตามระเบียบกรมสรรพากร</div>
                </div>

              </div>

            </div>

            {/* Modal Sticky Footer with Submit Button */}
            <div className="flex items-center justify-between p-4.5 bg-slate-100 border-t border-slate-300 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition cursor-pointer border border-slate-300 shadow-xs"
              >
                ยกเลิก / ปิดหน้าต่าง
              </button>

              <button
                type="button"
                onClick={() => {
                  setRequestSubmitted(true);
                  setShowRequestModal(false);
                  showToast("✓ บันทึกคำร้องขอคัดแบบ (REQ-2569-0449) เรียบร้อย -> กลับมาที่หน้าเคาน์เตอร์ สส.");
                }}
                className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-base rounded-xl shadow-lg flex items-center gap-2.5 transition cursor-pointer transform hover:scale-[1.02]"
              >
                <Save className="w-5 h-5" />
                <span>💾 บันทึกคำร้อง (กลับสู่หน้าเคาน์เตอร์ สส.)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Full Document Preview (When Print is clicked) */}
      {/* ========================================================================= */}
      {showDocumentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col p-6 space-y-4 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <Printer className="w-6 h-6 text-blue-700" />
                  เอกสารแบบแสดงรายการภาษีที่จัดพิมพ์ออกจากระบบ (ชุดที่ {printedCopies}/{totalCopies})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  แบบแสดงรายการภาษีเงินได้บุคคลธรรมดา (ภ.ง.ด.90) ประจำปีภาษี ๒๕๖๘ • พิมพ์ด้วยเลเซอร์ขาวดำมาตรฐานกรมสรรพากร
                </p>
              </div>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-2xl p-1 leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Document Body (Scrollable A4 view) */}
            <div className="overflow-y-auto flex-1 border border-slate-300 rounded-xl bg-slate-100 p-4 flex justify-center shadow-inner">
              <div className="bg-white shadow-xl rounded-sm border border-slate-300 max-w-[720px] w-full relative select-none">
                
                {/* Authentic Laser B&W Document Image */}
                <img 
                  src="/pnd90_filled_laser_bw.png" 
                  alt="แบบ ภ.ง.ด.90 ฉบับพิมพ์เลเซอร์ขาวดำ"
                  className="w-full h-auto block"
                />

                {/* Giant Diagonal Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-8">
                  <div className="transform -rotate-25 text-red-600/22 font-black text-2xl md:text-3xl text-center border-4 border-dashed border-red-600/35 px-8 py-5 rounded-2xl leading-relaxed uppercase bg-white/10 backdrop-blur-[0.5px]">
                    ใช้สำหรับ {activeWatermarkText} เท่านั้น<br />
                    <span className="text-xs md:text-sm font-bold block mt-1">ห้ามนำไปทำสำเนาหรือใช้เพื่อวัตถุประสงค์อื่น • โควตา {printedCopies}/{totalCopies} ชุด</span>
                  </div>
                </div>

                {/* Rubber Stamp e-Seal Simulation (positioned at lower section) */}
                <div className="absolute bottom-[18%] right-8 pointer-events-none z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-4 border-red-600 flex flex-col items-center justify-center text-red-600 font-bold text-xs transform -rotate-12 bg-red-50/75 shadow-lg animate-stamp">
                    <span className="text-[10px]">สำเนาถูกต้อง</span>
                    <span className="text-[12px] font-black">กรมสรรพากร</span>
                    <span className="text-[9px]">สท.พิจิตร</span>
                    <span className="text-[8px] font-mono">e-Seal 2569</span>
                  </div>
                  <div className="bg-white/95 border border-red-200 px-2 py-0.5 rounded shadow-sm text-center mt-1">
                    <span className="font-bold text-slate-900 block text-[10px]">รับรองสำเนาถูกต้องทางอิเล็กทรอนิกส์</span>
                    <span className="text-[9px] text-slate-600 block">นายนภัส ศิริรัตนพงศ์ธร (สส.โพทะเล)</span>
                  </div>
                </div>

                {/* Verification QR Code (positioned bottom right) */}
                <div className="absolute bottom-5 right-8 pointer-events-none z-10 bg-white/95 p-2 rounded-lg border border-slate-400 shadow-md flex items-center gap-2">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=VERIFY-TAX-DOC-RCT6909088" 
                    alt="QR Verification"
                    className="w-14 h-14 border border-slate-200 p-0.5 bg-white rounded"
                  />
                  <div className="text-[9px] text-slate-700 font-mono">
                    <span className="font-bold text-slate-900 block text-[10px]">QR ตรวจสอบความถูกต้อง</span>
                    <span>Ref: RCT6909088</span>
                    <span className="text-emerald-700 block font-bold">● e-Signature Hash Valid</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-shrink-0">
              <div className="text-xs text-slate-500">
                ระบบล็อคการพิมพ์จำกัดตามโควตาใบเสร็จ (<span className="font-bold text-blue-700">{printedCopies}/{totalCopies} ชุด</span>) หากพิมพ์เกินต้องขออนุมัติปลดล็อค
              </div>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm transition cursor-pointer shadow"
              >
                ปิดหน้าต่าง
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Stage Pitch Guide (คู่มือบทพูดบนเวที) */}
      {/* ========================================================================= */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 space-y-5 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  สคริปต์และลำดับการนำเสนอบนเวที (Stage Presentation Pitch Guide)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">ลำดับการคลิกและบทพูดแนะนำสำหรับผู้บรรยาย (Flow อัจฉริยะ ๖ ขั้นตอน)</p>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 max-h-[60vh] overflow-y-auto pr-2">
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5">
                <span className="font-extrabold text-blue-950 text-base block">ขั้นตอนที่ ๑ : เคาน์เตอร์ สส. (รับคำขอ)</span>
                <p className="text-slate-700"><strong>การกระทำ:</strong> อยู่ที่หน้าแรก สส.โพทะเล เสียบบัตร Smart Card นายสมชาย มุ่งมั่นพัฒนา กดปุ่ม <em>"บันทึกและส่งคำขอไปยัง ส่วนคัดแบบ"</em></p>
                <p className="text-blue-900 font-semibold"><strong>บทพูด:</strong> "จุดเริ่มต้นบริการ ประชาชนเดินเข้ามาที่ สส.สาขาใกล้บ้าน เจ้าหน้าที่เสียบบัตรประชาชน ดึงข้อมูลอัตโนมัติ ระบุขอคัดแบบ ภ.ง.ด.90 แล้วส่งคำขอข้ามระบบไปยังส่วนคัดแบบ สท.พิจิตร ได้ทันทีครับ"</p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-1.5">
                <span className="font-extrabold text-purple-950 text-base block">ขั้นตอนที่ ๒ : ส่วนคัดแบบ (อัปโหลดไฟล์เข้าระบบ & คิดเงิน QR)</span>
                <p className="text-slate-700"><strong>การกระทำ:</strong> หน้าจอกระโดดมาที่ส่วนคัดแบบ แสดงไฟล์ PDF ที่เตรียมไว้ กดปุ่ม <em>"อัปโหลดไฟล์ขึ้นระบบ & ส่ง QR คิดเงิน 40 บ. ไปยัง สส."</em></p>
                <p className="text-purple-900 font-semibold"><strong>บทพูด:</strong> "ในระบบเดิม (LINE OA) เจ้าหน้าที่จะโยนไฟล์ PDF ผ่านแชท LINE ส่งให้สาขา ซึ่งเสี่ยงต่อการทำซ้ำไม่จำกัด แต่ในระบบ WebApp เฟส ๒ เจ้าหน้าที่จะอัปโหลดไฟล์ PDF เข้าสู่ระบบศูนย์กลางโดยตรง ระบบจะคำนวณค่าธรรมเนียม 40 บาท พร้อมสร้าง Dynamic QR Code ส่งกลับไปยังเคาน์เตอร์ สส. ทันทีครับ"</p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
                <span className="font-extrabold text-amber-950 text-base block">ขั้นตอนที่ ๓ : เคาน์เตอร์ สส. (สแกนชำระเงิน)</span>
                <p className="text-slate-700"><strong>การกระทำ:</strong> หน้าจอกระโดดกลับมาที่เคาน์เตอร์ สส. จอฝั่งประชาชนแสดง QR 40 บาท กดปุ่ม <em>"จำลองประชาชนสแกน QR Code ชำระเงิน"</em></p>
                <p className="text-amber-900 font-semibold"><strong>บทพูด:</strong> "ที่หน้าเคาน์เตอร์ สส. ประชาชนเห็นไฟล์แบบที่พร้อมส่งมอบ และสแกน QR จ่ายเงิน 40 บาท ผ่าน Mobile Banking ได้ทันทีโดยไม่ต้องเดินไปจ่ายที่อื่น"</p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-1.5">
                <span className="font-extrabold text-purple-950 text-base block">ขั้นตอนที่ ๔ : หน้าจอการเงิน (Treasury)</span>
                <p className="text-slate-700"><strong>การกระทำ:</strong> หน้าจอจะกระโดดมาที่หน้าฝ่ายการเงิน แสดงยอดเงิน 40 บ. เข้าทันที กดปุ่ม <em>"ออกใบเสร็จรับเงินราชการ & ปลดล็อคโควตาพิมพ์"</em></p>
                <p className="text-purple-900 font-semibold"><strong>บทพูด:</strong> "สังเกตที่หน้าจอฝ่ายการเงินครับ ระบบตัดรับยอดเงินและออกใบเสร็จราชการอิเล็กทรอนิกส์เล่มที่/เลขที่ให้อัตโนมัติทันที พร้อมส่งสัญญาณปลดล็อคโควตาพิมพ์ 2 ฉบับตามใบเสร็จกลับไปที่สาขา"</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <span className="font-extrabold text-emerald-950 text-base block">ขั้นตอนที่ ๕ : เคาน์เตอร์ สส. (พิมพ์เอกสาร & ป้องกันการทำซ้ำ)</span>
                <p className="text-slate-700"><strong>การกระทำ:</strong> หน้าระบบสลับกลับมาที่สาขา แสดงลายน้ำปลายทางที่ล็อคตามคำร้องไว้แล้ว แล้วกดปุ่ม <em>"สั่งพิมพ์เอกสารชุดที่ 1"</em></p>
                <p className="text-emerald-900 font-semibold"><strong>บทพูด:</strong> "นี่คือไฮไลท์ของระบบครับ! เอกสารที่พิมพ์ออกมาจะมีลายน้ำทแยงมุมระบุปลายทางตามคำร้องอย่างชัดเจน มี e-Seal รับรอง และมี Print Quota Lock นับถอยหลังตามใบเสร็จ ป้องกันการแอบพิมพ์ซ้ำซ้อนโดยไม่เสียค่าธรรมเนียมได้ 100%"</p>
              </div>

              <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-1.5">
                <span className="font-extrabold text-slate-950 text-base block">ขั้นตอนที่ ๖ : แดชบอร์ด SLA & ผู้บริหาร</span>
                <p className="text-slate-700"><strong>การกระทำ:</strong> กดปุ่มส่งมอบ แล้วกระโดดไปหน้าแดชบอร์ด SLA</p>
                <p className="text-slate-900 font-semibold"><strong>บทพูด:</strong> "ส่งผลให้ภาพรวมลดระยะเวลาจาก 1-2 วัน เหลือเพียง 4.2 นาที ความพึงพอใจ 99.4% และข้อมูลเชื่อมโยงโปร่งใสตรวจสอบได้ทุกขั้นตอนครับ"</p>
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm transition cursor-pointer"
              >
                เข้าใจแล้ว / ปิดหน้าต่าง
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-4 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium">ระบบบริหารจัดการและคัดแบบแสดงรายการภาษีอัจฉริยะ (RCT WebApp Platform) • สำนักงานสรรพากรพื้นที่พิจิตร</span>
          <span className="font-mono text-slate-400">Next.js 16 • Tailwind CSS • Vercel Ready</span>
        </div>
      </footer>

    </div>
  );
}
