import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch} from 'react-redux';


const Login = () => {
    const [email, setEmail] = useState('');
    const [motpasse, setmotpasse] = useState('');
    const Navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email: email, motpasse: motpasse }; 
        try {
            let result = await fetch(`http://127.0.0.1:8000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            result = await result.json();
            localStorage.setItem('id', result.id);
            localStorage.setItem('token', result.remember_token);
            if(result.role === "Admin"){
                Navigate('/Dashboard');
            }else{
                Navigate('/');
            }
            console.log(result.remember_token);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="max-w-xl w-full  bg-white  rounded-md p-8  shadow-xl shadow-cyan-800 ">
                <h1 className="text-3xl font-semibold mb-6 text-center text-slate-600">Bienvenue</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Adresse e-mail</label>
                        <input 
                        type="email"
                         id="email" 
                         name="email"
                          placeholder='Email' 
                          className="shadow-md w-full px-3 py-2 rounded  border border-gray-300 focus:outline-none focus:border-blue-500" 
                          onChange={(e)=>setEmail(e.target.value)}
                          />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Mot de passe</label>
                        <input
                         type="password"
                        id="password" 
                        name="password"
                         placeholder='Mot De Passe'
                        className="shadow-md w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" 
                         onChange={(e)=>setmotpasse(e.target.value)}
                            />
                    </div>
                    {/* {error && <div className="text-red-500 mb-4">{error}</div>}
                    {loading && <div className="text-red-500 mb-4">loading ... </div>} */}
                    <div className="mb-6">
                        <button 
                        className="w-full bg-cyan-700 text-white py-2 px-4 rounded hover:bg-cyan-600 transition duration-300"
                        onClick={handleLogin}
                        >Connexion</button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2"><a href="#!" className="hover:text-blue-500">Mot de passe oublié ?</a></p>
                    <p className="text-sm text-gray-600">Pas encore de compte ? <a href="/inscrire" className="text-cyan-700 hover:underline">Inscrivez-vous ici</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
