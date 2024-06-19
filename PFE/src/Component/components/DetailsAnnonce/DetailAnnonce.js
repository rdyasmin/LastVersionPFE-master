import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './icon.css';
import { useDispatch, useSelector } from 'react-redux';
import ListAnnonce from '../Cards/ListAnnonce';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaHeart } from 'react-icons/fa';
import { addnewmessage } from '../../Slices/messageSlice';
import { addFavoris, deleteFavoris } from '../../Slices/FavorisSlice';

const DetailAnnonce = () => {
  const { id } = useParams();
  const id_client=localStorage.getItem('id');
  const Dispatch=useDispatch();
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [clients , setClients] = useState([]);
  const [message,setmessage]=useState('');
  const [tel,settel]=useState('');
  const [alert,setalert]=useState('');
  const [favoris,setfavoris]=useState(false);
  const handleCheckboxChange = (e) => {
    setfavoris(e.target.checked); 
    if(favoris === false){
      Dispatch(addFavoris({id_client,id_annonce:id}))
    }
    if(favoris === true){
      Dispatch(deleteFavoris({id_client,id_annonce:id}))
    }
};


  console.log(favoris);



  const handlersendmessage=()=>{
    if(!(tel === "" || message === "")){
      Dispatch(addnewmessage({id_client,id_annonce:id,message,tel}));
      setalert('message send success');
    }else{
      setalert('entrer tout les champ obligatoire')
    }
   
  }

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/annonce');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des annonces');
        }
        const data = await response.json();
        setAnnonces(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  const annonce = annonces.find(a => a.id === parseInt(id));
  // console.log(annonce);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/image/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
      }
    };

    fetchImages();
  }, [id]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categorie');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);
  const annonceImages = images.filter(img => img.id_annonce === id);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/client/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des clients');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    };

    fetchClients();
  }, [id]);

  const client = Array.isArray(clients) ? clients.find(client => client.id === annonce.id_client) : null;


  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSelectedImageIndex(next)
  };

  return (
    <div >
      <Header />
      <div className="container mx-auto p-8">
        <div className="lg:flex bg-white rounded-lg shadow-md overflow-hidden mb-8 lg:mb-0 ">

          <div className="lg:w-1/2">
            <Slider {...settings}>
        {/* {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Image ${index + 1}`}
            className="w-full h-96 mb-4 rounded-2xl rounded-t-xl m"
          />
        ))} */}
      </Slider>

            <div className="flex items-center mt-5 ml-3 justify-center">
              <img src='/images/home_263115.png' alt="logo" className="w-6 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-4 ">{annonce ? annonce.titre : ''}</h2>
            </div>
            <div className="heart-container" title="Ajouter a Favoris">
            <input
                type="checkbox"
                className="checkbox"
                id="Give-It-An-Id"
                onChange={handleCheckboxChange}
                checked={favoris} 
            />     
             <div className="svg-container">
        <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
        </svg>
        <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
        </svg>
        <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="10,10 20,20" />
          <polygon points="10,50 20,50" />
          <polygon points="20,80 30,70" />
          <polygon points="90,10 80,20" />
          <polygon points="90,50 80,50" />
          <polygon points="80,80 70,70" />
        </svg>
      </div>
    </div> 
            <p className="text-gray-700 mb-4 text-center">{annonce ? annonce.description : ''}</p>
          </div>
          <div className="lg:w-1/2 lg:pl-8">
            <div className="max-w-full  bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="p-6">
                <div className="flex items-center pl-3 mr-8">
                  <>
                    <img src='/images/businessman_6997519.png' alt="logo" className="w-7" />
                    <span className="inline-block px-2 py-1 text-base font-medium text-gray-950 mr-2 ">{client && client.nom}</span>
                  </>

                  <span className="inline-block font-normal text-gray-400 mb-2 mt-2 ml-auto">{annonce ? annonce.statut : ''}</span>
                </div>
                <div className="flex items-center mb-4 mt-12 ">
                  <div className="flex items-center  pl-3 mr-14">
                    <img src='/images/screen_6675255.png' alt="logo" className="w-7" />
                    <span className="inline-block px-2 py-1 text-lg font-medium text-gray-700 mr-2 ">Categorie :{annonce ? categories.find(cat => cat.id === annonce.id_categorie)?.nom : ''}</span>
                  </div>
                  <div className="flex items-center   ">
                    <img src='/images/file_13056167.png ' alt="logo" className="w-7 " />
                    <span className="inline-block px-2 py-1 text-lg font-medium text-gray-700 mr-2">Type : {annonce ? annonce.typeAnnonce : ''} </span>
                  </div>
                </div>
                <div className="flex items-center mb-4  ">
                  <div className="flex items-center  pl-2 mr-28">
                    <img src='/images/surface_12702004.png' alt="logo" className="w-7" />
                    <span className="inline-block px-2 py-1 text-lg font-medium text-gray-700 mr-2 ">Surface : {annonce ? annonce.surface : ''} m²</span>
                  </div>
                  <div className="flex items-center  pl-9 ">
                    <img src='/images/stairs_1889028.png' alt="logo" className="w-6" />
                    <span className="inline-block px-2 py-1 text-lg font-medium text-gray-700 mr-2"> Etage : {annonce ? annonce.etage : ''} </span>
                  </div>
                </div>
                <div className="flex items-center mb-4  ">
                  <div className="flex items-center  pl-2 mr-32">
                    <img src='/images/bedroom_2642268.png' alt="logo" className="w-7" />
                    <span className="inline-block px-2 py-1 text-lg font-medium text-gray-700 mr-2 ">Chambres : {annonce ? annonce.nombres_chambres : ''}</span>
                  </div>
                  <div className="flex items-center  pl-9 ">
                    <img src='/images/bathtub_259973.png' alt="logo" className="w-6" />
                    <span className="inline-block px-2 py-1 text-lg font-medium text-gray-700 mr-2"> Toillettes : 3 </span>
                  </div>
                </div>
                <div className="flex items-center ml-2 ">
                  <img src='/images/placeholder_684908.png' alt="logo" className="w-4 mr-2" />
                  <span className="inline-block font-medium text-blue-700  mb-2 mt-2">{annonce ? annonce.adresse : ''} </span>
                </div>
                <span className="inline-block font-medium text-gray-500  mb- mt- ml-8">{annonce ? annonce.secteur.nom : ''}</span>
                <div className="flex justify-between items-center">
                  <p className="flex justify-between items-center text-lg font-semibold w-full h-14 mt-4 shadow-lg border">
                    <span className=" text-cyan-800 px-4">{annonce ? annonce.prix : ''}</span>
                    <span className="border h-14  bg-stone-200 px-4 pt-3 text-cyan-800">DH</span>
                  </p>
                </div>
       
              </div>
              <div className="flex items-center justify-between mb-4 ml-3 mt-3">
                <div>
                  <button type="button" className="btn bg-cyan-600 hover:bg-cyan-700 text-white font-bold  ml-4 py-3 px-52 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Message
                  </button>
            
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Nouveau Message</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            {alert ? <p>{alert}</p>:""}
                            <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">Numero Telephone:</label>
                              <input type="text" className="form-control" id="recipient-name" onChange={(e)=>settel(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="message-text" className="col-form-label">Message:</label>
                              <textarea className="form-control" id="message-text" onChange={(e)=>setmessage(e.target.value)}></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button
                           type="button" 
                           className="btn bg-cyan-600 hover:bg-cyan-700 text-white"
                           onClick={handlersendmessage}
                          >Send message</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FaHeart className="w-10 mr-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ListAnnonce /> */}
      <Footer />
    </div>
  );
};

export default DetailAnnonce;
