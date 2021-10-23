import React, { useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material'
import { Stack } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../store/auth/authSlice';
import { toast } from 'react-toastify'

const DialogChangePass = ({ show, onClose }) => {
  const dispatch = useDispatch()
  let idToast = useRef(null)

  const initialValues = {
    currentPassword: '',
    password: '',
    comfirmPassword: ''
  }


  let schema = yup.object().shape({
    currentPassword: yup.string().required('Điền vô nhanh'),
    password: yup.string()
      .required('Điền vô nhanh')
      .test('testUpperCase', 'Mật khẩu phải có ít nhất 1 ký tự viết hoa', (value) =>
        /[A-Z]/.test(value))
      .min(8, 'Mật khẩu ít nhất 8 ký tự'),
    comfirmPassword: yup.string()
      .required('Điền vô nhanh')
      .oneOf([yup.ref('password'), null], 'Gõ lại cũn gõ sai!!!')
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
          if (values.currentPassword === values.comfirmPassword)
            return toast.error('Mật khẩu mới không được chùng với mật khẩu cũ', { autoClose: 3000 })
          idToast = toast.loading('Loading...')
          await dispatch(updatePassword(values))
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
            <DialogTitle sx={{ paddingBottom: '10px' }}>Thay đổi mật khẩu
              <DialogContentText sx={{
                fontSize: '14px',
              }}>
                Đặt mật khẩu có các ký tự đặc biệt để tăng cường bảo mật tài khoản hơn.
              </DialogContentText>
            </DialogTitle>
            <DialogContent>
              <Stack flexDirection='column' gap='10px' flexWrap='wrap'>
                <TextField
                  error={touched.currentPassword && errors.currentPassword ? true : false}
                  name='currentPassword'
                  value={values.currentPassword}
                  label='Password hiện tại'
                  type='password'
                  onChange={handleChange}
                  helperText={touched.currentPassword && errors.currentPassword}
                  size='small'
                />
                <TextField
                  error={touched.password && errors.password ? true : false}
                  name='password'
                  value={values.password}
                  label='Password'
                  type='password'
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  size='small'
                />
                <TextField
                  error={touched.comfirmPassword && errors.comfirmPassword ? true : false}
                  name="comfirmPassword"
                  label="Nhập lại Password"
                  type="password"
                  value={values.comfirmPassword}
                  onChange={handleChange}
                  helperText={touched.comfirmPassword && errors.comfirmPassword}
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

export default DialogChangePass
