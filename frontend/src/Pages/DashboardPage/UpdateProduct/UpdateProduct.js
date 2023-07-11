import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    updateProduct,
    getAdminProduct,
    getProductDetails,
  } from "../../../actions/productAction";
import swal from 'sweetalert';
import category from '../../../assets/images/icons/category.svg';
import price from '../../../assets/images/icons/price.svg';
import productIcon from '../../../assets/images/icons/product.svg';
import upload from '../../../assets/images/upload.png';
import headerLogo from '../../../assets/images/headerLogo.svg';
//import { postProductAsync } from '../../../redux/feathers/productsSlice';
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import styles from './UpdateProduct.module.css';

const UpdateProduct = () => {
  const [data, setData] = useState({});
  //const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const match = useMatch('/dashboard/update-product/:id');

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [cat, setCat] = useState("");
  const [description, setDescription] = useState("This is an Amazing Product");
  const [Stock, setStock] = useState(10);
  const [productImg, setProductImg] = useState();
  const [oldImages, setOldImages] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const MAX_IMAGE_SIZE = 0.5 * 1024 * 1024;

  const categories = [
    "Fruits & Vegetable",
    "Fish & Meat",
    "Milk & Dairy",
    "Pharmacy",
    "Grocery",
    "Soup & Detergents",
    "Baby Care & Beauty",
  ];

  const productId = match.params.id;

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file.size > MAX_IMAGE_SIZE) {
        // Compress the image
        compressImage(file);
      } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImg(reader.result);
        }
      };      
    
      reader.readAsDataURL(e.target.files[0]);
      }
    }

  const compressImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Set the canvas dimensions to the compressed image size
        const MAX_WIDTH = 256; // Maximum width of the compressed image
        const MAX_HEIGHT = 256; // Maximum height of the compressed image
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        // Compress the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert the compressed image to base64 string
        const compressedDataUrl = canvas.toDataURL(file.type);
        setProductImg(compressedDataUrl);
      };
  
      img.src = event.target.result;
    };
  
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setRate(product.price);
      setCat(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      //setProductImg(product.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/dashboard/manage-products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    productId,
    product,
    updateError,
  ]);


  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", rate);
    myForm.set("description", description);
    myForm.set("category", cat);
    myForm.set("Stock", Stock);
    
    if (productImg) {
      myForm.set("images", productImg);
    }

    dispatch(updateProduct(productId, myForm));
    dispatch(getProductDetails(productId));

  };



  return (
    <section id={styles.add__product}>
      <h3>Update Product</h3>
      <form 
        //encType="multipart/form-data"
        onSubmit={updateProductSubmitHandler}
      >
        <span className={styles.inputs}>
          <input type='text' placeholder='Product Name' id='pdName' onBlur={handelBlur}  autoComplete='off' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor='pdName'>
            <img src={productIcon} alt='product' />
          </label>
        </span>

        <span className={styles.inputs}>
          <input type='number' placeholder='Product Price' id='pdPrice' onBlur={handelBlur} autoComplete='off' name='price' value={rate} onChange={(e) => setRate(e.target.value)} />
          <label htmlFor='pdPrice'>
            <img src={price} alt='price' />
          </label>
        </span>

        <span className={styles.inputs}>
          {/* <input type='text' placeholder='Product Category' id='pdCategory' onBlur={handelBlur} autoComplete='off' name='category' /> */}
          <select onChange={(e) => setCat(e.target.value)}>
            <option value="">Change Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
          </select>
          <label htmlFor='pdCategory'>
            <img src={category} alt='category' />
          </label>
        </span>

        <span className={styles.upload__btn__wrapper}>
          <label htmlFor='pdImage'>
            <img src={upload} alt='upload' />
          </label>
          <input 
            type='file' 
            name='image' 
            id='pdImage' 
            accept="image/*"
            onChange={handleImageUpload}
          />
        </span>

        <span className={styles.btn__wrapper}>
          <button type='submit' >Update Product</button>
        </span>
      </form>
    </section>
  );
};

export default UpdateProduct;
