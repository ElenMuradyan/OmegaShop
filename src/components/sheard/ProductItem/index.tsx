import { Link } from "react-router-dom";
import { product } from "../../../typescript/interfaces/product";
import { ROUTE_NAMES } from "../../../utilis/constants";

const ProductItem = ({id, images, name, price, description, category, stock, usedType}: product) => {    
  return (
    <Link
    to={`${ROUTE_NAMES.PRODUCT}/${id}`}
    className="text-gray-700 cursor-pointer"
    >
    <div className="overflow-hidden rounded-lg">
      <img
        src={images[0]}
        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
        alt={name}
      />
    </div>
    
    <p className="mt-2 text-md font-semibold text-gray-800">{name}</p>
    
    <div className="flex justify-between items-center mt-1">
      <p className="text-sm font-medium text-gray-700">${price}</p>
      <p className="text-xs text-gray-600">Stock: {stock}</p>
      <p className="text-xs text-gray-600">UsedType: {usedType}</p>
    </div>
  
    <p className="mt-1 text-xs text-gray-500">Category: {category}</p>
  
    <p className="mt-2 text-xs text-gray-600 line-clamp-2">{description}</p>
  </Link>
  )
};

export default ProductItem;