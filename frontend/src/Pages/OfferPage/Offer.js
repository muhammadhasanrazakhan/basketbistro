import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../AboutUsPage/Banner/Banner';
import DailyNeeds from '../SharedComponents/DailyNeeds/DailyNeeds';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllOffers } from "../../actions/offerAction";
import { UPDATE_OFFER_ACTIVATION_RESET } from "../../constants/offerConstants";
import LoadingSpinner from '../SharedComponents/LoadingSpinner/LoadingSpinner';
import OfferCard from './OfferCard';
import styles from './Offer.module.css';

const Offer = () => {
  const dispatch = useDispatch();
  const { loading, error, offers } = useSelector((state) => state.allOffers);
  const {
    loading: activateloading,
    error: updateError,
    isActivated,
  } = useSelector((state) => state.offer);
  
  useEffect(() => {
    document.title = 'Offers | Basket Bistro';
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError, {
        duration: 2000,
      });
      dispatch(clearErrors());
      // setDisabled(false)
    }

    if (isActivated) {
      toast.success("Status Updated", {
        duration: 2000,
      })
      dispatch({ type: UPDATE_OFFER_ACTIVATION_RESET });
      dispatch(getAllOffers());
      // setDisabled(false)
    } 
    
    if (offers?.length === 0) {
    dispatch(getAllOffers());
    }
  }, [dispatch, error, isActivated, updateError]);
  
  return (
    <>
      <Banner />
      { (loading || activateloading) ? (
        <LoadingSpinner />
      ) : (
      <>  
      <h1 className={styles.mainHeading}>Offers</h1>
      <Container id={styles.offer__container}>
        {offers?.map((offer, idx) => (
          <OfferCard key={offer._id} offer={offer}/>
        ))}
      </Container>
      </>
      )}
      <DailyNeeds />
    </>  
  );
};

export default Offer;
