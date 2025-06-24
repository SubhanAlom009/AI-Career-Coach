import { getResume } from "@/actions/resume";
import React from "react";
import ResumeBuilder from "./_components/ResumeBuilder";

async function ResumePage() {
  const resume = await getResume();
  return (
    <div className="container mx-auto px-4">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}

export default ResumePage;
