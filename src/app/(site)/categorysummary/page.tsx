import { PageScaffold } from "@/components/ui/PageScaffold";
import { CATEGORY_TREE } from "@/constants/navigation";
import { toSelectionKey } from "@/constants/routes";
import { getSummaryBreadcrumbs } from "@/utils/breadcrumbs";

interface CategorySummaryPageProps {
  searchParams: Promise<{ selection?: string }>;
}

export default async function CategorySummaryPage({ searchParams }: CategorySummaryPageProps) {
  const { selection } = await searchParams;
  const selected = CATEGORY_TREE.find((node) => toSelectionKey(node.id) === selection);

  return (
    <PageScaffold
      breadcrumbs={getSummaryBreadcrumbs(selected?.label)}
      description={
        selected
          ? `Browsing ${selected.label}. Product listing for this category will go here.`
          : "Browse all top-level categories, or pick one from Shop By Category above."
      }
    />
  );
}
