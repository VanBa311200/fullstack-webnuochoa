import axios from 'axios'

import { apiUrl } from '../context/contanst'

export const toVND = (int) => {
  return (
    int.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
  )
}

export const checkTypeImage = (object) => {
  const arr = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']


  return arr.includes(object)
}

export const checkTypeListImage = (object) => {
  const arr = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
  const arrImg = Object.values(object)

  let result = false

  arrImg.forEach(e => {
    if (arr.includes(e.type)) {
      result = true
      return false
    }
  });
  return result
}

export const checkEmailExist = async (email) => {
  if (email) {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/checkUserExist`, { email })
      return !res.data.success
    } catch (error) {
      return false
    }
  }
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const removeLocalStorage = (key) => {
  return (localStorage.removeItem(key))
}