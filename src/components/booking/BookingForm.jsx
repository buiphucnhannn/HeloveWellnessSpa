"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Phone, Zalo } from "@/components/ui/Icons";

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

/**
 * Form yêu cầu đặt lịch (chưa có backend): soạn tin nhắn từ các ô nhập, sao chép vào clipboard rồi cho khách
 * gửi qua Zalo / SMS hoặc gọi. Khi có backend (email, Google Sheets, CRM…) thay handleSubmit bằng gọi API.
 * - preset: slug dịch vụ chọn sẵn (từ nút "Đặt lịch dịch vụ này")
 * - compact: bố cục gọn trong popup
 * - tone: "light" (nền kem) | "dark" (nền chocolate)
 */
export default function BookingForm({ preset = "", compact = false, tone = "light" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: preset,
    date: "",
    time: "",
    note: "",
  });
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const dateRef = useRef(null);
  const set = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  // Ngày tối thiểu = hôm nay (đặt trên DOM sau hydrate → không lệch hydration)
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toISOString().slice(0, 10);
  }, []);

  const compose = () => {
    const svc = services.find((s) => s.slug === form.service);
    const date = form.date ? form.date.split("-").reverse().join("/") : "";
    return [
      `Chào ${siteConfig.name}, mình muốn đặt lịch:`,
      `• Họ tên: ${form.name}`,
      `• SĐT: ${form.phone}`,
      `• Dịch vụ: ${svc ? svc.title : "Chưa chọn — nhờ spa tư vấn"}`,
      date && `• Ngày: ${date}`,
      form.time && `• Giờ: ${form.time}`,
      form.note && `• Ghi chú: ${form.note}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = compose();
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {}
    setCopied(ok);
    setMessage(text);
  };

  const dark = tone === "dark";
  const label = cn(
    "absolute top-1.5 left-4 text-[10px] font-medium tracking-wider uppercase",
    dark ? "text-cream/50" : "text-ink-muted",
  );
  const field = cn(
    "field-box",
    dark &&
      "border-gold/20 bg-cocoa-900/40 text-cream placeholder:text-cream/45 [color-scheme:dark]",
  );

  if (message) {
    return (
      <div
        className={cn(
          "flex [animation:popIn_.5s_both] flex-col items-center rounded-2xl border px-6 py-9 text-center",
          dark ? "border-gold/25 bg-cocoa-900/40" : "border-accent/20 bg-accent-soft/60",
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-cocoa-deep">
          <Check className="h-6 w-6" />
        </span>
        <h4 className={cn("mt-5 font-display text-[1.7rem]", dark ? "text-cream" : "text-ink")}>
          Yêu cầu đã sẵn sàng
        </h4>
        <p className={cn("mt-2 max-w-sm text-[13.5px]", dark ? "text-cream/70" : "text-ink-soft")}>
          {copied
            ? "Nội dung đặt lịch đã được sao chép. Chọn Zalo (dán tin nhắn) hoặc SMS để gửi — Helove sẽ xác nhận lịch cho bạn sớm nhất."
            : "Chọn Zalo hoặc SMS để gửi nội dung bên dưới — Helove sẽ xác nhận lịch cho bạn sớm nhất."}
        </p>
        <pre
          className={cn(
            "mt-4 w-full max-w-sm rounded-xl p-3 text-left font-sans text-[12px] whitespace-pre-wrap",
            dark ? "bg-black/20 text-cream/80" : "bg-white/70 text-ink-soft",
          )}
        >
          {message}
        </pre>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <a
            href={siteConfig.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0068ff] px-5 py-3 text-sm font-medium text-white"
          >
            <Zalo className="h-4 w-4" /> Gửi qua Zalo
          </a>
          <a
            href={`sms:${siteConfig.phoneRaw}?&body=${encodeURIComponent(message)}`}
            className="inline-flex items-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-medium text-cream"
          >
            Gửi SMS
          </a>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium",
              dark ? "border-gold/40 text-gold" : "border-cocoa/20 text-cocoa",
            )}
          >
            <Phone className="h-4 w-4" /> {siteConfig.phone}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setMessage("")}
          className={cn(
            "mt-4 text-xs underline-offset-4 hover:underline",
            dark ? "text-cream/55" : "text-ink-muted",
          )}
        >
          Sửa thông tin
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-2.5 sm:space-y-3" : "space-y-3"}>
      <div className={cn("grid sm:grid-cols-2", compact ? "gap-2.5 sm:gap-3" : "gap-3")}>
        <input
          required
          className={field}
          placeholder="Họ và tên"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
        />
        <input
          required
          className={field}
          type="tel"
          inputMode="tel"
          pattern="[0-9+\s.]{9,15}"
          title="Số điện thoại 9–15 chữ số"
          placeholder="Số điện thoại"
          autoComplete="tel"
          value={form.phone}
          onChange={set("phone")}
        />
      </div>
      <label className="relative block">
        <span className={label}>Dịch vụ</span>
        <select className={cn(field, "pt-5")} value={form.service} onChange={set("service")}>
          <option value="">Chưa chọn — nhờ spa tư vấn</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title} ({s.duration})
            </option>
          ))}
        </select>
      </label>
      <div className={cn("grid grid-cols-2", compact ? "gap-2.5 sm:gap-3" : "gap-3")}>
        <label className="relative block">
          <span className={label}>Ngày mong muốn</span>
          <input
            ref={dateRef}
            className={cn(field, "pt-5")}
            type="date"
            value={form.date}
            onChange={set("date")}
          />
        </label>
        <label className="relative block">
          <span className={label}>Giờ mong muốn</span>
          <select className={cn(field, "pt-5")} value={form.time} onChange={set("time")}>
            <option value="">Giờ nào cũng được</option>
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <textarea
        className={cn(
          field,
          "resize-none",
          compact ? "min-h-[56px] sm:min-h-[64px]" : "min-h-[88px]",
        )}
        placeholder="Ghi chú: vùng đau mỏi, lực tay mong muốn, số người đi cùng…"
        value={form.note}
        onChange={set("note")}
      />
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#c4955c] py-3 text-sm font-semibold text-white transition hover:from-accent-deep hover:to-accent sm:py-3.5"
      >
        Gửi yêu cầu đặt lịch
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className={cn("text-center text-[12px]", dark ? "text-cream/55" : "text-ink-muted")}>
        Helove xác nhận lịch qua điện thoại / Zalo trong giờ làm việc.
        <span className="mt-0.5 block">
          Cần gấp?{" "}
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className={cn(
              "font-medium whitespace-nowrap underline-offset-4 hover:underline",
              dark ? "text-gold" : "text-accent-deep",
            )}
          >
            Gọi {siteConfig.phone}
          </a>
        </span>
      </p>
    </form>
  );
}
