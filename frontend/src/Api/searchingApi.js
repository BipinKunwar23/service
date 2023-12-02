import React from 'react'
import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const searchingApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000/api/search',
    prepareHeaders:(headers)=>{
        // headers.set('Content-Type','multipart/form-data')
        headers.set('Accept','application/json')
        headers.set('Authorize',localStorage.getItem('token'))
        return headers
      }}),
  tagTypes:['Orders'],

    endpoints:(build=>({
        searchProvider:build.query({
            query:(service)=>`service?name=${service}`
        }),
        searchLocaton:build.query({
            query:(categoryId)=>{
                return !categoryId ? "location/get" : `location/category/${categoryId}`
            }

        })
      
       
    }))
})
  
export const {
useSearchProviderQuery,
useSearchLocatonQuery
}=searchingApi

