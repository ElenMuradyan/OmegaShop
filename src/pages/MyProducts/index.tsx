import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state-management/redux/store';
import ProductList from '../../components/sheard/ProductList';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ROUTE_NAMES } from '../../utilis/constants/constants';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchMyProducts, fetchShopInfo } from '../../state-management/redux/slices/shopInfoSlice';
import LoadingWrapper from '../../components/sheard/Loading';

const MyProducts = () => {
    const { myproducts, myShopInfo, loading } = useSelector((store: RootState) => store.shopInfo);
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      if(userData) {
        console.log(true);
        dispatch(fetchShopInfo(userData.uid))
        myShopInfo && dispatch(fetchMyProducts(myShopInfo.myproducts));
      }else{
        console.log(false);
      }
    }, []);

  return (
    <LoadingWrapper isLoading={loading}>
    <div className="bg-white p-6 shadow-md rounded-lg">
      <Link
        to={ROUTE_NAMES.ADDPRODUCT}
        className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition duration-300"
      >
        <AppstoreAddOutlined className="text-xl" />
        ԱՎԵԼԱՑՆԵԼ ԱՊՐԱՆՔ
      </Link>

      <div className="mt-6">
        <ProductList products={myproducts} />
      </div>
    </div>
    </LoadingWrapper>
  )
}

export default MyProducts;