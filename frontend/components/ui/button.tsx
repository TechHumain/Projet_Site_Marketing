"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors ring-focus disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-border bg-white text-text hover:bg-muted",
  ghost: "text-slate-600 hover:bg-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
}

const LoadingSpinner = () => (
  <svg
    className="mr-2 h-4 w-4 animate-spin text-current"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      d="M4 12a8 8 0 018-8"
      fill="currentColor"
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const composedClassName = buttonVariants({
      variant,
      size,
      className,
    });

    if (href) {
      return (
        <Link href={href} className={composedClassName} aria-busy={loading}>
          {loading && <LoadingSpinner />}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={composedClassName} disabled={loading} {...props}>
        {loading && <LoadingSpinner />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
