import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "/api/users";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: null,
  success: false,
  single: {},
});

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (data) => {
    const { token, query } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(BASE_URL + query, config);
    return response.data;
  }
);

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (data) => {
    const { token, id } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/${id}`, config);
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  const { token, newData, id } = data;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${BASE_URL}/${id}`,
    { ...newData },
    config
  );
  return response.data;
});

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
    emptyUsers: () => initialState,
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.success = false;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.single = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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

export function selectSingleUser(state) {
  return state.users.single;
}

export const { resetError, resetSuccess, emptyUsers } = usersSlice.actions;

export default usersSlice.reducer;
