import { EditOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Avatar, Typography, Divider, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import { Link } from "react-router-dom";
import { profileOptions } from "../../utilis/profile";
import { ROUTE_NAMES } from "../../utilis/constants";

const { Title, Text } = Typography;

const Profile = () => {
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">

                <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-2">
                    <Avatar style={{ backgroundColor: 'black' }} size={80} icon={<UserOutlined />} />
                    <div className="text-center sm:text-left">
                        <Text className="text-lg font-semibold text-gray-700">{userData?.email}</Text>
                        <Link to={ROUTE_NAMES.EDITDATA}>
                        <p className="text-gray-400 text-sm cursor-pointer hover:text-black">
                            <EditOutlined /> Edit your profile
                        </p>
                        </Link>
                    </div>
                </div>

                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                    <Title level={5} className="text-gray-700">
                        <LockOutlined /> Your information and privacy will be kept secure and uncompromised.
                    </Title>
                </div>
            </div>

            <Divider className="my-6" />
            {
                    Object.entries(profileOptions).map(([key, section]) => {                        
                        return(
                            <div key={key} className="space-y-4">
                            <Title level={5} className="text-gray-700">
                            {section.icon} <span>{key}</span> 
                            </Title>

                            <div className="space-y-2">
                                {Object.entries(section.options).map(([optionKey, option]) => {
                                    return(
                                        <Link to={option.link} key={optionKey}>
                                        <Button 
                                        type="link" 
                                        className="text-gray-800 hover:text-black flex items-center space-x-2"
                                        >
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </Button>
                                        </Link>                                    )
                                })}
                            </div>
                            <hr />
                        </div>            
                        )
                    })
                }
        </div>
    );
};

export default Profile;
