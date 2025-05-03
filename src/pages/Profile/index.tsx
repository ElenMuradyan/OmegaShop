import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state-management/redux/store"
import { Avatar } from "antd";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { fetchSellerProfileInfo } from "../../state-management/redux/slices/sellerProfileSlice";
import ProductList from "../../components/sheard/ProductList";

const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { shopInfo, products } = useSelector((store:RootState) => store.sellerProfile);
    const { userData } = useSelector((store:RootState) => store.userData.authUserInfo);

    useEffect(()=>{
        userId && dispatch(fetchSellerProfileInfo(userId));
    },[userId, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
{
    shopInfo ? <div>
            <div className="flex items-center gap-6">
        <Avatar size={100} style={{backgroundColor: 'black'}}><UserOutlined style={{fontSize: '50px'}}/></Avatar>
        <div className="flex-1">
            <h2 className="text-2xl font-bold">{shopInfo?.shopName}</h2>
            <p className="text-gray-500">{shopInfo?.categories.join(", ")}</p>
        </div>
    </div>

    <p className="mt-4 text-gray-700">{shopInfo?.description}</p>
<hr/>
    <div className="mt-4 space-y-1 text-gray-600">
        <p className="flex items-center gap-2">
            <MailOutlined size={16} /> {shopInfo?.email}
        </p>
        <p className="flex items-center gap-2">
            <PhoneOutlined size={16} /> {shopInfo?.businessAddress?.businessPhone}
        </p>
        <p className="flex items-center gap-2">
            <EnvironmentOutlined /> {shopInfo?.businessAddress?.businessCity}, {shopInfo?.businessAddress?.businessRegion}
        </p>
    </div>

    <hr className="my-6 border-gray-300" />

    <h3 className="text-lg font-semibold flex items-center gap-2">
        <ShoppingCartOutlined size={20} /> ՄԵՐ ԱՊՐԱՆՔՆԵՐԸ
    </h3>
    <ProductList products={products} />
    </div> :
    <div>
        <div className="flex items-center gap-6">
        <Avatar size={100} style={{backgroundColor: 'black'}}><UserOutlined style={{fontSize: '50px'}}/></Avatar>
        <div className="flex-1">
            <h2 className="text-2xl font-bold">{`${userData?.firstName} ${userData?.lastName}`}</h2>
        </div>
    </div>
    <hr/>
        <div className="mt-4 space-y-1 text-gray-600">
            <p className="flex items-center gap-2">
                <MailOutlined size={16} /> {userData?.email}
            </p>
            <p className="flex items-center gap-2">
                <PhoneOutlined size={16} /> {userData?.phone}
            </p>
            <p className="flex items-center gap-2">
                <EnvironmentOutlined /> {userData && Object.values(userData?.address).join(', ')}
            </p>
        </div>
    </div>
    }
    </div>
)
}

export default Profile;