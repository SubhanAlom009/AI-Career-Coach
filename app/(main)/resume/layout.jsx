import React, { Suspense } from 'react'
import { DotLoader } from "react-spinners";

function layout({children}) {
  return (
    <div className='container mx-auto px-4'>
      <Suspense fallback={<DotLoader className='h-6 w-6' width={100} color='gray' />}>
        {children}
      </Suspense>
    </div>
  )
}

export default layout
