import MainContainer from "@/components/container/MainContainer";
import { FaFacebookF, FaMessage } from "react-icons/fa6";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import Link from "next/link";
import { SocialLink } from "@/types/helpline/helpline";
import Image from "next/image";

const ConactComponents = ({ helpline }: { helpline: SocialLink[] }) => {
  return (
    <div className="mt-5 py-5 px-3 shadow">
      <MainContainer>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 text-white">
          <div className="bg-gray-800 p-5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
            <h6 className="text-[18px] uppercase font-medium text-[var(--custom-orange)]">
              Stay with us
            </h6>
            <div className="flex items-center gap-2 mt-3">
              {helpline.map((item, index) => {
                const isPhone = /^[0-9+]+$/.test(item.url);
                const isTelegram = item.url.includes("t.me");
                const href = isPhone ? `tel:${item.url}` : item.url;
                return (
                  <a
                    key={index}
                    href={href}
                    className="size-12 p-0.5 rounded border border-gray-300 text-white shadow-lg"
                    title={item.name}
                    target={isPhone ? "_self" : "_blank"}
                    rel={isPhone ? undefined : "noopener noreferrer"}
                  >
                    <Image
                      className="size-full rounded"
                      src={`${process.env.NEXT_PUBLIC_MAIN_BASE}/${item.image}`}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                  </a>
                );
              })}
            </div>
            {/* <div className="flex items-center gap-2 mt-3">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded bg-blue-500 p-2 flex items-center justify-center"
              >
                <FaFacebookF className="text-white size-full" />
              </a>
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded bg-red-500 p-2 flex items-center justify-center"
              >
                <FaYoutube className="text-white size-full" />
              </a>
              <a
                href="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded bg-green-500 p-2 flex items-center justify-center"
              >
                <FaWhatsapp className="text-white size-full" />
              </a>
            </div> */}
          </div>

          <div className="bg-gray-800 p-5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
            <h6 className="text-[18px] uppercase font-medium text-[var(--custom-orange)]">
              Contact Us
            </h6>
            <ul className="space-y-1 mt-3 text-white">
              <li className="flex items-center gap-2">
                <FaMessage className="size-4" />
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--custom-orange)] cursor-pointer"
                >
                  Click to chat with us!
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdCall className="size-4" />
                <a
                  href="tel:015356987458"
                  className="hover:text-[var(--custom-orange)] cursor-pointer"
                >
                  015356987458
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IoMail className="size-4" />
                <a
                  href="mailto:support@gmpapa.com"
                  className="hover:text-[var(--custom-orange)] cursor-pointer"
                >
                  support@gmpapa.com
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
            <h6 className="text-[18px] uppercase font-medium text-[var(--custom-orange)]">
              Information
            </h6>
            <ul className="space-y-1 mt-3 text-white">
              <Link href="review">
                <li className="flex items-center gap-2 hover:text-[var(--custom-orange)] cursor-pointer">
                  <IoIosCheckmark className="size-4" />
                  <span>Customer Reviews</span>
                </li>
              </Link>
              <Link href="policy">
                <li className="flex items-center gap-2 hover:text-[var(--custom-orange)] cursor-pointer">
                  <IoIosCheckmark className="size-4" />
                  <span>Refund Policy</span>
                </li>
              </Link>
              <Link href="/privacy-policy">
                <li className="flex items-center gap-2 hover:text-[var(--custom-orange)] cursor-pointer">
                  <IoIosCheckmark className="size-4" />
                  Privecy Policy
                </li>
              </Link>
              <Link href="/terms-and-conditions">
                <li className="flex items-center gap-2 hover:text-[var(--custom-orange)] cursor-pointer">
                  <IoIosCheckmark className="size-4" />
                  Terms and Conditions
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default ConactComponents;
