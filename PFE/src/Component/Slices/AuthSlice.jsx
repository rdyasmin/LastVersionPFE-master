import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async ({ email, motpasse }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , motpasse }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      throw new Error('Failed to log in');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Extract action creators and export them
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
