import React, { useEffect } from 'react';
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
import Banner from '../Banner/Banner';
import OurFounders from '../OurFounders/OurFounders';
import WelcomeText from '../WelcomeText/WelcomeText';

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us | Basket Bistro';
  }, []);

  return (
    <>
      <Banner />
      <WelcomeText />
      {/* <OurFounders /> */}
      <DailyNeeds />
    </>
  );
};

export default AboutUs;
