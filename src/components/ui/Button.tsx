import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BaseProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

/** Solid black background, white text - used for the primary "Login" action. */
export function PrimaryButton({ children, className, href, onClick }: BaseProps) {
  const classes = cn(
    "flex items-center justify-center h-[45px] px-5 rounded-md bg-text-primary text-white text-[15px] font-semibold whitespace-nowrap transition-colors hover:bg-black/80",
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

/** White background, black text, 1px border - used for "Create Account". Same
 * border color token is reused site-wide wherever a hairline border is needed. */
export function SecondaryButton({ children, className, href, onClick }: BaseProps) {
  const classes = cn(
    "flex items-center justify-center h-[45px] px-5 rounded-md bg-white text-text-primary text-[15px] font-semibold whitespace-nowrap border border-border-default transition-colors hover:bg-surface-hover",
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
