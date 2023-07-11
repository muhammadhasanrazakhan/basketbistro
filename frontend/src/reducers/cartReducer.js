import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_CART_ITEMS,
    UPDATE_LIST_ITEMS,
    ADD_LIST_TO_CART
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], listItems:"" , shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }

      case ADD_LIST_TO_CART:
        return {
          ...state,
          listItems: action.payload,
        };
          
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };

      case UPDATE_CART_ITEMS:
        return {
          ...state,
          cartItems: action.payload,
        };  

      case UPDATE_LIST_ITEMS:
        return {
          ...state,
          listItems: action.payload,
        };   
  
      default:
        return state;
    }
  };
