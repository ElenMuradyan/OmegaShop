import { useSelector } from 'react-redux';
import { RootState } from '../../state-management/redux/store';
import ProductList from '../../components/sheard/ProductList';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ROUTE_NAMES } from '../../utilis/constants/constants';
import { Link } from 'react-router-dom';

const MyProducts = () => {
    const { myProducts } = useSelector((store: RootState) => store.myProducts)
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <Link
        to={ROUTE_NAMES.ADDPRODUCT}
        className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition duration-300"
      >
        <AppstoreAddOutlined className="text-xl" />
        ԱՎԵԼԱՑՆԵԼ ԱՊՐԱՆՔ
      </Link>

      <div className="mt-6">
        <ProductList products={myProducts} />
      </div>
    </div>
  )
}

export default MyProducts;