import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_PAYMENT_REQUEST,
    UPDATE_ORDER_PAYMENT_SUCCESS,
    UPDATE_ORDER_PAYMENT_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_MY_ORDERS,
    CLEAR_NEW_ORDER,
    CLEAR_ERRORS,
  } from "../constants/orderConstants";
  
  import axios from "axios";
  
  // Create Order
  export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/bb/order/new", order, config);
  
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      if (order?.orderItems?.length !== 0) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      }
      if (order?.orderCustomList?.length > 3) {
      localStorage.setItem("listItems", JSON.stringify(""));
      }
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My Orders
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const { data } = await axios.get("/api/bb/orders/me");
  
      dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Orders (admin)
  export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const { data } = await axios.get("/api/bb/admin/orders");
  
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Order
  export const updateOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/bb/admin/order/${id}`,
        order,
        config
      );
  
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Update Payment Status
  export const updateOrderPayment = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_PAYMENT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded" ,
        },
      };
      const { data } = await axios.put(
        `/api/bb/admin/orderpayment/${id}`,
        order,
        config
      );
  
      dispatch({ type: UPDATE_ORDER_PAYMENT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_PAYMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Order
  export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });
  
      const { data } = await axios.delete(`/api/bb/admin/order/${id}`);
  
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Order Details
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/bb/order/${id}`);
  
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Clearing My Orders
  export const clearMyOrders = () => async (dispatch) => {
    dispatch({ type: CLEAR_MY_ORDERS });
  };  

  // Clearing New Order
  export const clearNewOrder = () => async (dispatch) => {
    dispatch({ type: CLEAR_NEW_ORDER });
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };