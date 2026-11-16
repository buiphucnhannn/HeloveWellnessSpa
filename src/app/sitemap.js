import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap() {
  const base = siteConfig.url;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/dich-vu`, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${base}/dich-vu/${s.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${base}/thu-vien`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
