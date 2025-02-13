import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { AuthProvider } from "./Contextos/Autenticacao.js";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>,
);
