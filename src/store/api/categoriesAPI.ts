import { ApiResponse } from "@/types/response";
import baseAPI from "./baseAPI";
import { ICategory } from "@/types/interfaces";

export const categoriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<ICategory[]>, void>({
      query: () => '/category',
    }),
  }),

})

export const { useGetCategoriesQuery } = categoriesAPI;