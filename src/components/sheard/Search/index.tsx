import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { product } from "../../../typescript/types/product";

const SearchBar = ({ filteredProducts, setFilteredProducts }: { filteredProducts: product[], setFilteredProducts: (val: product[]) => void}) => {
  const [ inputValue, setInputValue ] = useState<string>();
  const handleSearch = () => {
    if(inputValue){
      if (inputValue.trim() === "" || inputValue.length === 1) {
        setFilteredProducts(filteredProducts); 
        return;
      }
      
      const pattern = new RegExp(inputValue, "i");
    
      const products = filteredProducts.filter(item =>
        item.name.match(pattern) || 
        item.description.match(pattern) || 
        item.category.match(pattern) || 
        item.subCategory.match(pattern)
      );    
        
      setFilteredProducts(products);  
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputValue])

  return (
    <div className="border-t border-b text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input onChange={(e) => {setInputValue(e.target.value), console.log(inputValue);
        }} placeholder="Search" className="flex-1 outline-none bg-inherit text-sm"/><SearchOutlined className="cursor-pointer" onClick={() => handleSearch()}/>
        </div>
    </div>
  )
}

export default SearchBar;