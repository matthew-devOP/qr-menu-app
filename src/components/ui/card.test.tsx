import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './card'

describe('Card', () => {
    it('renders correctly with children', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <button>Action</button>
                </CardFooter>
            </Card>
        )

        expect(screen.getByText('Card Title')).toBeInTheDocument()
        expect(screen.getByText('Card Content')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
    })

    it('accepts custom className', () => {
        render(<Card className="custom-card" data-testid="card" />)
        const card = screen.getByTestId('card')
        expect(card.className).toContain('custom-card')
    })
})
