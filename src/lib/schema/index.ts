import { z } from 'zod'

export const fortuneSchema = z.object({
	patronName: z.string()
});