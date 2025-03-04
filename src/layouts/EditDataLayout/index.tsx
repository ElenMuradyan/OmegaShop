import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Typography } from "antd"
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import { Outlet } from "react-router-dom";

const { Text, Title } = Typography;

const EditDataLayout = () => {
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">

        <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-2">
            <Avatar style={{ backgroundColor: 'black' }} size={80} icon={<UserOutlined />} />
            <div className="text-center sm:text-left">
                <Text className="text-lg font-semibold text-gray-700">{userData?.email}</Text>
            </div>
        </div>

        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <Title level={5} className="text-gray-700">
                <LockOutlined /> Your information and privacy will be kept secure and uncompromised.
            </Title>
        </div>
        </div>

        <Outlet />
        
        </div>
)
}

export default EditDataLayout;