import { useSelector } from "react-redux"
import Title from "../Title"
import { RootState } from "../../../state-management/redux/store"
import ProductList from "../ProductList";

const BestSeller = () => {
  const { products } = useSelector((store: RootState) => store.products);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Hi everyone this page is for you to show the best apranqner.
        </p>
      </div>
      <ProductList products={products} />
    </div>
  )
}

export default BestSeller
