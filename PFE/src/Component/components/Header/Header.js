import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../../Slices/userSlice';

const Header = () => {
  const id_client = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (token) {
      dispatch(getUserById(id_client));
    }
  }, [dispatch, id_client]);
  console.log(user);
  const Navigate=useNavigate()
  const handlerdeconecter=()=>{
    localStorage.removeItem('id')
    localStorage.removeItem('token') 
    Navigate('/')
  }

  return (
    <div className="bg-slate-200 shadow-md">
      <div className="container mx-auto py-4 flex items-center justify-between">
        {/* <a href="#" className="text-gray-900 font-normal tracking-widest text-xl uppercase sm:text-2xl">
          REAL ESTATE
        </a> */}
         <img src='/images/House_Talk_Logo_Template-removebg-preview.png' alt="logo" className="w-32" />
        <div className="lg:hidden">
          <FaBars className="text-gray-700 text-3xl cursor-pointer" />
        </div>
        {token ? (
          <div className="flex items-center gap-4">
            <div className="dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {user && user.nom}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item hover:bg-zinc-200" href="#">Profile</a></li>
                <li><a className="dropdown-item hover:bg-zinc-200" href="#">Message</a></li>
                <li><Link to="/proprietes" className="dropdown-item hover:bg-zinc-200">Proprietes</Link></li>
                <li><Link to="/ajouter-propriete" className="dropdown-item hover:bg-zinc-200">Ajouter Propriete</Link></li>
                <li><a className="dropdown-item hover:bg-zinc-200" href="#"><button onClick={handlerdeconecter}>Deconnexion</button></a></li>
              </ul>
            </div>
            <Link to={`/proprietes`} className="block mb-2">propriete</Link>
            <button onClick={handlerdeconecter}>Deconnexion</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to='/login'>
              <a className="hidden lg:inline-block py-2 text-slate-800 font-semibold rounded-md">
                Se Connecter
              </a>
            </Link>
            <Link to='/inscrire'>
              <a href="#" className="hidden lg:inline-block px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500">
                S'inscrire
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
