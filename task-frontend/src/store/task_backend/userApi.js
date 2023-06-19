import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: '/user'}),
    tagTypes: [],

    endpoints: build => ({
        getNickname: build.query({
            query: (session_id) => `/get_nickname/${session_id}`,
        }),
    })
})

export const {useGetNicknameQuery} = userApi;