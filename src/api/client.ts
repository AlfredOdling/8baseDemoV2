import { GraphQLClient } from 'graphql-request'
import { env } from '../shared/env'

export const client8Base = new GraphQLClient(env.EIGHTBASE_API_ENDPOINT!, {
  headers: {
    authorization: `Bearer ${env.EIGHTBASE_TOKEN}`,
    //environment: Env.EIGHTBASE_ENVIRONMENT,
  },
})
