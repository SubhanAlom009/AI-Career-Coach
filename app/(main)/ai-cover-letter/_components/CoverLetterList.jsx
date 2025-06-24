"use client";
import React from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { toast } from "sonner";

function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error deleting cover letter:", error);
      toast.error(
        "Failed to delete cover letter. Please try again." + error.message
      );
    }
  };

  return (
    <div>
      <div>
        {coverLetters.length > 0 ? (
          <div className="flex flex-col gap-4">
            {coverLetters.map((coverLetter) => (
              <Card
                key={coverLetter.id}
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {coverLetter.jobTitle} @ {coverLetter.companyName}
                      </CardTitle>
                      <CardDescription>
                        Created on{" "}
                        {format(new Date(coverLetter.createdAt), "PPP")}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <AlertDialog>
                        <Button
                          variant="outline"
                          size="icon"
                          className={"cursor-pointer"}
                          onClick={() =>
                            router.push(`/ai-cover-letter/${coverLetter.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className={"cursor-pointer"}
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Cover Letter?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your cover letter for{" "}
                              <span className="text-orange-500">
                                {coverLetter.jobTitle}
                              </span>{" "}
                              at{" "}
                              <span className="text-orange-500">
                                {coverLetter.companyName}
                              </span>
                              .
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(coverLetter.id)}
                              className={
                                "bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
                              }
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground text-sm line-clamp-3">
                    {coverLetter.jobDescription}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No cover letters found. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverLetterList;
