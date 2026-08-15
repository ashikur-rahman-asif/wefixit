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
    "relative p-6 font-montserrat bg-lightBrand border border-black/5 rounded-[14px] flex flex-col items-center text-center h-full justify-between transition-all duration-300",
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

      <div className="w-full flex justify-center items-center mb-6 min-h-40">
        <Image
          src={image ?? ""}
          alt={title ?? ""}
          width={250}
          height={200}
          className="w-auto h-auto max-h-40 object-contain"
        />
      </div>

      <div className="w-full flex flex-col items-center flex-1">
        {variant === "slider" ? (
          <>
            <h2 className="text-titleBlack text-2xl lg:text-[28px] font-semibold mb-6">
              {title}
            </h2>
            <Button variant="brand" size="lg" className="mt-auto min-w-40">
              {sliderButtonText}
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-primary text-base md:text-lg font-medium px-2 leading-tight">
              {title}
            </h2>

            <div className="flex items-center justify-center gap-3 mt-auto pt-6 pb-2">
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
