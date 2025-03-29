import { useState } from "react";
import { cartProductType, order } from "../../../typescript/types/userDataState";
import { OrderKeys } from "../../../typescript/types/shopInfoSliceType";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";
import { db } from "../../../services/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { handleStatusChange } from "../../../state-management/redux/slices/shopInfoSlice";
import { handleChangeStatus } from "../../../utilis/helpers/sellerOrderListFunctions";
import { Checkbox } from "antd";
import { cartNames } from "../../../utilis/constants/optionNamesOptions";
import { returnDetails } from "../../../typescript/types/returnedItems";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";

const ReturnPage = () => {
    const item = localStorage.getItem('returnDetails');
    const returnDetails: returnDetails = item ? JSON.parse(item) : null;
    const { order, orderStatusesArray, index, returnAbleProducts } = returnDetails;
    const { products, consumerId, sellerId, id } = order;
    const navigate = useNavigate();
    const [ returnItems, setReturnItems ] = useState<cartProductType[]>([]);
    const [ boughtItems, setBoughtItems ] = useState<cartProductType[]>(products);
    const { orders } = useSelector((state: RootState) => state.shopInfo);
    const dispatch = useDispatch<AppDispatch>();

    const handldeConfirmReturn = async () => {
            const moneyToSeller = boughtItems.reduce((acc, item) => acc+=item.price * item.stock, 0);
            const moneyToBuyer = returnItems.reduce((acc, item) => acc+=item.price * item.stock, 0);
    
            const returnedItemsDetails = {
                products: returnItems,
                returnPrice: moneyToBuyer,
                consumerId,
                sellerId,
                confirmedReturn: false,
            };
            
            const orderRef = doc(db, FIRESTORE_PATH_NAMES.ORDERS, id);
            await updateDoc(orderRef, {
                returnedItemsDetails,
                products: boughtItems,
                totalPrice: moneyToSeller,
            });
            const prev: OrderKeys = orderStatusesArray[index] as OrderKeys;
            const next: OrderKeys = orderStatusesArray[index + 1] as OrderKeys;
            
            const newOrdersObject = {
                ...orders,
                [prev]: orders[prev].filter((item) => item !== order),
                [next]: [...orders[next], order],
            };
            dispatch(handleStatusChange(newOrdersObject));
            handleChangeStatus({ order, prev, next }); 
            navigate(ROUTE_NAMES.DONEORDERS);
        };
    
        const handleCheckReturnProduct = (index: number, selected: boolean) => {
            const selectedProduct = products[index];
        
            if (selected) {
                setReturnItems(prev => [...prev, selectedProduct]);
                setBoughtItems(prev => prev.filter(item => item.productId !== selectedProduct.productId));
            } else {
                setReturnItems(prev => prev.filter(item => item.productId !== selectedProduct.productId));
                setBoughtItems(prev => [...prev, selectedProduct]);
            }
        };    
    
  return (
<div className="flex flex-col gap-4">
<div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Ընտրեք վերադարձի ապրանքները</h2>
                    <p className="text-red-800">Այստեղ նշված են այն ապրանքները, որոնք կարող են վերադարձվել։Պատվերի մնացած ապրանքները վերադարձի ենթակա չեն։</p>
                </div>
                <div className="space-y-4">
                    {returnAbleProducts.length > 0 ? returnAbleProducts.map((product, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg border shadow-sm gap-4">
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{product.name}</p>
                                <p className="text-base font-semibold text-gray-700">{product.price} AMD</p>
                                <p className="text-sm text-gray-600">Քանակ: {product.stock}</p>
                                {product.options && Object.entries(product.options).map(([key, value], idx) => (
                                    <p key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded-md w-fit mt-1">{`${cartNames[key]}: ${value}`}</p>
                                ))}
                            </div>
                            <Checkbox onChange={(e) => handleCheckReturnProduct(index, e.target.checked)} className="scale-125" />
                        </div>
                    )) : <p className="text-gray-500 text-sm">Վերադարձի ենթակա ապրանքներ չկան։</p>}
                </div>
                <hr />
                {
                    returnItems.length > 0 &&        
                    <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => handldeConfirmReturn()}>
                    Հաստատել վերադարձը
                </button>
                    <p className="text-red-800">Վերադարձի գումարը կստանաք երբ վաճառողը ստանա ապրանքը և հաստատի վերադարձը։</p>
                    </div>                 
                }
    </div>
  )
}

export default ReturnPage;