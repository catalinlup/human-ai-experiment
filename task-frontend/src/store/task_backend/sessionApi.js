import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sessionApi = createApi({
    reducerPath: 'sessionApi',
    baseQuery: fetchBaseQuery({baseUrl: '/session'}),
    tagTypes: ["session"],

    endpoints: build => ({
        getSession: build.query({
            query: (userId) => `/get/${userId}`,
            providesTags: ["session"]
        })
    })
})

export const {useGetSessionQuery} = sessionApi;