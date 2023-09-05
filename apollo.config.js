import { env } from './src/shared/env'

module.exports = {
  client: {
    service: {
      name: '8base',
      url: env.EIGHTBASE_API_ENDPOINT,
    },
    includes: ['src/**/*.{ts,tsx,js,jsx}'],
  },
}
