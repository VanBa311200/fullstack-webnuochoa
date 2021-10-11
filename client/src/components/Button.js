import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const ButtonApp = styled(Button)(({ theme, variant }) => ({
  padding: '0 20px',
  height: '48px',
  borderRadius: '2px',
  border: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '110px',
  boxShadow: '0 1px 1px 0 rgb(0 0 0 / 9%)',
  backgroundColor: `${variant === 'outlined' ? theme.palette.secondary.main : ''}`,
  textTransform: 'capitalize',

  '&:hover': {
    backgroundColor: `${variant === 'contained' ? theme.palette.primary.main : theme.palette.secondary.main}`,
    opacity: 0.90,
  }
}))