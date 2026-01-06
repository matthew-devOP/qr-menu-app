import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/qr-codes - Get all QR codes
export async function GET() {
  try {
    const qrCodes = await prisma.qRCode.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(qrCodes)
  } catch (error) {
    console.error('Error fetching QR codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    )
  }
}

// POST /api/qr-codes - Create new QR code
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, location, url, isActive } = body

    // Validation
    if (!name || !location) {
      return NextResponse.json(
        { error: 'Name and location are required' },
        { status: 400 }
      )
    }

    // Get venue ID (assuming first venue)
    const venue = await prisma.venue.findFirst()

    if (!venue) {
      return NextResponse.json(
        { error: 'No venue found' },
        { status: 400 }
      )
    }

    // Generate URL if not provided
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const qrUrl = url || `${baseUrl}?qr=${location.toLowerCase().replace(/\s+/g, '-')}`

    const qrCode = await prisma.qRCode.create({
      data: {
        name,
        location,
        url: qrUrl,
        scans: 0,
        isActive: isActive !== undefined ? isActive : true,
        venueId: venue.id,
      },
    })

    return NextResponse.json(qrCode, { status: 201 })
  } catch (error) {
    console.error('Error creating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    )
  }
}
