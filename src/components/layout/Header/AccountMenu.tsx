"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/icons/Icon";
import { useAuth, getInitials, isAdminUser } from "@/context/AuthContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

export function AccountMenu() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const isAdmin = isAdminUser(user);
	useClickOutside(ref, () => setOpen(false), open);

	if (!user) return null;

	function handleLogout() {
		logout();
		setOpen(false);
		router.push(ROUTES.home);
	}

	const menuItems: Array<{
		label: string;
		icon: IconName;
		onClick?: () => void;
	}> = [
		{ label: "My Account", icon: "user" },
		...(isAdmin ? [{ label: "Manage Users", icon: "user" as const }] : []),
		{
			label: "My Orders",
			icon: "clipboard",
			onClick: () => router.push(ROUTES.orders),
		},
		{ label: "My Quotes", icon: "clipboard" },
		{ label: "My Saved Carts", icon: "cart" },
		{ label: "My Job Lists", icon: "bookmark" },
		{ label: "My Stocking Lists", icon: "briefcase" },
		{ label: "Change Password", icon: "lock" },
	];

	return (
		<div ref={ref} className="relative shrink-0">
			<div
				className="flex items-center h-11 rounded-[12px] bg-[#490747] py-[3px] pr-[3px]"
				onClick={() => setOpen((prev) => !prev)}
			>
				<button
					type="button"
					aria-haspopup="menu"
					aria-expanded={open}
					aria-label="Account menu"
					className={cn(
						"flex items-center justify-center h-7 px-2.5 text-[14px] font-semibold text-white transition-colors leading-5",
					)}
				>
					{getInitials(user.name)}
				</button>
				<button
					type="button"
					aria-label="Toggle company view"
					className={cn(
						"flex items-center justify-center h-[38px] w-[41.5px] rounded-[10px] bg-[#EAF1FE] p-2 transition-colors text-account-icon",
					)}
				>
					<Icon name="building" className="w-5 h-5" />
				</button>
			</div>

			{open && (
				<>
					<div
						className="account-menu-backdrop"
						onClick={() => setOpen(false)}
					/>
					<div
						role="menu"
						className="account-menu"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="account-menu-inner">
							<div className="account-menu-profile">
								<span className="account-menu-avatar">
									{getInitials(user.name)}
								</span>
								<div className="account-menu-profile-copy">
									<div className="account-menu-name-row">
										<p className="text-[16px] font-medium">
											{user.name}
										</p>
									</div>
									<p className="text-[14px] text-muted-foreground">
										{user.accountName || user.company}
									</p>
									{isAdmin && (
										<span className="account-menu-role">
											Admin
										</span>
									)}
								</div>
								<button
									type="button"
									onClick={() => setOpen(false)}
									aria-label="Close account menu"
									className="account-menu-close"
								>
									<Icon name="close" className="h-5 w-5" />
								</button>
							</div>
							<div className="account-menu-divider" />
							<div className="account-menu-items">
								{menuItems.map(
									({ label, icon: menuIcon, onClick }) => (
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
											<Icon
												name={menuIcon}
												className="h-[18px] w-[18px]"
											/>
											<span>{label}</span>
										</button>
									),
								)}
							</div>
						</div>
						<div className="account-menu-footer">
							<div className="account-menu-divider" />
							<button
								type="button"
								onClick={handleLogout}
								role="menuitem"
								className="account-menu-item account-menu-logout"
							>
								<Icon
									name="logout"
									className="h-[25px] w-[25px]"
								/>
								Log Out
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
