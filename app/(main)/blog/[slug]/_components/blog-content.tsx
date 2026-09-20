export function BlogContent({ content }: { content: string }) {
  return (
    <article
      className="prose md:prose-lg max-w-none prose-p:my-1 md:prose-p:my-2 prose-headings:my-2 md:prose-headings:my-3 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-img:my-3 md:prose-img:my-4 prose-blockquote:my-2 md:prose-blockquote:my-4 prose-hr:my-4 prose-headings:text-primary prose-a:text-brand hover:prose-a:text-brand/80 prose-img:rounded-2xl prose-img:w-full prose-img:aspect-1240/531 prose-img:object-cover prose-p:text-secondary prose-li:text-secondary prose-strong:text-primary prose-blockquote:text-secondary prose-blockquote:border-brand leading-snug md:leading-normal"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
