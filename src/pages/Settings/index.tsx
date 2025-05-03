import { UserOutlined, EnvironmentOutlined, SettingOutlined } from "@ant-design/icons";
import { Typography, Divider, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import { Link } from "react-router-dom";
import { profileOptions } from "../../utilis/constants/profile";
import { ROUTE_NAMES } from "../../utilis/constants/constants";

const { Title } = Typography;

const Settings = () => {
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center"><SettingOutlined />SETTINGS</h2>
            <Divider className="my-6" />
            {
                    Object.entries(profileOptions).map(([key, section]) => {                        
                        return(
                            <div key={key} className="space-y-4">
                                            <Divider className="my-6" />
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
                        </div>            
                        )
                    })
                }
                <Link to={`${ROUTE_NAMES.EDITDATA}/${userData?.role}editaddress`}>
                <Button 
                type="link" 
                className="text-gray-800 hover:text-black flex items-center space-x-2"
                >
                    <EnvironmentOutlined />
                    <span>ADDRESS</span>
                </Button>
                </Link>    

                <Link to={`${ROUTE_NAMES.EDITDATA}/${userData?.role}editdata`}>
                <Button 
                type="link" 
                className="text-gray-800 hover:text-black flex items-center space-x-2"
                >
                    <UserOutlined />
                    <span>PROFILE</span>
                </Button>
                </Link>      
  
        </div>
    );
};

export default Settings;
