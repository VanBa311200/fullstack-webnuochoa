import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { ButtonApp } from '../Button'
import { userRegister } from '../../store/auth/authSlice'
import { Container, Form, FormGroup, TitleForm, ErrorMessage, LinkOption, OptionSign, WrappInput } from './El'
import { checkEmailExist } from '../../helper'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    firstName: yup.string()
      .min(2, 'Tên không hợp lệ')
      .required('Tên không được bỏ trống'),
    lastName: yup.string()
      .required('Họ không được bỏ trống')
      .min(2, 'Họ không hợp lệ'),
    email: yup.string()
      .required('Email không được bỏ trống')
      .email('Bạn phải nhập đúng email')
      .test('checkExistUser', 'Email này đã được đăng ký',
        (values) => {
          return checkEmailExist(values)
        }
      ),
    password: yup.string()
      .required('Password không được bỏ trống')
      .test('testUpperCase', 'Mật khẩu phải có ít nhất 1 ký tự viết hoa', (value) =>
        /[A-Z]/.test(value))
      .min(8, 'Mật khẩu ít nhất 8 ký tự'),
    comfirmPassword: yup.string()
      .required('Password không được bỏ trống')
      .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng')
  })

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    comfirmPassword: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(data, actions) => {
        const resolveWithSomeData = new Promise(async (resolve, reject) => {
          dispatch(userRegister(data))
            .unwrap()
            .then((result) => {
              actions.resetForm({ values: initialValues })
              resolve(result.message)
            })
            .catch((result) => {
              actions.resetForm({ ...data, comfirmPassword: '', password: '' })
              reject(result.message)
            })
        });
        toast.promise(resolveWithSomeData, {
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
          },
        })
      }}
    >
      {formik => (
        <Container>
          <Form autoComplete="off" onSubmit={formik.handleSubmit} >
            <TitleForm>
              <h3>Đăng ký</h3>
              <p>Bạn vui lòng điền các thông tin sau:</p>
            </TitleForm>
            <FormGroup>
              <WrappInput>
                <input
                  type="text"
                  name='firstName'
                  className={formik.errors.firstName && formik.touched.firstName ? 'error' : null}
                  placeholder=' '
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className={formik.errors.firstName && formik.touched.firstName ? 'error' : null}>Tên</label>
              </WrappInput>
              {formik.touched.firstName && formik.errors.firstName && <ErrorMessage>{formik.errors.firstName}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <WrappInput>
                <input
                  type="text"
                  name='lastName'
                  className={formik.errors.lastName && formik.touched.lastName ? 'error' : null}
                  placeholder=' '
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className={formik.errors.lastName && formik.touched.lastName ? 'error' : null}>Họ</label>
              </WrappInput>
              {formik.touched.lastName && formik.errors.lastName && <ErrorMessage>{formik.errors.lastName}</ErrorMessage>}
            </FormGroup>
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
              <WrappInput>
                <input
                  type='password'
                  name='password'
                  placeholder=' '
                  className={formik.errors.password && formik.touched.password ? 'error' : null}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className={formik.errors.password && formik.touched.password ? 'error' : null}>Password</label>
              </WrappInput>
              {formik.touched.password && formik.errors.password && <ErrorMessage>{formik.errors.password}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <WrappInput>
                <input
                  type='password'
                  name='comfirmPassword'
                  placeholder=' '
                  className={formik.errors.comfirmPassword && formik.touched.comfirmPassword ? 'error' : null}
                  value={formik.values.comfirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className={formik.errors.comfirmPassword && formik.touched.comfirmPassword ? 'error' : null}>Comfirm Password</label>
              </WrappInput>
              {formik.touched.comfirmPassword && formik.errors.comfirmPassword && <ErrorMessage>{formik.errors.comfirmPassword}</ErrorMessage>}
            </FormGroup>

            <ButtonApp
              variant='contained'
              sx={{ minWidth: '100%' }}
              type='submit'
            >
              Đăng ký
            </ButtonApp>
            <OptionSign>
              <p>Bạn đã có tài khoản?</p>
              <LinkOption to='/login'>Đăng nhập</LinkOption>
            </OptionSign>
          </Form>

        </Container>
      )}
    </Formik >

  )
}

export default RegisterForm

