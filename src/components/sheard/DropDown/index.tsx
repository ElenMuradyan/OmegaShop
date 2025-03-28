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
            message: 'Կներեք, ինչ-որ բան սխալ գնաց։'
        })
    };
};

  const buyerItems: MenuProps["items"] = [
      {
          label: 'Իմ Պրոֆիլը',
          key: '0',
          onClick: () => navigate(`${ROUTE_NAMES.PROFILE}/${userData?.uid}`)
      }, 
      {
          label: 'Կարգավորումներ',
          key: '1',
          onClick: () => navigate(ROUTE_NAMES.SETTINGS)
      },
      {
        label: 'Պատվերներ',
        key: '2',
        onClick: () => navigate(ROUTE_NAMES.ORDERS)
    },
      {
          label: 'Ելք',
          key: '3',
          onClick: () => handleSignOut()
      }
  ];

  const sellerItems: MenuProps["items"] = [
    {
      label: "Իմ Պրոֆիլը",
      key: "0",
      onClick: () => navigate(`${ROUTE_NAMES.PROFILE}/${userData?.uid}`),
    },
    {
      label: "Իմ Ապրանքները",
      key: "1",
      onClick: () => navigate(ROUTE_NAMES.MYPRODUCTS),
    },
    {
      label: 'Իմ Պատվերները',
      key: '2',
      onClick: () => navigate(ROUTE_NAMES.ORDERS)
    },
    {
      label: 'Հաճախորդի Պատվերներ',
      key: '3',
      onClick: () => navigate(ROUTE_NAMES.NEWORDERS)
    },
    {
      label: "Կարգավորումներ",
      key: "4",
      onClick: () => navigate(ROUTE_NAMES.SETTINGS),
    },
    {
      label: "Ելք",
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
