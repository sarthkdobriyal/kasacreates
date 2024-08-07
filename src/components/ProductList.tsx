import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { FC } from "react";
import Pagination from "./Pagination";

interface ProductListProps {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}

const PRODUCT_PER_PAGE = 10;

const ProductList: FC<ProductListProps> = async ({ categoryId, limit, searchParams }) => {
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
  .queryProducts()
  .startsWith("name", searchParams?.name || "")
  .eq("collectionIds", categoryId)
  .hasSome(
    "productType",
    searchParams?.type ? [searchParams.type] : ["physical", "digital"]
  )
  .gt("priceData.price", searchParams?.min || 0)
  .lt("priceData.price", searchParams?.max || 999999)
  .limit(limit || PRODUCT_PER_PAGE)
  .skip(
    searchParams?.page
      ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
      : 0
  );
// .find();

if (searchParams?.sort) {
  const [sortType, sortBy] = searchParams.sort.split(" ");

  if (sortType === "asc") {
    productQuery.ascending(sortBy);
  }
  if (sortType === "desc") {
    productQuery.descending(sortBy);
  }
}

const res = await productQuery.find();

// console.log(res.items)


  return (
    <div className="flex gap-x-8 gap-y-8 flex-wrap justify-around mt-12">
      {res.items.map((product: products.Product) => {
        return (
          <Link
            key={product._id}
            href={"/" + product.slug}
            className="w-full flex flex-col gap-3 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80  ">
              <Image
                src={product.media?.mainMedia?.image?.url || '/product.png'}
                alt={product.media?.mainMedia?.image?.altText || ''}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
              />
              { Array.isArray(product?.media?.items) && product.media.items.length > 1 ? (
                <Image
                  src={product?.media?.items[1].image?.url || "/product.png"}
                  alt={product?.media?.items[1].image?.altText || 'product'}
                  fill
                  //  sizes='25vw'
                  className="absolute object-cover rounded-md"
                />
              ): null}
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
      
      { searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
       ) : null}
    </div>
  );
};

export default ProductList;
