import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Message.css";
import { deletemessageByid, getmessageById } from '../../Slices/messageSlice';
import { Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';





export default function Message() {
    const id_client=localStorage.getItem(`id`);
    const token=localStorage.getItem(`token`);
    const dispatch=useDispatch();
    const {message}=useSelector((state)=>state.message);
 

    useEffect(()=>{
        dispatch(getmessageById(id_client))
    },[dispatch,id_client,token])
    console.log(message);
   
        // const handleDelete = (id) => {
        //     // e.preventDefault();
        //     dispatch(getmessageById(id_client));   
        // };
    
   
    return (
        <main className="table">
            <section className="table__header">
                <h1>Customer's Messages</h1>
            </section>
            <section className="table__body">
                    {
                        message === null ? <h2>no message reight now</h2> :
                        <table>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th> Nom Client <span className="icon-arrow"></span></th>
                            <th> Annonce <span className="icon-arrow"></span></th>
                            <th> Telephone<span className="icon-arrow"></span></th>
                            <th> Message <span className="icon-arrow"></span></th>
                            <th> Delete <span className="icon-arrow"></span></th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            message.map((el)=>
                            <tr key={el.id}>
                                <td>{el.clients.nom}</td>
                                <td>{el.annonces.titre}</td>
                                <td>{el.clients.telephone}</td>
                                <td>{el.message}</td>
                                <td>
                                    <Popconfirm
                                        title="Are you sure you want to delete this message?"
                                        onConfirm={()=>dispatch(deletemessageByid(el.id))}
                                         okText="Yes"
                                         cancelText="No"
                                    >
                                     <Button type="danger" icon={<DeleteOutlined />}>    
                                     </Button>
                                     </Popconfirm>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                    }

            </section>
        </main>
    );
}