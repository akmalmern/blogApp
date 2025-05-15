import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  userPosts: [],
  singlePost: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  successMessage: null,
};

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/post/add-post", formData);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/post/posts");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const myPosts = createAsyncThunk(
  "posts/myPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/post/my-posts");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/post/delete/${postId}`);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const getOnePost = createAsyncThunk(
  "posts/getOnePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/post/one-post/${id}`);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePosts",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/post/update-post/${id}`, updatedData);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data.error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
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
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message;
        toast.success(state.successMessage);
        state.posts.unshift(action.payload.post); // ✅ massivga qo‘shamiz
        state.userPosts.unshift(action.payload.post); // bu joyni ham to‘g‘ri qoldiring
      })

      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      });
    // Get Posts
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      })
      // my posts
      .addCase(myPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(myPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(myPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      })
      // deletepost
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);

        const postId = action.meta.arg; // ❗ thunk ga uzatilgan postId shu yerda

        state.posts = state.posts.filter((post) => post._id !== postId);
        state.userPosts = state.userPosts.filter((post) => post._id !== postId);
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        toast.error(action.payload.error);
      })
      // getOnePost
      .addCase(getOnePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getOnePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singlePost = action.payload.post;
      })
      .addCase(getOnePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      // update data
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.successMessage = action.payload.message;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});
export const { resetError, resetCurrentPost, resetSuccessMessage } =
  postSlice.actions;
export default postSlice.reducer;
