import { galleryPhotos } from "@/data/gallery";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import PageBanner from "@/components/ui/PageBanner";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaStrip from "@/components/ui/CtaStrip";
import { Facebook } from "@/components/ui/Icons";

export const metadata = {
  title: "Thư viện ảnh",
  description: `Hình ảnh thực tế không gian, liệu trình và khách hàng tại ${siteConfig.name} — Thới An, TP.HCM.`,
  alternates: { canonical: "/thu-vien" },
};

/**
 * Trang Thư viện: banner tối (tiêu đề, breadcrumb, mô tả, số liệu + cụm 3 ảnh vòm/tròn/vuông kiểu tạp chí),
 * bên dưới bộ lọc + lưới masonry, cuối trang dải CTA.
 */
export default function GalleryPage() {
  const facebook = siteConfig.socials.find((s) => s.icon === "facebook");
  const categories = new Set(galleryPhotos.map((p) => p.category)).size;

  return (
    <>
      <PageBanner image={img("179").src} blur cueHref="#anh">
        <Container className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Breadcrumb
              items={[{ label: "Trang chủ", href: "/" }, { label: "Thư viện" }]}
              className="intro"
              style={{ "--d": "100ms" }}
            />
            <h1
              className="intro mt-6 h-display text-[3.4rem] leading-[1] text-cream sm:text-[4.6rem] lg:text-[5.6rem]"
              style={{ "--d": "250ms" }}
            >
              Thư viện <em className="text-gilded italic">Helove</em>
            </h1>
            <p
              className="intro mt-6 max-w-md text-[15px] leading-relaxed text-cream/75"
              style={{ "--d": "400ms" }}
            >
              Không gian ấm áp, những buổi chăm sóc tận tâm và khoảnh khắc thân quen — tất cả đều là
              hình ảnh thật tại Helove.
            </p>
            <div
              className="intro mt-8 flex flex-wrap items-center gap-3"
              style={{ "--d": "550ms" }}
            >
              <Button data-booking variant="gold">
                Đặt lịch trải nghiệm
              </Button>
              {facebook && (
                <a
                  href={facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-[13px] text-cream/80 transition hover:text-cream"
                >
                  <Facebook className="h-4 w-4" /> Xem thêm trên Fanpage
                </a>
              )}
            </div>
            <dl
              className="intro mt-12 flex gap-10 border-t border-gold/15 pt-6"
              style={{ "--d": "700ms" }}
            >
              <div>
                <dd className="font-display text-4xl text-gold">{galleryPhotos.length}+</dd>
                <dt className="mt-1 label text-[10px] text-cream/50">Hình ảnh</dt>
              </div>
              <div>
                <dd className="font-display text-4xl text-gold">{categories}</dd>
                <dt className="mt-1 label text-[10px] text-cream/50">Chủ đề</dt>
              </div>
              <div>
                <dd className="font-display text-4xl text-gold">{siteConfig.experienceYears}+</dd>
                <dt className="mt-1 label text-[10px] text-cream/50">Năm kinh nghiệm</dt>
              </div>
            </dl>
          </div>

          {/* Cụm ảnh tạp chí: vòm lớn + viền vòm lệch, ảnh tròn nhỏ trên trái, ảnh vuông đè góc dưới trái */}
          <div className="relative mx-auto hidden h-[min(64vh,600px)] w-full max-w-[540px] lg:block">
            <div className="absolute top-0 right-0 h-[92%] w-[66%] translate-x-5 -translate-y-5 rounded-t-full border border-gold/30" />
            <div
              className="intro absolute top-0 right-0 h-[92%] w-[66%] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
              style={{ "--d": "350ms" }}
            >
              <Pic
                src={img("178").src}
                alt="Phòng trị liệu riêng tư"
                fill
                preload
                sizes="360px"
                className="object-cover"
                style={{ objectPosition: "50% 55%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/85 via-cocoa-deep/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-right text-cream">
                <p className="font-display text-2xl leading-tight italic">Phòng trị liệu</p>
                <p className="mt-1 text-[12px] text-cream/75">Ấm áp · riêng tư</p>
              </div>
            </div>
            <div
              className="intro absolute top-[8%] left-[6%] h-32 w-32 overflow-hidden rounded-full ring-4 ring-cocoa-deep/70 xl:h-36 xl:w-36"
              style={{ "--d": "600ms" }}
            >
              <Pic
                src={img("136").src}
                alt="Trà thảo mộc"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
            <div
              className="intro absolute bottom-0 left-0 h-[44%] w-[44%] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-[6px] ring-cocoa-deep/70"
              style={{ "--d": "800ms" }}
            >
              <Pic
                src={img("166").src}
                alt="Túi chườm thảo dược"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </PageBanner>

      <GalleryBrowser />

      <CtaStrip
        title="Thích không gian này?"
        accent="Ghé Helove một lần nhé."
        secondary={{ label: "Xem bảng giá", href: "/#bang-gia" }}
      />
    </>
  );
}
