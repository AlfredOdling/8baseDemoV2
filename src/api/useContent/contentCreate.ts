import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { gql } from 'graphql-request'
import { useAuth0 } from '@auth0/auth0-react'

import { client8Base } from '../client'

export const useContent2Create = () => {
  const navigate = useNavigate()
  const { user } = useAuth0()

  return useMutation({
    mutationKey: ['content2'],

    mutationFn: async () => {
      const mutation = gql`
        mutation Content2Create($data: Content2CreateInput!) {
          content2Create(data: $data) {
            id
          }
        }
      `

      const res = await client8Base.request(mutation, {
        data: {
          user: {
            connect: {
              email: user?.email,
            },
          },
        },
      })
      return res
    },

    onSuccess: (data: any) => {
      navigate(data?.content2Create.id)
    },
  })
}
