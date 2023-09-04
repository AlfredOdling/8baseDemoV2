import { useInputState } from '@mantine/hooks'
import { LiaInternetExplorer, LiaPlusSolid, LiaYoutube } from 'react-icons/lia'
import {
  Button,
  Divider,
  Group,
  Loader,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'

import { card } from '../../shared/styles/styles'
import { useSourcesCreate } from '../../api/useSources/sourcesCreate'
import { useSources } from '../../api/useSources/sources'
import { Source } from './components/Source'

export function SourcesPage() {
  const [selectValue, setSelectValue] = useInputState<string | null>('website')
  const [urlValue, setUrlValue] = useInputState(
    'http://books.toscrape.com/catalogue/sapiens-a-brief-history-of-humankind_996/index.html'
  )
  const sourcesCreate = useSourcesCreate()
  const sourcesList = useSources()

  const setValue = (value: string) => {
    setUrlValue(value)

    value.includes('youtube')
      ? setSelectValue('youtube')
      : setSelectValue('website')
  }

  if (sourcesList.isLoading) {
    return <Loader />
  }

  return (
    <Stack
      spacing={15}
      sx={{
        ...card,
        width: '90%',
        alignItems: 'flex-start',
        padding: 25,
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
          disabled={!urlValue || sourcesCreate.isLoading}
          loading={sourcesCreate.isLoading}
          onClick={() => {
            sourcesCreate.mutate({ url: urlValue, type: selectValue })
            setValue('')
          }}
          leftIcon={<LiaPlusSolid />}
        >
          Scrape
        </Button>
      </Group>

      <Space h="xs" />

      {sourcesList.data?.map(item => (
        <Source key={item.id} item={item} />
      ))}

      <Divider />
    </Stack>
  )
}
