import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import emailIcon from '../../../assets/images/login/email.svg';
import forgetPass from '../../../assets/images/login/forget-password.png';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../actions/userAction";
import Footer from '../../SharedComponents/Footer/Footer';
import TopNavigation from '../../SharedComponents/TopNavigation/TopNavigation';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import toast from 'react-hot-toast';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message, {
        duration: 2000,
      });
    }
  }, [dispatch, error, alert, message]);

  useEffect(() => {
    document.title = 'Forgot Password | Basket Bistro';
  }, []);

  return (
    <>
    {loading ? (
        <PreLoader />
      ) : (
      <Container className={styles.reset__section}>
        <div className={styles.reset__container}>
          <img src={forgetPass} alt='forgetPass' className={styles.reset__img} />
          <form className={styles.reset__email} onSubmit={forgotPasswordSubmit}>
            <span className={styles.inputs}>
              <input 
                type='email' 
                name='email' 
                id='resetEmail' 
                autoComplete='new-password' 
                spellCheck='false' 
                placeholder='Enter Your Email Address' 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='resetEmail'>
                <img src={emailIcon} alt='emailIcon' />
              </label>
            </span>
            <div className='d-flex justify-content-end'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </Container>
      )}
    </>
  );
};

export default ResetPassword;
