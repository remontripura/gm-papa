import ProductITemComponents from "@/components/homeComponents/ProductItem/ProductITemComponents";
import { getData } from "@/lib/fetch/getData";
import { ICategory } from "@/types/procutsDataType/procutsDataType";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GMPAPA | Subscriptions",
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
