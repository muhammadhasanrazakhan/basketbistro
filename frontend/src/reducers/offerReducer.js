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
    UPDATE_OFFER_RESET,
    UPDATE_OFFER_ACTIVATION_REQUEST,
    UPDATE_OFFER_ACTIVATION_SUCCESS,
    UPDATE_OFFER_ACTIVATION_FAIL,
    UPDATE_OFFER_ACTIVATION_RESET,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_REQUEST,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_SUCCESS,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_FAIL,
    UPDATE_OFFER_ACTIVATION_BY_ADMIN_RESET,
    DELETE_OFFER_REQUEST,
    DELETE_OFFER_SUCCESS,
    DELETE_OFFER_FAIL,
    DELETE_OFFER_RESET,
    OFFER_DETAILS_REQUEST,
    OFFER_DETAILS_SUCCESS,
    OFFER_DETAILS_FAIL,
    CLEAR_NEW_OFFER,
    CLEAR_ERRORS,
  } from "../constants/offerConstants";

  export const newOfferReducer = (state = { offer : {} }, action) => {
    switch (action.type) {
      case CREATE_OFFER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_OFFER_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          offer: action.payload.offer,
        };
  
      case CREATE_OFFER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_NEW_OFFER:
        return {
          ...state,
          loading: false,
          offer: null,
          success: false,
        };  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const allOffersReducer = (state = { offers: [] }, action) => {
    switch (action.type) {
      case ALL_OFFERS_REQUEST:
        return {
          loading: true,
          offers: [],
        };
  
      case ALL_OFFERS_SUCCESS:
        return {
          loading: false,
          offers: action.payload.offers,
        };
  
      case ALL_OFFERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const offerReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_OFFER_REQUEST:
      case UPDATE_OFFER_ACTIVATION_REQUEST:
      case UPDATE_OFFER_ACTIVATION_BY_ADMIN_REQUEST:
      case DELETE_OFFER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_OFFER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };

      case UPDATE_OFFER_ACTIVATION_SUCCESS:
        return {
          ...state,
          loading: false,
          isActivated: action.payload,
        };  

      case UPDATE_OFFER_ACTIVATION_BY_ADMIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeactivatedByAdmin: action.payload,
        };   
    
      case DELETE_OFFER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_OFFER_FAIL:
      case UPDATE_OFFER_ACTIVATION_FAIL:
      case UPDATE_OFFER_ACTIVATION_BY_ADMIN_FAIL:
      case DELETE_OFFER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      
      case UPDATE_OFFER_RESET:
        return {
          ...state,
          isUpdated: false,
        };

      case UPDATE_OFFER_ACTIVATION_RESET:
        return {
          ...state,
          isActivated: false,
        };  
       
      case UPDATE_OFFER_ACTIVATION_BY_ADMIN_RESET:
        return {
          ...state,
          isDeactivatedByAdmin: false,
        };  
  
      case DELETE_OFFER_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const offerDetailsReducer = (state = { offer: {} }, action) => {
    switch (action.type) {
      case OFFER_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case OFFER_DETAILS_SUCCESS:
        return {
          loading: false,
          offer: action.payload,
        };
  
      case OFFER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };