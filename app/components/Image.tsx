"use client"
import { useNextSanityImage } from "next-sanity-image";
import { configuredSanityClient } from "../lib/utils";
import Image from "next/image";

interface IProps {
  item: any;
}
export default function ImageComp({ item }: IProps) {
  const imageProps = useNextSanityImage(configuredSanityClient, item.mainImage);
  return (
    <Image
      {...(imageProps as any)}
      src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      alt="product-image"
      className="w-full rounded-lg"
      width={800}
      height={800}
    />
  );
}
