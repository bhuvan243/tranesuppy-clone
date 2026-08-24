"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { NAV_ITEMS, LOGGED_IN_NAV_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";
import { MegaMenu } from "./MegaMenu";
import { LanguageDropdown } from "./LanguageDropdown";

export function NavBar() {
	const pathname = usePathname();
	const { user } = useAuth();
	const [megaMenuOpen, setMegaMenuOpen] = useState(false);
	const shopByCategoryRef = useRef<HTMLLIElement>(null);

	useClickOutside(
		shopByCategoryRef,
		() => setMegaMenuOpen(false),
		megaMenuOpen,
	);

	const navItems = user ? LOGGED_IN_NAV_ITEMS : NAV_ITEMS;

	return (
		// `relative` here (not on the trigger <li>) so the mega menu can be
		// sized as a percentage of the navbar's own width instead of the
		// viewport (100vw) - vw-based widths overflow the page whenever a
		// vertical scrollbar is present, which is what caused the horizontal
		// scroll bug on constrained/tablet widths.
		<nav className="relative h-[50px] flex items-center justify-between border-b border-border-divider">
			<ul className="flex items-stretch h-full">
				{navItems.map((item) => {
					const isShopByCategory = item.label === "Shop By Category";
					const isActive = isShopByCategory
						? pathname.startsWith("/categorysummary") ||
							pathname.startsWith("/category")
						: pathname === item.href;

					if (isShopByCategory) {
						return (
							<li
								key={item.label}
								ref={shopByCategoryRef}
								className="h-full"
								onMouseEnter={() => setMegaMenuOpen(true)}
								// onMouseLeave={() => setMegaMenuOpen(false)}
							>
								<button
									type="button"
									onClick={() =>
										setMegaMenuOpen((prev) => !prev)
									}
									aria-expanded={megaMenuOpen}
									className={cn(
										"flex h-full items-center gap-1.5 px-4 text-[16px] font-semibold border-b-[3px] transition-colors",
										isActive || megaMenuOpen
											? "text-accent border-accent"
											: "border-transparent text-text-primary hover:text-accent hover:border-accent",
									)}
								>
									{item.label}
									<Icon
										name="chevron-down"
										className={cn(
											"w-3.5 h-3.5 transition-transform duration-200",
											megaMenuOpen && "rotate-180",
										)}
									/>
								</button>
								{megaMenuOpen && (
									<MegaMenu
										onNavigate={() =>
											setMegaMenuOpen(false)
										}
									/>
								)}
							</li>
						);
					}

					return (
						<li key={item.label} className="h-full">
							<Link
								href={item.href}
								className={cn(
									"flex h-full items-center px-4 text-[16px] font-semibold border-b-[3px] transition-colors",
									isActive
										? "text-accent border-accent"
										: "border-transparent text-text-primary hover:text-accent hover:border-accent",
								)}
							>
								{item.label}
							</Link>
						</li>
					);
				})}
			</ul>

			{user ? (
				<Link
					href={ROUTES.checkout}
					className="flex shrink-0 items-center gap-1.5 rounded-md bg-text-primary px-4 py-2 text-[14px] font-semibold text-white hover:bg-black/80 transition-colors"
				>
					<Icon name="bolt" className="w-4 h-4" />
					Quick Order
				</Link>
			) : (
				<div className="flex items-center h-full pl-4">
					<span
						className="hidden md:block w-px h-6 bg-border-divider mr-4"
						aria-hidden="true"
					/>
					<LanguageDropdown />
				</div>
			)}
		</nav>
	);
}
