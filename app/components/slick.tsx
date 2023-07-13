"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import SlideItem from "./SlideItem";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const PRODUCT_DATA = [
  {
    name: "Brushed Raglan Sweatshirt",
    image: "/girl1.png",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "/girl2.png",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "/girl3.png",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "/girl4.png",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "/girl5.png",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "/girl6.png",
    price: "$195",
  },
];
export default function MainSlider() {
  return (
    <div>
      <Slider {...settings} className="w-full overflow-hidden">
        {PRODUCT_DATA.map((item) => (
          <SlideItem
            image={item.image}
            name={item.name}
            price={item.price}
            key={item.name}
          />
        ))}
      </Slider>
    </div>
  );
}
