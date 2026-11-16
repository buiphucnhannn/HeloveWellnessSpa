import Link from "next/link";
import { img } from "@/data/images";
import { vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Pic from "@/components/ui/Pic";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ArrowRight, Clock } from "@/components/ui/Icons";

/**
 * Banner trang chi tiết (một màn hình): nền chocolate có ảnh dịch vụ nhoè làm không khí;
 * trái nội dung (breadcrumb, số thứ tự, tên + tagline nghiêng, mô tả, giá, nút); phải ảnh vòm lớn sắc nét
 * + viền vòm vàng lệch + ảnh tròn nhỏ. Dưới trái: chuyển sang dịch vụ kế tiếp.
 */
export default function DetailHero({ service: s, next }) {
  return (
    <section className="relative flex min-h-screen-cap items-center overflow-hidden bg-cocoa-deep pt-28 pb-16 text-cream lg:h-[max(640px,min(100svh,1080px))] lg:min-h-0 lg:pt-24 lg:pb-8">
      <div className="absolute inset-0 opacity-25">
        <Pic
          src={img(s.photos[0]).src}
          alt=""
          fill
          sizes="50vw"
          quality={75}
          className="scale-110 object-cover blur-2xl"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/90 to-cocoa-deep/60" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[720px] rounded-full bg-gold/10 blur-[140px]" />

      <Container className="relative grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Dịch vụ", href: "/dich-vu" },
              { label: s.title },
            ]}
            className="intro"
            style={{ "--d": "100ms" }}
          />
          <p
            className="intro mt-6 font-display text-5xl text-gold/30 italic lg:mt-[min(4vh,2.5rem)]"
            style={{ "--d": "180ms" }}
          >
            {s.n}
          </p>
          <h1
            className="intro mt-1 h-display text-[3.2rem] leading-[0.98] text-cream sm:text-[4.2rem] lg:text-[clamp(3.2rem,8.2vh,4.8rem)]"
            style={{ "--d": "250ms" }}
          >
            {s.title}
            <em className="mt-3 block text-gilded text-[0.5em] leading-tight italic">
              {s.tagline}
            </em>
          </h1>
          <p
            className="intro mt-5 max-w-lg text-[15px] leading-relaxed text-cream/80"
            style={{ "--d": "400ms" }}
          >
            {s.desc}
          </p>
          <div
            className="intro mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-cream/75"
            style={{ "--d": "520ms" }}
          >
            <span>
              {s.from ? "từ " : ""}
              <span className="font-display text-[1.7rem] text-gold">{vnd(s.from)}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" /> {s.duration}
            </span>
          </div>
          <div className="intro mt-7 flex flex-wrap items-center gap-5" style={{ "--d": "650ms" }}>
            <Button data-booking={s.slug} variant="gold">
              Đặt lịch dịch vụ này
            </Button>
            <a
              href="#bang-gia-dich-vu"
              className="text-[13px] font-medium text-cream/85 underline-offset-[6px] transition hover:text-cream hover:underline"
            >
              Xem bảng giá
            </a>
          </div>

          {next && (
            <Link
              href={`/dich-vu/${next.slug}`}
              className="intro group mt-8 inline-flex items-center gap-4 border-t border-gold/15 pt-5 text-cream lg:mt-[min(5vh,3rem)]"
              style={{ "--d": "800ms" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-cocoa-deep">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>
                <span className="block label text-[10px] text-cream/50">Dịch vụ tiếp theo</span>
                <span className="mt-1 block font-display text-xl transition-colors group-hover:text-gold-soft">
                  {next.title}
                </span>
              </span>
            </Link>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:aspect-[4/5] lg:h-[min(66svh,640px)] lg:w-auto lg:max-w-none">
          <div className="absolute inset-0 translate-x-5 -translate-y-5 rounded-t-full border border-gold/30" />
          <div
            className="intro relative aspect-[4/5] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] lg:aspect-auto lg:h-full"
            style={{ "--d": "350ms" }}
          >
            <Pic
              src={img(s.photos[0]).src}
              alt={`${s.title} tại Helove Wellness Spa`}
              fill
              preload
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
              style={{ objectPosition: s.pos }}
            />
          </div>
          <div
            className="intro absolute -bottom-5 -left-6 h-32 w-32 overflow-hidden rounded-full ring-[6px] ring-cocoa-deep sm:h-36 sm:w-36"
            style={{ "--d": "650ms" }}
          >
            <Pic src={img(s.photos[2]).src} alt="" fill sizes="180px" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
