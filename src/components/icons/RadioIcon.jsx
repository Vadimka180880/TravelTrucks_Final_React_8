import React from 'react';

const RadioIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="20"
    height="20"
    {...props}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#101828" strokeWidth="1.2" />
    <circle cx="8" cy="12" r="1.6" fill="#101828" />
    <path d="M12 9h6M12 12h6" stroke="#101828" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default RadioIcon;
