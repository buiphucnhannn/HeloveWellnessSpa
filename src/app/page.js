import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Band from "@/components/sections/Band";
import Pricing from "@/components/sections/Pricing";
import Offers from "@/components/sections/Offers";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";

// Trang chủ: mỗi section ≈ một màn hình. Section có ảnh nền (Hero, Band) tràn hết chiều ngang;
// section nội dung dùng Container 1440px. Đặt lịch: popup (data-booking) + form trong popup; bản đồ ở footer.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Band />
      <Pricing />
      <Offers />
      <Gallery />
      <Testimonials />
    </>
  );
}
