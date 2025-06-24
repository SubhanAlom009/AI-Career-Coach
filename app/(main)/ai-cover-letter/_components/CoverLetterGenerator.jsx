"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateCoverLetter } from "@/actions/cover-letter";
import { zodResolver } from "@hookform/resolvers/zod";
import { coverLetterSchema } from "@/app/lib/schema";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateCoverLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);


  useEffect(()=>{
    if(generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  },[generatedLetter])

  const onSubmit = async (data) => {
    try {
      await generateCoverLetterFn(data);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast.error(
        "Failed to generate cover letter. Please try again." + error.message
      );
    }
  };

  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide information about the job you are applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-red-500 text-sm">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                className={"w-full h-24"}
                placeholder="Enter job description"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-red-500 text-sm">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>
            <div className={"flex justify-end"}>
              <Button
                type="submit"
                disabled={generating}
                className={"cursor-pointer"}
              >
                {generating ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CoverLetterGenerator;
