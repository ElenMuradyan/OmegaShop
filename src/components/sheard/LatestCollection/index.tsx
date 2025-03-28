import Title from "../TitleComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/redux/store";
import ProductList from "../ProductList";
import SearchBar from "../Search";
import { useState } from "react";
import { product } from "../../../typescript/types/product";

const LatestCollection = () => {
  const { products } = useSelector((store: RootState) => store.products);
  const [ filteredProducts, setFilteredProducts ] = useState<product[]>(products);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'ՎԵՐՋԻՆ'} text2={'ԱՊՐԱՆՔՆԵՐ'}></Title>
        <SearchBar filteredProducts={products} setFilteredProducts={setFilteredProducts}/>
      </div>
      <ProductList products={filteredProducts}/>
    </div>
  )
}

export default LatestCollection
