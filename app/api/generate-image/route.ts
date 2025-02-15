import { NextResponse } from "next/server";
import Replicate from "replicate";
import { captureException } from '@sentry/nextjs';

export async function GET(request: Request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN is not configured');
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("text");

    if (!prompt) {
      return new NextResponse('Missing text parameter', { status: 400 });
    }

    const model = "black-forest-labs/flux-schnell";
    const input = {
      prompt,
      go_fast: true,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      megapixels: "0.25",
      num_inference_steps: 2,
    };

    const output = await replicate.run(model, { input }) as string[];
    
    if (!output || !output[0]) {
      throw new Error('No output from Replicate');
    }

    const headers = new Headers();
    headers.set("Content-Type", "image/*");
    headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

    return new NextResponse(output[0], {
      status: 200,
      statusText: "OK",
      headers,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    captureException(error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate image' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
