import { NextRequest, NextResponse } from 'next/server'
import { getCaseByName } from '@/lib/db-helpers'

export const dynamic = 'force-dynamic'

interface RouteContext {
  params: {
    caseName: string
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const caseName = decodeURIComponent(context?.params?.caseName ?? '')
    
    if (!caseName) {
      return NextResponse.json(
        { error: 'Case name is required' },
        { status: 400 }
      )
    }
    
    const caseData = await getCaseByName(caseName)
    
    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ case: caseData })
  } catch (error: any) {
    console.error(`Error fetching case:`, error)
    return NextResponse.json(
      { error: error?.message ?? 'Failed to fetch case' },
      { status: 500 }
    )
  }
}
