import { createClient } from "next-sanity";
import { SANITY_CONFIG } from "@/lib/sanityConfig";
import Container from "@/app/components/commons/Container";
import Product from "@/app/components/Product";
import { ShirtIcon } from "lucide-react";
const client = createClient(SANITY_CONFIG);

async function getData(title: string) {
  const res = await client.fetch(
    `*[_type == "products" && title < $title]{
      _id,
      title,
      price,
      slug,
      mainImage,
      stripeProductId,
      categories[]->{title}
    }`,
    { title: title.charAt(0).toUpperCase() + title.slice(1) }
  );
  return res;
}

export default async function Search({ params }: { params: { slug: string } }) {
  const response = await getData(params.slug);

  if (!response) {
    return <div>Loading...</div>;
  }
  if (Array.isArray(response) && response.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col gap-8">
        <span>
          <ShirtIcon size={128} />{" "}
        </span>
        <span className="text-lg font-bold">Not Found</span>
      </div>
    );
  }
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-2">
        {Array.isArray(response) &&
          response.map((item: unknown, index: number) => {
            return <Product item={item} key={index} />;
          })}
      </div>
    </Container>
  );
}
