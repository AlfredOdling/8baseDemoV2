import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconRobot } from '@tabler/icons-react'
import { LiaEdit, LiaSave, LiaSpinnerSolid } from 'react-icons/lia'
import {
  Group,
  TextInput,
  Stack,
  Title,
  MultiSelect,
  Button,
  Loader,
  ScrollArea,
  ActionIcon,
} from '@mantine/core'

import { useSources } from '../../api/useSources/sources'
import { card } from '../../shared/styles/styles'
import { useSourcesChat } from '../../api/useSources/sourcesChat'
import { useContent2Update } from '../../api/useContent/contentUpdate'
import { useContent } from '../../api/useContent/content'
import { useChatHistory } from '../../api/useChatHistory/chatHistory'
import { useChatHistoryCreate } from '../../api/useChatHistory/chatHistoryCreate'
import { Message } from './Message'

export function ContentPage() {
  const [edit, setEdit] = useState(false)
  const [searchValue, onSearchChange] = useState('')
  const [chatValue, setChat] = useState<any>('')

  const { contentId } = useParams()
  const viewport = useRef<HTMLDivElement>(null)

  const sources = useSources()
  const chat = useSourcesChat(contentId!)
  const updateContent = useContent2Update()
  const content = useContent(contentId!)
  const chatHistory = useChatHistory(contentId!)
  const chatHistoryCreate = useChatHistoryCreate()

  const [title, setTitle] = useState(content.data?.title || 'Title')

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

  const scrollToBottom = () =>
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    })

  const onClickChat = () => {
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
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory?.data?.length])

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
        {edit ? (
          <Group spacing={3}>
            <ActionIcon
              sx={{
                marginLeft: 0,
              }}
              onClick={() => {
                setEdit(false)
                updateContent.mutate({
                  id: contentId!,
                  title,
                })
              }}
            >
              <LiaSave color="grey" />
            </ActionIcon>

            <TextInput value={title} onChange={e => setTitle(e.target.value)} />
          </Group>
        ) : (
          <Group spacing={3}>
            <ActionIcon onClick={() => setEdit(true)}>
              {updateContent.isLoading ? (
                <Loader size={'sm'} />
              ) : (
                <LiaEdit color="grey" />
              )}
            </ActionIcon>
            <Title order={2}>{title}</Title>
          </Group>
        )}

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

      <Stack
        sx={{
          ...card,
          justifyContent: 'space-between',
        }}
      >
        <ScrollArea
          offsetScrollbars
          h={'48vh'}
          viewportRef={viewport}
          scrollbarSize={6}
        >
          {chatHistory.data
            ?.sort((a: any, b: any) => a.createdAt - b.createdAt)
            .map((item: any, i) => (
              <Message key={`message-${i}`} item={item} />
            ))}
        </ScrollArea>

        <Group
          sx={{
            borderRadius: 16,
            width: '100%',
          }}
        >
          <TextInput
            value={chatValue}
            onChange={e => setChat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onClickChat()}
            placeholder="Chat with your data"
            sx={{
              flex: 1,
            }}
          />

          <Button
            variant="gradient"
            onClick={onClickChat}
            rightIcon={<IconRobot />}
            loading={chat.isLoading}
          >
            Chat
          </Button>
        </Group>
      </Stack>
    </>
  )
}
