import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
  starClassName?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  className,
  starClassName,
}: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          key={i}
          className={cn("size-5 text-gold fill-gold shrink-0", starClassName)}
        />
      );
    } else if (rating > i - 1) {
      const decimal = rating - (i - 1);
      if (decimal >= 0.75) {
        stars.push(
          <Star
            key={i}
            className={cn("size-5 text-gold fill-gold shrink-0", starClassName)}
          />
        );
      } else if (decimal >= 0.25) {
        stars.push(
          <div key={i} className="relative size-5 shrink-0">
            <Star
              className={cn("absolute inset-0 size-5 text-black/20 fill-transparent", starClassName)}
            />
            <StarHalf
              className={cn("absolute inset-0 size-5 text-gold fill-gold", starClassName)}
            />
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={cn("size-5 text-black/20 fill-transparent shrink-0", starClassName)}
          />
        );
      }
    } else {
      stars.push(
        <Star
          key={i}
          className={cn("size-5 text-black/20 fill-transparent shrink-0", starClassName)}
        />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars}
    </div>
  );
}
