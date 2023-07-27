import { faTrashAlt, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom'
import swal from 'sweetalert';
import { clearErrors, myOrders, deleteOrder  } from "../../../actions/orderAction";
import toast from 'react-hot-toast';
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
//import useAuth from '../../../hooks/useAuth';
//import { cancelOrdersAsync, loadOrdersAsync } from '../../../redux/feathers/ordersSlice';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './MyOrders.module.css';

const MyOrders = () => {
  //const { loggedInUser } = useAuth();
  const dispatch = useDispatch();  
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const reversedOrders = Array.isArray(orders) ? [...orders].reverse() : [];

  const reloadOrders = () => {
    dispatch(myOrders());
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }
  //   if (deleteError) {
  //     toast.error(deleteError);
  //     dispatch(clearErrors());
  //   }
  //   if (isDeleted) {
  //     toast.success("Order Deleted Successfully");
  //     //navigate("/admin/orders");
  //     dispatch({ type: DELETE_ORDER_RESET });
  // }
    if (orders?.length === 0) {
    dispatch(myOrders());
    }
  }, [dispatch, error]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  },[]) 

  return (
    <section id={styles.my__order}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1>My Orders</h1>
        <span style={{marginTop:"5px", marginRight:"5px"}} onClick={()=>reloadOrders()}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </span>
      </div>
      {loading ? (
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
              <h6>Your Don't Order Any Product</h6>
              <p>No items added in your Order List. Please add product to your Order list.</p>
            </div>
          ) : (
            <>
              <Table bordered size='sm' responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order Date</th>
                    <th>Method</th>
                    <th>Payment Status</th>
                    <th>Order Info</th>
                    <th>Total</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {reversedOrders?.map((order, idx) => (
                    <tr key={order._id}>
                      <td className='fw-bold'>&nbsp;{idx + 1}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{order.createdAt.slice(0, 10)}&nbsp;</td>
                      <td>&nbsp;{order.shippingInfo.paymentmethod}&nbsp;</td>
                      <td>&nbsp;{order.paymentInfo.status}&nbsp;</td>
                      <td>
                      <Link to={`/orderdetails/${order._id}`} state={order}>
                      &nbsp;Details&nbsp;
                      </Link>
                      </td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{order.orderCustomList < 3 ? order.totalPrice : "To be calculated"}&nbsp;</td>
                      {/* <td>
                        <span onClick={() => deleteOrderHandler(order._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} className={styles.delete__icon} />
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default MyOrders;
