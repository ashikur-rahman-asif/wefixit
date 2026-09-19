import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Loader({ className, size = "md", ...props }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "border-brand/30 border-t-brand rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

interface PageLoaderProps {
  
  message?: string;
  className?: string;
  size?: LoaderProps["size"];
}


export function PageLoader({
  message,
  className,
  size = "lg",
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 min-h-[300px] w-full",
        className
      )}
    >
      <Loader size={size} />
      {message && (
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
      )}
    </div>
  );
}
