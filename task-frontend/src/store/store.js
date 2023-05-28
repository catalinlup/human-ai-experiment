import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./auth/authApi";




const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
        ),
    
})

setupListeners(store.dispatch);

export default store;
