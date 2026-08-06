"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { SearchBar } from "./SearchBar";
import { LanguageDropdown } from "./LanguageDropdown";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

interface MobileHeaderProps {
  onOpenMenu: () => void;
}

export function MobileHeader({ onOpenMenu }: MobileHeaderProps) {
  return (
    <div className="flex md:hidden flex-col gap-3 py-3">
      {/* Row 1: menu - logo - language */}
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

        <LanguageDropdown />
      </div>

      {/* Row 2: auth buttons, full width */}
      <div className="flex items-center gap-2">
        <PrimaryButton href={ROUTES.login} className="flex-1">
          Login
        </PrimaryButton>
        <SecondaryButton href={ROUTES.createAccount} className="flex-1">
          Create Account
        </SecondaryButton>
      </div>

      {/* Row 3: search bar, full width */}
      <SearchBar className="w-full max-w-none" />
    </div>
  );
}
