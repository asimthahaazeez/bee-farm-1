import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

interface APIKeyValidation {
  user_id: string;
  permissions: any;
  rate_limit: number;
  last_used_at: string | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Use service role for API key validation
    );

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    
    // Remove 'functions' and 'v1' and function name from path
    const apiPath = pathSegments.slice(3).join('/');
    
    console.log(`API request: ${req.method} /${apiPath}`);

    // Validate API key
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        error: 'API key required', 
        message: 'Please provide a valid API key in the x-api-key header' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKeyValidation = await validateAPIKey(supabaseClient, apiKey);
    if (!apiKeyValidation) {
      return new Response(JSON.stringify({ 
        error: 'Invalid API key', 
        message: 'The provided API key is invalid or expired' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update last used timestamp
    await updateAPIKeyUsage(supabaseClient, apiKey);

    // Route API requests
    if (apiPath.startsWith('hives')) {
      return await handleHivesAPI(req, supabaseClient, apiKeyValidation, apiPath);
    } else if (apiPath.startsWith('analyses')) {
      return await handleAnalysesAPI(req, supabaseClient, apiKeyValidation, apiPath);
    } else if (apiPath.startsWith('health-scores')) {
      return await handleHealthScoresAPI(req, supabaseClient, apiKeyValidation, apiPath);
    } else if (apiPath.startsWith('financial')) {
      return await handleFinancialAPI(req, supabaseClient, apiKeyValidation, apiPath);
    } else if (apiPath === '' || apiPath === 'status') {
      return new Response(JSON.stringify({ 
        status: 'active',
        version: '1.0.0',
        endpoints: [
          'GET /hives - List user hives',
          'GET /hives/{id} - Get specific hive',
          'GET /analyses - List hive analyses', 
          'GET /analyses/{id} - Get specific analysis',
          'GET /health-scores - List health scores',
          'GET /financial/transactions - List transactions',
          'POST /analyses - Create new analysis'
        ]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ 
        error: 'Endpoint not found',
        available_endpoints: ['hives', 'analyses', 'health-scores', 'financial']
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Public API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function validateAPIKey(supabaseClient: any, apiKey: string): Promise<APIKeyValidation | null> {
  try {
    const { data, error } = await supabaseClient
      .from('api_keys')
      .select('user_id, permissions, rate_limit, last_used_at, expires_at, is_active')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.log('API key not found or inactive');
      return null;
    }

    // Check expiration
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      console.log('API key expired');
      return null;
    }

    return {
      user_id: data.user_id,
      permissions: data.permissions,
      rate_limit: data.rate_limit,
      last_used_at: data.last_used_at
    };
  } catch (error) {
    console.error('Error validating API key:', error);
    return null;
  }
}

async function updateAPIKeyUsage(supabaseClient: any, apiKey: string): Promise<void> {
  try {
    await supabaseClient
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('api_key', apiKey);
  } catch (error) {
    console.error('Error updating API key usage:', error);
  }
}

async function handleHivesAPI(req: Request, supabaseClient: any, auth: APIKeyValidation, path: string): Promise<Response> {
  const pathParts = path.split('/');
  const hiveId = pathParts[1];

  if (req.method === 'GET') {
    if (!auth.permissions.read) {
      return new Response(JSON.stringify({ error: 'Read permission required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let query = supabaseClient
      .from('hives')
      .select('*')
      .eq('user_id', auth.user_id);

    if (hiveId) {
      query = query.eq('id', hiveId).single();
    }

    const { data, error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleAnalysesAPI(req: Request, supabaseClient: any, auth: APIKeyValidation, path: string): Promise<Response> {
  const pathParts = path.split('/');
  const analysisId = pathParts[1];

  if (req.method === 'GET') {
    if (!auth.permissions.read) {
      return new Response(JSON.stringify({ error: 'Read permission required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let query = supabaseClient
      .from('hive_analyses')
      .select('*')
      .eq('user_id', auth.user_id)
      .order('created_at', { ascending: false });

    if (analysisId) {
      query = query.eq('id', analysisId).single();
    }

    const { data, error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } else if (req.method === 'POST') {
    if (!auth.permissions.write) {
      return new Response(JSON.stringify({ error: 'Write permission required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    
    // Call the AI analysis function
    const analysisResponse = await supabaseClient.functions.invoke('ai-hive-analysis', {
      body: {
        ...body,
        user_id: auth.user_id
      }
    });

    return new Response(JSON.stringify(analysisResponse.data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleHealthScoresAPI(req: Request, supabaseClient: any, auth: APIKeyValidation, path: string): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!auth.permissions.read) {
    return new Response(JSON.stringify({ error: 'Read permission required' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabaseClient
    .from('hive_health_scores')
    .select('*')
    .eq('user_id', auth.user_id)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleFinancialAPI(req: Request, supabaseClient: any, auth: APIKeyValidation, path: string): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!auth.permissions.read) {
    return new Response(JSON.stringify({ error: 'Read permission required' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const pathParts = path.split('/');
  const endpoint = pathParts[1]; // 'transactions' or 'reports'

  if (endpoint === 'transactions') {
    const { data, error } = await supabaseClient
      .from('financial_transactions')
      .select('*')
      .eq('user_id', auth.user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Financial endpoint not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}