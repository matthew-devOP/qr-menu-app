import { render, screen } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Enter text" />)
        const input = screen.getByPlaceholderText(/enter text/i)
        expect(input).toBeInTheDocument()
    })

    it('accepts custom className', () => {
        render(<Input className="custom-class" data-testid="input" />)
        const input = screen.getByTestId('input')
        expect(input.className).toContain('custom-class')
        expect(input.className).toContain('rounded-lg') // Base class
    })

    it('forwards refs', () => {
        const ref = { current: null }
        render(<Input ref={ref} />)
        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('renders disabled state', () => {
        render(<Input disabled />)
        const input = screen.getByRole('textbox')
        expect(input).toBeDisabled()
    })
})
