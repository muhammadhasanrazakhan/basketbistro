import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getProduct } from "../../../actions/productAction";
// import { loadProductsAsync } from '../../../redux/feathers/productsSlice';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import ProductCard from '../ProductCard/ProductCard';
import styles from './Products.module.css';

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  // useEffect(() => {
  //   dispatch(loadProductsAsync());
  // }, [dispatch]);

  // const state = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }
    if (products?.length === 0) {
    dispatch(getProduct());
    }
  }, [dispatch]);

  return (
    <section id={styles.products}>
      <Container>
        <h3>Popular Products for Daily Shopping</h3>
        <p>See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping.</p>
        <div className={styles.products__container}>
          {products?.slice(0, 20)?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          
          <div className={styles.add__list__box} onClick={() => navigate('/addcustomlist')}>
            <span className={styles.card__img}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <div className={styles.add__list__content}>
              <h4>Add Your Custom List</h4>
            </div>
          </div>  
        </div>              

        {/* {loading && <LoadingSpinner />}
        <span className={styles.category__button}>
          <button onClick={() => navigate('categories/Fresh%20Vegetable')}>All Categories</button>
        </span> */}
      </Container>
    </section>
  );
};

export default Products;
