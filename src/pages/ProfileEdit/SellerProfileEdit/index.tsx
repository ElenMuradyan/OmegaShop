import { useEffect, useState } from "react";
import { Form, Input, Button, notification, Typography, Spin, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { sellerRegister } from "../../../typescript/interfaces/register";
import { categoryLabels } from "../../../typescript/types/categories";
import { options } from "../../../utilis/constants/sellerTypeOptions";
import Title from "../../../components/sheard/TitleComponent";
import { fetchShopInfo } from "../../../state-management/redux/slices/shopInfoSlice";
import { handleEditBuyerData, handleEditSellerData } from "../../../utilis/helpers/handleEditBuyerData";

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
        const { firstName, lastName, email, phone, shopName, description, type, categories } = values;

        try {
            if(userData?.uid){
                handleEditBuyerData({ firstName, lastName, phone, email }, userData.uid);
                handleEditSellerData({ shopName, description, type, categories }, userData.uid);
                dispatch(fetchUserData());
                dispatch(fetchShopInfo(email));

                notification.success({
                    message: "Data successfully updated.",
                });
            }
        } catch {
            notification.error({
                message: "Sorry, we couldn't update your data.",
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
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='PERSONAL' text2='INFORMATION' /></h3>

            <Form.Item
                label={<Text className="font-semibold">First Name</Text>}
                name="firstName"
                rules={[{ required: true, message: 'Please enter your first name.' }]}
            >
                <Input placeholder="Enter your first name." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Last Name</Text>}
                name="lastName"
                rules={[{ required: true, message: 'Please enter your last name.' }]}
            >
                <Input placeholder="Enter your last name." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Email</Text>}
                name="email"
                rules={[{ required: true, message: 'Please enter your email.' }]}
            >
                <Input type="email" placeholder="Enter your email." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Phone Number</Text>}
                name="phone"
                rules={[{ required: true, message: 'Please enter your phone number.' }]}
            >
                <Input type="tel" placeholder="Enter your phone number." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Government ID / Business License Upload (File Upload) */}
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR BUSINESS' text2='DESCRIPTION' /></h3>

            <Form.Item
                label={<Text className="font-semibold">Shop Name</Text>}
                name="shopName"
                rules={[{ required: true, message: 'Please enter your shop name.' }]}
            >
                <Input placeholder="Enter your shop name." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Shop Description</Text>}
                name="description"
                rules={[{ required: true, message: 'Please enter your shop description.' }]}
            >
                <Input placeholder="Enter your shop description." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Are you selling as an individual or business?</Text>}
                name="type"
                rules={[{ required: true, message: 'Please select an option.' }]}
            >
                <Select options={options} />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR PRODUCT' text2='CATEGORY' /></h3>

            <Form.Item
                label={<Text className="font-semibold">What type of products are you selling?</Text>}
                name="categories"
                rules={[{ required: true, message: 'Please select one or more options' }]}
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
                    {buttonLoading ? 'PLEASE WAIT...' : 'CONFIRM'}
                </Button>

                <Link
                    to={`${ROUTE_NAMES.EDITDATA}/${userData?.role}editaddress`}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:text-black hover:shadow-md transition-all duration-200"
                >
                    <EnvironmentOutlined className="text-lg" />
                    <span className="text-sm font-medium">YOUR ADDRESS</span>
                </Link>
            </div>
        </Form>
    );
};

export default SellerProfileEdit;
