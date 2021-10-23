import React, { useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material'
import { Stack } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updatePhone } from '../store/auth/authSlice';
import { toast } from 'react-toastify'

const DialogChangePhone = ({ show, onClose }) => {
  const dispatch = useDispatch()
  let idToast = useRef(null)

  const initialValues = {
    phone: '',
  }


  let schema = yup.object().shape({
    phone: yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại gì kỳ v =))")
      .required('Quên chưa nhập nè =))')
      .min(10, 'Số điện thoại chưa tới 10 chữ số kìa')
      .max(11, 'Số điện thoại dài dữ vậy')
  })

  return (
    <Dialog
      open={show}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '370px'
        }
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          idToast = toast.loading('Loading...')
          await dispatch(updatePhone(values))
            .unwrap()
            .then(({ message }) => {
              toast.update(idToast, { render: message, type: 'success', isLoading: false, autoClose: 3000 })
              actions.resetForm({ values: initialValues })
              onClose()
            })
            .catch(({ message }) => {
              toast.update(idToast, { render: message, type: 'error', isLoading: false, autoClose: 3000 })
              actions.resetForm({ values: initialValues })
            })
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <DialogTitle sx={{ paddingBottom: '10px' }}>
              Thay đổi số điện thoại
              <DialogContentText>Hai giờ sáng anh gọi em không bắt máy</DialogContentText>
            </DialogTitle>
            <DialogContent sx={{ overflow: 'hidden' }}>
              <Stack flexDirection='column' gap='10px' flexWrap='wrap'>
                <TextField
                  error={touched.phone && errors.phone ? true : false}
                  name="phone"
                  label="Nhập số điện thoại"
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                  helperText={touched.phone && errors.phone}
                  size='small'
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={handleSubmit}
              >Update</Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default DialogChangePhone
