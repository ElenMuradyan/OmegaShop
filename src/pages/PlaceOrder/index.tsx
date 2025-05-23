import { Form, Input } from "antd"
import Title from "../../components/sheard/TitleComponent"
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { handlePlaceOrder } from "../../utilis/helpers/handlePlaceOrder";

const PlaceOrder = () => {
  const { userData, cart } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [ loading, setLoading ] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue(userData?.address);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION"/>
        </div>
          <Form layout="vertical" form={form} onFinish={(values) => handlePlaceOrder({values, userData, setLoading, cart, dispatch, navigate})}>
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
            <button disabled={loading} type="submit" className="bg-black text-white px-16 py-3 text-sm">{loading ? <LoadingOutlined /> : 'Պատվիրել'}</button>
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