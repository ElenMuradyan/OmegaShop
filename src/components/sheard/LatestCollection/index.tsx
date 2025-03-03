import ProductItem from "../ProductItem";
import Title from "../Title";
import image from '../../../utilis/Images/hero5.jpg';

const LatestCollection = () => {
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'}></Title>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        {/* Hi everyone this page is for you to show the best apranqner. */}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>

      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi" id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      <ProductItem subCategory="hi"id='43' image={image} name='Soap' price={4500} description='Softens hands' category='House Holdment' stock={5}></ProductItem>
      </div>
    </div>
  )
}

export default LatestCollection
