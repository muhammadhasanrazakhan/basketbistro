import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import { clearErrors, getProduct } from "../../../actions/productAction";
//import { emptyPrev, loadQueryProductsAsync, productSorting } from '../../../redux/feathers/productsSlice';
import ProductCard from '../../HomePage/ProductCard/ProductCard';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './SingleCategory.module.css';

const categorylist = ['FishandMeat','FruitsandVegetable','MilkandDairy','Grocery','SoupandDetergents','BabyCareandBeauty','Pharmacy'];

const SingleCategory = () => {
  const dispatch = useDispatch();
  //const { searchString } = useParams();
  //const Match = useMatch('/categories/:searchString');
  
  let keyword;
  let category;
  
  const match = useMatch('/categories/:searchString')
  if (categorylist.includes(match?.params?.searchString)) {
    category = match?.params?.searchString
    keyword = ""
  } else {
    keyword = match?.params?.searchString
    category = ""
  }
  const {error, loading, products, filteredProductsCount} = useSelector((state) => state.products);
  //const keyword = Match?.params?.searchString;
  //const category = match?.params?.searchString
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  // alert(category)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct( keyword, currentPage, price, category, ratings));
    //alert(category)
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  },[]);

  return (
    <Container>
      {loading ? (
        <div className='mt-5 pt-5'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {error && toast.error(error)}
          <div className='d-flex justify-content-between mb-4'>
            <h6>
              Total <strong>{filteredProductsCount}</strong> items Found
            </h6>
            {/* <form onSubmit={(e) => e.preventDefault()}>
              <select name='price' onChange={(e) => dispatch(productSorting(e.target.value))}>
                <option value='high'>High to Low</option>
                <option value='low'>Low to High</option>
              </select>
            </form> */}
          </div>

          <div className={styles.category__container}>
            {products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default SingleCategory;
