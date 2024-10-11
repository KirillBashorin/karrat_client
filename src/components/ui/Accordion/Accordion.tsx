'use client';
import React, { FC, useState } from 'react';

import AccordionItem from './AccordionItem';
import styles from './Accordion.module.scss';

interface AccordionProps {
  items: {
    title: string;
    text: string;
  }[];
}

const Accordion: FC<AccordionProps> = ({ items }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);

  const handleClick = (index: number) => {
    if (index === currentItemIndex) {
      setCurrentItemIndex(-1);
      return;
    }

    setCurrentItemIndex(index);
  };

  return (
    <ul className={styles.root}>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <AccordionItem
            isOpened={currentItemIndex === index}
            onClick={() => handleClick(index)}
            title={item.title}
            text={item.text}
            key={item.title}
          />
        ))}
    </ul>
  );
};

export default Accordion;
