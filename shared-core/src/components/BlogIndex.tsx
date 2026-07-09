import type { PostMeta } from "@shared/lib/blog";
import { cn } from "@shared/src/lib/utils";

export interface BlogIndexProps {
  posts: PostMeta[];
  title?: string;
  subtitle?: string;
  basePath?: string;
  className?: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogIndex({
  posts,
  title = "Blog",
  subtitle,
  basePath = "/blog",
  className,
}: BlogIndexProps) {
  return (
    <div className={cn("mx-auto max-w-3xl px-4 py-16", className)}>

      {/* Page header */}
      <header className="mb-12 border-b pb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Blog
        </p>
        <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-xl text-muted-foreground">{subtitle}</p>
        ) : null}
      </header>

      {/* Post list */}
      {posts.length === 0 ? (
        <p className="text-muted-foreground">Nincs elérhető bejegyzés.</p>
      ) : (
        <ul className="flex flex-col divide-y">
          {posts.map((post) => (
            <li key={post.slug} className="py-8">
              <article>

                {/* Category label */}
                {post.category ? (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    {post.category}
                  </p>
                ) : null}

                {/* Title */}
                <h2 className="mb-2 text-xl font-bold leading-snug md:text-2xl">
                  <a
                    href={`${basePath}/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>

                {/* Description */}
                {post.description ? (
                  <p className="mb-4 text-muted-foreground">{post.description}</p>
                ) : null}

                {/* Meta: date + reading time + link */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    {post.date ? (
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    ) : null}
                    {post.readingTime ? (
                      <span>{post.readingTime} perc</span>
                    ) : null}
                    {post.author ? (
                      <span>{post.author}</span>
                    ) : null}
                  </div>

                  <a
                    href={`${basePath}/${post.slug}`}
                    className="text-xs font-medium text-primary hover:underline shrink-0"
                  >
                    Olvasom →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
