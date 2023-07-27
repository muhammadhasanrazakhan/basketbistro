import { faTrashAlt, faPencilAlt, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../../actions/productAction";
import { Link } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './ManageProducts.module.css';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const {  error, products, loading } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted, loading: deleteloading } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const reloadProducts = () => {
    dispatch(getAdminProduct());
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully", {
        duration: 2000,
      });
      //navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProduct());
    }
    if (products?.length === 0) {
    dispatch(getAdminProduct());
    }
  }, [dispatch, error, deleteError, isDeleted]);

  return (
    <section id={styles.my__order}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1>All Products</h1>
        <span style={{marginTop:"5px", marginRight:"5px"}} onClick={()=>reloadProducts()}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </span>
      </div>
      {(loading || deleteloading) ? (
        <LoadingSpinner />
      ) : (
        <>
          {!products?.length ? (
            <div className={styles.placeholder__text}>
              <span className={styles.placeholder__image}>
                <svg stroke='currentColor' fill='#10b981 ' strokeWidth='0' viewBox='0 0 512 512' height='30px' width='30px' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                </svg>
              </span>
              <h6>You Don't have any Product</h6>
              <p>No items added in your Product List. Please add product to your list.</p>
            </div>
          ) : (
            <>
              <Table bordered size='sm' responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, idx) => (
                    <tr key={product._id}>
                      <td className='fw-bold'>&nbsp;{idx + 1}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{product.name}&nbsp;</td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{product.category.replace(/and/g, " and ")}&nbsp;</td>
                      <td>&nbsp;{product.price}&nbsp;</td>
                      <td>
                        <Link to={`/dashboard/update-product/${product._id}`}>
                          <FontAwesomeIcon icon={faPencilAlt} className={styles.delete__icon} />
                        </Link>
                      </td>
                      <td>
                        <span onClick={() => deleteProductHandler(product._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} className={styles.delete__icon} />
                        </span>
                      </td>
                      <td style={{whiteSpace:"nowrap"}}>&nbsp;{product.createdAt.slice(0,10)}&nbsp;</td>
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

export default ManageProducts;
