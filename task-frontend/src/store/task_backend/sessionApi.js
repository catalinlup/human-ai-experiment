import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sessionApi = createApi({
    reducerPath: 'sessionApi',
    baseQuery: fetchBaseQuery({baseUrl: '/room'}),
    tagTypes: ["session"],

    endpoints: build => ({
        getSession: build.query({
            query: (session_id) => `/get/${session_id}`,
            providesTags: ["session"]
        }),

        getRoomStatus: build.query({
            query: (room_id) => `/get_status/${room_id}`
        })
    })
})

export const {useGetSessionQuery, useGetRoomStatusQuery} = sessionApi;