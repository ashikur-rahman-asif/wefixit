import { Product } from "@/types/product";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div
      className="mt-2 lg:mt-4 prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-headings:mt-4 prose-headings:mb-2 [&>*:first-child]:mt-0 prose-h2:text-[26px] prose-h2:font-semibold prose-p:text-secondary prose-p:my-2 prose-p:leading-relaxed prose-a:text-brand prose-ul:my-2 prose-li:my-0 prose-blockquote:my-4 prose-blockquote:py-1"
      dangerouslySetInnerHTML={{ __html: product.description || "" }}
    />
  );
}
