import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl text-sm font-semibold",
    "transition-[transform,background-color,border-color,color,box-shadow]",
    "duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:scale-[0.97]"
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-white",
        secondary:
          "border border-white/10 bg-white/[0.07] text-foreground hover:bg-white/[0.12]",
        outline:
          "border border-white/14 bg-transparent text-foreground hover:bg-white/[0.07]",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-white/[0.07] hover:text-foreground",
        success:
          "bg-success text-black shadow-[0_10px_30px_rgba(126,231,135,0.16)] hover:bg-[#92ec9b]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-500"
      },

      size: {
        default: "h-11 px-4",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-13 rounded-2xl px-6 text-base",
        icon: "size-11 p-0"
      }
    },

    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
