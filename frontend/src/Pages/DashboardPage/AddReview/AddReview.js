import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import {
  clearErrors,
  newUserReview,
} from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import emailIcon from '../../../assets/images/login/email.svg';
import userIcon from '../../../assets/images/login/user.svg';
import { NEW_USER_REVIEW_RESET } from "../../../constants/userConstants";
//import useAuth from '../../../hooks/useAuth';
import styles from './AddReview.module.css';

const AddReview = () => {
  //const { loggedInUser } = useAuth();
  //console.log(loggedInUser);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { success, error: reviewError } = useSelector(
    (state) => state.newUserReview
  );
  const { user } = useSelector((state) => state.user);

  
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("userId", user._id);

    dispatch(newUserReview(myForm));

    //setOpen(false);
  };
  // const handleSubmit = (e) => {
  //   const loading = toast.loading('Loading...Please Wait!!!');
  //   e.preventDefault();
  //   const reviewData = {};
  //   reviewData.image = loggedInUser.photoURL;
  //   reviewData.email = e.target.email.value;
  //   reviewData.star = e.target.star.value;
  //   reviewData.reviewText = e.target.reviewText.value;

  //   axios
  //     .post('https://kacha-bazar.up.railway.app/add-reviews', reviewData)
  //     .then((res) => {
  //       if (res.data.insertedId) {
  //         swal({
  //           title: 'Good job!',
  //           text: 'Your Review is successful!',
  //           icon: 'success',
  //           button: 'OK!',
  //         });
  //         e.target.reset();
  //       }
  //     })
  //     .catch((err) => toast.error(err.message))
  //     .finally(() => toast.dismiss(loading));
  // };

  useEffect(() => {

    if (reviewError) {
      toast.error(reviewError, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully", {
        duration: 2000,
      });
      dispatch({ type: NEW_USER_REVIEW_RESET });
    }

  }, [dispatch, reviewError, success]);
  
  return (
    <section id={styles.add__review}>
      <Container>
        <h1>Review</h1>
        <form onSubmit={reviewSubmitHandler}>
          <Row className='g-4'>
            <Col lg={10}>
              <div className={styles.inputs}>
                <input
                  type='email'
                  id='reviewEmail'
                  name='email'
                  value={user?.email}
                  readOnly
                />
                <label htmlFor='reviewEmail'>
                  <img src={userIcon} alt='userIcon' />
                </label>
              </div>
            </Col>
            <Col lg={2}>
              <select name='star' value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </Col>
            <Col lg={12}>
              <div className={styles.inputs}>
                <textarea
                  name='reviewText'
                  id='review'
                  cols='30'
                  rows='10'
                  placeholder='Enter Your Valuable Review'
                  required
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>
                <label htmlFor='review' id={styles.review__label}>
                  <img src={emailIcon} alt='emailIcon' />
                </label>
              </div>
            </Col>
          </Row>
          <span>
            <button type='submit'>Add Review</button>
          </span>
        </form>
      </Container>
    </section>
  );
};

export default AddReview;
