import baseAxios from './baseClient';

export const googleLogin = async (body) => {
  return await baseAxios.post('/auth/oauth/google', body)
}

export const login = async (body) => {
  return await baseAxios.post('/auth/login', body)
}