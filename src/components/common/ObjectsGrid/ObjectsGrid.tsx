'use client';

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';

import { ObjectPreview } from '@/components/common';
import { ObjectType } from '@/types';

import styles from './ObjectsGrid.module.scss';

interface ObjectsGridProps {
  objects: ObjectType[];
}

const ObjectsGrid: FC<ObjectsGridProps> = ({ objects }) => {
  return (
    <Swiper
      className={styles.root}
      modules={[Grid]}
      spaceBetween={16}
      slidesPerView={2}
      grid={{ fill: 'row', rows: 2 }}
      breakpoints={{
        768: {
          spaceBetween: 36,
          slidesPerView: 3,
        },
        1024: {
          spaceBetween: 36,
          slidesPerView: 4,
        },
      }}
    >
      {objects &&
        objects.length > 0 &&
        objects.map(item => (
          <SwiperSlide key={item.title}>
            <ObjectPreview object={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ObjectsGrid;
