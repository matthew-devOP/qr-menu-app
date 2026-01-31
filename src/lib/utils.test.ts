import { cn, formatPrice, slugify } from './utils'

describe('Utils', () => {
    describe('cn', () => {
        it('should merge classes', () => {
            expect(cn('w-full', 'p-4')).toBe('w-full p-4')
        })
        it('should handle conditional classes', () => {
            expect(cn('w-full', true && 'p-4', false && 'm-4')).toBe('w-full p-4')
        })
    })

    describe('formatPrice', () => {
        it('should format price correctly', () => {
            const price = 123.45
            const formatted = formatPrice(price)
            expect(formatted).toContain('123,45')
            expect(formatted).toContain('RON')
        })
    })

    describe('slugify', () => {
        it('should slugify simple text', () => {
            expect(slugify('Hello World')).toBe('hello-world')
        })

        it('should handle diacritics correctly (transliteration)', () => {
            // Ideally "Meniul Zilei" -> "meniul-zilei"
            // "Ciorbă" -> "ciorba"
            const input = 'Ciorbă de Burtă'
            const expected = 'ciorba-de-burta'
            // Note: Current implementation might fail this if it strips diacritics
            expect(slugify(input)).toBe(expected)
        })
    })
})
