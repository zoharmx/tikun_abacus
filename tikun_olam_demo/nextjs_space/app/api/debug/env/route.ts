import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const envStatus = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      ABACUSAI_API_KEY: !!process.env.ABACUSAI_API_KEY,
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      DEEPSEEK_API_KEY: !!process.env.DEEPSEEK_API_KEY,
      MISTRAL_API_KEY: !!process.env.MISTRAL_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      // Show first/last 4 chars of DATABASE_URL for debugging (safe)
      DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 15) + '...',
    }

    return NextResponse.json({
      status: 'Environment variables check',
      env: envStatus,
      allEnvVarsPresent: Object.entries(envStatus).every(([key, val]) =>
        key === 'NODE_ENV' || key === 'DATABASE_URL_PREFIX' || val === true
      )
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Failed to check env vars' },
      { status: 500 }
    )
  }
}
