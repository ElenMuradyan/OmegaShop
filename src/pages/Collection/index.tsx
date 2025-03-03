import { useState } from "react";
import { Categories } from "../../typescript/types/categories";
import { DownOutlined } from "@ant-design/icons";
import Title from "../../components/sheard/Title";
import { Select } from "antd";
import { arragementValues } from "../../typescript/types/productArragement";
import ProductItem from "../../components/sheard/ProductItem";
import image from '../../utilis/Images/hero6.jpg';

const Collection = () => {
  const [ showFilter, setShowFilter ] = useState(false);

  const handleChange = () => {};

// add handle function everything about filters and categories and arragement

  return (
    <div className="flex flex-col gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <DownOutlined className={`h-3 sm:hidden ${showFilter ? 'rotate-180' : ''}`} onClick={() => setShowFilter(!showFilter)}/>
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="grid lg:grid-cols-7 sm:grid-cols-3 gap-2 text-sm font-light text-gray-700">
            {Categories.map((category, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3" value={category.label} />
                  {category.label}
                </label>

                {category.undercategories &&
                  category.undercategories.map((item, subIndex) => (
                    <label key={subIndex} className="flex items-center gap-2 pl-4">
                      <input type="checkbox" className="w-2 h-2 border border-gray-400 rounded-full appearance-none checked:bg-gray-500 checked:border-transparent transition-all cursor-pointer" value={item.label} />
                      <p className="text-gray-500">{item.label}</p>
                    </label>
                  ))}
              </div>
            ))}
          </div>
          </div>
      </div>

      {/* right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 gap-2 sm:gap-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <Select onChange={handleChange} options={arragementValues} placeholder='Select arragement' className="sm:w-1/3"/>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>

      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>

        </div>
      </div>
    </div>
  )
}

export default Collection
