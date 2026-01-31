import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/qr-codes/[id] - Get single QR code
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
    })

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR code not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(qrCode)
  } catch (error) {
    console.error('Error fetching QR code:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR code' },
      { status: 500 }
    )
  }
}

// PUT /api/qr-codes/[id] - Update QR code
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, location, url, isActive } = body

    // Check if QR code exists
    const existing = await prisma.qRCode.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'QR code not found' },
        { status: 404 }
      )
    }

    const qrCode = await prisma.qRCode.update({
      where: { id: params.id },
      data: {
        name: name || existing.name,
        location: location || existing.location,
        url: url || existing.url,
        isActive: isActive !== undefined ? isActive : existing.isActive,
      },
    })

    return NextResponse.json(qrCode)
  } catch (error) {
    console.error('Error updating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    )
  }
}

// DELETE /api/qr-codes/[id] - Delete QR code
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    await prisma.qRCode.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting QR code:', error)
    return NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    )
  }
}
