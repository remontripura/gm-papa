import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "../axios/AxiosInstance";


const fetchData = async <T>(dataUrl: string): Promise<T> => {
  const response = await axiosInstance.get(dataUrl);
  return response.data;
};

export const useGetData = <T>(
  queryKey: QueryKey,
  dataUrl: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<T, Error>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetchData<T>(dataUrl),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    ...options,
  });
};
