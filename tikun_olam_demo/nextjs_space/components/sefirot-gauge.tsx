'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface SefirotGaugeProps {
  value: number // 0-100
  color: string
  size?: number
}

export function SefirotGauge({ value, color, size = 120 }: SefirotGaugeProps) {
  const percentage = Math.min(100, Math.max(0, value ?? 0))
  
  const data = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ]

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={color ?? '#9333EA'} />
            <Cell fill="#1e293b" opacity={0.3} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center" style={{ marginTop: size * 0.15 }}>
          <div className="text-2xl font-bold text-white">{percentage?.toFixed?.(0) ?? '0'}</div>
          <div className="text-xs text-gray-400">score</div>
        </div>
      </div>
    </div>
  )
}
