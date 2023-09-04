import { motion } from 'framer-motion'
import { LiaPlusSolid, LiaSpinnerSolid, LiaTrashSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { ActionIcon, Button, Divider, Group, Stack, Title } from '@mantine/core'

import { card } from '../../shared/styles/styles'
import { useContent2Create } from '../../api/useContent/contentCreate'
import { useContents } from '../../api/useContent/contents'
import { useContent2Delete } from '../../api/useContent/contentDelete'

export function ContentsPage() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  const contentCreate = useContent2Create()
  const contentDelete = useContent2Delete()
  const contentList = useContents()

  return (
    <Stack
      sx={{
        ...card,
      }}
    >
      <Group sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Title order={2}>Content</Title>
        <Divider />

        <Button
          loading={contentCreate.isLoading}
          onClick={() => contentCreate.mutate()}
          leftIcon={<LiaPlusSolid />}
        >
          New
        </Button>
      </Group>
      <Divider />

      {contentList?.data?.map(item => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`${item.id}-contents`}
        >
          <Group spacing={10}>
            <Button onClick={() => navigate(item.id!)}>
              {!isMobile
                ? item.title
                : item.title!.length > 25
                ? `${item.title!.substring(0, 25)}...`
                : item.title}
            </Button>

            <ActionIcon
              variant="solid"
              size="sm"
              onClick={() => contentDelete.mutate(item.id)}
            >
              {contentDelete.isLoading ? (
                <LiaSpinnerSolid />
              ) : (
                <LiaTrashSolid />
              )}
            </ActionIcon>
          </Group>
        </motion.div>
      ))}
    </Stack>
  )
}
