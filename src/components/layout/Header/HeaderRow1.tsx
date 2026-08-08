"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { HeaderInfoDropdown } from "./HeaderInfoDropdown";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { ROUTES, withRedirect } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";

const STORE_OPTIONS = ["Charlotte HVAC Supply", "Austin HVAC Supply", "Denver HVAC Supply"];
const SHIP_TO_OPTIONS = ["07058", "73301", "80202"];

/** Header row 1 for tablet & desktop. Guest mode: logo (320px) — search
 * (300-400px) — auth buttons. Logged-in mode swaps the auth buttons for the
 * store selector, ship-to selector, account chip, and cart. */
export function HeaderRow1() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [store, setStore] = useState(STORE_OPTIONS[0]);
  const [shipTo, setShipTo] = useState(user?.shipToZip ?? SHIP_TO_OPTIONS[0]);

  return (
    <div className="hidden md:flex items-center justify-between gap-4 h-[45px]">
      <Link
        href={ROUTES.home}
        className="flex shrink-0 items-center w-[180px] lg:w-[320px] h-[45px] text-lg font-bold text-text-primary"
      >
        HVAC<span className="text-accent">Direct</span>
      </Link>

      <div className="flex flex-1 justify-center">
        <SearchBar />
      </div>

      {user ? (
        <div className="flex shrink-0 items-center gap-3">
          <HeaderInfoDropdown
            icon="store"
            value={user.company}
            options={STORE_OPTIONS}
            selected={store}
            onSelect={setStore}
            className="hidden lg:block"
          />
          <span className="hidden lg:block w-px h-6 bg-border-divider" aria-hidden="true" />
          <HeaderInfoDropdown
            icon="pin"
            label="Ship to"
            value={shipTo}
            options={SHIP_TO_OPTIONS}
            selected={shipTo}
            onSelect={setShipTo}
          />
          <AccountMenu />
          <CartButton count={0} />
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-2">
          <PrimaryButton href={withRedirect(ROUTES.login, pathname)}>Login</PrimaryButton>

          <div className="relative h-[45px] w-px bg-border-default">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[13px] text-text-muted">
              or
            </span>
          </div>

          <SecondaryButton href={withRedirect(ROUTES.register, pathname)}>Create Account</SecondaryButton>
        </div>
      )}
    </div>
  );
}
