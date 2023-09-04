import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'

import { ChatHistoryListResponse_ } from '../types/schemaTypes'
import { client8Base } from '../client'

export const useChatHistory = (contentId: string) => {
  return useQuery({
    queryKey: ['chatHistoryList'],

    queryFn: async () => {
      const query = gql`
        query chatHistoryList($filter: ChatHistoryFilter!) {
          chatHistoriesList(filter: $filter) {
            items {
              id
              text
              role
              createdAt
              sourceDocuments
            }
          }
        }
      `
      const res = client8Base.request(query, {
        filter: {
          content2: {
            id: {
              equals: contentId,
            },
          },
        },
      })
      return res
    },

    select: (data: any) =>
      data?.chatHistoriesList?.items as ChatHistoryListResponse_['items'],
  })
}
