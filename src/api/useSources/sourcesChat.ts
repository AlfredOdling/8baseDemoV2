import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useChatHistoryCreate } from '../useChatHistory/chatHistoryCreate'

interface SourcesChatInput {
  sourceIds: string[]
  query: string
}

export const useSourcesChat = (contentId: string) => {
  const chatHistoryCreate = useChatHistoryCreate()

  return useMutation({
    mutationKey: ['chat'],

    mutationFn: (payload: SourcesChatInput) => {
      return axios.post(
        'http://localhost:3001/chat',
        {
          sourceIds: payload.sourceIds,
          query: payload.query,
        },
        {
          withCredentials: false,
        }
      )
    },

    onSuccess(data: any) {
      chatHistoryCreate.mutate({
        content2: {
          connect: { id: contentId! },
        },
        text: data?.data?.res?.text,
        role: data?.data?.res?.role,
        sourceDocuments: data?.data?.res?.sourceDocuments,
      })
    },
  })
}
