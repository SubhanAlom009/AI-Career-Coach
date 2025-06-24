import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/Quiz'

function MockInterviewPage() {
  return (
    <div className='container mx-auto px-4'>
      <div>
        <Link href="/interview" className="hover:underline">
          <Button variant="outline" className="mb-4 cursor-pointer" >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Interview preparation
          </Button>
        </Link>
        <div>
          <h1 className="text-6xl font-bold gradient-title">Mock Interview</h1>
          <p className="text-muted-foreground">
            Practice your interview skills with our mock interview feature. 
            Answer questions and receive feedback to improve your performance.
          </p>
        </div>
      </div>
      <Quiz />
    </div>
  )
}

export default MockInterviewPage
