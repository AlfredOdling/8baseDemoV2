import { useQuery } from '@tanstack/react-query'

export const useActorRuns = () => {
  return useQuery({
    queryKey: ['actors'],

    queryFn: async (data_: any) => {
      const res = await fetch(
        'https://api.apify.com/v2/acts/apify~website-content-crawler/runs?token=apify_api_JLmVK7PLX20Zb0LzZq6hD6WUV29oDi242IA9'
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
