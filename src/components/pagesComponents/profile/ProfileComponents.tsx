"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Mail, Phone, Calendar } from "lucide-react";
import MainContainer from "@/components/container/MainContainer";
import { BiUser } from "react-icons/bi";
import { useGetData } from "@/lib/fetch/useGetData";
import { Profile } from "@/types/profile/profile";
import Link from "next/link";

export default function ProfileComponents() {
  // const { user }: { user: IUser | null } = useUserStore.getState();
  const { data: profileData } = useGetData<Profile>(["profile"], `/my-profile`);
  const user = profileData?.user;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-4">
      <MainContainer>
        <div className="w-full ">
          <Card className="bg-mainlight border border-neutral-800 shadow-xl rounded-2xl text-white">
            <CardHeader>
              <div className="flex flex-col space-y-3">
                <Avatar className="w-20 h-20 p-1 border border-gray-500">
                  <BiUser className="size-full text-white" />
                </Avatar>
                <div>
                  <CardTitle className="text-[20px]">{user?.name}</CardTitle>
                </div>
                {user?.email}
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
                  <p>Wallet : Tk {user?.wallet}</p>
                  <Link href="/profile/edit">
                    <button className="px-8 py-1 button-color rounded-md md:mt-0 mt-3">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </CardHeader>

            <Separator className="bg-neutral-800" />

            <CardContent className="pt-6 space-y-5">
              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-600/20 rounded-lg">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Email</p>
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Phone</p>
                    <p className="text-sm font-medium">
                      {user?.phone ?? "Not added"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Member Since</p>
                    <p className="text-sm font-medium">
                      {user?.created_at ? formatDate(user.created_at) : "--"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <div className="grid md:grid-cols-3 grid-cols-1 mt-5 gap-6">
            <Card className="bg-mainlight border border-slate-800 rounded-2xl shadow-md text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[18px]">Total Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold">0 Orders</p>
              </CardContent>
            </Card>

            <Card className="bg-mainlight border border-slate-800 rounded-2xl shadow-md text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[18px]">Complte Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold">0 Orders</p>
              </CardContent>
            </Card>

            <Card className="bg-mainlight border border-slate-800 rounded-2xl shadow-md text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[18px]">Pending Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold">0 Orders</p>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </MainContainer>
    </div>
  );
}
