import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({baseUrl: '/chat'}),
    tagTypes: ["msg"],

    endpoints: build => ({
        sendMessage: build.mutation({
            query(content) {
                return {
                    url: `/send/${content.roomId}`,
                    method: 'POST',
                    body: {
                        "message": content.message,
                    }
                }
            },
            invalidatesTags: [{type: "msg"}]
        }),

        getMessages: build.query({
            query: (roomId) => `/get_all/${roomId}`,
            providesTags: ["msg"]
        }),
    })
})

export const {useGetMessagesQuery, useSendMessageMutation} = chatApi;