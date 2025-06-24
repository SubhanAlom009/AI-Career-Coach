import React from 'react'

function layout({children}) {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
      {children}
    </div>
  )
}

export default layout
