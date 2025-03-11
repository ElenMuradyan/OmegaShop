import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
import RelatedProducts from "../../components/sheard/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { fetchProductInfo } from "../../state-management/redux/slices/productSlice";

// image scroll
const Product = () => {
  const { productId } = useParams();
  const { productInfo } = useSelector((state: RootState) => state.productInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [imageurl, setimageurl] = useState(productInfo?.images[0]);

  const handleAddToCard = () => {

  };

  useEffect(()=>{
   productId && dispatch(fetchProductInfo(productId));
  }, [])

  useEffect(() => {
    if (productInfo) {
      setimageurl(productInfo.images[0]);
    }
  }, [productInfo]);  
  
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productInfo?.images.map((item, index) => {
                return(
                  <img key={index} onClick={()=>setimageurl(item)} src={item} className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt=""/>
                )
              })
            }
          </div>
          <div className="w-full sm:w-[80%]">
          <img src={imageurl} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productInfo?.name}</h1>
          <p className="mt-5 text-3xl font-medium">{productInfo?.price} AMD</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productInfo?.description}</p>

          <button onClick={handleAddToCard} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CARD</button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Cash on delivery is available on this product.</p>
            <p>Return for this product is available only at the time of delivery.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">DESCRIPTION</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce site is an online platform where businesses and individuals can buy and sell products or services. These websites allow customers to browse, compare, and purchase items from the comfort of their homes.</p>
          <p>E-commerce has revolutionized the way people shop, offering convenience, variety, and accessibility like never before. Businesses can reach a global audience, operate 24/7, and reduce overhead costs compared to physical stores. With the rise of mobile shopping and digital payments, e-commerce continues to grow rapidly, shaping the future of retail and consumer behavior.</p>
        </div>
      </div>
      <RelatedProducts category={productInfo?.category} subcategory={productInfo?.subCategoy}/>
    </div>
  )
}

export default Product
