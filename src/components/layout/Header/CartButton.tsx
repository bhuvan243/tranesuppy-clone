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
			className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-border-default text-text-primary hover:bg-surface-hover transition-colors"
		>
			<Icon name="cart" className="w-4 h-4" />
			<span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#E22905] text-[14px] font-semibold leading-none text-white">
				{count}
			</span>
		</Link>
	);
}
