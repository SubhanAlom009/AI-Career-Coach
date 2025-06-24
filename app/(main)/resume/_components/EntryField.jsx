"use client";

import { entrySchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import { format, parse } from "date-fns";


const formatDisplayDate = (dataString)=>{
  if(!dataString) return "";
  const date = parse(dataString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
}

function EntryField({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  const handleAdd = handleValidation((data) => {
    const formattedData = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate)
    }
    onChange([...entries, formattedData]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = async (entry) => {
    const updatedEntries = entries.filter((e) => e !== entry);
    onChange(updatedEntries);
    toast.success(`${type} entry deleted successfully!`);
  };

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error("Failed to improve description. Please try again.");
    }
  }, [improvedContent, improveError, isImproving]);

  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.warning("Please enter a description before improving it.");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type,
    });
  };

  const current = watch("current");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {entries.map((entry, index) => {
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>
                  {entry.organization} - {entry.startDate}{" "}
                  {entry.endDate && `to ${entry.endDate}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{entry.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => handleDelete(entry)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add {type}</CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  {...register("title")}
                  placeholder="Title/Position"
                  errors={errors.title}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("organization")}
                  placeholder="organization/company"
                  errors={errors.organization}
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="month"
                  {...register("startDate")}
                  errors={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  errors={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center cursor-pointer gap-2">
              <input
                id="current"
                type={"checkbox"}
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", ""); // Clear end date if current
                  }
                }}
              />
              <label htmlFor="current">current {type}</label>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder={`Description of your ${type}`}
                {...register("description")}
                className={"h-24"}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant={"ghost"}
              size={"sm"}
              className={"cursor-pointer"}
              disabled={isImproving || !watch("description")}
              onClick={handleImproveDescription}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className={"gap-2 flex justify-end"}>
            <Button
              type="button"
              variant={"outline"}
              className={"cursor-pointer"}
              onClick={() => (reset(), setIsAdding(false))}
            >
              Cancle
            </Button>
            <Button
              type="button"
              className={"cursor-pointer"}
              onClick={handleAdd}
            >
              <PlusCircle className="h-4 w-4" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          variant={"outline"}
          className={"w-full cursor-pointer"}
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Add {type}
        </Button>
      )}
    </div>
  );
}

export default EntryField;
