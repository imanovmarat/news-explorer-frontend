import React from 'react';

function CloseIcon({ width = '24px', height = '24px', fill = '#ffffff' }) {
  return (
    <svg role="img" aria-label="Крестик, кнопка закрытия меню или модального окна" viewBox={`0 0 24 24`} width={width} height={height} xmlns='http://www.w3.org/2000/svg' fill={fill} >
      <path d='M13.41 12L18 16.59A1 1 0 0116.59 18l-5.4-5.39a.86.86 0 010-1.22L16.6 6A1 1 0 1118 7.41L13.41 12z'/>
      <path d='M10.88 12l-4.59 4.59A1 1 0 007.71 18l5.39-5.39a.86.86 0 000-1.22L7.7 6a1 1 0 00-1.4 1.41L10.87 12z'/>
    </svg>
  )
}

export default CloseIcon;