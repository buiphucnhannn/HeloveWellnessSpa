import { cn } from "@/lib/utils";

/**
 * Tiêu đề hiện TỪNG CHỮ kiểu blur-in. Chữ thường = text, phần in nghiêng màu nhấn = accent.
 * useReveal chạy hiệu ứng khi cuộn tới (class .split). step: khoảng cách giữa các chữ (ms), baseDelay: trễ đầu.
 */
export default function SplitText({
  as: Tag = "h2",
  text,
  accent,
  accentClass = "italic text-accent-deep",
  className,
  step = 55,
  baseDelay = 0,
  breakBeforeAccent = false,
}) {
  const words = (str, extra) =>
    str.split(" ").flatMap((w, wi, arr) => [
      <span key={`${extra ? "a" : "t"}${wi}`} className={cn("split-unit", extra)}>
        {w}
      </span>,
      wi < arr.length - 1 ? " " : null,
    ]);

  return (
    <Tag
      className={cn("split", className)}
      style={{ "--step": `${step}ms`, "--base": `${baseDelay}ms` }}
    >
      {words(text)}
      {accent && (
        <>
          {breakBeforeAccent ? <br /> : " "}
          {words(accent, accentClass)}
        </>
      )}
    </Tag>
  );
}
