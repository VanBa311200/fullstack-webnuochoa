import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { userLogin, setAuth } from '../../store/auth/authSlice'

import { ButtonAction, Container, Form, FormGroup, IconEye, TitleForm, ErrorMessage, OptionForgot, LinkOption, OptionSign, WrappInput } from './El'
import { useHistory } from 'react-router'


const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isHide, setIsHide] = useState(true)
  // const { loginUser } = useContext(AuthContext)
  const initialValues = {
    email: 'vanba311200@gmail.com',
    password: 'Tk0968246516'
  }

  const schema = yup.object().shape({
    email: yup.string()
      .required('Email không được bỏ trống')
      .email('Bạn phải nhập đúng email'),
    password: yup.string()
      .required('Password không được bỏ trống')
      .test('testUpperCase', 'Mật khẩu phải có ít nhất 1 ký tự viết hoa', (value) =>
        /[A-Z]/.test(value))
      .min(8, 'Mật khẩu ít nhất 8 ký tự')
  })

  const formik = useFormik({
    initialValues
    ,
    validationSchema: schema,
    onSubmit: (data, actions) => {
      const valuePromise = new Promise(async (resolve, reject) => {
        await dispatch(userLogin(data))
          .unwrap()
          .then((resolved) => {
            actions.resetForm({ values: initialValues })
            resolve(resolved.message)
            history.push('/')
            dispatch(setAuth())
          })
          .catch((rejected) => {
            actions.resetForm({ values: { ...data, password: '' } })
            reject(rejected.message)
          })
      })
      toast.promise(valuePromise, {
        pending: 'Loading...!',
        success: {
          render({ data }) {
            return data
          }
        },
        error: {
          render({ data }) {
            return data
          }
        }
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
          Quên <LinkOption to='/'>Tài khoản/Mật khẩu?</LinkOption>
        </OptionForgot>
        <ButtonAction type='submit'>Đăng nhập</ButtonAction>
        <OptionSign>
          <p>Bạn chưa có tài khoản?</p>
          <LinkOption to='/register'>Đăng ký</LinkOption>
        </OptionSign>
      </Form>

    </Container >
  )
}

export default LoginForm

