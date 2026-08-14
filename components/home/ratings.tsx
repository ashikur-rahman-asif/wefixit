"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AmazonIcon } from "../icons/amazon-icon";
import { AppleIcon } from "../icons/apple-icon";
import { FacebookIcon } from "../icons/facebook-icon";
import { GoogleIcon } from "../icons/google-icon";
import { MicrosoftIcon } from "../icons/microsoft-icon";
import { TrustpilotIcon } from "../icons/trustpilot-icon";
import { TwitterIcon } from "../icons/twitter-icon";
import { YelpIcon } from "../icons/yelp-icon";
import { StarRating } from "../ui/star-rating";

const ratingsData = [
  { name: "Apple", Icon: AppleIcon, rating: "4.8" },
  { name: "Google", Icon: GoogleIcon, rating: "4.9" },
  { name: "Facebook", Icon: FacebookIcon, rating: "4.7" },
  { name: "Microsoft", Icon: MicrosoftIcon, rating: "4.8" },
  { name: "Amazon", Icon: AmazonIcon, rating: "4.9" },
  { name: "Twitter", Icon: TwitterIcon, rating: "4.6" },
  { name: "Trustpilot", Icon: TrustpilotIcon, rating: "4.8" },
  { name: "Yelp", Icon: YelpIcon, rating: "4.7" },
];

export function Ratings() {
  return (
    <section className="bg-white overflow-hidden">
      <style>{`
        .ratings-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
      <div className="w-full px-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          slidesPerView="auto"
          spaceBetween={30}
          breakpoints={{
            768: {
              spaceBetween: 50,
            },
          }}
          className="ratings-swiper">
          {ratingsData.map((item, idx) => {
            const IconComponent = item.Icon;
            return (
              <SwiperSlide
                key={idx}
                className="w-auto! flex! items-center justify-center">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 select-none shrink-0">
                  <IconComponent className="size-12 sm:size-14 md:size-16 text-black shrink-0 object-contain" />
                  <div className="flex flex-col">
                    <p className="text-lg text-textGray font-bold leading-8">
                      {item.name} Rating
                    </p>
                    <span className="flex items-center gap-3 sm:gap-4 md:gap-5">
                      <p className="text-gold text-2xl font-extrabold">
                        {item.rating}
                      </p>
                      <StarRating
                        rating={Number(item.rating)}
                        starClassName="size-[16px] sm:size-[18px] md:size-[20px]"
                      />
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
