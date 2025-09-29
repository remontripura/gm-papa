"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { LoginResponse } from "@/types/loginDataType/loginDataType";
import { useUserStore } from "@/lib/store/authStore/authStore";

export default function GoogleLoginHandler({
  onProcessingChange,
}: {
  onProcessingChange: (val: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setUser } = useUserStore.getState();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!session?.id_token || isProcessing) return;
    setIsProcessing(true);
    onProcessingChange(true);

    const loginWithGoogle = async () => {
      try {
        const response = await axiosInstance.post<LoginResponse>(`/login`, {
          token: session.id_token,
        });
        if (response.data.token) {
          setUser(response.data.user);
          Cookies.set("FFT", response.data.token ?? "", {
            expires: 3,
          });
          await signOut({ redirect: false });
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        onProcessingChange(false);
      }
    };
    loginWithGoogle();
  }, [session?.id_token, status, isProcessing, router, onProcessingChange]);

  return null;
}
