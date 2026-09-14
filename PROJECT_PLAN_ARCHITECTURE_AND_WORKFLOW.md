# แผนงานสถาปัตยกรรมระบบจริงและแนวทางการพัฒนา (RCT WebApp Production Architecture & Workflow Plan)

> **โครงการ:** ระบบบริหารจัดการและให้บริการคัดแบบแสดงรายการภาษีอากรและใบเสร็จรับเงิน (RCT WebApp)  
> **เอกสารเวอร์ชัน:** 1.0 (ฉบับบันทึกแผนงาน)  
> **วันที่จัดทำ:** 14 กันยายน 2569  
> **สถานะ:** แผนงานตั้งต้น (Planning & Architecture Specification)

---

## 1. บทสรุปการตัดสินใจด้านเทคโนโลยี (Core Tech Stack Decision)

จากการวิเคราะห์ระบบงานราชการ การเงิน และข้อมูลภาษีอากรที่มีความอ่อนไหวสูง ได้ข้อสรุปชุดเทคโนโลยีหลักดังนี้:

| ส่วนของระบบ | เทคโนโลยีที่เลือก | เหตุผลความเหมาะสม |
| :--- | :--- | :--- |
| **Frontend Web Application** | **Next.js (React 19 / TypeScript / Tailwind CSS / Shadcn UI)** | • ต่อยอดจากตัว Demo ได้ 100% (Component, Flow, Types)<br>• มี Server-Side Rendering (SSR) และความปลอดภัยสูง<br>• รองรับระบบสลับ 4 บทบาท (Role-Based Access Control) |
| **Backend / API Layer** | **Next.js Server Actions & Route Handlers** (BFF Architecture) | • ทำหน้าที่เป็น API Gateway ในตัว ป้องกันการเปิดเผย Logic สู่ภายนอก<br>• เชื่อมต่อฐานข้อมูลโดยตรงผ่านเครือข่ายภายในของ Docker |
| **ฐานข้อมูลหลัก (Primary Database)** | **PostgreSQL 16 (On-Premise)** | • **ไม่ใช่ Cloud** ติดตั้งบนเครื่อง Server ของสำนักงาน 100%<br>• เป็น Open-Source ระดับ Enterprise ฟรี ไม่มีค่า License<br>• รองรับมาตรฐานความถูกต้องด้านการเงิน (ACID Transactions 100%)<br>• มี **JSONB** สำหรับเก็บข้อมูลเฉพาะของแบบภาษีแต่ละประเภท<br>• จัดการข้อมูลผ่าน pgAdmin 4 หรือ DBeaver |
| **Database ORM & Migration** | **Prisma ORM (TypeScript)** | • Type-safe ป้องกัน SQL Injection 100%<br>• มีระบบ **Migration** อัปเดตโครงสร้างฐานข้อมูลอัตโนมัติ โดยข้อมูลเก่าไม่สูญหาย |
| **ระบบจัดเก็บไฟล์เอกสาร (Object Storage)** | **MinIO (On-Premise S3-Compatible)** | • เก็บไฟล์ PDF แบบภาษี, ใบเสร็จ และภาพถ่ายสลิปอย่างปลอดภัย<br>• แยกออกจากตารางฐานข้อมูล ป้องกันฐานข้อมูลบวมโต<br>• มีระบบ Presigned URL ป้องกันการดาวน์โหลดไฟล์โดยไม่ได้รับอนุญาต |
| **สถาปัตยกรรมการรันระบบ** | **Docker & Docker Compose** | • บรรจุทุกอย่างเป็น Container รันได้ในคำสั่งเดียว<br>• แยกเครือข่ายภายใน (Network Isolation) ปลอดภัยสูงสุด<br>• เครื่อง Dev ที่บ้าน และเครื่อง Server ที่สำนักงาน ทำงานเหมือนกัน 100% |

---

## 2. โครงสร้างสถาปัตยกรรมระบบภายในสำนักงาน (On-Premise Architecture)

