import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  components: {
    Title: {
      styles: {
        root: {},
      },
    },
    Text: {
      styles: {
        root: {},
      },
    },
    Button: {
      styles: {
        root: {
          '&:hover': {
            transform: 'scale(0.99)',
            backgroundPosition: '100% 0',
            transition: 'all .2s ease-in-out',
          },
          '&:active': {
            transform: 'scale(0.97)',
          },
        },
      },
    },
    ActionIcon: {
      styles: {
        root: {
          border: 'none',
          '&:hover': {
            transform: 'scale(0.95)',
            backgroundPosition: '100% 0',
            transition: 'all .35s ease-in-out',
          },
          '&:active': {
            transform: 'scale(0.91)',
          },
          '&:disabled': {
            background: 'transparent',
          },
        },
      },
    },
    Divider: {
      defaultProps: {
        color: '#868e9633',
      },
    },
    Select: {
      styles: {
        root: {
          '& .mantine-Select-input': {
            border: 'none',

            '&:hover': {
              transform: 'scale(0.97)',
              backgroundPosition: '100% 0',
              transition: 'all .35s ease-in-out',
            },

            '&:active': {
              transform: 'scale(0.93)',
            },
          },

          '.mantine-Select-dropdown': {
            border: 'none',
          },

          '.mantine-Select-item': {
            '&:hover': {
              transform: 'scale(0.97)',
              backgroundPosition: '100% 0',
              transition: 'all .35s ease-in-out',
            },

            '&:active': {
              transform: 'scale(0.93)',
            },
          },
        },
      },
    },
    TextInput: {
      styles: {
        root: {
          '.mantine-TextInput-input': {},
        },
      },
    },
  },
}
