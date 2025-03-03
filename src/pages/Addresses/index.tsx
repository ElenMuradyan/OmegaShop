import { Button, Form, Input, notification, Typography, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { address } from "../../typescript/types/userDataState";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase/supabase";
import { fetchUserData } from "../../state-management/redux/slices/userDataSlice";
import { EnvironmentOutlined, HomeOutlined, SendOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Addresses = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [buttonLoading, setButtonLoading] = useState(false);
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);

    const handleEditUserAddress = async (values: address) => {
        setButtonLoading(true);

        try {
            if (userData?.email) {
                const email = userData.email;
                const { error } = await supabase
                    .from("users")
                    .update({ address: values })
                    .eq("email", email);

                if (error) {
                    throw new Error(error.message);
                }

                dispatch(fetchUserData(email));
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
        form.setFieldsValue(userData?.address);
    }, [userData]);
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
          <Form
            layout="vertical"
            form={form}
            onFinish={handleEditUserAddress}
            className="w-full sm:max-w-2xl p-8 space-y-6"
          >
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
        </div>
      );
    };
    
export default Addresses;