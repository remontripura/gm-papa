import MainContainer from "@/components/container/MainContainer";
import { MdVerified } from "react-icons/md";
import { Ri24HoursFill } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const content = [
  {
    title: "100% Secure and Legit Transactions",
    description:
      "FreeFireBD partners with trusted top-up service providers and official gaming platforms to ensure every transaction is secure and authentic. Your account and data are always protected, giving you peace of mind with every purchase.",
  },
  {
    title: "Professional & Friendly Customer Support",
    description:
      "Our dedicated support team at FreeFireBD is always ready to assist you. We provide quick, patient, and professional help in multiple languages so you can get the answers you need before or after any top-up.",
  },
  {
    title: "Your Trusted Gaming Top-Up Center",
    description:
      "FreeFireBD offers fast, easy, and reliable gaming top-up services at competitive prices. We are committed to delivering a seamless recharge experience so you can enjoy your favorite games without any hassle.",
  },
];

const WhyChooseUsPage = () => {
  return (
    <section className="py-12">
      <MainContainer className="px-2">
        <h2 className="font-semibold text-[18px]">Why Choose FreeFireBD</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-5">
          {content.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-[#2B304C] rounded-md flex items-start gap-3"
            >
              <div className="">
                {index === 0 ? (
                  <MdVerified className="w-12 h-12" />
                ) : index === 1 ? (
                  <Ri24HoursFill className="w-12 h-12" />
                ) : (
                  <VscWorkspaceTrusted className="w-12 h-12" />
                )}
              </div>
              <div>
                <h6 className="font-semibold text-[18px]">{item.title}</h6>
                <p className="text-[14px] text-primary_text mt-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
};
export default WhyChooseUsPage;
