import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';


export const store = configureStore({
    
    reducer: {
        authStore: authSlice.reducer,
    },

})