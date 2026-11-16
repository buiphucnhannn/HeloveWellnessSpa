import Image from "next/image";

// next/image chất lượng cao mặc định (quality 90, AVIF/WebP) + chống kéo thả.
// Luôn truyền `sizes` sát với kích thước hiển thị thật để trình duyệt tải đúng bản nét nhất.
export default function Pic({ quality = 90, draggable = false, alt = "", ...props }) {
  return <Image quality={quality} draggable={draggable} alt={alt} {...props} />;
}
