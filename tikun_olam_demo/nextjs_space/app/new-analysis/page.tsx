'use client'

import { useState } from 'react'
import { Sparkles, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NewAnalysisPage() {
  const router = useRouter()
  const [caseName, setCaseName] = useState('')
  const [scenario, setScenario] = useState('')
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    
    if (!caseName?.trim?.() || !scenario?.trim?.()) {
      setError('Please fill in all fields')
      return
    }

    setStatus('processing')
    setError('')
    setProgress(0)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseName: caseName?.trim?.(), scenario: scenario?.trim?.() }),
      })

      if (!response?.ok) {
        throw new Error(`Analysis failed: ${response?.statusText ?? 'Unknown error'}`)
      }

      const reader = response?.body?.getReader?.()
      const decoder = new TextDecoder()
      let buffer = ''
      let partialRead = ''

      while (true) {
        const { done, value } = await reader?.read?.() ?? { done: true, value: undefined }
        if (done) break

        partialRead += decoder?.decode?.(value, { stream: true }) ?? ''
        let lines = partialRead?.split?.('\n') ?? []
        partialRead = lines?.pop?.() ?? ''

        for (const line of lines ?? []) {
          if (line?.startsWith?.('data: ')) {
            const data = line?.slice?.(6)
            if (data === '[DONE]') {
              setStatus('completed')
              return
            }
            
            try {
              const parsed = JSON.parse(data ?? '{}')
              if (parsed?.status === 'processing') {
                setProgress((prev) => Math.min(prev + 2, 95))
              } else if (parsed?.status === 'completed') {
                setResult(parsed?.result ?? null)
                setStatus('completed')
                setProgress(100)
                
                // Redirect to demo cases after 2 seconds
                setTimeout(() => {
                  router?.push?.('/demo-cases')
                }, 2000)
                return
              } else if (parsed?.status === 'error') {
                throw new Error(parsed?.message ?? 'Analysis failed')
              }
            } catch (e) {
              console.error('Parse error:', e)
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Analysis error:', err)
      setStatus('error')
      setError(err?.message ?? 'An error occurred during analysis')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">New Analysis</h1>
          </div>
          <p className="text-lg text-purple-300">
            Submit your scenario for comprehensive ethical analysis through the 10 Sefirot framework
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case Name */}
          <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Case Name
            </label>
            <input
              type="text"
              value={caseName}
              onChange={(e) => setCaseName(e?.target?.value ?? '')}
              placeholder="e.g., AI_Ethics_Healthcare"
              disabled={status === 'processing'}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
            <p className="text-xs text-gray-400 mt-2">
              Use underscores instead of spaces (e.g., My_Case_Name)
            </p>
          </div>

          {/* Scenario */}
          <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Scenario Description
            </label>
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e?.target?.value ?? '')}
              placeholder="Describe your ethical dilemma or decision scenario in detail...\n\nInclude:\n- Context and background\n- Key stakeholders\n- Ethical questions\n- Potential implications"
              disabled={status === 'processing'}
              rows={12}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 font-mono text-sm"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === 'processing' || !caseName?.trim?.() || !scenario?.trim?.()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'processing' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing... {progress}%
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Start Analysis
              </>
            )}
          </Button>
        </form>

        {/* Status Messages */}
        {status === 'processing' && (
          <div className="mt-6 bg-blue-950/30 border border-blue-700/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Processing Analysis</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Running comprehensive ethical analysis through all 10 Sefirot modules.
                  This may take 2-3 minutes...
                </p>
                <div className="w-full bg-slate-900/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="mt-6 bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Analysis Complete!</h3>
                <p className="text-sm text-gray-300">
                  Your analysis has been successfully completed. Redirecting to results...
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && error && (
          <div className="mt-6 bg-red-950/30 border border-red-700/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Analysis Failed</h3>
                <p className="text-sm text-gray-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-slate-900/30 border border-slate-700/30 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-purple-300 mb-3">What happens during analysis?</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Your scenario is evaluated through all 10 Sefirot perspectives</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>BinahSigma performs multi-civilizational analysis (Western vs Eastern)</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Comprehensive synthesis provides actionable recommendations</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Results are saved and accessible from the Demo Cases section</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
