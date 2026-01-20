import Retell from 'retell-sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { agentId } = await request.json();

    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Retell API key not configured' },
        { status: 500 }
      );
    }

    const client = new Retell({
      apiKey: apiKey,
    });

    const webCallResponse = await client.call.createWebCall({
      agent_id: agentId,
    });

    return NextResponse.json({
      accessToken: webCallResponse.access_token,
      agentId: webCallResponse.agent_id,
    });
  } catch (error) {
    console.error('Error creating web call:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}