import { useMutation } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { queryClient } from '../../App'

interface SourcesCreateInput {
  url: string
  type: string | null
}

export const useSourcesCreate = () => {
  const { user } = useAuth0()

  return useMutation({
    mutationKey: ['sourcesList'],

    mutationFn: (payload: SourcesCreateInput) => {
      return axios.post(
        'http://localhost:3001/scrapeAndIndex',
        {
          url: payload.url,
          type: payload.type,
          userEmail: user?.email,
        },
        {
          withCredentials: false,
        }
      )
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] })
    },
  })
}
