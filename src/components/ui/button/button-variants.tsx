import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-bg-hover",
        secondary:
          "bg-btn-secondary-bg text-btn-secondary-text hover:bg-btn-secondary-bg-hover",
        ghost: "bg-transparent hover:bg-btn-ghost-bg-hover text-btn-ghost-text",
        dashed:
          "border border-dashed bg-btn-dashed-bg hover:bg-btn-dashed-bg-hover border-btn-dashed-border hover:border-btn-dashed-border-hover",
        destructive:
          "hover:bg-btn-destructive-bg-hover text-btn-destructive-text",
      },
      size: {
        sm: "px-3 text-xs",
        default: "px-6 py-3",
        lg: " px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
