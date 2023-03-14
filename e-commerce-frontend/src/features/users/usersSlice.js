import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const USERS_URL = "/api/users";

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: null,
  success: false,
});

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.get(USERS_URL, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(USERS_URL, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(createUser.pending, (state) => {
        state.error = null;
        state.success = false;
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectIds: selectUserIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);

export function selectUsersLoading(state) {
  return state.users.loading;
}

export function selectUsersError(state) {
  return state.users.error;
}

export function selectUserCreated(state) {
  return state.users.success;
}

export const { resetError, resetSuccess } = usersSlice.actions;

export default usersSlice.reducer;
