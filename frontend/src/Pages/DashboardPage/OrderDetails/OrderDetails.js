//import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { getOrderDetails, clearErrors } from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { useMatch, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
import Footer from '../../SharedComponents/Footer/Footer';
import TopNavigation from '../../SharedComponents/TopNavigation/TopNavigation';
import Logo from '../../../assets/images/footerLogo.svg';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const { error, loading } = useSelector((state) => state.orderDetails);
  const { cartItems, listItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const location = useLocation();
  const match = useMatch('/orderdetails/:id');
  const orderId = match.params.id
  const order = location.state;

  useEffect(() => {
    document.title = 'Order Details | Basket Bistro';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }
    // if (order && order?._id !== orderId) {
    //   dispatch(getOrderDetails(orderId));
    // }

    //dispatch(getOrderDetails(orderId));
  }, [dispatch, error, orderId, order]);


  // var formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'PKR',
  // })

  const isSmallScreen = window.innerWidth <= 767;


  return ( 
    <>
    {/* <TopNavigation /> */}
    {loading ? (
      <LoadingSpinner />
    ) : (
    <div className={styles.mainContainer}>
    <div style={{ maxWidth: "100%", margin: "0 auto", paddingTop: "10px", paddingLeft: "3px", paddingRight: "6px", paddingBottom: "6px" }}>
      <div style={{ backgroundColor: "#e0ffe6" }} className="rounded-md mb-3 px-4 py-3">
        <label>
          Thank you{" "}
          <span style={{ fontWeight: "bold", color: "#10b981" }}>
            {order?.user?.name},
          </span>{" "}
          Your order have been received !
        </label>
      </div>
      <div style={{ backgroundColor: "#fffaff", borderRadius: "0.375rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
        <div>
        <div style={{ backgroundColor: '#f3edfa', padding: "2rem", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }}>
          {/* <div style={{ display: "flex", flexDirection: window.innerWidth < 767 ? "column" : "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid #F9FAFB"}}> */}
          <div className={styles.childContainer}>  
            <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", textTransform: "uppercase" }}>Invoice</h1>
              <div className={styles.invoiceTopNest}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginTop: "1rem", marginBottom: "0", height: "5rem" }}>
                  <Link to="/">
                    <span
                      style={{
                        boxSizing: " border-box",
                        display: "inline-block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: "1",
                        border: " 0px",
                        margin: "0px",
                        padding: "0px",
                        position: "relative",
                        maxWidth: "100%",
                      }}
                    >
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "block",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: "1",
                          border: "0px",
                          margin: "0px",
                          padding: "0px",
                          maxWidth: "100%",
                        }}
                      >
                        <img
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27100%27%20height=%27100%27/%3e"
                          style={{
                            display: "block",
                            maxWidth: "100%",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: "1",
                            border: "0px",
                            margin: "0px",
                            padding: "0px",
                          }}
                        />
                      </span>
                      <img
                        alt="logo"
                         srcSet={`${Logo} 1x,${Logo} 2x`}
                         src={`${Logo}`}
                        decoding="async"
                        data-nimg="intrinsic"
                        className="rounded-lg "
                        style={{
                          position: "absolute",
                          inset: "0px",
                          boxSizing: "border-box",
                          padding: "0px",
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: "0px",
                          height: "0px",
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: " 100%",
                          maxHeight: "100%",
                        }}
                      />
                    </span>
                  </Link>
                </h2>
                <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                  {order?.shippingInfo?.address}, <br /> Karachi
                  {" "}
                </p>
              </div>
            </div>
            <div className={styles.invoiceBottom}>
              <div style={{ marginBottom: "0.75rem", display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold", fontSize: "0.875rem", textTransform: "uppercase", color: "#718096", display: "block" }}>
                  Date
                </span>
                <span style={{ fontSize: "0.875rem", color: "#718096", display: "block" }}>
                  <span>{order?.createdAt?.slice(0, 10)}</span>
                </span>
              </div>
              <div style={{ marginBottom: '0.75rem' }} className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span style={{ fontWeight: 'bold', fontSize: '0.875rem', textTransform: 'uppercase', color: '#718096', display: 'block' }} className="font-bold text-sm uppercase text-gray-600 block">
                  Contact No.
                </span>
                <span style={{ fontSize: "0.875rem", color: "#718096", display: "block" }}>{order?.shippingInfo?.phoneNo}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                <span style={{ fontWeight: "bold", fontSize: "0.875rem", textTransform: "uppercase", color: "#718096", display: "block" }}>
                  Invoice To.
                </span>
                <span style={{ fontSize: "0.875rem", color: "#718096", display: "block" }}>
                 {order?.user?.name} 
                  <br />
               {order?.shippingInfo?.address}
                  <br />
                 Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.entryTable}>
              <div style={{ width:"100%", overflowX: "auto"}}>
                <div className={styles.tablesWrapper}>
                {order?.orderItems?.length>0 && 
                <table style={{ minWidth: "100%", border: "1px solid #E2E8F0", borderTop: "none", borderBottom: "none" }}>
                  <thead style={{ backgroundColor: "#F9FAFB" }}>
                    <tr style={{ fontSize: "0.75rem", backgroundColor: "#F3F4F6" }}>
                      <th
                        style={{
                          fontWeight: "600",
                          padding: "0.75rem 1.5rem",
                          color: "#4B5563",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          textAlign: "left",
                        }}
                        scope="col"
                      >
                        Sr.
                      </th>
                      <th
                        style={{
                          fontWeight: "600",
                          padding: "0.75rem 1.5rem",
                          color: "#4B5563",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                        }}
                        scope="col"
                      >
                        Product Name
                      </th>
                      <th
                        style={{
                          fontWeight: "600",
                          padding: "0.75rem 1.5rem",
                          color: "#4B5563",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          textAlign: "center",
                        }}
                        scope="col"
                      >
                        Quantity
                      </th>
                      <th
                        style={{
                          fontWeight: "600",
                          padding: "0.75rem 1.5rem",
                          color: "#4B5563",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                        scope="col"
                      >
                        Item Price
                      </th>
                      <th
                        style={{
                          fontWeight: "600",
                          padding: "0.75rem 1.5rem",
                          color: "#4B5563",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          textAlign: "center",
                        }}
                        scope="col"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: '#FFFFFF', borderTopWidth: '1px', borderBottomWidth: '1px', borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB' }}>
                  {order?.orderItems?.map((items,index)=>(
                      <tr key={index} style={{ lineHeight: '10px', borderBottomWidth: '1px',fontSize:'14px' }}>
                      <th style={{ paddingLeft: "25px",whiteSpace: 'nowrap', fontWeight: 'normal', color: '#6B7280', textAlign: 'left' }}>
                        {index+1}
                      </th>
                      <td style={{ whiteSpace: 'nowrap', fontWeight: 'normal', color: '#6B7280', textAlign: 'left' }}>
                        {items.name}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', fontWeight: 'bold', textAlign: 'center' }}>
                      {items.quantity}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', fontWeight: 'bold', textAlign: 'center', fontFamily: 'DejaVu' }}>
                        {/* {formatter.format(items.price)} */}
                        {items.price}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold', fontFamily: 'DejaVu', color: 'red', fontSize: '500' }}>     
                        {/* {formatter.format(items.price*items.quantity)} */}
                        {items.price*items.quantity}
                      </td>
                    </tr>
                  ))}                   
                  </tbody>
                </table>                
                }

                {order?.orderCustomList?.length>0 &&
                  <table className={styles.customTable} style={{ minWidth: "100%", border: "1px solid #E2E8F0", borderTop: "none", borderBottom: "none" }}>
                  <thead style={{ backgroundColor: "#F9FAFB" }}>
                  <tr style={{ fontSize: "0.70rem", backgroundColor: "#F3F4F6" }}>
                    <th
                      style={{
                        fontWeight: "600",
                        padding: "0.70rem 1.5rem",
                        color: "#4B5563",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        textAlign: "left",
                      }}
                      scope="col"
                    >
                      Your List
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#FFFFFF', borderTopWidth: '1px', borderBottomWidth: '1px', borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB' }}>
                <div className={styles.listArea}>
                <textarea
                  name='reviewText'
                  id='review'
                  cols='30'
                  rows='5'
                  required
                  value={order?.orderCustomList}
                  readOnly
                ></textarea>
                </div>
                </tbody>
                </table>
                } 
              </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #D1D5DB', borderBottom: '1px solid #D1D5DB', padding: '40px', backgroundColor: '#e0ffe6' }}>
            <div className={styles.priceDetails}>
              <div style={{ marginRight: '0', marginBottom: '0', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                <span style={{marginBottom: "0.25rem", fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', color: '#4B5563', display: 'block' }}>
                  Payment Method
                </span>
                <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '600', display: 'block' }}>
                  {order?.shippingInfo?.paymentmethod}
                </span>
              </div>
              <div style={{ marginBottom: '0.25rem' }}>
                <span style={{marginBottom: "0.25rem", fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', color: '#6B7280', display: 'block' }}>
                  Shipping Cost
                </span>
                <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '600', display: 'block' }}>
                  XXX
                </span>
              </div>
              <div style={{marginBottom: "1rem", flexDirection: "column", flexWrap: "wrap"}}>
                <span style={{marginBottom: "0.25rem", fontWeight: "bold", fontSize: "small", textTransform: "uppercase", color: "#666", display: "block"}}>
                  Payment Status
                </span>
                <span style={{fontSize: "small", color: "#888", fontWeight: "bold", display: "block"}}>
                  {order?.paymentInfo?.status}
                </span>
              </div>
              <div style={{display: "flex", flexDirection: "column", flexWrap: "wrap"}}>
                <span style={{marginBottom: "0.25rem", fontWeight: "bold", fontSize: "small", textTransform: "uppercase", color: "#666", display: "block"}}>
                  Total Amount
                </span>
                <span style={{fontSize: "2rem", fontWeight: "bold", color: "#6B7280", display: "block"}}>
                {(order?.orderCustomList?.length === 0 || order?.paymentInfo?.status === "Cleared") ? order?.totalPrice : "Calculating..."}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '25px 10px', borderBottomLeftRadius: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <a
              download="Invoice"
              href="blob:https://kachabazar-store.vercel.app/323a6e45-6fc0-439e-b949-0d694f0edde8"
            >
              <button style={{ border:"none", marginBottom: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ' #10b981', hoverBackgroundColor: '#03804c', color: '#fff', transition: 'all', fontFamily: 'serif', fontSize: '12px', fontWeight: 'bold', height: '40px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '4px' }}>
                Download Invoice{" "}
                <span style={{marginLeft: "0.5rem", fontSize: "1rem"}}>
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
                      d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"
                    ></path>
                  </svg>
                </span>
              </button>
            </a>
            <button style={{ border:"none", marginBottom: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ' #10b981', hoverBackgroundColor: '#03804c', color: '#fff', transition: 'all', fontFamily: 'serif', fontSize: '12px', fontWeight: 'bold', height: '40px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '4px' }}>
              Print Invoice{" "}
              <span style={{marginLeft: "0.5rem"}}>
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
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                  ></path>
                  <rect
                    width="256"
                    height="208"
                    x="128"
                    y="240"
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    rx="24.32"
                    ry="24.32"
                  ></rect>
                  <path
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                  ></path>
                  <circle cx="392" cy="184" r="24"></circle>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  // <div>asaa</div>
    )}
    <DailyNeeds />
    {/* <Footer /> */}
    </>
  );
}

export default OrderDetails;