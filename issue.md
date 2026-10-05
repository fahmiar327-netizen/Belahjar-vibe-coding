# Issue: Inisialisasi Project Backend (Bun, ElysiaJS, Drizzle ORM, MySQL)

## 📌 Deskripsi & Tujuan
Membuat inisialisasi project backend baru di direktori ini menggunakan runtime **Bun**, framework **ElysiaJS**, ORM **Drizzle**, dan database **MySQL**. 

Dokumen ini berfungsi sebagai panduan implementasi *high-level* untuk developer atau model AI pelaksana agar dapat mengeksekusi setup dasar hingga project siap digunakan untuk pengembangan fitur lanjutan.

---

## 🛠️ Tech Stack & Dependencies
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Framework Web**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database Driver**: `mysql2` (atau driver MySQL kompatibel dengan Bun & Drizzle)
- **Database Migration Tool**: `drizzle-kit`
- **Environment**: TypeScript & `.env`

---

## 📂 Rekomendasi Struktur Direktori
Implementator diharapkan membuat struktur folder modular dan rapi:

```text
├── src/
│   ├── db/
│   │   ├── index.ts        # Koneksi database & client Drizzle
│   │   └── schema.ts       # Definisi schema tabel Drizzle
│   ├── routes/             # Handler routing Elysia
│   │   └── index.ts
│   └── index.ts            # Entrypoint utama server Elysia
├── drizzle/                # Output file migrasi (hasil drizzle-kit)
├── .env.example            # Template variabel environment
├── .gitignore
├── drizzle.config.ts       # Konfigurasi Drizzle Kit
├── package.json
└── tsconfig.json
```

---

## 📋 Tahapan Implementasi (Implementation Plan)

### 1. Inisialisasi Project & Dependencies
- Inisialisasi project Bun di root direktori saat ini (`bun init` atau setup `package.json` yang sesuai).
- Tambahkan dependency utama:
  - `elysia`
  - `drizzle-orm`
  - `mysql2`
- Tambahkan devDependencies:
  - `drizzle-kit`
  - `@types/bun`
  - TypeScript types yang relevan (misal `@types/mysql2` jika diperlukan).

### 2. Setup Environment Variables
- Buat file `.env.example` yang memuat variabel konfigurasi koneksi MySQL:
  - `PORT` (default misal `3000`)
  - `DATABASE_HOST`
  - `DATABASE_PORT` (default `3306`)
  - `DATABASE_USER`
  - `DATABASE_PASSWORD`
  - `DATABASE_NAME`
  - `DATABASE_URL` (format connection string jika diperlukan)
- Pastikan `.env` terdaftar di `.gitignore`.

### 3. Konfigurasi Drizzle & Koneksi Database
- Buat file `drizzle.config.ts` untuk mengatur:
  - Lokasi schema (`./src/db/schema.ts`)
  - Direktori output migrasi (`./drizzle`)
  - Dialect: `mysql`
  - Konfigurasi kredensial koneksi DB (membaca dari env).
- Buat koneksi database di `src/db/index.ts` menggunakan client Drizzle dengan driver MySQL.
- Definisikan minimal 1 tabel contoh di `src/db/schema.ts` (misalnya tabel `users` atau `health_checks`) untuk memvalidasi konfigurasi migrasi.
- Tambahkan npm scripts pada `package.json` untuk mempermudah migrasi:
  - `db:generate` -> `drizzle-kit generate`
  - `db:migrate` -> `drizzle-kit migrate` (atau script eksekusi migrasi yang sesuai)
  - `db:studio` -> `drizzle-kit studio` (opsional)

### 4. Setup Server ElysiaJS
- Konfigurasikan entrypoint di `src/index.ts`.
- Inisialisasi instance Elysia dan dengarkan port dari environment variable (default: `3000`).
- Sediakan minimal endpoint:
  - `GET /` atau `GET /health` untuk health-check server.
  - Endpoint sample (misal `GET /api/sample` atau resource CRUD sederhana) yang membaca/menulis ke database menggunakan Drizzle ORM untuk membuktikan integrasi end-to-end.
- Tambahkan script dev di `package.json` (`"dev": "bun --watch src/index.ts"`).

---

## 🎯 Kriteria Penerimaan (Acceptance Criteria)
1. Project dapat dijalankan dengan perintah `bun run dev` tanpa error.
2. Server merespons pada port yang ditentukan (default `http://localhost:3000`).
3. Endpoint health-check mengembalikan status 200 OK.
4. Konfigurasi Drizzle dan schema MySQL dapat di-*generate* menjadi file migrasi menggunakan `drizzle-kit`.
5. Kode terstruktur bersih, mudah dibaca, dan siap dikembangkan lebih lanjut.
