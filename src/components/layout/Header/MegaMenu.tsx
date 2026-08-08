"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { CATEGORY_TREE } from "@/constants/navigation";
import { buildCategoryHref, toSelectionKey, ROUTES } from "@/constants/routes";
import type { CategoryNode } from "@/types/category";
import type { IconName } from "@/components/icons/Icon";
import { cn } from "@/utils/cn";

interface MegaMenuProps {
  onNavigate: () => void;
}

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const [activeL1Id, setActiveL1Id] = useState(CATEGORY_TREE[0].id);
  const [activeL2Id, setActiveL2Id] = useState<string | undefined>(
    CATEGORY_TREE[0].children?.[0]?.id
  );
  const [activeL3Id, setActiveL3Id] = useState<string | undefined>(
    CATEGORY_TREE[0].children?.[0]?.children?.[0]?.id
  );

  const activeL1 = useMemo(
    () => CATEGORY_TREE.find((n) => n.id === activeL1Id) ?? CATEGORY_TREE[0],
    [activeL1Id]
  );
  const col1Items = useMemo(() => activeL1.children ?? [], [activeL1]);
  const activeL2 = useMemo(
    () => col1Items.find((n) => n.id === activeL2Id),
    [col1Items, activeL2Id]
  );
  const col2Items = useMemo(() => activeL2?.children ?? [], [activeL2]);
  const activeL3 = useMemo(
    () => col2Items.find((n) => n.id === activeL3Id),
    [col2Items, activeL3Id]
  );
  const col3Items = useMemo(() => activeL3?.children ?? [], [activeL3]);

  function selectL1(node: CategoryNode) {
    setActiveL1Id(node.id);
    setActiveL2Id(node.children?.[0]?.id);
    setActiveL3Id(node.children?.[0]?.children?.[0]?.id);
  }

  function selectL2(node: CategoryNode) {
    setActiveL2Id(node.id);
    setActiveL3Id(node.children?.[0]?.id);
  }

  function selectL3(node: CategoryNode) {
    setActiveL3Id(node.id);
  }

  return (
    <div className="absolute left-0 top-full z-30 w-full max-w-[1200px] rounded-b-md border border-t-0 border-border-divider bg-white shadow-xl">
      {/* Top row: 3 level-1 categories */}
      <div className="flex flex-wrap items-stretch gap-2 border-b border-border-divider px-6 py-3">
        {CATEGORY_TREE.map((node) => (
          <button
            key={node.id}
            type="button"
            onMouseEnter={() => selectL1(node)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-md px-4 py-2.5 text-[15px] font-semibold whitespace-nowrap transition-colors",
              activeL1Id === node.id
                ? "bg-surface-hover text-accent"
                : "text-text-primary hover:bg-surface-hover hover:text-accent"
            )}
          >
            {node.icon && <Icon name={node.icon as IconName} className="w-5 h-5" />}
            <Link
              href={`${ROUTES.categorySummary}?selection=${toSelectionKey(node.id)}`}
              onClick={onNavigate}
              className="hover:underline"
            >
              {node.label}
            </Link>
            <Icon name="chevron-down" className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>

      {/* 3 cascading columns - always equal width; text wraps instead of
          shrinking/expanding, which is what caused the flicker on narrow
          viewports (rapid mouseenter/mouseleave loops as columns resized
          under the cursor). */}
      <div className="flex h-[430px] divide-x divide-border-divider">
        <MenuColumn
          title={activeL1.label}
          items={col1Items}
          activeId={activeL2Id}
          path={[activeL1]}
          onHoverItem={selectL2}
          onNavigate={onNavigate}
        />
        <MenuColumn
          title={activeL2?.label}
          items={col2Items}
          activeId={activeL3Id}
          path={activeL2 ? [activeL1, activeL2] : []}
          onHoverItem={selectL3}
          onNavigate={onNavigate}
        />
        <MenuColumn
          title={activeL3?.label}
          items={col3Items}
          activeId={undefined}
          path={activeL3 ? [activeL1, activeL2!, activeL3] : []}
          onNavigate={onNavigate}
          isLeafColumn
        />
      </div>
    </div>
  );
}

interface MenuColumnProps {
  title?: string;
  items: CategoryNode[];
  activeId?: string;
  path: CategoryNode[];
  onHoverItem?: (node: CategoryNode) => void;
  onNavigate: () => void;
  isLeafColumn?: boolean;
}

function MenuColumn({
  title,
  items,
  activeId,
  path,
  onHoverItem,
  onNavigate,
  isLeafColumn,
}: MenuColumnProps) {
  return (
    <div className="flex flex-1 basis-0 min-w-0 flex-col overflow-y-auto px-4 py-4">
      {title && (
        <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide underline underline-offset-2 text-text-primary">
          {title}
        </h3>
      )}
      <ul className="flex flex-col gap-0.5">
        {items.map((node) => {
          const hasChildren = !!node.children?.length;
          const href = buildCategoryHref([...path, node]);
          const isActive = activeId === node.id;
          return (
            <li key={node.id}>
              <Link
                href={href}
                onClick={onNavigate}
                onMouseEnter={() => !isLeafColumn && onHoverItem?.(node)}
                onFocus={() => !isLeafColumn && onHoverItem?.(node)}
                className={cn(
                  "group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-[14px] transition-colors hover:bg-surface-hover hover:font-semibold",
                  isActive && "bg-surface-hover font-semibold"
                )}
              >
                <span className="break-words">{node.label}</span>
                {hasChildren && (
                  <Icon
                    name="chevron-right"
                    className={cn(
                      "w-3.5 h-3.5 shrink-0 text-text-muted group-hover:text-accent",
                      isActive && "text-accent"
                    )}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
