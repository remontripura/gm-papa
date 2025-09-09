"use client";

import MainContainer from "@/components/container/MainContainer";
import { Images } from "@/lib/store/images";
import { useSocialLinksStore } from "@/lib/store/socialStore/socialStore";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { socialLinks } = useSocialLinksStore();

  return (
    <footer className="md:py-6 py-5 bg-mainDark text-white ">
      <MainContainer className="grid grid-cols-12 gap-8 px-2">
        <div className="md:col-span-4 col-span-12">
          <Link className="text-[18px] font-semibold" href="/">
            GMPAPA
          </Link>
          <p className="text-[14px] mt-3 mb-5">
            We bring you the best offers, updates, and tips to make your
            experience even better.
          </p>
        </div>

        <div className="md:col-span-3 col-span-12">
          <h6 className="font-semibold text-18">Hot Selling</h6>
          {Array.from({ length: 5 }, (_, index) => index).map((item) => (
            <h6 className=" text-14 mt-3 border border-primary_text rounded-full p-2 w-fit px-6 cursor-pointer hover:text-white text-primary_text hover:border-white">
              GMPAPA impact top-up
            </h6>
          ))}
        </div>
        <div className="md:col-span-5 col-span-12 grid grid-cols-2 gap-5">
          <div className="">
            <h6 className="font-semibold text-18">Service</h6>
            <div className="flex flex-col gap-2 mt-3">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Contact Us", path: "/contact-us" },
                { name: "Faq", path: "/faq" },
              ].map((item) => (
                <Link
                  href={item.path}
                  className="text-14 w-fit font-medium cursor-pointer hover:text-white text-primary_text"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>{" "}
          <div>
            <h6 className="font-semibold text-18">Download App</h6>
            <div className="mt-3">
              <Image
                className="w-[120px]"
                src={Images.playStore}
                alt="img"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-18">Links</h6>
            <div className="flex flex-col gap-2 mt-3">
              {[
                { name: "LDPlayer", path: "/ld-player" },
                { name: "LDCloud", path: "/ld-cloud" },
                { name: "EasyFun", path: "/easyfun" },
                { name: "FunPass", path: "/funpass" },
              ].map((item) => (
                <Link
                  href={item.path}
                  className="text-14 w-fit font-medium cursor-pointer hover:text-white text-primary_text"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <h6 className="font-semibold text-18">Join Us</h6>
            <div className="mt-3 flex items-center text-[24px] gap-3">
              {socialLinks.map((item, index) => {
                const isPhone = /^[0-9+]+$/.test(item.url);
                const isTelegram = item.url.includes("t.me");
                const href = isPhone ? `tel:${item.url}` : item.url;

                return (
                  <a
                    key={index}
                    href={href}
                    className="size-8 p-1 rounded-full border border-gray-300 text-white shadow-lg"
                    title={item.name}
                    target={isPhone ? "_self" : "_blank"}
                    rel={isPhone ? undefined : "noopener noreferrer"}
                  >
                    <Image
                      className="size-full rounded-full"
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </MainContainer>
      <div className="border-t border-gray-700 mt-6 px-2">
        <MainContainer className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm text-gray-400">
          <p>&copy; {currentYear} GMPAPA. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link href="/terms-service" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </MainContainer>
      </div>
    </footer>
  );
};
export default Footer;
