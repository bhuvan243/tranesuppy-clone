"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { SearchBar } from "./SearchBar";
import { LanguageDropdown } from "./LanguageDropdown";
import { HeaderInfoDropdown } from "./HeaderInfoDropdown";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { ROUTES, withRedirect } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";

const STORE_OPTIONS = ["Charlotte HVAC Supply", "Austin HVAC Supply", "Denver HVAC Supply"];
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
      <div className="flex items-center justify-between h-[45px]">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex items-center justify-center w-9 h-9 text-text-primary"
        >
          <Icon name="menu" className="w-6 h-6" />
        </button>

        <Link href={ROUTES.home} className="text-lg font-bold text-text-primary">
          HVAC<span className="text-accent">Direct</span>
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
          <div className="flex items-center justify-between gap-3">
            <HeaderInfoDropdown
              icon="store"
              value={store}
              options={STORE_OPTIONS}
              selected={store}
              onSelect={setStore}
              className="min-w-0 flex-1"
            />
            <span className="h-6 w-px shrink-0 bg-border-divider" aria-hidden="true" />
            <HeaderInfoDropdown
              icon="pin"
              label="Ship to"
              value={shipTo}
              options={SHIP_TO_OPTIONS}
              selected={shipTo}
              onSelect={setShipTo}
              className="min-w-0 flex-1"
            />
          </div>
        </>
      ) : (
        <>
          {/* Row 2: auth buttons, full width */}
          <div className="flex items-center gap-2">
            <PrimaryButton href={withRedirect(ROUTES.login, pathname)} className="flex-1">
              Login
            </PrimaryButton>
            <SecondaryButton href={withRedirect(ROUTES.register, pathname)} className="flex-1">
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
