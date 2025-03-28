import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../../components/sheard/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { fetchProductInfo } from "../../state-management/redux/slices/productSlice";
import { names } from "../../utilis/constants/optionNamesOptions";
import { orderedProductInfo, selectedOptions } from "../../typescript/types/oderedProductInfo";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { handleAddToCart } from "../../utilis/helpers/handleAddToCart";
import LoadingWrapper from "../../components/sheard/Loading";
import BackButton from "../../components/sheard/BackButton";

const Product = () => {
  const { productId } = useParams();
  const { productInfo } = useSelector((state: RootState) => state.productInfo);
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [imageurl, setimageurl] = useState(productInfo?.images[0]);
  const [ choosenOptions, setChoosenOptions ] = useState<selectedOptions>({});
  const [ buttonLoading, setButtonLoading ] = useState<boolean>(false);
  const [ orderedProductInfo, setOrderedProductInfo ] = useState<orderedProductInfo>({stock: 0, options: choosenOptions});
  const [ errrorMessage, setErrorMessage ] = useState<string>('');
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setOrderedProductInfo((prev) => ({
      ...prev,
      options: choosenOptions,  
    }));
  }, [choosenOptions]); 

  useEffect(()=>{
   productId && dispatch(fetchProductInfo(productId));
  }, [])

  useEffect(() => {
    setLoading(!Boolean(productInfo?.images[0]));
    setimageurl(productInfo?.images[0]);
  }, [productInfo?.images[0]]);

  useEffect(() => {
    if (productInfo) {
      setimageurl(productInfo.images[0]);
    }
  }, [productInfo]);  
  
  return (
    <>
      <BackButton/>
      <LoadingWrapper isLoading={loading}>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row h-[450px]">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full 
                          bg-gray-100 p-2 rounded-md shadow-md h-full max-h-[450px]">
            {
              productInfo?.images.map((item, index) => (
                <img 
                  key={index} 
                  onClick={() => setimageurl(item)} 
                  src={item} 
                  className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity rounded-lg border border-gray-300" 
                  alt=""
                />
              ))
            }
          </div>

          {/* Main Image Section */}
          <div className="w-full sm:w-[80%]">
            <img src={imageurl} className="w-full h-[450px] object-contain rounded-md" alt="" />
          </div>
        </div>

          {/* info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productInfo?.name}</h1>
            <p className="mt-5 text-3xl font-medium">{productInfo?.price} AMD</p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productInfo?.description}</p>
            <p className="mt-5 text-gray-500 md:w-4/5">Available Stock: {productInfo?.stock}</p>

              {
               productInfo?.options && productInfo?.options.map((item) => {
                  return(
                    <div className="flex flex-col gap-4 my-8" key={item.optionName}>
                      <p>Ընտրեք {names[item.optionName]}</p>
                      <div className="flex gap-2">
                        {
                          item.optionValue.map((value) => {
                            return (<button onClick={()=>{
                              setErrorMessage('')
                              setChoosenOptions((prev)=>({
                                ...prev,
                                [item.optionName]: value
                              }));
                            }} className={`border py-2 px-4 ${(choosenOptions[item.optionName] === value) ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-300`} key={value}>{value}</button>)
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }

          <p>Ընտրեք քանակը</p>
          <Input type="number" min={1} max={productInfo?.stock} value={orderedProductInfo.stock} onChange={(e) => {
            setErrorMessage('')
            setOrderedProductInfo((prev) => ({
              ...prev,
              stock: Number(e.target.value)
          }))}}/>

          <hr className="m-8 sm:w-4/5"/>
            <button onClick={() => handleAddToCart({productInfo, choosenOptions, setErrorMessage, orderedProductInfo, userData, setButtonLoading, productId, dispatch, setChoosenOptions, setOrderedProductInfo })} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">{buttonLoading ? <><LoadingOutlined/> ...LOADING</> : 'ADD TO CARD'}</button>
            {errrorMessage && <p className="text-red-500">{errrorMessage}</p>}
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
        <RelatedProducts category={productInfo?.category} subcategory={productInfo?.subCategory}/>
      </div>

      </LoadingWrapper>
   </>
  )
}

export default Product
