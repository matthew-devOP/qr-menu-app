import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
    await page.goto('/')

    // Check that the page title or content contains expected text
    // Adjust based on actual content
    await expect(page).toHaveTitle(/Infinity Lounge/i)
})
