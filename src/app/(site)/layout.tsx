import { Header } from "@/components/layout/Header/Header";

/** Every "normal" page (home, category pages, orders, checkout, etc.) gets
 * the full site chrome via this route-group layout. Auth pages opt out by
 * living in the sibling (auth) group instead. */
export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main className="section-shell flex-1">
				<div className="section-inner py-6">{children}</div>
			</main>
		</>
	);
}
