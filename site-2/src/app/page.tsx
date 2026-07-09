import { authProvider } from "@shared/auth/auth-provider";
import { ProductCard } from "@shared/src/components/ProductCard";
import { fetchProducts } from "@shared/src/index";

export default async function HomePage() {
  const products = await fetchProducts();
  const isAdmin = authProvider.isAdmin();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Site 2</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            description={product.description}
            editable={isAdmin}
          />
        ))}
      </div>
    </main>
  );
}
