import { faTrashAlt, faXmark, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import price from '../../../assets/images/icons/price.svg';
//import { cancelOrdersAsync, loadOrdersAsync, updateOrders, updateOrdersAsync } from '../../../redux/feathers/ordersSlice';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
  updateOrder,
  updateOrderPayment,
} from "../../../actions/orderAction";
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET, UPDATE_ORDER_PAYMENT_RESET } from "../../../constants/orderConstants";
import { useNavigate } from "react-router-dom";
import styles from './ManageOrders.module.css';


var orderID = '';
var paymentStatus = '';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(loadOrdersAsync());
  // }, [dispatch]);

  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted, loading : deleteloading } = useSelector((state) => state.order);
  const { error: updateError, isUpdated, isPaymentUpdated } = useSelector((state) => state.order);
  //const reversedOrders = Array.isArray(orders) ? [...orders].reverse() : [];

  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState();


  const toggleModal = () => {
    setModal(!modal);
    setAmount(null)
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  useEffect(() => {
  if (error) {
    toast.error(error, {
      duration: 2000,
    });
    dispatch(clearErrors());
  }

  if (deleteError) {
    toast.error(deleteError, {
      duration: 2000,
    });
    dispatch(clearErrors());
  }
  if (isDeleted) {
    toast.success("Order Deleted Successfully", {
      duration: 2000,
    });
    // navigate("/admin/orders");
    dispatch({ type: DELETE_ORDER_RESET });
    dispatch(getAllOrders());
  }

  if (updateError) {
    toast.error(updateError, {
      duration: 2000,
    });
    dispatch(clearErrors());
  }
  if (isUpdated) {
    toast.success("Order Updated Successfully", {
      duration: 2000,
    });
    dispatch({ type: UPDATE_ORDER_RESET });
  }
  if (isPaymentUpdated) {
    toast.success("Payment Updated Successfully", {
      duration: 2000,
    });
    dispatch({ type: UPDATE_ORDER_PAYMENT_RESET });
  }
  if (orders?.length === 0) {
  dispatch(getAllOrders());
  }
}, [dispatch, error, deleteError, isDeleted, updateError, isUpdated, isPaymentUpdated]);


  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const reloadOrders = () => {
    dispatch(getAllOrders());
  }

  const updateOrderSubmitHandler = (id, status, purpose) => {
    //e.preventDefault();
    if (purpose === "shipping") {
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
    }
    if (purpose === "payment") {
      orderID = id 
      paymentStatus = status
      toggleModal()
    }
  };

  const updateOrderSubmitHandler2 = (id, status, payment) => {
      const myForm = new FormData();  
      myForm.set("status", status);
      myForm.set("amount", payment);
      dispatch(updateOrderPayment(id, myForm));
      toggleModal()
  }

// const handleDeleteOrder = (id) => {
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'After deleted you will not be able to recover this Order!',
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     willDelete ? dispatch(cancelOrdersAsync(id)) : swal('This Order is safe!!');
  //   });
  // };

  // const handleStatusChange = (id, status) => {
  //   const modifiedStatus = { id, status };
  //   dispatch(updateOrders(modifiedStatus));
  //   dispatch(updateOrdersAsync(modifiedStatus));
  // };

  return (
    <section id={styles.manage__orders}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1>All Orders</h1>
        <span style={{marginTop:"5px", marginRight:"5px"}} onClick={()=>reloadOrders()}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </span>
      </div>
      {(loading || deleteloading) ? (
        <LoadingSpinner />
      ) : (
        <>
          {!orders?.length ? (
            <div className={styles.placeholder__text}>
              <span className={styles.placeholder__image}>
                <svg stroke='currentColor' fill='#10b981 ' strokeWidth='0' viewBox='0 0 512 512' height='30px' width='30px' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                </svg>
              </span>
              <h6>Your Customers Don't Order Any Product</h6>
              <p>Please tell your customers add product to their Order list.</p>
            </div>
          ) : (
            <>
              <Table bordered size='sm' responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Delete</th> 
                   <th>Shipping Status</th>
                    <th>Payment Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, idx) => (
                    <tr key={order._id}>
                      
                      <td>&nbsp;{idx + 1}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{order.user.name}&nbsp;</td>
                      <td>
                      <Link to={`/orderdetails/${order._id}`} state={order}>
                      &nbsp;Details&nbsp;
                      </Link>
                      </td>
                      <td>
                        <span onClick={() => deleteOrderHandler(order._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} className={styles.delete__icon} />
                        </span>
                      </td>
                      <td>
                        <select
                          className={order.orderStatus === 'Pending' ? 'btn btn-warning' : order.orderStatus === 'Shipped' ? 'btn btn-success' : order.orderStatus === 'Processing' ? 'btn btn-primary' : 'btn btn-danger'}
                          defaultValue={order.orderStatus}
                          onChange={(e) => updateOrderSubmitHandler(order._id, e.target.value,"shipping")}
                          style={{marginLeft:"10px", marginRight:"10px"}}
                        >
                          <option className='bg-white text-muted' value='Pending'>
                            Pending
                          </option>
                          <option className='bg-white text-muted' value='Rejected'>
                            Rejected
                          </option>
                          <option className='bg-white text-muted' value='Processing'>
                            Processing
                          </option>
                          <option className='bg-white text-muted' value='Shipped'>
                            Shipped
                          </option>
                        </select>
                      </td>
                      <td>
                        <select
                          className={order.paymentInfo.status === 'Processing' ? 'btn btn-warning' : 'btn btn-success'}
                          defaultValue={order.paymentInfo.status}
                          onChange={(e) => updateOrderSubmitHandler(order._id, e.target.value,"payment")}
                          style={{marginLeft:"10px", marginRight:"10px"}}
                        >
                          <option className='bg-white text-muted' value='Processing'>
                            Processing
                          </option>
                          <option className='bg-white text-muted' value='Cleared'>
                            Cleared
                          </option>
                        </select>
                      </td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{order.createdAt.slice(0,10)}&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalcontent}>
            <h1>Amount</h1>
            <span className={styles.inputs}>
              <input type='number' placeholder='Amount Received' id='pdPrice' autoComplete='off' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
              <label htmlFor='pdPrice'>
                <img src={price} alt='amount' />
              </label>
            </span>
            <span className={styles.btn__wrapper}>
              <button onClick={() => updateOrderSubmitHandler2(orderID, paymentStatus, amount)}>Submit</button>
            </span>
            <div className={styles.closemodal} onClick={toggleModal}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageOrders;
