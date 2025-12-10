import { NextResponse } from 'next/server'
import { getAllCases } from '@/lib/db-helpers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cases = await getAllCases()
    return NextResponse.json({ cases })
  } catch (error: any) {
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: error?.message ?? 'Failed to fetch cases' },
      { status: 500 }
    )
  }
}
