import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Industry is required",
  }),
  subIndustry: z.string({
    required_error: "Sub-industry is required",
  }),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be a non-negative number")
        .max(50, "Experience must be at most 50 years")
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : []
  ),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Company is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z
      .string()
      .max(1000, "Description must be at most 1000 characters"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date must be provided unless this is your current position",
    }
  );

export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().max(500, "Summary must be at most 500 characters"),
  skills: z.string().min(1, "Skills are required"),
  experience: z.array(entrySchema),
  education: z.array(entrySchema),
  projects: z.array(entrySchema),
});


export const coverLetterSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  jobDescription: z.string().min(1, "Job description is required").max(2000, "Job description must be at most 2000 characters"),
})