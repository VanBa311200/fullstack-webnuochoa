import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

export const ButtonVariation = styled(Chip)(({ theme }) => ({
  height: '30px',
  borderRadius: '2px',
  border: `1px solid rgba(0,0,0,.09)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 1px 0 rgb(0 0 0 / 9%)',
  textTransform: 'capitalize',

  fontSize: '14px',
  cursor: 'pointer',
  minWidth: '60px',
  minHeight: '2.125rem',
  boxSizing: 'border-box',
  padding: '4px 5px',
  color: 'rgba(0, 0, 0, 0.8)',
  textAlign: 'left',
  position: 'relative',
  background: 'transparent',
  outline: '0px',

  '&:hover': {
    backgroundColor: `transparent`,
    opacity: 0.90,
    color: `${theme.palette.primary.main}`
  },

  '&.active': {
    border: `1px solid ${theme.palette.primary.main}`,
    color: `${theme.palette.primary.main}`,
  }
}))


