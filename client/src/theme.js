import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

let theme = createTheme({})

theme = createTheme({

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    }
  },

  palette: {
    primary: {
      main: '#f67777',
      contrastText: '#fff'
    },
    secondary: {
      main: 'rgba(250, 181, 181, 0.3)',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    color: grey[800],
    subtitle1: {
      fontSize: '14px',
      color: '#757575',
    },
    subtitle2: {
      fontSize: '14px',
      color: 'rgba(0,0,0,.4)',
    },
  },
  components: {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: '10px !important'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '10px 24px 28px 24px',
        }
      }
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingBottom: '10px',
          paddingTop: '28px'
        }
      }
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '8px',
          }
        }
      }
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(5px)'
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          position: 'sticky !important',
          boxShadow: 'none',
          borderRadius: 'unset',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[50],
          color: grey[800],
          boxShadow: theme.shadows[1],
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: grey[800],
          fontSize: '1.8rem',
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#f67777',
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: grey[400]
        }
      }
    }
  }
})


export { theme }