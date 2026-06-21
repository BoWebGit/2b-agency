import { NewsArticleContent } from "@/components/NewsArticleContent";

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsArticleContent slug={slug} />;
}
