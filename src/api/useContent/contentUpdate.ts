import { useMutation } from '@tanstack/react-query'
import { gql } from 'graphql-request'

import { client8Base } from '../client'
import { queryClient } from '../../App'

export const useContent2Update = () => {
  return useMutation({
    mutationKey: ['content'],

    mutationFn: async (payload: any) => {
      const mutation = gql`
        mutation Content2Update($data: Content2UpdateInput!) {
          content2Update(data: $data) {
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

    onSuccess: _ => {
      queryClient.invalidateQueries({
        queryKey: ['content'],
      })
    },
  })
}
