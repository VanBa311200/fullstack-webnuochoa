import axios from 'axios'

import { apiUrl } from '../context/contanst'

export const toVND = (float) => {
  return (
    float.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    })
  )
}

export const checkTypeImage = (object) => {
  const arr = ['image/jpg', 'image/jpeg', 'image/png']

  const arrImg = Object.values(object)

  let result = false

  arrImg.forEach(e => {
    // console.log(arr.includes(e.type))
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
      if (res.data.success) {
        // console.log(res.data.success)
        return false
      } else {
        // console.log(res.data.success)
        return true
      }
    } catch (error) {
      return false
    }
  }
}

export const setLocalLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const getLocalLocalStorage = (key) => {
  return localStorage.getItem(key)
}

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key)
}