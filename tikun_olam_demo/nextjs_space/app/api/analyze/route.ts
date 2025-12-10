import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Mock analysis function - simulates the Python framework
// In production, this would call the actual Python TikunOrchestrator
async function mockAnalysis(caseName: string, scenario: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Create basic analysis structure
  const timestamp = new Date()
  
  // Create case in database
  const caseRecord = await prisma.case.create({
    data: {
      caseName,
      scenario,
      timestamp,
    },
  })
  
  // Create mock sefirot results
  const sefirotData = [
    { sefira: 'keter', number: 1, hebrew: 'כתר', score: 75 },
    { sefira: 'chochmah', number: 2, hebrew: 'חכמה', score: 80 },
    { sefira: 'binah', number: 3, hebrew: 'בינה', score: 85 },
    { sefira: 'chesed', number: 4, hebrew: 'חסד', score: 90 },
    { sefira: 'gevurah', number: 5, hebrew: 'גבורה', score: 70 },
    { sefira: 'tiferet', number: 6, hebrew: 'תפארת', score: 82 },
    { sefira: 'netzach', number: 7, hebrew: 'נצח', score: 78 },
    { sefira: 'hod', number: 8, hebrew: 'הוד', score: 88 },
    { sefira: 'yesod', number: 9, hebrew: 'יסוד', score: 85 },
    { sefira: 'malchut', number: 10, hebrew: 'מלכות', score: 92 },
  ]
  
  for (const sefira of sefirotData ?? []) {
    await prisma.sefirotResult.create({
      data: {
        caseId: caseRecord?.id,
        sefira: sefira?.sefira,
        sefirotNumber: sefira?.number,
        hebrewName: sefira?.hebrew,
        mainScore: sefira?.score,
        analysisData: {
          understanding: `Mock analysis for ${sefira?.sefira}`,
          reasoning: `This is a simulated analysis result.`,
        },
        modelUsed: 'gpt-4.1-mini',
      },
    })
  }
  
  return {
    caseName,
    completed: true,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.().catch(() => ({}))
    const caseName = body?.caseName ?? ''
    const scenario = body?.scenario ?? ''
    
    if (!caseName || !scenario) {
      return NextResponse.json(
        { error: 'Case name and scenario are required' },
        { status: 400 }
      )
    }
    
    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        try {
          // Send progress updates
          for (let i = 0; i < 10; i++) {
            const progressData = JSON.stringify({
              status: 'processing',
              message: `Analyzing through Sefirot ${i + 1}/10...`,
            })
            controller?.enqueue?.(encoder?.encode?.(`data: ${progressData}\n\n`))
            await new Promise(resolve => setTimeout(resolve, 300))
          }
          
          // Run analysis
          const result = await mockAnalysis(caseName, scenario)
          
          // Send completion
          const completionData = JSON.stringify({
            status: 'completed',
            result,
          })
          controller?.enqueue?.(encoder?.encode?.(`data: ${completionData}\n\n`))
          controller?.enqueue?.(encoder?.encode?.('data: [DONE]\n\n'))
        } catch (error: any) {
          const errorData = JSON.stringify({
            status: 'error',
            message: error?.message ?? 'Analysis failed',
          })
          controller?.enqueue?.(encoder?.encode?.(`data: ${errorData}\n\n`))
        } finally {
          controller?.close?.()
        }
      },
    })
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error?.message ?? 'Internal server error' },
      { status: 500 }
    )
  }
}
