import Title from "../../components/sheard/TitleComponent"; 
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
          <p>
            E-commerce refers to the online buying and selling of goods and services. It has transformed the traditional shopping process, allowing people to purchase necessary items from anywhere in the world at any time. E-commerce platforms offer a wide range of products, from clothing and electronics to food and digital services. Thanks to secure payment systems and efficient delivery networks, online shopping has become more convenient and accessible today.
          </p>
          <p>
            E-commerce helps businesses and consumers reduce costs, expand markets, and provide a personalized shopping experience. Businesses can analyze customer behavior, offer relevant products, and ensure an easy shopping process. Consumers, in turn, can compare prices, read reviews, and receive orders directly at their doorsteps. With the advancement of technology (such as AI-driven recommendations and mobile-optimized designs), e-commerce continues to grow, shaping the future of retail.
          </p>
          <b className="text-gray-800">OUR MISSION</b>
          <p>
            At Omega, our mission is to provide high-quality, essential products that simplify and enhance everyday life. We strive to offer a smooth and convenient shopping experience, so our customers can find all the items they need in one place—clothing, hygiene products, and household essentials.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            At Omega, we prioritize the quality of every product we offer. Our team carefully selects and inspects all items to ensure their durability, safety, and high quality. We partner with trusted brands and conduct rigorous quality checks to provide the best for our customers.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            We understand the value of time, so we offer a fast and easy shopping process. On our platform, you can find the products you need with just a few clicks, make purchases 24/7, and have orders delivered to your preferred address.
          </p>
        </div>        
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Excellent Customer Service</b>
          <p className="text-gray-600">
            Our team is always ready to assist and provide a personalized approach to each customer. We strive to respond quickly to inquiries, resolve issues, and provide top-quality service to ensure our customers are always satisfied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
