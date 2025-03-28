import { Link } from "react-router-dom";
import { product } from "../../../typescript/interfaces/product";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { saveScrollPosition } from "../../../utilis/helpers/handleNavigate";

const ProductItem = ({
  id,
  images,
  name,
  price,
  description,
  stock,
}: product) => {
  return (
    <Link
    onClick={() => saveScrollPosition()} 
      to={`${ROUTE_NAMES.PRODUCT}/${id}`}
      className="text-gray-700 cursor-pointer shadow-lg rounded-lg p-2 transition-transform hover:shadow-xl"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="mt-2 space-y-1">
        <div className="flex justify-between items-center">
          <p className="text-md font-semibold text-gray-800">{name}</p>
          <p className="text-sm font-medium text-gray-700">{price} ֏</p>
        </div>

        <p className="text-md text-gray-800">Քանակ։ {stock}</p>
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
