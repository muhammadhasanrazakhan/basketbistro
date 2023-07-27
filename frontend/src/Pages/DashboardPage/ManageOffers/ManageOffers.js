import { faTrashAlt, faXmark, faArrowsRotate, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOffer,
  getAllOffers,
  changeOfferActivationByAdmin,
  clearErrors,
} from "../../../actions/offerAction";
import { DELETE_OFFER_RESET, UPDATE_OFFER_ACTIVATION_BY_ADMIN_RESET } from "../../../constants/offerConstants";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import price from '../../../assets/images/icons/price.svg';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import { useNavigate } from "react-router-dom";
import styles from './ManageOffers.module.css';

var offerID = "";
let offerUsers = [];

const ManageOffers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, offers } = useSelector((state) => state.allOffers);
  const { error: deleteError, isDeleted, loading : deleteloading } = useSelector((state) => state.offer);
  const { error: deactivatedError, isDeactivatedByAdmin, loading : deactivatedloading } = useSelector((state) => state.offer);

  const [modal, setModal] = useState(false);

  const updatetoggle = (id, usersList) => {
    offerID = id
    offerUsers = usersList
    toggleModal();
  };

  
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const deleteOfferHandler = (id, active) => {
    if (active>0) {
      toast.error("Please dismiss all the active users with this offer first", {
        duration: 2000,
      });
    } else {
      dispatch(deleteOffer(id));
      dispatch(getAllOffers());
    }
  };

  const dismissFromOfferHandler = (userid, name, email) => {
      let User = {userid: userid, name: name, email:email}
      dispatch(changeOfferActivationByAdmin(offerID,User));
      setModal(!modal)
      dispatch(getAllOffers());
  }

  const reloadOffers = () => {
    dispatch(getAllOffers());
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
      toast.success("Offer Deleted Successfully", {
        duration: 2000,
      });
      // navigate("/admin/orders");
      dispatch({ type: DELETE_OFFER_RESET });
    }

    if (deactivatedError) {
      toast.error(deactivatedError, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }
    if (isDeactivatedByAdmin) {
      toast.success("User is removed from offer", {
        duration: 2000,
      });
      // navigate("/admin/orders");
      dispatch({ type: UPDATE_OFFER_ACTIVATION_BY_ADMIN_RESET });
    }

    if (offers?.length === 0) {
    dispatch(getAllOffers());
    }
  }, [dispatch, error, deleteError, isDeleted, deactivatedError, isDeactivatedByAdmin]);

  return (
    <section id={styles.manage__orders}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1>All Offers</h1>
        <span style={{marginTop:"5px", marginRight:"5px"}} onClick={()=> reloadOffers()}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </span>
      </div>
      {(loading || deleteloading) ? (
        <LoadingSpinner />
      ) : (
        <>
          {!offers?.length ? (
            <div className={styles.placeholder__text}>
              <span className={styles.placeholder__image}>
                <svg stroke='currentColor' fill='#10b981 ' strokeWidth='0' viewBox='0 0 512 512' height='30px' width='30px' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                </svg>
              </span>
              <h6>Your Don't have any Offer</h6>
              <p>Please make a suitable offer that attract users.</p>
            </div>
          ) : (
            <>
              <Table bordered size='sm' responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th> Reference </th>
                    <th>Offer Users</th>
                    <th> Active </th>
                    <th> Delete </th>
                    <th> Action </th>
                    <th>Created By</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {offers?.map((offer, idx) => (
                    <tr key={offer._id}>
                      
                      <td>&nbsp;{idx + 1}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{offer.title}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{offer.referenceNumber}&nbsp;</td>
                      <td>
                        <button
                          className={styles.btnUsers}
                          onClick={() => updatetoggle(offer._id, offer.activeMembers.users)}
                        >
                        All  Users
                        </button>
                      </td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{offer.activeMembers.NumberOfMembers}&nbsp;</td>
                      <td>
                        <span onClick={() => deleteOfferHandler(offer._id, offer.activeMembers.NumberOfMembers)}>
                          <FontAwesomeIcon icon={faTrashAlt} className={styles.delete__icon} />
                        </span>
                      </td>
                      <td>
                        <Link to={`/dashboard/update-offer/${offer._id}`}>
                          <FontAwesomeIcon icon={faPencilAlt} className={styles.delete__icon} />
                        </Link>
                      </td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{offer.createdBy.name}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{offer.createdAt.slice(0,10)}&nbsp;</td>
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
            <h1>Active Users</h1>
            <>
            {(offerUsers.length > 0) ? (  
              <Table bordered size='sm' responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {offerUsers?.map((user, idx) => (
                    <tr key={idx}>
                      <td>&nbsp;{idx + 1}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.name}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.email}&nbsp;</td>
                      <td>
                        <span onClick={() => dismissFromOfferHandler(user._id, user.name, user.email)}>
                          <FontAwesomeIcon icon={faTrashAlt} className={styles.delete__icon} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No User Activated this Offer yet</p>
            )}
            </>
            <div className={styles.closemodal} onClick={toggleModal}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageOffers;
