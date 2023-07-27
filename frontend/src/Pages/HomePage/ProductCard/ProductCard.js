import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { addToCart } from '../../../redux/feathers/productsSlice';
import { addItemsToCart } from "../../../actions/cartAction";
import toast from 'react-hot-toast';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {  name, price, _id, images, Stock } = product;
  var quantity = 1
  //let [isOpen, setIsOpen] = useState(false);
  //const [quantity, setQuantity] = useState(1);
  //const [isDisable, setIsDisable] = useState(false);
  //const cart = useSelector((state) => state.products.cart);

  //const { cartItems } = useSelector((state) => state.cart);


  // useEffect(() => {
  //   const pd = cart.find((pd) => pd.item._id === _id);
  //   if (pd) {
  //     setIsDisable(true);
  //   }
  // }, [_id, cart]);

  // const handleClick = (item) => {
  //   const pd = {};
  //   pd.item = item;
  //   pd.quantity = 1;
  //   pd.totalPrice = pd.item.price;
  //   dispatch(addToCart(pd));
  // };

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }
  
  const addToCartHandler = () => {
    dispatch(addItemsToCart(_id, name, price, images[0].url, Stock, quantity));
    toast.success("Item Added To Cart", {
      duration: 1000,
    });
  };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  // }, [dispatch, error]);

  //const Cart = cartItems.find((cartItem) => cartItem.product === _id);

  return (
    <div className={styles.card}>
      <span className={styles.card__img}>
        <img src={product.images[0].url} alt={name} />
      </span>
      <div className={styles.card__content}>
        <h6>{name}</h6>
        <span className='d-flex justify-content-between align-self-center mt-3'>
          <h4> Rs. {price}</h4>
          {/* {Cart ? (
              <div>
                <div className="h-9 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 bg-emerald-500 text-white rounded">
                  <button onClick={() => dispatch(decreaseCart(data))}>
                    <span className="text-dark text-base">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M400 256H112"
                        ></path>
                      </svg>
                    </span>
                  </button>
                  <p className="text-sm text-dark px-1 font-semibold">
                    {Cart.cartQuantity}
                  </p>
                  <button onClick={() => dispatch(incrementCart(data))}>
                    <span className="text-dark text-base">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M256 112v288m144-144H112"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                disabled={data.quantity === 0 ? true : false}
                onClick={() => handleAddToCart(data)}
                ariallabel="chart"
                className={data.quantity === 0 ? "!cursor-default h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all":"!cursor-pointer h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"}
              >
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </span>
              </button>
            )} */}
          <button onClick={addToCartHandler} /*disabled={isDisable}*/>
            <svg stroke='currentColor' fill='#10b981' strokeWidth='0' viewBox='0 0 512 512' height='23px' width='23px' xmlns='http://www.w3.org/2000/svg'>
              <path d='M460 160h-88v-12A116.13 116.13 0 00258.89 32h-5.78A116.13 116.13 0 00140 148v12H52a4 4 0 00-4 4v300a16 16 0 0016 16h384a16 16 0 0016-16V164a4 4 0 00-4-4zm-280-11c0-41.84 33.41-76.56 75.25-77A76.08 76.08 0 01332 148v12H180zm156 187h-64v64h-32v-64h-64v-32h64v-64h32v64h64z'></path>
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
