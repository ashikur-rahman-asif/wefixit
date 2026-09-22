import Image from "next/image";
import Link from "next/link";

interface TopBlogCardProps {
  imageSrc: string;
  date: string;
  category: string;
  title: string;
  description: string;
  href?: string;
}

export function TopBlogCard({
  imageSrc,
  date,
  category,
  title,
  description,
  href = "#",
}: TopBlogCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full aspect-video md:aspect-4/3 lg:aspect-605/502 rounded-2xl overflow-hidden opacity-100 cursor-pointer"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={1200}
        height={900}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-300" />

      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-white/80 font-medium text-sm md:text-base mb-2 md:mb-3">
          <span>{date}</span>
          <span className="size-1.5 bg-white/80 rounded-full"></span>
          <span>{category}</span>
        </div>

        <h2 className="text-white font-semibold text-2xl md:text-[28px] leading-tight mb-0 md:mb-3 line-clamp-2">
          {title}
        </h2>

        <div className="hidden md:block">
          <p className="text-white/80 text-sm md:text-base font-medium line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
