"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
interface IProps {
  data: unknown;
}
export default function MainSlider({ data }: IProps) {
  console.log({data:JSON.stringify(data)})
  return (
    <div>
      <Slider {...settings} className="w-full overflow-hidden">
        {Array.isArray(data) &&
          data.map((item: any) => (
            <SlideItem
              image={item.mainImage}
              name={item?.title}
              price={item?.price}
              categories={item?.categories}
              key={item.title}
            />
          ))}
      </Slider>
    </div>
  );
}
