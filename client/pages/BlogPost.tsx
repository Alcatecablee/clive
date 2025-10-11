import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  
  const relatedPosts = post 
    ? blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2)
    : [];
  
  if (relatedPosts.length < 2) {
    const otherPosts = blogPosts.filter((p) => p.id !== post?.id && p.category !== post?.category);
    relatedPosts.push(...otherPosts.slice(0, 2 - relatedPosts.length));
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <h1 className="mb-4 font-display text-3xl font-bold">Post Not Found</h1>
        <Link
          to="/blog"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="flex flex-col">
      <Helmet>
        <title>{post.title} - Just Clive Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, South Africa, ${post.title.split(' ').slice(0, 5).join(', ')}`} />
        <link rel="canonical" href={`https://justc.live/blog/${post.id}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://justc.live/blog/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://justc.live${post.image}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Clive Makazhu" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://justc.live${post.image}`} />
        <meta name="twitter:creator" content="@just_clive_sa" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://justc.live${post.image}`,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Clive Makazhu",
              "url": "https://justc.live"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Just Clive",
              "logo": {
                "@type": "ImageObject",
                "url": "https://justc.live/favicon-192x192.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://justc.live/blog/${post.id}`
            }
          })}
        </script>
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="mb-12 overflow-hidden rounded-xl">
            <img
              src={post.image}
              alt={post.title}
              className="h-auto w-full"
            />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-border pt-16">
              <h2 className="mb-8 font-display text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {relatedPost.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="mb-2 font-display text-lg font-semibold leading-tight text-foreground">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
