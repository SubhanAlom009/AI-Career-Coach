import React from 'react'

function MainLayout({children}) {
    // if the user alrdy finished onboarding we dnt need to redirect them to onboarding page
    // if they haven't we redirect them to onboarding page
    
  return (
    <div className='container mx-auto mb-20 mt-24'>
      {children}
    </div>
  )
}

export default MainLayout
