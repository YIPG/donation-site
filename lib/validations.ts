import { z } from 'zod'

export const donationSchema = z.object({
  amount: z
    .number()
    .min(100, '最低金額は100円です')
    .max(1000000, '最高金額は1,000,000円です')
})

export type DonationFormData = z.infer<typeof donationSchema>