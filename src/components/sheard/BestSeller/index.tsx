import ProductItem from "../ProductItem"
import Title from "../Title"
import image from '../../../utilis/Images/hero2.jpg'

const BestSeller = () => {
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Hi everyone this page is for you to show the best apranqner.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem  subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      </div>
    </div>
  )
}

export default BestSeller
