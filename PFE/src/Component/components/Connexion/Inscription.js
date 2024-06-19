import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVilles } from '../../Slices/villeSlice';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Inscription = () => {

    const [nom, setNom] = useState('');
    const [genre, setGenre] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [motpasse, setMotpasse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [ville, setVille] = useState('');
    const { villes, isLoading, isError } = useSelector(state => state.ville);
    const Navigate=useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVilles());
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/client', {
                'nom': nom,
                'genre': genre,
                'age': age,
                'email': email,
                'motpasse': motpasse,
                'telephone': telephone,
                'id_ville': ville,
            });
            // console.log(response.data);
            Navigate('/login')
            setNom('');
            setGenre('');
            setAge('');
            setEmail('');
            setMotpasse('');
            setTelephone('');
            setVille('');

        } catch (error) {
            console.error('Erreur lors de l\'ajout des données:', error);
        }
    };
    if (isLoading) {
        return (
            <div>
                ...loding
            </div>
        );
    }

    if (isError) {
        return <div>Error: {isError}</div>;
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-md shadow-xl shadow-cyan-800 w-2/4">
                <h1 className="text-3xl font-semibold mb-10 text-center text-slate-600">Bienvenue</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-600 mb-1">Votre nom</label>
                            <input type="text" id="nom" name="nom" placeholder='Nom Complet' className=" shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div className="w-1/2 ">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                            <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} className="text-gray-400 shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="flex space-x-4 ">
                        <div className="w-1/2  ">
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-600 mb-1">Téléphone</label>
                            <input type="tel" id="telephone" name="telephone" placeholder='Téléphone' value={telephone} onChange={(e) => setTelephone(e.target.value)} className=" shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
                            <select id="ville" name="ville" value={ville} onChange={(e) => setVille(e.target.value)} className="text-gray-400 shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500">
                                <option disabled selected hidden>Choisir une Ville</option>
                                {villes.map((ville, index) => (
                                    <option key={index} value={ville.id}>{ville.nom}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-4 ">
                        <div className="w-1/2 ">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                            <input type="email" id="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className=" shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className=" w-1/2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Mot de passe</label>
                            <input type="password" id="password" name="password" placeholder='Mot De Passe' value={motpasse} onChange={(e) => setMotpasse(e.target.value)} className=" shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Genre</label>
                        <div className="flex items-center">
                            <input type="radio" id="femme" name="genre" value="Femme" checked={genre === "Femme"} onChange={(e) => setGenre(e.target.value)} className="mr-1" />
                            <label htmlFor="femme" className="mr-3">Femme</label>

                            <input type="radio" id="homme" name="genre" value="Homme" checked={genre === "Homme"} onChange={(e) => setGenre(e.target.value)} className="mr-1" />
                            <label htmlFor="homme">Homme</label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <button className="w-full bg-cyan-700 text-white py-2 px-4 rounded hover:bg-cyan-600 transition duration-300">Inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Inscription;
