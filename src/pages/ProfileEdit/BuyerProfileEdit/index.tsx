import { useEffect, useState } from "react";
import { Form, Input, Button, notification, Typography, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { supabase } from "../../../services/supabase/supabase";
import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { EnvironmentOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { buyerRegister } from "../../../typescript/interfaces/register";

const { Text } = Typography;

const BuyerProfileEdit = () => {
    const [form] = Form.useForm();
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        form.setFieldsValue({ ...userData });
    }, [userData]); 

    const handleEditUserProfile = async (values: buyerRegister) => {
        setButtonLoading(true);
        console.log(values);
        const { firstName, lastName, email, phone } = values;

        try {
            const { error } = await supabase
                .from("users")
                .update({ firstName, lastName, phone, email })
                .eq("email", email);

            if (error) {
                throw new Error(error.message);
            }

            dispatch(fetchUserData(email));
            notification.success({
                message: "Տվյալները հաջողությամբ թարմացվեցին։",
            });
        } catch {
            notification.error({
                message: "Կներեք, մենք չկարողացանք փոփոխել ձեր անձնական տվյալները։",
            });
        } finally {
            setButtonLoading(false);
        }
    };

      return (
            <Form
            layout="vertical"
            form={form}
            onFinish={handleEditUserProfile}
            className="w-full sm:max-w-2xl p-8 space-y-6"
          >
            {/* Name Field */}
            <Form.Item
              label={
                <Space>
                  <UserOutlined />
                  <Text className="font-semibold">Անուն</Text>
                </Space>
              }
              name="firstName"
              rules={[{ required: true, message: 'Գրե՛ք ձեր անունը։' }]}
            >
              <Input placeholder="Անուն" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Last Name Field */}
            <Form.Item
              label={
                <Space>
                  <UserOutlined />
                  <Text className="font-semibold">Ազգանուն</Text>
                </Space>
              }
              name="lastName"
              rules={[{ required: true, message: 'Գրե՛ք ձեր ազգանունը։' }]}
            >
              <Input placeholder="Ազգանուն" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Email Field */}
            <Form.Item
              label={
                <Space>
                  <MailOutlined />
                  <Text className="font-semibold">Էլփոստ</Text>
                </Space>
              }
              name="email"
              rules={[{ required: true, message: 'Գրե՛ք ձեր էլփոստը։' }]}
            >
              <Input type="email" placeholder="Օրինակ՝ example@mail.com" disabled className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Phone Field */}
            <Form.Item
              label={
                <Space>
                  <PhoneOutlined />
                  <Text className="font-semibold">Հեռախոսահամար</Text>
                </Space>
              }
              name="phone"
              rules={[{ required: true, message: 'Գրե՛ք ձեր հեռախոսահամարը։' }]}
            >
              <Input type="tel" addonBefore="+374" placeholder="XX XXXXXX" maxLength={8} className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>
    
            {/* Action Buttons */}
            <div className="flex justify-between items-center space-x-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                icon={buttonLoading ? <Spin /> : <UserOutlined />}
                size="large"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
              >
                {buttonLoading ? 'ԽՆԴՐՈՒՄ ԵՆՔ ՍՊԱՍԵԼ...' : 'ՀԱՍՏԱՏԵԼ'}
              </Button>
    
              <Link
                to={`${ROUTE_NAMES.EDITDATA}/${userData?.role}editaddress`}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:text-black hover:shadow-md transition-all duration-200"
              >
                <EnvironmentOutlined className="text-lg" />
                <span className="text-sm font-medium">ՁԵՐ ՀԱՍՑԵՆ</span>
              </Link>
            </div>
          </Form>
      );
    };
    
export default BuyerProfileEdit;