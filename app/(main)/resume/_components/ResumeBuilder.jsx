"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/app/lib/schema";
import { useFetch } from "@/hooks/useFetch";
import { saveResume } from "@/actions/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EntryField from "./EntryField";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewContent, setPreviewContent] = useState(initialContent);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialContent || {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch the form values to trigger updates
  const formValue = watch();

  useEffect(() => {
    console.log(initialContent);

    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
      setPreviewContent(saveResult);
    }
    if (saveError) {
      toast.error("Failed to save resume. Please try again.");
    }
  }, [saveResult, isSaving, saveError]);

  const onSubmit = async () => {
    try {
      const saved = await saveResumeFn(formValue);
      if (saved && saved.content) {
        // Parse the content if it's a string
        const content =
          typeof saved.content === "string"
            ? JSON.parse(saved.content)
            : saved.content;

        setPreviewContent(content);
        // reset(content);
        toast.success("Resume saved successfully!");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume.");
    }
  };

  const generatePDF = async () => {
    // Validation code remains the same
    const requiredFields = [
      formValue.contactInfo?.email,
      formValue.contactInfo?.mobile,
      formValue.summary,
    ];
    if (requiredFields.some((field) => !field || field.trim() === "")) {
      toast.error(
        "Please fill in your email, phone number, and professional summary before downloading the PDF."
      );
      return;
    }

    try {
      setIsGenerating(true);
      const node = document.getElementById("resume-pdf");
      if (!node) {
        toast.error("Resume preview is not available. Please check your form.");
        return;
      }

      // Create a clone without scaling for better position control
      const cloned = node.cloneNode(true);
      // Apply fixed dimensions matching A4 paper
      const style = {
        width: "210mm",
        height: "297mm",
        margin: 0,
        padding: "20mm",
        position: "absolute",
        left: "-9999px", // Hide the element
        top: 0,
        backgroundColor: "#fff",
        boxSizing: "border-box",
      };

      Object.assign(cloned.style, style);
      document.body.appendChild(cloned);

      // Use a more reliable image capture with better quality settings
      const dataUrl = await domtoimage.toPng(cloned, {
        quality: 1,
        bgcolor: "#fff",
        width: cloned.offsetWidth,
        height: cloned.offsetHeight,
      });

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Add image to PDF - centered
      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);
      pdf.save("resume.pdf");

      // Clean up
      document.body.removeChild(cloned);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col mb-4 sm:mb-0 sm:items-center justify-between space-y-4">
        <h1 className="text-5xl md:text-6xl gradient-title font-bold mb-4">
          Resume Builder
        </h1>
        <div className="space-x-2">
          <Button
            variant={"destructive"}
            className={"cursor-pointer"}
            disabled={isSaving}
            onClick={onSubmit}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className={"cursor-pointer"}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="edit" className={"cursor-pointer transition-all duration-300 ease-in-out"}>Edit</TabsTrigger>
          <TabsTrigger value="preview" className={"cursor-pointer transition-all duration-300 ease-in-out"}>Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <form className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    {...register("contactInfo.email")}
                    type={"email"}
                    placeholder="Enter your email"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-red-500 text-sm">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type={"tel"}
                    placeholder="Enter your phone number"
                    error={errors.contactInfo?.mobile}
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-red-500 text-sm">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium">
                    Linkedin Profile
                  </label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type={"url"}
                    placeholder="Enter your Linkedin profile URL"
                    error={errors.contactInfo?.linkedin}
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-red-500 text-sm">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="twitter"
                    placeholder="Enter your twitter/X profile URL"
                    className="text-sm font-medium"
                  >
                    Twitter/X Profile
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type={"url"}
                    placeholder="Enter your Twitter profile URL"
                    error={errors.contactInfo?.twitter}
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-red-500 text-sm">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write a brief summary about yourself"
                    className="h-32"
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-red-500 text-sm">{errors.summary.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="List your skills, separated by commas"
                    className="h-32"
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryField
                    type="experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryField
                    type="education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-red-500 text-sm">
                  {errors.education.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryField
                    type="projects"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-red-500 text-sm">
                  {errors.projects.message}
                </p>
              )}
            </div>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          <Card
            id="resume-pdf"
            className="bg-white text-black shadow-none border-none"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Arial, sans-serif",
              fontSize: "12pt",
              margin: "0 auto",
            }}
          >
            <CardContent className="p-0">
              {/* ===== Header ===== */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">
                  {formValue.contactInfo?.name}
                </h1>
                <p className="text-sm">
                  {formValue.contactInfo?.email} |{" "}
                  {formValue.contactInfo?.mobile}
                </p>
                {formValue.contactInfo?.linkedin && (
                  <p className="text-sm">
                    <Link
                      href={formValue.contactInfo.linkedin}
                      className="text-blue-600 underline"
                    >
                      {formValue.contactInfo.linkedin}
                    </Link>
                  </p>
                )}
                {formValue.contactInfo?.twitter && (
                  <p className="text-sm">
                    <Link
                      href={formValue.contactInfo.twitter}
                      className="text-blue-600 underline"
                    >
                      {formValue.contactInfo.twitter}
                    </Link>
                  </p>
                )}
              </div>

              {/* ===== Summary ===== */}
              {formValue.summary && (
                <section className="mb-6 border-t pt-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Professional Summary
                  </h2>
                  <p>{formValue.summary}</p>
                </section>
              )}
              {/* ===== Skills ===== */}
              {formValue.skills && (
                <section className="mb-6 border-t pt-4">
                  <h2 className="text-lg font-semibold mb-2">Skills</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {formValue.skills.split(",").map((skill, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{skill.trim()}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ===== Experience ===== */}
              {formValue.experience?.length > 0 && (
                <section className="mb-6 border-t pt-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Work Experience
                  </h2>
                  {formValue.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-base">
                        {exp.title} @ {exp.company}
                      </h3>
                      <p className="text-sm italic text-gray-600">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </p>
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* ===== Education ===== */}
              {formValue.education?.length > 0 && (
                <section className="mb-6 border-t pt-4">
                  <h2 className="text-lg font-semibold mb-2">Education</h2>
                  {formValue.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-base">{edu.degree}</h3>
                      <p className="italic text-sm text-gray-600">
                        {edu.institution}
                      </p>
                      <p className="text-sm italic text-gray-600">
                        {edu.startDate} – {edu.endDate || "Present"}
                      </p>
                      <p>{edu.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* ===== Projects ===== */}
              {formValue.projects?.length > 0 && (
                <section className="mb-4 border-t pt-4">
                  <h2 className="text-lg font-semibold mb-2">Projects</h2>
                  {formValue.projects.map((proj, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-base">{proj.title}</h3>
                      {proj.link && (
                        <p className="text-sm">
                          <Link
                            href={proj.link}
                            className="text-blue-600 underline"
                          >
                            {proj.link}
                          </Link>
                        </p>
                      )}
                      <p>{proj.description}</p>
                    </div>
                  ))}
                </section>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ResumeBuilder;
