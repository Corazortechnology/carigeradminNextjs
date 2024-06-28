"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLabours as fetchLaboursAPI } from "@/app/lib/data";

export const fetchLabours = createAsyncThunk(
  'labors/fetchLabours',
  async () => {
    const response = await fetchLaboursAPI();
    return response.data;
  }
);

const initialState = {
  labors: [],
  loading: false,
  error: null,
};

const laborSlice = createSlice({
  name: 'labors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabours.fulfilled, (state, action) => {
        state.loading = false;
        state.labors = action.payload;
      })
      .addCase(fetchLabours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default laborSlice.reducer;
