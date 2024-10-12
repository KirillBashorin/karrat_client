'use client';

import React, { PropsWithChildren, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface FadeOutProps extends PropsWithChildren {
  className: string;
  as?: 'li' | 'div';
  delay?: number;
}

const FadeOut = forwardRef<HTMLElement, FadeOutProps>(({ className, children, as = 'div', delay }, ref) => {
  const motionProps = {
    className,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    transition: {
      duration: 1,
      delay: delay,
      ease: 'easeInOut',
    },
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  if (as === 'li') {
    return (
      <motion.li ref={ref as React.Ref<HTMLLIElement>} {...motionProps}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div ref={ref as React.Ref<HTMLDivElement>} {...motionProps}>
      {children}
    </motion.div>
  );
});

FadeOut.displayName = 'FadeOut';

export default FadeOut;
