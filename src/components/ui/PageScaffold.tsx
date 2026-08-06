import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/category";

interface PageScaffoldProps {
  breadcrumbs: BreadcrumbItem[];
  title?: string;
  description?: string;
  children?: ReactNode;
}

/** Placeholder shell used by pages that are scaffolded now and built out later
 * (PDP, PLP, checkout, etc). Keeps breadcrumbs + H1 consistent everywhere. */
export function PageScaffold({ breadcrumbs, title, description, children }: PageScaffoldProps) {
  return (
    <div className="pb-16">
      <Breadcrumbs items={breadcrumbs} title={title} />
      {description && (
        <p className="mt-3 max-w-2xl text-[14px] text-text-secondary">{description}</p>
      )}
      <div className="mt-8 rounded-lg border border-dashed border-border-default bg-surface-hover/40 p-10 text-center text-text-muted">
        {children ?? "This page is scaffolded and will be built out next."}
      </div>
    </div>
  );
}
