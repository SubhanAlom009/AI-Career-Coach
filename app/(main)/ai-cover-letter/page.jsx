

import { getCoverLetters } from '@/actions/cover-letter'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import CoverLetterList from './_components/CoverLetterList';

async function AICoverLetter() {

  const coverLetters = await getCoverLetters();
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 sm:items-center sm:justify-between mb-5">
        <h1 className='text-6xl font-bold gradient-title '>My Cover Letters</h1>
        <Link href="/ai-cover-letter/new" >
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  )
}

export default AICoverLetter
