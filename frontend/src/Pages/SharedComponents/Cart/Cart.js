import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from "../../../actions/cartAction";
//import { handleCancelOrder, handleDecrease, handleIncrease } from '../../../redux/feathers/productsSlice';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import styles from './Cart.module.css';

//const Cart = ({ pd: { name, image, quantity, price, product, stock }, deleteCartItems }) => {
const Cart = ({ pd }) => {
  const dispatch = useDispatch();

  let totalPrice = Number(pd.price) * Number(pd.quantity);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, pd.name, pd.price, pd.image, pd.stock, newQty));
    
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, pd.name, pd.price, pd.image, pd.stock, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <div className={styles.cart__item}>
      <div className='d-flex align-self-center'>
        <img src={pd.image} alt={pd.name} />
        <span className='ms-3'>
          <h6>{pd.name}</h6>
          <small>Rs. {pd.price}</small>
          {/* <h5>{pd.price}</h5> */}
          <h5>{totalPrice ? totalPrice : pd.price}</h5>
        </span>
      </div>
      <div className={styles.counter}>
        <span onClick={() => decreaseQuantity(pd.product, pd.quantity)}>
          <FontAwesomeIcon icon={faMinus} />
        </span>
        <span>{pd.quantity}</span>
        <span onClick={() => increaseQuantity(pd.product, pd.quantity, pd.stock)}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
      <div className={styles.delete__icon} onClick={() => deleteCartItems(pd.product)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    </div>
  );
};

export default Cart;
