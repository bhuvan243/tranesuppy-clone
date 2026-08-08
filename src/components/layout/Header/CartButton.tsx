import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { ROUTES } from "@/constants/routes";

interface CartButtonProps {
  count?: number;
}

export function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <Link
      href={ROUTES.checkout}
      aria-label={`Cart, ${count} items`}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-default text-text-primary hover:bg-surface-hover transition-colors"
    >
      <Icon name="cart" className="w-4 h-4" />
      <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white">
        {count}
      </span>
    </Link>
  );
}
