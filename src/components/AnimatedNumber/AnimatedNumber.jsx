import { useEffect, useState, useRef } from 'react';

function AnimatedNumber({ target, speed = 20 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    }, {
      threshold: 0.5,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let current = 0 ;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, speed);

    return () => clearInterval(interval);
  }, [hasAnimated, target, speed]);

  return <span ref={ref}>{count}+</span>;
}

export default AnimatedNumber;
