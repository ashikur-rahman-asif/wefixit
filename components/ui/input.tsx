import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type = "text", error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "block w-full px-4 py-3.5 text-[15px] text-gray-900 bg-transparent border rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-brand transition-colors placeholder:text-gray-300",
            error ? "border-red-500 focus:border-red-500" : "border-gray-200",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute text-[13px] font-semibold -translate-y-[21px] top-4 z-10 bg-white px-1.5 left-3",
            error ? "text-red-500" : "text-titleBlack"
          )}>
          {label}
        </label>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "block w-full px-4 py-3.5 pr-12 text-[15px] text-gray-900 bg-transparent border rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-brand transition-colors placeholder:text-gray-300",
            error ? "border-red-500 focus:border-red-500" : "border-gray-200",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute text-[13px] font-semibold -translate-y-[21px] top-4 z-10 bg-white px-1.5 left-3",
            error ? "text-red-500" : "text-titleBlack"
          )}>
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-titleBlack hover:text-gray-600 focus:outline-none transition-colors"
          tabIndex={-1}>
          {showPassword ? (
            <Eye className="w-[18px] h-[18px]" />
          ) : (
            <EyeOff className="w-[18px] h-[18px]" />
          )}
        </button>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
