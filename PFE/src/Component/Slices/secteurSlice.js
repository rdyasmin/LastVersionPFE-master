import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define your initial state here or fetch it from API
const initialState = {
  secteurs: [],
};

// Define your asynchronous thunk
const gesecteurbyid = createAsyncThunk(
  'secteurs/getsecteurbyid',
  async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/secteurs/${id}`);
    return response.json();
  }
);

// Create your slice
const secteursSlice = createSlice({
  name: 'secteurs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gesecteurbyid.fulfilled, (state, action) => {
      state.secteurs = action.payload;
    });
  },
});
export const { } = secteursSlice.actions;
export { gesecteurbyid }; // Exporting async action
export default secteursSlice.reducer;
