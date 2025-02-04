import { NextResponse } from "next/server";
import Replicate from "replicate";

export const runtime = 'edge';
export const preferredRegion = 'auto';
export const dynamic = 'force-dynamic';

const CACHE_REVALIDATE = 60; // 1 minute

interface LogData {
  prompt?: string;
  model?: string;
  input?: Record<string, unknown>;
  url?: string;
  error?: string;
  env?: Record<string, string>;
  apiResponse?: unknown;
}

function log(type: 'info' | 'error', message: string, data?: LogData) {
  const logData = {
    timestamp: new Date().toISOString(),
    type,
    message,
    ...(data && { data }),
    environment: process.env.NODE_ENV,
  };
  console.log(JSON.stringify(logData));
}

export async function GET() {
  log('info', 'GET request received');
  return new NextResponse(
    JSON.stringify({ message: 'API endpoint available' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600',
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    log('info', 'POST request received');
    
    // Log environment state
    log('info', 'Environment check', {
      env: {
        NODE_ENV: process.env.NODE_ENV || 'not set',
        REPLICATE_API_TOKEN_LENGTH: process.env.REPLICATE_API_TOKEN?.length?.toString() || '0',
        API_URL: process.env.NEXT_PUBLIC_API_URL || 'not set'
      }
    });
    
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      throw new Error('REPLICATE_API_TOKEN is not configured');
    }

    const replicate = new Replicate({
      auth: token,
    });

    const data = await request.json();
    log('info', 'Request data received', { prompt: data.text });
    
    if (!data.text) {
      log('error', 'Missing text prompt');
      return NextResponse.json(
        { error: 'Missing text prompt' },
        { status: 400 }
      );
    }

    const model = "black-forest-labs/flux-schnell";
    const input = {
      prompt: data.text,
      go_fast: true,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      megapixels: "0.25",
      num_inference_steps: 2,
    };

    log('info', 'Calling Replicate API', { model, input });
    
    try {
      const output = await replicate.run(model, { input });
      log('info', 'Raw Replicate response', { apiResponse: output });
      
      if (!output || !Array.isArray(output) || !output[0]) {
        throw new Error('Invalid response format from Replicate');
      }

      const imageUrl = output[0];
      log('info', 'Image generated successfully', { url: imageUrl });
      
      return NextResponse.json(
        { url: imageUrl },
        {
          status: 200,
          headers: {
            'Cache-Control': `public, s-maxage=${CACHE_REVALIDATE}`,
          },
        }
      );
    } catch (replicateError) {
      log('error', 'Replicate API Error', { 
        error: replicateError instanceof Error ? replicateError.message : 'Unknown Replicate error',
        model,
        input 
      });
      throw replicateError;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log('error', 'API Error', { error: errorMessage });
    return NextResponse.json(
      { error: 'Failed to generate image', details: errorMessage },
      { status: 500 }
    );
  }
}
