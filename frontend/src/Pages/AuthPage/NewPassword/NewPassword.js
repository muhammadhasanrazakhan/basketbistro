import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import passwordIcon from '../../../assets/images/login/password.svg';
import forgetPass from '../../../assets/images/login/forget-password.png';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../actions/userAction";
import Footer from '../../SharedComponents/Footer/Footer';
import TopNavigation from '../../SharedComponents/TopNavigation/TopNavigation';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import toast from 'react-hot-toast';
import { useNavigate, useMatch } from "react-router-dom";
import styles from './NewPassword.module.css';

const NewPassword = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch('/password/reset/:token');

  const id = match.params.id;
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully", {
        duration: 2000,
      });
      navigate("/login");
    }
  }, [dispatch, error, alert, success]);

  useEffect(() => {
    document.title = 'Reset Password | Basket Bistro';
  }, []);

  return (
    <>
    {loading ? (
      <PreLoader />
      ) : (
      <Container className={styles.reset__section}>
        <div className={styles.reset__container}>
          <img src={forgetPass} alt='forgetPass' className={styles.reset__img} />
          <form className={styles.reset__email} onSubmit={resetPasswordSubmit}>
            <span className={styles.inputs}>
              <input 
                type='password' 
                name='password' 
                id='newpassword' 
                autoComplete='off' 
                spellCheck='false' 
                placeholder='Enter Your New Password' 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='resetEmail'>
                <img src={passwordIcon} alt='passwordIcon' />
              </label>
            </span>
            <span className={styles.inputs}>
              <input 
                type='password' 
                name='confirmpassword' 
                id='confirmnewpassword' 
                autoComplete='off' 
                spellCheck='false' 
                placeholder='Confirm Your Password' 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor='resetEmail'>
                <img src={passwordIcon} alt='emailIcon' />
              </label>
            </span>
            <div className='d-flex justify-content-end'>
              <button type='submit'>Update</button>
            </div>
          </form>
        </div>
      </Container>
      )}
    </>
  );
};

export default NewPassword;