```
                       [ เครือข่าย WAN/VPN กรมสรรพากร ]
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            │                                                   │
  [ เครื่องเคาน์เตอร์สาขา A ]                            [ เครื่องเคาน์เตอร์สาขา B ]
 (Smart Card Reader + WebApp)                         (Smart Card Reader + WebApp)
            │                                                   │
            └─────────────────────────┬─────────────────────────┘
                                      │ (เข้าใช้งานผ่าน Port 80 / 443)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ เครื่องเซิร์ฟเวอร์สำนักงาน (On-Premise Host Server)                         │
│                                                                             │
│  ┌─ Docker Internal Bridge Network (ไม่เปิดพอร์ต DB สู่ภายนอก) ──────────┐  │
│  │                                                                       │  │
│  │  1. [ rct-app Container ]                                             │  │
│  │     Next.js WebApp (Frontend + API Gateway)                          │  │
│  │     ├─ Authentication & Role Middleware                               │  │
│  │     ├─ PDF Processing & e-Seal Engine                                 │  │
│  │     └─ Prisma ORM Client                                              │  │
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
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. ยุทธศาสตร์การทำงานร่วมกันระหว่าง "ที่บ้าน" กับ "ที่สำนักงาน"

### 3.1 นโยบายความปลอดภัยข้อมูล (PDPA & Security Guideline)
* **เครื่องที่บ้าน (Development):** 
  * ใช้เฉพาะ **ข้อมูลจำลอง (Mock / Seed Data)** เท่านั้น เช่น ชื่อ-นามสกุลสมมติ เลขประจำตัวผู้เสียภาษีทดสอบ
  * **ห้ามนำข้อมูลจริงของผู้เสียภาษีออกจากสำนักงานเด็ดขาด**
* **เครื่องเซิร์ฟเวอร์สำนักงาน (Production):**
  * จัดเก็บ **ข้อมูลจริงของระบบราชการ** ข้อมูลทั้งหมดจะถูกล็อกไว้ในฮาร์ดดิสก์ของเครื่องเซิร์ฟเวอร์สำนักงาน

---

### 3.2 วงจรการซิงก์งาน (Code & Schema Synchronization Flow)

```
        [ เครื่องที่บ้าน (Home Dev) ]                        [ เซิร์ฟเวอร์สำนักงาน (Office Prod) ]
               │                                                          │
   1. พัฒนาฟีเจอร์ / UI / Schema                                          │
   2. ทดสอบกับ Docker (Mock Data)                                         │
   3. npx prisma migrate dev                                              │
               │                                                          │
               ▼                                                          │
      [ git commit & git push ] ──────────────────────────────────────────┘
               │                                                          │
               ▼                                                          ▼
   [ Git Repository (Private) ] ── (เมื่อไปถึงสำนักงาน) ──► 4. git pull
                                                            5. docker compose up -d --build
                                                            6. prisma migrate deploy
                                                               (อัปเดตตารางจริงอัตโนมัติ
                                                                โดยข้อมูลเดิมไม่สูญหาย)
