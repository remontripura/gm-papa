export default async function sitemap() {
  const res = await fetch("https://admin.gmpapa.com/api/sitemap", {
    next: { revalidate: 60 * 60 * 24 },
  });
  const data = await res.json();

  return data.urls.map((item: any) => ({
    url: item.loc,
    lastModified: item.lastmod,
    changeFrequency: item.changefreq,
    priority: parseFloat(item.priority),
  }));
}
