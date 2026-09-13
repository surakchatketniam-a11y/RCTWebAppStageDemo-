export type RequestStatus = 
  | 'pending_search'     // รอค้นหาแบบฯ (สท.)
  | 'pending_payment'    // พบแบบฯ แล้ว รอลูกค้าสแกน QR
  | 'payment_verified'   // จ่ายเงินแล้ว กำลังรอประทับตรารับรอง
  | 'processing_stamp'   // กำลังประทับตรารับรอง
  | 'ready_to_print'     // รับรองเสร็จแล้ว พร้อมให้สาขาพิมพ์
  | 'completed';         // พิมพ์มอบประชาชนเรียบร้อย

export interface TaxRequest {
  id: string;
  trackingNo: string;
  branchName: string;
  requesterName: string;
  citizenId: string;
  phone: string;
  address: string;
  taxType: string;
  taxYear: string;
  purpose: string;
  copiesCount: number;
  feePerCopy: number;
  totalFee: number;
  status: RequestStatus;
  createdAt: string;
  digitalSealApplied: boolean;
  sealOfficerName?: string;
  sealTimestamp?: string;
  printedCopies: number;
  paymentQrGenerated: boolean;
  paidAt?: string;
}
