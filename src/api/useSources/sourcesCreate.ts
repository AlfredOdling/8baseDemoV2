import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'

import { queryClient } from '../../App'
//import { env } from '../../shared/env'

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
        `${'express-langchain-production-9e0e.up.railway.app'}/scrapeAndIndex`,
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
