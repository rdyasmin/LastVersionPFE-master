import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Favoris from '../Favoris/Favoris';
import Ajouter_Annonce from '../AjouterAnnonce/Ajouter_Annonce';
import Message from '../Message/Message';
import ListAnnonce from '../Cards/ListAnnonce';

const Annonces = () => {

    const [componentToShow, setComponentToShow] = useState('annonces');

    const handleLinkClick = (component) => {
        setComponentToShow(component);
    };


    const renderComponent = () => {
        switch (componentToShow) {
            case 'annonces':
                return <ListAnnonce />;
            case 'profile':
                return <Profile />;
            case 'ajouterAnnonce':
                return <Ajouter_Annonce />;
            case 'messages':
                return <Message />;
            case 'favoris':
                return <Favoris />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <div className="flex  mt-12  ">
                <div className="flex flex-col gap-4 ">
                    <div className="flex flex-col border ml-8 px-10 py-6 h-[900px] gap-4 lg:gap-x-3 relative lg:-top-2 lg:shadow-lg bg-white lg:backdrop-blur rounded-lg">
                        <div className="p-4">
                            <div>
                                <div className="flex items-center mb-2">
                                    <img src="/images/road_14085346.png" alt="Logo" className="h-8 w-8 mr-2" />
                                    <h3 className="text-lg font-semibold">Tri des annonces</h3>
                                </div>

                                <Link to='/proprietes' className="block mb-2">
                                    <a href="#" className="text-gray-500 hover:text-black duration-200" onClick={() => handleLinkClick('annonces')}>Tous Les Annonces</a>
                                </Link>
                                <Link to='/proprietes' className="block mb-2">
                                    <a href="#" className="text-gray-500 hover:text-black duration-200" onClick={() => handleLinkClick('annonces')}>Mes Annonces Postes</a>
                                </Link>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center mb-2">
                                    <img src="/images/favorite_14085381.png" alt="Logo" className="h-8 w-8 mr-2" />
                                    <h3 className="text-lg font-semibold">Fonctionnalites</h3>
                                </div>
                                <Link to='/proprietes' className="block mb-2">
                                    <a href="#" className="text-gray-500 hover:text-black duration-200" onClick={() => handleLinkClick('profile')}>Profile</a>
                                </Link>
                                <Link to='/proprietes' className="block mb-2">
                                    <a href="#" className="text-gray-500 hover:text-black duration-200" onClick={() => handleLinkClick('ajouterAnnonce')}>Ajouter Annonce</a>
                                </Link>
                                <Link to='/proprietes' className="block mb-2">
                                    <a href="#" className="text-gray-500 hover:text-black duration-200" onClick={() => handleLinkClick('messages')}>Les Messages</a>
                                </Link>
                                <Link to='/proprietes' className="block mb-2">
                                    <a href="#" className="text-gray-500 hover:text-black duration-200" onClick={() => handleLinkClick('favoris')} >Favoris</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow ml-4">
                    {renderComponent()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Annonces;

