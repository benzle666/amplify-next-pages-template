import type { Schema } from "../../data/resource"
import { env } from '$amplify/env/say-hello';

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments

  try {
    const response = await fetch(env.API_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini-realtime-preview-2024-12-17',
      }),
    });

    const data = await response.json();

    // return typed from `.returns()`
    return JSON.stringify(data)

  } catch (err) {
    console.error('Error creating session:', err);

    return JSON.stringify({ error: 'Internal server error' })
  }

}


