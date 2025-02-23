import BestSeller from "../../components/BestSeller";
import Hero from "../../components/Hero";
import LatestCollection from "../../components/LatestCollection";
import OurPolicy from "../../components/OurPolicy";
import SearchBar from "../../components/Search";

const Home = () => {  
  return (
    <div>
      <SearchBar />
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home
