// redux/recipeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ação assíncrona para buscar receitas por categoria
export const fetchRecipesByCategory = createAsyncThunk(
    "recipes/fetchRecipesByCategory",
    async (category, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            return response.data.meals;
        } catch (err) {
            return rejectWithValue(
                err.response ? err.response.data : err.message
            );
        }
    }
);

const recipeSlice = createSlice({
    name: "recipes",
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
                state.error = null; // Limpa o erro antes de uma nova requisição
            })
            .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
                state.recipes = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipesByCategory.rejected, (state, action) => {
                state.error = action.payload || action.error.message; // Mostra o erro com mais detalhes
                state.loading = false;
            });
    },
});

export default recipeSlice.reducer;
