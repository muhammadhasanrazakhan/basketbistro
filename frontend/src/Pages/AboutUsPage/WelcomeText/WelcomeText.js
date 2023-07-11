import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import banner from '../../../assets/images/aboutUs/about-banner.webp';
import gridImg from '../../../assets/images/aboutUs/about-us.webp';
import styles from './WelcomeText.module.css';

const WelcomeText = () => {
  return (
    <Container id={styles.welcome__text}>
      <Row className='gx-4'>
        <Col lg={6} md={6} className='gx-4'>
          <h3>Welcome to Basket Bistro</h3>
          <p>
          Welcome to our premier online grocery shopping destination! Whether you're a busy professional, a parent on the go, or simply 
          someone who appreciates the convenience of shopping from the comfort of your own home, we are here to redefine the way you 
          experience grocery shopping. Our website offers a vast selection of high-quality products, from fresh produce and pantry staples to 
          specialty items and household essentials. 
          </p>

          <p>
          With user-friendly features, reliable delivery services, and a commitment to exceptional customer satisfaction, we aim to make your 
          grocery shopping experience effortless, efficient, and enjoyable. Get ready to embark on a seamless journey through our virtual aisles, 
          where convenience meets quality, and where your satisfaction is our top priority.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>More than 1K</h2>
              <h4>Available Products</h4>
              <p>Dynamically morph team driven partnerships after vertical.</p>
            </div>
            <div className={styles.card}>
              <h2>Large Number</h2>
              <h4>of satisfied Customers</h4>
              <p>Delivered Quality products in short time.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} className={styles.about__image}>
          <img src={gridImg} alt='gridImg' />
        </Col>
      </Row>

      <p>
          Welcome to our premier online grocery shopping destination! Whether you're a busy professional, a parent on the go, or simply 
          someone who appreciates the convenience of shopping from the comfort of your own home, we are here to redefine the way you 
          experience grocery shopping. Our website offers a vast selection of high-quality products, from fresh produce and pantry staples to 
          specialty items and household essentials. 
          </p>

          <p className='mb-5'>
          With user-friendly features, reliable delivery services, and a commitment to exceptional customer satisfaction, we aim to make your 
          grocery shopping experience effortless, efficient, and enjoyable. Get ready to embark on a seamless journey through our virtual aisles, 
          where convenience meets quality, and where your satisfaction is our top priority.
          </p>
      <img src={banner} alt='banner' />
    </Container>
  );
};

export default WelcomeText;
