import { env } from './src/shared/env'
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [env.EIGHTBASE_API_ENDPOINT!]: {
        commentDescriptions: true,
      }
    }
  ],
  generates: {
    'src/api/types/schemaTypes.ts': {
      plugins: ['typescript','schema-ast'],
      config: {
        typesSuffix: '_',
      },
    },
  },
}

export default config
