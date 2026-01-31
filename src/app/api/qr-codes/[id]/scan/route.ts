import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/qr-codes/[id]/scan - Increment scan count
export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    // Check if QR code exists
    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
    })

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR code not found' },
        { status: 404 }
      )
    }

    // Increment scan count
    const updated = await prisma.qRCode.update({
      where: { id: params.id },
      data: {
        scans: qrCode.scans + 1,
        lastScanned: new Date(),
      },
    })

    return NextResponse.json({ success: true, scans: updated.scans })
  } catch (error) {
    console.error('Error tracking QR scan:', error)
    return NextResponse.json(
      { error: 'Failed to track scan' },
      { status: 500 }
    )
  }
}
