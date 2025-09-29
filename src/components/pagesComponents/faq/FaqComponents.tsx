"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MainContainer from "@/components/container/MainContainer";

const faqs = [
  {
    question: "What is FreeFireBD?",
    answer:
      "FreeFireBD is a digital platform where users can purchase top-up packages for popular online games, streaming services, and digital platforms. It's fast, reliable, and secure.",
  },
  {
    question: "How do I top up my account?",
    answer:
      "Simply select the service you want to top up, enter your user ID or required details, choose a package, and complete the payment. The top-up will be processed shortly.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. We only collect the minimum required information like your user ID to process the top-up. Your account credentials or passwords are never requested or stored.",
  },
  {
    question: "What payment options do you offer?",
    answer:
      "We support multiple local payment methods including mobile banking and digital wallets. You’ll see all available options during checkout.",
  },
  {
    question: "When will I receive my top-up?",
    answer:
      "Most orders are completed within a few seconds to a few minutes. If there’s any delay, you can contact our support team for immediate help.",
  },
];

const FaqComponents = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full py-5 px-3 text-white">
      <MainContainer>
        <div className="md:w-3/5 w-full mx-auto">
          <h6 className="text-center text-[24px]">{`Faq's`}</h6>
          <div className="mx-auto grid divide-y divide-gray-200 mt-10">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default FaqComponents;

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-0">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between text-left cursor-pointer py-5"
        aria-expanded={isOpen}
      >
        <h3 className="text font-medium py-2">{question}</h3>
        <span className="ml-2 flex-shrink-0">
          <ChevronDown
            className={cn(
              "h-6 w-6 transition-transform duration-300",
              isOpen ? "rotate-180 transform" : ""
            )}
          />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "py-2 opacity-100 max-h-[1000px]" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-base pr-6">{answer}</p>
      </div>
    </div>
  );
}
