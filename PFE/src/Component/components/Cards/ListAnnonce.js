import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import AnnonceCard from './AnnonceCard';

export default function ListAnnonce({ data }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:8000/api/categorie');
        if (!categoriesResponse.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch images
        const imagesResponse = await fetch('http://localhost:8000/api/image');
        if (!imagesResponse.ok) {
          throw new Error('Erreur lors de la récupération des images');
        }
        const imagesData = await imagesResponse.json();
        setImages(imagesData);

        setLoading(false); // Set loading to false after successful data fetching
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError(error.message);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between mt-8 ">
        <h1 className="text-xl font-extralight ml-20">
          consultez nos nouvelles <br />
          <h2 className="text-2xl font-semibold pt-2 pb-2 text-gray-700"> Propriétés Récemment Répertoriées</h2>
        </h1>
        <Link to="/proprietes" className="text-blue-600 hover:underline mr-20">
          <div className="relative">
            <button className="bg-cyan-700 mt-12 text-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-xl absolute right-1 top-1/2 transform -translate-y-1/2">
              <FaArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-1">
        {data.map(annonce => (
          <AnnonceCard key={annonce.id} annonce={annonce} categories={categories} images={images} />
        ))}
      </div>
    </div>
  );
}
