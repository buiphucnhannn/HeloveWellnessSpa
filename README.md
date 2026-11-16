# Helove Wellness Spa

Website giới thiệu & đặt lịch cho Helove Wellness Spa (Thới An, TP.HCM) — phong cách **Wellness Luxury**:
nâu chocolate · vàng đồng · kem, đồng bộ logo.

**Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · Tailwind CSS v4 · JavaScript thuần · Lenis (cuộn mượt)

## Bắt đầu

```bash
npm install
cp .env.example .env.local   # điền NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

| Script           | Mô tả                      |
| ---------------- | -------------------------- |
| `npm run dev`    | Chạy môi trường phát triển |
| `npm run build`  | Build production           |
| `npm run start`  | Chạy bản build             |
| `npm run lint`   | ESLint                     |
| `npm run format` | Prettier (+ sắp xếp class) |

## Trang & chức năng (theo hồ sơ `docs/demo.docx`)

| Trang             | Nội dung                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `/`               | Hero · Giới thiệu · Dịch vụ · Bảng giá & combo · Ưu đãi · Thư viện · Cảm nhận (bản đồ ở footer) |
| `/dich-vu`        | Danh sách 6 nhóm liệu trình + cam kết                                                       |
| `/dich-vu/[slug]` | Chi tiết liệu trình: giới thiệu, bảng giá, quy trình, ảnh, hỏi đáp, dịch vụ khác            |
| `/thu-vien`       | Thư viện ảnh có bộ lọc + lightbox                                                           |
| Toàn site         | Popup đặt lịch (mọi nút `data-booking`), nút nổi Gọi · Zalo · Messenger · Đặt lịch          |

## Cấu trúc

```
public/
├── brand/              # logo-gold.png (logo đứng), logo-mark.png (vòm HL) — PNG nền trong suốt
└── images/             # ảnh gốc từ Fanpage (khách cung cấp)
src/
├── app/                # routes, layout, globals.css (design tokens), sitemap, robots, icon, OG image
├── components/
│   ├── fx/             # hiệu ứng: Preloader, SmoothScroll, PageTransition, Reveal, SplitText, Parallax
│   ├── ui/             # Button, Container, Pic, Logo, SectionHeading, PageBanner, Lightbox, CtaStrip…
│   ├── layout/         # Header (+ ServicesDropdown), Footer, FloatingActions
│   ├── sections/       # các section trang chủ
│   ├── services/       # ServiceRow + detail/* (template trang chi tiết)
│   ├── gallery/        # GalleryBrowser
│   └── booking/        # BookingForm, BookingModal
├── config/             # site.js (thông tin doanh nghiệp), navigation.js
├── data/               # services, pricing, offers, gallery, testimonials, about, images (map ảnh)
├── hooks/              # useReveal
└── lib/                # utils (cn, lockScroll, vnd…)
```

## Quy ước

- **Ảnh**: luôn lấy qua `img("148")` trong `src/data/images.js` (đã có kích thước thật) và render bằng `<Pic>`
  (next/image, AVIF/WebP, quality 90). Truyền `sizes` sát kích thước hiển thị để trình duyệt tải bản nét nhất.
- **Hiệu ứng khi cuộn**: thêm class `reveal` (+ `data-reveal="left|right|scale|wipe|arch|circle"`, `--reveal-delay`).
  Tiêu đề hiện từng chữ: `<SplitText>`. Nội dung banner đầu trang: class `intro` + `--d`.
- **Đặt lịch**: gắn `data-booking="<slug-dịch-vụ>"` vào bất kỳ nút nào để mở popup có chọn sẵn dịch vụ.
- **Màu/Font**: token trong `@theme` ở `src/app/globals.css` (`cocoa`, `gold`, `accent`, `cream`, `ink`…).

## Cần khách xác nhận (TODO)

- Giờ mở cửa (đang lấy 09:00–19:30 theo poster tuyển dụng), email liên hệ.
- Ưu đãi còn hiệu lực + thời hạn (`src/data/offers.js`); giá các gói bổ trợ (giác hơi, ấn huyệt…).
- **Cảm nhận khách hàng đang là nội dung mẫu** (`src/data/testimonials.js`) — thay bằng đánh giá thật.
- Form đặt lịch chưa có backend: soạn tin nhắn → sao chép → khách gửi qua Zalo/SMS. Khi có API, sửa `handleSubmit` trong `BookingForm.jsx`.
- Ảnh `098` (camera an ninh) và `187`–`220` (ảnh của cơ sở khác — "FootMassage 68") **không dùng**, có thể xoá khỏi `public/images`.
