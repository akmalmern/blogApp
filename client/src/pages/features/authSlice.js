import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../api/api";

const initialState = {
  user: null,
  isLoggedIn: false,

  isLoading: true,
  error: null,
  success: false,
};

// Ro‘yxatdan o‘tish
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`/user/register`, formData);
      toast.success(res.data.message);
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.error);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`/user/login`, formData);
      toast.success(res.data.message);
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.error);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Profilni olish
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/profile`);
      return res.data.user;
    } catch (err) {
      console.log("getProfile error:", err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/logout`);
      toast.success(res.data.message);
      return null;
    } catch (err) {
      toast.error(err.response?.data?.message || "Chiqishda xatolik");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/user/forgot-password", { email });
      toast.success(data.message);
      return data;
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/user/update-user", formData);
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// resetPassword

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/user/reset-password", {
        resetToken,
        newPassword,
      });
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
      state.error = null;
      state.message = null;
      state.isLoading = false;
    },
  }, // clearAuthError olib tashlandi
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.success = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // update-user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.action = action.payload.user;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearSuccess } = authSlice.actions;
export default authSlice.reducer;
