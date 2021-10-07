import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { apiUrl } from '../../context/contanst'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { ErrorMessage } from '../auth/El'
import { checkTypeImage } from '../../helper/index'

const UploadProduct = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const getAllBrand = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/brand`)
        if (!res.data.success) {
          console.log(res.data.message)
        } else {
          setBrands(res.data.brands)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllBrand()
  }, [])

  const schema = yup.object().shape({
    brand: yup.string()
      .required('Brand không được bỏ trống'),
    name: yup.string()
      .required('Name không được bỏ trống'),
    price: yup.number()
      .required('Price không được bỏ trống')
      .positive()
      .integer(),
    percentSale: yup.number()
      .integer()
      .positive()
      .max(100, 'Percent không được lớn hơn 100'),
    ratingNumber: yup.number()
      .max(5, 'Number Rating không được lớn hơn 5')
      .positive(),
    description: yup.string()
      .required('Description không được bỏ trống'),
    images: yup.mixed()
      .required('Images không được bỏ trống')
      .test('fileType', 'File unsuppport format',
        (value) => {
          if (typeof value === 'undefined') {
            return false
          }
          else {
            return checkTypeImage(value)
          }
        }),
    gender: yup.string()
      .required('Gender không được bỏ trống')
    // .oneOf(['0', '1'])
  })

  const formik = useFormik({
    initialValues: {
      brand: '',
      name: '',
      price: '',
      percentSale: '',
      priceSale: '',
      ratingNumber: '',
      isNewProduct: '',
      gender: '', // 0 men, 1 laydy 
      description: '',
      images: ''
    },
    validationSchema: schema,
    onSubmit: async (data) => {

      console.log(data)
      const dataForm = new FormData()
      dataForm.append('brand', data.brand)
      dataForm.append('name', data.name)
      dataForm.append('price', data.price)
      dataForm.append('percentSale', data.percentSale)
      dataForm.append('priceSale', data.priceSale)
      dataForm.append('ratingNumber', data.ratingNumber)
      dataForm.append('description', data.description)
      dataForm.append('isNewProduct', data.isNewProduct)
      dataForm.append('gender', data.gender)
      console.log(Object.values(data.images))
      Object.values(data.images).forEach((e) => {
        dataForm.append('images', e)
      })
      try {
        const res = await axios.post(`${apiUrl}/api/product`, dataForm)
        if (res.data.success)
          console.log(res.data.message, res.data.product)
        else console.log(res.data.message)
      } catch (error) {
        console.log(error)
      }

    }
  })

  return (
    <Container style={{ minHeight: '85vh', display: 'flex', justifyContent: 'center' }}>
      <Form style={{ minWidth: '600px', maxWidth: '700px', margin: 'auto', padding: '30px 0' }} onSubmit={formik.handleSubmit}>
        <h3>Thêm sản phẩm</h3>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            as='select'
            name='brand'
            value={formik.values.brand}
            onChange={formik.handleChange}
          >
            <option value="" style={{ textAlign: 'center' }}>---brand---</option>
            {brands && brands.map((b) =>
              <option key={b._id} value={b._id}>{b.name}</option>
            )}
          </Form.Control>
          {
            formik.touched.brand && formik.errors.brand ?
              (<ErrorMessage>
                {formik.errors.brand}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Enter name...'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
          </Form.Control>
          {
            formik.touched.name && formik.errors.name ?
              (<ErrorMessage>
                {formik.errors.name}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            name='price'
            placeholder='Enter price...'
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
          </Form.Control>
          {
            formik.touched.price && formik.errors.price ?
              (<ErrorMessage>
                {formik.errors.price}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Precent Sale</Form.Label>
          <Form.Control
            type='text'
            name='percentSale'
            placeholder='Enter percent...'
            value={formik.values.percentSale}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
          </Form.Control>
          {
            formik.touched.percentSale && formik.errors.percentSale ?
              (<ErrorMessage>
                {formik.errors.percentSale}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Price of Sale</Form.Label>
          <Form.Control
            type='text'
            name='priceSale'
            placeholder='Enter price of sale...'
            disabled
            value={formik.values.priceSale =
              formik.values.percentSale ?
                parseInt(formik.values.price * ((100 - formik.values.percentSale) / 100))
                :
                formik.values.price
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Number rating</Form.Label>
          <Form.Control
            type='text'
            name='ratingNumber'
            placeholder='Number rating'
            value={formik.values.ratingNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
          </Form.Control>
          {
            formik.touched.ratingNumber && formik.errors.ratingNumber ?
              (<ErrorMessage>
                {formik.errors.ratingNumber}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>New Product</Form.Label>
          <Form.Check
            type='checkbox'
            name='isNewProduct'
            label='new product'
            value={formik.values.isNewProduct}
            onChange={formik.handleChange}
          >
          </Form.Check>
        </Form.Group>
        <Form.Group >
          <Form.Label>Gender</Form.Label>
          <div>
            <fieldset id="group1">
              <Form.Check
                inline
                type='radio'
                name='gender'
                label='Man'
                onClick={() => formik.values.gender = 0}
              >
              </Form.Check>
              <Form.Check
                inline
                type='radio'
                name='gender'
                label='Lady'
                onClick={() => formik.values.gender = 1}
              >
              </Form.Check>
            </fieldset>
          </div>
          {
            formik.touched.gender && formik.errors.gender ?
              (<ErrorMessage>
                {formik.errors.gender}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Description Product</Form.Label>
          <Form.Control
            as='textarea'
            rows='4'
            name='description'
            style={{ resize: 'none' }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
          </Form.Control>
          {
            formik.touched.description && formik.errors.description ?
              (<ErrorMessage>
                {formik.errors.description}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Images Product</Form.Label>
          <Form.Control
            type='file'
            name='images'
            onChange={e => { formik.setFieldValue('images', e.target.files) }}
            multiple
          >
          </Form.Control>
          {
            formik.touched.images && formik.errors.images ?
              (<ErrorMessage>
                {formik.errors.images}
              </ErrorMessage>) : null
          }
        </Form.Group>
        <Button type='submit'>Thêm sản phẩm</Button>
      </Form>
    </Container>
  )
}

export default UploadProduct
