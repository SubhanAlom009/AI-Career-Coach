"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFetch } from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QuizResult from "./QuizResult";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(""));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz result saved successfully!");
      console.log(resultData);
  
    } catch (error) {
      console.error("Error saving quiz result:", error);
      toast.error(
        error.message || "Failed to save quiz result. Please try again."
      );
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  //   Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mt-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className={"mt-4"}>
        <CardHeader>
          <CardTitle>Ready to test your knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This quiz contains 10 technical interview questions tailored to your
            skills and industry.
          </p>
        </CardContent>
        <CardFooter>
          <Button className={"w-full cursor-pointer"} onClick={generateQuizFn}>
            {generatingQuiz ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading quiz...
              </>
            ) : (
              "Start Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className={"mt-4"}>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium mb-4">{question.question}</p>
        <RadioGroup
          defaultValue="option-one"
          value={answers[currentQuestion]}
          onValueChange={handleAnswer}
        >
          {question.options.map((option, index) => {
            return (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-lg">
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        {showExplanation ? (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="text-lg font-semibold">Explanation:</h3>
            <p>{question.explanation}</p>
          </div>
        ) : (
          <Button
            className="mt-4 cursor-pointer"
            disabled={!answers[currentQuestion]}
            onClick={() => setShowExplanation(true)}
          >
            Show Explanation
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            className={"cursor-pointer"}
            disabled={currentQuestion === 0}
            onClick={() => (
              setCurrentQuestion(currentQuestion - 1), setShowExplanation(false)
            )}
          >
            Previous
          </Button>
          <Button
            className={"cursor-pointer"}
            disabled={!answers[currentQuestion] || savingResult}
            onClick={handleNext}
          >
            {savingResult && (
              <Loader2 className="mr-2" width={100} color="gray" />
            )}
            {currentQuestion < quizData.length - 1 ? "Next" : "Submit Quiz"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Quiz;
