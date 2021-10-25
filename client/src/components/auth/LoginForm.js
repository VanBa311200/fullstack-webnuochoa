import React, { useRef, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { userLogin, setAuth } from '../../store/auth/authSlice'
import { LoadingButton } from '@mui/lab'


import { Container, Form, FormGroup, IconEye, TitleForm, ErrorMessage, OptionForgot, LinkOption, OptionSign, WrappInput } from './El'
import { useHistory } from 'react-router'


const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  let idToast = useRef(null)
  const [isHide, setIsHide] = useState(true)
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  const initialValues = {
    email: '',
    password: ''
  }

  const schema = yup.object().shape({
    email: yup.string()
      .required('Điền vô nhanh')
      .email('Chưa phải email nha'),
    password: yup.string()
      .required('Điền vô nhanh')
      .test('testUpperCase', 'Mật khẩu phải có ít nhất 1 ký tự viết hoa', (value) =>
        /[A-Z]/.test(value))
      .min(8, 'Ít nhất 8 ký tự nha bạn')
  })

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (data, actions) => {
      setIsLoadingButton(!isLoadingButton)
      idToast = toast.loading('Loading...')
      await dispatch(userLogin(data))
        .unwrap()
        .then(({ message }) => {
          actions.resetForm({ values: initialValues })
          toast.update(idToast, { render: message, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: false })
          setIsLoadingButton(!isLoadingButton)
          history.push('/')
          dispatch(setAuth())
        })
        .catch(({ message }) => {
          actions.resetForm({ values: { ...data, password: '' } })
          toast.update(idToast, { render: message, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: false })
          setIsLoadingButton(!isLoadingButton)
        })
    }
  })


  return (
    <Container>
      <Form autoComplete='off' onSubmit={formik.handleSubmit} >
        <TitleForm>
          <h3>Đăng nhập</h3>
          <p>Bạn vui lòng điền các thông tin sau:</p>
        </TitleForm>
        <FormGroup>
          <WrappInput>
            <input
              type="email"
              name='email'
              className={formik.errors.email && formik.touched.email ? 'error' : null}
              placeholder=' '
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className={formik.errors.email && formik.touched.email ? 'error' : null}>Email</label>
          </WrappInput>
          {formik.touched.email && formik.errors.email && <ErrorMessage>{formik.errors.email}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <div style={{ position: 'relative' }}>
            <WrappInput>
              <input
                type={isHide ? 'password' : 'text'}
                name='password'
                placeholder=' '
                className={formik.errors.password && formik.touched.password ? 'error' : null}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className={formik.errors.password && formik.touched.password ? 'error' : null}>Password</label>
            </WrappInput>
            <IconEye onClick={() => setIsHide(!isHide)}>
              {isHide ? <FaEyeSlash /> : <FaEye />}
            </IconEye>
          </div>
          {formik.touched.password && formik.errors.password && <ErrorMessage>{formik.errors.password}</ErrorMessage>}
        </FormGroup>
        <OptionForgot>
          Quên <LinkOption to='#'>Tài khoản/Mật khẩu?</LinkOption>
        </OptionForgot>
        <LoadingButton loading={isLoadingButton && isLoadingButton} variant='contained' sx={{ minWidth: '100%' }} type='submit'>Đăng nhập</LoadingButton>
        <OptionSign>
          <p>Bạn chưa có tài khoản?</p>
          <LinkOption to='/register'>Đăng ký</LinkOption>
        </OptionSign>
      </Form>

    </Container >
  )
}

export default LoginForm

