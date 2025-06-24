import { getCoverLetter } from "@/actions/cover-letter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import CoverLetterPreview from "../_components/CoverLetterPreview";

async function CoverLetter({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);
  return (
    <div>
      <div>
        <Link href="/ai-cover-letter">
          <Button
            variant={"outline"}
            className="gap-2 pl-0 mb-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
          <h1 className="text-5xl font-bold gradient-title">
            {coverLetter?.jobTitle} @ {coverLetter?.companyName}
          </h1>
      </div>
      <CoverLetterPreview content={coverLetter.content} />
    </div>
  );
}

export default CoverLetter;
