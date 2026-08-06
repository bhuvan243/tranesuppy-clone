import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

/** Guest-mode header row 1 for tablet & desktop: logo (fixed 320px) — search
 * (max 400px, min 300px) — auth buttons, all space-between with a 16px gap. */
export function HeaderRow1() {
  return (
    <div className="hidden md:flex items-center justify-between gap-4 h-[45px]">
      <Link
        href={ROUTES.home}
        className="flex shrink-0 items-center w-[320px] h-[45px] text-lg font-bold text-text-primary"
      >
        HVAC<span className="text-accent">Direct</span>
      </Link>

      <div className="flex flex-1 justify-center">
        <SearchBar />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <PrimaryButton href={ROUTES.login}>Login</PrimaryButton>

        <div className="relative h-[45px] w-px bg-border-default">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[13px] text-text-muted">
            or
          </span>
        </div>

        <SecondaryButton href={ROUTES.createAccount}>Create Account</SecondaryButton>
      </div>
    </div>
  );
}
