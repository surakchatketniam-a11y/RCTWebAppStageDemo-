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
  ChevronDown,
  ChevronUp,
  Layers,
  AlertTriangle,
  Zap,
  TrendingUp,
  ShieldAlert,
  Filter,
  ListFilter,
  MapPin,
  Users,
  History,
  Fuel,
  Car,
  Navigation
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

// Request Timeline Event & Consolidated Request Interfaces
export interface RequestTimelineEvent {
  status: string;
  role: string;
  note: string;
  timestamp: string;
}

export interface ConsolidatedRequest {
  id: string;
  trackingNo: string;
  fullName: string;
  citizenId: string;
  taxForm: string;
  taxYears: string[];
  submittedBranch: string;
  status: "SUBMITTED" | "SEARCHING" | "FEE_CALCULATED" | "AWAITING_PAYMENT" | "PAID" | "NOT_FOUND" | "READY_FOR_PICKUP" | "COMPLETED";
  statusLabel: string;
  statusBadgeColor: string;
  currentStepDescription: string;
  totalDurationMinutes?: number;
  inProgressMinutes?: number;
  pages?: number;
  fee?: number;
  createdAt: string;
  updatedAt: string;
  isCurrentDemoCase?: boolean;
  timeline: RequestTimelineEvent[];
}

export const PHICHIT_BRANCHES = [
  { id: "ALL", label: "ทุกสาขาทั่วจังหวัด" },
  { id: "สส.โพทะเล", label: "🌾 สส.โพทะเล" },
  { id: "สส.ทับคล้อ", label: "⛏️ สส.ทับคล้อ" },
  { id: "สส.บางมูลนาก", label: "🚂 สส.บางมูลนาก" },
  { id: "สส.วังทรายพูน", label: "🌳 สส.วังทรายพูน" },
  { id: "สส.ตะพานหิน", label: "🌉 สส.ตะพานหิน" },
  { id: "สส.สากเหล็ก", label: "⛰️ สส.สากเหล็ก" },
  { id: "สส.โพธิ์ประทับช้าง", label: "🍊 สส.โพธิ์ประทับช้าง" },
  { id: "สส.สามง่าม", label: "🛶 สส.สามง่าม" },
  { id: "สส.เมืองพิจิตร", label: "🏛️ สส.เมืองพิจิตร" },
] as const;

