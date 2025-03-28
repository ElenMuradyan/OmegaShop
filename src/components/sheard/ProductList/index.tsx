import { product } from "../../../typescript/types/product";
import LoadingWrapper from "../Loading";
import ProductItem from "../ProductItem";

const ProductList = ({products}:{products: product[]}) => {
  return (
    <LoadingWrapper isLoading={!Boolean(products)}>  
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {
         products.map((item, key) => {
            const { id, category, stock, images, price, subCategory, name, description, usedType, options, autor } = item;
            return(
                <ProductItem autor={autor} id={id} subCategory={subCategory} images={images} name={name} price={price} description={description} category={category} stock={stock} usedType={usedType} key={key} options={options}/>
            )
        })
      }
    </div>
    </LoadingWrapper>
  )
}

export default ProductList;