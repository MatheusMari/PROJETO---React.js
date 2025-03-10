import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ação assíncrona para buscar as categorias
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/categories.php"
            );
            return response.data.categories;
        } catch (err) {
            return rejectWithValue(err.response ? err.response.data : err.message);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null; // Limpa o erro antes de uma nova requisição
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;
