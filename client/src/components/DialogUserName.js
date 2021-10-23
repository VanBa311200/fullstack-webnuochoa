import React, { useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material'
import { Stack, FormControl } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateName } from '../store/auth/authSlice';
import { toast } from 'react-toastify'

const DialogUserName = ({ show, onClose }) => {
  const dispatch = useDispatch()
  let idToast = useRef(null)
  const nodeRef = useRef(null)

  const initialValues = {
    firstName: '',
    lastName: ''
  }


  let schema = yup.object().shape({
    firstName: yup.string().required('Giả bộ quên hả...!').max(12, 'Êy, phá quá nha!!!'),
    lastName: yup.string().required('Giả bộ quên hả...!').max(12, 'Êy, phá quá nha!!!'),
  })

  return (

    <Dialog open={show} onClose={onClose} ref={nodeRef}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          idToast = toast.loading('Loading...')
          await dispatch(updateName(values))
            .unwrap()
            .then(({ message }) => {
              toast.update(idToast, { render: message, type: 'success', isLoading: false, autoClose: 2000 })
              actions.resetForm({ values: initialValues })
              onClose()
            })
            .catch(({ message }) => {
              toast.update(idToast, { render: message, type: 'error', isLoading: false, autoClose: 2000 })
            })
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <DialogTitle sx={{ paddingBottom: '10px' }}>Cập nhập tên
              <DialogContentText>Vui lòng nhập tên thật</DialogContentText>
            </DialogTitle>
            <DialogContent>
              <Stack flexDirection='row' gap='10px' flexWrap='wrap'>
                <FormControl
                  sx={{ width: ['100%', '100%', 'auto', 'auto'] }} >
                  <TextField
                    error={errors.firstName ? true : false}
                    id="First Name"
                    name='firstName'
                    value={values.firstName}
                    label='First Name'
                    onChange={handleChange}
                    helperText={errors.firstName}
                    size='small'
                  />
                </FormControl>
                <FormControl

                  sx={{ width: ['100%', '100%', 'auto', 'auto'] }}
                >
                  <TextField
                    error={errors.lastName ? true : false}
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    helperText={errors.lastName}
                    size='small'
                  />
                </FormControl>
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

export default DialogUserName
