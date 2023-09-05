import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { gql } from 'graphql-request'

import { client8Base } from '../client'
import { queryClient } from '../../App'

export const useContent2Delete = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['contentsList'],

    mutationFn: async (payload: any) => {
      const mutation = gql`
        mutation Content2Delete($data: Content2DeleteInput!) {
          content2Delete(data: $data) {
            success
          }
        }
      `

      const res = client8Base.request(mutation, {
        force: true,
        data: {
          id: payload,
        },
      })

      return res
    },

    onSuccess: (data: any) => {
      navigate(data?.content2Delete.id)
      queryClient.invalidateQueries({ queryKey: ['contentsList'] })
    },
  })
}
