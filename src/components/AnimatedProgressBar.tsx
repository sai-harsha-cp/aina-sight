import { useEffect, useState } from 'react';

interface AnimatedProgressBarProps {
  value: number;
  className?: string;
  delay?: number;
}

export function AnimatedProgressBar({ value, className = '', delay = 0 }: AnimatedProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${className}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
