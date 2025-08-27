import { defineFunction, secret } from '@aws-amplify/backend';

export const getTestContent = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'get-test-content',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  timeoutSeconds: 60,
  environment: {
    API_KEY: secret('OPENAI_API_KEY') // this assumes you created a secret named "MY_API_KEY"
  }
});