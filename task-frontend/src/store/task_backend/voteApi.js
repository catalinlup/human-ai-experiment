import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const voteApi = createApi({
    reducerPath: 'voteApi',
    baseQuery: fetchBaseQuery({baseUrl: '/vote'}),
    tagTypes: ['vote'],

    endpoints: build => ({
        vote: build.mutation({
            query(content) {
                return {
                    url: `/perform`,
                    method: 'POST',
                    body: {
                        "session_id": content.session_id,
                        "voted_route_number": content.voted_route_number,
                        "prolific_id": content.prolific_id
                    }
                }
            },
            invalidatesTags: [{type: "vote"}]
        }),

        preliminaryVote: build.mutation({
            query(content) {
                return {
                    url: `/preliminary`,
                    method: 'POST',
                    body: {
                        "session_id": content.session_id,
                        "voted_route_number": content.voted_route_number,
                        "prolific_id": content.prolific_id
                    }
                }
            },
            invalidatesTags: [{type: "vote"}]
        }),

        getPreliminaryDone: build.query({
            query: (content) => `/preliminary_done/${content.room_id}/${content.taskId}`,
            providesTags: ['vote']
        }),


    })
})

export const {useVoteMutation, usePreliminaryVoteMutation, useGetPreliminaryDoneQuery} = voteApi;