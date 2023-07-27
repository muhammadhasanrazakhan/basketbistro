import { faClipboardList, faHome, faPlus, faQuoteLeft, faSignOutAlt, faTasks, faUser, faUserPlus, faUserTie, faGift, faCircleDollarToSlot, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
import toast from 'react-hot-toast';
import { logout } from "../../../actions/userAction";
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.user);

  const signOut = () => {
    dispatch(logout());
    toast.success("Logout Successfully", {
      duration: 2000,
    });
  };

  useEffect(() => {
    document.title = 'Dashboard | Basket Bistro';
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <section id={styles.dashboard}>
        <Container>
          <Row>
            <Col lg={3}>
              <aside>
                <NavLink to='/dashboard/profile' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  Profile
                </NavLink>
                {user?.role !== "admin" ? (
                  <>
                    <NavLink to='/dashboard/my-orders' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faTasks} />
                      </span>
                      My Orders
                    </NavLink>
                    <NavLink to='/dashboard/review' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faQuoteLeft} />
                      </span>
                      Review
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to='/dashboard/add-product' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Add Product
                    </NavLink>
                    <NavLink to='/dashboard/create-offer' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faGift} />
                      </span>
                      Create Offer
                    </NavLink>
                    <NavLink to='/dashboard/make-admin' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faUserPlus} />
                      </span>
                      Add Admin
                    </NavLink>
                    <NavLink to='/dashboard/manage-orders' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faListCheck} />
                      </span>
                      Manage Orders
                    </NavLink>
                    <NavLink to='/dashboard/manage-products' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faClipboardList} />
                      </span>
                      Manage Products
                    </NavLink>
                    <NavLink to='/dashboard/manage-users' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      Manage Users
                    </NavLink>
                    <NavLink to='/dashboard/manage-offers' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span>
                        <FontAwesomeIcon icon={faCircleDollarToSlot} />
                      </span>
                      Manage Offers
                    </NavLink>

                  </>
                )}

                <NavLink to='/' onClick={signOut}>
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                  Log Out
                </NavLink>
                <NavLink to='/' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                  <span>
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  Back Home
                </NavLink>
              </aside>
            </Col>
            <Col lg={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </section>
      <DailyNeeds />
    </>
  );
};

export default Dashboard;
