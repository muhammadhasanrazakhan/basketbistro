import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllOffers, changeOfferActivation } from "../../actions/offerAction";
import { UPDATE_OFFER_ACTIVATION_RESET } from "../../constants/offerConstants";
import LoadingSpinner from '../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './Offer.module.css';

const OfferCard = ({offer}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, title, description, duration, createdAt} = offer;
  const [disabled, setDisabled] = useState(false)

  const { loading, error, offers } = useSelector((state) => state.allOffers);
  const { isAuthenticated ,user } = useSelector((state) => state.user);
  const {
    loading: activateloading,
    error: updateError,
    isActivated,
  } = useSelector((state) => state.offer);

  const isActive = offer?.activeMembers?.users?.some((User) => User?._id === user?._id)
  
  function daysRemaining(offerCreateddate, orderDurationDays) {

    let currenttdate = new Date();
    let currentDate = currenttdate.toISOString().slice(0, 10);

    let offerCreatedDate = offerCreateddate.slice(0,10);
    //let currentDate = currentdate.slice(0,10);

    
    // Convert the date strings to Date objects
    const offerDate = new Date(offerCreatedDate);
    const currentDateObj = new Date(currentDate);
  
    // Calculate the end date of the order
    const orderEndDate = new Date(offerDate);
    orderEndDate.setDate(orderEndDate.getDate() + orderDurationDays);
  
    // Calculate the remaining days
    const remainingTime = orderEndDate.getTime() - currentDateObj.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));
    
    if (remainingDays <= 1) {
      return `This Offer end in 1 day`;
    } else {
      return `This Offer ends in ${remainingDays} days`;
    }
  }

  const changeActivation = async (id) => {
    if (isAuthenticated) {
      let User = {userid: user._id, name: user.name, email:user.email}
      dispatch(changeOfferActivation(id, User))
      setDisabled(true)
    } else {
      navigate('/login')
    }  
  }

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //     setDisabled(false)
  //   }

  //   if (updateError) {
  //     toast.error(updateError);
  //     dispatch(clearErrors());
  //     setDisabled(false)
  //   }

  //   if (isActivated) {
  //     toast.success("Status Updated")
  //     dispatch({ type: UPDATE_OFFER_ACTIVATION_RESET });
  //     dispatch(getAllOffers());
  //     setDisabled(false)
  //   } 

  // }, [dispatch, error, updateError, isActivated]);
  return (
    <div className={styles.offerBox}>
      <div className={styles.adjustmentdiv}>
        <div className={styles.offerContent}>
          <h4>{title}</h4>
          <p className={isActive ? styles.activestatusBoxText : styles.inactivestatusBoxText}>{isActive ? 'Active' : 'Inactive'}</p>
          <p className={styles.offerDiscription}>{description}</p>
        </div>
      </div>
      <div className={styles.separator}></div>
      <p className={styles.statusTimeText}>{duration != (0) ? daysRemaining(createdAt, duration) : 'This is not a limited time offer'}</p>
      <div className={styles.buttonDiv}>
        <button className={isActive ? styles.activeofferButton : styles.inactiveofferButton} onClick={() => changeActivation(_id)}>{isActive ? 'Dectivate' : 'Activate'}</button>
        <p className={isActive ? styles.activeinstruction : styles.inactiveinstruction}>{isActive ? 'Contact us, If you have any query' : 'Push the button to activate offer'}</p>
      </div>
    </div>
  );
};

export default OfferCard;