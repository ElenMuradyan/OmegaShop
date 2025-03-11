import { product } from "../../../typescript/types/product";
import ProductItem from "../ProductItem";

const ProductList = ({products}:{products: product[]}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {
        products.map((item, key) => {
            const { id, category, stock, images, price, subCategoy, name, description, usedType, options } = item;
            return(
                <ProductItem id={id} subCategory={subCategoy} images={images} name={name} price={price} description={description} category={category} stock={stock} usedType={usedType} key={key} options={options}></ProductItem>
            )
        })
      }
    </div>
  )
}

export default ProductList;