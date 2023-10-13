import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import emailIcon from '../../../assets/images/login/email.svg';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../actions/userAction";
import facebookIcon from '../../../assets/images/login/facebook.svg';
import gitHubIcon from '../../../assets/images/login/gitHub.svg';
import googleIcon from '../../../assets/images/login/google.svg';
import passwordIcon from '../../../assets/images/login/password.svg';
import userIcon from '../../../assets/images/login/user.svg';
//import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //const { googleSignIn, gitHubSignIn, emailSignup, isDisable } = useAuth();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const { name, email, password } = user;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   const confirmPassword = e.target.confirmPassword.value;

  //   if (!/\S+@\S+\.\S+/.test(email)) {
  //     toast.error('Please Enter a valid Email Address..');
  //   } else if (password !== confirmPassword) {
  //     toast.error('Password not matched...');
  //   } else if (password.length < 8) {
  //     toast.error('Your Password must have 8 characters...');
  //   } else if (!/(?=.*?[A-Z])/.test(password)) {
  //     toast.error('Password should be at least 1 Uppercase');
  //   } else if (!/(?=.*?[0-9])/.test(password)) {
  //     toast.error('Password should be at least 1 Number');
  //   } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
  //     toast.error('Password should be at least 1 Spacial character');
  //   } else {
  //     //emailSignup(name, email, password, navigate);
  //   }
  // };

  const registerSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("password", password);
    //myForm.set("avatar", avatar);
    //dispatch(register(myForm));
    dispatch(register(name, email, password));
    //alert(password)
  };

  // const registerDataChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  //const redirect = location.search ? location.search.split("=")[1] : "/account";
  const redirect = "/home";

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      //alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect, navigate]);


  useEffect(() => {
    document.title = 'Register | Basket Bistro';
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
    {loading ? (
        <PreLoader />
      ) : (

      <section id={styles.register}>
        <Container>
          <h3>Get started for free!</h3>

          {/* <Row className={styles.third__party}>
            <Col lg={4} className='g-4'>
              <div className={styles.method1} onClick={() => googleSignIn(navigate, location)}>
                <img src={googleIcon} alt='googleIcon' />
                <h5>Google</h5>
              </div>
            </Col>
            <Col lg={4} className='g-4'>
              <div className={styles.method2} onClick={() => toast.error('Sorry Facebook auth not work in deployment')}>
                <img src={facebookIcon} alt='facebookIcon' />
                <h5>Facebook</h5>
              </div>
            </Col>
            <Col lg={4} className='g-4'>
              <div className={styles.method3} onClick={() => gitHubSignIn(navigate, location)}>
                <img src={gitHubIcon} alt='gitHubIcon' />
                <h5>GitHub</h5>
              </div>
            </Col>
          </Row>

          <p className={styles.another}>OR</p> */}
          <form onSubmit={registerSubmit} autoComplete='off'>
            <span className={styles.inputs}>
              <input 
                type='text' 
                name="name"
                id='name1' 
                autoComplete='off' 
                spellCheck='false' 
                placeholder='Enter Your Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
              <label htmlFor='name1'>
                <img src={userIcon} alt='userIcon' />
              </label>
            </span>
            <span className={styles.inputs}>
              <input
                type='text'
                name='email'
                id='email2'
                autoComplete='new-password'
                spellCheck='false'
                placeholder='Enter Your Email or Phone Number'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='email2'>
                <img src={emailIcon} alt='emailIcon' />
              </label>
            </span>
            <span className={styles.inputs}>
              <input
                type='password'
                name='password'
                id='password1'
                autoComplete='off'
                spellCheck='false'
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor='password1'>
                <img src={passwordIcon} alt='passwordIcon' />
              </label>
            </span>
            {/* <span className={styles.inputs}>
              <input
                type='password'
                name='confirmPassword'
                id='password2'
                autoComplete='off'
                spellCheck='false'
                placeholder='Confirm Your Password'
                required
              />
              <label htmlFor='password2'>
                <img src={passwordIcon} alt='passwordIcon' />
              </label>
            </span> */}
            <span className={styles.options}>
              <NavLink to='/login'>Already Have Account?</NavLink>
            </span>
            <button type='submit' value="Register">
              Get Started Now<FontAwesomeIcon icon={faArrowRight} />
              {/* {isDisable ? 'Registering....' : 'Get Started Now'} <FontAwesomeIcon icon={faArrowRight} /> */}
            </button>
          </form>
        </Container>
      </section>
      )}
    </>
  );
};

export default Register;
