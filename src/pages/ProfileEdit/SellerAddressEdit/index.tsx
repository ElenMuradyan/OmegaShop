import { Button, Form, Input, notification, Typography, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { sellerAddresses } from "../../../typescript/types/userDataState";
import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase/supabase";
import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { EnvironmentOutlined, HomeOutlined, SendOutlined } from "@ant-design/icons";
import Title from "../../../components/sheard/Title";
import { fetchShopInfo } from "../../../state-management/redux/slices/shopInfoSlice";

const { Text } = Typography;

const SellerAddressEdit = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [buttonLoading, setButtonLoading] = useState(false);
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
    const { myShopInfo } = useSelector((store: RootState) => store.shopInfo);

    const handleEditUserAddress = async (values: sellerAddresses) => {
        setButtonLoading(true);
        const { region, city, street, postIndex, businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone } = values;

        const address = {region, city, street, postIndex};
        const businessAddress = {businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone};
        try {
            if (userData?.email) {
                const email = userData.email;
                const { error } = await supabase
                    .from("users")
                    .update({ address: address })
                    .eq("email", email);

                if (error) {
                    throw new Error(error.message);
                };

                const { error: shopError } = await supabase
                .from("sellers")
                .update({ businessAddress: businessAddress })
                .eq("email", email);

                if (shopError) {
                    throw new Error(shopError.message);
                };

                dispatch(fetchUserData(email));
                dispatch(fetchShopInfo(email));
                notification.success({
                    message: "Հասցեն հաջողությամբ թարմացվել է։",
                    description: "Դուք հաջողությամբ փոփոխել եք ձեր հասցեն։",
                });
            }
        } catch {
            notification.error({
                message: "Կներեք, մենք չկարողացանք փոփոխել ձեր հասցեն։",
            });
        } finally {
            setButtonLoading(false);
        }
    };

    useEffect(() => {  
        console.log(myShopInfo?.businessAddress);
        
        if (userData?.address || myShopInfo?.businessAddress) {
            form.setFieldsValue({
                ...userData?.address ?? {},  
                ...myShopInfo?.businessAddress ?? {} 
            });
        }
    }, [userData, myShopInfo]);
    
    return (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleEditUserAddress}
            className="w-full sm:max-w-2xl p-8 space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ' text2='ՀԱՍՑԵՆ' /></h3>
            {/* Region Field */}
            <Form.Item
              label={
                <Space>
                  <HomeOutlined />
                  <Text className="font-semibold">Մարզ</Text>
                </Space>
              }
              name="region"
              rules={[{ required: true, message: 'Գրե՛ք ձեր մարզը։' }]}
            >
              <Input placeholder="Օրինակ՝ Արարատի մարզ" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* City Field */}
            <Form.Item
              label={
                <Space>
                  <EnvironmentOutlined />
                  <Text className="font-semibold">Քաղաք</Text>
                </Space>
              }
              name="city"
              rules={[{ required: true, message: 'Գրե՛ք ձեր քաղաքը։' }]}
            >
              <Input placeholder="Օրինակ՝ Երևան" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Street Field */}
            <Form.Item
              label={
                <Space>
                  <HomeOutlined />
                  <Text className="font-semibold">Փողոց</Text>
                </Space>
              }
              name="street"
              rules={[{ required: true, message: 'Գրե՛ք ձեր փողոցը։' }]}
            >
              <Input placeholder="Օրինակ՝ Մաշտոցի պող." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Postal Code Field */}
            <Form.Item
              label={
                <Space>
                  <SendOutlined />
                  <Text className="font-semibold">Փոստային ինդեքս</Text>
                </Space>
              }
              name="postIndex"
              rules={[
                { required: true, message: 'Գրե՛ք ձեր փոստային ինդեքսը։' },
                { pattern: /^[0-9]{4,6}$/, message: 'Մուտքագրեք վավեր փոստային ինդեքս։' },
              ]}
            >
              <Input placeholder="Օրինակ՝ 0010" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ ԲԻԶՆԵՍԻ' text2='ՀԱՍՑԵՆ' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Մարզ</Text>}
            name="businessRegion"
            rules={[{ required: true, message: 'Գրե՛ք մարզը։' }]}
            >
            <Input placeholder="Գրե՛ք մարզը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Քաղաք</Text>}
            name="businessCity"
            rules={[{ required: true, message: 'Գրե՛ք քաղաքը։' }]}
            >
            <Input placeholder="Գրե՛ք քաղաքը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Փողոց</Text>}
            name="businessStreet"
            rules={[{ required: true, message: 'Գրե՛ք փողոցը։' }]}
            >
            <Input placeholder="Գրե՛ք փողոցը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Փոստային ինդեքս</Text>}
            name="businessPostIndex"
            rules={[
                { required: true, message: 'Գրե՛ք փոստային ինդեքսը։' },
                { pattern: /^[0-9]{4,6}$/, message: 'Մուտքագրեք վավեր փոստային ինդեքս։' },
            ]}
            >
            <Input placeholder="Գրե՛ք փոստային ինդեքսը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Աշխատանքային հեռախոսահամար</Text>}
            name="businessPhone"
            rules={[{ required: true, message: 'Գրե՛ք հեռախոսահամարը։' }]}
            >
            <Input type="tel" placeholder="Գրե՛ք հեռախոսահամարը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Action Buttons */}
            <div className="flex justify-between items-center space-x-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                icon={buttonLoading ? <Spin /> : <EnvironmentOutlined />}
                size="large"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
              >
                {buttonLoading ? 'ԽՆԴՐՈՒՄ ԵՆՔ ՍՊԱՍԵԼ...' : 'ՀԱՍՏԱՏԵԼ'}
              </Button>
            </div>
          </Form>
      );
    };
    
export default SellerAddressEdit;