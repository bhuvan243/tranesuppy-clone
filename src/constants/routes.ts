import type { CategoryNode } from "@/types/category";

export const ROUTES = {
  home: "/",
  categorySummary: "/categorysummary",
  storeLocator: "/store-locator",
  helpCenter: "/help-center",
  contactUs: "/contact-us",
  login: "/login",
  createAccount: "/create-account",
  plp: "/plp",
  upl: "/upl",
  checkout: "/checkout",
  orders: "/orders",
  pdp: (id: string) => `/pdp/${id}`,
};

/** camelCase selection key used on the category summary page, e.g. partsAndSupplies */
export function toSelectionKey(id: string): string {
  return id
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

/**
 * Builds the URL for any node in the category tree given the chain of
 * slugs from the root down to that node (the "path" array).
 *
 *  level 1 -> /categorysummary?selection=partsAndSupplies
 *  level 2 -> /category/{l1}/{l2}/{listId}
 *  level 3 -> /category/{l1}/{l2}/{l3}/{listId}
 *  level 4 -> /category/{l1}/{l2}/{l3}/{l4}/{listId}
 */
export function buildCategoryHref(path: CategoryNode[]): string {
  if (path.length === 0) return ROUTES.categorySummary;

  if (path.length === 1) {
    return `${ROUTES.categorySummary}?selection=${toSelectionKey(path[0].id)}`;
  }

  const slugs = path.map((node) => node.slug);
  const leaf = path[path.length - 1];
  return `/category/${slugs.join("/")}/${leaf.listId ?? ""}`;
}
