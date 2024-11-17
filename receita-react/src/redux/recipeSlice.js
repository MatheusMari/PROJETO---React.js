// redux/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipesByCategory = createAsyncThunk(
  'recipes/fetchRecipesByCategory',
  async (category) => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data.meals;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default recipeSlice.reducer;