```

---

### 3.3 การจัดการฐานข้อมูลด้วย Prisma Migration

เมื่อมีการแก้ไขหรือเพิ่มฟิลด์ในฐานข้อมูล:
1. **ที่บ้าน:** 
   * แก้ไขไฟล์ `prisma/schema.prisma`
   * รันคำสั่ง:
     ```bash
     npx prisma migrate dev --name <ชื่อการเปลี่ยนแปลง>
     ```
   * ระบบจะสร้างไฟล์ SQL Migration ประจำเวอร์ชันขึ้นมา และอัปเดต Database ใน Docker ที่บ้านทันที
   * ส่งโค้ดขึ้น Git ด้วย `git push`
2. **ที่สำนักงาน:**
   * สั่งดึงโค้ดล่าสุด `git pull`
   * รันคำสั่งอัปเดตฐานข้อมูล Production:
     ```bash
     docker compose exec rct-app npx prisma migrate deploy
     ```
   * **ผลลัพธ์:** ตารางใน PostgreSQL ที่สำนักงานจะถูกอัปเดตตามโครงสร้างใหม่ทันที ข้อมูลเดิมของสำนักงานจะปลอดภัยและไม่สูญหาย

---

### 3.4 ระบบจำลองข้อมูลสำหรับเครื่องที่บ้าน (Database Seeding)
ในโปรเจกต์จะมีไฟล์สคริปต์ `prisma/seed.ts` สำหรับสร้างข้อมูลทดสอบ:
* สั่งรันคำสั่งเดียวบนเครื่องที่บ้าน:
  ```bash
  npm run db:seed
  ```
* ระบบจะเติมข้อมูลตัวอย่าง 10–20 รายการ (ผู้เสียภาษีจำลอง, คำร้องทดสอบในสถานะต่างๆ, ใบเสร็จตัวอย่าง) ทำให้สามารถเขียนโค้ดและทดสอบหน้าจอที่บ้านได้ทันทีโดยไม่ต้องคีย์ข้อมูลเอง

---

## 4. โครงสร้างไฟล์แม่แบบ `docker-compose.yml` (สำหรับใช้งานจริง)

```yaml
version: '3.8'

services:
  # 1. ระบบเว็บแอปพลิเคชัน (Next.js App)
  rct-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: rct_app
    restart: always
    ports:
      - "80:3000"
    environment:
      - DATABASE_URL=postgresql://rct_user:SecurePassword2026@rct-db:5432/rct_db?schema=public
      - MINIO_ENDPOINT=rct-storage
      - MINIO_PORT=9000
      - MINIO_ACCESS_KEY=rct_minio_admin
      - MINIO_SECRET_KEY=MinioAdminSecret2026
      - NODE_ENV=production
    depends_on:
      - rct-db
      - rct-storage
    networks:
      - rct-network

  # 2. ฐานข้อมูล PostgreSQL 16 (On-Premise)
  rct-db:
    image: postgres:16-alpine
    container_name: rct_db
    restart: always
    environment:
      POSTGRES_DB: rct_db
      POSTGRES_USER: rct_user
      POSTGRES_PASSWORD: SecurePassword2026
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    networks:
      - rct-network

  # 3. ที่จัดเก็บไฟล์เอกสารราชการ MinIO
  rct-storage:
    image: minio/minio:latest
    container_name: rct_storage
    restart: always
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: rct_minio_admin
      MINIO_ROOT_PASSWORD: MinioAdminSecret2026
    volumes:
      - ./data/minio:/data
    networks:
      - rct-network

  # 4. ระบบสำรองข้อมูลฐานข้อมูลอัตโนมัติรายวัน
  rct-backup:
    image: prodrigestivill/postgres-backup-local:latest
    container_name: rct_backup
    restart: always
    environment:
      POSTGRES_HOST: rct-db
      POSTGRES_DB: rct_db
      POSTGRES_USER: rct_user
      POSTGRES_PASSWORD: SecurePassword2026
      SCHEDULE: "@daily"
      BACKUP_KEEP_DAYS: 30
    volumes:
      - ./data/backups:/backups
    networks:
      - rct-network

networks:
  rct-network:
    driver: bridge
