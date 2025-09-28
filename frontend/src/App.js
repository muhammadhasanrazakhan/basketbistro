//import React, { lazy, Suspense, useEffect } from 'react';
import React, { useLayoutEffect } from 'react';
import { Toaster } from 'react-hot-toast';
// import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import AuthProvider from './contexts/AuthProvider';
import IsAdmin from './Pages/AuthPage/IsAdmin/IsAdmin';
import RequiredAuth from './Pages/AuthPage/RequiredAuth/RequiredAuth';
import SingleCategory from './Pages/CategoriesPage/SingleCategory/SingleCategory';
import AddAdmin from './Pages/DashboardPage/AddAdmin/AddAdmin';
import AddProduct from './Pages/DashboardPage/AddProduct/AddProduct';
import CreateOffer from './Pages/DashboardPage/CreateOffer/CreateOffer';
import AddReview from './Pages/DashboardPage/AddReview/AddReview';
import ManageOrders from './Pages/DashboardPage/ManageOrders/ManageOrders';
import OrderDetails from './Pages/DashboardPage/OrderDetails/OrderDetails';
import ManageProducts from './Pages/DashboardPage/ManageProducts/ManageProducts';
import ManageUsers from './Pages/DashboardPage/ManageUsers/ManageUsers';
import ManageOffers from './Pages/DashboardPage/ManageOffers/ManageOffers';
import UpdateProduct from './Pages/DashboardPage/UpdateProduct/UpdateProduct';
import UpdateOffer from './Pages/DashboardPage/UpdateOffer/UpdateOffer';
import MyOrders from './Pages/DashboardPage/MyOrders/MyOrders';
import Profile from './Pages/DashboardPage/Profile/Profile';
import TopNavigation from './Pages/SharedComponents/TopNavigation/TopNavigation';
import Footer from './Pages/SharedComponents/Footer/Footer';
import PreLoader from './Pages/SharedComponents/PreLoader/PreLoader';
import ScrollToTop from './Pages/SharedComponents/ScrollToTop/ScrollToTop';
import Home from './Pages/HomePage/Home/Home';
import Loginuser from './Pages/AuthPage/LogIn/Loginuser';
import AboutUs from './Pages/AboutUsPage/AboutUs/AboutUs';
import Register from './Pages/AuthPage/Register/Register';
import ChangePassword from './Pages/AuthPage/ChangePassword/ChangePassword';
import Dashboard from './Pages/DashboardPage/Dashboard/Dashboard';
import ContactUs from './Pages/ContactUsPage/ContactUs';
import Categories from './Pages/CategoriesPage/Categories/Categories';
import CustomList from './Pages/CategoriesPage/CustomList/CustomList';
import CheckOutPage from './Pages/CheckOutPage/CheckOutPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import PrivacyPolicy from './Pages/PrivacyPolicyPage/PrivacyPolicy';
import Offer from './Pages/OfferPage/Offer';
import ResetPassword from'./Pages/AuthPage/ResetPassword/ResetPassword';
import NewPassword from './Pages/AuthPage/NewPassword/NewPassword';
import TermsAndCondition from './Pages/TermsAndConditionPage/TermsAndCondition';
import store from "./store";
import { loadUser } from "./actions/userAction";

//"proxy": "http://154.81.253.228:4000",


// const Home = lazy(() => import('./Pages/HomePage/Home/Home'));
// const Loginuser = lazy(() => import('./Pages/AuthPage/LogIn/Loginuser'));
// const AboutUs = lazy(() => import('./Pages/AboutUsPage/AboutUs/AboutUs'));
// const Register = lazy(() => import('./Pages/AuthPage/Register/Register'));
// const Dashboard = lazy(() => import('./Pages/DashboardPage/Dashboard/Dashboard'));
// const ContactUs = lazy(() => import('./Pages/ContactUsPage/ContactUs'));
// const Categories = lazy(() => import('./Pages/CategoriesPage/Categories/Categories'));
// const CustomList = lazy(() => import('./Pages/CategoriesPage/CustomList/CustomList'));
// const CheckOutPage = lazy(() => import('./Pages/CheckOutPage/CheckOutPage'));
// const NotFoundPage = lazy(() => import('./Pages/NotFoundPage/NotFoundPage'));
// const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicyPage/PrivacyPolicy'));
// const ResetPassword = lazy(() => import('./Pages/AuthPage/ResetPassword/ResetPassword'));
// const NewPassword = lazy(() => import('./Pages/AuthPage/NewPassword/NewPassword'));
// const TermsAndCondition = lazy(() => import('./Pages/TermsAndConditionPage/TermsAndCondition'));

function App() {
  
  const { isAuthenticated } = useSelector((state) => state.user);

  // if (!isAuthenticated) {
  //   localStorage.setItem("cartItems", JSON.stringify([]));
  //   localStorage.setItem("shippingInfo", JSON.stringify({}));
  // }

  useLayoutEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <BrowserRouter>
      <TopNavigation />
      <ScrollToTop />
      <Toaster />
      {/* <Suspense fallback={<PreLoader />}> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/about-us' element={<AboutUs />} />
          <Route exact path='/contact-us' element={<ContactUs />} />
          <Route exact path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route exact path='/terms-and-conditions' element={<TermsAndCondition />} />
          <Route exact path='/offer' element={<Offer />} />
          <Route exact path='/login' element={<Loginuser />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/reset-password' element={<ResetPassword />} />
          <Route exact path="/password/reset/:token" element={<NewPassword />} />

          <Route
            exact path='/dashboard'
            element={
              <RequiredAuth>
                <Dashboard />
              </RequiredAuth>
            }
          >
            <Route exact path='/dashboard' element={<Profile />} />
            <Route exact path='/dashboard/profile' element={<Profile />} />
            <Route exact path='/dashboard/my-orders' element={<MyOrders />} />
            <Route exact path='/dashboard/review' element={<AddReview />} />
            <Route
              exact path='/dashboard/add-product'
              element={
                <IsAdmin>
                  <AddProduct />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/create-offer'
              element={
                <IsAdmin>
                  <CreateOffer />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/manage-orders'
              element={
                <IsAdmin>
                  <ManageOrders />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/make-admin'
              element={
                <IsAdmin>
                  <AddAdmin />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/manage-products'
              element={
                <IsAdmin>
                  <ManageProducts />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/manage-users'
              element={
                <IsAdmin>
                  <ManageUsers />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/manage-offers'
              element={
                <IsAdmin>
                  <ManageOffers />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/update-product/:id'
              element={
                <IsAdmin>
                  <UpdateProduct />
                </IsAdmin>
              }
            />
            <Route
              exact path='/dashboard/update-offer/:id'
              element={
                <IsAdmin>
                  <UpdateOffer />
                </IsAdmin>
              }
            />
          </Route>
          <Route 
            exact path='/addcustomlist' 
            element={
              <RequiredAuth>
                <CustomList />
              </RequiredAuth>
            }
          />
          <Route 
            exact path='/orderdetails/:id' 
            element={
              <RequiredAuth>
                <OrderDetails />
              </RequiredAuth>
            }
          />
          <Route exact path='/categories' element={<Categories />}>
            <Route exact path='/categories/:searchString' element={<SingleCategory />} />
          </Route>
          <Route
            exact path='/checkout'
            element={
              <RequiredAuth>
                <CheckOutPage />
              </RequiredAuth>
            }
          />
          <Route
            exact path='/change-password'
            element={
              <RequiredAuth>
                <ChangePassword />
              </RequiredAuth>
            }
          />
          <Route exact path='*' element={<NotFoundPage />} />
        </Routes>
      {/* </Suspense> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
