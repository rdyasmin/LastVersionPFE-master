import React, { useEffect, useState } from 'react';
import { getville } from '../../../API';

export default function FilterVille({ setshowville }) {
  const [villes, setvilles] = useState([]);
  const [selectedVille, setSelectedVille] = useState('');

  const handleSelectChange = (e) => {
    setSelectedVille(e.target.value);
    setshowville(e.target.value);
  };

  useEffect(() => {
    // Fetch cities and update the state with fetched data
    const fetchCities = async () => {
      try {
        const cities = await getville();
        setvilles(cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []); // Empty dependency array to fetch data only once when component mounts

  return (
    <div className="flex items-center border bg-white lg:backdrop-blur rounded-lg border-gray-300 shadow-lg px-5 py-2">
      <div className="mr-2 flex items-center">
        <img src="/images/location_1483336.png" alt="Logo" className="h-11 w-11 mr-2" />
        <div>
          <h2 className="text-lg font-semibold">Villes</h2>
          <select 
            className="py-2 outline-none text-gray-600"
            value={selectedVille}
            onChange={handleSelectChange}
          >
            <option disabled value="">Choisir une Ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>{ville.nom}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
