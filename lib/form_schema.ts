import { z } from "zod";

export const TimeSchema = z.object({
  activity: z
    .string()
    .min(1, { message: "Activity name must not be empty" }),
  durationH: z.string().min(1, { message: "Hours must not be empty" }),
  durationM: z.string().min(1, { message: "Minutes must not be empty" }),
  durationS: z.string().min(1, { message: "Seconds must not be empty" }),
  categoryID: z.string().min(1, { message: "Category must not be empty" }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Category name must not be empty" }),
});
