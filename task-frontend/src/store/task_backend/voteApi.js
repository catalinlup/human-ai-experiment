import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const voteApi = createApi({
    reducerPath: 'voteApi',
    baseQuery: fetchBaseQuery({baseUrl: '/vote'}),
    tagTypes: [],

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
        }),
    })
})

export const {useVoteMutation} = voteApi;