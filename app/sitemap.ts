import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { systems } from "@/content/systems";
import { compares } from "@/content/compares";
import { cities } from "@/content/cities";
import { posts } from "@/content/blog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (p: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") =>
    ({ url: `${site.url}${p}`, priority, changeFrequency });

  return [
    at("/", 1.0, "weekly"),
    at("/free-design-consultation", 0.9),
    at("/pricing", 0.9),
    at("/services", 0.8),
    at("/lighting-systems", 0.8),
    at("/compare", 0.8),
    at("/service-areas", 0.8),
    at("/blog", 0.6, "weekly"),
    at("/about", 0.6), at("/how-it-works", 0.6), at("/warranty", 0.6),
    at("/reviews", 0.6), at("/gallery", 0.6), at("/recent-projects", 0.6),
    at("/faq", 0.6), at("/contact", 0.6),
    ...services.map((s) => at(`/services/${s.slug}`, 0.8)),
    ...systems.map((s) => at(`/lighting-systems/${s.slug}`, 0.7)),
    ...compares.map((c) => at(`/compare/${c.slug}`, 0.7)),
    ...cities.map((c) => at(`/service-areas/${c.slug}`, 0.7)),
    ...posts.map((p) => at(`/blog/${p.slug}`, 0.5)),
    at("/privacy-policy", 0.2, "yearly"),
    at("/terms-of-service", 0.2, "yearly"),
    at("/accessibility", 0.2, "yearly"),
  ];
}
