"use client";

import MainContainer from "@/components/container/MainContainer";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const ProductITemComponent = ({
  product,
  index,
}: {
  product: ICategory;
  index: number;
}) => {
  return (
    <div className="w-full px-3 my-3 mt-8">
      <MainContainer>
        {index === 0 ? (
          <h1 className="font-bold text-white w-fit text-[18px]">
            {product.name}
          </h1>
        ) : (
          <h2 className="font-bold text-white w-fit text-[18px]">
            {product.name}
          </h2>
        )}

        <div className="mt-2 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 md:gap-4 gap-2">
          {product.products.map((item) => (
            <Link key={item.id} href={`/product/${item.slug}`} prefetch>
              <div
                className=" bg-[#2B304C] rounded-md w-full h-full duration-500 group"
                // style={{
                //   boxShadow: "rgb(255 255 255 / 20%) 2px 5px 8px 0px",
                // }}
              >
                <div className="w-full md:h-[180px] h-[120px] overflow-hidden">
                  <Image
                    className="w-full h-full rounded group-hover:scale-110 duration-300"
                    src={`${process.env.NEXT_PUBLIC_MAIN_BASE}/${item.image}`}
                    alt="img"
                    width={500}
                    height={500}
                  />
                </div>
                <h2 className="block truncate font-semibold md:text-[16px] text-[12px] text-white py-1 px-2">
                  {item.name}
                </h2>
                <h2 className="md:flex hidden gap-2 items-start md:text-[14px] text-[12px] py-1 px-2">
                  <span className="flex items-center gap-0.5">
                    {" "}
                    {item.reviews_avg_rating}{" "}
                    <FaStar className="text-yellow-500 inline" />
                  </span>
                  <span className="text-gray-400 font-semibold">
                    {" "}
                    {item.reviews_count.toLocaleString()} reviews
                  </span>
                </h2>
                <h2 className="md:hidden flex gap-2 items-start md:text-[14px] text-[12px] py-1 px-2">
                  <span className="flex items-center gap-0.5">
                    {" "}
                    {item.reviews_avg_rating}{" "}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <FaStar key={index} className="text-yellow-500 inline" />
                    ))}
                  </span>
                  <span className="text-gray-400 font-semibold">
                    {" "}
                    {item.reviews_count.toLocaleString()} reviews
                  </span>
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </MainContainer>
    </div>
  );
};

import { ICategory } from "@/types/productsDataType/productsDataType";
export default function ProductITemComponents({ data }: { data: ICategory[] }) {
  return (
    <>
      {data.map((item, index) => (
        <ProductITemComponent key={index} product={item} index={index} />
      ))}
    </>
  );
}
