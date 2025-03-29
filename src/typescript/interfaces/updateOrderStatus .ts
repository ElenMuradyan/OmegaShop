import { OrderKeys } from "../types/shopInfoSliceType";
import { order } from "../types/userDataState";

export interface handleChangeStatusInterface {
    order: order,
    setModalOpen?: (value: boolean) => void,
    prev: OrderKeys,
    next: OrderKeys,
}