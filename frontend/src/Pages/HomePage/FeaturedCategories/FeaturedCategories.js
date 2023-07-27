import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import apple from '../../../assets/images/categories/apple.webp';
import baby from '../../../assets/images/categories/baby.webp';
import beauty from '../../../assets/images/categories/beauty.webp';
import breakfast from '../../../assets/images/categories/Breakfast.webp';
import fruits from '../../../assets/images/categories/cabbage.webp';
import fish from '../../../assets/images/categories/carp-fish.webp';
import cat from '../../../assets/images/categories/cat.webp';
import chili from '../../../assets/images/categories/chili-sauce.webp';
import chips from '../../../assets/images/categories/chips.webp';
import cleaner from '../../../assets/images/categories/cleaner.webp';
import cookie from '../../../assets/images/categories/cookie.webp';
import cooking from '../../../assets/images/categories/Cooking.webp';
import dumbbell from '../../../assets/images/categories/dumbbell.webp';
import honey from '../../../assets/images/categories/honey.webp';
import milk from '../../../assets/images/categories/milk.webp';
import shrimp from '../../../assets/images/categories/shrimp.webp';
import drink from '../../../assets/images/categories/soft-drink.webp';
import jam from '../../../assets/images/categories/strawberry-jam.webp';
import CategoryCard from '../CategoryCard/CategoryCard';
import { useNavigate } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

const FeaturedCategories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 1,
      name: 'Chicken & Meat',
      linkName: 'ChickenandMeat',
      images: fish,
    },
    {
      id: 2,
      name: 'Fruits & Vegetable',
      linkName: 'FruitsandVegetable',
      images: fruits,
    },
    {
      id: 3,
      name: 'Milk & Dairy',
      linkName: 'MilkandDairy',
      images: milk,
    },
    {
      id: 4,
      name: 'Grocery',
      linkName: 'Grocery',
      images: honey,
    },
    {
      id: 5,
      name: 'Soup & Detergents',
      linkName: 'SoupandDetergents',
      images: cleaner,
    },
    {
      id: 6,
      name: 'Baby Care & Beauty',
      linkName: 'BabyCareandBeauty',
      images: baby,
    },
    {
      id: 7,
      name: 'Pharmacy',
      linkName: 'Pharmacy',
      images: dumbbell,
    },
  ];

  return (
    <section id={styles.categories}>
      <Container>
        <h3>Featured Categories</h3>
        <p>Choose your necessary products from this feature categories.</p>
        <Row className='mt-3 pb-4 g-4'>
          {
            // map category data
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          }
          <Col lg={2} md={3} sm={4} xs={6}>
            <div className={styles.card}  onClick={() => navigate('/addcustomlist')}>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <h6>Add Your Custom List</h6>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedCategories;
