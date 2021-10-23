import React, { useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText, InputLabel, FormControl, Select, FormHelperText, MenuItem, Grid, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateAddress } from '../store/auth/authSlice';
import { toast } from 'react-toastify'
import axios from 'axios';

const DialogChangePhone = ({ show, onClose }) => {
  const dispatch = useDispatch()
  let idToast = useRef(null)
  const [listProvinces, setListProvinces] = React.useState([])
  const [listDistrict, setListDistrict] = React.useState([])
  const [listWard, setListWard] = React.useState([])

  const handleChangeSelectProvinces = async (object) => {
    const province_id = object.province_id
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${province_id}`)
    formik.setFieldValue('ward', '')
    formik.setFieldValue('district', '')
    setListDistrict([])
    setListWard([])
    setListDistrict(res.data.results)
  }

  const handleChangeSelectDistrict = async (object) => {
    const district_id = object.district_id
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district_id}`)
    formik.setFieldValue('ward', '')
    setListWard([])
    setListWard(res.data.results)
  }

  React.useEffect(() => {
    const getAddressCountry = async () => {
      const res = await axios.get('https://vapi.vnappmob.com/api/province/')
      setListProvinces(res.data.results)
    }
    getAddressCountry()
  }, [])

  const initialValues = {
    addressDetail: "",
    city: "",
    district: "",
    ward: ""
  }

  let validationSchema = yup.object().shape({
    addressDetail: yup.string().required('Điền vô nhanh'),
    city: yup.string().required('Điền vô nhanh'),
    district: yup.string().required('Điền vô nhanh'),
    ward: yup.string().required('Điền vô nhanh'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (datas, actions) => {
      onSubmit(datas, actions)
    },
  });

  const onSubmit = async (values, actions) => {
    idToast = toast.loading('Loading...')
    await dispatch(updateAddress(values))
      .unwrap()
      .then(({ message }) => {
        toast.update(idToast, { render: message, type: 'success', isLoading: false, autoClose: 3000 })
        actions.resetForm({ values: initialValues })
        setListDistrict([])
        setListProvinces([])
        setListWard([])
        onClose()
      })
      .catch(({ message }) => {
        toast.update(idToast, { render: message, type: 'error', isLoading: false, autoClose: 3000 })
        actions.resetForm({ values: initialValues })
      })
  }

  return (
    <Dialog
      open={show}
      onClose={onClose}
    >
      <form
        onSubmit={formik.handleSubmit}
      >
        <DialogTitle sx={{ paddingBottom: '10px' }}>
          Thay đổi địa chỉ
          <DialogContentText>
            Cung cấp địa chỉ cho chúng tôi giao hàng cho bạn nhanh chóng
          </DialogContentText>
        </DialogTitle>
        <DialogContent sx={{ overflow: 'hidden' }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <TextField
                error={formik.touched.addressDetail && formik.errors.addressDetail ? true : false}
                name="addressDetail"
                label="Address"
                type="text"
                value={formik.values.addressDetail}
                onChange={formik.handleChange}
                helperText={formik.touched.addressDetail && formik.errors.addressDetail}
                size='small'
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <FormControl fullWidth error={formik.touched.city && formik.errors.city ? true : false} size='small' >
                <InputLabel id="demo-simple-select-helper-label">Thành phố/Tỉnh</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  name='city'
                  value={formik.values.city}
                  label="Thành phố/Tỉnh"
                  onChange={
                    formik.handleChange
                  }
                  size='small'
                >
                  <MenuItem value="">
                    {!listProvinces && <CircularProgress sx={{ mr: '10px' }} color='primary' size={20} />}
                    --Thành phố/Tỉnh--
                  </MenuItem>
                  {listProvinces && listProvinces.map(s =>
                    <MenuItem key={s.province_id} value={s.province_name} onClick={() => handleChangeSelectProvinces(s)}>
                      {s.province_name}
                    </MenuItem>
                  )}
                </Select>
                {formik.touched.city && formik.errors.city && <FormHelperText>{formik.errors.city}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={10} md={5}>
              <FormControl
                fullWidth
                error={formik.touched.district && formik.errors.district ? true : false}
                size='small'
              >
                <InputLabel id="demo-simple-select-helper-label">Quận/Huyện</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  value={formik.values.district}
                  label="Quận/Huyện"
                  name='district'
                  onChange={
                    formik.handleChange
                  }
                >
                  <MenuItem value="">
                    {listDistrict.length === 0 && <CircularProgress sx={{ mr: '10px' }} color='primary' size={20} />}
                    --Chọn Quận/Huyện--
                  </MenuItem>
                  {listDistrict && listDistrict.map(s =>
                    <MenuItem key={s.district_id} value={s.district_name} onClick={() => handleChangeSelectDistrict(s)}>
                      {s.district_name}
                    </MenuItem>
                  )}
                </Select>
                {formik.touched.district && formik.errors.district && <FormHelperText>{formik.errors.district}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={10} md={6}>
              <FormControl
                fullWidth
                error={formik.touched.ward && formik.errors.ward ? true : false}
                size='small'
              >
                <InputLabel id="demo-simple-select-helper-label">Phường/Xã</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  value={formik.values.ward}
                  label="Phường/Xã"
                  name='ward'
                  onChange={
                    formik.handleChange
                  }
                >
                  <MenuItem value="">
                    {listWard.length === 0 && <CircularProgress sx={{ mr: '10px' }} color='primary' size={20} />}
                    --Chọn Phường/Xã--
                  </MenuItem>
                  {
                    listWard && listWard.map(s =>
                      <MenuItem key={s.ward_id} value={s.ward_name}>
                        {s.ward_name}
                      </MenuItem>
                    )}
                </Select>
                {formik.touched.ward && formik.errors.ward && <FormHelperText>{formik.errors.ward}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit'
          >Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogChangePhone
