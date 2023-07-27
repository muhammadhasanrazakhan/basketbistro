import { faLock, faUnlock, faArrowRight, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import emailIcon from '../../../assets/images/login/email.svg';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import passwordIcon from '../../../assets/images/login/password.svg';
import userIcon from '../../../assets/images/login/user.svg';
//import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };


  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      //alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
        toast.success("Profile Updated Successfully", {
          duration: 2000,
        });
  
        navigate("/home");
  
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
  }, [dispatch, error, isUpdated, navigate]);


  useEffect(() => {
    document.title = 'Change Password | Basket Bistro';
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
          <h3>Change Password</h3>

          <form onSubmit={updatePasswordSubmit} autoComplete='off'>
            <span className={styles.inputs}>
              <input 
                type='text' 
                name="name"
                id='name1' 
                autoComplete='off' 
                spellCheck='false' 
                placeholder='Enter Your Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required />
              <label htmlFor='name1'>
                <FontAwesomeIcon icon={faKey} />
              </label>
            </span>
            <span className={styles.inputs}>
              <input
                type='password'
                name='password'
                id='password2'
                autoComplete='new-password'
                spellCheck='false'
                placeholder='Enter Your New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label htmlFor='email2'>
              <FontAwesomeIcon icon={faUnlock} />
              </label>
            </span>
            <span className={styles.inputs}>
              <input
                type='password'
                name='password'
                id='password1'
                autoComplete='off'
                spellCheck='false'
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label htmlFor='password1'>
              <FontAwesomeIcon icon={faLock} />
              </label>
            </span>
            {/* <span className={styles.options}>
              <NavLink to='/login'>Already Have Account?</NavLink>
            </span> */}
            <button type='submit' value="Register">
              Update Password<FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </Container>
      </section>
      )}
    </>
  );
};

export default ChangePassword;