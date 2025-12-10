import { notFound } from 'next/navigation'
import { getCaseByName } from '@/lib/db-helpers'
import { SefirotCard } from '@/components/sefirot-card'
import { BinahSigmaViz } from '@/components/binah-sigma-viz'
import { Calendar, Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SEFIROT_ORDER } from '@/lib/constants'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    caseName: string
  }
}

export default async function CaseDetailPage({ params }: PageProps) {
  const caseName = decodeURIComponent(params?.caseName ?? '')
  const caseData = await getCaseByName(caseName)

  if (!caseData) {
    notFound()
  }

  // Organize sefirot by order
  const sefirotByKey = Object.fromEntries(
    caseData?.sefirotResults?.map?.(r => [r?.sefira, r]) ?? []
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/demo-cases">
          <Button variant="ghost" className="mb-6 text-purple-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Demo Cases
          </Button>
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-xl p-8 mb-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white mb-4">
            {caseData?.caseName?.replace(/_/g, ' ') ?? 'Case Analysis'}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-purple-300 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(caseData?.timestamp ?? Date.now()).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>{caseData?.sefirotResults?.length ?? 0} Sefirot Analyzed</span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h3 className="text-sm font-semibold text-purple-300 mb-2">Scenario</h3>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {caseData?.scenario}
            </p>
          </div>
        </div>

        {/* BinahSigma Analysis */}
        {caseData?.binahSigma && (
          <div className="mb-8">
            <BinahSigmaViz data={caseData?.binahSigma} />
          </div>
        )}

        {/* Sefirot Results */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">10 Sefirot Analysis</h2>
          
          {SEFIROT_ORDER?.map?.((sefira) => {
            const result = sefirotByKey?.[sefira]
            if (!result || !result?.analysisData) return null
            
            return (
              <SefirotCard
                key={result?.id ?? sefira}
                sefira={sefira}
                data={result?.analysisData}
              />
            )
          }) ?? null}
        </div>
      </div>
    </div>
  )
}
