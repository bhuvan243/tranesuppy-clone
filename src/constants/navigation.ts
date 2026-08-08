import type { CategoryNode } from "@/types/category";

/**
 * Primary nav tabs shown in header row 2.
 * "Shop By Category" is special-cased in the component (mega menu + chevron).
 */
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop By Category", href: "/categorysummary" },
  { label: "Store Locator", href: "/store-locator" },
  { label: "Help Center", href: "/help-center" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/** Extra tab shown only once the user is logged in, appended after Contact Us. */
export const LOGGED_IN_NAV_ITEMS = [
  ...NAV_ITEMS,
  { label: "Supplier Directory", href: "/supplier-directory" },
] as const;

export const LANGUAGES = [
  { code: "en", label: "English", short: "ENG" },
  { code: "fr", label: "Français", short: "FRA" },
  { code: "es", label: "Español", short: "ESP" },
] as const;

/**
 * Rotating half of the search bar placeholder. The static prefix
 * "Search by " is rendered separately in <SearchBar />.
 */
export const SEARCH_PLACEHOLDER_SUFFIXES = [
  "Model/Serial Number",
  "Commercial Sales Order",
  "Description",
  "Attributes",
  "Drawing Number",
  "Vendor Part Number",
];

export const SEARCH_PLACEHOLDER_INTERVAL_MS = 800;

/**
 * Shop By Category tree.
 * Level 1  -> top row (icon + chevron)
 * Level 2  -> mega menu column 1
 * Level 3  -> mega menu column 2
 * Level 4  -> mega menu column 3 (leaf, no chevron ever)
 * A level 2 or level 3 item with no `children` is itself a leaf and
 * renders without a chevron.
 */
export const CATEGORY_TREE: CategoryNode[] = [
  {
    id: "parts-and-supplies",
    label: "Parts & Supplies",
    slug: "parts-supplies",
    icon: "parts",
    children: [
      {
        id: "replacement-coils",
        label: "Replacement Coils",
        slug: "replacement-coils",
        listId: "ABCD1234555",
        children: [
          {
            id: "residential-replacement-coils",
            label: "Residential Replacement Coils",
            slug: "residential-replacement-coils",
            listId: "SGHYYU828392S",
            children: [
              {
                id: "condenser-coils",
                label: "Condenser Coils",
                slug: "condenser-coils",
                listId: "UIHJ77899HJ789H",
              },
              {
                id: "evaporator-coils",
                label: "Evaporator Coils",
                slug: "evaporator-coils",
                listId: "UIHJ77899HJ790H",
              },
            ],
          },
          {
            id: "commercial-replacement-coils",
            label: "Commercial Replacement Coils",
            slug: "commercial-replacement-coils",
            listId: "SGHYYU828393S",
            children: [
              {
                id: "commercial-condenser-coils",
                label: "Condenser Coils",
                slug: "condenser-coils",
                listId: "UIHJ77899HJ791H",
              },
              {
                id: "commercial-evaporator-coils",
                label: "Evaporator Coils",
                slug: "evaporator-coils",
                listId: "UIHJ77899HJ792H",
              },
            ],
          },
        ],
      },
      {
        id: "filters-and-accessories",
        label: "Filters & Accessories",
        slug: "filters-accessories",
        listId: "ABCD1234556",
        children: [
          {
            id: "air-filters",
            label: "Air Filters",
            slug: "air-filters",
            listId: "SGHYYU828394S",
            children: [
              {
                id: "pleated-filters",
                label: "Pleated Filters",
                slug: "pleated-filters",
                listId: "UIHJ77899HJ793H",
              },
              {
                id: "washable-filters",
                label: "Washable Filters",
                slug: "washable-filters",
                listId: "UIHJ77899HJ794H",
              },
            ],
          },
          {
            id: "humidifier-pads",
            label: "Humidifier Pads",
            slug: "humidifier-pads",
            listId: "SGHYYU828395S",
            // Leaf at level 3 - no children, no chevron.
          },
        ],
      },
      {
        id: "motors-and-blowers",
        label: "Motors & Blowers",
        slug: "motors-blowers",
        listId: "ABCD1234557",
        // Leaf at level 2 - no children, no chevron.
      },
    ],
  },
  {
    id: "residential-equipment",
    label: "Residential Equipment",
    slug: "residential-equipment",
    icon: "home-equipment",
    children: [
      {
        id: "furnaces",
        label: "Furnaces",
        slug: "furnaces",
        listId: "ABCD1234560",
        children: [
          {
            id: "gas-furnaces",
            label: "Gas Furnaces",
            slug: "gas-furnaces",
            listId: "SGHYYU828400S",
            children: [
              {
                id: "single-stage-gas-furnaces",
                label: "Single-Stage Gas Furnaces",
                slug: "single-stage-gas-furnaces",
                listId: "UIHJ77899HJ800H",
              },
              {
                id: "two-stage-gas-furnaces",
                label: "Two-Stage Gas Furnaces",
                slug: "two-stage-gas-furnaces",
                listId: "UIHJ77899HJ801H",
              },
            ],
          },
          {
            id: "electric-furnaces",
            label: "Electric Furnaces",
            slug: "electric-furnaces",
            listId: "SGHYYU828401S",
          },
        ],
      },
      {
        id: "heat-pumps",
        label: "Heat Pumps",
        slug: "heat-pumps",
        listId: "ABCD1234561",
        children: [
          {
            id: "split-system-heat-pumps",
            label: "Split System Heat Pumps",
            slug: "split-system-heat-pumps",
            listId: "SGHYYU828402S",
            children: [
              {
                id: "single-stage-heat-pumps",
                label: "Single-Stage Units",
                slug: "single-stage-units",
                listId: "UIHJ77899HJ802H",
              },
              {
                id: "variable-speed-heat-pumps",
                label: "Variable-Speed Units",
                slug: "variable-speed-units",
                listId: "UIHJ77899HJ803H",
              },
            ],
          },
          {
            id: "packaged-heat-pumps",
            label: "Packaged Heat Pumps",
            slug: "packaged-heat-pumps",
            listId: "SGHYYU828403S",
          },
        ],
      },
      {
        id: "thermostats",
        label: "Thermostats",
        slug: "thermostats",
        listId: "ABCD1234562",
      },
    ],
  },
  {
    id: "commercial-equipment",
    label: "Commercial Equipment",
    slug: "commercial-equipment",
    icon: "commercial-equipment",
    children: [
      {
        id: "rooftop-units",
        label: "Rooftop Units",
        slug: "rooftop-units",
        listId: "ABCD1234570",
        children: [
          {
            id: "packaged-rtus",
            label: "Packaged RTUs",
            slug: "packaged-rtus",
            listId: "SGHYYU828410S",
            children: [
              {
                id: "constant-volume-rtus",
                label: "Constant Volume",
                slug: "constant-volume",
                listId: "UIHJ77899HJ810H",
              },
              {
                id: "variable-air-volume-rtus",
                label: "Variable Air Volume",
                slug: "variable-air-volume",
                listId: "UIHJ77899HJ811H",
              },
            ],
          },
          {
            id: "modular-rtus",
            label: "Modular RTUs",
            slug: "modular-rtus",
            listId: "SGHYYU828411S",
          },
        ],
      },
      {
        id: "chillers",
        label: "Chillers",
        slug: "chillers",
        listId: "ABCD1234571",
        children: [
          {
            id: "air-cooled-chillers",
            label: "Air-Cooled Chillers",
            slug: "air-cooled-chillers",
            listId: "SGHYYU828412S",
            children: [
              {
                id: "scroll-chillers",
                label: "Scroll Compressor",
                slug: "scroll-compressor",
                listId: "UIHJ77899HJ812H",
              },
              {
                id: "screw-chillers",
                label: "Screw Compressor",
                slug: "screw-compressor",
                listId: "UIHJ77899HJ813H",
              },
            ],
          },
          {
            id: "water-cooled-chillers",
            label: "Water-Cooled Chillers",
            slug: "water-cooled-chillers",
            listId: "SGHYYU828413S",
          },
        ],
      },
      {
        id: "controls-and-automation",
        label: "Controls & Automation",
        slug: "controls-automation",
        listId: "ABCD1234572",
      },
    ],
  },
];
