import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnonceCard({ annonce, categories, images }) {
  const { id, titre, description, prix, surface, id_categorie, adresse, statut } = annonce;
  const categorieDetails = categories.find(cat => cat.id === id_categorie);
  const categorieNom = categorieDetails ? categorieDetails.nom : "";
  // Modification ici pour récupérer les images correctement
  const annonceImages = images.filter(img => img.id_annonce === id);
 
  return (
    <div className="bg-slate-50 shadow-lg rounded-lg ml-20 rounded-tl-[98px] w-full mx-auto my-7 max-w-[298px] max-h-[530px] cursor-pointer hover:shadow-3xl transition relative transform hover:scale-105 hover:bg-gradient-to-r from-slate-200 to-blue-50 overflow-visible hover:shadow-blue-300">
      {/* Modification ici pour afficher les images correctement */}
      {annonceImages.length > 0 && (
        <img src={annonceImages[0].src} alt={titre} className="w-full rounded-ss-lg rounded-t-lg h-44 object-cover" />
      )}
     
      <div className="px-6 pt-4">
        <div className="flex items-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{categorieNom}</span>
          <div className="flex items-center bg-gray-200 rounded-full pl-3">
            <img src='/images/surface_12702004.png' alt="logo" className="w-6" />
            <span className="inline-block px-2 py-1 text-xs font-medium text-gray-700 mr-2 bg-gray-200 rounded-full">{surface}</span>
          </div>
        </div>
        <div className="flex items-center">
            <img src='/images/placeholder_684908.png' alt="logo" className="w-4 mr-2" />
            <span className="inline-block font-medium text-blue-700 text-lg mb-2 mt-3">{adresse}</span>
        </div>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
      <div className="px-6 pt-2">
        <div className="flex items-center">
          <span className="inline-block py-1 text-base font-semibold text-orange-500 mr-1">{prix}</span>
          <span className="inline-block px-2 py-1 text-base font-semibold text-orange-500">DH</span>
          <div className="flex items-center">
            <Link to={`/details/${id}`}>
              <img src='/images/arrow_5948629.png' alt="logo" className="w-6 ml-44" />
            </Link>
          </div>
        </div>
      </div>
      {statut === 'Disponible' ? 
      <div className="flex items-center bg-blue-100 rounded h-12 pl-28 mt-3">
        <img src='/images/fire_2985511.png' alt="logo" className="w-6" />
        <span className="px-2 py-1 text-normal font-medium text-gray-950 mr-2 rounded-full">{statut}</span>
      </div>
      : 
      <div className="flex items-center bg-green-200 rounded h-12 pl-28 mt-3">
        <img src='/images/fire_2985511.png' alt="logo" className="w-6 text-white" />
        <span className="px-2 py-1 text-normal font-medium text-gray-950 mr-2 rounded-full">{statut}</span>
      </div>}
    </div>
  );
}
