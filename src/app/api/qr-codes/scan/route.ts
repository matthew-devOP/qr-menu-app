import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/qr-codes/scan - Increment scan count by location slug
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { location } = body

        if (!location) {
            return NextResponse.json(
                { error: 'Location is required' },
                { status: 400 }
            )
        }

        // Normalize location slug (convert spaces/underscores to dashes, lowercase)
        const normalizedLocation = location
            .toLowerCase()
            .replace(/[\s_]+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

        // Find QR code by location (try multiple patterns)
        const qrCode = await prisma.qRCode.findFirst({
            where: {
                OR: [
                    { location: { equals: location, mode: 'insensitive' } },
                    { location: { equals: normalizedLocation, mode: 'insensitive' } },
                    { location: { contains: location, mode: 'insensitive' } },
                ],
                isActive: true,
            },
        })

        if (!qrCode) {
            // Log but don't error - could be direct access without QR
            console.log(`QR code not found for location: ${location}`)
            return NextResponse.json({ success: true, tracked: false })
        }

        // Increment scan count
        const updated = await prisma.qRCode.update({
            where: { id: qrCode.id },
            data: {
                scans: qrCode.scans + 1,
                lastScanned: new Date(),
            },
        })

        return NextResponse.json({
            success: true,
            tracked: true,
            scans: updated.scans,
            location: qrCode.location,
        })
    } catch (error) {
        console.error('Error tracking QR scan:', error)
        // Don't fail the request - tracking is non-critical
        return NextResponse.json({ success: true, tracked: false })
    }
}
