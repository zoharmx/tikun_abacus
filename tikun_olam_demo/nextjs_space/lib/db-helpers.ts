/**
 * Database helper functions
 */

import { prisma } from './db'
import { Case, SefirotResult, BinahSigma } from '@prisma/client'

export type CaseWithResults = Case & {
  sefirotResults: SefirotResult[]
  binahSigma: BinahSigma | null
}

/**
 * Get all cases with their results
 */
export async function getAllCases(): Promise<CaseWithResults[]> {
  try {
    const cases = await prisma.case.findMany({
      include: {
        sefirotResults: true,
        binahSigma: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    })
    return cases ?? []
  } catch (error) {
    console.error('Error fetching cases:', error)
    return []
  }
}

/**
 * Get a specific case by name
 */
export async function getCaseByName(caseName: string): Promise<CaseWithResults | null> {
  try {
    const caseData = await prisma.case.findUnique({
      where: { caseName },
      include: {
        sefirotResults: {
          orderBy: {
            sefirotNumber: 'asc',
          },
        },
        binahSigma: true,
      },
    })
    return caseData ?? null
  } catch (error) {
    console.error(`Error fetching case ${caseName}:`, error)
    return null
  }
}

/**
 * Get sefirot results for a case
 */
export async function getSefirotResults(caseId: string): Promise<SefirotResult[]> {
  try {
    const results = await prisma.sefirotResult.findMany({
      where: { caseId },
      orderBy: {
        sefirotNumber: 'asc',
      },
    })
    return results ?? []
  } catch (error) {
    console.error(`Error fetching sefirot results for case ${caseId}:`, error)
    return []
  }
}

/**
 * Get BinahSigma analysis for a case
 */
export async function getBinahSigma(caseId: string): Promise<BinahSigma | null> {
  try {
    const sigma = await prisma.binahSigma.findUnique({
      where: { caseId },
    })
    return sigma ?? null
  } catch (error) {
    console.error(`Error fetching BinahSigma for case ${caseId}:`, error)
    return null
  }
}
