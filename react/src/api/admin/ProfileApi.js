import React from 'react'
import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const ProfileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000/api/profile/',
    prepareHeaders:(headers)=>{
        // headers.set('Content-Type','multipart/form-data')
        headers.set('Accept','application/json')
        headers.set('Authorize',localStorage.getItem('token'))
        return headers
      }}),
    endpoints:(build=>({
        viewProfile:build.query({
            query:(()=>'view')
        }),
        editProfile:build.mutation({
            query:((formdata)=>{
                const userId= formdata.get('userId')
                return {
                    url:`edit/${userId}`,
                    method:'POST',
                    body:formdata
    
                }
            })
        }),
        addSecurityInfo:build.mutation({
            query:((values)=>{
                return {
                    url:`security`,
                    method:'POST',
                    body:values
    
                }
            })
        })
        
    }))
})
  
export const {
useEditProfileMutation,
useViewProfileQuery,
useAddSecurityInfoMutation
}=ProfileApi

