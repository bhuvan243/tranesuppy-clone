"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
	Bookmark,
	BriefcaseBusiness,
	ClipboardList,
	LockKeyhole,
	LogOut,
	Package,
	ShoppingCart,
	UserRound,
} from "lucide-react";
import { Icon } from "@/components/icons/Icon";
import { useAuth, getInitials } from "@/context/AuthContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

export function AccountMenu() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [companyView, setCompanyView] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, () => setOpen(false), open);

	if (!user) return null;

	function handleLogout() {
		logout();
		setOpen(false);
		router.push(ROUTES.home);
	}

	const menuItems = [
		{ label: "My Account", icon: UserRound },
		{
			label: "My Orders",
			icon: Package,
			onClick: () => router.push(ROUTES.orders),
		},
		{ label: "My Quotes", icon: ClipboardList },
		{ label: "My Saved Carts", icon: ShoppingCart },
		{ label: "My Job Lists", icon: Bookmark },
		{ label: "My Stocking Lists", icon: BriefcaseBusiness },
		{ label: "Change Password", icon: LockKeyhole },
	];

	return (
		<div ref={ref} className="relative shrink-0">
			<div className="flex items-center h-9 rounded-full bg-account-pill p-1 gap-1">
				<button
					type="button"
					onClick={() => setOpen((prev) => !prev)}
					aria-haspopup="menu"
					aria-expanded={open}
					aria-label="Account menu"
					className={cn(
						"flex items-center justify-center h-7 px-2.5 rounded-full text-[13px] font-bold text-white transition-colors",
						!companyView && "bg-white/10",
					)}
				>
					{getInitials(user.name)}
				</button>
				<button
					type="button"
					onClick={() => setCompanyView((prev) => !prev)}
					aria-label="Toggle company view"
					aria-pressed={companyView}
					className={cn(
						"flex items-center justify-center h-7 w-7 rounded-full bg-white transition-colors",
						companyView ? "text-account-icon" : "text-text-muted",
					)}
				>
					<Icon name="building" className="w-4 h-4" />
				</button>
			</div>

			{open && (
				<div
					role="menu"
					className="account-menu absolute right-0 top-full z-30 mt-3 w-82.5 rounded-[22px] border border-[#dedede] bg-white p-3 shadow-[0_3px_10px_rgba(0,0,0,0.16)]"
				>
					<div className="account-menu-profile">
						<span className="account-menu-avatar">
							{getInitials(user.name)}
						</span>
						<p>{user.name}</p>
					</div>
					<div className="account-menu-divider" />
					<div className="account-menu-items">
						{menuItems.map(({ label, icon: MenuIcon, onClick }) => (
							<button
								key={label}
								type="button"
								onClick={() => {
									onClick?.();
									setOpen(false);
								}}
								role="menuitem"
								className="account-menu-item"
							>
								<MenuIcon
									size={24}
									strokeWidth={2.5}
									aria-hidden="true"
								/>
								<span>{label}</span>
							</button>
						))}
					</div>
					<div className="account-menu-divider" />
					<button
						type="button"
						onClick={handleLogout}
						role="menuitem"
						className="account-menu-item account-menu-logout"
					>
						<LogOut
							size={25}
							strokeWidth={2.5}
							aria-hidden="true"
						/>
						Log Out
					</button>
				</div>
			)}
		</div>
	);
}
