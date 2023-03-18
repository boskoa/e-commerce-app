import {
  createAsyncThunk,
  createEntityAdapter,
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
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
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

export default announcementsSlice.reducer;
