import { baseApi } from '../services/baseApi';

export const kitchensApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingKitchens: builder.query({
      query: () => ({ url: '/kitchen/pending', method: 'GET' }),
      transformResponse: (response) => response.kitchens || [],
    }),
  }),
});

export const { useGetPendingKitchensQuery } = kitchensApi;
