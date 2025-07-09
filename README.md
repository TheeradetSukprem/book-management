# Book Manager – Installation Guide

ระบบนี้เป็นระบบจัดการหนังสือ (CRUD) แสดงข้อมูลในรูปแบบตาราง พร้อมสามารถเพิ่ม แก้ไข ลบ ค้นหา และดูรายละเอียดได้

## Tech Stack

**Language**: `TypeScript`

### Frontend 
- **Framework**:  `Next.js (TypeScript)`
- **UI Library**: `MUI (Material UI)`, `@toolpad/core`
- **HTTP Client**: `axios`
- **Popup**: `sweetalert2`

### Backend
- **Runtime**: `Node.js`
- **Web Framework**: `Express.js`
- **Language**: `TypeScript`
- **Architecture**: `MVC (Model-View-Controller)`

### Database
- **Engine**: `PostgreSQL`
- **Provider**: `Railway`
- **ORM**: `Prisma`

## ERD (Entity Relationship Diagram)
```prisma
model Book {
  id          Int      @id @default(autoincrement())
  title       String
  author      String
  category    String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime
}
```

## Clone Project
```bash
git clone https://github.com/yourusername/book-manager.git
cd book-manager
```

## Environment Variables
สร้างไฟล์ `.env` และใส่ค่าดังนี้:
```env
DATABASE_URL="postgresql://postgres:your-password@your-host:your-port/your-db"
```

## Installation
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Features / ฟีเจอร์
- แสดงรายการหนังสือในรูปแบบตาราง
- เพิ่มหนังสือใหม่ (มี validation ชื่อหนังสือและผู้เขียน)
- แก้ไขหนังสือพร้อม modal
- ลบหนังสือ (ยืนยันก่อนลบ)
- ค้นหาหนังสือแบบ realtime (จากชื่อหรือผู้เขียน)

## RESTful API Design
| Method | Endpoint     | Description                     |
|--------|--------------|---------------------------------|
| GET    | `/books`     | ดึงรายการหนังสือทั้งหมด       |
| GET    | `/book/:id`  | ดึงข้อมูลหนังสือรายตัว         |
| POST   | `/book`      | เพิ่มหนังสือใหม่               |
| PUT    | `/book/:id`  | แก้ไขข้อมูลหนังสือ             |
| DELETE | `/book/:id`  | ลบหนังสือ (soft/hard delete)   |

## Search
สามารถค้นหาหนังสือโดยใช้ `title` หรือ `author` ด้วย **regular expression (RegEx)** แบบ case-insensitive บนฝั่ง backend

## State Management
ใช้ `useState` และ `useEffect` จาก React Hooks สำหรับจัดการ state ภายใน component
