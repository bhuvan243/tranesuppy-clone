"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { NAV_ITEMS } from "@/constants/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";
import { MegaMenu } from "./MegaMenu";
import { LanguageDropdown } from "./LanguageDropdown";

export function NavBar() {
  const pathname = usePathname();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const shopByCategoryRef = useRef<HTMLLIElement>(null);

  useClickOutside(shopByCategoryRef, () => setMegaMenuOpen(false), megaMenuOpen);

  return (
    <nav className="h-[50px] flex items-center justify-between border-b border-border-divider">
      <ul className="flex items-stretch h-full">
        {NAV_ITEMS.map((item) => {
          const isShopByCategory = item.label === "Shop By Category";
          const isActive = isShopByCategory
            ? pathname.startsWith("/categorysummary") || pathname.startsWith("/category")
            : pathname === item.href;

          if (isShopByCategory) {
            return (
              <li
                key={item.label}
                ref={shopByCategoryRef}
                className="relative h-full"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMegaMenuOpen((prev) => !prev)}
                  aria-expanded={megaMenuOpen}
                  className={cn(
                    "flex h-full items-center gap-1.5 px-4 text-[15px] font-semibold border-b-[3px] transition-colors",
                    isActive || megaMenuOpen
                      ? "text-accent border-accent"
                      : "border-transparent text-text-primary hover:text-accent hover:border-accent"
                  )}
                >
                  {item.label}
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      megaMenuOpen && "rotate-180"
                    )}
                  />
                </button>
                {megaMenuOpen && <MegaMenu onNavigate={() => setMegaMenuOpen(false)} />}
              </li>
            );
          }

          return (
            <li key={item.label} className="h-full">
              <Link
                href={item.href}
                className={cn(
                  "flex h-full items-center px-4 text-[15px] font-semibold border-b-[3px] transition-colors",
                  isActive
                    ? "text-accent border-accent"
                    : "border-transparent text-text-primary hover:text-accent hover:border-accent"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center h-full pl-4">
        <span className="hidden md:block w-px h-6 bg-border-divider mr-4" aria-hidden="true" />
        <LanguageDropdown />
      </div>
    </nav>
  );
}
