import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// fetchBaseQuery make requests from the backend

import { BASE_URL } from "../consants";

const baseQuery = fetchBaseQuery({BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "User","Order"],
    endpoints: (builder) =>({

    }),
});
