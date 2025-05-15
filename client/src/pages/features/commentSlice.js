import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";

const initialState = {
  comments: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/comment/add-comment/${postId}`, {
        comment,
      });
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/comment/update/${commentId}`, {
        comment,
      });
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/comment/delete/${commentId}`);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload.comment);
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (c) => c._id === action.payload.comment._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload.comment;
        }
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (c) => c._id !== action.meta.arg
        );
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
