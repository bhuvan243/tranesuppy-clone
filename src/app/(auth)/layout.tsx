import Link from "next/link";
import { ROUTES } from "@/constants/routes";

/** Chrome-free shell for login/register: just the logo (linking home) and
 * the page content, centered - no header, no footer, no nav. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-surface-hover/40">
      <div className="section-inner w-full py-6">
        <Link href={ROUTES.home} className="inline-flex text-lg font-bold text-text-primary">
          HVAC<span className="text-accent">Direct</span>
        </Link>
      </div>
      <div className="flex flex-1 items-start justify-center px-4 pb-16">
        <div className="w-full max-w-4xl rounded-lg border border-border-divider bg-white p-6 md:p-10 shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
}
