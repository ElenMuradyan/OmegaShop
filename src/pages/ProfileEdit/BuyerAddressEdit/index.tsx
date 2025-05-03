import { Button, Form, Input, notification, Typography, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { address } from "../../../typescript/types/userDataState";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { EnvironmentOutlined, HomeOutlined, SendOutlined } from "@ant-design/icons";
import { handleEditBuyerData } from "../../../utilis/helpers/handleEditBuyerData";

const { Text } = Typography;

const BuyerAddressEdit = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [buttonLoading, setButtonLoading] = useState(false);
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);

    const handleEditUserAddress = async (values: address) => {
        setButtonLoading(true);
        try {
            if (userData?.uid) {
              const id = userData.uid;
              const object = {address: values}
              handleEditBuyerData(object, id);
                dispatch(fetchUserData());
                notification.success({
                    message: "The address has been successfully updated.",
                    description: "You have successfully changed your address.",
                });
            }
        } catch {
            notification.error({
                message: "Sorry, we couldn't update your address.",
            });
        } finally {
            setButtonLoading(false);
        }
    };

    useEffect(() => {            
        form.setFieldsValue(userData?.address);
    }, [userData]);

    return (
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
                  <Text className="font-semibold">Region</Text>
                </Space>
              }
              name="region"
              rules={[{ required: true, message: 'Please enter your region.' }]}
            >
              <Input placeholder="For example: Ararat region" className="border border-gray-300 rounded-lg py-3 px-4" />
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
              <Input placeholder="For example: Yerevan" className="border border-gray-300 rounded-lg py-3 px-4" />
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
              <Input placeholder="For example: Mashtots Avenue" className="border border-gray-300 rounded-lg py-3 px-4" />
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
                { pattern: /^[0-9]{4,6}$/, message: 'Please enter a valid postal code.' }
              ]}
            >
              <Input placeholder="For example: 0010" className="border border-gray-300 rounded-lg py-3 px-4" />
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

export default BuyerAddressEdit;
