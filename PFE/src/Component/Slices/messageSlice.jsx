import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getmessageById = createAsyncThunk(
  'message/getmessageById',
  async (id_client) => {
    const response = await fetch(`http://127.0.0.1:8000/api/visit/${id_client}`);
    return response.json();
  }
);

const deletemessageByid = createAsyncThunk(
  'message/deletemessageByid',
  async (id_annonce) => {
    const response = await fetch(`http://127.0.0.1:8000/api/visit/${id_annonce}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
);
const addnewmessage = createAsyncThunk(
  'message/addnewmessage',
  async ({ id_client, id_annonce, message }) => {
    const response = await fetch(`http://127.0.0.1:8000/api/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_client, id_annonce, message }),
    });
    return response.json();
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getmessageById.fulfilled, (state, action) => {
        state.message = action.payload; 
      })
      .addCase(deletemessageByid.fulfilled, (state, action) => {
      })
      .addCase(addnewmessage.fulfilled, (state, action) => {
        state.message = action.payload; 
        state.error = null; 
      })
      .addCase(addnewmessage.rejected, (state, action) => {
        state.error = action.error.message; 
      });
  },
});

export const {  } = messageSlice.actions;
export { getmessageById, deletemessageByid ,addnewmessage}; 

export default messageSlice.reducer;
