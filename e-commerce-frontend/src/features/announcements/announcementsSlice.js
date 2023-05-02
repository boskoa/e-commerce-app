import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/announcements";

const announcementsAdapter = createEntityAdapter();

const initialState = announcementsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllAnnouncements = createAsyncThunk(
  "announcements/getAllAnnouncements",
  async (query = "") => {
    const response = await axios.get(BASE_URL + query);
    return response.data;
  }
);

export const updateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
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

export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
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

export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
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

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    emptyAnnouncements: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnnouncements.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        announcementsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAnnouncement.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        announcementsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAnnouncement.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        announcementsAdapter.upsertOne(state, action.payload);
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAnnouncement.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        announcementsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectIds: selectAnnouncementsIds,
  selectAll: selectAllAnnouncements,
  selectById: selectAnnouncementById,
} = announcementsAdapter.getSelectors((state) => state.announcements);

export function selectAnnouncementsError(state) {
  return state.announcements.error;
}

export function selectAnnouncementsLoading(state) {
  return state.announcements.loading;
}

export const selectActiveAnnouncements = createSelector(
  [selectAllAnnouncements],
  (announcements) => announcements.filter((a) => a.active)
);

export const { emptyAnnouncements } = announcementsSlice.actions;

export default announcementsSlice.reducer;
