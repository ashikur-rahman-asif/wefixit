import { z } from "zod";

export const gradeSchema = z.object({
  name: z.string().min(1, "Grade name is required"),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export type GradeFormData = z.infer<typeof gradeSchema>;
