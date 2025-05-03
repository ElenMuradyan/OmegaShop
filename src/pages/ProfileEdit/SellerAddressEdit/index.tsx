import { Button, Form, Input, notification, Typography, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { sellerAddresses } from "../../../typescript/types/userDataState";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { EnvironmentOutlined, HomeOutlined, SendOutlined } from "@ant-design/icons";
import Title from "../../../components/sheard/TitleComponent";
import { fetchShopInfo } from "../../../state-management/redux/slices/shopInfoSlice";
import { handleEditBuyerData, handleEditSellerData } from "../../../utilis/helpers/handleEditBuyerData";

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

        const address = { region, city, street, postIndex };
        const businessAddress = { businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone };
        try {
            if (userData?.uid) {
                const email = userData.email;
                handleEditBuyerData({ address: address }, userData.uid);
                handleEditSellerData({ businessAddress: businessAddress }, userData.uid);

                dispatch(fetchUserData());
                dispatch(fetchShopInfo(email));
                notification.success({
                    message: "Address updated successfully.",
                    description: "You have successfully updated your address.",
                });
            }
        } catch {
            notification.error({
                message: "Sorry, we couldn't change your address.",
            });
        } finally {
            setButtonLoading(false);
        }
    };

    useEffect(() => {
        userData && dispatch(fetchShopInfo(userData?.uid));
    }, []);
    
    useEffect(() => {                
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
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR' text2='ADDRESS' /></h3>
            
            {/* Region Field */}
            <Form.Item
                label={
                    <Space>
                        <HomeOutlined />
                        <Text className="font-semibold">Region</Text>
                    </Space>
                }
                name="region"
                rules={[{ required: true, message: 'Please enter your region.' }]}
            >
                <Input placeholder="For example, Ararat Region" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* City Field */}
            <Form.Item
                label={
                    <Space>
                        <EnvironmentOutlined />
                        <Text className="font-semibold">City</Text>
                    </Space>
                }
                name="city"
                rules={[{ required: true, message: 'Please enter your city.' }]}
            >
                <Input placeholder="For example, Yerevan" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Street Field */}
            <Form.Item
                label={
                    <Space>
                        <HomeOutlined />
                        <Text className="font-semibold">Street</Text>
                    </Space>
                }
                name="street"
                rules={[{ required: true, message: 'Please enter your street.' }]}
            >
                <Input placeholder="For example, Mashtots Avenue" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Postal Code Field */}
            <Form.Item
                label={
                    <Space>
                        <SendOutlined />
                        <Text className="font-semibold">Postal Code</Text>
                    </Space>
                }
                name="postIndex"
                rules={[
                    { required: true, message: 'Please enter your postal code.' },
                    { pattern: /^[0-9]{4,6}$/, message: 'Enter a valid postal code.' },
                ]}
            >
                <Input placeholder="For example, 0010" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR BUSINESS' text2='ADDRESS' /></h3>

            <Form.Item
                label={<Text className="font-semibold">Region</Text>}
                name="businessRegion"
                rules={[{ required: true, message: 'Please enter the region.' }]}
            >
                <Input placeholder="Enter the region." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">City</Text>}
                name="businessCity"
                rules={[{ required: true, message: 'Please enter the city.' }]}
            >
                <Input placeholder="Enter the city." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Street</Text>}
                name="businessStreet"
                rules={[{ required: true, message: 'Please enter the street.' }]}
            >
                <Input placeholder="Enter the street." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Postal Code</Text>}
                name="businessPostIndex"
                rules={[
                    { required: true, message: 'Please enter the postal code.' },
                    { pattern: /^[0-9]{4,6}$/, message: 'Enter a valid postal code.' },
                ]}
            >
                <Input placeholder="Enter the postal code." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
                label={<Text className="font-semibold">Business Phone Number</Text>}
                name="businessPhone"
                rules={[{ required: true, message: 'Please enter the phone number.' }]}
            >
                <Input type="tel" placeholder="Enter the phone number." className="border border-gray-300 rounded-lg py-3 px-4" />
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
                    {buttonLoading ? 'PLEASE WAIT...' : 'CONFIRM'}
                </Button>
            </div>
        </Form>
    );
};

export default SellerAddressEdit;
