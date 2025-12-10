"use client";

import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { z } from "zod";
import { searchSchema } from "@/schema/searchSchema/searchSchema";
import { useCategoryStore } from "@/lib/store/allProductStore/allProductStore";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { TextField } from "@/components/Form/fields/TextField";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types/productsDataType/productsDataType";
import { usePathname } from "next/navigation";
import config from "@/config";

const Search = ({
  className,
  resultClass,
}: {
  className?: string;
  resultClass?: string;
}) => {
  const { categories } = useCategoryStore();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  type FormType = z.infer<typeof searchSchema>;
  const initialValues: FormType = {
    search: "",
  };
  const pathname = usePathname();

  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (pathname) {
      formRef.current?.reset();
      setResults([]);
      setShowResults(false);
    }
  }, [pathname]);

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    // optional form submit handling
    console.log("Form submitted:", data);
  };

  const handleChange = (value: string | File | undefined) => {
    const input = (value as string)?.toLowerCase().trim();

    if (!input || input.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const allProducts = categories.flatMap((category) => category.products);
    const matchedProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(input)
    );
    setResults(matchedProducts);
    setShowResults(true);
  };

  return (
    <div className={cn("w-full relative", className)}>
      <GenericForm
        schema={searchSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="relative">
          <LuSearch className="absolute top-2.5 left-2.5 size-5 text-gray-500" />
          <TextField
            name="search"
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            inputClass="pl-10 py-1 bg-primary1 input-class text-gray-50"
          />
        </div>
      </GenericForm>

      {showResults && (
        <div
          className={cn(
            "absolute mt-1 z-50 right-3 left-0 mx-auto",
            resultClass
          )}
        >
          <Card className="shadow-md p-0 w-full rounded-md bg-mainlight">
            <ScrollArea className="px-0">
              <CardContent className="px-0">
                {results.length > 0 ? (
                  results.map((product: IProduct, index: number) => (
                    <Link key={index} href={`product/${product.slug}`}>
                      <div
                        key={index}
                        className="p-2 text-sm rounded cursor-pointer flex items-center gap-3 hover:text-primary"
                      >
                        <Image
                          src={`${config.mainBaseUrl}/${product.image}`}
                          className="size-12 rounded"
                          alt="img"
                          width={500}
                          height={500}
                        />
                        <div>
                          <p className="font-semibold"> {product.name}</p>
                          <h1 className="bg-yellow-500 text-white px-3 py-1 rounded-2xl text-[10px] font-semibold">
                            Popular
                          </h1>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 px-3 py-2">
                    No products found
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Search;
