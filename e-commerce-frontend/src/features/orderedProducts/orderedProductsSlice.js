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

export const getUsersOrderedProducts = createAsyncThunk(
  "orderedProducts/getUsersOrderedProducts",
  async (data) => {
    const { id, token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}/${id}`, config);
    return response.data;
  }
);

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

export const updateOrderedProduct = createAsyncThunk(
  "orderedProducts/updateOrderedProduct",
  async (data) => {
    const { newData, id, token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.patch(`${BASE_URL}/${id}`, newData, config);
    return response.data;
  }
);

export const deleteOrderedProduct = createAsyncThunk(
  "orderedProducts/deleteOrderedProduct",
  async (data) => {
    const { id, token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.delete(`${BASE_URL}/${id}`, config);
    return response.data;
  }
);

const orderedProductsSlice = createSlice({
  name: "orderedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersOrderedProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUsersOrderedProducts.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        orderedProductsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getUsersOrderedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      })
      .addCase(updateOrderedProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateOrderedProduct.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        orderedProductsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateOrderedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrderedProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteOrderedProduct.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        orderedProductsAdapter.removeOne(state, Number(action.payload.id));
      })
      .addCase(deleteOrderedProduct.rejected, (state, action) => {
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
