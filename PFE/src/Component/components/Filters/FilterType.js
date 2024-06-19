import React from 'react';
import { useSelector } from 'react-redux';

export default function FilterType({ setshowType }) {
  const types = useSelector(state => state.type.types);

  const handleTypeChange = (e) => {
    const selectedValue = e.target.value;
    setshowType(selectedValue);
  };

  return (
    <div className="flex items-center border bg-white lg:backdrop-blur rounded-lg border-gray-300 shadow-lg px-5 py-2">
      <div className="mr-2 flex items-center">
        <img src="/images/real-estate_951787.png" alt="Logo" className="h-11 w-11 mr-2" />
        <div>
          <h2 className="text-lg font-semibold">Type</h2>
          <select
            className="py-2 outline-none text-gray-600"
            onChange={handleTypeChange} // Attach onChange event to select element
          >
            <option disabled selected hidden>Choisir un Type</option>
            {types.map((type, index) => (
              <option key={index} value={type.nom}>
                {type.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
