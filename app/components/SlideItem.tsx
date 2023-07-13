import Image from "next/image";

interface IProps {
  image: string;
  name: string;
  price: string;
}
export default function SlideItem(props: IProps) {
  const { image, name, price } = props;
  return (
    <div className="focus:border-none">
      <Image
        src={image}
        width={400}
        alt={name}
        height={400}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <p className="font-semibold text-xl">{name}</p>
      <p className="font-semibold">{price}</p>
    </div>
  );
}
