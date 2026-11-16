// Thông tin doanh nghiệp — nguồn duy nhất cho header, footer, liên hệ, SEO & JSON-LD.
// Nguồn: hồ sơ sale (docs/demo.docx) + poster trên Fanpage (public/images 108, 112, 162).
// Mục đánh dấu TODO cần khách xác nhận trước khi chạy thật.
export const siteConfig = {
  name: "Helove Wellness Spa",
  shortName: "Helove",
  slogan: "Good health in loving hands",
  tagline: "Massage & chăm sóc sức khỏe tại Thới An, TP.HCM",
  description:
    "Helove Wellness Spa — massage body thư giãn, trị liệu cổ vai gáy, mặt ngọc diện chẩn, massage trị liệu chuyên sâu và combo chăm sóc toàn thân 90 phút tại phường Thới An, TP.HCM. Đặt lịch ngay hôm nay.",
  keywords: [
    "spa Thới An",
    "massage quận 12",
    "massage body Thới An",
    "trị liệu cổ vai gáy",
    "mặt ngọc diện chẩn",
    "massage trị liệu chuyên sâu",
    "Helove Wellness Spa",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "vi_VN",
  themeColor: "#24150d",
  experienceYears: 7, // theo Fanpage: ~7 năm kinh nghiệm

  address: {
    street: "244/20/4 Lê Văn Khương",
    ward: "Phường Thới An",
    city: "TP. Hồ Chí Minh",
    country: "VN",
    full: "244/20/4 Lê Văn Khương, Phường Thới An, TP. Hồ Chí Minh",
    short: "244/20/4 Lê Văn Khương, Thới An",
  },

  phone: "0976 473 483",
  phoneRaw: "+84976473483",
  email: "", // TODO: hồ sơ ghi có email nhưng chưa ghi địa chỉ cụ thể

  zalo: "https://zalo.me/0976473483",
  messenger: "https://m.me/Helovewellnessspa",

  maps: {
    link: "https://www.google.com/maps/place/Helove+Wellness+Spa/@10.8704386,106.6503576,17z",
    embed: "https://www.google.com/maps?q=10.8704386,106.6503576&z=17&hl=vi&output=embed",
    geo: { lat: 10.8704386, lng: 106.6503576 },
  },

  // TODO: lấy theo giờ làm việc trên poster tuyển dụng — khách xác nhận giờ mở cửa thực tế
  hours: [{ days: "Thứ 2 – Chủ nhật", open: "09:00", close: "19:30" }],
  hoursShort: "Mở cửa mỗi ngày · 09:00 – 19:30",
  hoursSchema: ["Mo-Su 09:00-19:30"],

  socials: [
    { label: "Facebook", href: "https://www.facebook.com/Helovewellnessspa", icon: "facebook" },
    { label: "Zalo", href: "https://zalo.me/0976473483", icon: "zalo" },
    { label: "Messenger", href: "https://m.me/Helovewellnessspa", icon: "messenger" },
  ],
};
