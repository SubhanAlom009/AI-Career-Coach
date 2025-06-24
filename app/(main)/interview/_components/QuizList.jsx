"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import QuizResult from "./QuizResult";

function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  return (
    <>
      <Card>
        <CardHeader
          className={"flex flex-row items-center justify-between gap-2"}
        >
          <div>
            <CardTitle className={"flex text-3xl lg:text-4xl"}>
              Recent Quizes
            </CardTitle>
            <CardDescription>Review your past quiz performance</CardDescription>
          </div>
          <Button
            onClick={() => router.push("/interview/mock")}
            className={"cursor-pointer"}
          >
            Start New Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div className={"space-y-4"}>
            {assessments.map((assessment, index) => (
              <Card
                key={assessment.id}
                className={"hover:bg-muted/50 transition-colors cursor-pointer"}
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader>
                  <CardTitle>Quiz {index + 1}</CardTitle>
                  <CardDescription className={"flex justify-between gap-2"}>
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {assessment.improvementTips}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Dialog for selected quiz details */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <QuizResult
              result={selectedQuiz}
              onStartNew={() => router.push("/interview/mock")}
              hideStartNew
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuizList;
