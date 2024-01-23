import numbro from "numbro";
import React from "react";

interface ProgressIndicatorProps {
  completion: number; // expects a value between 0 and 100
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  completion,
}) => {
  const radius = 50; // radius of the circle
  const stroke = 10; // width of the stroke
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completion / 100) * circumference;

  return (
    <div className='flex items-center justify-center'>
      <svg
        height={radius * 2}
        width={radius * 2}
        className='transform -rotate-90'
      >
        <circle
          stroke='blue'
          fill='transparent'
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className='transition-all duration-350 ease-linear'
        />
      </svg>
      <span className='absolute text-lg font-extrabold text-blue-700 font-mono'>
        {numbro(completion).format({ mantissa: 0 })}%
      </span>
    </div>
  );
};

export default ProgressIndicator;
