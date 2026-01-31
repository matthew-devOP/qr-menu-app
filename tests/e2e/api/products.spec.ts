import { test, expect } from '@playwright/test'

test.describe('API /api/products', () => {
    test('GET returns products list', async ({ request }) => {
        const response = await request.get('/api/products')
        expect(response.ok()).toBeTruthy()
        const data = await response.json()
        expect(Array.isArray(data)).toBeTruthy()
    })

    test('POST without auth returns 401', async ({ request }) => {
        const response = await request.post('/api/products', {
            data: {
                name: 'Test Product',
                price: 100,
                categoryId: 'test-cat'
            }
        })
        expect(response.status()).toBe(401)
    })

    // Note: To test success, we'd need to mock Auth or seed a session.
    // For now, testing 401 proves the endpoint is reachable.
})
