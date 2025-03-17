import { Form, Input } from "antd"
import Title from "../../components/sheard/Title"
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import { useEffect, useState } from "react";
import { address, cartProductType } from "../../typescript/types/userDataState";
import { supabase } from "../../services/supabase/supabase";
import { cartProduct } from "../../typescript/interfaces/product";
import { LoadingOutlined } from "@ant-design/icons";

const PlaceOrder = () => {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  const handleOrder = async (values: address) => {
    try{
      setLoading(true);
      const { data: user, error } = await supabase.
      from('users')
      .select('*')
      .eq("id", userData?.id)
      .single();

      if (error) throw error;
  
      const products:cartProductType[] = user.cart ? user.cart.filter((item: cartProductType) => item.ordering) : [];

      const order: Record<string, cartProduct[]> = {}
      products.forEach((item) => {
        if(order[item.autorEmail]){
          order[item.autorEmail].push(item);
        }else{
          order[item.autorEmail] = [item];
        }
      })
  
      await Promise.all(
        Object.entries(order).map(async([sellerEmail, sellerProducts]) => {
          const totalPrice = sellerProducts.reduce(
            (acc, item) => acc + item.price * item.stock,
            0
          );

          const orderDetailsForSeller = {
            address: values,
            products: sellerProducts,
            totalPrice,
            status: 'pending',
            consumer: userData?.email,
            orderDate: new Date(),
          };

          const { data: seller, error: fetchError } = await supabase
          .from("sellers")
          .select("newOrders")
          .eq("email", sellerEmail)
          .single();

        if (fetchError) throw fetchError;

        const updatedOrdersForSeller = [...(seller.newOrders || []), orderDetailsForSeller];

        const { error: updateError } = await supabase
          .from("sellers")
          .update({ newOrders: updatedOrdersForSeller })
          .eq("email", sellerEmail);

        if (updateError) throw updateError;

        const orderDetailsForBuyer = {
          address: values,
          products: sellerProducts,
          totalPrice,
          status: "pending",
          sellerEmail,
          orderDate: new Date(),
        }

        const updatedOrdersForBuyer = [...(user.orders || []), orderDetailsForBuyer];
        const { error: orderError } = await supabase
        .from("users")
        .update({ orders: updatedOrdersForBuyer })
        .eq("id", userData?.id);

        if (orderError) throw updateError;

        const updatedCart = user.cart ? user.cart.filter((item: cartProductType) => !item.ordering) : [];

        const { error: cartUpdateError } = await supabase
        .from("users")
        .update({ cart: updatedCart })
        .eq("id", userData?.id);
  
        if (cartUpdateError) throw updateError;
        }) 
      )
      navigate(ROUTE_NAMES.ORDERS);
      console.log("Orders placed successfully!");
    }catch(error: any){
      console.error("Order processing failed:", error.message);
    }finally{
      setLoading(false);
    }
  }

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
