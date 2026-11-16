// Menu header. Link "/#id" cuộn tới section trên trang chủ (hoạt động cả khi đang ở trang khác).
// dropdown: true → bảng chọn dịch vụ khi rê chuột (dữ liệu từ src/data/services.js).
export const mainNav = [
  { label: "Giới thiệu", href: "/#gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu", dropdown: true },
  { label: "Bảng giá", href: "/#bang-gia" },
  { label: "Ưu đãi", href: "/#uu-dai" },
  { label: "Thư viện", href: "/thu-vien" },
];
