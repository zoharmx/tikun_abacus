/**
 * Constants for Framework Tikun Olam
 */

export const SEFIROT_INFO = {
  keter: {
    name: 'Keter',
    hebrew: 'כתר',
    number: 1,
    description: 'Ethical Validation - Divine Purpose Alignment',
    color: '#9333EA',
    scoreKey: 'alignment_score',
    icon: 'Crown'
  },
  chochmah: {
    name: 'Chochmah',
    hebrew: 'חכמה',
    number: 2,
    description: 'Deep Reasoning - Wisdom & Insight',
    color: '#3B82F6',
    scoreKey: 'confidence_level',
    icon: 'Brain'
  },
  binah: {
    name: 'Binah',
    hebrew: 'בינה',
    number: 3,
    description: 'Understanding - 9D Contextual Analysis',
    color: '#10B981',
    scoreKey: 'contextual_depth_score',
    icon: 'Eye'
  },
  chesed: {
    name: 'Chesed',
    hebrew: 'חסד',
    number: 4,
    description: 'Kindness - Opportunities & Expansion',
    color: '#06B6D4',
    scoreKey: 'expansion_score',
    icon: 'Sparkles'
  },
  gevurah: {
    name: 'Gevurah',
    hebrew: 'גבורה',
    number: 5,
    description: 'Strength - Risks & Restrictions',
    color: '#EF4444',
    scoreKey: 'severity_score',
    icon: 'Shield'
  },
  tiferet: {
    name: 'Tiferet',
    hebrew: 'תפארת',
    number: 6,
    description: 'Beauty - Dialectical Synthesis',
    color: '#F59E0B',
    scoreKey: 'harmony_score',
    icon: 'Gem'
  },
  netzach: {
    name: 'Netzach',
    hebrew: 'נצח',
    number: 7,
    description: 'Victory - Implementation Strategy',
    color: '#8B5CF6',
    scoreKey: 'persistence_score',
    icon: 'Target'
  },
  hod: {
    name: 'Hod',
    hebrew: 'הוד',
    number: 8,
    description: 'Splendor - Effective Communication',
    color: '#EC4899',
    scoreKey: 'splendor_score',
    icon: 'MessageCircle'
  },
  yesod: {
    name: 'Yesod',
    hebrew: 'יסוד',
    number: 9,
    description: 'Foundation - Integration & Coherence',
    color: '#6366F1',
    scoreKey: 'integration_score',
    icon: 'Layers'
  },
  malchut: {
    name: 'Malchut',
    hebrew: 'מלכות',
    number: 10,
    description: 'Kingdom - Concrete Action Plan',
    color: '#14B8A6',
    scoreKey: 'manifestation_score',
    icon: 'CheckCircle'
  }
} as const

export const SEFIROT_ORDER = [
  'keter', 'chochmah', 'binah', 'chesed', 'gevurah',
  'tiferet', 'netzach', 'hod', 'yesod', 'malchut'
] as const

export type SefirotKey = keyof typeof SEFIROT_INFO
