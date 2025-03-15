import { useEffect, useState } from "react";
import { related } from "../../../typescript/interfaces/related";
import ProductList from "../ProductList";
import Title from "../Title";
import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/redux/store";
import { product } from "../../../typescript/types/product";

const RelatedProducts = ({category, subcategory}: related) => {
  const { products } = useSelector((store: RootState) => store.products);
  const [ relatedProducts, setRelatedProducts ] = useState<product[]>(products);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) => item.category === category || item.subCategory === subcategory
      );
      setRelatedProducts(filteredProducts);
    }
  }, [products, category, subcategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

        <ProductList products={relatedProducts}/>
    </div>
  )
}

export default RelatedProducts;