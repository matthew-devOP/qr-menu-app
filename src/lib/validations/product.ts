import { z } from 'zod'

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    nameEn: z.string().optional(),
    description: z.string().optional(),
    descriptionEn: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    oldPrice: z.number().min(0).optional().nullable(),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    categoryId: z.string().min(1, 'Category is required'),
    subcategoryId: z.string().optional().nullable(),
    isAvailable: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    allergens: z.array(z.string()).default([]),
    nutrition: z.record(z.string(), z.any()).default({}),
})

export type ProductInput = z.infer<typeof productSchema>
