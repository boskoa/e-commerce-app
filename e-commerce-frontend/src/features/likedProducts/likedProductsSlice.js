import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/liked-products";

const likedProductsAdapter = createEntityAdapter();

const initialState = likedProductsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getUsersLikes = createAsyncThunk(
  "likedProducts/getUsersLikes",
  async (token) => {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(BASE_URL, config);
    return response.data;
  }
);

export const createUsersLike = createAsyncThunk(
  "likedProducts/createUsersLike",
  async (data) => {
    const { token, productId } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.post(BASE_URL, { productId }, config);
    return response.data;
  }
);

export const removeUsersLike = createAsyncThunk(
  "likedProducts/removeUsersLike",
  async (data) => {
    const { token, productId } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.delete(`${BASE_URL}/${productId}`, config);
    return response.data;
  }
);

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersLikes.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUsersLikes.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        likedProductsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getUsersLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUsersLike.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createUsersLike.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        likedProductsAdapter.upsertOne(state, action.payload);
      })
      .addCase(createUsersLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUsersLike.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(removeUsersLike.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        likedProductsAdapter.removeOne(state, action.payload);
      })
      .addCase(removeUsersLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllLikes,
  selectIds: selectLikeIds,
  selectById: selectLikesById,
} = likedProductsAdapter.getSelectors((state) => state.likedProducts);

export function selectLikedProductsLoading(state) {
  return state.likedProducts.loading;
}

export function selectLikedProductsError(state) {
  return state.likedProducts.error;
}

export default likedProductsSlice.reducer;
