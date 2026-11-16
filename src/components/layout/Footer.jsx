import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { services } from "@/data/services";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Facebook, Messenger, Zalo, MapPin, Phone, Clock } from "@/components/ui/Icons";

const socialIcons = { facebook: Facebook, zalo: Zalo, messenger: Messenger };

// cacheComponents đang bật: new Date() phải nằm trong hàm "use cache".
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

/**
 * Footer chocolate: logo đứng + slogan · liên hệ · giờ mở cửa · menu · dịch vụ. Đáy: bản quyền.
 * Cột cuối: bản đồ Google + nút chỉ đường.
 */
export default function Footer() {
  const { address, hours, socials, maps } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-cocoa-deep text-cream/70">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-24 sm:px-8 sm:pb-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[0.9fr_1.15fr_0.55fr_0.95fr_1.35fr]">
          <div className="reveal">
            <Logo variant="full" className="w-32" sizes="160px" />
            <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed text-cream/55">
              Không gian thư giãn & chăm sóc sức khỏe với đôi tay tận tâm, gần 7 năm đồng hành cùng
              khách hàng.
            </p>
          </div>

          <div
            className="reveal text-[13.5px] leading-relaxed"
            style={{ "--reveal-delay": "80ms" }}
          >
            <p className="label text-gold/70">Liên hệ</p>
            <a
              href={maps.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex gap-2.5 transition hover:text-cream"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {address.street}
                <br />
                {address.ward}, {address.city}
              </span>
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="mt-2.5 flex items-center gap-2.5 font-display text-xl text-cream transition hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" /> {siteConfig.phone}
            </a>
            {hours.map((h) => (
              <p key={h.days} className="mt-2.5 flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {h.days} · {h.open} – {h.close}
                </span>
              </p>
            ))}
            <ul className="mt-5 flex gap-2">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-cream transition hover:border-gold hover:bg-gold hover:text-cocoa-deep"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="reveal text-[13.5px]" style={{ "--reveal-delay": "240ms" }}>
            <p className="label text-gold/70">Menu</p>
            <ul className="mt-3 space-y-1.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal text-[13.5px]" style={{ "--reveal-delay": "320ms" }}>
            <p className="label text-gold/70">Dịch vụ</p>
            <ul className="mt-3 space-y-1.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/dich-vu/${s.slug}`} className="transition hover:text-cream">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal sm:col-span-2 lg:col-span-1" style={{ "--reveal-delay": "320ms" }}>
            <p className="label text-gold/70">Bản đồ</p>
            <div className="relative mt-3 overflow-hidden rounded-2xl ring-1 ring-gold/20">
              <iframe
                src={maps.embed}
                title={`Bản đồ đường đến ${siteConfig.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[200px] w-full grayscale-[30%] sepia-[25%]"
              />
              <a
                href={maps.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-full bg-cocoa-deep px-3 py-1.5 text-[11px] font-medium text-cream transition hover:bg-cocoa"
              >
                Chỉ đường <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gold/10 pt-6 text-xs text-cream/45 sm:flex-row">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display text-sm text-gold/70 italic">{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
