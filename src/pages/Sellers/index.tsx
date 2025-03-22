import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state-management/redux/store"
import Seller from "../../components/sheard/Seller"
import { useEffect } from "react";
import { fetchSellers } from "../../state-management/redux/slices/sellers";

const Sellers = () => {
    const {sellers} = useSelector((state: RootState) => state.sellers);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(fetchSellers());
    },[dispatch]);

    return (
        <div className="flex flex-col gap-3">
        {
            sellers.map((item, index) => {
                return(
                    <Seller data={item} key={index}/>
                )
            })
        }
        </div>
    )
}

export default Sellers;