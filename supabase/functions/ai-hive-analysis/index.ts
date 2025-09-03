import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  hive_id: string;
  image_url: string;
  processing_type: string;
  user_id?: string;
}

interface AIAnalysisResult {
  health_score: number;
  population_estimate: number;
  queen_status: string;
  brood_pattern_score: number;
  honey_stores_level: string;
  issues_detected: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    coordinates?: { x: number; y: number; width: number; height: number };
    description: string;
  }>;
  confidence_score: number;
  recommendations: string[];
  risk_factors: Array<{
    type: string;
    level: string;
    description: string;
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the JWT token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid authentication');
    }

    const { hive_id, image_url, processing_type }: AnalysisRequest = await req.json();

    if (!hive_id || !image_url) {
      throw new Error('Missing required fields: hive_id and image_url');
    }

    console.log(`Starting AI analysis for hive ${hive_id}, type: ${processing_type}`);

    // Create processing job entry
    const { data: queueJob, error: queueError } = await supabaseClient
      .from('ai_processing_queue')
      .insert({
        user_id: user.id,
        hive_id,
        image_url,
        processing_type: processing_type || 'health_analysis',
        status: 'processing',
        progress: 10
      })
      .select()
      .single();

    if (queueError) {
      console.error('Error creating queue job:', queueError);
      throw queueError;
    }

    // Simulate AI processing with realistic results
    // In a real implementation, this would call actual AI models
    const analysisResult = await simulateAIAnalysis(image_url, processing_type);

    // Update queue job progress
    await supabaseClient
      .from('ai_processing_queue')
      .update({ 
        progress: 100,
        status: 'completed',
        result_data: analysisResult,
        processing_end_time: new Date().toISOString()
      })
      .eq('id', queueJob.id);

    // Store the analysis result
    const { data: analysis, error: analysisError } = await supabaseClient
      .from('hive_analyses')
      .insert({
        user_id: user.id,
        hive_id,
        image_url,
        health_score: analysisResult.health_score,
        population_estimate: analysisResult.population_estimate,
        queen_status: analysisResult.queen_status,
        brood_pattern_score: analysisResult.brood_pattern_score,
        honey_stores_level: analysisResult.honey_stores_level,
        issues_detected: analysisResult.issues_detected,
        confidence_score: analysisResult.confidence_score,
        recommendations: analysisResult.recommendations,
        risk_factors: analysisResult.risk_factors,
        processing_status: 'completed',
        processing_progress: 100
      })
      .select()
      .single();

    if (analysisError) {
      console.error('Error storing analysis:', analysisError);
      throw analysisError;
    }

    // Generate health score and predictions
    await generateHealthScore(supabaseClient, user.id, hive_id, analysisResult);

    // Generate predictive alerts if needed
    await generatePredictiveAlerts(supabaseClient, user.id, hive_id, analysisResult);

    console.log(`Analysis completed for hive ${hive_id}`);

    return new Response(JSON.stringify({
      success: true,
      analysis_id: analysis.id,
      queue_job_id: queueJob.id,
      results: analysisResult
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI analysis:', error);
    return new Response(JSON.stringify({ 
      error: 'Analysis failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function simulateAIAnalysis(imageUrl: string, processingType: string): Promise<AIAnalysisResult> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate realistic but random analysis results
  const healthScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const populationEstimate = Math.floor(Math.random() * 40000) + 20000; // 20k-60k
  
  const queenStatuses = ['present', 'absent', 'multiple_queens', 'virgin_queen'];
  const honeyLevels = ['low', 'moderate', 'good', 'excellent'];
  
  const issues = [];
  
  // Randomly generate 0-3 issues
  const issueCount = Math.floor(Math.random() * 4);
  const possibleIssues = [
    { type: 'Varroa Mites', severity: 'medium', description: 'Varroa mite infestation detected' },
    { type: 'Queen Cells', severity: 'low', description: 'Natural queen cells observed' },
    { type: 'Chalk Brood', severity: 'low', description: 'Minor chalk brood symptoms' },
    { type: 'Drone Laying', severity: 'high', description: 'Excessive drone laying pattern' },
  ];

  for (let i = 0; i < issueCount; i++) {
    const issue = possibleIssues[Math.floor(Math.random() * possibleIssues.length)];
    issues.push({
      ...issue,
      confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
      coordinates: {
        x: Math.floor(Math.random() * 300),
        y: Math.floor(Math.random() * 300),
        width: 50 + Math.floor(Math.random() * 50),
        height: 50 + Math.floor(Math.random() * 50)
      }
    });
  }

  return {
    health_score: healthScore,
    population_estimate: populationEstimate,
    queen_status: queenStatuses[Math.floor(Math.random() * queenStatuses.length)],
    brood_pattern_score: Math.floor(Math.random() * 30) + 70,
    honey_stores_level: honeyLevels[Math.floor(Math.random() * honeyLevels.length)],
    issues_detected: issues,
    confidence_score: Math.random() * 0.2 + 0.8, // 0.8-1.0
    recommendations: generateRecommendations(healthScore, issues),
    risk_factors: generateRiskFactors(healthScore, issues)
  };
}

function generateRecommendations(healthScore: number, issues: any[]): string[] {
  const recommendations = [];
  
  if (healthScore < 70) {
    recommendations.push("Schedule immediate hive inspection");
    recommendations.push("Consider consulting with local beekeeping association");
  }
  
  if (issues.some(issue => issue.type === 'Varroa Mites')) {
    recommendations.push("Apply varroa mite treatment");
    recommendations.push("Monitor mite levels weekly");
  }
  
  if (issues.some(issue => issue.type === 'Queen Cells')) {
    recommendations.push("Monitor for swarming behavior");
    recommendations.push("Consider hive expansion");
  }
  
  recommendations.push("Maintain regular inspection schedule");
  
  return recommendations;
}

function generateRiskFactors(healthScore: number, issues: any[]): any[] {
  const riskFactors = [];
  
  if (healthScore < 70) {
    riskFactors.push({
      type: 'colony_health',
      level: 'high',
      description: 'Overall colony health below optimal range'
    });
  }
  
  if (issues.length > 2) {
    riskFactors.push({
      type: 'multiple_issues',
      level: 'medium',
      description: 'Multiple issues detected requiring attention'
    });
  }
  
  return riskFactors;
}

async function generateHealthScore(supabaseClient: any, userId: string, hiveId: string, analysis: AIAnalysisResult) {
  // Calculate component scores
  const populationScore = Math.min(100, (analysis.population_estimate / 50000) * 100);
  const queenScore = analysis.queen_status === 'present' ? 95 : 50;
  
  // Determine health trend (would be based on historical data in real implementation)
  const trends = ['improving', 'stable', 'declining'];
  const trend = trends[Math.floor(Math.random() * trends.length)];
  
  // Determine risk level
  let riskLevel = 'low';
  if (analysis.health_score < 60) riskLevel = 'critical';
  else if (analysis.health_score < 70) riskLevel = 'high';
  else if (analysis.health_score < 80) riskLevel = 'medium';

  await supabaseClient
    .from('hive_health_scores')
    .insert({
      user_id: userId,
      hive_id: hiveId,
      overall_score: analysis.health_score,
      population_score: Math.round(populationScore),
      queen_score: queenScore,
      brood_score: analysis.brood_pattern_score,
      health_trend: trend,
      risk_level: riskLevel,
      predictions: [
        {
          type: 'honey_flow',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          probability: 0.75
        }
      ],
      contributing_factors: {
        weather: 'favorable',
        inspection_frequency: 'regular',
        season: 'spring'
      }
    });
}

async function generatePredictiveAlerts(supabaseClient: any, userId: string, hiveId: string, analysis: AIAnalysisResult) {
  // Generate alerts based on analysis results
  if (analysis.health_score < 70) {
    await supabaseClient
      .from('predictive_alerts')
      .insert({
        user_id: userId,
        hive_id: hiveId,
        alert_type: 'disease_risk',
        severity: 'high',
        title: 'Colony Health Alert',
        description: 'Health score indicates potential colony stress. Immediate attention recommended.',
        predicted_date: new Date().toISOString(),
        confidence_score: 0.85,
        recommendations: [
          'Conduct thorough hive inspection',
          'Check for queen presence and egg laying',
          'Assess food stores and add feeding if necessary'
        ]
      });
  }
  
  if (analysis.issues_detected.some(issue => issue.type === 'Varroa Mites')) {
    await supabaseClient
      .from('predictive_alerts')
      .insert({
        user_id: userId,
        hive_id: hiveId,
        alert_type: 'pest_infestation',
        severity: 'medium',
        title: 'Varroa Mite Detection',
        description: 'AI analysis detected signs of varroa mite infestation.',
        predicted_date: new Date().toISOString(),
        confidence_score: 0.78,
        recommendations: [
          'Apply approved varroa treatment',
          'Monitor mite drop counts',
          'Schedule follow-up inspection in 2 weeks'
        ]
      });
  }
}