import { PageScaffold } from "@/components/ui/PageScaffold";
import { getCategoryBreadcrumbs } from "@/utils/breadcrumbs";

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const listId = slug[slug.length - 1];
  const breadcrumbs = getCategoryBreadcrumbs(listId);

  return (
    <PageScaffold
      breadcrumbs={breadcrumbs}
      description={`Product list ID: ${listId}. The product listing grid for this category will go here.`}
    />
  );
}
