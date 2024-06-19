import React, { useState } from 'react';
import Header from '../Header/Header';
import Filter from '../Filters/Filter'
import ListAnnonce from '../Cards/ListAnnonce';
import '../Acceuil/style.css'
import About from '../About/About';
import Footer from '../Footer/Footer';
import Propre from '../Propre/Propre';
function Accueil() {
  const [data,setdata]=useState([]);
  console.log(data);
  return (
    <div className="min-h-screen">
      <Header />
      <div className="home ">
      <div className="secContainer container ">
      <div className="homeText text-center mt-20">
     
      <h2 className='text-5xl font-extrabold  text-slate-200 border text-center py-5 rounded-xl px-0 mb-32 relative z-10 backdrop-blur-sm bg-opacity-7'>
        Bienvenue sur votre site immobilier
      </h2>
   
        </div>
      </div>
         </div>
      <Filter setdata={setdata} />
      <ListAnnonce  data={data}/>
      <About />
      <Propre />
      <Footer />
    </div>
  );
}

export default Accueil;
