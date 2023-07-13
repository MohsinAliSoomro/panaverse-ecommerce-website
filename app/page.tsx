import Container from "./components/commons/Container";
import Hero from "./components/Hero";
import Events from "./components/Events";
import ProductSlider from "./components/ProductSlider";


export default function Home() {

  return (
    <Container>
      <Hero />
      <Events />
      <ProductSlider />
    </Container>
  );
}
