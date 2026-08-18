import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]",
        className
      )}
    >
      {children}
    </div>
  );
}
