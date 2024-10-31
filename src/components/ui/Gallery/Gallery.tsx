'use client';

import React, { FC, useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';

import styles from './Gallery.module.scss';

import type { Swiper as SwiperType } from 'swiper';

interface GalleryProps {
  images: string[];
}

const Gallery: FC<GalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isThumbnailClick, setIsThumbnailClick] = useState(false); // Флаг для отслеживания кликов по миниатюрам
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbnailsSwiperRef = useRef<SwiperType | null>(null);

  const goToSlide = (index: number, swiperRef: SwiperType) => {
    if (!swiperRef) return;

    swiperRef.slideTo(index);
    setActiveIndex(index);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);

    if (!thumbnailsSwiperRef.current) return;

    if (isThumbnailClick) {
      setIsThumbnailClick(false);
      return;
    }

    goToSlide(swiper.activeIndex, thumbnailsSwiperRef.current);
  };

  const handleThumbnailClick = (index: number) => {
    if (!mainSwiperRef.current) return;

    setIsThumbnailClick(true);
    goToSlide(index, mainSwiperRef.current);
  };

  return (
    <div>
      <Swiper
        className={styles.mainSwiper}
        spaceBetween={16}
        slidesPerView={1}
        onSlideChangeTransitionEnd={handleSlideChange}
        onSwiper={swiper => (mainSwiperRef.current = swiper)}
      >
        {images &&
          images.length > 0 &&
          images.map((item, index) => (
            <SwiperSlide key={item + index + '-gm'}>
              <Image className={styles.image} src={item} width={300} height={200} alt={' '} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        spaceBetween={6}
        slidesPerView={5}
        breakpoints={{
          1024: {
            slidesPerView: 6,
          },
        }}
        onSwiper={swiper => (thumbnailsSwiperRef.current = swiper)}
      >
        {images &&
          images.length > 0 &&
          images.map((item, index) => (
            <SwiperSlide onClick={() => handleThumbnailClick(index)} key={item + index + '-gt'}>
              <Image
                className={clsx(styles.thumbnail, index === activeIndex && styles.activeThumbnail)}
                src={item}
                width={300}
                height={200}
                alt={' '}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
