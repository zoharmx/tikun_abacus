/**
 * Seed script for Framework Tikun Olam Demo
 * Populates database with pre-calculated demo cases
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

type SefirotData = {
  metadata: {
    case_name: string
    execution_id: number
    timestamp: string
    scenario: string
  }
  sefirot_results: Record<string, any>
}

const SEFIROT_ORDER = [
  'keter', 'chochmah', 'binah', 'chesed', 'gevurah', 
  'tiferet', 'netzach', 'hod', 'yesod', 'malchut'
]

async function seedCase(jsonPath: string) {
  console.log(`\n📊 Seeding case from: ${path.basename(jsonPath)}`);
  
  // Read JSON file
  const rawData = fs.readFileSync(jsonPath, 'utf-8')
  const data: SefirotData = JSON.parse(rawData)
  
  const { metadata, sefirot_results } = data
  
  // Create Case
  console.log(`   Creating case: ${metadata.case_name}`);
  const caseRecord = await prisma.case.create({
    data: {
      caseName: metadata.case_name,
      scenario: metadata.scenario,
      executionId: metadata.execution_id,
      timestamp: new Date(metadata.timestamp),
    },
  })
  
  console.log(`   ✓ Case created with ID: ${caseRecord.id}`);
  
  // Create SefirotResults for each Sefira
  let sefirotCount = 0
  for (const sefirot of SEFIROT_ORDER) {
    if (sefirot_results?.[sefirot] && !sefirot_results[sefirot].error) {
      const sefirotData = sefirot_results[sefirot]
      
      // Extract main score based on Sefira type
      let mainScore: number | null = null
      let scores: any = null
      
      if (sefirot === 'keter') {
        mainScore = sefirotData?.alignment_score ?? null
        scores = sefirotData?.scores ?? null
      } else if (sefirot === 'chochmah') {
        mainScore = sefirotData?.confidence_level ?? null
      } else if (sefirot === 'binah') {
        mainScore = sefirotData?.contextual_depth_score ?? null
      } else if (sefirot === 'chesed') {
        mainScore = sefirotData?.expansion_score ?? null
      } else if (sefirot === 'gevurah') {
        mainScore = sefirotData?.severity_score ?? null
      } else if (sefirot === 'tiferet') {
        mainScore = sefirotData?.harmony_score ?? null
      } else if (sefirot === 'netzach') {
        mainScore = sefirotData?.persistence_score ?? null
      } else if (sefirot === 'hod') {
        mainScore = sefirotData?.splendor_score ?? null
      } else if (sefirot === 'yesod') {
        mainScore = sefirotData?.integration_score ?? null
      } else if (sefirot === 'malchut') {
        mainScore = sefirotData?.manifestation_score ?? null
      }
      
      await prisma.sefirotResult.create({
        data: {
          caseId: caseRecord.id,
          sefira: sefirot,
          sefirotNumber: sefirotData?.sefira_number ?? SEFIROT_ORDER.indexOf(sefirot) + 1,
          hebrewName: sefirotData?.hebrew_name ?? '',
          scores: scores,
          mainScore: mainScore,
          analysisData: sefirotData,
          modelUsed: sefirotData?.model_used ?? sefirotData?.model_west ?? null,
          timestamp: sefirotData?.timestamp ? new Date(sefirotData.timestamp) : new Date(),
          activationCount: sefirotData?.activation_count ?? 1,
        },
      })
      
      sefirotCount++
    }
  }
  
  console.log(`   ✓ Created ${sefirotCount} SefirotResult records`);
  
  // Create BinahSigma if exists
  if (sefirot_results?.binah && sefirot_results.binah?.mode === 'sigma') {
    const binahData = sefirot_results.binah
    const sigma = binahData?.sigma_synthesis ?? {}
    
    await prisma.binahSigma.create({
      data: {
        caseId: caseRecord.id,
        mode: binahData.mode,
        westPerspective: binahData?.west_analysis?.perspective ?? 'Western Liberal Democratic',
        westAnalysis: binahData?.west_analysis ?? {},
        eastPerspective: binahData?.east_analysis?.perspective ?? 'Eastern Collective Harmony',
        eastAnalysis: binahData?.east_analysis ?? {},
        sigmaSynthesis: sigma,
        biasDelta: binahData?.bias_delta ?? 0,
        divergenceLevel: binahData?.divergence_level ?? 'unknown',
        blindSpotsDetected: binahData?.blind_spots_detected ?? 0,
        convergencePoints: binahData?.convergence_points ?? 0,
        contextualDepthScore: binahData?.contextual_depth_score ?? 0,
        modelWest: binahData?.model_west ?? null,
        modelEast: binahData?.model_east ?? null,
        timestamp: binahData?.timestamp ? new Date(binahData.timestamp) : new Date(),
      },
    })
    
    console.log(`   ✓ Created BinahSigma analysis record`);
  }
  
  console.log(`   ✅ Case '${metadata.case_name}' seeded successfully\n`);
}

async function main() {
  console.log('\n🌱 Starting Framework Tikun Olam database seed...\n')
  console.log('═'.repeat(80))
  
  try {
    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    await prisma.binahSigma.deleteMany({})
    await prisma.sefirotResult.deleteMany({})
    await prisma.case.deleteMany({})
    await prisma.userAnalysis.deleteMany({})
    console.log('   ✓ Existing data cleared\n');
    
    // Seed demo cases
    const dataDir = path.join(__dirname, '..', 'data')
    
    const turritopsisPath = path.join(dataDir, 'Turritopsis_Rejuvenation_Sigma_20251207_215754.json')
    const rbuPath = path.join(dataDir, 'RBU_ONU_Sigma_20251207_220527.json')
    
    if (fs.existsSync(turritopsisPath)) {
      await seedCase(turritopsisPath)
    } else {
      console.warn(`⚠️  Warning: ${turritopsisPath} not found`);
    }
    
    if (fs.existsSync(rbuPath)) {
      await seedCase(rbuPath)
    } else {
      console.warn(`⚠️  Warning: ${rbuPath} not found`);
    }
    
    // Summary
    const caseCount = await prisma.case.count()
    const sefirotCount = await prisma.sefirotResult.count()
    const sigmaCount = await prisma.binahSigma.count()
    
    console.log('═'.repeat(80))
    console.log('\n✨ Seeding completed successfully!\n')
    console.log(`📊 Summary:`);
    console.log(`   • Cases: ${caseCount}`);
    console.log(`   • Sefirot Results: ${sefirotCount}`);
    console.log(`   • BinahSigma Analyses: ${sigmaCount}`);
    console.log('\n')
    
  } catch (error) {
    console.error('\n❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
