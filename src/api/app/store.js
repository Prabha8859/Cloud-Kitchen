import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authslice';
// authApi uses the same baseApi instance; register only baseApi below to avoid duplicates
import { baseApi } from '../services/baseApi';
// import { kitchensApi } from '../kitchens/kitchensApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
