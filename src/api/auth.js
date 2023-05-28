import baseAxios from './baseClient';

export const googleLogin = async (body) => {
  return await baseAxios.post('/auth/oauth/google', body)
}

export const login = async (body) => {
  return await baseAxios.post('/auth/login', body)
}

export const logout = async (body) => {
  return await baseAxios.post('/auth/logout', body)
}

export const registerSeller = async () => {
  return await baseAxios.get('/auth/seller/register')
}

export const getProfile = async () => {
  return await baseAxios.get('/user/profile')
}