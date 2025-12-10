'use client'

import { SEFIROT_INFO, SefirotKey } from '@/lib/constants'
import { SefirotGauge } from './sefirot-gauge'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface SefirotCardProps {
  sefira: string
  data: any
  defaultExpanded?: boolean
}

export function SefirotCard({ sefira, data, defaultExpanded = false }: SefirotCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const info = SEFIROT_INFO[sefira as SefirotKey]
  
  if (!info || !data) return null
  
  const mainScore = (data?.mainScore ?? data?.[info?.scoreKey] ?? 0) * (sefira === 'keter' ? 100 : 1)
  
  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-purple-500/30 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div>
              <SefirotGauge value={mainScore} color={info?.color ?? '#9333EA'} size={100} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-white">{info?.name}</h3>
                <span className="text-3xl text-purple-400">{info?.hebrew}</span>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">{info?.description}</p>
              
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-gray-500">Score: </span>
                  <span className="text-white font-bold">{mainScore?.toFixed?.(1) ?? '0'}</span>
                </div>
                {data?.modelUsed && (
                  <div className="text-sm">
                    <span className="text-gray-500">Model: </span>
                    <span className="text-purple-300">{data?.modelUsed}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button className="text-purple-400 hover:text-purple-300">
            {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-purple-500/30 p-6 bg-slate-950/50 space-y-6">
          {/* Keter Scores */}
          {sefira === 'keter' && data?.scores && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-3">Ethical Dimensions</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(data?.scores ?? {})?.map?.(([key, value]: [string, any]) => (
                  <div key={key} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="text-xs text-gray-400 mb-1">
                      {key?.replace(/_/g, ' ')?.replace(/\b\w/g, (l: string) => l?.toUpperCase?.() ?? l)}
                    </div>
                    <div className="text-xl font-bold text-white">{value ?? 0}/10</div>
                  </div>
                )) ?? null}
              </div>
            </div>
          )}

          {/* Reasoning/Understanding */}
          {(data?.reasoning || data?.understanding) && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-2">Analysis</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {data?.reasoning ?? data?.understanding}
              </p>
            </div>
          )}

          {/* Insights */}
          {data?.insights && Array.isArray(data?.insights) && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-3">Key Insights</h4>
              <ul className="space-y-2">
                {data?.insights?.slice?.(0, 3)?.map?.((insight: any, idx: number) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{insight}</span>
                  </li>
                )) ?? null}
              </ul>
            </div>
          )}

          {/* Opportunities */}
          {data?.opportunities && Array.isArray(data?.opportunities) && (
            <div>
              <h4 className="text-sm font-semibold text-emerald-300 mb-3">Opportunities ({data?.opportunities?.length ?? 0})</h4>
              <div className="space-y-3">
                {data?.opportunities?.slice?.(0, 2)?.map?.((opp: any, idx: number) => (
                  <div key={idx} className="bg-emerald-950/30 border border-emerald-700/30 rounded-lg p-3">
                    <div className="font-semibold text-white text-sm mb-1">{opp?.opportunity}</div>
                    <div className="text-xs text-gray-400">{opp?.description}</div>
                  </div>
                )) ?? null}
              </div>
            </div>
          )}

          {/* Risks */}
          {data?.risks && (
            <div>
              <h4 className="text-sm font-semibold text-red-300 mb-3">Risk Assessment</h4>
              <div className="space-y-3">
                {['short_term', 'medium_term', 'long_term']?.map?.((term) => {
                  const risks = data?.risks?.[term]
                  if (!risks || risks?.length === 0) return null
                  
                  return (
                    <div key={term}>
                      <div className="text-xs text-gray-500 font-semibold mb-2 uppercase">
                        {term?.replace(/_/g, ' ')}
                      </div>
                      {risks?.slice?.(0, 1)?.map?.((risk: any, idx: number) => (
                        <div key={idx} className="bg-red-950/30 border border-red-700/30 rounded-lg p-3">
                          <div className="font-semibold text-white text-sm mb-1">{risk?.risk}</div>
                          <div className="text-xs text-gray-400">{risk?.description}</div>
                        </div>
                      )) ?? null}
                    </div>
                  )
                }) ?? null}
              </div>
            </div>
          )}

          {/* Quality Metrics */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-700/50">
            {data?.wisdom_quality && (
              <div className="text-xs bg-purple-950/50 text-purple-300 px-3 py-1 rounded-full border border-purple-700/30">
                Quality: {data?.wisdom_quality}
              </div>
            )}
            {data?.chesed_quality && (
              <div className="text-xs bg-emerald-950/50 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700/30">
                Quality: {data?.chesed_quality}
              </div>
            )}
            {data?.gevurah_quality && (
              <div className="text-xs bg-red-950/50 text-red-300 px-3 py-1 rounded-full border border-red-700/30">
                Quality: {data?.gevurah_quality}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
