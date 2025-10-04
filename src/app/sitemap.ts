import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/blog", priority: 0.7, changefreq: "weekly" },
    { path: "/faq", priority: 0.6, changefreq: "monthly" },
    { path: "/gift-card", priority: 0.7, changefreq: "weekly" },
    { path: "/privacy-policy", priority: 0.5, changefreq: "yearly" },
    { path: "/product", priority: 0.8, changefreq: "weekly" },
    { path: "/subscriptions", priority: 0.7, changefreq: "monthly" },
    { path: "/terms-and-conditions", priority: 0.5, changefreq: "yearly" },
    { path: "/thank-you", priority: 0.5, changefreq: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${process.env.NEXTAUTH_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency:
      route.changefreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route.priority,
  }));
}
