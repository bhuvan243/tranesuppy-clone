"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES, withRedirect } from "@/constants/routes";
import { Icon } from "@/components/icons/Icon";
import { useAuth } from "@/context/AuthContext";

const SHOP_LINKS = [
  { label: "Shop By Category", href: ROUTES.categorySummary },
  { label: "Store Locator", href: ROUTES.storeLocator },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: ROUTES.helpCenter },
  { label: "Contact Us", href: ROUTES.contactUs },
  { label: "Orders", href: ROUTES.orders },
];

export function Footer() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className="section-shell bg-surface-footer border-t border-border-divider mt-auto">
      <div className="section-inner py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold text-text-primary">
              HVAC<span className="text-accent">Direct</span>
            </span>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-text-secondary">
              <Icon name="headset" className="w-4 h-4" />
              Support available Mon-Fri, 8am-6pm
            </p>
          </div>

          <FooterGroup heading="Shop" links={SHOP_LINKS} />
          <FooterGroup heading="Support" links={SUPPORT_LINKS} />

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-primary">
              Account
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {user ? (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      router.push(ROUTES.home);
                    }}
                    className="text-[14px] text-text-secondary hover:text-accent hover:underline"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href={withRedirect(ROUTES.login, pathname)}
                      className="text-[14px] text-text-secondary hover:text-accent hover:underline"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={withRedirect(ROUTES.register, pathname)}
                      className="text-[14px] text-text-secondary hover:text-accent hover:underline"
                    >
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-divider pt-6 text-[13px] text-text-muted">
          © {new Date().getFullYear()} HVACDirect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-primary">
        {heading}
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] text-text-secondary hover:text-accent hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
