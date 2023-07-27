import { faBusinessTime, faTimeline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useMatch } from 'react-router-dom';
import toast from 'react-hot-toast';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import {
  clearErrors,
  updateOffer,
  getOfferDetails,
} from "../../../actions/offerAction";
import { UPDATE_OFFER_RESET } from "../../../constants/offerConstants";
import styles from './UpdateOffer.module.css';

const UpdateOffer = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const match = useMatch('/dashboard/update-offer/:id');
  
  const { offers } = useSelector((state) => state.allOffers);
  const { error, offer } = useSelector((state) => state.offerDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.offer);
  const { user } = useSelector((state) => state.user);

  const offerId = match.params.id;
  const specificOffer = offers.find((offer) => offer._id === offerId);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [referenceNumber, setReferenceNumber] = useState();
  const [type, setType] = useState();
  const [isDisable, setIsDisable] = useState(false)

  const updateOfferSubmitHandler = async (e) => {
    e.preventDefault();
    
    const Offer = {
      title,
      description, 
      type,
      duration,
      referenceNumber,
      createdBy: {_id: user?._id, name: user?.name, email: user?.email }
    }

    dispatch(updateOffer(offerId ,Offer));
    setIsDisable(true)

  };

  useEffect(() => {
    if (offers?.length === 0) {
      dispatch(getOfferDetails(offerId));
    } else {
      setTitle(specificOffer?.title);
      setDescription(specificOffer?.description);
      setDuration(specificOffer?.duration === 0 ? null : specificOffer?.duration);
      setReferenceNumber(specificOffer?.referenceNumber);
      setType(specificOffer?.type);
    }
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
    }

    if (isUpdated) {
      toast.success("Offer Updated Successfully", {
        duration: 2000,
      });
      navigate("/dashboard/manage-offers");
      dispatch({ type: UPDATE_OFFER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, offerId, offer, specificOffer, updateError]);

  return (
    <>
      {loading ? (<PreLoader />) : (
      <section id={styles.checkout}>
        <Container>
          <Row>
            <Col lg={6} className='mt-4 mt-md-0'>
              <Container>
                <h4>01. Offer Detalis</h4>
                <form onSubmit={updateOfferSubmitHandler}>
                  <Row className='g-4'>
                    <Col lg={12}>
                      <label htmlFor='offerName'>Offer Title</label>
                      <input type='text' name='name' id='offerName' placeholder='Enter a Suitable Title' autoComplete='off' required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Col>
                    <Col lg={12}>
                      <label htmlFor='offerDiscription'>Offer Description</label>
                      <input type='text' name='description' id='offerDescription' rows='3' placeholder='Enter Offer Description' autoComplete='off' required value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Col>
                    <Col lg={12}>
                      <label htmlFor='offerValidity'>Offer Validity Time</label>
                      <input type='number' name='duration' id='offerDuration' placeholder='Write in days(optional)' autoComplete='off' value={duration} onChange={(e) => setDuration(e.target.value)}/>
                    </Col>
                    <Col lg={12}>
                      <label htmlFor='offerType'>Reference Number</label>
                      <input type='number' name='ref' id='offerReference' placeholder='Enter Offer Reference Number ' autoComplete='off' required value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)}/>
                    </Col>
                  </Row>

                <h4 className='my-5'>02. Offer Type</h4>
                  <Row>
                    <Col lg={6} className={styles.payment__methods}>
                      <label htmlFor='continuity'>
                        <FontAwesomeIcon icon={faTimeline} />
                        <span className='ms-3'>Continue(Long Term)</span>
                      </label>
                      <input type='radio' name='payment' id={styles.money} required value="CONTINUE" onChange={(e) => setType(e.target.value)} />
                    </Col>
                    <Col lg={6} className={styles.payment__methods}>
                      <label htmlFor='onetime'>
                        <FontAwesomeIcon icon={faBusinessTime} />
                        <span className='ms-2'>One Time (Discount Type)</span>
                      </label>
                      <input type='radio' name='payment' id={styles.money} required value="LIMIT" onChange={(e) => setType(e.target.value)} />
                    </Col>
                  </Row>
                  <span className='d-flex justify-content-center'>
                    <button type="submit" disabled={isDisable}>
                      Update Offer
                    </button>
                  </span>
                  </form>
              </Container>
            </Col>
            
          </Row>
        </Container>
      </section>
      )}
    </>
  );
};

export default UpdateOffer;

