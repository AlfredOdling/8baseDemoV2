import { useEffect, useState } from 'react'
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Button,
  Stack,
  Text,
} from '@mantine/core'
import {
  IconLogout,
  IconFileDownload,
  IconFileTextAi,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { paths } from '../../routes/paths'
import { useLocation } from 'react-router-dom'
import { LiaArrowLeftSolid } from 'react-icons/lia'

const useStyles = createStyles(theme => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  },
}))

const data = [
  { link: paths.sources, label: 'Sources', icon: IconFileDownload },
  { link: paths.contents, label: 'Content', icon: IconFileTextAi },
]

export function NavbarSimple() {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth0()

  useEffect(() => {
    const activeLink = data.find(item => location.pathname.includes(item.link))
    if (activeLink) {
      setActive(activeLink.label)
    }
  }, [location.pathname])

  const links = data.map(item => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={event => {
        event.preventDefault()
        navigate(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group
          className={classes.header}
          position="apart"
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button
            leftIcon={<LiaArrowLeftSolid />}
            variant="subtle"
            color="gray"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Group>

        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Stack>
          <Text>{user?.email}</Text>

          <Button
            variant="gradient"
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo:
                    process.env.NODE_ENV === 'production'
                      ? 'https://main--delicate-eclair-57fb94.netlify.app/loginSignUp'
                      : 'http://localhost:3001/loginSignUp',
                },
              })
            }
          >
            Logout
            <IconLogout style={{ marginLeft: '5px', strokeWidth: 1.2 }} />
          </Button>
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
