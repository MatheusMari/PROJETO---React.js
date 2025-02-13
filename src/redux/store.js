import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import recipeReducer from "./recipeSlice";

// Configuração da store do Redux
export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        recipes: recipeReducer,
    },
    // (Opcional) Adicionando um middleware customizado ou devTools, caso seja necessário
    // DevTools geralmente é ativado por padrão em ambientes de desenvolvimento
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
