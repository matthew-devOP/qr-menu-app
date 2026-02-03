import { z } from 'zod'
import { VALIDATION } from '@/lib/constants'

export const categorySchema = z.object({
    name: z
        .string()
        .min(VALIDATION.MIN_NAME_LENGTH, `Numele trebuie să aibă minim ${VALIDATION.MIN_NAME_LENGTH} caractere`)
        .max(VALIDATION.MAX_NAME_LENGTH, `Numele trebuie să aibă maxim ${VALIDATION.MAX_NAME_LENGTH} caractere`),
    nameEn: z.string().optional(),
    slug: z
        .string()
        .min(1, 'Slug-ul este obligatoriu')
        .regex(/^[a-z0-9-]+$/, 'Slug-ul poate conține doar litere mici, cifre și cratime'),
    description: z
        .string()
        .max(VALIDATION.MAX_DESCRIPTION_LENGTH, `Descrierea trebuie să aibă maxim ${VALIDATION.MAX_DESCRIPTION_LENGTH} caractere`)
        .optional(),
    descriptionEn: z.string().optional(),
    image: z.string().url('URL imagine invalid').optional().or(z.literal('')),
    isActive: z.boolean().default(true),
})

export const createCategorySchema = categorySchema

export const updateCategorySchema = categorySchema.partial()

export type CategoryInput = z.infer<typeof categorySchema>
