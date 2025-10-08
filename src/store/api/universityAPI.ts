import { ApiResponse } from "@/types/response";
import baseAPI from "./baseAPI";

interface IUniversity {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const universityAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<ApiResponse<IUniversity[]>, void>({
      query: () => '/university',
    }),
  }),
})

export const { useGetUniversitiesQuery } = universityAPI;