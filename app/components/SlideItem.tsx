import Image from "next/image";
import { createClient } from "@sanity/client";
import { useNextSanityImage } from "next-sanity-image";
const configuredSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});
interface IProps {
  image: string;
  name: string;
  price: string;
}
export default function SlideItem(props: IProps) {
  const { image, name, price } = props;
  const imageProps = useNextSanityImage(configuredSanityClient, image);

  return (
    <div className="focus:border-none">
      <Image
        {...imageProps}
        style={{ width: "100%", height: "20rem", objectFit: "contain" }} // layout="responsive" prior to Next 13.0.0
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={name}
        //  placeholder="blur"
        //  blurDataURL={mySanityData.image.asset.metadata.lqip}
      />
      <p className="font-semibold text-xl">{name}</p>
      <p className="font-semibold">{price}</p>
    </div>
  );
}
