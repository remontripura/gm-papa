"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import MainContainer from "@/components/container/MainContainer";
import { useRef, useState } from "react";
import { SliderResponse } from "@/types/bannerType/bannerType";
import Link from "next/link";

const items = Array.from({ length: 6 }).map((_, i) => `Item ${i}`);

export default function Banner({
  bannerImage,
}: {
  bannerImage: SliderResponse;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  // Check if slide is active (middle)
  const isSlideActive = (slideRealIndex: number) => {
    if (!swiperRef.current) return false;
    return slideRealIndex === swiperRef.current.realIndex;
  };

  // Determine if slide is left or right side slide
  const getSlideSide = (slideRealIndex: number) => {
    if (!swiperRef.current) return null;
    const realIndex = swiperRef.current.realIndex;
    const slidesCount = items.length;

    const leftIndex = (realIndex - 1 + slidesCount) % slidesCount;
    const rightIndex = (realIndex + 1) % slidesCount;

    if (slideRealIndex === leftIndex) return "left";
    if (slideRealIndex === rightIndex) return "right";
    return null;
  };

  return (
    <section>
      <MainContainer className="px-3 mt-3">
        <div
          className="relative"
          onMouseLeave={() => setHoverSide(null)} // hide nav when mouse leaves swiper area
        >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            navigation={{
              nextEl: ".banner-next-btn",
              prevEl: ".banner-prev-btn",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1, centeredSlides: false, spaceBetween: 10 },
              768: {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 20,
              },
            }}
            onSlideChange={() => setHoverSide(null)} // reset hover on slide change
          >
            {bannerImage.sliderImages.map((item, index) => {
              const side = getSlideSide(index);
              const active = isSlideActive(index);

              return (
                <SwiperSlide
                  key={index}
                  className="relative group"
                  style={{ width: "100%", maxWidth: "800px" }}
                  onMouseEnter={() => {
                    if (side) setHoverSide(side);
                    else setHoverSide(null);
                  }}
                  // onMouseLeave removed here to avoid flicker, wrapper handles it
                >
                  <Link href={item.link}>
                    <div className="relative w-full md:w-[250px] first:md:w-auto overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MAIN_BASE}/${item.images_url}`}
                        alt="banner"
                        width={800}
                        height={500}
                        className="object-cover w-full md:h-[300px] h-[180px] rounded-lg"
                      />
                      {/* Shadow only on side slides, not middle */}
                      <div
                        className={`hidden md:block absolute inset-0 bg-black/50 transition-all duration-300 ease-in-out ${
                          active
                            ? "opacity-0"
                            : "opacity-40 group-hover:opacity-70"
                        }`}
                      ></div>
                    </div>{" "}
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Left Navigation Button */}
          <button
            className={`banner-prev-btn absolute z-20 p-2 rounded-full bg-orange-500 text-white transition-all duration-300 ease-in-out hidden md:block ${
              hoverSide === "left"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
            style={{ top: "50%", left: "80px", transform: "translateY(-50%)" }}
            onMouseEnter={() => setHoverSide("left")} // keep nav visible while hovering nav btn
            onMouseLeave={() => setHoverSide(null)}
          >
            <GoArrowRight className="rotate-180" />
          </button>

          {/* Right Navigation Button */}
          <button
            className={`banner-next-btn absolute z-20 p-2 rounded-full bg-orange-500 text-white transition-all duration-300 ease-in-out hidden md:block ${
              hoverSide === "right"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
            style={{ top: "50%", right: "80px", transform: "translateY(-50%)" }}
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <GoArrowRight />
          </button>

          {/* Pagination */}
          {/* <div className="banner-pagination flex justify-center"></div> */}
        </div>
      </MainContainer>
    </section>
  );
}
