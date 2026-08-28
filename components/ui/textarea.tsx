import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "block w-full px-4 py-3.5 text-[15px] text-gray-900 bg-transparent border rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-primary hover:border-primary transition duration-200 placeholder:opacity-60 placeholder:text-gray-500 resize-y min-h-[120px]",
            error ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
