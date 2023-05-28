import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: '/auth/auth'}),
    tagTypes: ["Auth"],

    endpoints: build => ({
        loginUser: build.mutation({
            query(credentials) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: {
                        'email': credentials.email,
                        'password': credentials.password
                    }
                }
            },
            invalidatesTags: [{type: "Auth"}]
        }) 
    })
})

export const {useLoginUserMutation} = authApi;