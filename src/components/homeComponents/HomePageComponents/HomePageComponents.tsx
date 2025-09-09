import { getData } from "@/lib/fetch/getData";
import { ICategory } from "@/types/productsDataType/productsDataType";
import ProductITemComponents from "../ProductItem/ProductITemComponent";

const HomaPageComponents = async () => {
  const { data }: { data: ICategory[] } = await getData("/products", {
    next: { revalidate: 60 },
  });
  return (
    <>
      <ProductITemComponents data={data} />
    </>
  );
};
export default HomaPageComponents;
