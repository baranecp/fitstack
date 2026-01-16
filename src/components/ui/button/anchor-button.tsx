import React from "react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button-variants";

export interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AnchorButton = React.forwardRef<
  HTMLAnchorElement,
  AnchorButtonProps
>(
  (
    { className, variant, size, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}>
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </a>
    );
  }
);

AnchorButton.displayName = "AnchorButton";
