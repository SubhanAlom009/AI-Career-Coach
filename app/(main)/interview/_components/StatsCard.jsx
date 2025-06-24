import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy } from "lucide-react";
import React from "react";

function StatsCard({ assessments }) {
  const getAverageScore = () => {
    if (!assessments || assessments.length === 0) return 0;

    const total = assessments.reduce((sum, assessment) => {
      // Assuming each assessment has a 'score' property
      return sum + (assessment.quizScore || 0);
    }, 0);

    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className={"flex flex-row justify-between items-center"}>
          <CardTitle>Average Score</CardTitle>
          <Trophy className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div>
            <span className={`font-bold text-3xl`}>{getAverageScore()}%</span>
            <p className="text-muted-foreground text-sm">
              Average score across all assessments
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className={"flex flex-row justify-between items-center"}>
          <CardTitle>Questions Practiced</CardTitle>
          <Brain className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div>
            <span className={`font-bold text-3xl`}>{getTotalQuestions()}</span>
            <p className="text-muted-foreground text-sm">Total Questions</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className={"flex flex-row justify-between items-center"}>
          <CardTitle>Latest Score</CardTitle>
          <Trophy className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div>
            <span className={`font-bold text-3xl`}>
              {getLatestAssessment()?.quizScore || 0}%
            </span>
            <p className="text-muted-foreground text-sm">
              Most recent assessment score
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCard;
