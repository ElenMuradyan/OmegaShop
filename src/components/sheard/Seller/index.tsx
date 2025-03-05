import { useSelector } from "react-redux"
import { RootState } from "../../../state-management/redux/store"
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants";
import { seller } from "../../../typescript/types/sellersSliceType";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Seller = ({data}: {data: seller}) => {
    const { sellers } = useSelector((state:RootState) => state.sellers);
    console.log(sellers);
    const { description, categories, id, email, shopName} = data;
  return (
    <Link
    to={`${ROUTE_NAMES.PROFILE}/${id}`}
    className="text-gray-700 cursor-pointer"
    >
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        
        <div className="w-24 h-24 rounded-full">
        <Avatar size={50} style={{backgroundColor: 'black'}}><UserOutlined style={{fontSize: '25px'}}/></Avatar>
        </div>
        
        <div className="flex flex-col justify-between flex-grow">
        <p className="text-lg font-semibold text-gray-800">{shopName}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-2 text-xs text-gray-500">
            <p>Categories: {categories.join(", ")}</p>
            <p>Email: {email}</p>
        </div>
        </div>
    </div>
    </Link>
  )
}

export default Seller
