import React from 'react';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  fill?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = '',
  fill = false
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{
        fontSize: pixelSize,
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0"
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
