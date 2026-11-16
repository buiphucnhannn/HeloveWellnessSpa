/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  images: {
    // AVIF/WebP chất lượng 90 cho ảnh lớn → nét, nhẹ. Next 16 bắt buộc khai báo danh sách quality.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
