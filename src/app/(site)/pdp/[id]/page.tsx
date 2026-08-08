import { PageScaffold } from "@/components/ui/PageScaffold";

interface PdpPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PdpPageProps) {
  const { id } = await params;

  return (
    <PageScaffold
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop By Category", href: "/categorysummary" }, { label: `Product ${id}` }]}
      description={`Product detail page for ID ${id}. Full PDP content will go here.`}
    />
  );
}
