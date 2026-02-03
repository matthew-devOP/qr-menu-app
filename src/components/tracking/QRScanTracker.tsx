'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * QRScanTracker - Invisible component that tracks QR code scans
 * 
 * Reads the `qr` query parameter from the URL and sends a tracking
 * request to increment the scan count for the corresponding QR code.
 * 
 * This component should be mounted in the root layout.
 */
export function QRScanTracker() {
    const searchParams = useSearchParams()
    const hasTracked = useRef(false)

    useEffect(() => {
        const qrLocation = searchParams.get('qr')

        // Only track once per page load and only if qr param exists
        if (!qrLocation || hasTracked.current) {
            return
        }

        hasTracked.current = true

        // Send tracking request (fire and forget)
        fetch('/api/qr-codes/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: qrLocation }),
        }).catch((error) => {
            // Silently fail - tracking is non-critical
            console.debug('QR tracking failed:', error)
        })
    }, [searchParams])

    // This component renders nothing
    return null
}
