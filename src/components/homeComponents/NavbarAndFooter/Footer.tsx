import MainContainer from "@/components/container/MainContainer";
import { Images } from "@/lib/store/images";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-mainDark text-white md:py-10 py-8">
      <MainContainer className="flex flex-col items-center gap-8 text-center">
        <Image
          className="w-[120px]"
          src="/logo2.png"
          alt="logo"
          width={500}
          height={500}
        />{" "}
        <div>
          <p className="mb-4 text-sm uppercase tracking-wider opacity-80">
            We Support
          </p>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {[Images.bkash, Images.nagad, Images.rocket].map((img, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition md:w-[100px] w-[80px] md:h-[60px] h-[40px] flex justify-center items-center p-0.5 bg-white",
                  i === 2 && "!bg-[#8C3494]"
                )}
              >
                <Image
                  src={img}
                  alt="Payment Method"
                  width={70}
                  height={40}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Bottom - Copyright */}
        <p className="text-xs opacity-70 border-t border-gray-700 pt-4 w-full">
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}. All
          rights reserved.
        </p>
      </MainContainer>
    </footer>
  );
}
