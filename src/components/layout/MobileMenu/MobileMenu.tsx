"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { getMobileNavRoot, type MobileNavNode } from "@/utils/mobileNav";
import { useAuth, getInitials } from "@/context/AuthContext";
import { ROUTES, withRedirect } from "@/constants/routes";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

interface MenuLevel {
  title?: string;
  items: MobileNavNode[];
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [stack, setStack] = useState<MenuLevel[]>(() => [{ items: getMobileNavRoot(!!user) }]);

  // Reset the drill-down position each time the drawer transitions to open.
  // Adjusting state during render (React's recommended pattern for this)
  // avoids the extra render a useEffect-based reset would cause.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setStack([{ items: getMobileNavRoot(!!user) }]);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const currentLevel = stack[stack.length - 1];

  function goBack() {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  function handleDrillDown(node: MobileNavNode) {
    if (!node.children?.length) return;
    setStack((prev) => [...prev, { title: node.label, items: node.children! }]);
  }

  function handleLabelClick(node: MobileNavNode) {
    if (node.children?.length) {
      // Navigate in the background and drill down at the same time.
      router.push(node.href);
      handleDrillDown(node);
    } else {
      router.push(node.href);
      onClose();
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between border-b border-border-divider px-4 py-3">
          {stack.length > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-[14px] font-semibold text-text-primary"
            >
              <Icon name="chevron-left" className="w-4 h-4" />
              Go back
            </button>
          ) : (
            <span className="text-[15px] font-bold">Menu</span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-8 h-8 text-text-primary"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {currentLevel.title && (
          <div className="px-4 pt-3 text-[13px] font-bold uppercase tracking-wide text-text-secondary">
            {currentLevel.title}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="flex flex-col">
            {currentLevel.items.map((node) => {
              const hasChildren = !!node.children?.length;
              return (
                <li key={node.id} className="border-b border-border-divider/60">
                  <div className="flex items-stretch">
                    <button
                      type="button"
                      onClick={() => handleLabelClick(node)}
                      className="flex-1 text-left px-3 py-3 text-[15px] font-medium text-text-primary hover:bg-surface-hover transition-colors"
                    >
                      {node.label}
                    </button>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => handleDrillDown(node)}
                        aria-label={`Show ${node.label} options`}
                        className="flex items-center justify-center w-11 text-text-secondary hover:text-accent hover:bg-surface-hover transition-colors"
                      >
                        <Icon name="chevron-right" className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Account section - only shown at the root level */}
        {stack.length === 1 && (
          <div className="border-t border-border-divider p-4">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-account-pill text-[12px] font-bold text-white">
                    {getInitials(user.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-text-primary text-ellipsis-line">
                      {user.name}
                    </p>
                    <p className="text-[12px] text-text-muted text-ellipsis-line">{user.company}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                    router.push(ROUTES.home);
                  }}
                  className="shrink-0 text-[13px] font-semibold text-accent"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <PrimaryButton href={withRedirect(ROUTES.login, pathname)} onClick={onClose} className="flex-1">
                  Login
                </PrimaryButton>
                <SecondaryButton href={withRedirect(ROUTES.register, pathname)} onClick={onClose} className="flex-1">
                  Create Account
                </SecondaryButton>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
