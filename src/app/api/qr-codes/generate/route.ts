import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

// GET /api/qr-codes/generate?url=...&format=png&size=512
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const format = searchParams.get('format') || 'png'
    const size = parseInt(searchParams.get('size') || '512')

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    // Generate QR code
    if (format === 'svg') {
      const svg = await QRCode.toString(url, {
        type: 'svg',
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })

      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } else {
      // PNG format (default)
      const buffer = await QRCode.toBuffer(url, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })

      return new NextResponse(buffer as unknown as BodyInit, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
