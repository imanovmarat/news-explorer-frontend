import React from 'react';

function SignOut({ width = 24, height = 24, fill = '#1A1B22' }) {
  return (
    <svg width={width} height={height} role="img" aria-label="Иконка выхода из аккаунта">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 6H6v12h4v2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2h4v2zm7.59 7l-4.3 4.13 1.42 1.37 6.7-6.46-6.7-6.46-1.42 1.36 4.3 4.13H8V13h9.59z" fill={fill}/>
    </svg>
  )
}

export default SignOut;