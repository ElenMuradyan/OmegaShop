import { Dropdown, MenuProps, notification, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { setIsAuth } from "../../../state-management/redux/slices/userDataSlice";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { auth } from "../../../services/firebase/firebase";
import { signOut } from "firebase/auth";

const { useToken } = theme;

const ProfileDropDown = () => {
  const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);
  const { token } = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const handleSignOut = async () => {
    try{
      await signOut(auth);
      dispatch(setIsAuth(false));
    }catch{
      notification.error({
        message: 'Sorry, something went wrong.'
      });
   };
};

const buyerItems: MenuProps["items"] = [
  {
      label: 'My Profile', 
      key: '0',
      onClick: () => navigate(`${ROUTE_NAMES.PROFILE}/${userData?.uid}`)
  }, 
  {
      label: 'Settings', 
      key: '1',
      onClick: () => navigate(ROUTE_NAMES.SETTINGS)
  },
  {
      label: 'Cart',  
      key: '2',
      onClick: () => navigate(ROUTE_NAMES.CARD)
  },
  {
      label: 'Logout', 
      key: '3',
      onClick: () => handleSignOut()
  }
];

const sellerItems: MenuProps["items"] = [
  {
      label: "My Profile", 
      key: "0",
      onClick: () => navigate(`${ROUTE_NAMES.PROFILE}/${userData?.uid}`),
  },
  {
      label: "My Products", 
      key: "1",
      onClick: () => navigate(ROUTE_NAMES.MYPRODUCTS),
  },
  {
      label: 'Cart',
      key: '2',
      onClick: () => navigate(ROUTE_NAMES.CARD)
  },
  {
      label: 'Customer Orders',  
      key: '3',
      onClick: () => navigate(ROUTE_NAMES.NEWORDERS)
  },
  {
      label: "Settings",  
      key: "4",
      onClick: () => navigate(ROUTE_NAMES.SETTINGS),
  },
  {
      label: "Logout",
      key: "5",
      onClick: () => handleSignOut(),
  },
];
return (
    <Dropdown menu={{items: userData?.role === 'seller' ? sellerItems : buyerItems,
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
