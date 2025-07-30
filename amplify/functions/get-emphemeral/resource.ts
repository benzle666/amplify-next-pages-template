import { defineFunction, secret } from '@aws-amplify/backend';

export const getEmphemeral = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'get-emphemeral',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: {
    API_ENDPOINT: 'https://api.openai.com/v1/realtime/sessions',
    API_KEY: secret('OPENAI_API_KEY') // this assumes you created a secret named "MY_API_KEY"
  },
});