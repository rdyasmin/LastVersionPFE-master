import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getVilles = createAsyncThunk(
  "villes/getVilles",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/villes');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const villesSlice = createSlice({
  name: 'ville',
  initialState: { villes: [], isLoading: false, isError: null }, 
  extraReducers: (builder) => {
    builder
      .addCase(getVilles.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getVilles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.villes = action.payload; 
      })
      .addCase(getVilles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  }
});

export const { } = villesSlice.actions;

export default villesSlice.reducer;