```

---

## 5. แผนผังโครงสร้างตารางฐานข้อมูลหลัก (Database Schema Blueprint)

ตารางหลักใน `schema.prisma` จะประกอบด้วย 6 กลุ่มสำคัญ:

1. **`Users` & `Roles`**: บัญชีเจ้าหน้าที่, สิทธิ์การใช้งาน (Front Counter, Back-Office, Treasury, Executive, Admin)
2. **`Taxpayers`**: ข้อมูลผู้เสียภาษี (เลข 13 หลัก, ชื่อ-นามสกุล, ที่อยู่, เบอร์ติดต่อ)
3. **`Requests`**: ทะเบียนคำร้องขอคัดแบบ (เลขที่คำขอ, สาขาที่ยื่น, สถานะ 4 ฝ่าย, ผู้รับผิดชอบ)
4. **`TaxForms`**: รายการแบบภาษีที่ขอ (ประเภท ภ.ง.ด., ปีภาษี, ลิงก์ไฟล์ต้นฉบับใน MinIO, ผลการค้นหา)
5. **`Payments` & `Receipts`**: ข้อมูลค่าธรรมเนียม, QR Code, สถานะการชำระเงิน, เลขที่ใบเสร็จรับเงินราชการ
6. **`AuditLogs` & `PrintLogs`**: บันทึกประวัติการเข้าถึงข้อมูล, ผู้เปิดดู, วันเวลา, โควตาการพิมพ์ (ป้องกันการคัดสำเนาซ้ำโดยไม่ชำระค่าธรรมเนียม)

---

## 6. ยุทธศาสตร์การเชื่อมโยงระบบชำระเงินกับธนาคาร (Payment & Banking Integration Strategy)

เพื่อตอบข้อซักถามของคณะกรรมการด้านความมั่นคงปลอดภัยและการปฏิบัติตามระเบียบการเงินการคลังภาครัฐ ระบบได้วางแนวทางการเชื่อมโยงไว้ 2 ระยะ:

### 6.1 ระยะที่ 1: การเชื่อมโยงแบบ Hybrid (ใช้งานได้ทันที 100% และถูกต้องตามระเบียบราชการ)
* **หลักการ:** ระบบ **ไม่สร้างช่องทางรับเงินนอกระบบหรือแตะต้องเงินสดโดยตรง** แต่ทำงานร่วมกับระบบรับชำระเดิมของสำนักงาน:
  1. ระบบคำนวณค่าธรรมเนียมอัตโนมัติตามจำนวนฉบับ (๒๐ บาท/ฉบับ) และสร้างรหัสอ้างอิง (Reference No.) ประจำคำขอ
  2. ประชาชนชำระผ่านช่องทางทางการของกรมสรรพากร เช่น **QR PromptPay ของสำนักงาน / เครื่อง EDC ธนาคารกรุงไทย (KTB)**
  3. เมื่อชำระเงินเรียบร้อย งานการเงินออกใบเสร็จราชการและบันทึก **เลขที่ใบเสร็จรับเงิน (e-Receipt No.)** เข้าระบบ
  4. ระบบทำการ **ปลดล็อคโควตาการพิมพ์เอกสาร (Print Quota Lock)** ตรงตามยอดเงินที่ชำระจริง ป้องกันการพิมพ์ซ้ำซ้อน
* **อุปกรณ์ตรวจสอบสลิปหน้าเคาน์เตอร์ (Counter Slip Verification):** 
  * ใช้เครื่องอ่าน **2D Barcode/QR Scanner แบบตั้งโต๊ะหน้ากระจก (Hands-free 2D Area-Imaging เช่น Honeywell Solaris 7980GEL หรือเทียบเท่า)**
  * ประชาชนเพียงยื่นหน้าจอมือถือที่มี e-Slip จ่อหน้ากระจก เครื่องจะอ่าน Mini-QR ส่งรหัสธุรกรรมเข้าสู่ระบบผ่านพอร์ต USB โดยตรงภายใน 0.1 วินาที
  * **จุดเด่นด้านความปลอดภัย:** เซิร์ฟเวอร์ในสำนักงานคงสถานะเป็น **Closed Intranet (ระบบปิด 100%)** ไม่ต้องเชื่อมต่อหรือเปิดพอร์ตสู่เครือข่ายอินเทอร์เน็ตภายนอก และไม่ต้องพึ่งพาระบบ Third-party (LINE) ใดๆ
* **ข้อดีต่อการตรวจรับ:** เงินเข้าบัญชีรายได้ของหน่วยงานโดยตรง 100% ไม่ต้องขออนุมัติเปิด API พิเศษกับธนาคาร เริ่มใช้งานได้ทันที

### 6.2 ระยะที่ 2: การเชื่อมโยงตรงผ่าน Bank API / Webhook (แผนต่อยอดสู่อนาคต)
* **หลักการ:** ออกแบบ Schema ตาราง `Payments` รองรับมาตรฐานธนาคารแห่งประเทศไทย:
  * มีฟิลด์ `transaction_id`, `biller_id`, `ref1`, `ref2`, `bank_code`
  * เมื่อได้รับอนุญาตเชื่อมต่อ API จากกรมสรรพากรส่วนกลาง/ธนาคารกรุงไทย (KTB Corporate Gateway) ระบบสามารถเปิดรับ Webhook แจ้งเตือนเงินเข้าแบบ Real-time และปลดล็อคการพิมพ์อัตโนมัติได้ทันทีโดยไม่ต้องรื้อระบบใหม่

---

## 7. ลำดับขั้นตอนการพัฒนาเมื่อพร้อมเริ่มลงมือ (Implementation Roadmap)

* [ ] **ระยะที่ 1: เตรียมโปรเจกต์และสภาพแวดล้อม (Environment Setup)**
  * สร้างโปรเจกต์ `rct-webapp-prod` พร้อม Dockerfile และ docker-compose.yml
  * ติดตั้ง Prisma ORM เชื่อมต่อ PostgreSQL และเซ็ตอัป MinIO Client
* [ ] **ระยะที่ 2: โครงสร้างฐานข้อมูลและระบบจำลองข้อมูล (Database & Mock Data)**
  * เขียน `schema.prisma` และรัน Migration ชุดแรก
  * สร้างสคริปต์ `seed.ts` สำหรับเติมข้อมูลทดสอบบนเครื่องที่บ้าน
* [ ] **ระยะที่ 3: ระบบจัดการสิทธิ์และการเข้าสู่ระบบ (Auth & RBAC)**
  * สร้าง Session / JWT Auth รองรับ 4 บทบาทเจ้าหน้าที่
* [ ] **ระยะที่ 4: พอร์ตหน้าจอและ Business Logic จาก Demo มาเชื่อมต่อ API จริง**
  * หน้าเคาน์เตอร์สาขา (สร้างคำร้อง, ดึงข้อมูลบัตรประชาชน)
  * หน้างานประมวลผล (ค้นหาแบบ, อัปโหลดแบบภาษี, ตรวจรับรอง)
  * หน้าการเงิน (คำนวณค่าธรรมเนียม, ตรวจเงิน, ออกใบเสร็จ)
  * หน้าผู้บริหาร (แดชบอร์ด SLA และรายงาน)
* [ ] **ระยะที่ 5: ระบบจัดการไฟล์และประทับตรารับรองเอกสาร (PDF Engine)**
  * ฝังลายน้ำสถาบันการเงิน (Watermark)
  * ประทับตรารับรองอิเล็กทรอนิกส์ (Digital e-Seal Animation & Stamp)
  * ระบบตรวจสอบ QR Hash และตัวล็อกโควตาการพิมพ์ (Print Quota Lock)
* [ ] **ระยะที่ 6: ทดสอบและติดตั้งจริง ณ สำนักงาน (Deployment & Handover)**
  * ทดสอบกู้คืนข้อมูล (Backup & Restore Test)
  * ติดตั้งลงบนเครื่องเซิร์ฟเวอร์สำนักงาน และแนะนำการดูแลรักษาแก่เจ้าหน้าที่ IT

---
*เอกสารนี้จัดทำขึ้นเพื่อใช้เป็นแนวทางมาตรฐานในการพัฒนาระบบจริง และสามารถปรับปรุงแก้ไขได้ตามระเบียบและข้อกำหนดเพิ่มเติมของหน่วยงาน*
