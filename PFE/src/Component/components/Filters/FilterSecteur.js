import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gesecteurbyid } from '../../Slices/secteurSlice';

export default function SecteurByVille({ showville, setshowsecteur }) {
  const secteurs = useSelector(state => state.secteur.secteurs);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to get secteurs by showville
    dispatch(gesecteurbyid(showville)); 
  }, [dispatch, showville]);

  // Handler function to update showsecteur when an option is selected
  const handlerChangeSecteur = (e) => {
    setshowsecteur(e.target.value);
  }

  return (
    <div className="flex items-center border bg-white lg:backdrop-blur rounded-lg border-gray-300 shadow-lg px-5 py-2">
      <div className="mr-2 flex items-center">
        <img src="/images/three_10097571.png" alt="Logo" className="h-11 w-11 mr-3" />
        <div>
          <h2 className="text-lg font-semibold">Secteurs</h2>
          <select 
            className="py-2 outline-none text-gray-600"
            onChange={handlerChangeSecteur} // Attach handler to onChange event
          >
            {secteurs.length === 0 ? (
              <option disabled defaultValue>Choisir un Secteur</option>
            ) : (
              secteurs.map(secteur => (
                <option key={secteur.id} value={secteur.id}>
                  {secteur.nom}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
