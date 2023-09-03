import { SANITY_CONFIG } from "@/lib/sanityConfig";
import { createClient } from "next-sanity";
import dynamic from "next/dynamic";
import { PortableText } from "@portabletext/react";
const AddToCart = dynamic(() => import("@/app/components/AddToCartButton"), {
  loading: () => <div>Loading...</div>,
});
const ImageComp = dynamic(() => import("@/app/components/Image"), {
  loading: () => <div>Loading...</div>,
});
const client = createClient(SANITY_CONFIG);
async function getProduct(slug: string) {
  const res = await client.fetch(
    `*[_type == "products" && slug.current == $slug]{
        _id,
        title,
        price,
        slug,
        mainImage,
        stripeProductId,
        body,
        categories[]->{title}
            }`,
    {
      slug: slug,
    }
  );
  return res[0];
}
interface IProps {
  params: {
    slug: string;
  };
}
export default async function ProductDetails(props: IProps) {
  const data = await getProduct(props.params.slug);
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <ImageComp item={data} />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <AddToCart
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                  item={data}
                  key={1}
                />
              </div>
              {/* <div className="w-1/2 px-2">
                <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                  Add to Wishlist
                </button>
              </div> */}
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
            {/* <div className="text-gray-600 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </div> */}
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600">${data?.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability:</span>
                <span className="text-gray-600">In Stock</span>
              </div>
            </div>

            {/* <div className="mb-4">
              <span className="font-bold text-gray-700">Select Size:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  S
                </button>
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  M
                </button>
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  L
                </button>
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  XL
                </button>
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  XXL
                </button>
              </div>
            </div> */}
            <div>
              <span className="font-bold text-gray-700">
                Product Description:
              </span>
              <PortableText value={data.body} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
