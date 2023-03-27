import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/orders";

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getUsersOrders = createAsyncThunk(
  "orders/getUsersOrders",
  async (token) => {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/user-orders/`, config);
    return response.data;
  }
);

export const getSelectedOrder = createAsyncThunk(
  "orders/getSelectedOrder",
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

export const createdOrder = createAsyncThunk(
  "orders/createdOrder",
  async (data) => {
    const { token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(BASE_URL, config);
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersOrders.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUsersOrders.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        ordersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getUsersOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSelectedOrder.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSelectedOrder.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        ordersAdapter.upsertOne(state, action.payload);
      })
      .addCase(getSelectedOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createdOrder.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createdOrder.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        ordersAdapter.upsertOne(state, action.payload);
      })
      .addCase(createdOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllOrders,
  selectIds: selectOrdersIds,
  selectById: selectOrdersById,
} = ordersAdapter.getSelectors((state) => state.orders);

export function selectOrdersLoading(state) {
  return state.orders.loading;
}

export function selectOrdersError(state) {
  return state.orders.error;
}

export default ordersSlice.reducer;
