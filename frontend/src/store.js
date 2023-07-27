import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { useSelector } from "react-redux";

import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
//   productReviewsReducer,
  productsReducer,
//   reviewReducer,
} from "./reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  newUserReviewReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import {
  allOffersReducer,
  newOfferReducer,
  offerDetailsReducer,
  offerReducer,
} from "./reducers/offerReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newUserReview: newUserReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  newOffer: newOfferReducer,
  allOffers: allOffersReducer,
  offer: offerReducer,
  offerDetails: offerDetailsReducer,
  // productReviews: productReviewsReducer,
  // review: reviewReducer,
});

// const { user, loading, isAuthenticated } = useSelector((state) => state.user);

// // Get cart items and shipping info from local storage based on isAuthenticated value
// let cartItemsFromLocalStorage = [];
// let shippingInfoFromLocalStorage = {};

// if (isAuthenticated) {
//   cartItemsFromLocalStorage = localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];
//   shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")
//     ? JSON.parse(localStorage.getItem("shippingInfo"))
//     : {};
// } else {
//   localStorage.setItem("cartItems", JSON.stringify([]));
//   localStorage.setItem("shippingInfo", JSON.stringify({}));
// }

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromLocalStorage,
//     shippingInfo: shippingInfoFromLocalStorage,
//   },
// };


let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    listItems: localStorage.getItem("listItems")
      ? JSON.parse(localStorage.getItem("listItems"))
      : "",
    shippingInfo: localStorage.getItem("shippingInfo")
     ? JSON.parse(localStorage.getItem("shippingInfo"))
     : {},
  },
};

//let initialState = {}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;