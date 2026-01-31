import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })

    it('handles click events', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies variant classes', () => {
        render(<Button variant="destructive">Delete</Button>)
        const button = screen.getByRole('button', { name: /delete/i })
        expect(button.className).toContain('bg-state-error')
    })

    it('renders as child component when asChild is true', () => {
        // Testing slot functionality indirectly
        render(<Button asChild><a href="/link">Link</a></Button>)
        const link = screen.getByRole('link', { name: /link/i })
        expect(link).toHaveAttribute('href', '/link')
        expect(link.className).toContain('inline-flex') // Inherits button styles
    })
})
