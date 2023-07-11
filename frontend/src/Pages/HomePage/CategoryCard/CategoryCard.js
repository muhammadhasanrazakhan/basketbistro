import React from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category: { name, linkName, images } }) => {
  const Navigate = useNavigate();
  return (
    <Col lg={2} md={3} sm={4} xs={6}>
      <div className={styles.card}  onClick={() => Navigate(`/categories/${linkName}`)}>
        <img src={images} alt={name} />
        <h6>{name}</h6>
      </div>
    </Col>
  );
};

export default CategoryCard;
