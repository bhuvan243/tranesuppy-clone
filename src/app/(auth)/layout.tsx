import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import { Header } from "@/components/layout/Header/Header";

/** Chrome-free shell for login/register: just the logo (linking home) and
 * the page content, centered - no header, no footer, no nav. */
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="auth-route-shell">
			<div className="auth-site-header">
				<Header />
			</div>
			<main className="auth-shell flex min-h-screen flex-col bg-surface-hover/40">
				<div className="auth-brand section-inner w-full py-6">
					<Link
						href={ROUTES.home}
						className="inline-flex text-lg font-bold text-text-primary"
					>
						<Image
							src="/images/traneSupplyHeaderLogo.png"
							alt="TraneSupply logo"
							width={131}
							height={31}
						/>
					</Link>
				</div>
				<div className="flex flex-1 items-start justify-center px-4 pb-16">
					<div className="auth-card w-full max-w-4xl rounded-lg border border-border-divider bg-white p-6 shadow-sm md:p-10">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
