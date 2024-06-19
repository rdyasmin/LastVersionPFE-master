import { Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import DetailAnnonce from '../../Component/components/DetailsAnnonce/DetailAnnonce';
import Acceuil from '../../Component/components/Acceuil/Acceuil';
import Inscription from '../../Component/components/Connexion/Inscription';
import Annonces from '../../Component/components/Annonces/Annonces';
import Favoris from '../../Component/components/Favoris/Favoris';
import Message from '../../Component/components/Message/Message';
import Login from '../../Component/components/Connexion/Login';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Annonces" element={<Inventory />}></Route>
      <Route path="/Clients" element={<Customers />}></Route>
      <Route path="/" element={<Acceuil/>} />
        <Route path="/inscrire" element={<Inscription/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/details/:id"  element={<DetailAnnonce/>}/>
        <Route path="/proprietes"  element={<Annonces/>}/>
        <Route path="/favoris"  element={<Favoris/>}/>
        <Route path="/message"  element={<Message/>}/>
    </Routes>
  );
}
export default AppRoutes;
