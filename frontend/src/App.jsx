// import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import RequireAuth from "./components/requireAuth/RequireAuth";

import LandingPage from "./components/landingPage/landingPage";
import SellerHome from "./views/seller/home/sellerHome";
import BuyerHome from "./views/buyer/home/buyerHome";

import SubCategory from "./views/buyer/home/subCategory";
import ServiceFilter from "./views/buyer/filtration/serviceFilter";
import SellerService from "./components/service/service";

import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import Profile from "./components/profile/Profile";

import ServiceGuideline from "./views/seller/serviceManagement/porfileCreation/guideline";
import ServiceProfile from "./views/seller/serviceManagement/porfileCreation/serviceProfile";
import CreateService from "./views/seller/serviceManagement/serviceCreation/ceeateService";
import ServiceDetail from "./views/seller/serviceManagement/serviceInformation/serviceDetail";
import ViewDetails from "./views/buyer/service/viewDetail";

import OrderConfirm from "./views/buyer/order/orderConfirm";
import BookingSummary from "./views/buyer/order/Summary";
import BookingDetails from "./views/buyer/order/BookingDetails";
import OrderService from "./views/buyer/order/orderConfirm";
import OrderSummary from "./views/seller/order/Summary";
import { Chat } from "./components/chat/chat";

import AddStatus from "./views/seller/progress/AddStatus";
import ViewStatus from "./views/seller/progress/ViewStatus";
import OrderDetail from "./views/seller/order/ViewDetails";
import StatusDetail from "./components/statusDetail";
import UpdateStatus from "./views/seller/progress/UpdateStatus";
import SearchResult from "./components/search/searchResult";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import BuyerOrderList from "./views/buyer/order/Summary";
import ViewChat from "./components/chat/viewChat";
import ChatHistory from "./components/chat/chatHistory";

function App() {
  const message = useSelector((state) => state.sellerSlice.toastMessage);

  const name = localStorage.getItem("name");

  // useEffect(()=>{
  //   if(message){
  //     toast(message)

  //   }
  // },[message])

  return (
    <section className="relative">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage>
              <BuyerHome />
            </LandingPage>
          }
        />

        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>

        <Route path="user" element={<BuyerHome />}>
          <Route
            path="category/:categoryId/service/:serviceId"
            element={<ServiceFilter />}
          />

          <Route path="service/:serviceId" element={<ViewDetails />} />

          <Route path="category/:categoryId" element={<SubCategory />} />
          <Route path="chat/receiver/:receiverId" element={<Chat />}></Route>

          <Route path="booking/customer" element={<BookingSummary />}>
            <Route path="order/:orderId" element={<BookingDetails />}></Route>
          </Route>
          <Route
            path="provider/:providerId/category/:categoryId/order"
            element={<OrderService />}
          />
        </Route>
        <Route path="user/search" element={<SearchResult />} />

        <Route
          path={`/${name}/order/service`}
          element={<OrderConfirm />}
        ></Route>
        <Route
          path={`/${name}/order/summary`}
          element={<BuyerOrderList />}
        ></Route>
        <Route path={`/${name}/chat/receiver`} element={<ViewChat />}></Route>

        <Route path={`user/${name}/*`} element={<SellerHome />}>
          <Route path="profile" element={<Profile />} />
          <Route path="service/guideline" element={<ServiceGuideline />} />

          <Route
            path="service/profile"
            element={
              <RequireAuth>
                <ServiceProfile />
              </RequireAuth>
            }
          />
          <Route path="service/create" element={<CreateService />} />
          <Route path="service/:serviceId" element={<ServiceDetail />} />
          <Route path="received/orders/*" element={<OrderSummary />}>
            <Route path=":orderId" element={<OrderDetail />}>
              <Route path="progress/*" element={<ViewStatus />}>
                <Route path=":progressId/more" element={<StatusDetail />} />
                <Route path="create" element={<AddStatus />} />
                <Route path=":progressId/update" element={<UpdateStatus />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      <Footer />
    </section>
  );
}

export default App;
