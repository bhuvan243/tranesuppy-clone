/**
 * A single node in the "Shop By Category" hierarchy.
 *
 * Level map:
 *  1 - top row items in the mega menu (Parts & Supplies, Residential Equipment, Commercial Equipment)
 *  2 - column 1 list items (children of a level 1 item)
 *  3 - column 2 list items (children of a level 2 item)
 *  4 - column 3 list items (children of a level 3 item) - leaf level, no further children
 */
export interface CategoryNode {
  id: string;
  label: string;
  /** Slug segment used to build the readable part of the URL. */
  slug: string;
  /** Icon key, only present on level 1 items. */
  icon?: string;
  /** The fixed product-list id supplied by the server for levels 2-4. */
  listId?: string;
  children?: CategoryNode[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
