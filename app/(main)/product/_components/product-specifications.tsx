import { Product } from "@/types/product";

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  if (!product.specification) {
    return (
      <div className="mt-4 text-secondary">
        <p>No specifications available.</p>
      </div>
    );
  }

  return (
    <div
      className="mt-2 lg:mt-6 prose prose-lg max-w-none dark:prose-invert [&>*:first-child]:mt-0
      prose-table:w-full prose-table:text-left prose-table:m-0
      prose-table:border-separate prose-table:border-spacing-y-2
      prose-tr:bg-muted/30
      prose-td:py-3 prose-td:px-4 prose-th:py-3 prose-th:px-4
      prose-td:first:w-1/3 prose-td:first:font-medium prose-td:first:text-primary prose-td:first:rounded-l-lg
      prose-td:last:text-secondary prose-td:last:rounded-r-lg
      prose-th:w-1/3 prose-th:font-medium prose-th:text-primary prose-th:rounded-l-lg
      prose-p:my-2"
      dangerouslySetInnerHTML={{ __html: product.specification }}
    />
  );
}
