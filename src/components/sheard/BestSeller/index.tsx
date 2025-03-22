import { useSelector } from "react-redux";
import Title from "../TitleComponent";
import { RootState } from "../../../state-management/redux/store";
import ProductList from "../ProductList";

const BestSeller = () => {
  const { products } = useSelector((store: RootState) => store.products);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'ԼԱՎԱԳՈՒՅՆ'} text2={'ՎԱՃԱՌՈՂՆԵՐ'} />
      </div>
      <ProductList products={products} />
    </div>
  )
}

export default BestSeller;
