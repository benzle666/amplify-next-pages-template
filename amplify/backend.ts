import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

import { getEmphemeral } from './functions/get-emphemeral/resource';

defineBackend({
  auth,
  data,
  getEmphemeral,
});
