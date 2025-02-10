import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "9ddb47cb3b78b43f36d46fecff898f8b";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }) => {
    const response = await axios.get(`${BASE_URL}`, {
      params: { api_key: API_KEY, query, page },
    });
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
