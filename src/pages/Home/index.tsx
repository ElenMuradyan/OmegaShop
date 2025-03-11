import Hero from "../../components/sheard/Hero";
import OurPolicy from "../../components/sheard/OurPolicy";
import SearchBar from "../../components/sheard/Search";

const Home = () => {  
  return (
    <div>
      <SearchBar />
      <Hero />
      {/* <LatestCollection />
      <BestSeller /> */}
      <OurPolicy />
    </div>
  )
};

export default Home;