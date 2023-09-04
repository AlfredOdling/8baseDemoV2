import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { useAuth0 } from '@auth0/auth0-react'

import { SourceListResponse_ } from '../types/schemaTypes'
import { client8Base } from '../client'

export const useSources = () => {
  const { user } = useAuth0()

  return useQuery({
    queryKey: ['sourcesList'],

    queryFn: async () => {
      const query = gql`
        query sourcesList($filter: SourceFilter) {
          sourcesList(filter: $filter) {
            items {
              id
              url
              done
            }
          }
        }
      `
      const res = client8Base.request(query, {
        filter: {
          user: {
            email: {
              equals: user?.email,
            },
          },
        },
      })
      return res
    },

    select: (data: any) =>
      data?.sourcesList?.items as SourceListResponse_['items'],

    refetchInterval: data => {
      const hasNotDone = data?.find((source: any) => source.done === false)
      return hasNotDone ? 1000 * 5 : false
    },
  })
}
