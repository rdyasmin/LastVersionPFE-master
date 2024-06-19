import { configureStore } from "@reduxjs/toolkit";
import villeSlice from "../src/Component/Slices/villeSlice";
import typeSlice from "../src/Component/Slices/typeSlice";
import categorieSlice from "../src/Component/Slices/categorieSlice";
import annonceSlice from "../src/Component/Slices/annonceSlice";
import userSlice from "../src/Component/Slices/userSlice";
import secteurSlice from "../src/Component/Slices/secteurSlice";
import AuthSlice from "./Component/Slices/AuthSlice";
import messageSlice from "./Component/Slices/messageSlice";
import FavorisSlice from "./Component/Slices/FavorisSlice";

const store = configureStore({
    reducer:{
        ville : villeSlice,
        type : typeSlice,
        categorie : categorieSlice,
        annonce: annonceSlice ,
        user : userSlice,
        secteur : secteurSlice,
        auth:AuthSlice,
        message:messageSlice,
        favoris:FavorisSlice
    }
})
export default store;