import React, { useEffect, useState } from 'react';
import { Card, Button , Image} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoris, getFavorisById } from '../../Slices/FavorisSlice';
import { Link } from 'react-router-dom';

const Favoris = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const id_client = localStorage.getItem('id');
    const dispatch=useDispatch();
    const {favoris,loading,error}=useSelector((state)=>state.favoris);

    useEffect(()=>{
        dispatch(getFavorisById(id_client));
    })

    const handlerdelete=(id_client,id_annonce)=>{
        dispatch(deleteFavoris({id_client,id_annonce}));
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = favoris.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {loading ? <p>loading ...</p> : ""}
            {error? <p>{error}</p> : ""}
            {currentItems.map((annonce, index) => (
                <Card
                key={index}
                className="mt-6"
                title={annonce.annonces.titre}
                extra={<Button type="text" icon={<DeleteOutlined />} onClick={() => handlerdelete(annonce.id_client, annonce.id_annonce)} />}
            >
               <Link to={`/details/${annonce.id_annonce}`}>
    <Image src={annonce.annonces.image} alt="Image" className="w-32 h-20 rounded-lg" />
</Link>

                <p>{annonce.annonces.description}</p>
                <span className="text-sm font-semibold text-gray-700 mr-2">{annonce.annonces.status}</span>
            </Card>
            ))}
            <div className="flex justify-center mt-4">
                <ul className="flex">
                    {Array.from({ length: Math.ceil(favoris.length / itemsPerPage) }).map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)} className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Favoris;
