"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
            !companyView && "bg-white/10"
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
            companyView ? "text-account-icon" : "text-text-muted"
          )}
        >
          <Icon name="building" className="w-4 h-4" />
        </button>
      </div>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-64 rounded-md border border-border-divider bg-white shadow-lg py-2 z-30"
        >
          <div className="px-4 py-2 border-b border-border-divider">
            <p className="text-[14px] font-semibold text-text-primary">{user.name}</p>
            <p className="text-[13px] text-text-secondary text-ellipsis-line">{user.email}</p>
            <p className="mt-1 text-[13px] text-text-muted text-ellipsis-line">{user.company}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              router.push(ROUTES.orders);
              setOpen(false);
            }}
            role="menuitem"
            className="flex w-full items-center px-4 py-2 text-[14px] text-text-primary hover:bg-surface-hover transition-colors"
          >
            My Orders
          </button>
          <button
            type="button"
            onClick={handleLogout}
            role="menuitem"
            className="flex w-full items-center gap-2 px-4 py-2 text-[14px] text-accent hover:bg-surface-hover transition-colors"
          >
            <Icon name="logout" className="w-4 h-4" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
