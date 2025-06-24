import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

function QuizResult({ result, hideStartNew = false, onStartNew }) {
  if (!result) {
    return null;
  }

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold gap-2 gradient-title flex items-center">
        <Trophy className="inline mr-2 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent>
        {/* score Overview */}
        <div className="flex flex-col items-center justify-center gap-4">
          <h3>{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full max-w-md" />
        </div>

        {/* Improvement tip */}
        {result.improvementTip && (
          <div className="mt-4 p-4 bg-muted rounded-lg border border-yellow-200">
            <h4 className="text-lg font-semibold">Improvement Tip:</h4>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            className="w-full cursor-pointer"
            onClick={onStartNew}
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}

export default QuizResult;
