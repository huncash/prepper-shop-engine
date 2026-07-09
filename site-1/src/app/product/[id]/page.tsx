import { getProductById } from "@shared/lib/data-provider";
import { ProductDetail } from "@shared/components/ProductDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
