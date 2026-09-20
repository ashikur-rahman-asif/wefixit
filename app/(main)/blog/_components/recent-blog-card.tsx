import Image from "next/image";
import Link from "next/link";

interface RecentBlogCardProps {
  imageSrc: string;
  date: string;
  category: string;
  title: string;
  href?: string;
}

export function RecentBlogCard({
  imageSrc,
  date,
  category,
  title,
  href = "#",
}: RecentBlogCardProps) {
  return (
    <Link href={href} className="group flex flex-col">
      <div className="w-full aspect-4/3 relative rounded-[20px] overflow-hidden mb-4 md:mb-5">
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={450}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-2 text-secondary text-[13px] md:text-sm font-semibold mb-2 md:mb-3">
        <span>{date}</span>
        <span className="size-1 bg-secondary/60 rounded-full"></span>
        <span>{category}</span>
      </div>
      <h3 className="text-primary font-semibold text-[17px] md:text-xl line-clamp-2 leading-snug group-hover:text-brand transition-colors">
        {title}
      </h3>
    </Link>
  );
}
