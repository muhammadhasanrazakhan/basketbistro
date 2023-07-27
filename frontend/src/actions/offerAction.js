import {
    CREATE_OFFER_REQUEST,
    CREATE_OFFER_SUCCESS,
    CREATE_OFFER_FAIL,
    ALL_OFFERS_REQUEST,
    ALL_OFFERS_SUCCESS,
    ALL_OFFERS_FAIL,
    UPDATE_OFFER_REQUEST,
    UPDATE_OFFER_SUCCESS,
    UPDATE_OFFER_FAIL,
    UPDATE_OFFER_ACTIVATION_REQUEST,
    UPDATE_OFFER_ACTIVATION_SUCCESS,
    UPDATE_OFFER_ACTIVATION_FAIL,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_REQUEST,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_SUCCESS,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_FAIL,
    DELETE_OFFER_REQUEST,
    DELETE_OFFER_SUCCESS,
    DELETE_OFFER_FAIL,
    OFFER_DETAILS_REQUEST,
    OFFER_DETAILS_SUCCESS,
    OFFER_DETAILS_FAIL,
    CLEAR_NEW_OFFER,
    CLEAR_ERRORS,
} from "../constants/offerConstants";
  
import axios from "axios";

// Create Offer
export const createOffer = (offer) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_OFFER_REQUEST });

    const config = {
    headers: {
        "Content-Type": "application/json",
    },
    };
    const { data } = await axios.post("/api/bb/offer/new", offer, config);

    dispatch({ type: CREATE_OFFER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
    type: CREATE_OFFER_FAIL,
    payload: error.response.data.message,
    });
  }
};

// Get All Offers (admin)
export const getAllOffers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_OFFERS_REQUEST });

    const { data } = await axios.get("/api/bb/offers");

    dispatch({ type: ALL_OFFERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
    type: ALL_OFFERS_FAIL,
    payload: error.response.data.message,
    });
  }
};

  // Get Offer Details
  export const getOfferDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: OFFER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/bb/admin/offer/${id}`);
  
      dispatch({ type: OFFER_DETAILS_SUCCESS, payload: data.offer });
    } catch (error) {
      dispatch({
        type: OFFER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Offer
export const updateOffer = (id, offerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_OFFER_REQUEST });

    const config = {
      //headers: { "Content-Type": "application/json" },
      headers: { "Content-Type": "application/x-www-form-urlencoded"}
    };

    const { data } = await axios.put(
      `/api/bb/admin/offer/${id}`,
      offerData,
      config
    );

    dispatch({
      type: UPDATE_OFFER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_OFFER_FAIL,
      payload: error.response.data.message,
    });
  }
};

  // Delete Offer
  export const deleteOffer = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_OFFER_REQUEST });
  
      const { data } = await axios.delete(`/api/bb/admin/offer/${id}`);
  
      dispatch({ type: DELETE_OFFER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_OFFER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Change Offer Activation
  export const changeOfferActivation = (id, user) => async(dispatch) => {
    try {
      dispatch({ type: UPDATE_OFFER_ACTIVATION_REQUEST });
      const config = {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      };
      const { data } = await axios.put(
        `/api/bb/offer/changeactivation/${id}`,
        user,
        config
      );

      dispatch({
        type: UPDATE_OFFER_ACTIVATION_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_OFFER_ACTIVATION_FAIL,
        payload: error.response.data.message,
      });  
    }
  }

    // Change Offer Activation By Admin
    export const changeOfferActivationByAdmin = (id, user) => async(dispatch) => {
      try {
        dispatch({ type: UPDATE_OFFER_ACTIVATION_BY_ADMIN_REQUEST });
        const config = {
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        };
        const { data } = await axios.put(
          `/api/bb/admin/offer/dismiss/${id}`,
          user,
          config
        );
  
        dispatch({
          type: UPDATE_OFFER_ACTIVATION_BY_ADMIN_SUCCESS,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: UPDATE_OFFER_ACTIVATION_BY_ADMIN_FAIL,
          payload: error.response.data.message,
        });  
      }
    }

  // Clearing New Offer
  export const clearNewOffer = () => async (dispatch) => {
    dispatch({ type: CLEAR_NEW_OFFER });
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };