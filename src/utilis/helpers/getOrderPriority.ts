import { order } from "../../typescript/types/userDataState";

export const getOrderPriority = (order: order): number => {
    if (order.status === 'sentOrders' && !order.returnedItemsDetails) return 1;
    if (order.status === 'doneOrders' && order.returnedItemsDetails && !order.returnedItemsDetails.confirmedReturn) return 2;
    if (order.status === 'doneOrders') return 4;
    return 3; 
};
export const getSellerOrderPriority = (order: order): number => {
    if (order.status === 'doneOrders' && order.returnedItemsDetails && !order.returnedItemsDetails.confirmedReturn) return 1;
    return 2;
};