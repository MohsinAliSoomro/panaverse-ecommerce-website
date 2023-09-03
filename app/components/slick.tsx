"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideItem from "./SlideItem";
import useWindowSize from "@/hooks/useWindowSize";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

interface IProps {
  data: unknown;
}
export default function MainSlider({ data }: IProps) {
  const { width, height } = useWindowSize();
  if (width < 576) {
    settings.slidesToShow = 1;
  }
  if (width < 900 && width > 576) {
    settings.slidesToShow = 2;
  }
  if (width > 900) {
    settings.slidesToShow = 3;
  }

  return (
    <Slider {...settings} className="w-full overflow-hidden">
      {Array.isArray(data) &&
        data.map((item: any) => (
          <SlideItem
            image={item.mainImage}
            name={item?.title}
            price={item?.price}
            categories={item?.categories}
            stripeProductId={item.stripeProductId}
            key={item.title}
            id={item._id}
            slug={item?.slug}
          />
        ))}
    </Slider>
  );
}
