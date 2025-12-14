import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrand(product?.slug?.current as string);
  console.log(brand);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: Онцлог шинж чанар</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Брэнд:{" "}
            {brand && (
              <span className="font-semibold tracking-wide">
                {brand[0]?.brandName}
              </span>
            )}
          </p>
          <p className="flex items-center justify-between">
            Цуглуулга: <span className="font-semibold tracking-wide">2025</span>
          </p>
          <p className="flex items-center justify-between">
            Төрөл:{" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Нөөц:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Байгаа" : "Дууссан"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
