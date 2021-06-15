import React from 'react';

function MenuIcon({ width = 24, height = 24, fill = '#ffffff' }) {
  return (
    <svg  width={ width } height={ height } xmlns='http://www.w3.org/2000/svg' fill={ fill } >
      <path d='M4 8h16v2H4zM4 14h16v2H4z'/>
    </svg>
  )
}

export default MenuIcon;