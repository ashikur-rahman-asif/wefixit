import { Product } from "@/features/products/types/product.types";

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  if (!product.specifications || product.specifications.length === 0) {
    return (
      <div className="mt-4 text-secondary">
        <p>No specifications available.</p>
      </div>
    );
  }

  return (
    <div className="mt-2 lg:mt-6">
      <table className="w-full text-left m-0 border-separate border-spacing-y-2">
        <tbody>
          {product.specifications.map((spec, index) => (
            <tr key={index} className="bg-muted/30">
              <td className="py-3 px-4 w-1/3 font-medium text-primary rounded-l-lg">{spec.key}</td>
              <td className="py-3 px-4 text-secondary rounded-r-lg">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
