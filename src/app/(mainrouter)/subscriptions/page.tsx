import ProductITemComponents from "@/components/homeComponents/ProductItem/ProductITemComponent";
import { getData } from "@/lib/fetch/getData";
import { ICategory } from "@/types/productsDataType/productsDataType";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Sebscription | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "the most trusted shop",
};

const SubscriptionsPage = async () => {
  const { data }: { data: ICategory[] } = await getData("/products");
  const filterData = data.filter((item) => item.name === "subscriptions");

  return (
    <>
      {filterData.length === 0 ? (
        <p className="text-center text-gray-300 mt-10">No data found</p>
      ) : (
        <>
          {filterData.map((item, index) => (
            <ProductITemComponents key={index} product={item} />
          ))}
        </>
      )}
    </>
  );
};
export default SubscriptionsPage;
