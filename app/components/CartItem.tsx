import { useNextSanityImage } from "next-sanity-image";
import { configuredSanityClient } from "../lib/utils";
import Image from "next/image";
import { XSquareIcon } from "lucide-react";

interface IProps {
  item: any;
  removeToCart: () => void;
}
export default function CartItem({ item, removeToCart }: IProps) {
  const imageProps = useNextSanityImage(configuredSanityClient, item.mainImage);

  return (
    <div className="flex justify-between items-center my-2">
      <div className="flex ">
        <Image
          {...imageProps as any}
          style={{
            width: "3rem",
            height: "3rem",
            objectFit: "cover",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={item.title}
        />
        <div>
          {" "}
          <p>{item.title}</p>
          <span className="text-xs">{item.categories[0].title}</span>
        </div>
      </div>
      <button
        onClick={() => removeToCart()}
        className="flex items-center gap-1 cursor-pointer"
      >
        <XSquareIcon />
      </button>
    </div>
  );
}
