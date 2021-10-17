import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { apiUrl } from '../../context/contanst'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { checkTypeImage } from '../../helper/index'

const UploadFile = () => {
  // const [files, setFiles] = useState()

  const schema = yup.object().shape({
    name: yup.string()
      .required('Field is required')
      .min(2, 'More than 1'),
    imageDesktop: yup
      .mixed()
      .required('Field is required')
      .test('fileType', 'File unsuppport format',
        (value) => {
          if (typeof value === 'undefined') {
            return false
          }
          return checkTypeImage(value.type)
        }),
    imageMobile: yup
      .mixed()
      .required('Field is required')
      .test('fileType', 'File unsuppport format',
        (value) => {
          if (typeof value === 'undefined') {
            return false
          }
          return checkTypeImage(value.type)
        }),
  })

  const initialValues = {
    name: '',
    imageDesktop: '',
    imageMobile: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      let data = new FormData()
      data.append('name', values.name)
      data.append('imageDesktop', values.imageDesktop)
      data.append('imageMobile', values.imageMobile)
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
        formik.resetForm({ values: initialValues })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   const getBanner = async () => {
  //     const res = await axios.get(`${apiUrl}/api/banner`)
  //     if (res.data.success) {
  //       setFiles(Object.values(res.data.data))
  //     }
  //   }

  //   getBanner()
  // }, [])

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
          <Form.Label>imageDesktop</Form.Label>
          <Form.Control
            type="file"
            name='imageDesktop'
            onChange={e => {
              formik.setFieldValue('imageDesktop', e.target.files[0]);
            }}
          />
          {
            formik.touched.imageDesktop && formik.errors.imageDesktop ?
              (<Form.Text style={err}>
                {formik.errors.imageDesktop}
              </Form.Text>) : null
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFile">
          <Form.Label>imageMobile</Form.Label>
          <Form.Control
            type="file"
            name='imageMobile'
            onChange={e => {
              formik.setFieldValue('imageMobile', e.target.files[0]);
            }}
          />
          {
            formik.touched.imageMobile && formik.errors.imageMobile ?
              (<Form.Text style={err}>
                {formik.errors.imageMobile}
              </Form.Text>) : null
          }
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* <Row>
        {
          files && files.map((img, index) => (
            <Col xs={6} md={4} key={index}>
              <Image style={{ width: '100%' }} src={`${apiUrl}/static/${img.image.fileName}`} rounded />
            </Col>
          ))
        }
      </Row> */}

    </Container>
  )
}

export default UploadFile
