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

const categorylist = ['ChickenandMeat','FruitsandVegetable','MilkandDairy','Grocery','SoupandDetergents','BabyCareandBeauty','Pharmacy'];

const SingleCategory = () => {
  const dispatch = useDispatch();
  //const { searchString } = useParams();
  //const Match = useMatch('/categories/:searchString');
  const {error, loading, products, filteredProductsCount} = useSelector((state) => state.products);
  const [productsCount, setProductsCount] = useState();
  const [Products, setProducts] = useState([]);
  const [filtering, setFiltering] = useState(false);

  let filtered_Products;
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
  
  //const keyword = Match?.params?.searchString;
  //const category = match?.params?.searchString
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  // alert(category)

  const filterProducts = (products, keyword1, category1) => {
    let filteredProducts1 = [...products];
    setFiltering(true)
    // Perform filtering based on query parameters
    if (keyword1 !== "") {
      const keyword2 = keyword1.toLowerCase();
      filteredProducts1 = filteredProducts1.filter((product) =>
        product.name.toLowerCase().includes(keyword2)
      );
    }
    if (category1 !== "") {
      filteredProducts1 = filteredProducts1.filter(
        (product) => product.category === category1
      );
    }
    setProductsCount(filteredProducts1.length)
    setProducts(filteredProducts1)
    setFiltering(false)
    return filteredProducts1;
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }
    filtered_Products = filterProducts(products, keyword, category);
    if (products?.length === 0) {
      dispatch(getProduct());
    }
  }, [dispatch, keyword, currentPage, price, category, ratings, error, filtered_Products]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  },[]);

  return (
    <Container>
      {(loading || filtering) ? (
        <div className='mt-5 pt-5'>
          <LoadingSpinner />
        </div>
      ) : (
          <>
          {error && toast.error(error)}
          <div className='d-flex justify-content-between mb-4'>
            <h6>
              Total <strong>{productsCount}</strong> items Found
            </h6>
            {/* <form onSubmit={(e) => e.preventDefault()}>
              <select name='price' onChange={(e) => dispatch(productSorting(e.target.value))}>
                <option value='high'>High to Low</option>
                <option value='low'>Low to High</option>
              </select>
            </form> */}
          </div>

          <div className={styles.category__container}>
            {Products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default SingleCategory;
