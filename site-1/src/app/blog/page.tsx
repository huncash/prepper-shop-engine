import type { Metadata } from "next";

import { getAllPostMeta } from "@shared/lib/blog";
import { BlogIndex } from "@shared/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();
  return <BlogIndex posts={posts} />;
}
