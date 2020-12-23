import React from 'react';

function FavoriteIcon({type='normal', width = 24, height = 24 }) {

  let icon;
  if (type === 'normal') {
    icon = <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.38 15.71L6 19.94V4h12v15.94l-5.38-4.23-.62-.48-.62.48z" stroke="#B6BCBF" strokeWidth="2"/>
    </svg>
  } else if ( type === 'hover') {
    icon = <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.38 15.71L6 19.94V4h12v15.94l-5.38-4.23-.62-.48-.62.48z" stroke="#1A1B22" strokeWidth="2"/>
    </svg>
  } else if ( type === 'marked') {
      icon = <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4a1 1 0 011-1h12a1 1 0 011 1v18l-7-5.5L5 22V4z" fill="#2F71E5"/>
      </svg>
  }

  return (
    <>
    { icon }
    </>
  )
}

export default FavoriteIcon;