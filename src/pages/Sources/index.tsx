import { useInputState } from '@mantine/hooks'
import {
  LiaClock,
  LiaDollarSignSolid,
  LiaInternetExplorer,
  LiaPlusSolid,
  LiaYoutube,
} from 'react-icons/lia'
import { IconCheck, IconX } from '@tabler/icons-react'
import {
  Badge,
  Button,
  Divider,
  Group,
  Loader,
  ScrollArea,
  Space,
  Stack,
  Text,
  TextInput,
  Timeline,
  Title,
} from '@mantine/core'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { card } from '../../shared/styles/styles'
import { useSourcesCreate } from '../../api/useSources/sourcesCreate'
import { useActorRuns } from '../../api/useActorRuns/actorRuns'

export function SourcesPage() {
  const [selectValue, setSelectValue] = useInputState<string | null>('website')
  const [urlValue, setUrlValue] = useInputState('')
  const sourcesCreate = useSourcesCreate()
  const actorRuns = useActorRuns()

  const setValue = (value: string) => {
    setUrlValue(value)

    value.includes('youtube')
      ? setSelectValue('youtube')
      : setSelectValue('website')
  }

  const onClick = () => {
    sourcesCreate.mutate({ url: urlValue, type: selectValue })
    setValue('')
  }

  if (actorRuns.isLoading) {
    return <Loader />
  }

  return (
    <Stack
      spacing={15}
      sx={{
        ...card,
        width: '90%',
        alignItems: 'flex-start',
        padding: 20,
        background: 'white',
        borderRadius: '16px',
      }}
    >
      <Group sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Title order={2}>Sources</Title>
        <Divider />
      </Group>
      <Group
        sx={{
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          sx={{
            flex: 'auto',
          }}
          value={urlValue}
          onChange={e => setValue(e.target.value)}
          placeholder="Add a website or YouTube link"
          rightSection={
            selectValue === 'youtube' ? (
              <LiaYoutube color="red" />
            ) : (
              <LiaInternetExplorer color="grey" />
            )
          }
        />

        <Button
          variant="gradient"
          disabled={!urlValue || sourcesCreate.isLoading}
          loading={sourcesCreate.isLoading}
          onClick={onClick}
          onKeyDown={e => e.key === 'Enter' && onClick()}
          leftIcon={<LiaPlusSolid />}
        >
          Scrape
        </Button>
      </Group>

      <ScrollArea
        h={'65vh'}
        w={'100%'}
        offsetScrollbars
        scrollbarSize={6}
        type="auto"
      >
        <Space h="md" />

        <Timeline active={0} bulletSize={24} lineWidth={2}>
          {actorRuns?.data?.items
            .map((item: any) => (
              <Timeline.Item
                key={item.id}
                bullet={
                  item.status === 'SUCCEEDED' ? (
                    <IconCheck size={12} />
                  ) : (
                    <IconX size={12} />
                  )
                }
                title={
                  <Badge
                    variant="gradient"
                    gradient={
                      item.status === 'SUCCEEDED'
                        ? { from: 'teal', to: 'lime', deg: 105 }
                        : { from: 'orange', to: 'red' }
                    }
                  >
                    {item.status}
                  </Badge>
                }
              >
                <Group spacing={7}>
                  <Group spacing={0}>
                    <LiaDollarSignSolid strokeWidth={1} color="grey" />
                    <Text color="dimmed" fw={600} size={'xs'}>
                      {item.usageTotalUsd.toFixed(3)} USD
                    </Text>
                  </Group>

                  <Text color="grey" size={'xs'}>
                    |
                  </Text>

                  <Group spacing={3}>
                    <LiaClock strokeWidth={1} color="grey" />
                    <Text color="dimmed" fw={600} size={'xs'}>
                      {formatDistanceToNow(new Date(item.startedAt))}
                    </Text>
                  </Group>
                </Group>
              </Timeline.Item>
            ))
            .reverse()}
        </Timeline>

        <Divider />
      </ScrollArea>
    </Stack>
  )
}