export const OTHER_PROVINCE_REQUESTS: ConsolidatedRequest[] = [
  {
    id: "REQ-2569-0455",
    trackingNo: "RCT-6908-012",
    fullName: "นายประเสริฐ วงศ์สว่าง",
    citizenId: "1-6608-00123-88-9",
    taxForm: "ภ.ง.ด.90",
    taxYears: ["2568"],
    submittedBranch: "สส.ทับคล้อ",
    status: "PAID",
    statusLabel: "ชำระเงินแล้ว ออกใบเสร็จ",
    statusBadgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    currentStepDescription: "ชำระเงินเรียบร้อย อยู่ระหว่างรอพิมพ์เอกสาร e-Seal ณ เคาน์เตอร์ สส.ทับคล้อ",
    inProgressMinutes: 14,
    pages: 2,
    fee: 40,
    createdAt: "13 ก.ย. 2569, 09:10 น.",
    updatedAt: "13 ก.ย. 2569, 09:24 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.ทับคล้อ", note: "รับคำร้องคัดแบบ ภ.ง.ด.90 ใช้ยื่นสินเชื่อ SME", timestamp: "13 ก.ย. 2569, 09:10 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.ทับคล้อ", note: "ส่งคำขอผ่านระบบสู่ส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 09:12 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "พบแบบดิจิทัลในคลัง พร้อมจัดทำ QR คิดเงิน 40 บ.", timestamp: "13 ก.ย. 2569, 09:18 น." },
      { status: "PAID", role: "งานคลัง / PromptPay", note: "ผู้เสียภาษีสแกน QR จ่ายเงิน 40.00 บาท ออกใบเสร็จแล้ว", timestamp: "13 ก.ย. 2569, 09:24 น." }
    ]
  },
  {
    id: "REQ-2569-0453",
    trackingNo: "RCT-6907-009",
    fullName: "นางดาราวรรณ พรมสถิตย์",
    citizenId: "1-6607-00456-77-1",
    taxForm: "ภ.พ.30",
    taxYears: ["ก.พ. 2569"],
    submittedBranch: "สส.สากเหล็ก",
    status: "SEARCHING",
    statusLabel: "กำลังค้นหาแบบฯ ในคลัง",
    statusBadgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    currentStepDescription: "รอผลจากงานบริการแบบฯ สท. (อยู่ระหว่างตรวจสอบฐานข้อมูลภาษีมูลค่าเพิ่ม)",
    inProgressMinutes: 8,
    pages: undefined,
    fee: undefined,
    createdAt: "13 ก.ย. 2569, 09:18 น.",
    updatedAt: "13 ก.ย. 2569, 09:25 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.สากเหล็ก", note: "รับคำร้องยื่นขอคัดแบบ ภ.พ.30 ประกอบธุรกิจค้าวัสดุก่อสร้าง", timestamp: "13 ก.ย. 2569, 09:18 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.สากเหล็ก", note: "ส่งคำขอทางระบบถึงส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 09:20 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "เจ้าหน้าที่คลังอยู่ระหว่างค้นหาไฟล์แบบ ภ.พ.30", timestamp: "13 ก.ย. 2569, 09:25 น." }
    ]
  },
  {
    id: "REQ-2569-0451",
    trackingNo: "RCT-6904-018",
    fullName: "นายสมเกียรติ มงคลทรัพย์",
    citizenId: "1-6604-00789-22-3",
    taxForm: "ภ.ง.ด.91",
    taxYears: ["2567"],
    submittedBranch: "สส.โพธิ์ประทับช้าง",
    status: "COMPLETED",
    statusLabel: "ส่งมอบสำเร็จแล้ว",
    statusBadgeColor: "bg-green-100 text-green-800 border-green-300",
    currentStepDescription: "ส่งมอบสำเนาแบบฯ พร้อมรับรอง e-Seal ให้ผู้เสียภาษีสำเร็จเรียบร้อย",
    totalDurationMinutes: 18,
    pages: 2,
    fee: 20,
    createdAt: "13 ก.ย. 2569, 08:45 น.",
    updatedAt: "13 ก.ย. 2569, 09:03 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.โพธิ์ประทับช้าง", note: "รับคำร้องขอคัดแบบ ภ.ง.ด.91 ยื่นสมัครงาน", timestamp: "13 ก.ย. 2569, 08:45 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.โพธิ์ประทับช้าง", note: "ส่งคำขอให้ส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 08:47 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "ค้นพบแบบในระบบดิจิทัล ส่งงานคลังออก QR 20 บ.", timestamp: "13 ก.ย. 2569, 08:52 น." },
      { status: "PAID", role: "งานคลัง / KTB", note: "ชำระเงินสำเร็จ 20.00 บาท ออกใบเสร็จ e-Receipt", timestamp: "13 ก.ย. 2569, 08:56 น." },
      { status: "COMPLETED", role: "เจ้าหน้าที่ สส.โพธิ์ประทับช้าง", note: "พิมพ์เอกสารรับรอง e-Seal และส่งมอบให้ผู้เสียภาษี", timestamp: "13 ก.ย. 2569, 09:03 น." }
    ]
  },
  {
    id: "REQ-2569-0412",
    trackingNo: "RCT-6909-052",
    fullName: "นายประดิษฐ์ พงษ์ศิริ",
    citizenId: "1-6604-00088-12-9",
    taxForm: "ภ.ง.ด.91",
    taxYears: ["2567"],
    submittedBranch: "สส.โพทะเล",
    status: "COMPLETED",
    statusLabel: "ส่งมอบสำเร็จแล้ว",
    statusBadgeColor: "bg-green-100 text-green-800 border-green-300",
    currentStepDescription: "ส่งมอบสำเนาแบบฯ พร้อมรับรอง e-Seal ให้ผู้เสียภาษีสำเร็จเรียบร้อย",
    totalDurationMinutes: 15,
    pages: 3,
    fee: 20,
    createdAt: "13 ก.ย. 2569, 08:30 น.",
    updatedAt: "13 ก.ย. 2569, 08:45 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.โพทะเล", note: "ยื่นคำขอที่เคาน์เตอร์ สส.โพทะเล (เพื่อใช้สมัครงาน)", timestamp: "13 ก.ย. 2569, 08:30 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.โพทะเล", note: "ส่งคำขอทางระบบให้ส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 08:32 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "ค้นพบแบบในระบบดิจิทัล 3 หน้า ส่งคิดค่าธรรมเนียม", timestamp: "13 ก.ย. 2569, 08:35 น." },
      { status: "PAID", role: "งานคลัง / PromptPay", note: "ชำระเงินผ่าน QR 20.00 บาท ออกใบเสร็จรับเงินสำเร็จ", timestamp: "13 ก.ย. 2569, 08:38 น." },
      { status: "COMPLETED", role: "เจ้าหน้าที่ สส.โพทะเล", note: "พิมพ์เอกสารประทับ e-Seal และส่งมอบให้ผู้เสียภาษีเรียบร้อย", timestamp: "13 ก.ย. 2569, 08:45 น." }
    ]
  },
  {
    id: "REQ-2569-0450",
    trackingNo: "RCT-6901-091",
    fullName: "น.ส.กานดา รัตนวิชัย",
    citizenId: "1-6601-00345-67-8",
    taxForm: "ภ.พ.30",
    taxYears: ["ม.ค. - ก.พ. 2569"],
    submittedBranch: "สส.เมืองพิจิตร",
    status: "SEARCHING",
    statusLabel: "กำลังค้นหาแบบฯ ในคลัง",
    statusBadgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    currentStepDescription: "รอผลจากงานบริการแบบฯ สท. (กำลังค้นหาแฟ้มกระดาษในคลัง)",
    inProgressMinutes: 5,
    pages: undefined,
    fee: undefined,
    createdAt: "13 ก.ย. 2569, 09:20 น.",
    updatedAt: "13 ก.ย. 2569, 09:25 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.เมืองพิจิตร", note: "รับคำร้องขอยื่นแบบ ภ.พ.30 ใช้ขอสินเชื่อ SME สถาบันการเงิน", timestamp: "13 ก.ย. 2569, 09:20 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.เมืองพิจิตร", note: "ส่งคำขอทางระบบให้ส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 09:22 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "อยู่ระหว่างดึงแฟ้มเอกสารกระดาษจากห้องจัดเก็บคลังกลาง", timestamp: "13 ก.ย. 2569, 09:25 น." }
    ]
  },
  {
    id: "REQ-2569-0448",
    trackingNo: "RCT-6903-085",
    fullName: "นายวิเชียร ธนกิจเจริญ",
    citizenId: "1-6603-00567-89-0",
    taxForm: "ภ.ง.ด.91",
    taxYears: ["2567"],
    submittedBranch: "สส.บางมูลนาก",
    status: "PAID",
    statusLabel: "ชำระเงินแล้ว ออกใบเสร็จ",
    statusBadgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    currentStepDescription: "ชำระเงินแล้ว ออกใบเสร็จ รอส่วนคัดแบบส่งภาพแบบฯ กลับสาขา",
    inProgressMinutes: 17,
    pages: 2,
    fee: 20,
    createdAt: "13 ก.ย. 2569, 09:05 น.",
    updatedAt: "13 ก.ย. 2569, 09:22 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.บางมูลนาก", note: "รับคำร้องขอคัดแบบ ภ.ง.ด.91 ยื่นสมัครงานราชการ", timestamp: "13 ก.ย. 2569, 09:05 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.บางมูลนาก", note: "ส่งคำขอให้ส่วนกลาง สท.พิจิตร", timestamp: "13 ก.ย. 2569, 09:07 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "พบแบบดิจิทัลในระบบ จัดทำไฟล์ PDF ความละเอียด 300 DPI", timestamp: "13 ก.ย. 2569, 09:12 น." },
      { status: "PAID", role: "งานคลัง / KTB", note: "ผู้เสียภาษีสแกนจ่าย QR 20.00 บาท สำเร็จ ออกใบเสร็จรับเงินแล้ว", timestamp: "13 ก.ย. 2569, 09:22 น." }
    ]
  },
  {
    id: "REQ-2569-0445",
    trackingNo: "RCT-6902-077",
    fullName: "นางวันเพ็ญ ศรีสุข",
    citizenId: "1-6602-00789-01-2",
    taxForm: "ภ.ง.ด.90",
    taxYears: ["2565"],
    submittedBranch: "สส.ตะพานหิน",
    status: "NOT_FOUND",
    statusLabel: "ไม่พบแบบฯ ในระบบ",
    statusBadgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    currentStepDescription: "ไม่พบแบบฯ ในระบบคลัง สท. (ประสานแจ้งผู้เสียภาษีเรียบร้อย)",
    totalDurationMinutes: 20,
    pages: undefined,
    fee: undefined,
    createdAt: "13 ก.ย. 2569, 08:50 น.",
    updatedAt: "13 ก.ย. 2569, 09:10 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.ตะพานหิน", note: "รับคำร้องขอคัดแบบ ภ.ง.ด.90 ย้อนหลังปี 2565", timestamp: "13 ก.ย. 2569, 08:50 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.ตะพานหิน", note: "ส่งคำขอให้ส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 08:52 น." },
      { status: "NOT_FOUND", role: "งานบริการแบบฯ สท.", note: "ตรวจสอบคลังเอกสารแล้วไม่พบประวัติการยื่นแบบปี 2565 (แจ้ง สส.ตะพานหิน ประสานผู้เสียภาษี)", timestamp: "13 ก.ย. 2569, 09:10 น." }
    ]
  },
  {
    id: "REQ-2569-0442",
    trackingNo: "RCT-6905-064",
    fullName: "นายสุรชัย ชัยชนะ",
    citizenId: "1-6605-00912-34-5",
    taxForm: "ภ.ธ.40",
    taxYears: ["2568"],
    submittedBranch: "สส.สามง่าม",
    status: "FEE_CALCULATED",
    statusLabel: "พบแบบฯ 4 หน้า รอคลังออก QR",
    statusBadgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    currentStepDescription: "พบแบบฯ 4 หน้า อยู่ระหว่างรอคลังสร้าง Dynamic QR ค่าธรรมเนียม",
    inProgressMinutes: 22,
    pages: 4,
    fee: 20,
    createdAt: "13 ก.ย. 2569, 08:40 น.",
    updatedAt: "13 ก.ย. 2569, 09:02 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.สามง่าม", note: "รับคำร้องยื่นคัดแบบ ภ.ธ.40 ธุรกิจเฉพาะ", timestamp: "13 ก.ย. 2569, 08:40 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.สามง่าม", note: "ส่งเรื่องมาส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 08:42 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "ค้นพบต้นฉบับเอกสารจำนวน 4 หน้า ส่งงานคลังเพื่อเตรียมออก QR", timestamp: "13 ก.ย. 2569, 09:02 น." }
    ]
  },
  {
    id: "REQ-2569-0439",
    trackingNo: "RCT-6906-058",
    fullName: "นางศิริพร บุญส่ง",
    citizenId: "1-6606-00123-45-7",
    taxForm: "ภ.ง.ด.94",
    taxYears: ["2568"],
    submittedBranch: "สส.วังทรายพูน",
    status: "COMPLETED",
    statusLabel: "ส่งมอบสำเร็จแล้ว",
    statusBadgeColor: "bg-green-100 text-green-800 border-green-300",
    currentStepDescription: "ส่งมอบสำเนาแบบฯ พร้อมรับรอง e-Seal ให้ผู้เสียภาษีสำเร็จเรียบร้อย",
    totalDurationMinutes: 35,
    pages: 2,
    fee: 20,
    createdAt: "13 ก.ย. 2569, 08:20 น.",
    updatedAt: "13 ก.ย. 2569, 08:55 น.",
    isCurrentDemoCase: false,
    timeline: [
      { status: "SUBMITTED", role: "เจ้าหน้าที่ สส.วังทรายพูน", note: "ยื่นคำขอคัด ภ.ง.ด.94 ครึ่งปีสำหรับบุคคลธรรมดา", timestamp: "13 ก.ย. 2569, 08:20 น." },
      { status: "FORWARDED", role: "เจ้าหน้าที่ สส.วังทรายพูน", note: "ส่งคำขอให้ส่วนคัดแบบ สท.พิจิตร", timestamp: "13 ก.ย. 2569, 08:22 น." },
      { status: "SEARCHING", role: "งานบริการแบบฯ สท.", note: "ค้นพบแบบในระบบ สแกนและอัปโหลด PDF", timestamp: "13 ก.ย. 2569, 08:30 น." },
      { status: "PAID", role: "งานคลัง / EDC", note: "ชำระเงินเรียบร้อย 20.00 บาท ออกใบเสร็จ", timestamp: "13 ก.ย. 2569, 08:40 น." },
      { status: "COMPLETED", role: "เจ้าหน้าที่ สส.วังทรายพูน", note: "พิมพ์เอกสารประทับ e-Seal และส่งมอบให้ผู้เสียภาษีเรียบร้อย", timestamp: "13 ก.ย. 2569, 08:55 น." }
    ]
  }
];

