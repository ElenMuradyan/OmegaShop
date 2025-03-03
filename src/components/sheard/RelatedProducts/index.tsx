import { related } from "../../../typescript/interfaces/related";
import ProductItem from "../ProductItem";
import Title from "../Title";
import image from '../../../utilis/Images/hero6.jpg';

const RelatedProducts = ({category, subcategory}: related) => {
console.log(category, subcategory);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      <ProductItem id='43' subCategory="hi" image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem id='43'subCategory="hi" image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem id='43' subCategory="hi" image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem id='43'subCategory="hi" image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem id='43'subCategory="hi" image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      </div>
    </div>
  )
}

export default RelatedProducts;