export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  if (minutes === 1) {
    return "1 min read";
  }
  return `${minutes} min read`;
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

const VIEW_COUNT_PREFIX = 'blog_views_';

export function getViewCount(postId: string): number {
  if (typeof window === 'undefined') return 0;
  
  const stored = localStorage.getItem(`${VIEW_COUNT_PREFIX}${postId}`);
  return stored ? parseInt(stored, 10) : 0;
}

export function incrementViewCount(postId: string): number {
  if (typeof window === 'undefined') return 0;
  
  const currentCount = getViewCount(postId);
  const newCount = currentCount + 1;
  localStorage.setItem(`${VIEW_COUNT_PREFIX}${postId}`, newCount.toString());
  return newCount;
}

export function formatViewCount(count: number): string {
  if (count === 0) return 'No views yet';
  if (count === 1) return '1 view';
  if (count < 1000) return `${count} views`;
  if (count < 1000000) return `${(count / 1000).toFixed(1)}k views`;
  return `${(count / 1000000).toFixed(1)}M views`;
}
