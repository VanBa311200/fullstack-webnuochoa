import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap'
import { apiUrl } from '../../context/contanst'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { checkTypeImage } from '../../helper/index'

const UploadFile = () => {
  const [files, setFiles] = useState()

  const schema = yup.object().shape({
    name: yup.string()
      .required('Field is required')
      .min(2, 'More than 1'),
    file: yup
      .mixed()
      .required('Field is required')
      .test('fileType', 'File unsuppport format',
        (value) => {
          if (typeof value === 'undefined') {
            return false
          }
          checkTypeImage(value.type)
        })
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      file: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      let data = new FormData()
      data.append('myfile', values.file)
      data.append('name', values.name)
      onSubmit(data)
    }
  })


  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/api/banner`, data
      )

      if (!res.data.success) {
        console.log(res.data.message)
      } else {
        console.log(res.data.message)
        formik.resetForm({ values: { name: '', file: '' } })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getBanner = async () => {
      const res = await axios.get(`${apiUrl}/api/banner`)
      if (res.data.success) {
        setFiles(Object.values(res.data.data))
      }
    }

    getBanner()
  }, [])

  const err = {
    color: 'red',
    fontSize: '14px'
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {
            formik.touched.name && formik.errors.name ?
              (<Form.Text style={err}>
                {formik.errors.name}
              </Form.Text>) : null
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFile">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            name='file'
            onChange={e => {
              formik.setFieldValue('file', e.target.files[0]);
            }}
          />
          {
            formik.touched.file && formik.errors.file ?
              (<Form.Text style={err}>
                {formik.errors.file}
              </Form.Text>) : null
          }
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row>
        {
          files && files.map((img, index) => (
            <Col xs={6} md={4} key={index}>
              <Image style={{ width: '100%' }} src={`${apiUrl}/static/${img.image.fileName}`} rounded />
            </Col>
          ))
        }
      </Row>

    </Container>
  )
}

export default UploadFile