// District Fuel & Travel Cost Savings Dataset (คำนวณระยะทางจากแต่ละอำเภอมายัง สท.พิจิตร)
export interface DistrictTravelCost {
  id: string;
  districtName: string;
  branchName: string;
  isDemoCase?: boolean;
  distanceOneWayKm: number;          // ระยะทางขาเดียวจากอำเภอมายัง สท.พิจิตร (กม.)
  distanceRoundTripKm: number;       // ระยะทางไป-กลับ (กม.)
  travelTimeMinutesRoundTrip: number;// เวลาเดินทางไป-กลับประมาณการ (นาที)
  travelTimeDisplay: string;         // ข้อความแสดงเวลาเดินทาง เช่น "1 ชม. 48 นาที (108 นาที)"
  mainRoute: string;                 // เส้นทางหลัก เช่น "ทล. 113, ทล. 1067"
  costPerTrip: number;               // ค่าน้ำมันเชื้อเพลิงประมาณการต่อเที่ยวไป-กลับ (บาท)
  casesToday: number;                // จำนวนคำขอวันนี้ (ราย)
  avgSlaMinutes: number;             // เวลาเฉลี่ยต่อเคส (นาที)
  feeTotal: number;                  // ค่าธรรมเนียมรวม (บาท)
}

export const DISTRICT_TRAVEL_DATA: DistrictTravelCost[] = [
  {
    id: "pho_thale",
    districtName: "อำเภอโพทะเล",
    branchName: "สส.โพทะเล (เคสตัวอย่าง)",
    isDemoCase: true,
    distanceOneWayKm: 59.3,
    distanceRoundTripKm: 118.6,
    travelTimeMinutesRoundTrip: 108,
    travelTimeDisplay: "1 ชม. 48 นาที (108 นาที)",
    mainRoute: "ทล. 113, ทล. 1067",
    costPerTrip: 415, // 118.6 กม. x ~3.50 บ./กม.
    casesToday: 28,
    avgSlaMinutes: 4.2,
    feeTotal: 1120.00
  },
  {
    id: "thap_khlo",
    districtName: "อำเภอทับคล้อ",
    branchName: "สส.ทับคล้อ",
    distanceOneWayKm: 54.9,
    distanceRoundTripKm: 109.8,
    travelTimeMinutesRoundTrip: 106,
    travelTimeDisplay: "1 ชม. 46 นาที (106 นาที)",
    mainRoute: "ทล. 113",
    costPerTrip: 385, // 109.8 กม. x ~3.50 บ./กม.
    casesToday: 18,
    avgSlaMinutes: 4.1,
    feeTotal: 720.00
  },
  {
    id: "bang_mun_nak",
    districtName: "อำเภอบางมูลนาก",
    branchName: "สส.บางมูลนาก",
    distanceOneWayKm: 51.9,
    distanceRoundTripKm: 103.8,
    travelTimeMinutesRoundTrip: 94,
    travelTimeDisplay: "1 ชม. 34 นาที (94 นาที)",
    mainRoute: "ทล. 113, ทล. 1374",
    costPerTrip: 365, // 103.8 กม. x ~3.51 บ./กม.
    casesToday: 19,
    avgSlaMinutes: 4.0,
    feeTotal: 760.00
  },
  {
    id: "wang_sai_phun",
    districtName: "อำเภอวังทรายพูน",
    branchName: "สส.วังทรายพูน",
    distanceOneWayKm: 31.8,
    distanceRoundTripKm: 63.6,
    travelTimeMinutesRoundTrip: 60,
    travelTimeDisplay: "1 ชม. (60 นาที)",
    mainRoute: "ทล. 11",
    costPerTrip: 220, // 63.6 กม. x ~3.46 บ./กม.
    casesToday: 15,
    avgSlaMinutes: 4.1,
    feeTotal: 600.00
  },
  {
    id: "taphan_hin",
    districtName: "อำเภอตะพานหิน",
    branchName: "สส.ตะพานหิน",
    distanceOneWayKm: 29.3,
    distanceRoundTripKm: 58.6,
    travelTimeMinutesRoundTrip: 54,
    travelTimeDisplay: "54 นาที",
    mainRoute: "ทล. 113",
    costPerTrip: 205, // 58.6 กม. x ~3.50 บ./กม.
    casesToday: 24,
    avgSlaMinutes: 4.5,
    feeTotal: 960.00
  },
  {
    id: "sak_lek",
    districtName: "อำเภอสากเหล็ก",
    branchName: "สส.สากเหล็ก",
    distanceOneWayKm: 21.4,
    distanceRoundTripKm: 42.8,
    travelTimeMinutesRoundTrip: 42,
    travelTimeDisplay: "42 นาที",
    mainRoute: "ทล. 111, ทล. 11",
    costPerTrip: 150, // 42.8 กม. x ~3.50 บ./กม.
    casesToday: 14,
    avgSlaMinutes: 3.9,
    feeTotal: 560.00
  },
  {
    id: "pho_prathap_chang",
    districtName: "อำเภอโพธิ์ประทับช้าง",
    branchName: "สส.โพธิ์ประทับช้าง",
    distanceOneWayKm: 19.7,
    distanceRoundTripKm: 39.4,
    travelTimeMinutesRoundTrip: 46,
    travelTimeDisplay: "46 นาที",
    mainRoute: "ทล. 1068",
    costPerTrip: 140, // 39.4 กม. x ~3.55 บ./กม.
    casesToday: 17,
    avgSlaMinutes: 4.0,
    feeTotal: 680.00
  },
  {
    id: "sam_ngam",
    districtName: "อำเภอสามง่าม",
    branchName: "สส.สามง่าม",
    distanceOneWayKm: 18.3,
    distanceRoundTripKm: 36.6,
    travelTimeMinutesRoundTrip: 36,
    travelTimeDisplay: "36 นาที",
    mainRoute: "ทล. 111",
    costPerTrip: 130, // 36.6 กม. x ~3.55 บ./กม.
    casesToday: 16,
    avgSlaMinutes: 3.9,
    feeTotal: 640.00
  },
  {
    id: "mueang",
    districtName: "อำเภอเมืองพิจิตร",
    branchName: "สส.เมืองพิจิตร",
    distanceOneWayKm: 0,
    distanceRoundTripKm: 0,
    travelTimeMinutesRoundTrip: 0,
    travelTimeDisplay: "0 นาที",
    mainRoute: "ตั้งอยู่อาคารเดียวกับ สกพ.พิจิตร",
    costPerTrip: 0,
    casesToday: 42,
    avgSlaMinutes: 3.8,
    feeTotal: 1680.00
  }
];

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

  // Role-Based Task Board States
  const [branchViewTab, setBranchViewTab] = useState<"intake_form" | "branch_board">("intake_form");
  const [centralBranchFilter, setCentralBranchFilter] = useState<string>("ALL");
  const [expandedTimelineIds, setExpandedTimelineIds] = useState<Record<string, boolean>>({});

  const toggleTimeline = (id: string) => {
    setExpandedTimelineIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Dynamic Demo Case Request (matches live simulation state)
  const getDemoCaseRequest = (): ConsolidatedRequest => {
    let status: ConsolidatedRequest["status"] = "SUBMITTED";
    let statusLabel = "ยื่นคำร้องแล้ว รอส่งต่อ";
    let statusBadgeColor = "bg-slate-100 text-slate-700 border-slate-300";
    let currentStepDescription = "รอเจ้าหน้าที่ สส. ตรวจสอบและส่งคำร้องไปยังส่วนคัดแบบ";
    let totalDurationMinutes: number | undefined = undefined;
    let inProgressMinutes = 3;

    const tl: RequestTimelineEvent[] = [
      {
        status: "SUBMITTED",
        role: "เจ้าหน้าที่ สส.โพทะเล",
        note: "รับคำร้อง ณ เคาน์เตอร์ สส.โพทะเล (Dip-Chip บัตรประชาชน IAL 2.3)",
        timestamp: "13 ก.ย. 2569, 09:15 น."
      }
    ];

    if (requestSubmitted || currentStep !== "branch_intake") {
      tl.push({
        status: "FORWARDED",
        role: "เจ้าหน้าที่ สส.โพทะเล",
        note: "บันทึกคำร้องและส่งต่อไปยัง ส่วนคัดแบบ (สท.พิจิตร)",
        timestamp: "13 ก.ย. 2569, 09:18 น."
      });
      status = "SEARCHING";
      statusLabel = "ส่งต่อแล้ว กำลังค้นหาแบบฯ ในคลัง";
      statusBadgeColor = "bg-indigo-100 text-indigo-800 border-indigo-300";
      currentStepDescription = "รอผลจากงานบริการแบบฯ สท. (กำลังค้นหาต้นฉบับในคลัง)";
      inProgressMinutes = 5;
    }

    if (currentStep === "central_search" && fileUploaded) {
      tl.push({
        status: "SEARCHING",
        role: "งานบริการแบบฯ สท.พิจิตร",
        note: "พบต้นฉบับแบบ ภ.ง.ด.90 ปีภาษี 2568 ตรวจสอบแล้วจำนวน 2 หน้า",
        timestamp: "13 ก.ย. 2569, 09:20 น."
      });
      currentStepDescription = "งานบริการแบบฯ สท. พบแบบแล้ว อยู่ระหว่างส่งยอดคิดเงิน QR";
      inProgressMinutes = 7;
    }

    if (currentStep === "branch_payment" || currentStep === "treasury_finance" || currentStep === "branch_print" || currentStep === "executive_sla") {
      tl.push({
        status: "FEE_CALCULATED",
        role: "งานบริการแบบฯ / การเงิน",
        note: "อัปโหลด PDF เข้าระบบและออก Dynamic QR ค่าธรรมเนียม 40.00 บาท",
        timestamp: "13 ก.ย. 2569, 09:22 น."
      });
      status = "AWAITING_PAYMENT";
      statusLabel = "รอชำระเงินผ่าน QR (40 บ.)";
      statusBadgeColor = "bg-orange-100 text-orange-800 border-orange-300";
      currentStepDescription = "สร้าง QR สำเร็จแล้ว รอประชาชนสแกนจ่ายเงิน 40 บาท";
      inProgressMinutes = 9;
    }

    if (qrScanned || currentStep === "treasury_finance" || currentStep === "branch_print" || currentStep === "executive_sla") {
      tl.push({
        status: "PAID",
        role: "ระบบการเงิน / PromptPay",
        note: "ชำระเงินสำเร็จ 40.00 บาท ออกใบเสร็จรับเงินอิเล็กทรอนิกส์แล้ว",
        timestamp: "13 ก.ย. 2569, 09:24 น."
      });
      status = "PAID";
      statusLabel = "ชำระเงินแล้ว ออกใบเสร็จ";
      statusBadgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
      currentStepDescription = "ชำระเงินแล้ว งานคลังออกใบเสร็จรับเงินสำเร็จแล้ว";
      inProgressMinutes = 11;
    }

    if (currentStep === "branch_print" || currentStep === "executive_sla") {
      tl.push({
        status: "READY_FOR_PICKUP",
        role: "เจ้าหน้าที่ สส.โพทะเล",
        note: "ระบบส่งภาพแบบฯ พร้อม e-Seal ให้สาขา พิมพ์เอกสารฉบับทางการแล้ว",
        timestamp: "13 ก.ย. 2569, 09:27 น."
      });
      status = printedCopies >= totalCopies ? "COMPLETED" : "READY_FOR_PICKUP";
      statusLabel = printedCopies >= totalCopies ? "ส่งมอบสำเร็จแล้ว" : "พร้อมพิมพ์/ส่งมอบ (e-Seal)";
      statusBadgeColor = printedCopies >= totalCopies ? "bg-green-100 text-green-800 border-green-300" : "bg-teal-100 text-teal-800 border-teal-300";
      if (printedCopies >= totalCopies) {
        currentStepDescription = "พิมพ์แบบรับรอง e-Seal ครบ 2 ชุดแล้ว ส่งมอบเอกสารสำเร็จ";
        totalDurationMinutes = 12;
      } else {
        currentStepDescription = `ได้รับภาพแบบฯ แล้ว อยู่ระหว่างพิมพ์และรับรองสำเนา (${printedCopies}/${totalCopies} ชุด)`;
        inProgressMinutes = 12;
      }
    }

    if (currentStep === "executive_sla") {
      currentStepDescription = "ส่งมอบสำเนาแบบฯ พร้อมรับรอง e-Seal ให้ผู้เสียภาษีสำเร็จเรียบร้อย";
      totalDurationMinutes = 12;
    }

    return {
      id: "REQ-2569-0449",
      trackingNo: "RCT-6909-088",
      fullName: "นายสมชาย มุ่งมั่นพัฒนา",
      citizenId: "1-6699-00123-45-6",
      taxForm: "ภ.ง.ด.90",
      taxYears: ["2568"],
      submittedBranch: "สส.โพทะเล",
      status,
      statusLabel,
      statusBadgeColor,
      currentStepDescription,
      totalDurationMinutes,
      inProgressMinutes,
      pages: 2,
      fee: 40,
      createdAt: "13 ก.ย. 2569, 09:15 น.",
      updatedAt: "13 ก.ย. 2569, 09:27 น.",
      isCurrentDemoCase: true,
      timeline: tl
    };
  };

  const currentDemoReq = getDemoCaseRequest();
  const allConsolidatedRequests = [currentDemoReq, ...OTHER_PROVINCE_REQUESTS];
  const phoThaleRequests = allConsolidatedRequests.filter(r => r.submittedBranch === "สส.โพทะเล");
  const filteredCentralRequests = centralBranchFilter === "ALL" 
    ? allConsolidatedRequests 
    : allConsolidatedRequests.filter(r => r.submittedBranch === centralBranchFilter);

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
    if (qrScanned) return;
    setQrScanned(true);
    showToast("✓ ประชาชนสแกน QR ชำระเงิน 40.00 บาท สำเร็จ -> กำลังส่งสัญญาณแจ้งฝ่ายการเงิน...");
    setTimeout(() => {
      setCurrentStep("treasury_finance"); // Jump to Step 4 after delay!
    }, 2000);
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
    setBranchViewTab("intake_form");
    setCentralBranchFilter("ALL");
    setExpandedTimelineIds({});
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
              <p className="text-xs text-blue-200 mt-0.5">ระบบบริการคัดแบบแสดงรายการภาษี plus+ • สท.พิจิตร กรมสรรพากร</p>
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

            {/* 1. HERO HEADER BANNER (PowerPoint Cover Slide Background) */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl border border-slate-200/90 bg-white">
              {/* PowerPoint Cover Image Filling the Header */}
              <img 
                src="/powerpoint_cover.png" 
                alt="ยกระดับบริการคัดแบบแสดงรายการภาษีอากรผ่านระบบ RCT by Operating System" 
                className="w-full h-auto object-cover block select-none"
              />

              {/* Interactive Call-To-Action Button positioned right below the title */}
              <div className="absolute top-[54%] sm:top-[55%] md:top-[56%] left-[46%] sm:left-[46.5%] z-20">
                <button
                  onClick={() => setCurrentStep("branch_intake")}
                  className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm md:text-base rounded-xl sm:rounded-2xl shadow-xl hover:shadow-amber-500/40 flex items-center gap-2 sm:gap-3 transition transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer border border-amber-300/80"
                >
                  <span>เข้าสู่ระบบ Demo</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 h-5 text-slate-950" />
                </button>
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

            {/* Sub-Tabs for Branch Staff View: Intake Form vs Pho Thale Request Board */}
            <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBranchViewTab("intake_form")}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer border ${
                    branchViewTab === "intake_form"
                      ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <FileSignature className="w-4 h-4" />
                  <span>📝 รับคำร้องใหม่ & อ่านบัตร Smart Card (3 ขั้นตอน)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBranchViewTab("branch_board")}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer border ${
                    branchViewTab === "branch_board"
                      ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>📋 กระดานติดตามสถานะงาน — สส.โพทะเล</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                    branchViewTab === "branch_board" ? "bg-amber-400 text-slate-950" : "bg-blue-100 text-blue-800"
                  }`}>
                    {phoThaleRequests.length} รายการ
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200">
                <Lock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>สิทธิ์การเข้าถึง: <strong>สส.โพทะเล (เห็นเฉพาะคำขอในพื้นที่รับผิดชอบ)</strong></span>
              </div>
            </div>

            {/* Citizen Cost & Travel Time Savings Banner at Pho Thale Branch */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white rounded-2xl p-4.5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center flex-shrink-0 text-amber-300 font-black shadow-inner">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">
                      🌱 คุณค่าบริการ ณ สส.โพทะเล (เพื่อประชาชนในพื้นที่)
                    </span>
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      สะสมวันนี้ 28 ราย
                    </span>
                  </div>
                  <p className="text-xs text-blue-50 mt-1 leading-relaxed">
                    เราช่วยผู้เสียภาษีชาวโพทะเล <strong>ประหยัดค่าใช้จ่ายไปแล้ว 11,620 บาท</strong> (ค่าน้ำมัน 415 บ./คน) และ <strong>ประหยัดเวลาเดินทางไปแล้ว 3,024 นาที (~50.4 ชั่วโมง)</strong> โดยไม่ต้องขับรถไปถึงตัวจังหวัด (สท.พิจิตร ไป-กลับ 118.6 กม. เส้นทาง ทล. 113, ทล. 1067)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-stretch md:self-auto justify-end flex-shrink-0">
                <div className="bg-white/10 border border-white/25 rounded-xl px-3.5 py-2 text-center">
                  <span className="text-[10px] text-blue-100 block font-medium">ประหยัดค่าเดินทางรวม</span>
                  <span className="font-mono font-black text-white text-base">11,620 บ.</span>
                </div>
                <div className="bg-white/10 border border-white/25 rounded-xl px-3.5 py-2 text-center">
                  <span className="text-[10px] text-blue-100 block font-medium">ประหยัดเวลาเดินทาง</span>
                  <span className="font-mono font-black text-amber-300 text-base">3,024 นาที</span>
                  <span className="text-[9px] text-blue-200 block font-mono">(~50.4 ชม.)</span>
                </div>
              </div>
            </div>

            {branchViewTab === "intake_form" ? (
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

                  {/* Single-case Direct Citizen Savings Box */}
                  <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs">
                    <span className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-[11px]">
                      <Fuel className="w-3.5 h-3.5 text-emerald-700" />
                      ความประหยัดของเคสนี้ (Citizen Direct Benefit)
                    </span>
                    <div className="flex items-center justify-between text-slate-700 pt-0.5">
                      <span className="text-slate-500">ประหยัดค่าน้ำมัน:</span>
                      <span className="font-bold text-emerald-800 font-mono">415.00 บาท</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500">ประหยัดเวลาเดินทาง:</span>
                      <span className="font-bold text-indigo-800 font-mono">108 นาที (~1.8 ชม.)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 pt-1 border-t border-emerald-200/60 leading-tight">
                      * เทียบกับประชาชนต้องขับรถไปคัดแบบที่ สท.พิจิตร (ไป-กลับ 118.6 กม. เส้นทาง ทล. 113, ทล. 1067)
                    </p>
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
            ) : (
              /* Pho Thale Branch Board View */
              <div className="space-y-5">
                {/* Governance Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4.5 text-xs text-blue-950 flex items-start gap-3.5 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 leading-relaxed">
                    <span className="font-extrabold text-sm block text-blue-900">
                      🔒 มาตรการรักษาความลับข้อมูลภาษีและสิทธิ์การเข้าถึง (ม.10 ป.รัษฎากร & PDPA)
                    </span>
                    <p className="text-blue-800">
                      หน้าจอนี้แสดง<strong>เฉพาะรายการคำขอที่ยื่น ณ สส.โพทะเล</strong> เท่านั้น เพื่อป้องกันการรั่วไหลของข้อมูลส่วนบุคคลและข้อมูลภาษีอากร เจ้าหน้าที่สาขาจะไม่สามารถมองเห็นหรือเข้าถึงคำขอของอำเภออื่น (ระบบรวมศูนย์ทุกอำเภอจะอยู่ที่หน้าจอ <strong>ส่วนคัดแบบ สท.พิจิตร</strong>)
                    </p>
                  </div>
                </div>

                {/* Queue Cards for Pho Thale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phoThaleRequests.map((req) => (
                    <div
                      key={req.id}
                      className={`rounded-2xl border p-5 shadow-sm space-y-4 transition ${
                        req.isCurrentDemoCase
                          ? "bg-white border-blue-500 ring-2 ring-blue-500/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 text-base font-mono">{req.id}</span>
                            {req.isCurrentDemoCase && (
                              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                                เคสสาธิตสด
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">Tracking: {req.trackingNo}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${req.statusBadgeColor}`}>
                          {req.statusLabel}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-500">ผู้ยื่นคำขอ:</span>
                          <span className="font-bold text-slate-900">{req.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">เลขประจำตัวประชาชน:</span>
                          <span className="font-mono text-slate-700">{req.citizenId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">แบบและปีภาษี:</span>
                          <span className="font-semibold text-blue-700">{req.taxForm} (ปี {req.taxYears.join(", ")})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">จุดรับเรื่อง:</span>
                          <span className="font-semibold text-slate-800">{req.submittedBranch}</span>
                        </div>
                        {req.fee && (
                          <div className="flex justify-between pt-1 border-t border-slate-100 font-medium">
                            <span className="text-slate-500">ค่าธรรมเนียม:</span>
                            <span className="font-bold text-emerald-700 font-mono">{req.fee.toFixed(2)} บาท ({req.pages} หน้า)</span>
                          </div>
                        )}

                        {/* Direct Citizen Savings Benefit for this Case */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-emerald-900 bg-emerald-50/70 p-2 rounded-lg border border-emerald-200/60">
                          <span className="font-semibold flex items-center gap-1">
                            <Fuel className="w-3.5 h-3.5 text-emerald-700" />
                            ความประหยัดเคสนี้:
                          </span>
                          <span className="font-bold font-mono">
                            ค่าน้ำมัน 415 บ. • ประหยัดเวลา 108 นาที
                          </span>
                        </div>
                      </div>

                      {/* Current Status Tracker & Duration Badge */}
                      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 text-xs space-y-1.5">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            ขั้นตอนปัจจุบัน
                          </span>
                          {req.status === "COMPLETED" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                              ⏱️ เวลาให้บริการทั้งหมด: {req.totalDurationMinutes || 12} นาที
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-md">
                              ⏱️ ดำเนินการแล้ว: ~{req.inProgressMinutes || 5} นาที
                            </span>
                          )}
                        </div>
                        <p className="text-slate-800 font-bold leading-relaxed text-[12px]">
                          {req.currentStepDescription}
                        </p>
                      </div>

                      {/* Card Action & Timeline Toggle */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                        {req.isCurrentDemoCase ? (
                          <button
                            type="button"
                            onClick={() => setBranchViewTab("intake_form")}
                            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>กลับไปเคาน์เตอร์ สส. ➔</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">
                            ✓ ดำเนินการเสร็จสมบูรณ์
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleTimeline(req.id)}
                          className="ml-auto text-slate-600 hover:text-blue-700 text-xs font-bold cursor-pointer flex items-center gap-1 transition px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
                        >
                          <span>{expandedTimelineIds[req.id] ? "ซ่อนประวัติ" : "ดูประวัติ"}</span>
                          {expandedTimelineIds[req.id] ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Inline Collapsible Timeline (Image 2 Style) */}
                      {expandedTimelineIds[req.id] && (
                        <div className="pt-3 border-t border-slate-200 animate-fadeIn">
                          <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                            ประวัติการดำเนินการ (Audit Trail Log)
                          </p>
                          <ol className="space-y-3.5 pl-1">
                            {req.timeline.map((ev, idx) => {
                              const isLast = idx === req.timeline.length - 1;
                              return (
                                <li key={idx} className="relative flex gap-3 text-xs">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                                        isLast 
                                          ? "bg-blue-600 ring-4 ring-blue-100" 
                                          : "bg-slate-300"
                                      }`}
                                    />
                                    {!isLast && (
                                      <div className="w-0.5 flex-1 bg-slate-200 mt-1 min-h-[28px]" />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-1">
                                    <div className="flex items-baseline justify-between gap-2">
                                      <span className={`font-bold ${isLast ? "text-slate-900 font-extrabold" : "text-slate-800"}`}>
                                        {ev.role}
                                      </span>
                                    </div>
                                    <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">
                                      {ev.note}
                                    </p>
                                    <span className="text-slate-400 text-[10px] font-mono mt-0.5 block">
                                      {ev.timestamp}
                                    </span>
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* ========================================================================= */}
            {/* CONSOLIDATED CENTRAL RECORDS BOARD: All Phichit Districts Overview */}
            {/* ========================================================================= */}
            <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold shadow-sm">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                        <span>🌐 กระดานรวมคำร้องทั่วทั้งจังหวัด (สท.พิจิตร)</span>
                        <span className="bg-purple-100 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
                          ศูนย์รวม ๙ อำเภอ/สาขา
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ส่วนคัดแบบ สท.พิจิตร เป็นศูนย์กลางคลังเอกสาร ทำหน้าที่ค้นหาแบบและประสานงานคลังสำหรับทุกสาขาในจังหวัด
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-900 px-3 py-1.5 rounded-xl border border-purple-200 font-medium">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>รวมคำร้องในระบบ: <strong>{allConsolidatedRequests.length} รายการ</strong></span>
                </div>
              </div>

              {/* Branch Filter Pills */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Filter className="w-3.5 h-3.5 text-purple-700" />
                  <span>ตัวกรองสาขาที่ยื่นคำขอ (เลือกดูเฉพาะอำเภอ หรือภาพรวมทั้งจังหวัด):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PHICHIT_BRANCHES.map((b) => {
                    const count = b.id === "ALL" 
                      ? allConsolidatedRequests.length 
                      : allConsolidatedRequests.filter(r => r.submittedBranch === b.id).length;
                    const isActive = centralBranchFilter === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setCentralBranchFilter(b.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                          isActive
                            ? "bg-purple-700 text-white border-purple-700 shadow-sm ring-2 ring-purple-500/20"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>{b.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                          isActive ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-700"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Request Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                {filteredCentralRequests.map((req) => (
                  <div
                    key={req.id}
                    className={`rounded-2xl border p-4.5 shadow-sm space-y-3 transition relative flex flex-col justify-between ${
                      req.isCurrentDemoCase
                        ? "bg-purple-50/60 border-purple-500 ring-2 ring-purple-500/30"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-slate-900 text-sm font-mono">{req.id}</span>
                            {req.isCurrentDemoCase && (
                              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                                สาธิตสด
                              </span>
                            )}
                          </div>
                          <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {req.submittedBranch}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border text-center ${req.statusBadgeColor}`}>
                          {req.statusLabel}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 space-y-1 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">ผู้เสียภาษี:</span>
                          <span className="font-bold text-slate-900">{req.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">แบบภาษี:</span>
                          <span className="font-semibold text-purple-700">{req.taxForm} ({req.taxYears.join(", ")})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">เวลาที่ยื่น:</span>
                          <span className="font-mono text-slate-500 text-[11px]">{req.createdAt}</span>
                        </div>
                        {req.fee && (
                          <div className="flex justify-between pt-1 border-t border-slate-100 font-semibold text-emerald-800">
                            <span>ค่าธรรมเนียม:</span>
                            <span className="font-mono">{req.fee.toFixed(2)} บ.</span>
                          </div>
                        )}
                      </div>

                      {/* Current Status Tracker & Duration Badge */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 text-xs space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-purple-600" />
                            ขั้นตอนปัจจุบัน
                          </span>
                          {req.status === "COMPLETED" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                              ⏱️ รวม {req.totalDurationMinutes || 12} นาที
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-md">
                              ⏱️ ดำเนินการ ~{req.inProgressMinutes || 5} นาที
                            </span>
                          )}
                        </div>
                        <p className="text-slate-800 font-bold leading-relaxed text-[11.5px]">
                          {req.currentStepDescription}
                        </p>
                      </div>
                    </div>

                    {/* Card Action & Timeline Toggle */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2 mt-2">
                      {req.isCurrentDemoCase ? (
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById("central-upload-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>ค้นหา/อัปโหลด ➔</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {req.status === "COMPLETED" ? "✓ สำเร็จ" : "คิวงานในพื้นที่"}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleTimeline(req.id)}
                        className="ml-auto text-slate-600 hover:text-purple-800 text-xs font-bold cursor-pointer flex items-center gap-1 transition px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
                      >
                        <span>{expandedTimelineIds[req.id] ? "ซ่อนประวัติ" : "ดูประวัติ"}</span>
                        {expandedTimelineIds[req.id] ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Inline Collapsible Timeline (Image 2 Style) */}
                    {expandedTimelineIds[req.id] && (
                      <div className="pt-3 border-t border-slate-200 animate-fadeIn mt-2">
                        <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2.5">
                          ประวัติการดำเนินการ (Audit Trail)
                        </p>
                        <ol className="space-y-3 pl-1">
                          {req.timeline.map((ev, idx) => {
                            const isLast = idx === req.timeline.length - 1;
                            return (
                              <li key={idx} className="relative flex gap-2.5 text-xs">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                                      isLast 
                                        ? "bg-purple-600 ring-4 ring-purple-100" 
                                        : "bg-slate-300"
                                    }`}
                                  />
                                  {!isLast && (
                                    <div className="w-0.5 flex-1 bg-slate-200 mt-1 min-h-[26px]" />
                                  )}
                                </div>
                                <div className="flex-1 pb-0.5">
                                  <div className="flex items-baseline justify-between gap-1">
                                    <span className={`font-bold ${isLast ? "text-slate-900 font-extrabold" : "text-slate-800"}`}>
                                      {ev.role}
                                    </span>
                                  </div>
                                  <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">
                                    {ev.note}
                                  </p>
                                  <span className="text-slate-400 text-[10px] font-mono mt-0.5 block">
                                    {ev.timestamp}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Processing & Upload Section for the Active Demo Case */}
            <div id="central-upload-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
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
                disabled={qrScanned}
                onClick={handleCitizenScanQR}
                className={`px-5 py-3 font-bold text-sm rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition cursor-pointer whitespace-nowrap ${
                  qrScanned 
                    ? "bg-emerald-600 text-white cursor-wait" 
                    : "bg-blue-700 hover:bg-blue-800 text-white animate-pulse"
                }`}
              >
                {qrScanned ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                    <span>✓ ชำระเงินสำเร็จแล้ว...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    <span>จำลองประชาชนสแกนชำระเงิน ➔</span>
                  </>
                )}
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
                  {qrScanned ? (
                    <span className="bg-emerald-100 text-emerald-900 border border-emerald-400 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>ชำระเงินสำเร็จแล้ว (รอฝ่ายการเงิน)</span>
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
                      รอชำระเงินค่าธรรมเนียม
                    </span>
                  )}
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
                    disabled={qrScanned}
                    onClick={handleCitizenScanQR}
                    className={`w-full py-4 font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer text-base ${
                      qrScanned
                        ? "bg-emerald-700 text-white cursor-wait"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    }`}
                  >
                    {qrScanned ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                        <span>✓ ชำระเงินสำเร็จแล้ว! กำลังส่งสัญญาณแจ้งฝ่ายการเงิน...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-5 h-5 text-emerald-200" />
                        <span>จำลอง: ประชาชนเปิดแอปธนาคารสแกน QR จ่าย 40 บาท สำเร็จ ➔</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-2.5">
                    * เมื่อกดปุ่มนี้ ระบบจะจำลองว่าประชาชนโอนเงินสำเร็จ แสดงผลบนหน้าจอชั่วครู่ แล้วกระโดดไปหน้าจอการเงินโดยอัตโนมัติ
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

                  <div className={`p-3 bg-white border-2 rounded-2xl shadow-sm relative transition-all duration-300 overflow-hidden ${
                    qrScanned ? "border-emerald-500 ring-4 ring-emerald-400/20 shadow-emerald-500/20" : "border-blue-600"
                  }`}>
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=PROMPTPAY-TAX-REF-RCT6909088-AMOUNT-40.00" 
                      alt="Citizen Payment QR"
                      className="w-48 h-48 mx-auto rounded-lg"
                    />
                    {qrScanned && (
                      <div className="absolute inset-0 bg-emerald-600/95 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white font-bold p-4 animate-fadeIn shadow-inner">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2.5 animate-bounce">
                          <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                        <span className="text-xl font-black text-amber-200">ชำระเงินสำเร็จแล้ว</span>
                        <span className="text-xs text-white/95 mt-1 font-semibold">ยอดเงิน 40.00 บาท (๒ ฉบับ)</span>
                        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/90 text-[11px] font-bold text-emerald-100 border border-emerald-400/40">
                          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
                          <span>กำลังส่งสัญญาณไปยังฝ่ายการเงิน...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 mt-3 font-semibold">
                    {qrScanned ? (
                      <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                        <span>ระบบได้รับยอดเงินเรียบร้อยแล้ว</span>
                      </span>
                    ) : (
                      <span>สแกนจ่ายได้ทุกธนาคาร (KTB, SCB, KBANK, BBL ฯลฯ)</span>
                    )}
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

              {/* 3rd KPI Card: ประหยัดเวลาเดินทางประชาชน (คำนวณตามระยะทางจริง) */}
              <div className="bg-white border-2 border-indigo-300 hover:border-indigo-400 rounded-2xl p-5.5 shadow-sm space-y-2 relative overflow-hidden transition">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span className="text-indigo-900 font-extrabold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    ประหยัดเวลาเดินทางประชาชน
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                    ~181 ชม./วัน
                  </span>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <div className="text-3xl sm:text-4xl font-black text-indigo-950 font-mono">
                    10.9K
                  </div>
                  <span className="text-sm font-bold text-slate-500">นาที/วัน</span>
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300">
                    ~4.5 หมื่น ชม./ปี
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 leading-snug pt-1 border-t border-slate-100 space-y-0.5">
                  <div className="font-bold text-indigo-900 flex items-center gap-1">
                    <span>สูตร:</span>
                    <span className="font-normal text-slate-700">∑ (เวลาเดินทางไป-กลับ สท. × เคสแต่ละอำเภอ)</span>
                  </div>
                  <p className="text-slate-500">
                    เช่น โพทะเล 108 นาที × 28 เคส = <strong>ประหยัด 3,024 นาที (~50.4 ชม.)</strong>
                  </p>
                </div>
              </div>

              {/* 4th KPI Card: ประหยัดค่าน้ำมันและค่าเดินทางประชาชนตามระยะทางจริง */}
              <div className="bg-white border-2 border-purple-300 hover:border-purple-400 rounded-2xl p-5.5 shadow-sm space-y-2 relative overflow-hidden transition">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span className="text-purple-900 font-extrabold flex items-center gap-1.5">
                    <Fuel className="w-4 h-4 text-purple-600" />
                    ประหยัดค่าน้ำมัน & ค่าเดินทาง
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                    193 คำขอวันนี้
                  </span>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <div className="text-3xl sm:text-4xl font-black text-purple-950 font-mono">
                    40.3K
                  </div>
                  <span className="text-sm font-bold text-slate-500">บ./วัน</span>
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300">
                    ~10.07 ล้าน บ./ปี
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 leading-snug pt-1 border-t border-slate-100 space-y-0.5">
                  <div className="font-bold text-purple-900 flex items-center gap-1">
                    <span>สูตร:</span>
                    <span className="font-normal text-slate-700">∑ (ระยะทางไป-กลับ × ค่าน้ำมันเฉลี่ย × เคสแต่ละอำเภอ)</span>
                  </div>
                  <p className="text-slate-500">
                    เช่น โพทะเล 118.6 กม. (415 บ.) × 28 เคส = <strong>11,620 บ./วัน</strong>
                  </p>
                </div>
              </div>

            </div>

            {/* Performance Comparison & Table with District Travel Savings */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Branch Statistics & Fuel & Time Savings Table */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      สถิติการให้บริการ & ความประหยัดค่าน้ำมันและเวลาเดินทางแยกตามสาขา (๙ อำเภอ/สาขา จ.พิจิตร)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      เปรียบเทียบกรณีประชาชนไม่ต้องขับรถมาคัดแบบที่ สท.พิจิตร (อ.เมือง) แต่มารับบริการที่ สส. สาขาใกล้บ้านตามเส้นทางจริง
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-indigo-800 font-bold bg-indigo-100 px-2.5 py-1 rounded-lg font-mono">
                      ประหยัด 10,860 นาที/วัน (~181 ชม.)
                    </span>
                    <span className="text-xs text-purple-800 font-bold bg-purple-100 px-2.5 py-1 rounded-lg font-mono">
                      ประหยัด 40,265 บ./วัน
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs">
                        <th className="py-3 px-3 font-bold">หน่วยบริการ (สส.) & เส้นทางหลัก</th>
                        <th className="py-3 px-2 font-bold text-center">ระยะทางไป-กลับ</th>
                        <th className="py-3 px-2 font-bold text-center">เวลาเดินทาง</th>
                        <th className="py-3 px-2 font-bold text-center">ค่าน้ำมัน</th>
                        <th className="py-3 px-2 font-bold text-center">คำขอวันนี้</th>
                        <th className="py-3 px-2.5 font-bold text-right text-indigo-900 bg-indigo-50/50">ประหยัดเวลาวันนี้</th>
                        <th className="py-3 px-2.5 font-bold text-right text-purple-900 bg-purple-50/50">ประหยัดค่าน้ำมันวันนี้</th>
                        <th className="py-3 px-2 font-bold text-right">ค่าธรรมเนียม</th>
                        <th className="py-3 px-1.5 font-bold text-center">SLA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {DISTRICT_TRAVEL_DATA.map((d) => {
                        const savingsToday = d.casesToday * d.costPerTrip;
                        const timeSavedMinutesToday = d.casesToday * d.travelTimeMinutesRoundTrip;
                        const timeSavedHoursToday = (timeSavedMinutesToday / 60).toFixed(1);
                        return (
                          <tr 
                            key={d.id} 
                            className={`hover:bg-blue-50/40 transition ${
                              d.isDemoCase ? "bg-blue-50/50 font-semibold" : ""
                            }`}
                          >
                            <td className="py-2.5 px-3">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                  <span className={`font-bold ${d.isDemoCase ? "text-blue-900 font-extrabold" : "text-slate-900"}`}>
                                    {d.branchName}
                                  </span>
                                  {d.isDemoCase && (
                                    <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                                      Demo
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                                  🛣️ {d.mainRoute}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-slate-600">
                              {d.distanceRoundTripKm > 0 ? `${d.distanceRoundTripKm} กม.` : "0 กม."}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-slate-600 text-[11px]">
                              {d.travelTimeDisplay}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-slate-600">
                              {d.costPerTrip > 0 ? `${d.costPerTrip} บ.` : "0 บ."}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900">
                              {d.casesToday} ราย
                            </td>
                            <td className="py-2.5 px-2.5 text-right font-mono font-bold text-indigo-900 bg-indigo-50/30">
                              {timeSavedMinutesToday > 0 ? (
                                <>
                                  {timeSavedMinutesToday.toLocaleString()} น. <span className="text-[10px] text-slate-500 font-normal">({timeSavedHoursToday} ชม.)</span>
                                </>
                              ) : (
                                <span className="text-slate-400">0 นาที</span>
                              )}
                            </td>
                            <td className="py-2.5 px-2.5 text-right font-mono font-black text-purple-900 bg-purple-50/30 text-[13px]">
                              {savingsToday > 0 ? `${savingsToday.toLocaleString()} บ.` : "0 บ."}
                            </td>
                            <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                              {d.feeTotal.toLocaleString()}.00 บ.
                            </td>
                            <td className="py-2.5 px-1.5 text-center">
                              <span className="bg-emerald-100 text-emerald-900 text-[10px] px-2 py-0.5 rounded font-bold">
                                ผ่าน
                              </span>
                            </td>
                          </tr>
                        );
                      })}

                      {/* TOTAL SUMMARY ROW */}
                      <tr className="bg-indigo-100/70 border-t-2 border-indigo-300 font-extrabold text-slate-900">
                        <td className="py-3.5 px-3">
                          <span className="text-indigo-950 font-black flex items-center gap-1">
                            <Fuel className="w-3.5 h-3.5 text-indigo-700 inline" />
                            รวม ๙ อำเภอ/สาขา (ทั้งจังหวัด)
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center font-mono text-[11px] text-indigo-950">
                          11,484.4 กม./วัน
                        </td>
                        <td className="py-3.5 px-2 text-center font-mono text-[11px] text-indigo-950">
                          รวม 181 ชม./วัน
                        </td>
                        <td className="py-3.5 px-2 text-center font-mono text-[11px] text-indigo-900">
                          เฉลี่ย 209 บ./คน
                        </td>
                        <td className="py-3.5 px-2 text-center font-mono font-black text-indigo-950 text-sm">
                          193 ราย
                        </td>
                        <td className="py-3.5 px-2.5 text-right font-mono font-black text-indigo-950 text-xs bg-indigo-200/60">
                          10,860 นาที <span className="block text-[10px] font-normal text-indigo-800">(~181.0 ชม.)</span>
                        </td>
                        <td className="py-3.5 px-2.5 text-right font-mono font-black text-purple-950 text-sm bg-purple-200/60">
                          40,265.00 บ.
                        </td>
                        <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900">
                          7,720.00 บ.
                        </td>
                        <td className="py-3.5 px-1.5 text-center">
                          <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                            100% ผ่าน
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                  <span>* คำนวณจากระยะทางจริง (ไป-กลับ) และเวลาเดินทางตามเส้นทางหลัก (ทล.) ของแขวงทางหลวงพิจิตร</span>
                  <span className="font-bold text-indigo-900">ประหยัดเวลาสะสม: ~45,250 ชั่วโมง/ปี • ประหยัดค่าน้ำมัน: ~10,066,250 บาท/ปี</span>
                </div>
              </div>

              {/* Evolution & Fuel & Time Savings Impact Model Card */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  โมเดลความคุ้มค่าค่าน้ำมัน & เวลา (Impact Model)
                </h3>

                {/* Impact Highlight Box */}
                <div className="p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-xl space-y-2.5">
                  <span className="font-black text-indigo-950 block text-xs">
                    ผลประโยชน์ทางตรงต่อประชาชน (Citizen Direct Savings):
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-indigo-100 shadow-2xs">
                      <span className="text-slate-500 text-[10px] block">ประหยัดเวลาเดินทาง:</span>
                      <span className="font-mono font-black text-indigo-950 text-sm">10,860 นาที</span>
                      <span className="text-[10px] text-emerald-700 block font-bold">~4.5 หมื่น ชม./ปี</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
                      <span className="text-slate-500 text-[10px] block">ประหยัดค่าน้ำมัน:</span>
                      <span className="font-mono font-black text-purple-950 text-sm">40,265 บ.</span>
                      <span className="text-[10px] text-emerald-700 block font-bold">~10.07 ล้าน บ./ปี</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    ประชาชนในพื้นที่ห่างไกล เช่น โพทะเล (ไป-กลับ 118.6 กม. ประหยัด 108 นาที / 415 บ.), ทับคล้อ (109.8 กม. ประหยัด 106 นาที / 385 บ.) หรือบางมูลนาก (103.8 กม. ประหยัด 94 นาที / 365 บ.) ไม่ต้องเดินทางมา อ.เมือง ช่วยลดความเหนื่อยล้า อุบัติเหตุ และค่าใช้จ่าย
                  </p>
                </div>

                <div className="space-y-2.5 text-xs pt-1">
                  <span className="font-extrabold text-slate-800 block text-xs">
                    บทสรุปความก้าวหน้าโครงการ ๓ ระยะ:
                  </span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-800 block">ระยะที่ ๑ (ระบบเดิม):</span>
                    <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">LINE OA + KTB Corporate + เสี่ยงทำซ้ำและเดินทางไกล</p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <span className="font-bold text-blue-950 block">ระยะที่ ๒ (ปัจจุบัน - WebApp Demo):</span>
                    <p className="text-blue-800 text-[11px] mt-0.5 leading-relaxed">Smart Counter + ประหยัดค่าน้ำมัน 10.07 ล้าน/ปี + ประหยัดเวลา 4.5 หมื่น ชม./ปี</p>
                  </div>

                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                    <span className="font-bold text-purple-950 block">ระยะที่ ๓ (เป้าหมายอนาคต):</span>
                    <p className="text-purple-800 text-[11px] mt-0.5 leading-relaxed">คัดแบบผ่าน ThaID จากที่บ้าน ไม่ต้องเดินทาง 0 กิโลเมตร 0 นาที 100%</p>
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
          <span className="font-medium">ระบบบริการคัดแบบแสดงรายการภาษี plus+ (RCT WebApp Platform) • สำนักงานสรรพากรพื้นที่พิจิตร</span>
          <span className="font-mono text-slate-400">Next.js 16 • Tailwind CSS • Vercel Ready</span>
        </div>
      </footer>

    </div>
  );
}
