import { z } from 'zod'

export const fortuneSchema = z.object({
	patron: z.string()
});