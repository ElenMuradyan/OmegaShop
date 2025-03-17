import { useSelector } from "react-redux";
import Title from "../../../components/sheard/Title";
import { RootState } from "../../../state-management/redux/store";
import { cartNames } from "../../../utilis/optionNamesOptions";
import { orderStatuses } from "../../../utilis/orderStatuses";
import { order } from "../../../typescript/types/userDataState";

const OrderComponent  = ({ order }: {order: order}) => {
  const { products, orderDate, totalPrice, status } = order;
  const orderStatus = orderStatuses[status];

  return (      
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
              <p className="text-gray-500 text-sm">{new Date(orderDate).toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-gray-800">{totalPrice} AMD</p>
              <p className={`px-3 py-1 rounded-full text-sm font-medium`}
              style={{
                backgroundColor: orderStatus.color,
                color: orderStatus.textColor,
              }}
              >
                {order.status}
              </p>
            </div>
            <div
              className="flex items-center gap-2 py-2 px-4 rounded-lg w-fit mb-4"
              style={{
                backgroundColor: orderStatus.color,
                color: orderStatus.textColor,
              }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: orderStatus.color }}
              />
              <p className="text-sm font-medium">{orderStatus.message}</p>
            </div>
  
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row md:items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                      <p className="text-base font-semibold">{product.price} AMD</p>
                      <p>Quantity: {product.stock}</p>
                      {Object.entries(product.options).map(([key, value], idx) => (
                        <p key={idx} className="bg-gray-200 px-2 py-1 rounded-md">{`${cartNames[key]}: ${value}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
}
export default OrderComponent ;
