import Title from "../../components/sheard/Title";
import image from '../../utilis/Images/hero6.jpg';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={image} alt="" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>E-commerce (electronic commerce) refers to the buying and selling of goods and services online. It has transformed traditional shopping by allowing consumers to purchase products from anywhere, anytime, using computers, smartphones, or tablets. E-commerce platforms offer a variety of products, from clothing and electronics to groceries and digital services. With secure payment gateways and efficient delivery networks, online shopping has become more convenient and accessible than ever.</p>
        <p>E-commerce benefits both businesses and consumers by reducing operational costs, expanding market reach, and offering personalized shopping experiences. Businesses can analyze customer behavior, recommend relevant products, and provide seamless checkout experiences. Customers enjoy the ease of comparing prices, reading reviews, and receiving doorstep deliveries. With advancements in technology, such as AI-driven recommendations and mobile-friendly designs, e-commerce continues to grow rapidly, shaping the future of retail.</p>
        <b className="text-gray-800">OUR MISSION</b>
        <p>At Omega, our mission is to provide high-quality, essential products that make everyday life easier and more convenient. We strive to offer a seamless shopping experience, ensuring that customers can find everything they need for their homes in one place—whether it’s clothing, hygiene products, or household essentials.</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">At Omega, we prioritize quality in every product we offer. Our team carefully selects and verifies each item to ensure it meets high standards of durability, safety, and performance. From sourcing reliable brands to conducting thorough quality checks, we are committed to delivering only the best to our customers.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className="text-gray-600">At Omega, we prioritize quality in every product we offer. Our team carefully selects and verifies each item to ensure it meets high standards of durability, safety, and performance. From sourcing reliable brands to conducting thorough quality checks, we are committed to delivering only the best to our customers.</p>
        </div>        
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">At Omega, we prioritize quality in every product we offer. Our team carefully selects and verifies each item to ensure it meets high standards of durability, safety, and performance. From sourcing reliable brands to conducting thorough quality checks, we are committed to delivering only the best to our customers.</p>
        </div>
      </div>
    </div>
  )
}

export default About
