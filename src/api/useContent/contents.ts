import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { useAuth0 } from '@auth0/auth0-react'

import { client8Base } from '../client'
import { Content2ListResponse_ } from '../types/schemaTypes'

export const useContents = () => {
  const { user } = useAuth0()

  return useQuery({
    queryKey: ['contentsList'],

    queryFn: async () => {
      const query = gql`
        query content2sList($filter: Content2Filter) {
          content2SList(filter: $filter) {
            items {
              id
              title
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
      data?.content2SList?.items as Content2ListResponse_['items'],
  })
}
