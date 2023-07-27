import React,{useEffect, useState} from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getAllOffers } from "../../../actions/offerAction";
import banner1 from '../../../assets/images/banner/banner-1.webp';
import banner2 from '../../../assets/images/banner/banner-2.webp';
import first from '../../../assets/images/banner/slider-1.webp';
import second from '../../../assets/images/banner/slider-2.webp';
import third from '../../../assets/images/banner/slider-3.webp';
import offer_banner_1 from '../../../assets/images/banner/offer_banner_1.jpg';
import offer_banner from '../../../assets/images/banner/offer_banner.jpg';
import styles from './Banner.module.css';

const Banner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, offers } = useSelector((state) => state.allOffers);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (offers?.length === 0) {
    dispatch(getAllOffers());
    }
  }, [dispatch, error]);

  return (
    <Container id='banner' className={styles.banner}>
      <Row className='mt-5 mt-md-0'>
        <Col lg={6} md={12}>
          <Carousel pause='false'>
            <Carousel.Item className={styles.carousel__item}>
              <img className='img-fluid w-100' src={first} alt='First' />
              <div className={styles.overlay}>
                <h3> The Best Quality Products Guaranteed!</h3>
                <p>Dramatically facilitate effective total linkage for go forward processes...</p>
                <button onClick={() => navigate('/about-us')}>Learn More</button>
              </div>
            </Carousel.Item>

            <Carousel.Item className={styles.carousel__item}>
              <img src={second} alt='Second' />
              <div className={styles.overlay}>
                <h3> Best Different Type of Grocery Store </h3>
                <p>Quickly aggregate empowered networks after emerging products...</p>
                <button onClick={() => navigate('/about-us')}>Learn More</button>
              </div>
            </Carousel.Item>

            <Carousel.Item className={styles.carousel__item}>
              <img src={third} alt='Third' />
              <div className={styles.overlay}>
                <h3> Quality Freshness Guaranteed!</h3>
                <p>intrinsically fashion performance based products rather than accurate benefits...</p>
                <button onClick={() => navigate('/about-us')}>Learn More</button>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col lg={6} md={12} className={styles.banner__side}>
          {/* <img src={banner1} alt='banner1' /> */}
          {offers?.[0] ? (
          <div className={styles.offerBox} onClick={() => navigate('/offer')}>
            <img src={offer_banner} alt='banner1' />
            <div className={styles.offerContent}>
              <h4>{offers?.[0].title}</h4>
              <p className={styles.statusBoxText}>
                Explore
              </p>
              <p className={styles.offerDiscription}>{offers?.[0].description}</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.buttonDiv}>
              <button className={styles.offerButton} onClick={() => navigate('/offer')}>Explore</button>
              <p className={styles.instruction}>Press the button to get more info</p>
            </div>
          </div>
          ) : (
            <img src={banner1} alt='banner1' className={styles.banner__img}  onClick={() => navigate('/categories/FruitsandVegetable')}/>
          )}
          <div className='mt-3'>
          {offers?.[1] ? (          
          <div className={styles.offerBox} onClick={() => navigate('/offer')}>
            <img src={offer_banner} alt='banner1' />
            <div className={styles.offerContent}>
              <h4>{offers?.[1].title}</h4>
              <p className={styles.statusBoxText}>Explore</p>
              <p className={styles.offerDiscription}>{offers?.[1].description}</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.buttonDiv}>
              <button className={styles.offerButton} onClick={() => navigate('/offer')}>Explore</button>
              <p className={styles.instruction}>Press the button to get more info</p>
            </div>
          </div>
          ) : (
            // <div className={styles.offerBox}>
              <img src={banner1} alt='banner1' className={styles.banner__img} onClick={() => navigate('/categories/FruitsandVegetable')}/>
            // </div>
          )}

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
