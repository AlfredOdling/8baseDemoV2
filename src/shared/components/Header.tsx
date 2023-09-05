import { useNavigate } from 'react-router-dom'
import { LiaArrowLeftSolid } from 'react-icons/lia'
import { Group } from '@mantine/core'

import { ActionIcon } from './ActionIcon'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <Group
      sx={{
        width: '100%',
        alignItems: 'center',
        padding: '15px',
        justifyContent: 'space-between',
        display: 'none',
      }}
    >
      <ActionIcon
        disabled={window.location.pathname === '/'}
        onClick={() => navigate(-1)}
      >
        <LiaArrowLeftSolid />
      </ActionIcon>
    </Group>
  )
}
