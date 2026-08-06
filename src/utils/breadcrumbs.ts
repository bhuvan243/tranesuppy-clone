import { CATEGORY_TREE } from "@/constants/navigation";
import { buildCategoryHref } from "@/constants/routes";
import type { BreadcrumbItem, CategoryNode } from "@/types/category";

/**
 * Depth-first search that returns the chain of nodes from the root down
 * to the node matching `listId` (or `id` as a fallback for level 1).
 */
function findPath(
  nodes: CategoryNode[],
  predicate: (node: CategoryNode) => boolean,
  trail: CategoryNode[] = []
): CategoryNode[] | null {
  for (const node of nodes) {
    const nextTrail = [...trail, node];
    if (predicate(node)) return nextTrail;
    if (node.children) {
      const found = findPath(node.children, predicate, nextTrail);
      if (found) return found;
    }
  }
  return null;
}

/** Builds "Home > Shop By Category > ... > Current" breadcrumbs for a category listId. */
export function getCategoryBreadcrumbs(listId: string): BreadcrumbItem[] {
  const path = findPath(CATEGORY_TREE, (node) => node.listId === listId);

  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Shop By Category", href: "/categorysummary" },
  ];

  if (!path) return items;

  path.forEach((node, index) => {
    const isLast = index === path.length - 1;
    const subPath = path.slice(0, index + 1);
    items.push({
      label: node.label,
      href: isLast ? undefined : buildCategoryHref(subPath),
    });
  });

  return items;
}

/** Breadcrumbs for the top level "/categorysummary" page or a level-1 selection. */
export function getSummaryBreadcrumbs(selectionLabel?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Shop By Category", href: selectionLabel ? "/categorysummary" : undefined },
  ];
  if (selectionLabel) {
    items.push({ label: selectionLabel });
  }
  return items;
}
