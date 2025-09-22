"use client";

import MainContainer from "@/components/container/MainContainer";
import { useSocialLinksStore } from "@/lib/store/socialStore/socialStore";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { socialLinks } = useSocialLinksStore();

  return (
    <footer className="md:py-6 py-5 bg-mainDark text-white">
      <MainContainer className="grid grid-cols-12 gap-8 px-2">
        {/* Left Side Logo & Description */}
        <div className="md:col-span-4 col-span-12">
          <Link className="text-[18px] font-semibold" href="/">
            GMPAPA
          </Link>
          <p className="text-[14px] mt-3 mb-5 text-gray-300">
            We bring you the best offers, updates, and tips to make your
            experience even better.
          </p>
        </div>

        {/* Right Side (Service + Socials) */}
        <div className="md:col-span-8 col-span-12 grid grid-cols-2 gap-8">
          {/* Service Links */}
          <div>
            <h6 className="font-semibold text-18">Service</h6>
            <div className="flex flex-col gap-2 mt-3">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Contact Us", path: "/contact-us" },
                { name: "Faq", path: "/faq" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-14 w-fit font-medium cursor-pointer hover:text-white text-primary_text"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h6 className="font-semibold text-18">Join Us</h6>
            <div className="mt-3 flex items-center text-[24px] gap-3 flex-wrap">
              {socialLinks.map((item, index) => {
                const isPhone = /^[0-9+]+$/.test(item.url);
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

      {/* Bottom Section */}
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
