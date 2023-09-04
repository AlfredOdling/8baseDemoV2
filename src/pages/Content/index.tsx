import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconRobot } from '@tabler/icons-react'
import { LiaSpinnerSolid } from 'react-icons/lia'
import {
  Group,
  TextInput,
  Stack,
  Title,
  MultiSelect,
  Button,
  Loader,
} from '@mantine/core'

import { useSources } from '../../api/useSources/sources'
import { card } from '../../shared/styles/styles'
import { useSourcesChat } from '../../api/useSources/sourcesChat'
import { useContent2Update } from '../../api/useContent/contentUpdate'
import { useContent } from '../../api/useContent/content'
import { useChatHistory } from '../../api/useChatHistory/chatHistory'
import { Message } from './Message'
import { useChatHistoryCreate } from '../../api/useChatHistory/chatHistoryCreate'

export function ContentPage() {
  const [searchValue, onSearchChange] = useState('')
  const [chatValue, setChat] = useState<any>('tell me about this book')
  const { contentId } = useParams()

  const sources = useSources()
  const chat = useSourcesChat(contentId!)
  const updateContent = useContent2Update()
  const content = useContent(contentId!)
  const chatHistory = useChatHistory(contentId!)
  const chatHistoryCreate = useChatHistoryCreate()

  const sourcesData =
    sources?.data
      ?.filter(source => source.done === true)
      .map(source => ({
        label: source.url!,
        value: source.id!,
      })) || []

  const multiSelectValue = content?.data?.sources?.items.map(
    (item: any) => item.id
  )

  const updateMultiSelect = (e: any) => {
    const removedItem = multiSelectValue.filter(
      (item: any) => !e?.includes(item)
    )

    const data = removedItem.length
      ? { disconnect: removedItem.map((item: any) => ({ id: item })) }
      : { connect: e.map((item: any) => ({ id: item })) }

    updateContent.mutate({
      id: contentId!,
      sources: {
        ...data,
      },
    })
  }

  if (sources.isLoading) {
    return <LiaSpinnerSolid color="white" />
  }

  return (
    <>
      <Stack
        sx={{
          ...card,
        }}
      >
        <Title order={4}>Choose sources</Title>

        <MultiSelect
          data={sourcesData}
          value={multiSelectValue}
          onChange={updateMultiSelect}
          placeholder="Sources"
          searchable
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          rightSection={updateContent.isLoading && <Loader size={'sm'} />}
        />
      </Stack>

      <Group
        sx={{
          ...card,
          flex: 1,
        }}
      >
        <Stack
          sx={{
            height: '100%',
            backgroundColor: '#F5F5FC',
            flex: 1,
            padding: 10,
            borderRadius: 16,
            justifyContent: 'space-between',
          }}
        >
          <Stack
            sx={{
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: 800,
              maxWidth: 900,
            }}
          >
            {chatHistory.data
              ?.sort((a: any, b: any) => a.createdAt - b.createdAt)
              .map((item: any, i) => (
                <Message key={`message-${i}`} item={item} />
              ))}
          </Stack>

          <Group
            sx={{
              borderRadius: 16,
              width: '100%',
            }}
          >
            <TextInput
              value={chatValue}
              onChange={e => setChat(e.target.value)}
              placeholder="Chat with your data"
              sx={{
                flex: 1,
              }}
            />

            <Button
              onClick={() => {
                chatHistoryCreate.mutate({
                  content2: {
                    connect: { id: contentId! },
                  },
                  text: chatValue,
                  role: 'human',
                })

                chat.mutate({
                  query: chatValue,
                  sourceIds: multiSelectValue,
                })

                setChat('')
              }}
              rightIcon={<IconRobot />}
              variant="light"
              loading={chat.isLoading}
            >
              Chat
            </Button>
          </Group>
        </Stack>
      </Group>
    </>
  )
}
