import { z } from "zod";

export const AnalyzeOutputSchema = z.object({
	hobbies: z.array(z.string()),
	interests: z.array(z.string()),
	problems: z.array(z.string()),
	personalities: z.array(z.string()),
	summary: z.string(),
	otherObservations: z.array(z.string()),
});

export type AnalyzeOutput = z.infer<typeof AnalyzeOutputSchema>;
