import { IconCheck, IconCopy, IconRobot, IconUser } from '@tabler/icons-react'
import {
  Group,
  Stack,
  Text,
  Anchor,
  CopyButton,
  Tooltip,
  ActionIcon,
  rem,
  Badge,
} from '@mantine/core'
import { card } from '../../shared/styles/styles'

export const Message = ({ item }: any) => (
  <Stack
    sx={{
      ...card,
      width: '100%',
      padding: 15,
      marginBottom: 15,
      marginLeft: 3,
      marginTop: 3,
    }}
  >
    {item.role === 'ai' ? (
      <Group spacing={5}>
        <Badge
          pl={5}
          leftSection={<IconRobot style={{ height: 17, marginTop: 6 }} />}
          variant="gradient"
          size="lg"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        >
          AI
        </Badge>

        <CopyButton value={item.text} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? 'Copied' : 'Copy content'}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? 'teal' : 'gray'}
                variant="subtle"
                onClick={copy}
              >
                {copied ? (
                  <IconCheck style={{ width: rem(16) }} />
                ) : (
                  <IconCopy style={{ width: rem(16) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
    ) : (
      <Group fw={500} spacing={5}>
        <Badge
          pl={5}
          size="lg"
          leftSection={
            <IconUser style={{ height: 16, marginTop: 7, strokeWidth: 2.5 }} />
          }
          variant="gradient"
          gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
        >
          You
        </Badge>
      </Group>
    )}

    <Text>{item.text}</Text>

    {item.sourceDocuments && (
      <Stack spacing={5}>
        <Text fw={500} size={'sm'}>
          Source documents:
        </Text>

        {item.sourceDocuments?.map((item: any, i: number) => (
          <Anchor
            key={`anchor-${i}`}
            size={'xs'}
            href={item.metadata.source}
            target="_blank"
          >
            {item.metadata.source}
          </Anchor>
        ))}
      </Stack>
    )}
  </Stack>
)
