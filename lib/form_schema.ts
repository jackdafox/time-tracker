import { z } from "zod";

export const TimeSchema = z.object({
    activity: z.string(),
    durationH: z.string(),
    durationM: z.string(),
    durationS: z.string(),
    categoryID: z.string(),
});

export const CategorySchema = z.object({
    name: z.string()
})
