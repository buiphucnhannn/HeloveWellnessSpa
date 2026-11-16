// Bảng giá — theo poster bảng giá chính thức (ảnh 112) và combo 90 phút (ảnh 069).
// image: id ảnh trong src/data/images.js (ảnh tròn nhỏ trên thẻ giá)
export const priceList = [
  {
    name: "Massage cổ vai gáy",
    duration: "60 phút",
    price: 299000,
    slug: "tri-lieu-co-vai-gay",
    image: "060",
  },
  {
    name: "Mặt ngọc diện chẩn",
    duration: "60 phút",
    price: 299000,
    slug: "mat-ngoc-dien-chan",
    image: "009",
  },
  {
    name: "Massage toàn thân",
    duration: "90 phút",
    price: 398000,
    slug: "massage-body-thu-gian",
    image: "044",
  },
  {
    name: "Massage trị liệu chuyên sâu",
    duration: "120 phút",
    price: 498000,
    slug: "massage-tri-lieu-chuyen-sau",
    image: "046",
  },
];

// Gói bổ trợ — chưa có giá niêm yết (TODO: khách cung cấp)
export const extraPackage = {
  name: "Gói chăm sóc sức khỏe",
  note: "Giác hơi · bấm huyệt bàn chân · gội đầu dưỡng sinh · chườm thảo dược",
  slug: "goi-cham-soc-suc-khoe",
};

export const signatureCombo = {
  name: "Combo chăm sóc toàn thân",
  duration: "90 phút",
  price: 399000,
  slug: "combo-cham-soc-toan-than-90-phut",
  image: "094",
  steps: [
    "Làm nóng cơ thể",
    "Massage vùng căng mỏi",
    "Ép cơ, kéo giãn",
    "Đi tay lực đầm",
    "Chườm thảo dược & đá nóng",
  ],
};
