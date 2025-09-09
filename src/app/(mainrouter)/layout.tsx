import Footer from "@/components/homeComponents/NavbarAndFooter/Footer";
import Navbar from "@/components/homeComponents/NavbarAndFooter/Navbar";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {" "}
          <div className="md:mt-16 mt-24" />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
export default HomeLayout;
