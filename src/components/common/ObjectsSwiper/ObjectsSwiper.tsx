'use client';

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { ObjectPreview } from '@/components/common';

import styles from './ObjectsSwiper.module.scss';

import type { ObjectType } from '@/types';

interface ObjectsSwiperProps {
  objects: ObjectType[];
}

const ObjectsSwiper: FC<ObjectsSwiperProps> = ({ objects }) => {
  return (
    <Swiper
      className={styles.root}
      modules={[Pagination]}
      spaceBetween={24}
      slidesPerView={'auto'}
      pagination={{ clickable: true }}
      breakpoints={{
        768: {
          spaceBetween: 36,
        },
      }}
    >
      {objects &&
        objects.length > 0 &&
        objects.map(item => (
          <SwiperSlide key={item.title}>
            <ObjectPreview className={styles.preview} object={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ObjectsSwiper;
