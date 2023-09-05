import { useQuery } from '@tanstack/react-query'
import { env } from '../../shared/env'

export const useActorRuns = () => {
  return useQuery({
    queryKey: ['actors'],

    queryFn: async (data_: any) => {
      const res = await fetch(
        `https://api.apify.com/v2/acts/apify~website-content-crawler/runs?token=${env.APIFY_API_KEY}`
      )
      const json = await res.json()

      return json
    },
    select(data) {
      return data.data
    },
    refetchInterval: () => 1000 * 5,
  })
}
