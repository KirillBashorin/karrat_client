'use client';

import React, { FC, useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import { ObjectPreview } from '@/components/common';
import { ObjectType } from '@/types';
import { Button } from '@/components/ui';

import styles from './ObjectsGrid.module.scss';

interface ObjectsGridProps {
  objects: ObjectType[];
}

const ObjectsGrid: FC<ObjectsGridProps> = ({ objects }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isShowNavigation, setIsShowNavigation] = useState(false);

  const updateShowNavigation = () => {
    const swiper = swiperRef.current;

    if (!swiper) return;

    const slidesPerView = swiper.params.slidesPerView;

    if (typeof slidesPerView !== 'number') return;

    const rows = swiper.params.grid?.rows;
    const totalVisibleSlides = slidesPerView * (rows || 1);
    setIsShowNavigation(objects.length > totalVisibleSlides);
  };

  useEffect(() => {
    updateShowNavigation();
  }, [objects.length]);

  return (
    <div className={styles.root}>
      <Swiper
        className={styles.swiper}
        modules={[Grid, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        slidesPerGroup={2}
        grid={{ fill: 'row', rows: 4 }}
        pagination={{ type: 'fraction' }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          768: {
            grid: { fill: 'row', rows: 3 },
            spaceBetween: 36,
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            grid: { fill: 'row', rows: 3 },
            spaceBetween: 36,
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {objects &&
          objects.length > 0 &&
          objects.map(item => (
            <SwiperSlide key={item.title}>
              <ObjectPreview object={item} isSmall={true} />
            </SwiperSlide>
          ))}
        {isShowNavigation && (
          <div className={styles.navigation}>
            <Button
              className={styles.prev}
              onClick={() => swiperRef.current?.slidePrev()}
              isTransparent={true}
              disabled={isBeginning}
            >
              <ArrowCircleIcon />
              Previous
            </Button>
            <Button
              className={styles.next}
              onClick={() => swiperRef.current?.slideNext()}
              isTransparent={true}
              disabled={isEnd}
            >
              Next
              <ArrowCircleIcon />
            </Button>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default ObjectsGrid;
