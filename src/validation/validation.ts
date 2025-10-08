import { z } from "zod";

export const clubApplicationSchema = z.object({
  clubName: z.string().min(2, "Club name must be at least 2 characters"),
  clubPurpose: z.string().min(10, "Purpose must be at least 10 characters"),
  university: z.string().min(1, "Select a university"),
  clubEmail: z.string().email("Invalid club email"),
  clubPhone: z
    .string()
    .regex(/^\+880\s?\d{1,4}\d{4,6}$/, "Invalid Bangladeshi phone number"),
  applicantName: z.string().min(2, "Applicant name is required"),
  applicantEmail: z.string().email("Invalid applicant email"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
});
export type ClubApplicationSchema = z.infer<typeof clubApplicationSchema>;
