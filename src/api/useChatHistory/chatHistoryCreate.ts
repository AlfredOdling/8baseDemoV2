import { useMutation } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { client8Base } from '../client'
import { queryClient } from '../../App'

export const useChatHistoryCreate = () => {
  return useMutation({
    mutationKey: ['chatHistoryList'],

    mutationFn: async (payload: any) => {
      const mutation = gql`
        mutation ChatHistoryCreate($data: ChatHistoryCreateInput!) {
          chatHistoryCreate(data: $data) {
            id
          }
        }
      `
      const res = client8Base.request(mutation, {
        data: {
          ...payload,
        },
      })
      return res
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chatHistoryList'],
      })
    },
  })
}
