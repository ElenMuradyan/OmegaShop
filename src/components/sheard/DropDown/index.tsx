import { Dropdown, MenuProps, notification, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state-management/redux/store";
import { supabase } from "../../../services/supabase/supabase";
import { setIsAuth } from "../../../state-management/redux/slices/userDataSlice";
import { ROUTE_NAMES } from "../../../utilis/constants";

const { useToken } = theme;

const ProfileDropDown = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    try{
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            throw error;
        };

        notification.success({
            message: "Դուրս եկաք համակարգից հաջողությամբ։",
        });

        dispatch(setIsAuth(false));
    }catch{
        notification.error({
            message: 'Կներեք, ինչ-որ բան սխալ գնաց։'
        })
    };
};

const items: MenuProps["items"] = [
    {
        label: 'My Profile',
        key: '0',
        onClick: () => navigate(ROUTE_NAMES.EDITDATA)
    }, 
    {
        label: 'Settings',
        key: '1',
        onClick: () => navigate(ROUTE_NAMES.PROFILE)
    },
    {
        label: 'Logout',
        key: '2',
        onClick: () => handleSignOut()
    }
]
  return (
    <Dropdown menu={{items,
      style: {
        fontSize: "1.25rem",
        minWidth: "200px",
      },
    }}
    trigger={["click"]}
    dropdownRender={(menu) => {
      return(
          <div style={{
              borderRadius: token.borderRadiusLG,
              backgroundColor: token.colorBgElevated,
              boxShadow: token.boxShadowSecondary,
            }}>
              {menu}
          </div>
      )
    }}>
      <UserOutlined />
    </Dropdown>
  )
};

export default ProfileDropDown;