import { faMoneyBillWave, faListAlt, faCartPlus, faCreditCard, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { saveShippingInfo, updateCartItems, updateListItems } from "../../actions/cartAction";
import { createOrder, clearErrors, clearNewOrder, clearMyOrders } from "../../actions/orderAction";
import toast from 'react-hot-toast';
//import useAuth from '../../hooks/useAuth';
//import { postOrdersAsync } from '../../redux/feathers/ordersSlice';
//import { emptyCart } from '../../redux/feathers/productsSlice';
import PreLoader from '../SharedComponents/PreLoader/PreLoader';
import Cart from '../SharedComponents/Cart/Cart';
import Footer from '../SharedComponents/Footer/Footer';
import TopNavigation from '../SharedComponents/TopNavigation/TopNavigation';
import styles from './CheckoutPage.module.css';

const CheckOutPage = () => {
  const [data, setData] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  //const { loggedInUser } = useAuth();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //const cart = useSelector((state) => state.products.cart);
  const { shippingInfo, cartItems, listItems } = useSelector((state) => state.cart);
  const { error, order: success, order: order, loading } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingInfo.address);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [paymentmethod, setPaymentmethod] = useState(shippingInfo.paymentmethod);
  
  var cartChecked = false;
  var listChecked = false;
  

  // const handelChange = (e) => {
  //   const newData = { ...data };
  //   newData[e.target.name] = e.target.value;
  //   setData(newData);
  // };

  // let totalPrice = 0;
  // for (const pd of cart) {
  //   totalPrice = totalPrice + Number(pd.totalPrice);
  // }
  let totalPrice = 0;
  for (const pd of cartItems) {
    totalPrice = totalPrice + (Number(pd.price) *  Number(pd.quantity))
  }
  //const shipping = data.shipping ? data.shipping : 0;
  const shipping = 150;
  const total = totalPrice + Number(shipping);


  
  const Order = {
    shippingInfo: {address : address, phoneNo : phoneNo, paymentmethod : paymentmethod},
    orderItems: [],
    orderCustomList: "",
    itemsPrice: totalPrice,
    taxPrice: 0,
    shippingPrice: shipping,
    totalPrice: total,
    paymentInfo: {status:"Processing"},
  };

  useEffect(() => {
    document.title = 'Checkout | Basket Bistro';
    window.scrollTo({
      top: 0,
    });
    if (!totalPrice && listItems.length === 0) {
      setIsDisable(true);
    }
    if ((cartItems.length!==0 && listItems.length < 3) || (cartItems.length===0 && listItems.length > 3)) {
      if (cartItems.length !== 0) {
        Order.orderItems = cartItems
      } else {
        Order.orderCustomList = listItems
      }
    }
  }, [totalPrice]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
  
    if (name === 'cart') {
      if (checked) {
        cartChecked = true
        Order.orderItems = cartItems ? cartItems : [];
      } else {
        Order.orderItems = [];
        cartChecked = false
      }
    }
    if (name === 'list') {
      if (checked) {
        listChecked = true
        Order.orderCustomList = listItems ? listItems : "";
      } else {
        Order.orderCustomList = "";
        listChecked = false
      }
    }
  }  

  const submitHandler = async (e) => {
    e.preventDefault();
     
    if (Order.orderItems.length === 0 && Order.orderCustomList.length < 3) {
      toast.error("Please select at least one checkbox", {
        duration: 2000,
      });
      return;
    }

    if (Order.orderCustomList.length>3) {
      Order.totalPrice = 0
    }
    try {

    await dispatch(createOrder(Order));
    dispatch(
      saveShippingInfo({ address, phoneNo, paymentmethod })
    );

    } catch (error) {
      toast.error("An error occurred while placing the order. Please try again later", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 10000,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Order Placed Successfully", {
        duration: 2000,
      });

      const newCartItems = [];
      const newListItems = "";
      if (order?.order?.orderItems?.length !== 0) {
        dispatch(updateCartItems(newCartItems))
      }
      if (order?.order?.orderCustomList?.length > 3) {
        dispatch(updateListItems(newListItems))
      }  
      dispatch(clearNewOrder());
      dispatch(clearMyOrders());
      navigate('/home'); 
    }
  }, [dispatch, error, success, loading, alert]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsDisable(true);
  //   const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const day = date.getDate();
  //   const monthName = month[date.getMonth()];
  //   data.name = loggedInUser.displayName;
  //   data.email = loggedInUser.email;
  //   data.street = e.target.street.value;
  //   data.city = e.target.city.value;
  //   data.country = e.target.country.value;
  //   data.zip = e.target.zip.value;
  //   data.totalPrice = total;
  //   data.productInfo = cart;
  //   data.orderTime = `${day}-${monthName}-${year}`;
  //   data.status = 'Pending';
  //   dispatch(postOrdersAsync(data)).then((res) => {
  //     if (res.payload.insertedId) {
  //       swal({
  //         title: `Well Done ${loggedInUser.displayName}!!`,
  //         text: `You Have To Pay Us ${total}$!`,
  //         icon: 'success',
  //         button: 'OK!',
  //         position: 'center',
  //       });
  //       navigate('/dashboard/my-orders');
  //       dispatch(emptyCart());
  //       setIsDisable(false);
  //     }
  //   });
  // };

  return (
    <>
      {loading ? (<PreLoader />) : (
      <section id={styles.checkout}>
        <Container>
          <Row>
            <Col lg={6} className='mt-4 mt-md-0'>
              <Container>
                <h4>01. Personal Details</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Row className='g-4'>
                    <Col lg={6}>
                      <label htmlFor='userName'>Your Name</label>
                      <input type='text' name='name' id='userName' value={user.name} readOnly />
                    </Col>
                    <Col lg={6}>
                      <label htmlFor='userEmail'>Email Address</label>
                      <input type='email' name='email' id='userEmail' value={user.email} readOnly />
                    </Col>
                    {/* <Col lg={6}>
                      <label htmlFor='loginTime'>Last Login Time</label>
                      <input type='text' name='loginTime' id='loginTime' value={loggedInUser.metadata.lastSignInTime.slice(0, 16)} readOnly />
                    </Col>
                    <Col lg={6}>
                      <label htmlFor='cratedTime'>Created Account At</label>
                      <input type='text' name='cratedTime' id='cratedTime' value={loggedInUser.metadata.creationTime.slice(0, 16)} readOnly />
                    </Col> */}
                  </Row>
                </form>
                
                <h4>02. Shipping Details</h4>
                <form className='mt-4' onSubmit={submitHandler}>
                  <Row className='g-4'>
                    <Col lg={12}>
                      <label htmlFor='street'>Home Address</label>
                      <input type='text' name='street' id='street' placeholder='Main University Rd, Johar Complex' autoComplete='off' required value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Col>
                    <Col lg={4} className='mt-4'>
                      <label htmlFor='city'>Contact No.</label>
                      <input type='number' name='phone' id='city' placeholder='03XX-XXXXXXX' autoComplete='off' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                    </Col>
                    {/* <Col lg={4} className='mt-4'>
                      <label htmlFor='country'>Your Country</label>
                      <input type='text' name='country' id='country' placeholder='United State' autoComplete='off' required />
                    </Col>
                    <Col lg={4} className='mt-4'>
                      <label htmlFor='zip'>Country Code</label>
                      <input type='number' name='zip' id='zip' placeholder='12345' autoComplete='off' required />
                    </Col> */}
                  </Row>

                  <h4 className='my-5'>03. Payment Details</h4>
                  <Row>
                    <Col lg={6} className={styles.payment__methods}>
                      <label htmlFor='money'>
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        <span className='ms-3'>Cash On Delivery</span>
                      </label>
                      <input type='radio' name='payment' id={styles.money} required value="COD" onChange={(e) => setPaymentmethod(e.target.value)} />
                    </Col>
                    <Col lg={6} className={styles.payment__methods}>
                      <label htmlFor='money'>
                        <FontAwesomeIcon icon={faCreditCard} />
                        <span className='ms-3'>Easy Paisa</span>
                      </label>
                      <input type='radio' name='payment' id={styles.money} required value="EP" onChange={(e) => setPaymentmethod(e.target.value)} />
                    </Col>
                  </Row>

                  {listItems.length > 3 && cartItems.length !== 0 ? (    
                  <>
                  <h4 className='my-5'>04. Select Cart/List Items </h4>
                  <Row>
                  <Col lg={6} className={styles.shipping__methods}>
                    <label htmlFor='money'>

                      <FontAwesomeIcon icon={faCartPlus} />
                      <span className='ms-3'>Cart Products</span>
                    </label>
                    <input type='checkbox' name='cart' id={styles.money} value='Cart' onChange={handleChange} />
                  </Col>
                  <Col lg={6} className={styles.shipping__methods}>
                    <label htmlFor='money'>
                      <FontAwesomeIcon icon={faListAlt} />
                      <span className='ms-3'>List You Make</span>
                    </label>
                    <input type='checkbox' name='list' id={styles.money} value='List' onChange={handleChange} />
                  </Col>
                    <p className="my-3">You have added products in your cart and also saves a custom list of products, please Select which items you want to add in your order (Cart Items or List), select both if you want to include both liist and cart items</p>
                  </Row>
                  </> 
                  ) : (
                    <></>
                  )}
                  <span className='d-flex justify-content-center'>
                    <button type='submit' disabled={isDisable}>
                      Confirm Order
                    </button>
                  </span>
                </form>
              </Container>
            </Col>
            <Col lg={6}>
              <div className={styles.order__summery}>
                <h4 className='mb-4'>Order Summary</h4>
                {cartItems.length ? (
                  <div className={styles.product__container}>
                    {
                      // map category data
                      cartItems.map((pd) => (
                        <Cart key={pd.product} pd={pd} />
                      ))
                    }
                  </div>
                ) : (
                  <div className={styles.placeholder__text}>
                    <span className={styles.placeholder__image}>
                      <svg
                        stroke='currentColor'
                        fill='#10b981 '
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        height='30px'
                        width='30px'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                      </svg>
                    </span>
                    <h6>Your cart is empty</h6>
                    <p>No items added in your cart. Please add product to your cart list.</p>
                  </div>
                )}
                <ul className={styles.total__cost}>
                  <li>
                    <span>Subtotal</span> <span>{listItems.length > 3 ? "Calculating..." : `Rs. ${totalPrice}.00`}</span>
                  </li>
                  <li>
                    <span>Shipping Cost</span> <span>Rs. XXX.XX</span>
                  </li>
                  <li>
                    {/* <span>TOTAL COST</span> <span>{listItems.length > 3 ? "Calculating..." : `Rs. ${total}.00`}</span> */}
                    <span>TOTAL COST</span> <span>Calculating...</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      )}
    </>
  );
};

export default CheckOutPage;
