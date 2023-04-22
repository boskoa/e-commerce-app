import axios from "axios";

const {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} = require("@reduxjs/toolkit");

export const BASE_URL = "/api/products";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
  latest: [],
  selected: {},
});

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (query) => {
    const response = await axios.get(BASE_URL + query);
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

export const getSelectedProduct = createAsyncThunk(
  "products/getSelectedProduct",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    const { token, id, newData } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.patch(`${BASE_URL}/${id}`, newData, config);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    emptyProducts: () => initialState,
  },
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
      })
      .addCase(getSelectedProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSelectedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selected = action.payload;
      })
      .addCase(getSelectedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        productsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateProduct.rejected, (state, action) => {
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

export function selectSelectedProduct(state) {
  return state.products.selected;
}

export const { emptyProducts } = productsSlice.actions;

export default productsSlice.reducer;
