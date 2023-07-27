import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllUsers, clearErrors } from "../../../actions/userAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './ManageUsers.module.css';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const sortedUsers =  Array.isArray(users) ? [...users].sort((a, b) => a.name.localeCompare(b.name)) : [];
  const reloadUsers = () => {
    dispatch(getAllUsers());
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (users?.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, error]);

  return (
    <section id={styles.my__order}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1>All Users</h1>
        <span style={{marginTop:"5px", marginRight:"5px"}} onClick={()=>reloadUsers()}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </span>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!users?.length ? (
            <div className={styles.placeholder__text}>
              <span className={styles.placeholder__image}>
                <svg stroke='currentColor' fill='#10b981 ' strokeWidth='0' viewBox='0 0 512 512' height='30px' width='30px' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                </svg>
              </span>
              <h6>You Don't have any User</h6>
            </div>
          ) : (
            <>
              <Table bordered size='sm' responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th style={{whiteSpace:"nowrap"}}>Total Shopping</th>
                    <th style={{whiteSpace:"nowrap"}}>Active Offers REF</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers?.map((user, idx) => (
                    <tr key={user._id}>
                      <td className='fw-bold'>&nbsp;{idx + 1}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.name}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user?.lastPhoneNumber}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.email}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.totalshoppings}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.activeOffers.map((offer) => offer.ref).join(", ")}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{user.createdAt.slice(0,10)}&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ManageUsers;