import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ROUTE_NAMES } from "./utilis/constants";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Card from "./pages/Card";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
// import Login from "./pages/auth/Login";
import MainLayout from "./layouts/MainLayout";
import Product from "./pages/Product";
import Register from "./pages/auth/Register";

function App() {
  return (
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          <Route path={ROUTE_NAMES.HOMEPAGE} element={<MainLayout/>}>
          <Route index element={<Home/>} />
          {/* <Route path={ROUTE_NAMES.LOGIN} element={<Login/>} /> */}
          <Route path={ROUTE_NAMES.REGISTER} element={<Register/>} />
          <Route path={ROUTE_NAMES.HOME} element={<Home/>} />
          <Route path={ROUTE_NAMES.COLLECTION} element={<Collection/>} />
          <Route path={ROUTE_NAMES.ABOUT} element={<About/>} />
          <Route path={ROUTE_NAMES.CARD} element={<Card/>} />
          <Route path={ROUTE_NAMES.ORDERS} element={<Orders/>} />
          <Route path={ROUTE_NAMES.PLACEORDER} element={<PlaceOrder/>} />
          <Route path={`${ROUTE_NAMES.PRODUCT}/:productId`} element={<Product/>} />
          </Route>
        </Routes>
      </div>
  )
}

export default App
