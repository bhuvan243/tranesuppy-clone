import { CATEGORY_TREE, NAV_ITEMS } from "@/constants/navigation";
import { buildCategoryHref, ROUTES, toSelectionKey } from "@/constants/routes";
import type { CategoryNode } from "@/types/category";

export interface MobileNavNode {
  id: string;
  label: string;
  href: string;
  children?: MobileNavNode[];
}

function categoryNodeToMobileNav(node: CategoryNode, path: CategoryNode[]): MobileNavNode {
  const fullPath = [...path, node];
  return {
    id: node.id,
    label: node.label,
    href:
      fullPath.length === 1
        ? `${ROUTES.categorySummary}?selection=${toSelectionKey(node.id)}`
        : buildCategoryHref(fullPath),
    children: node.children?.map((child) => categoryNodeToMobileNav(child, fullPath)),
  };
}

/** Builds the root list shown when the mobile drawer first opens: the main
 * nav tabs, with "Shop By Category" expanded into the full category tree. */
export function getMobileNavRoot(): MobileNavNode[] {
  return NAV_ITEMS.map((item) => {
    if (item.label === "Shop By Category") {
      return {
        id: "shop-by-category",
        label: item.label,
        href: item.href,
        children: CATEGORY_TREE.map((node) => categoryNodeToMobileNav(node, [])),
      };
    }
    return { id: item.label, label: item.label, href: item.href };
  });
}
