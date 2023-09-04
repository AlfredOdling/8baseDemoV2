import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'

import { client8Base } from '../client'
import { Content2_ } from '../types/schemaTypes'

export const useContent = (contentId: string) =>
  useQuery({
    queryKey: ['content', contentId],

    queryFn: async () => {
      const query = gql`
        query Content($id: ID) {
          content2(id: $id) {
            id
            sources {
              items {
                id
                url
              }
            }
          }
        }
      `

      const res = client8Base.request(query, {
        id: contentId,
      })
      return res
    },

    select: (data: any) => data?.content2 as any,
  })
