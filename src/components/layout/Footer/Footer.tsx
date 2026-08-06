import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Icon } from "@/components/icons/Icon";

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "Shop By Category", href: ROUTES.categorySummary },
      { label: "Store Locator", href: ROUTES.storeLocator },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: ROUTES.helpCenter },
      { label: "Contact Us", href: ROUTES.contactUs },
      { label: "Orders", href: ROUTES.orders },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login", href: ROUTES.login },
      { label: "Create Account", href: ROUTES.createAccount },
    ],
  },
];

export function Footer() {
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

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-primary">
                {group.heading}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-10 border-t border-border-divider pt-6 text-[13px] text-text-muted">
          © {new Date().getFullYear()} HVACDirect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
