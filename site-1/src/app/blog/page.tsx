import type { Metadata } from "next";

import { getAllPostMeta } from "@shared/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nincsenek cikkek.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-lg font-semibold group-hover:underline">
                  {post.title}
                </h2>
                {post.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
                ) : null}
                {post.date ? (
                  <time className="mt-1 block text-xs text-muted-foreground" dateTime={post.date}>
                    {post.date}
                  </time>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
