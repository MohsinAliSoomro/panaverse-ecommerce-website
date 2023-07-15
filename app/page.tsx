import Container from "./components/commons/Container";
import Hero from "./components/Hero";
import Events from "./components/Events";
import ProductSlider from "./components/ProductSlider";
import MaterialInfo from "./components/MaterialInfo";
import NewsLater from "./components/commons/NewsLetter";
import { createClient } from "next-sanity";
import { SANITY_CONFIG } from "@/lib/sanityConfig";
const client = createClient(SANITY_CONFIG);

async function getData() {
  const res = await client.fetch(`*[_type == "products"]{
    _id,
    title,
    price,
    slug,
    mainImage,
    categories[]->{title}
  }`);
  return res;
}

export default async function Home() {
  const data = await getData();
  return (
    <Container>
      <Hero />
      <Events />
      <ProductSlider data={data} />
      <MaterialInfo />
      <NewsLater />
    </Container>
  );
}
