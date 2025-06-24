import React, { Suspense } from 'react'
import { DotLoader } from "react-spinners";

function layout({children}) {
  return (
    <div className='px-5'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='text-6xl gradient-title'>Industry Insights</h1>
        </div>
      <Suspense fallback={<DotLoader className='h-6 w-6' width={100} color='gray' />}>
        {children}
      </Suspense>
    </div>
  )
}

export default layout
