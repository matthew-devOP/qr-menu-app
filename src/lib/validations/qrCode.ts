import { z } from 'zod'

export const qrCodeSchema = z.object({
    name: z.string().min(1, 'Numele este obligatoriu').max(100, 'Numele trebuie să aibă maxim 100 caractere'),
    targetUrl: z.string().url('URL invalid'),
    tableNumber: z.string().optional(),
    location: z.string().optional(),
    isActive: z.boolean().default(true),
    customColors: z
        .object({
            foreground: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Culoarea trebuie să fie în format hex'),
            background: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Culoarea trebuie să fie în format hex'),
        })
        .optional(),
})

export const createQrCodeSchema = qrCodeSchema

export const updateQrCodeSchema = qrCodeSchema.partial()

export type QrCodeInput = z.infer<typeof qrCodeSchema>
