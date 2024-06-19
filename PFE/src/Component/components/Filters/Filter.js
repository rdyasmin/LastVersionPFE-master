import React, { useEffect, useState } from 'react';
import FilterCategorie from './FilterCategorie';
import FilterType from './FilterType';
import FilterVille from './FilterVille';
import FilterSecteur from './FilterSecteur';
import { filterAnnonces } from '../../Slices/annonceSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Filter({setdata}) {
  const [showville,setshowville]=useState('');
  const [showsecteur,setshowsecteur]=useState(null);
  const [showCategorie,setshowCategorie]=useState(null);
  const [showType,setshowType]=useState(null);
  const Dispatch=useDispatch()
  
  const data=useSelector((state)=>state.annonce.annonces);
  setdata(data)

  useEffect(() => {
    Dispatch(filterAnnonces({ id_categorie: showCategorie, id_secteur: showsecteur, statut: showType }));
  }, [Dispatch, showCategorie, showsecteur, showType]);
  // console.log(data);

  
  
  return (
    <div className="px-6 py-6 max-w-7xl mt-3 mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-lg bg-white  lg:backdrop-blur rounded-lg">
      <FilterCategorie setshowCategorie={setshowCategorie}/>
      <FilterType setshowType={setshowType} />
      <FilterVille  setshowville={setshowville} />
      <FilterSecteur showville={showville} setshowsecteur={setshowsecteur}/>
      {/* <button 
      className="bg-neutral-100  border lg:backdrop-blur  border-gray-300 shadow-lg hover:bg-neutral-300 transition w-full lg:max-w-[162px] max-h-[84px] rounded-lg flex justify-center items-center text-white text-lg"
      
      >
        <img src='/images/magnifying-glass_4814875.png' alt='#' className='w-9 '/>
      <h2 className="text-sm font-semibold  text-gray-700">Rechercher</h2>
      </button> */}
    </div>
  );
}
