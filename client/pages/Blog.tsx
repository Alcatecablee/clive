import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Blog & Insights - Just Clive | Technology, Entrepreneurship & Digital Innovation</title>
        <meta name="description" content="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa. Learn about K53 driving tests, SARS tax optimization, remote IT support, and more." />
        <meta name="keywords" content="South Africa blog, technology insights, entrepreneurship tips, K53 learner's license, SARS tax refund, remote IT support, BurbGigz, SuperK53, Taxfy" />
        <link rel="canonical" href="https://justc.live/blog" />
        <meta property="og:title" content="Blog & Insights - Just Clive" />
        <meta property="og:description" content="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa" />
        <meta property="og:url" content="https://justc.live/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog & Insights - Just Clive" />
        <meta name="twitter:description" content="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa" />
      </Helmet>

      <section className="bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="space-y-4 text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Blog & Insights
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="mb-3 font-display text-xl font-semibold leading-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary transition-all group-hover:gap-2">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
