import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { getUserById ,editpassword } from '../../Slices/userSlice';

const Profile = () => {
    const id=localStorage.getItem(`id`);
    const token=localStorage.getItem(`token`);
    const Navigate=useNavigate()
    const {user ,loading , error , messages}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    console.log(user);
    if(!token){
        Navigate.push('/login')
    }
    const [tel,setel]=useState(``);
    const [oldpswd,setoldpswd]=useState(``);
    const [pswd,setpswd]=useState(``);
    const [alert , setalert]=useState(``);

    useEffect(() => {
        if (token) {
          dispatch(getUserById(id));

        }
      }, [dispatch, id]);
      console.log(user);
      const HandlerChangePassword=(e)=>{
        e.preventDefault();
        if(tel.trim().length > 0 && oldpswd.trim().length >0 && pswd.trim().length > 0){
            dispatch(editpassword({
                userId:id,
                oldmotpasse:oldpswd,
                motpasse:pswd,
                telephone:tel
            }))
            setalert('Edit password and phone number successfully');
        } else{
            setalert(`please enter tout les champ`)
        }
      }

    return (
        <div>
            <div className="flex flex-col gap-4 ">
                <div className="flex flex-col border ml-8 mr-4 px-10 py-6 h-[600px] gap-4 lg:gap-x-3 relative lg:-top-2 lg:shadow-lg bg-white lg:backdrop-blur rounded-lg">
                    <div className="flex flex-col gap-4  ">
                        <div className="flex flex-col  px-10 py-6 h-[100px] gap-4 lg:gap-x-3 relative lg:-top-2 lg:shadow-lg  bg-cyan-700 lg:backdrop-blur rounded-lg">
                            <div className="flex items-center pl-3 mr-8 pb-10">
                                <img src='/images/businessman_6997519.png' alt="logo" className="w-20" />
                                <span className="inline-block font-medium text-xl text-gray-100 mb-2 mt-2 ml-auto">{user.nom}</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 '>
                        {loading ? <p>loding</p> : ""}
                        {error ? <p>{error}</p> : ""}
                        {messages ? <p>{messages}</p> : ''}
                        {alert? <p>{alert}</p> : ''}
                        <div className="flex gap-6 mb-4">
                            <div className="flex flex-col w-1/2">
                                <input type="text" id="name" name="name" className="border shadow-md rounded-lg px-3 py-2" value={user.nom} disabled />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <input type="email" id="email" name="email" className="border shadow-md rounded-lg px-3 py-2" value={user.email} disabled />
                            </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                            <div className="flex flex-col w-1/2">
                                <input type="text" id="name" name="name" className="border shadow-md rounded-lg px-3 py-2" value={user.genre} disabled />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <input type="email" id="email" name="email" className="border shadow-md rounded-lg px-3 py-2" placeholder={user.telephone}
                                onChange={(e)=>setel(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-6 mb-4">
                            <div className="flex flex-col w-1/2">
                                <input type="text" id="name" name="name" className="border shadow-md rounded-lg px-3 py-2" value={user.ville.nom} disabled />

                            </div>
                            <div className="flex flex-col w-1/2">
                                <input type="email" id="email" name="email" className="border shadow-md rounded-lg px-3 py-2" value={user.age} disabled />
                            </div>
                        </div>
                        <div className="flex gap-6 mb-4">
                            <div className="flex flex-col w-1/2">
                                <input type="text" id="name" name="name" className="border shadow-md rounded-lg px-3 py-2" value={user.role} disabled />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <input type="text" id="name" name="name" className="border shadow-md rounded-lg px-3 py-2" value={user.created_at} disabled />
                            </div>
                        </div>
                        <div className="flex gap-6 mb-4">
                            <div className="flex flex-col w-1/2">
                                <input type="email" id="email" name="email" className="border shadow-md rounded-lg px-3 py-2" placeholder='mot de passe accetueil'
                                 onChange={(e)=>setoldpswd(e.target.value)}
                                 />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <input
                                 type="email" 
                                 id="email"
                                  name="email"
                                 className="border shadow-md rounded-lg px-3 py-2" 
                                 placeholder='nouveau mot de passe'
                                 onChange={(e)=>setpswd(e.target.value)} 
                                />

                            </div>
                        </div>
                    </div>
                    <button onClick={HandlerChangePassword} className='btn btn-primary'>Enregistrer</button>
                    <div className='flex justify-end'>
                        {/* <button type="button" className="btn w-72 text-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 m  rounded" data-bs-toggle="modal" 
                        data-bs-target="#exampleModal" 
                        // onClick={HandlerChangePassword}
                        >
                            Enregistrer
                        </button> */}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;
