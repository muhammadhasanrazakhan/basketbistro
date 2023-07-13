import {
    ADD_TO_CART,
    ADD_LIST_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_CART_ITEMS,
    UPDATE_LIST_ITEMS,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, name, price, image, stock, quantity) => async (dispatch, getState) => {
    //const { data } = await axios.get(`/api/bb/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: id,
        name: name,
        price: price,
        image: image,
        stock: stock,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const addListToCart = (list) => async (dispatch) => {
    
    dispatch({
      type: ADD_LIST_TO_CART,
      payload: list,
    });

    localStorage.setItem("listItems", JSON.stringify(list));
  }
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // UPDATE CART
  export const updateCartItems = (cartItems) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEMS, payload: cartItems });
  };

  export const updateListItems = (listItems) => async (dispatch) => {
    dispatch({ type: UPDATE_LIST_ITEMS, payload: listItems });
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };