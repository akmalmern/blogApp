import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  successMessage: null,
};
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/category/categories");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/category/add-category", formData);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
        state.successMessage = action.payload.message;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      })
      //   addcategory
      .addCase(addCategory.pending, (state) => {
        state.successMessage = null;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.category;
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      });
  },
});

export default categorySlice.reducer;
