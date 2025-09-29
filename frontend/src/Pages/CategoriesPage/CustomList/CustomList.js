import React,{useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import emailIcon from '../../../assets/images/login/email.svg';
import userIcon from '../../../assets/images/login/user.svg';
import { addListToCart } from "../../../actions/cartAction";
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
import Footer from '../../SharedComponents/Footer/Footer';
import TopNavigation from '../../SharedComponents/TopNavigation/TopNavigation';
import styles from './CustomList.module.css';

const CustomList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { listItems } = useSelector((state) => state.cart);
  const [list, setList] = useState(listItems)

  const proceedToCheckout = (e) => {
    e.preventDefault();
    dispatch(addListToCart(list));
    Navigate("/checkout")
  }
  
  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addListToCart(list));
    toast.success("Your list is saved",{
      duration: 1000,
    });
  };

  useEffect(() => {
    document.title = 'CustomList | Basket Bistro';
    window.scrollTo({
      top: 0,
    });
  },[])  

  return (
    <>
    {/* <TopNavigation /> */}
    <section id={styles.add__review}>
      <Container>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h1 style={{marginTop:"5px"}}>All Orders</h1>
          <span style={{marginTop:"0px", marginRight:"5px"}}>
          <a style={{color: "#10b981"}} href='https://wa.me/923104725572?text=hello%2C%20I%20have%20visited%20your%20website...%0A' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "2rem" }}/>
          </a>
          </span>
        </div>
        <form onSubmit={proceedToCheckout}>
          <Row className='g-4'>
            <Col lg={12}>
              <div className={styles.inputs}>
                <input
                  type='text'
                  id='reviewEmail'
                  name='email'
                  value={user?.name}
                  readOnly
                />
                <label htmlFor='reviewEmail'>
                  <img src={userIcon} alt='userIcon' />
                </label>
              </div>
            </Col>
            <Col lg={12}>
              <div className={styles.inputs}>
                <textarea
                  name='reviewText'
                  id='review'
                  cols='30'
                  rows='10'
                  placeholder='Add List of Products'
                  required
                  value={list}
                  onChange={(e) => setList(e.target.value)}
                ></textarea>
                <label htmlFor='review' id={styles.review__label}>
                  <img src={emailIcon} alt='emailIcon' />
                </label>
              </div>
            </Col>
          </Row>
          <div classname={styles.buttons_container}>
          <span>
            <button onClick={addToCartHandler}>Save List</button>
          </span>
          <span>
            <button type='submit'>Send List</button>
          </span>
          </div>
        </form>
      </Container>
    </section>
    <DailyNeeds />
    {/* <Footer /> */}
    </>
  );
};

export default CustomList;