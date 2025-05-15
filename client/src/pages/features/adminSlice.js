import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  status: "idle",
  analetika: [],
  error: null,
  successMessage: null,
};

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/users");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const getAnaletika = createAsyncThunk(
  "admin/getAnaletika",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/analetika");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/admin/delete-user/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      })
      //   analetika
      .addCase(getAnaletika.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getAnaletika.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.analetika = action.payload.analetika;
        state.successMessage = action.payload.message;
      })
      .addCase(getAnaletika.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      })
      //   delete user
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const userId = action.meta.arg;
        state.users = state.users.filter((user) => user._id !== userId);

        // const deletedId = action.payload.id || action.meta.arg.id;
        // state.users = state.users.filter((user) => user._id !== deletedId);
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
