"use client";
import SectionHeading from "./commons/SectionHeading";
import MainSlider from "./slick";
interface IProps {
  data: unknown;
}


export default function ProductSlider(props: IProps) {

  return (
    <div className="flex justify-center flex-col mt-10 space-y-3 mb-20">
      <SectionHeading content="Check What We Have" heading="Products" />
      <MainSlider data={props.data} />
    </div>
  );
}
