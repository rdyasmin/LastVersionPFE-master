import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';


const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/client/${userId}`);
    return response.json();
  }
);




const editpassword = createAsyncThunk(
  'user/editpassword',
  async ({ userId, oldmotpasse,motpasse,telephone}) => {
    const response = await fetch(`http://127.0.0.1:8000/api/client/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldmotpasse: oldmotpasse, motpasse:motpasse ,telephone:telephone }),
    });
    return response.json();
  }
);


const initialState = {
  user: [],
  loading: false,
  error: null,
  messages:"",
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(editpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(editpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  }
});
export { getUserById , editpassword};
export default userSlice.reducer;
