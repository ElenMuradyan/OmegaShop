import Title from "../TitleComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/redux/store";
import ProductList from "../ProductList";

const LatestCollection = () => {
  const { products } = useSelector((store: RootState) => store.products);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'ՎԵՐՋԻՆ'} text2={'ՀԱՎԱՔԱԾՈՒՆԵՐ'}></Title>
      </div>
      <ProductList products={products}/>
    </div>
  )
}

export default LatestCollection
