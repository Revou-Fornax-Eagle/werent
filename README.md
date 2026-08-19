# werent

Project 1: werent web application

Frontend **Product Detail Page (PDP)** untuk WeRent, aplikasi rental pakaian (clothing
rental e-commerce). Dibangun dengan **React 19 + Vite + TypeScript**, termasuk fitur
**real-time review count** via Socket.io.

> Frontend ini bergantung pada backend `werent-backend1` (NestJS + Prisma).
> Lihat README backend untuk menjalankan API-nya.

## Tech Stack

| Layer      | Teknologi               |
| ---------- | ----------------------- |
| Framework  | React 19                |
| Build tool | Vite 8                  |
| Language   | TypeScript              |
| Real-time  | socket.io-client ^4.8   |
| Styling    | CSS (per-komponen, BEM) |
| Lint       | oxlint                  |

## Prasyarat

- Node.js 20+ (LTS)
- Backend `werent-backend1` berjalan di `http://localhost:8000`

## Setup

```bash
npm install
```

Buat file `.env` (contoh di `.env.example`):

```
# Backend API base URL (werent-backend1, default PORT=8000)
VITE_API_URL="http://localhost:8000"
```

## Menjalankan

```bash
npm run dev      # dev server → http://localhost:3001
npm run build    # typecheck + build produksi (tsc -b && vite build)
npm run lint     # oxlint
npm run preview  # preview hasil build
```

## Struktur Project

```
src/
├── App.tsx                  # Orkestrasi: fetch product + reviews, state submit, socket
├── components/              # Komponen PDP (ProductPage, ReviewCard, RatingBreakdown, dll.)
├── hooks/
│   └── useRealtimeReviewCount.ts   # Listener real-time count review (Socket.io)
├── types/productData.ts     # Tipe API (Product, ProductData, ApiReview, dll.)
├── utils/
│   ├── api.ts               # API_URL & SOCKET_URL
│   └── mapReviews.ts        # Mapping review backend → shape UI
└── main.tsx                 # Entry React
```

## Fitur

- **PDP lengkap**: hero, info produk, designer, detail & size guide, rating breakdown, review list.
- **Real-time review count**: socket connect ke backend, `joinProductRoom`, mendengar
  event `review_count_updated`, lalu update angka review tanpa refresh.
- **Tulis review**: modal form → `POST /api/reviews` → review baru tampil di atas list,
  count bertambah otomatis lewat socket.

## Integrasi API

| Aksi           | Endpoint                                            |
| -------------- | --------------------------------------------------- |
| Detail produk  | `GET /api/products/:productId`                      |
| List review    | `GET /api/reviews/product/:productId`               |
| Kirim review   | `POST /api/reviews`                                 |
| Socket connect | `http://localhost:8000` (namespace `/`)             |
| Join room      | `joinProductRoom` `{ productId }`                   |
| Event count    | `review_count_updated` `{ productId, reviewCount }` |

## Catatan

- `PRODUCT_ID` dan `USER_ID` saat ini **hardcoded** di `App.tsx` (auth backend masih
  sementara — `userId` dikirim via body).
- Pastikan `USER_ID` belum pernah me-review produk tersebut, jika tidak backend
  merespons `409 CONFLICT`.
- Review list ditampilkan `per_page` default (10) dari backend.
