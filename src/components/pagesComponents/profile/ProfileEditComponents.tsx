"use client";

import MainContainer from "@/components/container/MainContainer";
import { TextField } from "@/components/Form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetData } from "@/lib/fetch/useGetData";
import { profileEditSchema } from "@/schema/profileEdit/profileEdit";
import React, { useEffect, useRef } from "react";
import { z } from "zod";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import { Profile, profileResponse } from "@/types/profile/profile";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { AxiosError } from "axios";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/shared/toast/ToastModal";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
type FormType = z.infer<typeof profileEditSchema>;
export default function ProfileEdit() {
  const { data: profileData } = useGetData<Profile>(["profile"], `/my-profile`);
  const router = useRouter();
  const initialValues: FormType = {
    name: profileData?.user.name || "",
    phone: "",
  };
  useEffect(() => {
    if (profileData) {
      formRef.current?.reset({
        name: profileData?.user?.name || "",
        phone: profileData?.user?.phone || "",
      });
    }
  }, [profileData]);

  const formRef = useRef<GenericFormRef<FormType>>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const response = await axiosInstance.post<profileResponse>(
        `/profile-update`,
        data
      );
      return response.data;
    },
    onSuccess: (data: profileResponse) => {
      if (data.status === false) {
        showErrorAlert(data.message);
      } else {
        showSuccessAlert(data.message);
      }
    },
    onError: (
      err: AxiosError<{ message: { message: string } }> & {
        message: { message: string };
      }
    ) => {
      showErrorAlert(err.message.message || "Something went wrong");
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data as FormType);
  };

  return (
    <div className="p-6 min-h-[70vh] flex items-center justify-center ">
      <MainContainer>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-gray-700 transition-colors flex items-center gap-1 mb-3"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-300" /> Back to profile
        </button>
        <Card className="bg-black/30 backdrop-blur-lg border border-neutral-700/50 shadow-2xl rounded-2xl text-white max-w-lg mx-auto transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.6)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Edit Profile
            </CardTitle>
            <p className="text-sm text-neutral-400">Update your information</p>
          </CardHeader>

          <CardContent className="space-y-5 pt-2">
            <GenericForm
              schema={profileEditSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="space-y-4">
                <TextField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your Name"
                  inputClass="w-full rounded-xl bg-neutral-800 border border-neutral-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 transition-all px-4 py-2 !text-gray-50"
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  type="number"
                  placeholder="Enter your mobile number"
                  inputClass="w-full rounded-xl bg-neutral-800 border border-neutral-700 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/50 transition-all px-4 py-2 !text-gray-50"
                />

                <LoadingButton
                  className="button-color w-full mt-3 rounded-xl"
                  type="submit"
                >
                  {isPending ? "Processing" : "Save Changes"}
                </LoadingButton>
              </div>
            </GenericForm>
          </CardContent>
        </Card>
      </MainContainer>
    </div>
  );
}
