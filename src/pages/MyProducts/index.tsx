import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../state-management/redux/store';
import ProductList from '../../components/sheard/ProductList';

const MyProducts = () => {
    const { myProducts } = useSelector((store: RootState) => store.myProducts)
  return (
    <div>
      <ProductList products={myProducts}/>
    </div>
  )
}

export default MyProducts;