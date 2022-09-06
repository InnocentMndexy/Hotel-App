import React from 'react';
import "./home.css";
import Featured from '../../components/featured/featured';
import FeaturedProperties from '../../components/featuredProperties/featuredProperties';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import MailList from '../../components/mailList/mailList';
import Navbar from '../../components/navbar/navbar';
import PropertyList from '../../components/propertyList/propertyList';
// import Hotel from '../hotel/hotel';
// import Register from '../../components/signup/signup';

// import SearchItem from '../../components/searchItem/searchItem';



const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">   
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;