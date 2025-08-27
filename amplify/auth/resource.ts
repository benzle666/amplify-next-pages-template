import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),

        scopes: ['profile', 'email', 'openid'],
        attributeMapping: {
          email: 'email'
        },
      },
      callbackUrls: [
        'http://localhost:3000/user/practice',
        'https://main.d37wsic70iipdp.amplifyapp.com/user/practice'
      ],
      logoutUrls: ['http://localhost:3000/', 'https://main.d37wsic70iipdp.amplifyapp.com/'],
    },
  },
});
