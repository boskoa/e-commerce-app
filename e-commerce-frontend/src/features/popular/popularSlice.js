import axios from "axios";
const {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} = require("@reduxjs/toolkit");

const BASE_URL = "/api/selected-products/popular";

const popularAdapter = createEntityAdapter();

const initialState = popularAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllPopular = createAsyncThunk(
  "popular/getAllPopular",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPopular.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllPopular.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        popularAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllPopular,
  selectIds: selectPopularIds,
  selectById: selectPopularById,
} = popularAdapter.getSelectors((state) => state.popular);

export function selectPopularLoading(state) {
  return state.popular.loading;
}

export function selectPopularError(state) {
  return state.popular.error;
}

export default popularSlice.reducer;
