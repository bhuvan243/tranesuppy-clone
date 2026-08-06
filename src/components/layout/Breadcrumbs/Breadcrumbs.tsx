import Link from "next/link";
import type { BreadcrumbItem } from "@/types/category";
import { Icon } from "@/components/icons/Icon";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** The H1 shown directly below the breadcrumb trail. Defaults to the last item's label. */
  title?: string;
}

export function Breadcrumbs({ items, title }: BreadcrumbsProps) {
  const heading = title ?? items[items.length - 1]?.label;

  return (
    <div className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-text-secondary">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <Icon name="chevron-right" className="w-3 h-3 text-text-muted" />
                )}
                {isLast || !item.href ? (
                  <span className="text-text-muted">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:font-semibold hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {heading && (
        <h1 className="mt-2 text-2xl md:text-3xl font-bold text-text-primary">{heading}</h1>
      )}
    </div>
  );
}
