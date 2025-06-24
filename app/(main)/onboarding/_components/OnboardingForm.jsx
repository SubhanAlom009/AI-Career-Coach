"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { updateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function OnBoardingForm({ industries }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const {
    data: updateResult,
    loading: updateLoading,
    fn: updateUserFn,
  } = useFetch(updateUser);

  const onSubmit = async (data) => {
    try {
      const formattedIndustry = `${data.industry}-${data.subIndustry}.toLowerCase().replace(/\s+/g, "-")`;

      await updateUserFn({
        ...data,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred while submitting the form.");
      return;
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile updated successfully!");
      reset();
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateLoading, updateResult]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className={"w-full max-w-lg mt-10 mx-2 shadow-lg"}>
        <CardHeader>
          <CardTitle className={"gradient-title text-4xl"}>
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Label htmlFor="industry" className="text-lg font-base mb-2">
                Industry
              </Label>
              <Select
                onValueChange={(value) => {
                  return (
                    setValue("industry", value),
                    setSelectedIndustry(
                      industries.find((ind) => ind.id === value)
                    ),
                    setValue("subIndustry", "")
                  );
                }}
              >
                <SelectTrigger id="industry" className={"w-full"}>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-4">
                <Label htmlFor="subIndustry" className="text-lg font-base mb-2">
                  Specialization
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className={"w-full"}>
                    <SelectValue placeholder="Select a subIndustry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <Label htmlFor="experiance" className="text-lg font-base mb-2">
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter your years of experience"
                {...register("experience")}
              />

              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="skills" className="text-lg font-base mb-2">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="e.g. JavaScript, React, Node.js"
                {...register("skills")}
              />
              <p className="text-muted-foreground">
                Separate multiple skills with commas
              </p>

              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="bio" className="text-lg font-base mb-2">
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                className={"h-32"}
                placeholder="Tell us about you professional background"
                {...register("bio")}
              />

              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4 cursor-pointer"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Complete Onboarding"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnBoardingForm;
