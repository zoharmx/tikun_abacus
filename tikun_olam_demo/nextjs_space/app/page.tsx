import Link from 'next/link'
import { Database, Sparkles, Target, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Get case count
  const caseCount = await prisma.case.count().catch(() => 0)
  const sefirotCount = await prisma.sefirotResult.count().catch(() => 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                  <span className="text-white font-bold text-3xl">ת</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-white tracking-tight">
              Framework <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Tikun Olam</span>
            </h1>
            
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Computational ethical analysis system based on the 10 Sefirot of Kabbalah.
              Evaluate complex decisions from multiple ethical, strategic, and pragmatic perspectives.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/demo-cases">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/50">
                  <Database className="w-5 h-5 mr-2" />
                  View Demo Cases
                </Button>
              </Link>
              <Link href="/new-analysis">
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-950/50">
                  <Sparkles className="w-5 h-5 mr-2" />
                  New Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-purple-400 text-sm font-semibold mb-2">DEMO CASES</div>
            <div className="text-4xl font-bold text-white">{caseCount ?? 0}</div>
            <p className="text-purple-300 text-sm mt-2">Pre-calculated analyses available</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-blue-400 text-sm font-semibold mb-2">SEFIROT ANALYSES</div>
            <div className="text-4xl font-bold text-white">{sefirotCount ?? 0}</div>
            <p className="text-blue-300 text-sm mt-2">Individual perspective analyses</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-emerald-400 text-sm font-semibold mb-2">ANALYSIS DEPTH</div>
            <div className="text-4xl font-bold text-white">10</div>
            <p className="text-emerald-300 text-sm mt-2">Sefirot evaluation modules</p>
          </div>
        </div>
      </div>

      {/* Sefirot Overview */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">The 10 Sefirot System</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Keter', hebrew: 'כתר', desc: 'Ethical Validation', color: 'purple' },
            { name: 'Chochmah', hebrew: 'חכמה', desc: 'Deep Reasoning', color: 'blue' },
            { name: 'Binah', hebrew: 'בינה', desc: '9D Analysis', color: 'emerald' },
            { name: 'Chesed', hebrew: 'חסד', desc: 'Opportunities', color: 'cyan' },
            { name: 'Gevurah', hebrew: 'גבורה', desc: 'Risks & Constraints', color: 'red' },
            { name: 'Tiferet', hebrew: 'תפארת', desc: 'Synthesis', color: 'amber' },
            { name: 'Netzach', hebrew: 'נצח', desc: 'Implementation', color: 'violet' },
            { name: 'Hod', hebrew: 'הוד', desc: 'Communication', color: 'pink' },
            { name: 'Yesod', hebrew: 'יסוד', desc: 'Integration', color: 'indigo' },
            { name: 'Malchut', hebrew: 'מלכות', desc: 'Action Plan', color: 'teal' },
          ]?.map?.((sefira, idx) => (
            <div
              key={sefira?.name ?? `sefira-${idx}`}
              className={`bg-gradient-to-br from-${sefira?.color ?? 'purple'}-900/30 to-slate-900/30 border border-${sefira?.color ?? 'purple'}-500/30 rounded-lg p-5 backdrop-blur-sm hover:border-${sefira?.color ?? 'purple'}-500/60 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{sefira?.name}</h3>
                  <p className={`text-${sefira?.color ?? 'purple'}-400 text-2xl font-bold`}>{sefira?.hebrew}</p>
                </div>
                <span className={`text-xs font-semibold text-${sefira?.color ?? 'purple'}-400 bg-${sefira?.color ?? 'purple'}-950/50 px-2 py-1 rounded`}>
                  {idx + 1}
                </span>
              </div>
              <p className="text-sm text-gray-400">{sefira?.desc}</p>
            </div>
          )) ?? null}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 border border-purple-500/30 rounded-2xl p-12 text-center backdrop-blur-sm">
          <Target className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Analyze Your Scenario?
          </h2>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Submit your ethical dilemma and receive comprehensive analysis from all 10 Sefirot perspectives,
            including multi-civilizational BinahSigma insights.
          </p>
          <Link href="/new-analysis">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/50">
              Start New Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
