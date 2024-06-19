import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const filterAnnonces = createAsyncThunk(
  'annonces/filterAnnonces',
  async ({ id_categorie, id_secteur, statut }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/filterAnnonce', {
        params: {
          id_categorie,
          id_secteur,
          statut
        }
      });
      return response.data;
    } catch (error) {
      throw Error('Failed to filter announcements');
    }
  }
);

const initialState = {
  annonces: [],
  status: 'idle',
  error: null
};

const annoncesSlice = createSlice({
  name: 'annonces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterAnnonces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterAnnonces.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.annonces = action.payload;
      })
      .addCase(filterAnnonces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectFilteredAnnonces = (state) => state.annonces.annonces;

export default annoncesSlice.reducer;
