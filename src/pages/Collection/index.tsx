import { useState } from "react"
import { Categories } from "../../typescript/types/categories";
import { DownOutlined } from "@ant-design/icons";
import Title from "../../components/Title";

const Collection = () => {
  const [ showFilter, setShowFilter ] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
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
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          
        </div>
      </div>
    </div>
  )
}

export default Collection
