import ProductItem from "../ProductItem";
import Title from "../Title";
import image from '../../../utilis/Images/hero5.jpg';
import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/redux/store";
import ProductList from "../ProductList";

const LatestCollection = () => {
  const { products } = useSelector((store: RootState) => store.products);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'}></Title>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        {/* Hi everyone this page is for you to show the best apranqner. */}
        </p>
      </div>
      <ProductList products={products}/>
    </div>
  )
}

export default LatestCollection
