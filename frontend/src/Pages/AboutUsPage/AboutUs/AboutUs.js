import React, { useEffect } from 'react';
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
import Footer from '../../SharedComponents/Footer/Footer';
import TopNavigation from '../../SharedComponents/TopNavigation/TopNavigation';
import Banner from '../Banner/Banner';
import OurFounders from '../OurFounders/OurFounders';
import WelcomeText from '../WelcomeText/WelcomeText';

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us | Basket Bistro';
  }, []);

  return (
    <>
      {/* <TopNavigation /> */}
      <Banner />
      <WelcomeText />
      {/* <OurFounders /> */}
      <DailyNeeds />
      {/* <Footer /> */}
    </>
  );
};

export default AboutUs;
