import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ROUTE_NAMES } from "./utilis/constants";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Card from "./pages/Card";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/auth/Login";
import MainLayout from "./layouts/MainLayout";
import Product from "./pages/Product";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state-management/redux/store";
import { useEffect } from "react";
import { changeLoading, fetchUserData } from "./state-management/redux/slices/userDataSlice";
import CabinetLayout from "./layouts/Cabinet";
import { supabase } from "./services/supabase/supabase";
import LoadingWrapper from "./components/sheard/Loading";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Links from "./pages/Links";
import ScrollToTop from "./components/sheard/ScrollToTop";
import EditDataLayout from "./layouts/EditDataLayout";
import BuyerProfileEdit from "./pages/ProfileEdit/BuyerProfileEdit";
import SellerProfileEdit from "./pages/ProfileEdit/SellerProfileEdit";
import { fetchShopInfo } from "./state-management/redux/slices/shopInfoSlice";
import BuyerAddressEdit from "./pages/ProfileEdit/BuyerAddressEdit";
import SellerAddressEdit from "./pages/ProfileEdit/SellerAddressEdit";
import Profile from "./pages/Profile";
import Sellers from "./pages/Sellers";

function App() {
  const { isAuth } = useSelector((store: RootState) => store.userData.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      if(data.session?.user?.email){
        await dispatch(fetchUserData(data.session.user.email));

        if(data.session.user.user_metadata.userRole === 'seller'){          
          dispatch(fetchShopInfo(data.session.user.email))
        }
      }
      dispatch(changeLoading(false));
    }
    restoreSession();
  },[]);

  return (
    <LoadingWrapper>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ScrollToTop />
        <Routes>
          <Route path={ROUTE_NAMES.HOMEPAGE} element={<MainLayout/>}>
          <Route index element={<Home/>} />
          <Route path={ROUTE_NAMES.LOGIN} element={isAuth ? <Navigate to={ROUTE_NAMES.CABINET}/> : <Login/>} />
          <Route path={ROUTE_NAMES.REGISTER} element={isAuth ? <Navigate to={ROUTE_NAMES.CABINET}/> : <Register/>} />
          <Route path={ROUTE_NAMES.BUYERREGISTER} element={isAuth ? <Navigate to={ROUTE_NAMES.CABINET}/> : <Register/>} />
          <Route path={ROUTE_NAMES.SELLERREGISTER} element={isAuth ? <Navigate to={ROUTE_NAMES.CABINET}/> : <Register/>} />
          <Route path={ROUTE_NAMES.HOME} element={<Home/>} />
          <Route path={ROUTE_NAMES.COLLECTION} element={<Collection/>} />
          <Route path={ROUTE_NAMES.ABOUT} element={<About/>} />
          <Route path={ROUTE_NAMES.SHARE} element={<Links/>} />
          <Route path={ROUTE_NAMES.HELP} element={<Help />} />
          <Route path={ROUTE_NAMES.SELLERS} element={<Sellers />} />
          {/* Cabinet */}

          <Route path={ROUTE_NAMES.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_NAMES.LOGIN} />}>
            {/* Edit */}
            <Route path={ROUTE_NAMES.EDITDATA} element={<EditDataLayout />}>
            <Route path={ROUTE_NAMES.BUYEREDITDATA} element={<BuyerProfileEdit />} />
            <Route path={ROUTE_NAMES.SELLEREDITDATA} element={<SellerProfileEdit />} />

            <Route path={ROUTE_NAMES.BUYEREDITSDDRESS} element={<BuyerAddressEdit />} />
            <Route path={ROUTE_NAMES.SELLEREDITADDRESS} element={<SellerAddressEdit />} />
            </Route>

            <Route path={ROUTE_NAMES.CARD} element={<Card/>} />
            <Route path={ROUTE_NAMES.ORDERS} element={<Orders/>} />
            <Route path={ROUTE_NAMES.PLACEORDER} element={<PlaceOrder/>} />
            <Route path={ROUTE_NAMES.SETTINGS} element={<Settings />} />
            <Route path={`${ROUTE_NAMES.PRODUCT}/:productId`} element={<Product/>} />
            <Route path={`${ROUTE_NAMES.PROFILE}/:userId`} element={<Profile />} />
          </Route>
          </Route>
        </Routes>
      </div>
    </LoadingWrapper>
  )
};

export default App; 
