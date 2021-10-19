import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Stack, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup';

import { ButtonApp } from './Button'

const DialogUserName = ({ show, onClose }) => {
  const initialValues = {
    firstName: '',
    lastName: ''
  }


  let schema = yup.object().shape({
    firstName: yup.string().required('Giả bộ quên hả...!').max(12, 'Êy, phá quá nha!!!'),
    lastName: yup.string().required('Giả bộ quên hả...!').max(12, 'Êy, phá quá nha!!!'),
  })

  return (
    <Dialog open={show} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log(values)
          actions.resetForm({ values: initialValues })
          onClose()
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <DialogTitle sx={{ paddingBottom: '10px' }}>Sửa tên của bạn</DialogTitle>
            <DialogContent>
              <Stack flexDirection='row' gap='10px' flexWrap='wrap'>
                <FormControl
                  error={errors.firstName ? true : false}
                  sx={{ width: ['100%', '100%', 'auto', 'auto'] }} >
                  <InputLabel htmlFor="First Name">First Name</InputLabel>
                  <OutlinedInput
                    id="First Name"
                    name='firstName'
                    value={values.firstName}
                    label='First Name'
                    onChange={handleChange}
                  />
                  {errors.firstName && touched.firstName && <FormHelperText>{errors.firstName}</FormHelperText>}
                </FormControl>
                <FormControl
                  error={errors.lastName ? true : false}
                  sx={{ width: ['100%', '100%', 'auto', 'auto'] }}
                >
                  <InputLabel htmlFor="Last Name">Last Name</InputLabel>
                  <OutlinedInput
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && touched.lastName && <FormHelperText>{errors.lastName}</FormHelperText>}
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <ButtonApp variant='contained' onClick={onClose}>Cancel</ButtonApp>
              <ButtonApp variant='outlined' onClick={handleSubmit}>Update</ButtonApp>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default DialogUserName
