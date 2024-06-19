import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addFavoris = createAsyncThunk(
    'favoris/addFavoris',
    async ({ id_client, id_annonce }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/favoris`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_client, id_annonce })
        });
        return response.json();
    }
);

const deleteFavoris = createAsyncThunk(
    'favoris/deleteFavoris',
    async ({ id_client, id_annonce }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/favoris/${id_client}/${id_annonce}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_client, id_annonce })
        });
        return response.json();
    }
);

const getFavorisById = createAsyncThunk(
    'favoris/getFavorisById',
    async (id_client) => {
        const response = await fetch(`http://127.0.0.1:8000/api/favoris/${id_client}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    }
);

// Initial State
const initialState = {
    favoris: [], 
    loading: false,
    error: null
};

// Redux Slice
const favorisSlice = createSlice({
    name: "favoris",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavoris.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFavoris.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Update favoris array with the new favorited item if needed
                // For example: state.favoris.push(action.payload);
            })
            .addCase(addFavoris.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFavoris.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFavoris.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Remove favorited item from favoris array if needed
                // For example: state.favoris = state.favoris.filter(item => item.id !== action.payload.id);
            })
            .addCase(deleteFavoris.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getFavorisById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFavorisById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.favoris=action.payload;
               
            })
            .addCase(getFavorisById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { /* No actions to export as they are included in createAsyncThunk */ } = favorisSlice.actions;

export { addFavoris, deleteFavoris, getFavorisById };

export default favorisSlice.reducer;
