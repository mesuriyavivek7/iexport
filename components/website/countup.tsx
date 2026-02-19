"use client"
import React from 'react'
import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  duration?: number; 
}

const Countup = ({end, duration= 1500}: Props) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const progress = Math.min(
              (currentTime - startTime) / duration,
              1
            );

            const value = Math.floor(progress * end);
            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <h1 ref={ref} className='text-6xl font-bold text-white '>{count}+</h1>
  )
}

export default Countup