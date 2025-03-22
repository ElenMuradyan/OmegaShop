import { Form, Input } from "antd"
import Title from "../../components/sheard/TitleComponent"
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { useEffect, useState } from "react";
import { address, cartProductType } from "../../typescript/types/userDataState";
import { supabase } from "../../services/supabase/supabase";
import { cartProduct } from "../../typescript/interfaces/product";
import { LoadingOutlined } from "@ant-design/icons";
import { orderStatuses } from "../../utilis/constants/orderStatuses";
import { setUserOrders } from "../../state-management/redux/slices/userDataSlice";

const PlaceOrder = () => {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const { myShopInfo } = useSelector((state: RootState) => state.shopInfo);
  const [ loading, setLoading ] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  const handleOrder = async (values: address) => {
    try{
      setLoading(true);
      const products:cartProductType[] = userData?.cart ? userData.cart.filter((item: cartProductType) => item.ordering) : [];

      const order = products.reduce<Record<string, cartProduct[]>>((acc, item) => {
        acc[item.autorEmail] = acc[item.autorEmail] ? [...acc[item.autorEmail], item] : [item];
        return acc;
      }, {});

      await Promise.all(products.map(async (item) => {
        const { error } = await supabase
            .from("products")
            .update({ stock: item.maxValue - item.stock })
            .eq("id", item.productId); 
    
        if (error) throw error;
    }));
    
      await Promise.all(
        Object.entries(order).map(async([sellerEmail, sellerProducts]) => {
          const totalPrice = sellerProducts.reduce(
            (acc, item) => acc + item.price * item.stock,
            0
          );

          const orderDetails = {
            address: values,
            products: sellerProducts,
            totalPrice,
            status: Object.keys(orderStatuses)[0],
            sellerEmail,
            consumerEmail: userData?.email,
          };

          dispatch(setUserOrders(orderDetails));

        const { data: order, error: dbError } = await supabase
        .from("orders")
        .insert(orderDetails)
        .select('id')
        .single();
         
        if (dbError) throw dbError;

        const updatedOrdersForSeller = [...(myShopInfo?.newOrders || []), order.id];

        const { error: sellerUpdateError } = await supabase
          .from("sellers")
          .update({ newOrders: updatedOrdersForSeller })
          .eq("email", sellerEmail);

        if (sellerUpdateError) throw sellerUpdateError;

        const updatedOrdersForBuyer = [...(userData?.orders || []), order.id];

        const updatedCart = userData?.cart ? userData?.cart.filter((item: cartProductType) => !item.ordering) : [];

        const { error: buyerUpdateError } = await supabase
        .from("users")
        .update({ cart: updatedCart,
          orders: updatedOrdersForBuyer
         })
        .eq("id", userData?.id);
  
        if (buyerUpdateError) throw buyerUpdateError;
      })
    )
    navigate(ROUTE_NAMES.ORDERS);
    console.log("Պատվերները հաջողությամբ տեղադրված են!");
  }catch(error: any){
    console.error("Պատվերի մշակումը ձախողվեց:", error.message);
  }finally{
    setLoading(false);
  }
};

  useEffect(() => {
    form.setFieldsValue(userData?.address);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION"/>
        </div>
          <Form layout="vertical" form={form} onFinish={handleOrder}>
            <Form.Item
            label='Մարզ'
            name='region'
            rules={[{
              required:true,
              message:'Գրեք առաքման մարզը։'
            }]}
            >
              <Input placeholder="Մարզ" type="text"/>
            </Form.Item>
            <Form.Item
            label='Քաղաք/գյուղ'
            name='city'
            rules={[{
              required:true,
              message:'Գրեք առաքման քաղաքը/գյուղը։'
            }]}
            >
              <Input placeholder="Քաղաք/գյուղ" type="text"/>
            </Form.Item>
            <Form.Item
            label='Փողոց'
            name='street'
            rules={[{
              required:true,
              message:'Գրեք առաքման փողոցը։'
            }]}
            >
              <Input placeholder="Փողոց" type="text"/>
            </Form.Item>
            <Form.Item
            label='Փոստի համար'
            name='postIndex'
            rules={[{
              required:true,
              message:'Գրեք փոստի համարը։'
            }]}
            >
              <Input placeholder="Փոստի համար" type="text"/>
            </Form.Item>

            <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">{loading ? <LoadingOutlined /> : 'ORDER'}</button>
          </div>
          </Form>



      </div>
      <div className="mt-8 min-w-80">
          <CardTotal />
          <div className="mt-12">
          <Title text1="ՎՃՐՄԱՆ" text2="ԵՂԱՆԱԿԸ" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className="min-w-3.5 h-3.5 border-rounded-full"></p>
              <p className="text-gray-500 text-sm font-medium mx-4">ՎՃԱՐԵԼ ԱՌԱՔՄԱՆ ՊԱՀԻՆ</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
