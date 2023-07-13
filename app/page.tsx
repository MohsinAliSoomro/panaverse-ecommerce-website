import Container from "./components/commons/Container";
import Hero from "./components/Hero";
import Events from "./components/Events";
import ProductSlider from "./components/ProductSlider";
import MaterialInfo from "./components/MaterialInfo";
import NewsLater from "./components/commons/NewsLetter";
import Footer from "./components/commons/Footer";

export default function Home() {
  return (
    <Container>
      <Hero />
      <Events />
      <ProductSlider />
      <MaterialInfo />
      <NewsLater />
    </Container>
  );
}
