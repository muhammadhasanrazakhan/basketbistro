import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import useAuth from '../../../hooks/useAuth';
//import { emptyCart } from '../../../redux/feathers/productsSlice';
import profile from "../../../assets/images/Profile.png";
import { logout } from "../../../actions/userAction";
import toast from 'react-hot-toast';
import styles from './ProfileDetails.module.css';

const ProfileDetails = ({comefrom}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  //const { loggedInUser, logOut } = useAuth();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const handleClick = (event) => {
    if (comefrom !== "mobile") {
    setShow(!show);
    setTarget(event.target);
    } 
    if (comefrom === "mobile") {
      navigate('/dashboard');
    }
  };

  const signOut = () => {
    dispatch(logout());
    toast.success("Logout Successfully", {
      duration: 2000,
    });
    //logOut();
    //dispatch(emptyCart());
  };

  return (
    <div ref={ref}>
      <img style={{ width: '47px', height: '45px', borderRadius: '50%'}} onClick={handleClick} src={profile} alt={user.name} />

      <Overlay show={show} target={target} placement='bottom' container={ref}>
        <Popover id='popover-contained' className={styles.profile__body}>
          <Popover.Body>
            <img onClick={handleClick} style={{ border: '3px solid #10b981', width: '47px', height: '45px', borderRadius: '50%' }} src={profile} alt={user?.name} className={styles.profile__popper} />
            <h6>
              <strong>{user?.name}</strong>
            </h6>
            <p>
              <strong>{user?.email}</strong>
            </p>
            <p style={{fontSize:10}}>Total Shoppings : Rs. {user?.totalshoppings}</p>
            <button onClick={signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default ProfileDetails;
