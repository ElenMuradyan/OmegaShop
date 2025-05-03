import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { seller } from "../../../typescript/types/sellersSliceType";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { product } from "../../../typescript/types/product";
import LoadingWrapper from "../Loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";

const Seller = ({ data }: { data: seller }) => {
  const { description, categories, id, email, shopName, myproducts } = data;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async (ids: string[]) => {
      if (ids.length === 0){
        setLoading(false);
        return;
      }; 
      try {
        const productsRef = collection(db, FIRESTORE_PATH_NAMES.PRODUCTS);
        const q = query(productsRef, where("id", "in", ids));
        const querySnapshot = await getDocs(q);
        
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }as product));
  
        setProducts(fetchedProducts);
        } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(myproducts.slice(0, 3));
  }, []);

  return (
      <LoadingWrapper isLoading={loading}>
        <Link
          to={`${ROUTE_NAMES.PROFILE}/${id}`}
          className="block w-full cursor-pointer"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white">
            <div className="w-24 h-24 flex-shrink-0">
              <Avatar size={80} style={{ backgroundColor: "black" }}>
                <UserOutlined style={{ fontSize: "40px" }} />
              </Avatar>
            </div>
    
            <div className="flex flex-col flex-grow ml-4">
              <p className="text-xl font-semibold text-gray-800">{shopName}</p>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="mt-2 text-xs text-gray-500">
                <p>
                  <span className="font-semibold">Categories:</span>{" "}
                  {categories.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {email}
                </p>
              </div>
    
              {products.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Featured Products
                  </h3>
                  <div className="flex gap-3 overflow-x-auto">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="w-24 h-24 flex-shrink-0 border border-gray-300 rounded-lg overflow-hidden"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </LoadingWrapper>
    );
};

export default Seller;
