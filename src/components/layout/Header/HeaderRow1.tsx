"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { StoreSelector } from "./StoreSelector";
import { ShippingAddressSelector } from "./ShippingAddressSelector";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { ROUTES, withRedirect } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const STORE_OPTIONS = [
	"Charlotte Trane Supply",
	"Austin Trane Supply",
	"Denver Trane Supply",
];

/** Header row 1 for tablet & desktop. Guest mode: logo (320px) — search
 * (300-400px) — auth buttons. Logged-in mode swaps the auth buttons for the
 * store selector, ship-to selector, account chip, and cart. */
export function HeaderRow1() {
	const { user } = useAuth();
	const pathname = usePathname();
	const [store, setStore] = useState(STORE_OPTIONS[0]);
	const [shipTo, setShipTo] = useState(user?.shipToZip ?? "07058");

	return (
		<div className="hidden md:flex items-center justify-between gap-4 h-[42px]">
			<Link
				href={ROUTES.home}
				className="flex shrink-0 items-center h-[42px] text-lg font-bold text-text-primary"
			>
				<Image
					src="/images/traneSupplyHeaderLogo.png"
					alt="TraneSupply logo"
					width={131}
					height={31}
				/>
			</Link>

			<div className="flex flex-1 justify-center">
				<SearchBar />
			</div>

			{user ? (
				<div className="flex shrink-0 items-center gap-3">
					<StoreSelector selected={store} onSelect={setStore} />
					<ShippingAddressSelector
						selected={shipTo}
						onSelect={setShipTo}
					/>
					<AccountMenu />
					<CartButton count={0} />
				</div>
			) : (
				<div className="flex shrink-0 items-center gap-4">
					<PrimaryButton href={withRedirect(ROUTES.login, pathname)}>
						Login
					</PrimaryButton>

					<div className="relative h-[42px] w-px bg-border-default">
						<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-header-row1 px-1 text-[14px] text-text-muted">
							or
						</span>
					</div>

					<SecondaryButton
						href={withRedirect(ROUTES.register, pathname)}
					>
						Create Account
					</SecondaryButton>
				</div>
			)}
		</div>
	);
}
