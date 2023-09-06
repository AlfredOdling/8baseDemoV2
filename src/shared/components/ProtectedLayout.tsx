import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Group, Stack } from '@mantine/core'

import { Auth0ProviderWithRedirectCallback } from '../auth'
import { Header } from './Header'
import { env } from '../env'
import { NavbarSimple } from './Sidebar'

export const ProtectedLayout = () => {
  console.log('🚀  window.location.origin:', window.location.origin)
  return (
    <Auth0ProviderWithRedirectCallback
      domain={env.AUTH0_DOMAIN}
      clientId={env.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Group spacing={0}>
            <NavbarSimple />

            <Stack
              sx={{
                height: '100vh',
                alignItems: 'center',
                background: '#F3F3F7',
                flex: 1,
                paddingBottom: 30,
                paddingTop: 30,
                flexWrap: 'unset',
              }}
            >
              <Header />
              <Outlet />
            </Stack>
          </Group>
        </motion.div>
      </AnimatePresence>
    </Auth0ProviderWithRedirectCallback>
  )
}
