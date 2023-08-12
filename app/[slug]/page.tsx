import { SANITY_CONFIG } from "@/lib/sanityConfig";
import { createClient } from "next-sanity";
import Container from "../components/commons/Container";
import Product from "../components/Product";
import { ShirtIcon } from "lucide-react";

const client = createClient(SANITY_CONFIG);
async function getData(category: string) {
  if (category === "all-product") {
    const res = await client.fetch(
      `*[_type == "category"]{
        _id,
        title,
        "products": *[ _type == "products"]{
          _id,
          title,
          price,
          slug,
          mainImage,
          stripeProductId,
          categories[]->{title}
        }
      }`
    );
    return res;
  }
  const res = await client.fetch(
    `*[_type == "category" && title == $category ]{
      _id,
      title,
      "products": *[ _type == "products" && references(^._id)]{
        _id,
        title,
        price,
        slug,
        mainImage,
        stripeProductId,  
        categories[]->{title}
      }
    }`,
    { category: category.charAt(0).toUpperCase() + category.slice(1) }
  );
  return res;
}

interface IProps {
  params: { slug: string };
}

export default async function Products({ params }: IProps) {
  const data = await getData(params.slug);

  if (!data) {
    return <div>Loading...</div>;
  }
  if (Array.isArray(data) && data[0]?.products.length === 0) {
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
        {Array.isArray(data) &&
          Array.isArray(data[0]?.products) &&
          data[0]?.products.map((item: unknown, index: number) => {
            return <Product item={item} key={index} />;
          })}
      </div>
    </Container>
  );
}
