"use client";

import React from 'react'
import MDEditor from '@uiw/react-md-editor'

function CoverLetterPreview({content}) {
  return (
    <div className='py-6'>
      <MDEditor value={content} preview="preview" height={700} />
    </div>
  )
}

export default CoverLetterPreview
