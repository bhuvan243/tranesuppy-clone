"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { SearchBar } from "./SearchBar";
import { LanguageDropdown } from "./LanguageDropdown";
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
const SHIP_TO_OPTIONS = ["07058", "73301", "80202"];

interface MobileHeaderProps {
	onOpenMenu: () => void;
}

export function MobileHeader({ onOpenMenu }: MobileHeaderProps) {
	const { user } = useAuth();
	const pathname = usePathname();
	const [store, setStore] = useState(STORE_OPTIONS[0]);
	const [shipTo, setShipTo] = useState(user?.shipToZip ?? SHIP_TO_OPTIONS[0]);

	return (
		<div className="flex md:hidden flex-col gap-3 py-3">
			{/* Row 1: menu - logo - (language | account+cart) */}
			<div className="flex items-center justify-between h-[42px]">
				<button
					type="button"
					onClick={onOpenMenu}
					aria-label="Open menu"
					className="flex items-center justify-center w-9 h-9 text-text-primary"
				>
					<Icon name="menu" className="w-6 h-6" />
				</button>

				<Link
					href={ROUTES.home}
					className="text-lg font-bold text-text-primary"
				>
					<Image
						src="/images/traneSupplyHeaderLogo.png"
						alt="TraneSupply logo"
						width={131}
						height={31}
					/>
				</Link>

				{user ? (
					<div className="flex items-center gap-2">
						<AccountMenu />
						<CartButton count={0} />
					</div>
				) : (
					<LanguageDropdown />
				)}
			</div>

			{user ? (
				<>
					{/* Row 2: search bar, full width */}
					<SearchBar className="w-full max-w-none" />

					{/* Row 3: store + ship-to */}
					<div className="flex w-[calc(100%+32px)] -mx-4 overflow-hidden rounded-none bg-[#E9E9E9] md:w-full md:mx-0 md:rounded-[16px]">
						<div className="flex min-w-0 flex-1 border-r border-[#c7c7c7]">
							<StoreSelector
								selected={store}
								onSelect={setStore}
								className="h-[58px] w-full max-w-none rounded-none bg-transparent px-[14px] md:rounded-[16px]"
							/>
						</div>
						<div className="flex min-w-0 flex-1">
							<ShippingAddressSelector
								selected={shipTo}
								onSelect={setShipTo}
								className="h-[58px] w-full max-w-none rounded-none bg-transparent px-[14px] md:rounded-[16px]"
							/>
						</div>
					</div>
				</>
			) : (
				<>
					{/* Row 2: auth buttons, full width */}
					<div className="flex items-center gap-2">
						<PrimaryButton
							href={withRedirect(ROUTES.login, pathname)}
							className="flex-1"
						>
							Login
						</PrimaryButton>
						<SecondaryButton
							href={withRedirect(ROUTES.register, pathname)}
							className="flex-1"
						>
							Create Account
						</SecondaryButton>
					</div>

					{/* Row 3: search bar, full width */}
					<SearchBar className="w-full max-w-none" />
				</>
			)}
		</div>
	);
}
