import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const taskApi = createApi({
    reducerPath: 'taskAPi',
    baseQuery: fetchBaseQuery({baseUrl: '/task'}),
    tagTypes: ["routes", "description", 'ai'],

    endpoints: build => ({
        getRouteCount: build.query({
            query: (taskId) => `/route_count/${taskId}`,
            providesTags: ["routes"]
        }),
        getDescription: build.query({
            query: (taskId) => `/description/${taskId}`,
            providesTags: ['description']
        }),
        getAiRoute: build.query({
            query: (taskId) => `/get_ai_route/${taskId}`,
            providesTags: ['ai']
        }),
    })
})

export const {useGetRouteCountQuery, useGetDescriptionQuery, useGetAiRouteQuery} = taskApi;