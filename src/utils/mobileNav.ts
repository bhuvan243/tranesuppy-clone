import {
	CATEGORY_TREE,
	NAV_ITEMS,
	LOGGED_IN_NAV_ITEMS,
} from "@/constants/navigation";
import { buildCategoryHref, ROUTES, toSelectionKey } from "@/constants/routes";
import type { IconName } from "@/components/icons/Icon";
import type { CategoryNode } from "@/types/category";

export interface MobileNavNode {
	id: string;
	label: string;
	href: string;
	icon?: IconName;
	children?: MobileNavNode[];
}

function categoryNodeToMobileNav(
	node: CategoryNode,
	path: CategoryNode[],
): MobileNavNode {
	const fullPath = [...path, node];
	return {
		id: node.id,
		label: node.label,
		icon: node.icon as IconName | undefined,
		href:
			fullPath.length === 1
				? `${ROUTES.categorySummary}?selection=${toSelectionKey(node.id)}`
				: buildCategoryHref(fullPath),
		children: node.children?.map((child) =>
			categoryNodeToMobileNav(child, fullPath),
		),
	};
}

/** Builds the root list shown when the mobile drawer first opens: the main
 * nav tabs (plus Supplier Directory once logged in), with "Shop By
 * Category" expanded into the full category tree. */
export function getMobileNavRoot(isLoggedIn: boolean): MobileNavNode[] {
	const items = isLoggedIn ? LOGGED_IN_NAV_ITEMS : NAV_ITEMS;
	const icons: Record<string, IconName> = {
		Home: "home-equipment",
		"Shop By Category": "briefcase",
		"Store Locator": "store",
		"Help Center": "help",
		"Contact Us": "headset",
		"Supplier Directory": "briefcase",
	};

	return items.map((item) => {
		if (item.label === "Shop By Category") {
			return {
				id: "shop-by-category",
				label: item.label,
				href: item.href,
				icon: icons[item.label],
				children: CATEGORY_TREE.map((node) =>
					categoryNodeToMobileNav(node, []),
				),
			};
		}
		return {
			id: item.label,
			label: item.label,
			href: item.href,
			icon: icons[item.label],
		};
	});
}
