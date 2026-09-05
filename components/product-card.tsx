import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  variant?: "product" | "slider";
  image?: string;
  title?: string;
  price?: number | string;
  discountPrice?: number | string;
  sliderButtonText?: string;
  href?: string;
  className?: string;
}

export function ProductCard({
  variant = "product",
  image,
  title,
  price,
  discountPrice,
  sliderButtonText,
  href = "#",
  className,
}: ProductCardProps) {
  const cardClasses = cn(
    "relative p-4 sm:p-6 font-montserrat bg-lightBrand border border-black/5 rounded-[14px] flex flex-col h-full justify-between transition-all duration-300",
    variant === "slider" ? "items-center text-center" : "sm:items-center sm:text-center",
    variant === "product" && "hover:shadow-md hover:-translate-y-1",
    className,
  );

  const cardContent = (
    <>
      {variant === "product" && discountPrice && price && (
        <div className="absolute top-4 left-4 bg-gold text-titleBlack text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
          {Math.round(
            ((Number(discountPrice) - Number(price)) / Number(discountPrice)) *
              100,
          )}
          % OFF
        </div>
      )}

      <div className="w-full flex justify-center items-center mb-2 sm:mb-6 min-h-40">
        {image ? (
          <Image
            src={image}
            alt={title ?? "Product"}
            width={250}
            height={200}
            className="w-auto h-auto max-h-40 object-contain"
          />
        ) : (
          <div className="w-full h-40 bg-black/5 rounded-xl flex items-center justify-center text-sm text-secondary">
            No Image
          </div>
        )}
      </div>

      <div className={cn("w-full flex flex-col flex-1", variant === "slider" ? "items-center text-center" : "sm:items-center")}>
        {variant === "slider" ? (
          <>
            <h2 className="text-titleBlack text-lg sm:text-2xl lg:text-[28px] font-semibold mb-2 sm:mb-6">
              {title}
            </h2>
            <Button variant="brand" className="mt-auto mb-2 sm:mb-0 min-w-[120px] sm:min-w-40 py-1 sm:py-3 px-4 sm:px-8 text-sm sm:text-base">
              {sliderButtonText}
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-primary text-left sm:text-center text-base md:text-lg font-medium leading-tight">
              {title}
            </h2>

            <div className="flex items-center sm:justify-center gap-3 mt-auto pt-4 sm:pt-6 pb-2">
              <span className="text-brand text-2xl md:text-3xl font-bold">
                ${price}
              </span>
              {discountPrice && (
                <del className="text-secondary text-sm md:text-base font-medium">
                  ${discountPrice}
                </del>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );

  if (variant === "product") {
    return (
      <Link href={href} className={cn("block group", cardClasses)}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cn("group", cardClasses)}>{cardContent}</div>;
}
