'use client';

import { LandmarkCardProps } from '@/utils/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import OtherInfo from './OtherInfo';

const Hero = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {landmarks.map((landmark, index: number) => (
        <SwiperSlide className="group" key={index}>
          <div className="relative rounded-md overflow-hidden">
            <Image
              src={landmark.image}
              alt={landmark.name || 'Landmark image'}
              width={800}
              height={300}
              className="w-full h-[600px] object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 z-50">
              <div className="col-span-4 mb-4 flex h-full flex-1 justify-end px-5 md:mb-4 md:justify-end md:px-10">
                <OtherInfo landmark={landmark} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Hero;
