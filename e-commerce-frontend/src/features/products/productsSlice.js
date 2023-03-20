import axios from "axios";

const {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} = require("@reduxjs/toolkit");

const BASE_URL = "/api/products";

const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
  latest: [],
});

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const getLatestProducts = createAsyncThunk(
  "products/getLatestProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/latest`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        productsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLatestProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getLatestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.latest = action.payload;
      })
      .addCase(getLatestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllProducts,
  selectIds: selectProductIds,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state) => state.products);

export function selectProductsLoading(state) {
  return state.products.loading;
}

export function selectProductsError(state) {
  return state.products.error;
}

export function selectLatestProducts(state) {
  return state.products.latest;
}

export default productsSlice.reducer;
