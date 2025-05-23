import BestSeller from "../../components/sheard/BestSeller";
import Hero from "../../components/sheard/Hero";
import LatestCollection from "../../components/sheard/LatestCollection";
import OurPolicy from "../../components/sheard/OurPolicy";

const Home = () => {  
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  )
};

export default Home;