import { getAssessments } from "@/actions/interview";
import React from "react";
import StatsCard from "./_components/StatsCard";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";

async function InterviewPage() {

  const assessments = await getAssessments();

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-6xl gradient-title font-bold ">
          Interview Preparation
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Get ready for your next technical interview with our AI-powered quiz
          generator.
        </p>
      </div>
      <div>
        <StatsCard assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}

export default InterviewPage;
