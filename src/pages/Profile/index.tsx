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

    useEffect(()=>{
        userId && dispatch(fetchSellerProfileInfo(userId));
    },[userId, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
    <div className="flex items-center gap-6">
        <Avatar size={100} style={{backgroundColor: 'black'}}><UserOutlined style={{fontSize: '50px'}}/></Avatar>
        <div className="flex-1">
            <h2 className="text-2xl font-bold">{shopInfo?.shopName}</h2>
            <p className="text-gray-500">{shopInfo?.categories.join(", ")}</p>
            {/* <div className="mt-2 flex gap-3">
                    <>
                        <button className="px-4 py-1 text-sm bg-blue-500 text-white rounded-md">Follow</button>
                        <button className="px-4 py-1 text-sm bg-gray-200 rounded-md">Message</button>
                    </>
            </div> */}
        </div>
    </div>

    {/* --- Description Section --- */}
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

    {/* --- Divider --- */}
    <hr className="my-6 border-gray-300" />

    {/* --- Product Grid Section --- */}
    <h3 className="text-lg font-semibold flex items-center gap-2">
        <ShoppingCartOutlined size={20} /> ՄԵՐ ԱՊՐԱՆՔՆԵՐԸ
    </h3>
    <ProductList products={products} />
</div>
)
}

export default Profile;