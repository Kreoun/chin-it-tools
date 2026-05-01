import { tools } from "../../../data/tools";
import ToolClient from "./ToolClient";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default async function ToolPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool)
    return (
      <div className="py-20 text-center text-gray-500">Tool not found</div>
    );
  return <ToolClient tool={tool} />;
}
