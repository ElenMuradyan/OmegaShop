import { useEffect, useState } from "react";
import { Categories } from "../../typescript/types/categories";
import { DownOutlined } from "@ant-design/icons";
import Title from "../../components/sheard/TitleComponent";
import { Select } from "antd";
import { arragementValues } from "../../typescript/types/productArragement";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import ProductList from "../../components/sheard/ProductList";
import { product } from "../../typescript/types/product";

const Collection = () => {
  const [ showFilter, setShowFilter ] = useState(false);
  const { products } = useSelector((state: RootState) => state.products);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategories, setSelectedSubcategories] = useState<string[]>([]);

  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [ filteredProducts, setFilteredProducts ] = useState<product[]>([]);

  const handleCategoryChange = (category: string) => {
    selectedCategory === category ? setSelectedCategory('') : setSelectedCategory(category);
    setSelectedSubcategories([]);
  };

  
  const handleSubcategoryChange = (category: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  useEffect(() => {
    const filteredProducts = products.filter((item) => {
      const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
      const subcategoryMatch = selectedSubCategories.length ? selectedSubCategories.includes(item.subCategory) : true;
      return categoryMatch && subcategoryMatch;
    }).sort((a, b) => {
      if (sortOrder === arragementValues[0].value) return 0;
      if (sortOrder === arragementValues[1].value) return a.price - b.price;
      if (sortOrder === arragementValues[2].value) return b.price - a.price;
      return 0;
    });

    setFilteredProducts(filteredProducts);
  }, [sortOrder, selectedCategory, selectedSubCategories, products]);

  return (
    <div className="flex flex-col gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">ՖԻԼՏՐԵՐ
          <DownOutlined className={`h-3 sm:hidden ${showFilter ? 'rotate-180' : ''}`} onClick={() => setShowFilter(!showFilter)}/>
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">ԿԱՏԵԳՈՐԻԱՆԵՐ</p>
          <div className="grid lg:grid-cols-7 sm:grid-cols-3 gap-2 text-sm font-light text-gray-700">
            {Categories.map((category, index) => {
              const isSelectedCategory = selectedCategory === category.label;
              return(
                <>
                {selectedCategory === ''  || isSelectedCategory ? (
                <div key={index} className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input 
                    type="checkbox" 
                    className="w-3" 
                    value={category.label} 
                    onChange={() => handleCategoryChange(category.label)}
                    />
                    {category.label}
                  </label>
  
                  {
                    (selectedCategory === category.label) && category.undercategories.map((item, subIndex) => (
                      <label key={subIndex} className="flex items-center gap-2 pl-4">
                        <input 
                         type="checkbox"
                         className="w-2 h-2 border border-gray-400 rounded-full appearance-none checked:bg-gray-500 checked:border-transparent transition-all cursor-pointer" 
                         value={item.label} 
                         onChange={() => handleSubcategoryChange(item.label)}
                         />
                        <p className="text-gray-500">{item.label}</p>
                      </label>
                    ))}
                </div>
              ) : null}
                </>
               )
            })}
          </div>
          </div>
      </div>

      {/* right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 gap-2 sm:gap-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <Select onChange={handleSortChange} options={arragementValues} placeholder='Select arragement' className="sm:w-1/3"/>
        </div>
          <ProductList products={filteredProducts} />
      </div>
    </div>
  )
}

export default Collection
