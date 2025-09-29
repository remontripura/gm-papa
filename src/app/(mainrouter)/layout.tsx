import Footer from "@/components/homeComponents/NavbarAndFooter/Footer";
import Navbar from "@/components/homeComponents/NavbarAndFooter/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Profile } from "@/types/profile/profile";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("FFT")?.value;
  let profileData: Profile | null = null;
  if (token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/my-profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        redirect("/logout");
      }
      if (response.ok) {
        profileData = await response.json();
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      redirect("/logout");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar profileData={profileData} />
      <main className="flex-1">
        <div className="bg-[#2f2b5f]">
          {" "}
          <div className="md:mt-16 mt-18" />
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
