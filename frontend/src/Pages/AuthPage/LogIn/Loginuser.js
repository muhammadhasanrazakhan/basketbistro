import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import emailIcon from '../../../assets/images/login/email.svg';
import facebookIcon from '../../../assets/images/login/facebook.svg';
import gitHubIcon from '../../../assets/images/login/gitHub.svg';
import googleIcon from '../../../assets/images/login/google.svg';
import passwordIcon from '../../../assets/images/login/password.svg';
//import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../actions/userAction";
import toast from 'react-hot-toast';
import styles from './Login.module.css';

const Loginuser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const { googleSignIn, gitHubSignIn, emailSignIn, isDisable } = useAuth();
  
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   if (!/\S+@\S+\.\S+/.test(email)) {
  //     toast.error('Please Enter a valid Email Address..');
  //   } else {
  //     //emailSignIn(email, password, navigate, location, e);
  //   }
  // };



  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = "/home";

  useEffect(() => {
    document.title = 'Login | Basket Bistro';
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000, // Set the duration (in milliseconds)
      });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect, navigate]);

  return (
    <>
    {loading ? (
        <PreLoader />
      ) : (
      <section id={styles.login}>
        <Container>
          <h3>Sign In!</h3>

          {/* <Row className={styles.third__party}>
            <Col lg={4} className='g-4'>
              <button className={styles.method1} onClick={() => googleSignIn(navigate, location)}>
                <img src={googleIcon} alt='googleIcon' />
                <h5>Google</h5>
              </button>
            </Col>
            <Col lg={4} className='g-4'>
              <button className={styles.method2} onClick={() => toast.error('Sorry Facebook auth not work in deployment')}>
                <img src={facebookIcon} alt='facebookIcon' />
                <h5>Facebook</h5>
              </button>
            </Col>
            <Col lg={4} className='g-4'>
              <button className={styles.method3} onClick={() => gitHubSignIn(navigate, location)}>
                <img src={gitHubIcon} alt='gitHubIcon' />
                <h5>GitHub</h5>
              </button>
            </Col>
          </Row>

          <p className={styles.another}>OR</p> */}
          <form onSubmit={loginSubmit}>
            <span className={styles.inputs}>
              <input 
                type='text' 
                name='email' 
                id='email' 
                autoComplete='off' 
                spellCheck='false' 
                placeholder='Enter Your Email or Phone Number' 
                required 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}  
              />
              <label htmlFor='email'>
                <img src={emailIcon} alt='emailIcon' />
              </label>
            </span>
            <span className={styles.inputs}>
              <input
                type='password'
                name='password'
                id='password'
                autoComplete='off'
                spellCheck='false'
                placeholder='Enter Your Secret Password'
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <label htmlFor='password'>
                <img src={passwordIcon} alt='passwordIcon' />
              </label>
            </span>
            <span className={styles.options}>
              <NavLink to='/reset-password'>Forget Password?</NavLink>
              <NavLink to='/register'>New User?</NavLink>
            </span>
            <button type='submit' /*disabled={isDisable}*/>
            {/* {isDisable ? 'Signing....' : 'Sign In'} <FontAwesomeIcon icon={faArrowRight} /> */}
              Sign In<FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </Container>
      </section>
      )}
    </>
  );
};

export default Loginuser;
