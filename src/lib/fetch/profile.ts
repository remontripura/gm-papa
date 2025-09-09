import { Profile } from "@/types/profile/profile";
import { useGetData } from "./useGetData";

export const getProfile = (enabled: boolean = true) => {
  return useGetData<Profile>(["profile"], "/my-profile", { enabled });
};
