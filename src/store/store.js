import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal';


export const store = configureStore({
    
    reducer: {
        authStore: authSlice.reducer,
        journalStore: journalSlice.reducer,
    },

})