"use client";

import { useState } from "react";
import { HeaderRow1 } from "./HeaderRow1";
import { MobileHeader } from "./MobileHeader";
import { NavBar } from "./NavBar";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="section-shell sticky top-0 z-40">
			{/* Row 1 */}
			<div className="section-shell bg-surface-header-row1 py-4">
				<div className="section-inner">
					<HeaderRow1 />
					<MobileHeader
						onOpenMenu={() => setMobileMenuOpen((prev) => !prev)}
					/>
				</div>
			</div>

			{/* Row 2 (navbar) - hidden on mobile, replaced by the drawer */}
			<div className="section-shell bg-surface-header-row2 hidden md:block">
				<div className="section-inner">
					<NavBar />
				</div>
			</div>

			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
		</header>
	);
}
