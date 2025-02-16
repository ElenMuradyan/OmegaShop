import { useState } from "react";
import { useParams } from "react-router-dom";
import image from '../../utilis/Images/hero3.jpg';
import image1 from '../../utilis/Images/hero2.jpg';
import image2 from '../../utilis/Images/hero4.jpg';
import image3 from '../../utilis/Images/hero.jpg';
import { StarOutlined } from "@ant-design/icons";
import RelatedProducts from "../../components/RelatedProducts";

// image scroll
const Product = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [imageurl, setimageurl] = useState(image)
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img onClick={()=>setimageurl(image)} src={image} className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt=""/>
            <img onClick={()=>setimageurl(image1)} src={image1} className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt=""/>
            <img onClick={()=>setimageurl(image2)} src={image2} className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt=""/>
            <img onClick={()=>setimageurl(image3)} src={image3} className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt=""/>
            <img onClick={()=>setimageurl(image3)} src={image3} className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt=""/>
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={imageurl} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">Soap</h1>
          <div className="flex items-center gap-1 mt-2">
            <StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">4500 AMD</p>
          <p className="mt-5 text-gray-500 md:w-4/5">Very long description</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              <button className="border py-2 px-4 bg-gray-100 hover:bg-gray-300">S</button>
              <button className="border py-2 px-4 bg-gray-100 hover:bg-gray-300">M</button>
              <button className="border py-2 px-4 bg-gray-300 border-purple-500">XXL</button>
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CARD</button>
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
          <p className="border px-5 py-3 text-sm">Reviews (22)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce site is an online platform where businesses and individuals can buy and sell products or services. These websites allow customers to browse, compare, and purchase items from the comfort of their homes.</p>
          <p>E-commerce has revolutionized the way people shop, offering convenience, variety, and accessibility like never before. Businesses can reach a global audience, operate 24/7, and reduce overhead costs compared to physical stores. With the rise of mobile shopping and digital payments, e-commerce continues to grow rapidly, shaping the future of retail and consumer behavior.</p>
        </div>
      </div>
      <RelatedProducts category="hi" subcategory="bye"/>
    </div>
  )
}

export default Product
