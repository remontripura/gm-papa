"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { SlEarphonesAlt } from "react-icons/sl";
import { cn } from "@/lib/utils";
import { SocialLink } from "@/types/helpline/helpline";
import Image from "next/image";
import { useSocialLinksStore } from "@/lib/store/socialStore/socialStore";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
});

export const ThemeProvider = ({
  children,
  helpLine,
}: {
  children: ReactNode;
  helpLine: SocialLink[];
}) => {
  const theme: Theme = "dark";
  const { setSocialLinks } = useSocialLinksStore();
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setSocialLinks(helpLine);
  }, [helpLine, setSocialLinks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
      <div className="fixed md:right-12 right-5 md:bottom-12 bottom-5 z-30 flex flex-col items-end gap-2">
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-300 ${
            modalOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }`}
        >
          {helpLine.map((item, index) => {
            const isPhone = /^[0-9+]+$/.test(item.url);
            // const isTelegram = item.url.includes("t.me");
            const href = isPhone ? `tel:${item.url}` : item.url;

            return (
              <a
                key={index}
                href={href}
                className="size-12 p-1 rounded-full border border-gray-300 text-white shadow-lg"
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
        <button
          onClick={() => setModalOpen((prev) => !prev)}
          className={cn(
            "size-12 p-3 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all cursor-pointer",
            animate && "animate-bounce"
          )}
          title="Support"
        >
          <SlEarphonesAlt className={cn(modalOpen && "rotate-45")} size={24} />
        </button>
      </div>
    </ThemeContext.Provider>
  );
};
