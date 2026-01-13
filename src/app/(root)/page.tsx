import React from "react";
import { Card } from "@/components";
import Hero from "@/components/Hero";
import { getAllProducts } from "@/lib/actions/product";

// Force dynamic rendering since we use auth
export const dynamic = 'force-dynamic';

const Home = async () => {
  // Fetch latest products from database
  const { products: dbProducts } = await getAllProducts({
    genderSlugs: [],
    sizeSlugs: [],
    colorSlugs: [],
    brandSlugs: [],
    categorySlugs: [],
    priceRanges: [],
    sort: "newest",
    page: 1,
    limit: 4,
  });

  return (
    <>
      <Hero />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section aria-labelledby="latest" className="pb-12">
          <h2 id="latest" className="mb-6 text-heading-3 text-dark-900">
            Latest shoes
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dbProducts.map((p) => {
              const price =
                p.minPrice !== null &&
                p.maxPrice !== null &&
                p.minPrice !== p.maxPrice
                  ? `$${p.minPrice.toFixed(2)} - $${p.maxPrice.toFixed(2)}`
                  : p.minPrice !== null
                  ? p.minPrice
                  : undefined;
              return (
                <Card
                  key={p.id}
                  productId={p.id}
                  title={p.name}
                  subtitle={p.subtitle ?? undefined}
                  imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                  price={price}
                  href={`/products/${p.id}`}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
