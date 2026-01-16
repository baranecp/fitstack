import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-emerald-500 text-white hover:bg-emerald-600",
        secondary:
          "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
        dashed:
          "border border-dashed bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 border-gray-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500",
        destructive:
          "hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
