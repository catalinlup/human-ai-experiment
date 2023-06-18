import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./auth/authApi";
import { taskApi } from "./task_backend/taskApi";
import { chatApi } from "./task_backend/chatApi";
import { sessionApi } from "./task_backend/sessionApi";



const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [sessionApi.reducerPath]: sessionApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            taskApi.middleware,
            chatApi.middleware,
            sessionApi.middleware
        ),
    
})

setupListeners(store.dispatch);

export default store;
