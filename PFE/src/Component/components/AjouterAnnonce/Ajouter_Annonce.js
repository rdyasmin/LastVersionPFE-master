import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getVilles } from '../../Slices/villeSlice';
import { getville } from '../../../API';
import { gesecteurbyid } from '../../Slices/secteurSlice';

const Ajouter_Annonce = () => {
  const villes = useSelector(state => state.ville.villes);
  const secteurs = useSelector(state => state.secteur.secteurs);
  // const [villes,setvilles]=useState([]);

  const categories = useSelector(state => state.categorie.categories);
  const types = useSelector(state => state.type.types);
  const [secteur,setsecteur]=useState([]);
  const [step, setStep] = useState(1);
  const [ville, setville] = useState(0);
  const Dispatch=useDispatch();
  const id_client=localStorage.getItem('id');
  const [formData, setFormData] = useState({
      titre: '',
      id_categorie: '',
      etage: '',
      surface: '',
      adresse: '',
      statut: 'Disponible',
      type: '',
      prix: '',
      images: [],
      description: ''
  });
 
  useEffect(()=>{
    Dispatch(getVilles());
  })



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [images, setImages] = useState([]);
      const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...selectedImages]);
        setFormData(prevState => ({
          ...prevState,
          images: [...prevState.images, ...selectedImages]
      }));
      };
      const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      };

      const nextStep = (e) => {
        e.preventDefault();
        console.log(formData);
        setStep(step + 1); 
      };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/annonce', formData);
      console.log(response.data); 
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  const [value, setValue] = useState('');

  const handleChange = (e) => {
      const inputValue1 = e.target.value;
      const numberRegex1 = /^\d*$/;

      if (inputValue1 === '' || numberRegex1.test(inputValue1)) {
          setValue(inputValue1);
      }
      setFormData(prevState => ({
        ...prevState,
        surface: inputValue1 
      }));
  };

  const [value2, setValue2] = useState('');

  const handleChange2 = (e) => {
      const inputValue2 = e.target.value;
      const numberRegex2 = /^\d*$/;

      if (inputValue2 === '' || numberRegex2.test(inputValue2)) {
          setValue2(inputValue2);
      }
      setFormData(prevState => ({
        ...prevState,
        prix: inputValue2 
      }));
  };


  const [selectedValue, setselectedValue] = useState('');
  const [isDesiredCategory, setIsDesiredCategory] = useState(false);
  const handleChange3 = (event) => {
      setselectedValue(event.target.value);
      if (event.target.value === "Appartements" || event.target.value === "Maisons" || event.target.value === "Villas") {
          setIsDesiredCategory(true);
      } else {
          setIsDesiredCategory(false);
      }
      setFormData(prevState => ({
        ...prevState,
        id_categorie: selectedValue 
      }));
  };

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
      setFormData(prevState => ({
        ...prevState,
        adresse: value
      }));
  };
  useEffect(()=>{
    Dispatch(gesecteurbyid(selectedCity));
  },[selectedCity])





  const renderStep = () => {
      switch (step) {

          case 1:
              return (
                
                  <div className="container card-0 justify-content-center">
                      <div className="card-body px-sm-4 px-0">
                          <div className="row justify-content-center mb-5">
                              <div className="col-md-10 col">
                                  <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Ajouter l'Annonce : </h3>
                                  <p className="mt-md-4  ml-md-0 ml-2 text-center text-sm-left"> Entrust with heigh professionalism we are offering pixel perfect web and mobile application development third party integration and solution to our.</p>
                              </div>
                          </div>
                          
                          <div className="row justify-content-center round">
                              <div className="col-lg-10 col-md-12">
                                  <div className="card shadow-lg card-1">
                                      <div className="card-body inner-card">
                                          <div className="row justify-content-center">
                                              <div className="col-lg-5 col-md-6 col-sm-12">
                                              <div className="form-group"><label htmlFor="titre">Titre</label><input type="text" className="form-control" name='titre' id="titre" onChange={handleInputChange} placeholder="Titre..." />
                                              </div>
                                              <div>
                                                   <div className="form-group">
                                                       <label htmlFor="Catégorie">Catégorie</label>
                                                       <select className="form-control" name='categorie' value={selectedValue} onChange={handleChange3}>
                                                           <option disabled selected hidden>Choisir une Catégorie</option>
                                                           {categories.map((categorie, index) => (
                                                           <option key={index} value={categorie.nom}>{categorie.nom}</option>
                                                      ))}
                                                  </select>
                                                  </div>
                                              </div>

                                          {isDesiredCategory && <div className="form-group"> <label htmlFor="etage">Etage</label> <input type="number" className="form-control" id="etage" name='etage' onChange={handleInputChange} placeholder="" /> </div> }
                                          
                                          
                                          
                                      </div>
                                      
                                      <br/>
                                      <div className="col-lg-5 col-md-6 col-sm-12">

                                          <div className="form-group"> <label htmlFor="adresse">Adresse</label>                    
                                          <select className="form-control" value={selectedCity} name='adresse' onChange={handleCityChange}>
                                              <option disabled selected hidden>Choisir une Ville</option>
                                              {
                                                  villes.map((ville,index)=>{
                                                      
                                                  return(
                                                      <option key={index} value={ville.id}>{ville.nom}</option>
                                                  ) 
                                                  })
                                              }

                                          </select> 
                                          </div>
                                          { selectedCity && <div className="form-group">
                                              <label htmlFor="secteur">Secteur</label>
                                              <select className="form-control" id="secteur" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
                                                  {secteurs.map((secteur, index) => (
                                                      <option key={index} value={secteur.id}>
                                                          {secteur.nom}
                                                      </option>
                                                  ))}
                                              </select>
                                          </div>
                                          }
                                          <div className="form-group" style={{ position: 'relative' }}>
                                              <label htmlFor="surface">Surface</label>
                                              <input id="postfix" value={value} type="text" class="form-control" onChange={handleChange} />
                                              <span style={{ position: 'absolute', right: 10, top: '70%', transform: 'translateY(-50%)' }}>m²</span>
                                          </div>
                                          </div>
                                          </div>
                                          <div className="row justify-content-center">
                                              <div className="col-md-12 col-lg-10 col-12">
                                                  <div className="row justify-content-end mb-5">
                                                      <div className="col-lg-4 col-auto ">
                                                          <button type="submit" className="btn btn-primary btn-block" onClick={nextStep} >
                                                              <small className="font-weight-bold">Next</small>
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              );


          case 2:
              return (
                
                  <div className="container card-0 justify-content-center">
                  <div className="card-body px-sm-4 px-0">
                      <div className="row justify-content-center mb-5">
                          <div className="col-md-10 col">
                              <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Ajouter l'Annonce : </h3>
                              <p className="mt-md-4  ml-md-0 ml-2 text-center text-sm-left"> Entrust with heigh professionalism we are offering pixel perfect web and mobile application development third party integration and solution to our.</p>
                          </div>
                      </div> 
                      <div className="row justify-content-center round">
                          <div className="col-lg-10 col-md-12">
                              <div className="card shadow-lg card-1">
                                  <div className="card-body inner-card">
                                      <div className="row justify-content-center">
                                          
                                      <div className="col-lg-12 col-md-12 col-sm-12">
                                          <div className="form-group"> <label htmlFor="type">Type</label>                    
                                              <select className="form-control"  name='type' onChange={handleInputChange}>
                                                  <option disabled selected hidden >Choisir un Type</option>
                                                  {
                                                  types.map((type, index) => {
                                                      return (<option key={index} name='type' value={type.id} onChange={handleInputChange}>{type.nom}</option>)
                                                  })
                                                  }
                                              </select> 
                                          </div>
                                      </div>
                                              <div>

                                              <div className="form-group"> <label htmlFor="statut">Statut</label>  
                                                  <input type="text" className="form-control" id="statut" value="Disponible" disabled/> 
                                              </div>
                                          </div>

                                          <div className="col-lg-12 col-md-12 col-sm-12">
                                          <div className="form-group" style={{ position: 'relative' }}>
                                              <label htmlFor="prix">Prix</label>
                                              <input id="postfix" value={value2} type="text" class="form-control" onChange={handleChange2} />
                                              <span style={{ position: 'absolute', right: 10, top: '70%', transform: 'translateY(-50%)' }}>DH</span>
                                          </div>

                                      </div>

                                      
                                      

                                  </div>
                                  
                                  <br/>
                                  <div className="col-lg-5 col-md-6 col-sm-12">


                                      </div>
                                      </div>
                                      <div className="row justify-content-center">
                                          <div className="col-md-12 col-lg-10 col-12">
                                              <div className="row justify-content-end mb-5">
                                                  <div className="col-lg-4 col-auto " style={{display: 'flex'}}>
                                                      <button type="submit" className="btn btn-primary btn-block" onClick={nextStep}>
                                                          <small className="font-weight-bold">Next</small>
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  




              );
          case 3:
              return (
                  




                
                  <div className="container card-0 justify-content-center">
                  <div className="card-body px-sm-4 px-0">
                      <div className="row justify-content-center mb-5">
                          <div className="col-md-10 col">
                              <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Ajouter l'Annonce : </h3>
                              <p className="mt-md-4  ml-md-0 ml-2 text-center text-sm-left"> Entrust with heigh professionalism we are offering pixel perfect web and mobile application development third party integration and solution to our.</p>
                          </div>
                      </div>
                      <div className="row justify-content-center round">
                          <div className="col-lg-10 col-md-12">
                              <div className="card shadow-lg card-1">
                                  <div className="card-body inner-card">

                                  <div className="row justify-content-center">
                                      <div className="col-md-12 col-lg-10 col-12">
                                          <label htmlFor="images" className="drop-container" id="dropcontainer">
                                              <span className="drop-title">Drop files here </span> or
                                              <input type="file" id="images" accept="image/*" multiple onChange={handleImageChange} />
                                          </label>
                                          <div>
                                              {images.map((image, index) => (
                                                  <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                                                      <img
                                                          src={URL.createObjectURL(image)}
                                                          alt={`Image ${index + 1}`}
                                                          style={{ width: '100px', height: '100px' }}
                                                      />
                                                      <button onClick={() => handleImageDelete(index)} className="btn btn-outline-danger">
                                                          <BiTrash />
                                                      </button>
                                                  </div>
                                              ))}   
                                          </div>
                                      </div>
                                  </div>

                                  <br/>

                                  <div className="row justify-content-center">
                                       <div className="col-md-12 col-lg-10 col-12">
                                           <div className="form-group"> 
                                               <label htmlFor="exampleFormControlTextarea2">Description</label> 
                                               <textarea className="form-control rounded-0" name='description' onChange={handleInputChange} id="exampleFormControlTextarea2" rows="5"></textarea>
                                           </div>

                                       </div>
                                   </div>


                                  <div className="col-lg-5 col-md-6 col-sm-12">


                                      </div>
                                      </div>
                                      <div className="row justify-content-center">
                                          <div className="col-md-12 col-lg-10 col-12">
                                              <div className="row justify-content-end mb-5">
                                                  <div className="col-lg-4 col-auto " style={{display: 'flex'}}>
                                                      <button type="submit" className="btn btn-primary btn-block"  onClick={handleSubmit}>
                                                          <small className="font-weight-bold" >Next</small>
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  




              );
          default:
              return null;
      }
  };

  return (
      <div>
          {renderStep()}
          
<style>{`
           .drop-container {
               position: relative;
               display: flex;
               gap: 10px;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               height: 200px;
               padding: 20px;
               border-radius: 10px;
               border: 2px dashed #555;
               color: #444;
               cursor: pointer;
               transition: background .2s ease-in-out, border .2s ease-in-out;
             }
            
             .drop-container:hover {
               background: #eee;
               border-color: #111;
             }
            
             .drop-container:hover .drop-title {
               color: #222;
             }
            
             .drop-title {
               color: #444;
               font-size: 20px;
               font-weight: bold;
               text-align: center;
               transition: color .2s ease-in-out;
             }
             #bttn {
              margin-right: 30px;
              
              
          }

                   `}</style> 
      </div>
  );
}

export default Ajouter_Annonce