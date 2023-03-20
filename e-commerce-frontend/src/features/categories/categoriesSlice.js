import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/categories";

const categoriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = categoriesAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        categoriesAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllCategories,
  selectIds: selectCategoriesIds,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state) => state.categories);

export function selectCategoriesError(state) {
  return state.categories.error;
}

export function selectCategoriesLoading(state) {
  return state.categories.loading;
}

export default categoriesSlice.reducer;
