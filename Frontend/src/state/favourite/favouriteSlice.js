import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const addFavourite = createAsyncThunk(
  'favourites/addFavourite',
  async ({ city, country }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}/favourite`,
        { city, country },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getFavourites = createAsyncThunk(
  'favourites/getFavourites',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/favourite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.favourites;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  'favourites/removeFavourite',
  async ({ city, country }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}/favourite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { city, country },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.favourites;
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.favourites;
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favouritesSlice.reducer;
