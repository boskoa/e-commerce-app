import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/selected-products";

const orderedProductsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = orderedProductsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const createOrderedProduct = createAsyncThunk(
  "orderedProducts/createOrderedProduct",
  async (data) => {
    const { orderedProduct, token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.post(BASE_URL, orderedProduct, config);
    return response.data;
  }
);

const orderedProductsSlice = createSlice({
  name: "orderedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderedProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createOrderedProduct.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        orderedProductsAdapter.upsertOne(state, action.payload);
      })
      .addCase(createOrderedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllOrderedProducts,
  selectIds: selectOrderedProductIds,
  selectById: selectOrderedProductById,
} = orderedProductsAdapter.getSelectors((state) => state.orderedProducts);

export function selectOrderedProductsLoading(state) {
  return state.orderedProducts.loading;
}

export function selectOrderedProductsError(state) {
  return state.orderedProducts.error;
}

export default orderedProductsSlice.reducer;
