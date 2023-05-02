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

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (data) => {
    const { token, newData, id } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.patch(`${BASE_URL}/${id}`, newData, config);
    return response.data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (data) => {
    const { token, newData } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.post(BASE_URL, newData, config);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (data) => {
    const { token, id } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.delete(`${BASE_URL}/${id}`, config);
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
      })
      .addCase(updateCategory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        categoriesAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        categoriesAdapter.upsertOne(state, action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        categoriesAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
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
