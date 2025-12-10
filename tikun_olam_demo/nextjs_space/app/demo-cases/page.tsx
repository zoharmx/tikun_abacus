import Link from 'next/link'
import { ArrowRight, Calendar, FileText } from 'lucide-react'
import { getAllCases } from '@/lib/db-helpers'
import { Button } from '@/components/ui/button'
import { SEFIROT_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default async function DemoCasesPage() {
  const cases = await getAllCases()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Demo Cases</h1>
          <p className="text-lg text-purple-300">
            Explore pre-calculated analyses from the Framework Tikun Olam
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cases?.map?.((caseData) => {
            const sefirotCount = caseData?.sefirotResults?.length ?? 0
            const hasBinahSigma = !!caseData?.binahSigma
            const avgScore = caseData?.sefirotResults?.reduce?.((acc, r) => acc + (r?.mainScore ?? 0), 0) / (sefirotCount || 1)
            
            return (
              <Link
                key={caseData?.id ?? 'case'}
                href={`/demo-cases/${encodeURIComponent(caseData?.caseName ?? '')}`}
                className="block"
              >
                <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20">
                  {/* Case Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {caseData?.caseName?.replace(/_/g, ' ') ?? 'Untitled Case'}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-purple-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(caseData?.timestamp ?? Date.now()).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{sefirotCount} Sefirot</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>

                  {/* Scenario Preview */}
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {caseData?.scenario?.substring?.(0, 200) ?? ''}...
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">Avg Score</div>
                      <div className="text-lg font-bold text-white">
                        {avgScore?.toFixed?.(1) ?? '0'}
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">BinahSigma</div>
                      <div className="text-lg font-bold text-white">
                        {hasBinahSigma ? '✓' : '–'}
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">Bias Delta</div>
                      <div className="text-lg font-bold text-white">
                        {caseData?.binahSigma?.biasDelta?.toFixed?.(0) ?? '–'}%
                      </div>
                    </div>
                  </div>

                  {/* Sefirot Preview */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caseData?.sefirotResults?.slice?.(0, 6)?.map?.((result) => {
                      const info = SEFIROT_INFO[result?.sefira as keyof typeof SEFIROT_INFO]
                      return (
                        <div
                          key={result?.id ?? 'result'}
                          className="text-xs px-2 py-1 rounded bg-purple-950/50 text-purple-300 border border-purple-700/30"
                        >
                          {info?.hebrew ?? result?.hebrewName}
                        </div>
                      )
                    }) ?? null}
                    {(caseData?.sefirotResults?.length ?? 0) > 6 && (
                      <div className="text-xs px-2 py-1 rounded bg-slate-800/50 text-gray-400">
                        +{(caseData?.sefirotResults?.length ?? 0) - 6} more
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          }) ?? null}
        </div>

        {/* Empty State */}
        {(!cases || cases?.length === 0) && (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No demo cases available</h3>
            <p className="text-gray-500 mb-6">Run the seed script to populate demo data</p>
            <Link href="/new-analysis">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Create New Analysis
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
