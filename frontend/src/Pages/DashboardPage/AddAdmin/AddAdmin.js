import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import {
  getAllUsers,
  updateUser,
  clearErrors,
} from "../../../actions/userAction";
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import category from '../../../assets/images/icons/category.svg';
import styles from './AddAdmin.module.css';

const AddAdmin = () => {
  const dispatch = useDispatch();
  const[email, setEmail] = useState("");

  const { error, users, loading } = useSelector((state) => state.allUsers);
  //const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateloading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

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
    }

    if (isUpdated) {
    toast.success("User Updated to Admin Successfully", {
      duration: 2000,
    });
      //navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    } 
  }, [dispatch, error, isUpdated, updateError]);

  useEffect(() => {
    dispatch(getAllUsers());
  },[])
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    users &&
    users.forEach((item) => {
      if (email===item.email) {

        const myForm = new FormData();

        myForm.set("name", item.name);
        myForm.set("email", email);
        myForm.set("role", "admin");
    
        dispatch(updateUser(item._id, myForm));
      }

    });

  };
  // const handelSubmit = (e) => {
  //   e.preventDefault();
  //   const admin = e.target.adminEmail.value;
  //   const loading = toast.loading('Adding as Admin... Please wait!!!');
  //   if (!/\S+@\S+\.\S+/.test(admin)) {
  //     toast.error('Please Enter a valid Email Address..');
  //   } else {
  //     const user = { email: admin };
  //     axios
  //       .put('https://kacha-bazar.up.railway.app/user/admin', user, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('kacha_bazar_token')}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.matchedCount) {
  //           swal({
  //             title: 'Good job!',
  //             text: `You Added ${user.email} as an Admin!`,
  //             icon: 'success',
  //             button: 'OK!',
  //           });
  //           e.target.reset();
  //         } else {
  //           toast.error('This User is not in out Database');
  //         }
  //       })
  //       .catch((err) => toast.error(err.message))
  //       .finally(() => toast.dismiss(loading));
  //   }
  // };

  return (
    <section id={styles.add__admin}>
      <Container>
        <h1>Add Admin</h1>
        {(loading || updateloading) ? (
          <LoadingSpinner />
        ) : (
        <form onSubmit={updateUserSubmitHandler}>
          <span className={styles.inputs}>
            <input
              type='text'
              placeholder='Add a New Admin'
              id='addAdmin'
              autoComplete='off'
              name='category'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='addAdmin'>
              <img src={category} alt='category' />
            </label>
          </span>
          <button type='submit'>Add Admin</button>
        </form>
        )}
      </Container>
    </section>
  ); 
};

export default AddAdmin;
