'use client'

import { useState } from 'react'
import { Globe, Eye, Layers, ChevronDown, ChevronUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'

interface BinahSigmaVizProps {
  data: any
}

export function BinahSigmaViz({ data }: BinahSigmaVizProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview')

  if (!data) return null

  const biasDelta = data?.biasDelta ?? 0
  const divergenceLevel = data?.divergenceLevel ?? 'unknown'
  const blindSpotsDetected = data?.blindSpotsDetected ?? 0
  const convergencePoints = data?.convergencePoints ?? 0

  const westBlindSpots = data?.sigmaSynthesis?.west_blind_spots ?? []
  const eastBlindSpots = data?.sigmaSynthesis?.east_blind_spots ?? []
  const universalConvergence = data?.sigmaSynthesis?.universal_convergence ?? []
  const transcendentSynthesis = data?.sigmaSynthesis?.transcendent_synthesis ?? ''

  const metricData = [
    { name: 'Bias Delta', value: biasDelta, color: '#EF4444' },
    { name: 'Blind Spots', value: blindSpotsDetected * 12.5, color: '#F59E0B' },
    { name: 'Convergence', value: convergencePoints * 25, color: '#10B981' },
  ]

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-blue-500/30 bg-slate-950/50">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">BinahSigma Analysis</h2>
            </div>
            <p className="text-blue-300 text-sm">Multi-Civilizational Perspective Analysis</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Mode</div>
            <div className="text-xl font-bold text-blue-400">{data?.mode?.toUpperCase?.()}</div>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div 
        className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
        onClick={() => toggleSection('overview')}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            Divergence Metrics
          </h3>
          {expandedSection === 'overview' ? 
            <ChevronUp className="w-5 h-5 text-blue-400" /> : 
            <ChevronDown className="w-5 h-5 text-blue-400" />
          }
        </div>

        {expandedSection === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-xs text-gray-400 mb-1">Bias Delta</div>
                <div className="text-3xl font-bold text-red-400">{biasDelta?.toFixed?.(0) ?? 0}%</div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-xs text-gray-400 mb-1">Divergence</div>
                <div className="text-lg font-bold text-orange-400">{divergenceLevel}</div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-xs text-gray-400 mb-1">Blind Spots</div>
                <div className="text-3xl font-bold text-yellow-400">{blindSpotsDetected}</div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-xs text-gray-400 mb-1">Convergence</div>
                <div className="text-3xl font-bold text-emerald-400">{convergencePoints}</div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricData} layout="vertical" margin={{ left: 80, right: 20, top: 10, bottom: 10 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', fontSize: 11 }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {metricData?.map?.((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color ?? '#9333EA'} />
                    )) ?? null}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Western Blind Spots */}
      <div className="border-t border-blue-500/30">
        <div 
          className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
          onClick={() => toggleSection('west')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Western Blind Spots</h3>
            {expandedSection === 'west' ? 
              <ChevronUp className="w-5 h-5 text-blue-400" /> : 
              <ChevronDown className="w-5 h-5 text-blue-400" />
            }
          </div>
          
          {expandedSection === 'west' && (
            <div className="mt-4 space-y-3">
              {westBlindSpots?.map?.((spot: any, idx: number) => (
                <div key={idx} className="bg-red-950/30 border border-red-700/30 rounded-lg p-4">
                  <div className="font-semibold text-white mb-2">{spot?.blind_spot}</div>
                  <div className="text-sm text-gray-400 mb-2">{spot?.why_blind}</div>
                  <div className="text-xs text-emerald-400">
                    <span className="font-semibold">Eastern Perspective:</span> {spot?.eastern_sees}
                  </div>
                </div>
              )) ?? <p className="text-gray-400 text-sm">No blind spots detected</p>}
            </div>
          )}
        </div>
      </div>

      {/* Eastern Blind Spots */}
      <div className="border-t border-blue-500/30">
        <div 
          className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
          onClick={() => toggleSection('east')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Eastern Blind Spots</h3>
            {expandedSection === 'east' ? 
              <ChevronUp className="w-5 h-5 text-blue-400" /> : 
              <ChevronDown className="w-5 h-5 text-blue-400" />
            }
          </div>
          
          {expandedSection === 'east' && (
            <div className="mt-4 space-y-3">
              {eastBlindSpots?.map?.((spot: any, idx: number) => (
                <div key={idx} className="bg-orange-950/30 border border-orange-700/30 rounded-lg p-4">
                  <div className="font-semibold text-white mb-2">{spot?.blind_spot}</div>
                  <div className="text-sm text-gray-400 mb-2">{spot?.why_blind}</div>
                  <div className="text-xs text-blue-400">
                    <span className="font-semibold">Western Perspective:</span> {spot?.western_sees}
                  </div>
                </div>
              )) ?? <p className="text-gray-400 text-sm">No blind spots detected</p>}
            </div>
          )}
        </div>
      </div>

      {/* Universal Convergence */}
      <div className="border-t border-blue-500/30">
        <div 
          className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
          onClick={() => toggleSection('convergence')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Universal Convergence
            </h3>
            {expandedSection === 'convergence' ? 
              <ChevronUp className="w-5 h-5 text-emerald-400" /> : 
              <ChevronDown className="w-5 h-5 text-emerald-400" />
            }
          </div>
          
          {expandedSection === 'convergence' && (
            <div className="mt-4 space-y-3">
              {universalConvergence?.map?.((point: any, idx: number) => (
                <div key={idx} className="bg-emerald-950/30 border border-emerald-700/30 rounded-lg p-4">
                  <div className="font-semibold text-white mb-2">{point?.convergence_point}</div>
                  <div className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold text-emerald-400">Shared Value:</span> {point?.shared_value}
                  </div>
                  <div className="text-xs text-gray-500">{point?.transcends}</div>
                </div>
              )) ?? <p className="text-gray-400 text-sm">No convergence points detected</p>}
            </div>
          )}
        </div>
      </div>

      {/* Transcendent Synthesis */}
      <div className="border-t border-blue-500/30">
        <div 
          className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
          onClick={() => toggleSection('synthesis')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Transcendent Synthesis</h3>
            {expandedSection === 'synthesis' ? 
              <ChevronUp className="w-5 h-5 text-purple-400" /> : 
              <ChevronDown className="w-5 h-5 text-purple-400" />
            }
          </div>
          
          {expandedSection === 'synthesis' && transcendentSynthesis && (
            <div className="mt-4">
              <div className="bg-gradient-to-br from-purple-950/50 to-blue-950/50 border border-purple-700/30 rounded-lg p-5">
                <p className="text-sm text-gray-200 leading-relaxed">
                  {transcendentSynthesis}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
