import { useDispatch, useSelector } from "react-redux";
import Title from "../TitleComponent";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import Seller from "../Seller";
import { useEffect } from "react";
import { fetchSellers } from "../../../state-management/redux/slices/sellers";

const BestSeller = () => {
  const {sellers} = useSelector((state: RootState) => state.sellers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSellers());
  }, []);
  
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'ԼԱՎԱԳՈՒՅՆ'} text2={'ՎԱՃԱՌՈՂՆԵՐ'} />
      </div>
      <div className="flex flex-col gap-3">
        {
            sellers.map((item, index) => {
                return(
                    <Seller data={item} key={index}/>
                )
            })
        }
        </div>    
    </div>
  )
}

export default BestSeller;
