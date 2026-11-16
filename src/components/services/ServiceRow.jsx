import Link from "next/link";
import { img } from "@/data/images";
import { cn, vnd } from "@/lib/utils";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import { Check, Clock } from "@/components/ui/Icons";

/**
 * Một hàng dịch vụ trên /dich-vu: cụm 2 ảnh (ảnh lớn bo góc lớn + ảnh vòm nhỏ đè góc) và khối nội dung.
 * reverse=true đảo ảnh sang phải để các hàng xen kẽ.
 */
export default function ServiceRow({ service: s, reverse = false }) {
  return (
    <article id={s.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Link
        href={`/dich-vu/${s.slug}`}
        aria-label={`Xem ${s.title}`}
        className={cn("group relative block pb-10 sm:pb-12", reverse && "lg:order-last")}
      >
        <div
          className="reveal relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream-200"
          data-reveal="wipe"
        >
          <Pic
            src={img(s.photos[0]).src}
            alt={s.title}
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ objectPosition: s.pos }}
          />
        </div>
        <div
          className={cn(
            "reveal absolute bottom-0 h-[46%] w-[30%] overflow-hidden rounded-t-full ring-8 ring-cream",
            reverse ? "-left-2 sm:-left-6" : "-right-2 sm:-right-6",
          )}
          data-reveal="arch"
          style={{ "--reveal-delay": "250ms" }}
        >
          <Pic src={img(s.photos[1]).src} alt="" fill sizes="240px" className="object-cover" />
        </div>
      </Link>

      <div className="reveal" data-reveal={reverse ? "left" : "right"}>
        <p className="font-display text-5xl text-accent/35 italic">{s.n}</p>
        <h3 className="mt-2 h-display text-[2.5rem] sm:text-[3.2rem]">
          {s.title}
          <span className="mt-1 block text-[1.5rem] text-accent-deep italic sm:text-[1.7rem]">
            {s.tagline}
          </span>
        </h3>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">{s.desc}</p>
        <ul className="mt-6 grid max-w-lg gap-2.5 sm:grid-cols-2">
          {s.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[13.5px] text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-cocoa/10 py-4 text-[13px] text-ink-soft">
          <span>
            {s.from ? "từ " : ""}
            <span className="font-display text-2xl text-ink">{vnd(s.from)}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" /> {s.duration}
          </span>
          <span>{s.menu.length} lựa chọn</span>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Button href={`/dich-vu/${s.slug}`}>Xem chi tiết</Button>
          <Button data-booking={s.slug} variant="ghost">
            Đặt lịch
          </Button>
        </div>
      </div>
    </article>
  );
}
