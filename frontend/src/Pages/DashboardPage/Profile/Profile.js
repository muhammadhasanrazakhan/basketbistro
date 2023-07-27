import React,{useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//import useAuth from '../../../hooks/useAuth';
//import { emptyCart } from '../../../redux/feathers/productsSlice';
import profile from "../../../assets/images/Profile.png";
import { logout } from "../../../actions/userAction";
import toast from 'react-hot-toast';
import styles from './Profile.module.css';

const Profile = () => {
  //const { loggedInUser, logOut } = useAuth();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);


  const signOut = () => {
    dispatch(logout());
    toast.success("Logout Successfully", {
      duration: 2000,
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  },[]) 

  return (
    <>
      {isAuthenticated && (
        <section id={styles.my__profile}>
          <Container>
            <h1>My Profile</h1>
            <div className={styles.profile}>
              <img src={profile} alt={user?.name} />
              <h4>{user?.name}</h4>
              <p>{user?.email}</p>
              <p style={{fontSize:14}}>Total Shoppings : Rs. {user?.totalshoppings}</p>
              <button onClick={signOut}>Logout</button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default Profile;
