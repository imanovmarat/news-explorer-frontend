import React from 'react';

function NotFoundNews({...rest}) {
  return (
    <svg {...rest} width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="Иконка с увеличительной лупой">
      <circle cx="43" cy="43" r="36.5" stroke="#D1D2D6"/>
      <path d="M69 69l19.5 19.5M58.33 55.96A19.95 19.95 0 0043.16 49c-6.06 0-11.5 2.7-15.16 6.96" stroke="#D1D2D6"/>
      <circle cx="55.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
      <circle cx="30.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
    </svg>
  )
}

export default NotFoundNews;