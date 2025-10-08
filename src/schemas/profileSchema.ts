import z from "zod";

const memberProfileUpdateZodSchema =z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  studentId: z.string().optional(),
  department: z.string().optional(),
  university: z.string().optional(),
  bloodGroup: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  year: z.string().optional(),
  semester: z.string().optional(),
  interestedIn: z.array(z.string()).optional(),
  profile: z.string().optional(),
})


const clubBasicInformationZodSchema = z.object({
      clubName: z.string().optional(),
      clubTitle: z.string().optional(),
      clubPurpose: z.string().optional(),
      clubDescription: z.string().optional(),
      clubPhone: z.string().optional(),
      establishedYear: z.string().optional(),
      categories: z.array(z.string()).optional(),
      clubWorkingAreas: z.array(z.string()).optional(),
      socialLinks: z.object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        youtube: z.string().optional(),
      }),
})

export const zodSchemas = {
  memberProfileUpdateZodSchema,
  clubBasicInformationZodSchema,
}