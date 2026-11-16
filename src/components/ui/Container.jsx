import { cn } from "@/lib/utils";

// Một bề rộng chung cho mọi section (1440px, lề nhỏ).
export default function Container({ as: Tag = "div", className, children }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
