import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import CoverLetterGenerator from "../_components/CoverLetterGenerator";

function page() {
  return (
    <div>
      <div>
        <Link href="/ai-cover-letter">
          <Button variant={"outline"} className="gap-2 pl-0 mb-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
        <div>
          <h1 className="text-6xl font-bold gradient-title">
            Create Cover Letter
          </h1>
          <p className="text-sm text-muted-foreground">
            Generate a tailored cover letter for your job application
          </p>
        </div>
      </div>
      <CoverLetterGenerator />
    </div>
  );
}

export default page;
