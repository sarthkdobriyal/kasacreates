import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { FC } from "react";

interface ProductListProps {
  categoryId: string;
  limit?: number;
}

const PRODUCT_PER_PAGE = 20;

const ProductList: FC<ProductListProps> = async ({ categoryId, limit }) => {
  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();

  return (
    <div className="flex gap-x-8 gap-y-8 flex-wrap  mt-12">
      {res.items.map((product: products.Product) => {
        return (
          <Link
            key={product._id}
            href={"/" + product.slug}
            className="w-full flex flex-col gap-3 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80  ">
              <Image
                src={product.media?.mainMedia?.image?.url}
                alt={product.media?.mainMedia?.image?.altText}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              {product.media?.items[1] && (
                <Image
                  src={product?.media?.items[1].image?.url}
                  alt={product?.media?.items[1].image?.altText}
                  fill
                  //  sizes='25vw'
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex justify-between">
              <span className="font-bold">{product.name}</span>
              <span className="font-semibold">
                {product.priceData?.formatted?.price}
              </span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <button className="rounded-2xl hover:text-white hover:bg-lama py-2 ring-1 ring-lama text-lama w-max px-4">
              Add to cart
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
