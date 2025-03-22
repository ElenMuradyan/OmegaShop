import { useEffect, useState } from "react";
import { Form, Input, Button, notification, Typography, Spin, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { supabase } from "../../../services/supabase/supabase";
import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { sellerRegister } from "../../../typescript/interfaces/register";
import { categoryLabels } from "../../../typescript/types/categories";
import { options } from "../../../utilis/constants/sellerTypeOptions";
import Title from "../../../components/sheard/TitleComponent";
import { fetchShopInfo } from "../../../state-management/redux/slices/shopInfoSlice";

const { Text } = Typography;

const SellerProfileEdit = () => {
    const [form] = Form.useForm();
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);
    const { myShopInfo } = useSelector((store: RootState) => store.shopInfo);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        form.setFieldsValue({ ...userData, ...myShopInfo });
    }, [userData, myShopInfo]); 

    const handleEditUserProfile = async (values: sellerRegister) => {
        setButtonLoading(true);
        console.log(values);
        const { firstName, lastName, email, phone, shopName, description, type, categories } = values;

        try {
            const { error } = await supabase
                .from("users")
                .update({ firstName, lastName, phone, email })
                .eq("email", email);

            if (error) {
                throw new Error(error.message);
            };

            const { error: businessError } = await supabase
            .from("sellers")
            .update({ shopName, description, type, categories })
            .eq("email", email);

            if (businessError) {
                throw new Error(businessError.message);
            };

            dispatch(fetchUserData());
            dispatch(fetchShopInfo(email));

            notification.success({
                message: "Տվյալները հաջողությամբ թարմացվեցին։",
            });
        } catch {
            notification.error({
                message: "Կներեք, մենք չկարողացանք փոփոխել ձեր տվյալները։",
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
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ԱՆՁՆԱԿԱՆ' text2='ՏՎՅԱԼՆԵՐ' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Անուն</Text>}
            name="firstName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր անունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր անունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Ազգանուն</Text>}
            name="lastName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր ազգանունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր ազգանունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Էլփոստ</Text>}
            name="email"
            rules={[{ required: true, message: 'Գրե՛ք ձեր էլփոստը։' }]}
            >
            <Input type="email" placeholder="Գրե՛ք ձեր էլփոստը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Հեռախոսահամար</Text>}
            name="phone"
            rules={[{ required: true, message: 'Գրե՛ք ձեր հեռախոսահամարը։' }]}
            >
            <Input type="tel" placeholder="Գրե՛ք ձեր հեռախոսահամարը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Government ID / Business License Upload (File Upload) */}
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ ԲԻԶՆԵՍԻ' text2='ՆԿԱՐԱԳՐՈՒԹՅՈՒՆԸ' /></h3>


            <Form.Item
            label={<Text className="font-semibold">Խանութի անուն</Text>}
            name="shopName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր խանութի անունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր խանութի անունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Խանութի նկարագրություն</Text>}
            name="description"
            rules={[{ required: true, message: 'Գրե՛ք ձեր խանութի նկարագրությունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր խանութի նկարագրությունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Վաճառում եք որպես անհատ թե բիզնես։</Text>}
            name="type"
            rules={[{ required: true, message: 'Նշե՛ք տարբերակը։' }]}
            >
            <Select options={options} />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ ԱՊՐԱՆՔԻ' text2='ՄԱՍԻՆ' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Ինչ տեսակի ապրանք եք վաճառելու։</Text>}
            name="categories"
            rules={[{ required: true, message: 'Նշե՛ք մեկ կամ մի քանի տարբերակներ' }]}
            >
                <Select
                mode="multiple"
                size={'middle'}
                options={categoryLabels}
                showSearch={false}  
                />
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
    
export default SellerProfileEdit;