import React from 'react';

function TrashIcon({ width = 24, height = 24, fill = '#B6BCBF' }) {

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Иконка с изобажением корзины">
      <path fillRule="evenodd" clipRule="evenodd" d="M15 3H9v2H3v2h18V5h-6V3zM5 9v11c0 1.1.9 2 2 2h10a2 2 0 002-2V9h-2v11H7V9H5zm4 0v9h2V9H9zm4 0v9h2V9h-2z" fill={fill}/>
    </svg>
  )
}

export default TrashIcon;