import { faFacebook, faGithub, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import footerLogo from '../../../assets/images/footerLogo.svg';
import Logo from '../../../assets/images/Logo.png';
import paymentLogo from '../../../assets/images/payment-logo.webp';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <Row>
            <Col lg={6} md={12} className={styles.logo}>
              <img src={Logo} alt='footerLogo' />
              <p>
                There are many popular products you will find our shop, Choose your daily necessary product from our BasketBistro shop and get some special offer.
              </p>
              <h6>Follow Us</h6>
              <ul className={styles.social__link}>
                <li>
                  <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                {/* <li>
                  <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li> */}
                <li>
                  <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                {/* <li>
                  <a href='https://www.linkedin.com/in/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li> */}
                <li>
                  <a href='https://wa.me/923104725572?text=hello%2C%20I%20have%20visited%20your%20website...%0A'>
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </li>
                {/* <li>
                  <a href='https://github.com' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li> */}
              </ul>
            </Col>
             <Col lg={2} md={4} sm={6} xs={6} className={styles.temp__column}>
              {/* <h5>Company</h5>
              <ul>
                <li>
                  <NavLink to='/'>About Us</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Contact us</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Careers</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Latest news</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Latest Discount</NavLink>
                </li>
              </ul> */}
            </Col> 
            <Col lg={2} md={4} sm={6} xs={6} className={styles.footer__column}>
              <h5>Top Category</h5>
              <ul>
                <li>
                  <NavLink to='/'>Fish & Meat</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Soft Drinks</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Baby Care</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Beauty & Health</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Fruits & Vegetable</NavLink>
                </li>
              </ul>
            </Col>
            <Col lg={2} md={4} sm={6} xs={6} className={styles.footer__column}>
              <h5>My Account</h5>
              <ul>
                <li>
                  <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/my-orders'>My Orders</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/my-orders'>Recent Orders</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/profile'>Updated Profile</NavLink>
                </li>
                <li>
                  <NavLink to='/change-password'>Change Password</NavLink>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <section id={styles.copyright__area} className='container'>
      <small>
        &copy; {new Date().getFullYear()}{' '}
        <a target='_blank' rel='noopener noreferrer' className='mx-1'>
          HasanRaza
        </a>
        , All rights reserved.
      </small>
        {/* <img src={paymentLogo} alt='paymentLogo' /> */}
      </section>
    </>
  );
};

export default Footer;
