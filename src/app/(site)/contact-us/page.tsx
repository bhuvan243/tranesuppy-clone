import { PageScaffold } from "@/components/ui/PageScaffold";

export default function Page() {
  return (
    <PageScaffold
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      description="This page is scaffolded and will be built out later."
    />
  );
}
