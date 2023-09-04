import {
  LiaCheckCircle,
  LiaCloudDownloadAltSolid,
  LiaSpinnerSolid,
  LiaTrashSolid,
} from 'react-icons/lia'
import { ActionIcon, Anchor, Code, Group, Loader, Stack } from '@mantine/core'
import { Source_ } from '../../../api/types/schemaTypes'

export const Source = ({ item }: { item: Source_ }) => (
  <Stack
    key={item.id}
    sx={{
      padding: 10,
      borderRadius: 10,
      border: '1px solid #cccccc',
      width: '100%',
    }}
  >
    <Group sx={{ justifyContent: 'space-between' }}>
      <Anchor href={item.url!} target="_blank">
        {item.url}
      </Anchor>

      {item.done ? <LiaCheckCircle /> : <Loader size={'sm'} />}
    </Group>

    <Group>
      <ActionIcon variant="solid" size="sm">
        {false ? <LiaSpinnerSolid /> : <LiaCloudDownloadAltSolid />}
      </ActionIcon>

      <ActionIcon variant="solid" size="sm">
        {false ? <LiaSpinnerSolid /> : <LiaTrashSolid />}
      </ActionIcon>
    </Group>
  </Stack>
)
