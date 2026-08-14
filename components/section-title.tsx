import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 md:gap-2.5",
        {
          "items-center text-center": align === "center",
          "items-start text-left": align === "left",
          "items-end text-right": align === "right",
        },
        className,
      )}>
      {subtitle && (
        <span
          className={cn(
            "text-[16px] font-bold text-brand uppercase tracking-[0.2em] leading-normal",
            subtitleClassName,
          )}>
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "text-[28px] md:text-[40px] font-bold text-primary  md:tracking-[-1px] leading-[1.2] md:leading-[1.15]",
          titleClassName,
        )}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base font-normal text-secondary whitespace-pre-line max-w-xl",
            {
              "mx-auto": align === "center",
              "mr-auto": align === "left",
              "ml-auto": align === "right",
            },
            descriptionClassName,
          )}>
          {description}
        </p>
      )}
    </div>
  );
}
